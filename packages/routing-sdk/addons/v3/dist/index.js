'use strict';

var chains = require('@pancakeswap/chains');
var swapSdkCore = require('@pancakeswap/swap-sdk-core');
var routingSdk = require('@pancakeswap/routing-sdk');
var v3Sdk = require('@pancakeswap/v3-sdk');
var invariant = require('tiny-invariant');
var memoize = require('lodash/memoize.js');

function _interopDefault (e) { return e && e.__esModule ? e : { default: e }; }

var invariant__default = /*#__PURE__*/_interopDefault(invariant);
var memoize__default = /*#__PURE__*/_interopDefault(memoize);

// src/constants/poolType.ts
var V3_POOL_TYPE = "V3";
var COST_PER_UNINIT_TICK = 0n;
var BASE_SWAP_COST_V3 = (id) => {
  switch (id) {
    case chains.ChainId.BSC:
    case chains.ChainId.BSC_TESTNET:
    case chains.ChainId.ETHEREUM:
    case chains.ChainId.GOERLI:
    case chains.ChainId.ZKSYNC:
    case chains.ChainId.ZKSYNC_TESTNET:
    case chains.ChainId.POLYGON_ZKEVM:
    case chains.ChainId.POLYGON_ZKEVM_TESTNET:
    case chains.ChainId.ARBITRUM_ONE:
    case chains.ChainId.OPBNB:
    case chains.ChainId.OPBNB_TESTNET:
      return 2000n;
    default:
      return 0n;
  }
};
var COST_PER_INIT_TICK = (id) => {
  switch (id) {
    case chains.ChainId.BSC:
    case chains.ChainId.BSC_TESTNET:
    case chains.ChainId.ETHEREUM:
    case chains.ChainId.GOERLI:
    case chains.ChainId.ZKSYNC:
    case chains.ChainId.ZKSYNC_TESTNET:
    case chains.ChainId.POLYGON_ZKEVM:
    case chains.ChainId.POLYGON_ZKEVM_TESTNET:
    case chains.ChainId.ARBITRUM_ONE:
    case chains.ChainId.OPBNB:
    case chains.ChainId.OPBNB_TESTNET:
      return 31000n;
    default:
      return 0n;
  }
};
var COST_PER_HOP_V3 = (id) => {
  switch (id) {
    case chains.ChainId.BSC:
    case chains.ChainId.BSC_TESTNET:
    case chains.ChainId.ETHEREUM:
    case chains.ChainId.GOERLI:
    case chains.ChainId.ZKSYNC:
    case chains.ChainId.ZKSYNC_TESTNET:
    case chains.ChainId.POLYGON_ZKEVM:
    case chains.ChainId.POLYGON_ZKEVM_TESTNET:
    case chains.ChainId.ARBITRUM_ONE:
    case chains.ChainId.OPBNB:
    case chains.ChainId.OPBNB_TESTNET:
      return 80000n;
    default:
      return 0n;
  }
};
var NEGATIVE_ONE = BigInt(-1);
var Q96 = 2n ** 96n;
var Q192 = Q96 ** 2n;
var MAX_FEE = 10n ** 6n;
var ONE_HUNDRED_PERCENT = new swapSdkCore.Percent("1");
var ZERO_PERCENT = new swapSdkCore.Percent("0");
var Q128 = 2n ** 128n;
function createV3Pool(params) {
  let p = { ...params, type: V3_POOL_TYPE };
  const tickSpacing = p.tickSpacing ?? v3Sdk.TICK_SPACINGS[p.fee];
  invariant__default.default(Boolean(tickSpacing) === true, "Invalid fee for v3 pool");
  const pool = {
    type: V3_POOL_TYPE,
    swapToPrice: (price) => {
      const sortedPrice = price.baseCurrency.wrapped.sortsBefore(price.quoteCurrency.wrapped) ? price : price.invert();
      const sqrtRatioLimit = v3Sdk.encodeSqrtRatioX96(sortedPrice.numerator, sortedPrice.denominator);
      if (sqrtRatioLimit === p.sqrtRatioX96) {
        return {
          inputAmount: swapSdkCore.CurrencyAmount.fromRawAmount(p.token0, 0n)
        };
      }
      const zeroForOne = sqrtRatioLimit < p.sqrtRatioX96;
      const outputReserve = zeroForOne ? p.reserve1 : p.reserve0;
      const outputCurrency = zeroForOne ? p.token1 : p.token0;
      const outputAmount = swapSdkCore.CurrencyAmount.fromRawAmount(outputCurrency.wrapped, outputReserve?.quotient ?? 0n);
      const [inputAmount] = getInputAmount(outputAmount, {
        ...p,
        sqrtPriceLimitX96: sqrtRatioLimit
      });
      return {
        inputAmount
      };
    },
    getReserve: (c) => p.token0.wrapped.equals(c.wrapped) ? p.reserve0 ?? swapSdkCore.CurrencyAmount.fromRawAmount(p.token0, 0n) : p.reserve1 ?? swapSdkCore.CurrencyAmount.fromRawAmount(p.token1, 0n),
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
      invariant__default.default(ticks !== void 0, "[Estimate gas]: No valid tick list found");
      const numOfTicksCrossed = v3Sdk.TickList.countInitializedTicksCrossed(ticks, tick, tickAfter);
      const tickGasUse = COST_PER_INIT_TICK(chainId) * BigInt(numOfTicksCrossed);
      return BASE_SWAP_COST_V3(chainId) + COST_PER_HOP_V3(chainId) + tickGasUse;
    }
  };
  return pool;
}
var token0Price = memoize__default.default(
  ({
    token0,
    token1,
    sqrtRatioX96
  }) => {
    return new swapSdkCore.Price(token0, token1, Q192, sqrtRatioX96 * sqrtRatioX96);
  },
  ({ token0, token1, sqrtRatioX96 }) => `${routingSdk.logCurrency(token0)}_${routingSdk.logCurrency(token1)}_${sqrtRatioX96}`
);
var token1Price = memoize__default.default(
  ({
    token0,
    token1,
    sqrtRatioX96
  }) => {
    return new swapSdkCore.Price(token1, token0, sqrtRatioX96 * sqrtRatioX96, Q192);
  },
  ({ token0, token1, sqrtRatioX96 }) => `${routingSdk.logCurrency(token0)}_${routingSdk.logCurrency(token1)}_${sqrtRatioX96}`
);
function priceOf(p, token) {
  invariant__default.default(involvesToken(p, token), "TOKEN");
  return token.equals(p.token0) ? token0Price(p) : token1Price(p);
}
function involvesToken(p, token) {
  return token.equals(p.token0) || token.equals(p.token1);
}
function getOutputAmount(inputAmount, { sqrtPriceLimitX96, ...pool }) {
  invariant__default.default(involvesToken(pool, inputAmount.currency), "TOKEN");
  const tickSpacing = pool.tickSpacing ?? v3Sdk.TICK_SPACINGS[pool.fee];
  invariant__default.default(!!tickSpacing, "Invalid tick spacing");
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
    swapSdkCore.CurrencyAmount.fromRawAmount(outputToken, outputAmount * NEGATIVE_ONE),
    {
      ...pool,
      sqrtRatioX96,
      liquidity,
      tick: tickCurrent
    }
  ];
}
function getInputAmount(outputAmount, { sqrtPriceLimitX96, exactOut, ...pool }) {
  invariant__default.default(outputAmount.currency.isToken && involvesToken(pool, outputAmount.currency), "TOKEN");
  const tickSpacing = pool.tickSpacing ?? v3Sdk.TICK_SPACINGS[pool.fee];
  invariant__default.default(!!tickSpacing, "Invalid tick spacing");
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
    invariant__default.default(amountSpecifiedRemaining === 0n, "INSUFFICIENT_LIQUIDITY_EXACT_OUT");
  }
  const inputToken = zeroForOne ? pool.token0 : pool.token1;
  return [
    swapSdkCore.CurrencyAmount.fromRawAmount(inputToken, inputAmount),
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
  invariant__default.default(ticks !== void 0, "[Swap]: No valid tick list found");
  if (!sqrtPriceLimitX96)
    sqrtPriceLimitX96 = zeroForOne ? v3Sdk.TickMath.MIN_SQRT_RATIO + swapSdkCore.ONE : v3Sdk.TickMath.MAX_SQRT_RATIO - swapSdkCore.ONE;
  if (zeroForOne) {
    invariant__default.default(sqrtPriceLimitX96 > v3Sdk.TickMath.MIN_SQRT_RATIO, "RATIO_MIN");
    invariant__default.default(sqrtPriceLimitX96 < sqrtRatioX96, "RATIO_CURRENT");
  } else {
    invariant__default.default(sqrtPriceLimitX96 < v3Sdk.TickMath.MAX_SQRT_RATIO, "RATIO_MAX");
    invariant__default.default(sqrtPriceLimitX96 > sqrtRatioX96, "RATIO_CURRENT");
  }
  const exactInput = amountSpecified >= swapSdkCore.ZERO;
  const state = {
    amountSpecifiedRemaining: amountSpecified,
    amountCalculated: swapSdkCore.ZERO,
    sqrtPriceX96: sqrtRatioX96,
    tick: tickCurrent,
    liquidity
  };
  while (state.amountSpecifiedRemaining !== swapSdkCore.ZERO && state.sqrtPriceX96 !== sqrtPriceLimitX96) {
    const step = {};
    step.sqrtPriceStartX96 = state.sqrtPriceX96;
    [step.tickNext, step.initialized] = v3Sdk.TickList.nextInitializedTickWithinOneWord(
      ticks,
      state.tick,
      zeroForOne,
      tickSpacing
    );
    if (step.tickNext < v3Sdk.TickMath.MIN_TICK) {
      step.tickNext = v3Sdk.TickMath.MIN_TICK;
    } else if (step.tickNext > v3Sdk.TickMath.MAX_TICK) {
      step.tickNext = v3Sdk.TickMath.MAX_TICK;
    }
    step.sqrtPriceNextX96 = v3Sdk.TickMath.getSqrtRatioAtTick(step.tickNext);
    [state.sqrtPriceX96, step.amountIn, step.amountOut, step.feeAmount] = v3Sdk.SwapMath.computeSwapStep(
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
        let liquidityNet = BigInt(v3Sdk.TickList.getTick(ticks, step.tickNext).liquidityNet);
        if (zeroForOne)
          liquidityNet *= NEGATIVE_ONE;
        state.liquidity = v3Sdk.LiquidityMath.addDelta(state.liquidity, liquidityNet);
      }
      state.tick = zeroForOne ? step.tickNext - 1 : step.tickNext;
    } else if (state.sqrtPriceX96 !== step.sqrtPriceStartX96) {
      state.tick = v3Sdk.TickMath.getTickAtSqrtRatio(state.sqrtPriceX96);
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
    token0: routingSdk.toSerializableCurrency(pool.token0),
    token1: routingSdk.toSerializableCurrency(pool.token1),
    liquidity: pool.liquidity.toString(),
    sqrtRatioX96: pool.sqrtRatioX96.toString(),
    token0ProtocolFee: pool.token0ProtocolFee.toFixed(0),
    token1ProtocolFee: pool.token1ProtocolFee.toFixed(0),
    ticks: pool.ticks?.map(toSerializableTick),
    reserve0: pool.reserve0 && routingSdk.toSerializableCurrencyAmount(pool.reserve0),
    reserve1: pool.reserve1 && routingSdk.toSerializableCurrencyAmount(pool.reserve1)
  };
}
function parseTick(tick) {
  return new v3Sdk.Tick(tick);
}
function parseV3Pool(chainId, pool) {
  const poolData = {
    ...pool,
    token0: routingSdk.parseCurrency(chainId, pool.token0),
    token1: routingSdk.parseCurrency(chainId, pool.token1),
    liquidity: BigInt(pool.liquidity),
    sqrtRatioX96: BigInt(pool.sqrtRatioX96),
    token0ProtocolFee: new swapSdkCore.Percent(pool.token0ProtocolFee, ONE_HUNDRED),
    token1ProtocolFee: new swapSdkCore.Percent(pool.token1ProtocolFee, ONE_HUNDRED),
    ticks: pool.ticks?.map(parseTick),
    reserve0: pool.reserve0 && routingSdk.parseCurrencyAmount(chainId, pool.reserve0),
    reserve1: pool.reserve1 && routingSdk.parseCurrencyAmount(chainId, pool.reserve1)
  };
  return createV3Pool(poolData);
}

// src/utils/isV3Pool.ts
function isV3Pool(p) {
  return p.type === V3_POOL_TYPE;
}

exports.BASE_SWAP_COST_V3 = BASE_SWAP_COST_V3;
exports.COST_PER_HOP_V3 = COST_PER_HOP_V3;
exports.COST_PER_INIT_TICK = COST_PER_INIT_TICK;
exports.COST_PER_UNINIT_TICK = COST_PER_UNINIT_TICK;
exports.MAX_FEE = MAX_FEE;
exports.NEGATIVE_ONE = NEGATIVE_ONE;
exports.ONE_HUNDRED_PERCENT = ONE_HUNDRED_PERCENT;
exports.Q128 = Q128;
exports.Q192 = Q192;
exports.Q96 = Q96;
exports.V3_POOL_TYPE = V3_POOL_TYPE;
exports.ZERO_PERCENT = ZERO_PERCENT;
exports.createV3Pool = createV3Pool;
exports.isV3Pool = isV3Pool;
exports.parseTick = parseTick;
exports.parseV3Pool = parseV3Pool;
exports.toSerializableTick = toSerializableTick;
exports.toSerializableV3Pool = toSerializableV3Pool;
//# sourceMappingURL=out.js.map
//# sourceMappingURL=index.js.map