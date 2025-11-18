import { ChainId } from '@pancakeswap/chains';
import { Percent, Price, CurrencyAmount, ONE, ZERO } from '@pancakeswap/swap-sdk-core';
import { logCurrency, toSerializableCurrency, toSerializableCurrencyAmount, parseCurrency, parseCurrencyAmount } from '@pancakeswap/routing-sdk';
import { TICK_SPACINGS, Tick, encodeSqrtRatioX96, TickList, TickMath, SwapMath, LiquidityMath } from '@pancakeswap/v3-sdk';
import invariant from 'tiny-invariant';
import memoize from 'lodash/memoize.js';

// src/constants/poolType.ts
var V3_POOL_TYPE = "V3";
var COST_PER_UNINIT_TICK = 0n;
var BASE_SWAP_COST_V3 = (id) => {
  switch (id) {
    case ChainId.BSC:
    case ChainId.BSC_TESTNET:
    case ChainId.ETHEREUM:
    case ChainId.GOERLI:
    case ChainId.ZKSYNC:
    case ChainId.ZKSYNC_TESTNET:
    case ChainId.POLYGON_ZKEVM:
    case ChainId.POLYGON_ZKEVM_TESTNET:
    case ChainId.ARBITRUM_ONE:
    case ChainId.OPBNB:
    case ChainId.OPBNB_TESTNET:
      return 2000n;
    default:
      return 0n;
  }
};
var COST_PER_INIT_TICK = (id) => {
  switch (id) {
    case ChainId.BSC:
    case ChainId.BSC_TESTNET:
    case ChainId.ETHEREUM:
    case ChainId.GOERLI:
    case ChainId.ZKSYNC:
    case ChainId.ZKSYNC_TESTNET:
    case ChainId.POLYGON_ZKEVM:
    case ChainId.POLYGON_ZKEVM_TESTNET:
    case ChainId.ARBITRUM_ONE:
    case ChainId.OPBNB:
    case ChainId.OPBNB_TESTNET:
      return 31000n;
    default:
      return 0n;
  }
};
var COST_PER_HOP_V3 = (id) => {
  switch (id) {
    case ChainId.BSC:
    case ChainId.BSC_TESTNET:
    case ChainId.ETHEREUM:
    case ChainId.GOERLI:
    case ChainId.ZKSYNC:
    case ChainId.ZKSYNC_TESTNET:
    case ChainId.POLYGON_ZKEVM:
    case ChainId.POLYGON_ZKEVM_TESTNET:
    case ChainId.ARBITRUM_ONE:
    case ChainId.OPBNB:
    case ChainId.OPBNB_TESTNET:
      return 80000n;
    default:
      return 0n;
  }
};
var NEGATIVE_ONE = BigInt(-1);
var Q96 = 2n ** 96n;
var Q192 = Q96 ** 2n;
var MAX_FEE = 10n ** 6n;
var ONE_HUNDRED_PERCENT = new Percent("1");
var ZERO_PERCENT = new Percent("0");
var Q128 = 2n ** 128n;
function createV3Pool(params) {
  let p = { ...params, type: V3_POOL_TYPE };
  const tickSpacing = p.tickSpacing ?? TICK_SPACINGS[p.fee];
  invariant(Boolean(tickSpacing) === true, "Invalid fee for v3 pool");
  const pool = {
    type: V3_POOL_TYPE,
    swapToPrice: (price) => {
      const sortedPrice = price.baseCurrency.wrapped.sortsBefore(price.quoteCurrency.wrapped) ? price : price.invert();
      const sqrtRatioLimit = encodeSqrtRatioX96(sortedPrice.numerator, sortedPrice.denominator);
      if (sqrtRatioLimit === p.sqrtRatioX96) {
        return {
          inputAmount: CurrencyAmount.fromRawAmount(p.token0, 0n)
        };
      }
      const zeroForOne = sqrtRatioLimit < p.sqrtRatioX96;
      const outputReserve = zeroForOne ? p.reserve1 : p.reserve0;
      const outputCurrency = zeroForOne ? p.token1 : p.token0;
      const outputAmount = CurrencyAmount.fromRawAmount(outputCurrency.wrapped, outputReserve?.quotient ?? 0n);
      const [inputAmount] = getInputAmount(outputAmount, {
        ...p,
        sqrtPriceLimitX96: sqrtRatioLimit
      });
      return {
        inputAmount
      };
    },
    getReserve: (c) => p.token0.wrapped.equals(c.wrapped) ? p.reserve0 ?? CurrencyAmount.fromRawAmount(p.token0, 0n) : p.reserve1 ?? CurrencyAmount.fromRawAmount(p.token1, 0n),
    getCurrentPrice: (base) => {
      return priceOf(p, base.wrapped);
    },
    getTradingPairs: () => [[p.token0, p.token1]],
    getId: () => p.address,
    update: (poolData) => {
      p = { ...p, ...poolData };
    },
    log: () => `V3 ${p.token0.symbol} - ${p.token1.symbol} (${p.fee}) - ${p.address} - price ${token0Price(p).toSignificant(
      6
    )} ${p.token1.symbol}/${p.token0.symbol}`,
    getPoolData: () => p,
    getQuote: ({ amount, isExactIn }) => {
      const { ticks } = p;
      if (!ticks?.length) {
        return void 0;
      }
      try {
        const [quote, poolAfter] = isExactIn ? getOutputAmount(amount.wrapped, p) : getInputAmount(amount.wrapped, { ...p, exactOut: true });
        if (quote.quotient <= 0n) {
          return void 0;
        }
        const { tick: tickAfter } = poolAfter;
        const newPool = {
          ...p,
          tick: tickAfter,
          sqrtRatioX96: poolAfter.sqrtRatioX96,
          liquidity: poolAfter.liquidity
        };
        return {
          poolAfter: createV3Pool(newPool),
          quote,
          pool
        };
      } catch (e) {
        return void 0;
      }
    },
    estimateGasCostForQuote: ({ poolAfter }) => {
      const { tick, ticks, token0 } = p;
      const { chainId } = token0;
      const { tick: tickAfter } = poolAfter.getPoolData();
      invariant(ticks !== void 0, "[Estimate gas]: No valid tick list found");
      const numOfTicksCrossed = TickList.countInitializedTicksCrossed(ticks, tick, tickAfter);
      const tickGasUse = COST_PER_INIT_TICK(chainId) * BigInt(numOfTicksCrossed);
      return BASE_SWAP_COST_V3(chainId) + COST_PER_HOP_V3(chainId) + tickGasUse;
    }
  };
  return pool;
}
var token0Price = memoize(
  ({
    token0,
    token1,
    sqrtRatioX96
  }) => {
    return new Price(token0, token1, Q192, sqrtRatioX96 * sqrtRatioX96);
  },
  ({ token0, token1, sqrtRatioX96 }) => `${logCurrency(token0)}_${logCurrency(token1)}_${sqrtRatioX96}`
);
var token1Price = memoize(
  ({
    token0,
    token1,
    sqrtRatioX96
  }) => {
    return new Price(token1, token0, sqrtRatioX96 * sqrtRatioX96, Q192);
  },
  ({ token0, token1, sqrtRatioX96 }) => `${logCurrency(token0)}_${logCurrency(token1)}_${sqrtRatioX96}`
);
function priceOf(p, token) {
  invariant(involvesToken(p, token), "TOKEN");
  return token.equals(p.token0) ? token0Price(p) : token1Price(p);
}
function involvesToken(p, token) {
  return token.equals(p.token0) || token.equals(p.token1);
}
function getOutputAmount(inputAmount, { sqrtPriceLimitX96, ...pool }) {
  invariant(involvesToken(pool, inputAmount.currency), "TOKEN");
  const tickSpacing = pool.tickSpacing ?? TICK_SPACINGS[pool.fee];
  invariant(!!tickSpacing, "Invalid tick spacing");
  const zeroForOne = inputAmount.currency.equals(pool.token0);
  const {
    amountCalculated: outputAmount,
    sqrtRatioX96,
    liquidity,
    tickCurrent
  } = swap({
    ...pool,
    tickSpacing,
    amountSpecified: inputAmount.quotient,
    zeroForOne,
    sqrtPriceLimitX96
  });
  const outputToken = zeroForOne ? pool.token1 : pool.token0;
  return [
    CurrencyAmount.fromRawAmount(outputToken, outputAmount * NEGATIVE_ONE),
    {
      ...pool,
      sqrtRatioX96,
      liquidity,
      tick: tickCurrent
    }
  ];
}
function getInputAmount(outputAmount, { sqrtPriceLimitX96, exactOut, ...pool }) {
  invariant(outputAmount.currency.isToken && involvesToken(pool, outputAmount.currency), "TOKEN");
  const tickSpacing = pool.tickSpacing ?? TICK_SPACINGS[pool.fee];
  invariant(!!tickSpacing, "Invalid tick spacing");
  const zeroForOne = outputAmount.currency.equals(pool.token1);
  const {
    amountSpecifiedRemaining,
    amountCalculated: inputAmount,
    sqrtRatioX96,
    liquidity,
    tickCurrent
  } = swap({
    ...pool,
    tickSpacing,
    amountSpecified: outputAmount.quotient * NEGATIVE_ONE,
    zeroForOne,
    sqrtPriceLimitX96
  });
  if (exactOut) {
    invariant(amountSpecifiedRemaining === 0n, "INSUFFICIENT_LIQUIDITY_EXACT_OUT");
  }
  const inputToken = zeroForOne ? pool.token0 : pool.token1;
  return [
    CurrencyAmount.fromRawAmount(inputToken, inputAmount),
    {
      ...pool,
      sqrtRatioX96,
      liquidity,
      tick: tickCurrent
    }
  ];
}
function swap({
  fee,
  tickSpacing,
  ticks,
  tick: tickCurrent,
  liquidity,
  sqrtRatioX96,
  zeroForOne,
  amountSpecified,
  sqrtPriceLimitX96
}) {
  invariant(ticks !== void 0, "[Swap]: No valid tick list found");
  if (!sqrtPriceLimitX96)
    sqrtPriceLimitX96 = zeroForOne ? TickMath.MIN_SQRT_RATIO + ONE : TickMath.MAX_SQRT_RATIO - ONE;
  if (zeroForOne) {
    invariant(sqrtPriceLimitX96 > TickMath.MIN_SQRT_RATIO, "RATIO_MIN");
    invariant(sqrtPriceLimitX96 < sqrtRatioX96, "RATIO_CURRENT");
  } else {
    invariant(sqrtPriceLimitX96 < TickMath.MAX_SQRT_RATIO, "RATIO_MAX");
    invariant(sqrtPriceLimitX96 > sqrtRatioX96, "RATIO_CURRENT");
  }
  const exactInput = amountSpecified >= ZERO;
  const state = {
    amountSpecifiedRemaining: amountSpecified,
    amountCalculated: ZERO,
    sqrtPriceX96: sqrtRatioX96,
    tick: tickCurrent,
    liquidity
  };
  while (state.amountSpecifiedRemaining !== ZERO && state.sqrtPriceX96 !== sqrtPriceLimitX96) {
    const step = {};
    step.sqrtPriceStartX96 = state.sqrtPriceX96;
    [step.tickNext, step.initialized] = TickList.nextInitializedTickWithinOneWord(
      ticks,
      state.tick,
      zeroForOne,
      tickSpacing
    );
    if (step.tickNext < TickMath.MIN_TICK) {
      step.tickNext = TickMath.MIN_TICK;
    } else if (step.tickNext > TickMath.MAX_TICK) {
      step.tickNext = TickMath.MAX_TICK;
    }
    step.sqrtPriceNextX96 = TickMath.getSqrtRatioAtTick(step.tickNext);
    [state.sqrtPriceX96, step.amountIn, step.amountOut, step.feeAmount] = SwapMath.computeSwapStep(
      state.sqrtPriceX96,
      (zeroForOne ? step.sqrtPriceNextX96 < sqrtPriceLimitX96 : step.sqrtPriceNextX96 > sqrtPriceLimitX96) ? sqrtPriceLimitX96 : step.sqrtPriceNextX96,
      state.liquidity,
      state.amountSpecifiedRemaining,
      fee
    );
    if (exactInput) {
      state.amountSpecifiedRemaining -= step.amountIn + step.feeAmount;
      state.amountCalculated = state.amountCalculated - step.amountOut;
    } else {
      state.amountSpecifiedRemaining = state.amountSpecifiedRemaining + step.amountOut;
      state.amountCalculated = state.amountCalculated + (step.amountIn + step.feeAmount);
    }
    if (state.sqrtPriceX96 === step.sqrtPriceNextX96) {
      if (step.initialized) {
        let liquidityNet = BigInt(TickList.getTick(ticks, step.tickNext).liquidityNet);
        if (zeroForOne)
          liquidityNet *= NEGATIVE_ONE;
        state.liquidity = LiquidityMath.addDelta(state.liquidity, liquidityNet);
      }
      state.tick = zeroForOne ? step.tickNext - 1 : step.tickNext;
    } else if (state.sqrtPriceX96 !== step.sqrtPriceStartX96) {
      state.tick = TickMath.getTickAtSqrtRatio(state.sqrtPriceX96);
    }
  }
  return {
    amountSpecifiedRemaining: state.amountSpecifiedRemaining,
    amountCalculated: state.amountCalculated,
    sqrtRatioX96: state.sqrtPriceX96,
    liquidity: state.liquidity,
    tickCurrent: state.tick
  };
}

// src/transformer.ts
var ONE_HUNDRED = 100n;
function toSerializableTick(tick) {
  return {
    index: tick.index,
    liquidityNet: String(tick.liquidityNet),
    liquidityGross: String(tick.liquidityGross)
  };
}
function toSerializableV3Pool(v3Pool) {
  const pool = v3Pool.getPoolData();
  return {
    ...pool,
    token0: toSerializableCurrency(pool.token0),
    token1: toSerializableCurrency(pool.token1),
    liquidity: pool.liquidity.toString(),
    sqrtRatioX96: pool.sqrtRatioX96.toString(),
    token0ProtocolFee: pool.token0ProtocolFee.toFixed(0),
    token1ProtocolFee: pool.token1ProtocolFee.toFixed(0),
    ticks: pool.ticks?.map(toSerializableTick),
    reserve0: pool.reserve0 && toSerializableCurrencyAmount(pool.reserve0),
    reserve1: pool.reserve1 && toSerializableCurrencyAmount(pool.reserve1)
  };
}
function parseTick(tick) {
  return new Tick(tick);
}
function parseV3Pool(chainId, pool) {
  const poolData = {
    ...pool,
    token0: parseCurrency(chainId, pool.token0),
    token1: parseCurrency(chainId, pool.token1),
    liquidity: BigInt(pool.liquidity),
    sqrtRatioX96: BigInt(pool.sqrtRatioX96),
    token0ProtocolFee: new Percent(pool.token0ProtocolFee, ONE_HUNDRED),
    token1ProtocolFee: new Percent(pool.token1ProtocolFee, ONE_HUNDRED),
    ticks: pool.ticks?.map(parseTick),
    reserve0: pool.reserve0 && parseCurrencyAmount(chainId, pool.reserve0),
    reserve1: pool.reserve1 && parseCurrencyAmount(chainId, pool.reserve1)
  };
  return createV3Pool(poolData);
}

// src/utils/isV3Pool.ts
function isV3Pool(p) {
  return p.type === V3_POOL_TYPE;
}

export { BASE_SWAP_COST_V3, COST_PER_HOP_V3, COST_PER_INIT_TICK, COST_PER_UNINIT_TICK, MAX_FEE, NEGATIVE_ONE, ONE_HUNDRED_PERCENT, Q128, Q192, Q96, V3_POOL_TYPE, ZERO_PERCENT, createV3Pool, isV3Pool, parseTick, parseV3Pool, toSerializableTick, toSerializableV3Pool };
//# sourceMappingURL=out.js.map
//# sourceMappingURL=index.mjs.map