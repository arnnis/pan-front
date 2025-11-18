import { __export, V2_FEE_PATH_PLACEHOLDER, wrappedCurrency, BASES_TO_CHECK_TRADES_AGAINST, CUSTOM_BASES, V3_TICK_LENS_ADDRESSES, ADDITIONAL_BASES, usdGasTokensByChain, pancakePairABI, stableSwapPairABI, ADDRESS_THIS, MSG_SENDER, BASE_SWAP_COST_V3, COST_PER_HOP_V3, BASE_SWAP_COST_STABLE_SWAP, COST_PER_EXTRA_HOP_STABLE_SWAP, COST_PER_INIT_TICK, MIXED_ROUTE_QUOTER_ADDRESSES, V3_QUOTER_ADDRESSES, BASE_SWAP_COST_V2, COST_PER_EXTRA_HOP_V2, COST_PER_UNINIT_TICK, BATCH_MULTICALL_CONFIGS } from './chunk-U7ACFW2G.mjs';
export { ADDITIONAL_BASES, ADDRESS_THIS, BASES_TO_CHECK_TRADES_AGAINST, BASE_SWAP_COST_STABLE_SWAP, BASE_SWAP_COST_V2, BASE_SWAP_COST_V3, BATCH_MULTICALL_CONFIGS, BETTER_TRADE_LESS_HOPS_THRESHOLD, BIG_INT_TEN, BIPS_BASE, COST_PER_EXTRA_HOP_STABLE_SWAP, COST_PER_EXTRA_HOP_V2, COST_PER_HOP_V3, COST_PER_INIT_TICK, COST_PER_UNINIT_TICK, CUSTOM_BASES, MIN_BNB, MIXED_ROUTE_QUOTER_ADDRESSES, MSG_SENDER, SMART_ROUTER_ADDRESSES, STABLE_SWAP_INFO_ADDRESS, V2_FEE_PATH_PLACEHOLDER, V2_ROUTER_ADDRESS, V3_QUOTER_ADDRESSES, V3_TICK_LENS_ADDRESSES, usdGasTokensByChain } from './chunk-U7ACFW2G.mjs';
import { ChainId, getLlamaChainName } from '@pancakeswap/chains';
import { Pair, ZERO, Price, CurrencyAmount, ONE_HUNDRED_PERCENT, Percent, TradeType, Fraction, ONE, Native, ERC20Token, WNATIVE, erc20Abi, Token, validateAndParseAddress } from '@pancakeswap/sdk';
import { encodePacked, getAddress, encodeFunctionData, decodeFunctionResult, zeroAddress, getContract, bytesToHex, encodeAbiParameters, parseAbiParameters } from 'viem';
import { safeGetGaugesByChain, GaugeType } from '@pancakeswap/gauges';
import { getTokensByChain, bscTokens } from '@pancakeswap/tokens';
import flatMap from 'lodash/flatMap.js';
import memoize from 'lodash/memoize.js';
import uniqBy from 'lodash/uniqBy.js';
import { CLPoolManager, getPoolId, BinPoolManager, getPriceFromId, SCALE, encodePoolKey, encodePoolParameters } from '@pancakeswap/v4-sdk';
import { computePoolAddress, ADDRESS_ZERO, Tick, Pool, FeeAmount, pancakeV3PoolABI, DEPLOYER_ADDRESSES, parseProtocolFees, SelfPermit, Payments, toHex, Position, TickList, TICK_SPACINGS, NonfungiblePositionManager, Multicall } from '@pancakeswap/v3-sdk';
import { sortCurrencies, getCurrencyAddress, CurrencyAmount as CurrencyAmount$1 } from '@pancakeswap/swap-sdk-core';
import { getSwapOutput, getStableSwapPools, getQuoteExactIn, getQuoteExactOut } from '@pancakeswap/stable-swap-sdk';
import invariant6 from 'tiny-invariant';
import debug from 'debug';
import mapValues from 'lodash/mapValues.js';
import FixedReverseHeap from 'mnemonist/fixed-reverse-heap.js';
import Queue from 'mnemonist/queue.js';
import sum from 'lodash/sum.js';
import chunk from 'lodash/chunk.js';
import { gql } from 'graphql-request';
import { deserializeToken } from '@pancakeswap/token-lists';
import retry from 'async-retry';
import { multicallByGasLimit } from '@pancakeswap/multicall';
import stats from 'stats-lite';
import { z } from 'zod';

// evm/abis/FeeOnTransferDetector.ts
var feeOnTransferDetectorAbi = [
  {
    inputs: [
      {
        internalType: "address",
        name: "_factoryV2",
        type: "address"
      }
    ],
    stateMutability: "nonpayable",
    type: "constructor"
  },
  {
    inputs: [],
    name: "PairLookupFailed",
    type: "error"
  },
  {
    inputs: [],
    name: "SameToken",
    type: "error"
  },
  {
    inputs: [
      {
        internalType: "address[]",
        name: "tokens",
        type: "address[]"
      },
      {
        internalType: "address",
        name: "baseToken",
        type: "address"
      },
      {
        internalType: "uint256",
        name: "amountToBorrow",
        type: "uint256"
      }
    ],
    name: "batchValidate",
    outputs: [
      {
        components: [
          {
            internalType: "uint256",
            name: "buyFeeBps",
            type: "uint256"
          },
          {
            internalType: "uint256",
            name: "sellFeeBps",
            type: "uint256"
          }
        ],
        internalType: "struct TokenFees[]",
        name: "fotResults",
        type: "tuple[]"
      }
    ],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address"
      },
      {
        internalType: "uint256",
        name: "amount0",
        type: "uint256"
      },
      {
        internalType: "uint256",
        name: "",
        type: "uint256"
      },
      {
        internalType: "bytes",
        name: "data",
        type: "bytes"
      }
    ],
    name: "pancakeCall",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "token",
        type: "address"
      },
      {
        internalType: "address",
        name: "baseToken",
        type: "address"
      },
      {
        internalType: "uint256",
        name: "amountToBorrow",
        type: "uint256"
      }
    ],
    name: "validate",
    outputs: [
      {
        components: [
          {
            internalType: "uint256",
            name: "buyFeeBps",
            type: "uint256"
          },
          {
            internalType: "uint256",
            name: "sellFeeBps",
            type: "uint256"
          }
        ],
        internalType: "struct TokenFees",
        name: "fotResult",
        type: "tuple"
      }
    ],
    stateMutability: "nonpayable",
    type: "function"
  }
];

// evm/fot.ts
var feeOnTransferDetectorAddresses = {
  [ChainId.ETHEREUM]: "0xe9200516a475b9e6FD4D1c452858097F345A6760",
  [ChainId.SEPOLIA]: "0xD8b14F915b1b4b1c4EE4bF8321Bea018E72E5cf3",
  [ChainId.BSC]: "0x003BD52f589F23346E03fA431209C29cD599d693",
  [ChainId.BSC_TESTNET]: "0xE83BD854c1fBf54424b4d914163BF855aB1131Aa",
  [ChainId.ARBITRUM_ONE]: "0xD8b14F915b1b4b1c4EE4bF8321Bea018E72E5cf3",
  [ChainId.ARBITRUM_SEPOLIA]: "0xD8b14F915b1b4b1c4EE4bF8321Bea018E72E5cf3",
  [ChainId.POLYGON_ZKEVM]: "0xe9200516a475b9e6FD4D1c452858097F345A6760",
  [ChainId.POLYGON_ZKEVM_TESTNET]: "0xbc60A0d9536B6F75b1FfE18b47364ED684EA0260",
  [ChainId.BASE]: "0xD8b14F915b1b4b1c4EE4bF8321Bea018E72E5cf3",
  [ChainId.BASE_SEPOLIA]: "0xD8b14F915b1b4b1c4EE4bF8321Bea018E72E5cf3",
  [ChainId.ZKSYNC]: "0xED87D01674199355CEfC05648d17E037306d7962",
  [ChainId.ZKSYNC_TESTNET]: "0x869505373d830104130F95c1E7d578dE7E58C0a8",
  [ChainId.LINEA]: "0xD8b14F915b1b4b1c4EE4bF8321Bea018E72E5cf3",
  [ChainId.LINEA_TESTNET]: "0x3412378f17B1b44E8bcFD157EcE1a4f59DA5A77a"
};
var getFeeOnTransferDetectorContract = (publicClient) => {
  if (publicClient.chain && publicClient.chain.id in feeOnTransferDetectorAddresses) {
    return getContract({
      abi: feeOnTransferDetectorAbi,
      address: feeOnTransferDetectorAddresses[publicClient.chain.id],
      client: publicClient
    });
  }
  return null;
};
var AMOUNT = 100000n;
async function fetchTokenFeeOnTransfer(publicClient, tokenAddress) {
  if (!publicClient.chain) {
    throw new Error("Chain not found");
  }
  const contract = getFeeOnTransferDetectorContract(publicClient);
  const baseToken = WNATIVE[publicClient.chain.id];
  if (!contract) {
    throw new Error("Fee on transfer detector contract not found");
  }
  if (!baseToken) {
    throw new Error("Base token not found");
  }
  if (tokenAddress.toLowerCase() === baseToken.address.toLowerCase()) {
    throw new Error("Token is base token");
  }
  return contract.simulate.validate([tokenAddress, baseToken.address, AMOUNT]);
}
async function fetchTokenFeeOnTransferBatch(publicClient, tokens) {
  if (!publicClient.chain) {
    throw new Error("Chain not found");
  }
  const contract = getFeeOnTransferDetectorContract(publicClient);
  if (!contract) {
    throw new Error("Fee on transfer detector contract not found");
  }
  const baseToken = WNATIVE[publicClient.chain.id];
  if (!baseToken) {
    throw new Error("Base token not found");
  }
  const tokensWithoutBaseToken = tokens.filter(
    (token) => token.address.toLowerCase() !== baseToken.address.toLowerCase()
  );
  return publicClient.multicall({
    allowFailure: true,
    contracts: tokensWithoutBaseToken.map(
      (token) => ({
        address: contract.address,
        abi: feeOnTransferDetectorAbi,
        functionName: "validate",
        args: [token.address, baseToken.address, AMOUNT]
      })
    )
  });
}

// evm/v3-router/smartRouter.ts
var smartRouter_exports = {};
__export(smartRouter_exports, {
  APISchema: () => schema_exports,
  PancakeMulticallProvider: () => PancakeMulticallProvider,
  Transformer: () => transformer_exports,
  buildBaseRoute: () => buildBaseRoute,
  createCommonTokenPriceProvider: () => createCommonTokenPriceProvider,
  createGetV2CandidatePools: () => createGetV2CandidatePools,
  createGetV3CandidatePools: () => createGetV3CandidatePools,
  createGetV3CandidatePoolsWithFallbacks: () => createGetV3CandidatePools,
  createHybridPoolProvider: () => createHybridPoolProvider,
  createOffChainQuoteProvider: () => createOffChainQuoteProvider,
  createOnChainPoolFactory: () => createOnChainPoolFactory,
  createPoolProvider: () => createPoolProvider,
  createPoolQuoteGetter: () => createPoolQuoteGetter,
  createQuoteProvider: () => createQuoteProvider,
  createStaticPoolProvider: () => createStaticPoolProvider,
  createV2PoolsProviderByCommonTokenPrices: () => createV2PoolsProviderByCommonTokenPrices,
  encodeMixedRouteToPath: () => encodeMixedRouteToPath,
  getAllV3PoolsFromSubgraph: () => getAllV3PoolsFromSubgraph,
  getBestTrade: () => getBestTrade,
  getCandidatePools: () => getCandidatePools,
  getCheckAgainstBaseTokens: () => getCheckAgainstBaseTokens,
  getCommonTokenPrices: () => getCommonTokenPrices,
  getCommonTokenPricesByLlma: () => getCommonTokenPricesByLlma,
  getCommonTokenPricesBySubgraph: () => getCommonTokenPricesBySubgraph,
  getCommonTokenPricesByWalletApi: () => getCommonTokenPricesByWalletApi,
  getExecutionPrice: () => getExecutionPrice,
  getMidPrice: () => getMidPrice,
  getOutputOfPools: () => getOutputOfPools,
  getPairCombinations: () => getPairCombinations,
  getPoolAddress: () => getPoolAddress,
  getPriceImpact: () => getPriceImpact,
  getStableCandidatePools: () => getStableCandidatePools,
  getStablePoolsOnChain: () => getStablePoolsOnChain,
  getTokenUsdPricesBySubgraph: () => getTokenUsdPricesBySubgraph,
  getV2CandidatePools: () => getV2CandidatePools,
  getV2PoolSubgraph: () => getV2PoolSubgraph,
  getV2PoolsOnChain: () => getV2PoolsOnChain,
  getV2PoolsWithTvlByCommonTokenPrices: () => getV2PoolsWithTvlByCommonTokenPrices,
  getV3CandidatePools: () => getV3CandidatePools,
  getV3PoolSubgraph: () => getV3PoolSubgraph,
  getV3PoolsWithTvlFromOnChain: () => getV3PoolsWithTvlFromOnChain,
  getV3PoolsWithTvlFromOnChainFallback: () => getV3PoolsWithTvlFromOnChainFallback,
  getV3PoolsWithTvlFromOnChainStaticFallback: () => getV3PoolsWithTvlFromOnChainStaticFallback,
  getV3PoolsWithoutTicksOnChain: () => getV3PoolsWithoutTicksOnChain,
  involvesCurrency: () => involvesCurrency,
  isStablePool: () => isStablePool,
  isV2Pool: () => isV2Pool,
  isV3Pool: () => isV3Pool,
  isV4BinPool: () => isV4BinPool,
  isV4ClPool: () => isV4ClPool,
  log: () => log,
  logger: () => logger,
  maximumAmountIn: () => maximumAmountIn,
  metric: () => metric,
  minimumAmountOut: () => minimumAmountOut,
  partitionMixedRouteByProtocol: () => partitionMixedRouteByProtocol,
  v2PoolSubgraphSelection: () => v2PoolTvlSelector,
  v2PoolTvlSelector: () => v2PoolTvlSelector,
  v3PoolSubgraphSelection: () => v3PoolTvlSelector,
  v3PoolTvlSelector: () => v3PoolTvlSelector,
  v3PoolsOnChainProviderFactory: () => v3PoolsOnChainProviderFactory
});
function getAmountDistribution(amount, distributionPercent) {
  const percents = [];
  const amounts = [];
  for (let i = 1; i <= 100 / distributionPercent; i++) {
    percents.push(i * distributionPercent);
    amounts.push(amount.multiply(new Fraction(i * distributionPercent, 100)));
  }
  return [percents, amounts];
}

// ../utils/viem/parseUnits.ts
function parseUnits(value, decimals) {
  let [integer, fraction = "0"] = value.split(".");
  const negative = integer.startsWith("-");
  if (negative)
    integer = integer.slice(1);
  fraction = fraction.replace(/(0+)$/, "");
  if (decimals === 0) {
    if (Math.round(Number(`.${fraction}`)) === 1)
      integer = `${BigInt(integer) + 1n}`;
    fraction = "";
  } else if (fraction.length > decimals) {
    const [left, unit, right] = [
      fraction.slice(0, decimals - 1),
      fraction.slice(decimals - 1, decimals),
      fraction.slice(decimals)
    ];
    const rounded = Math.round(Number(`${unit}.${right}`));
    if (rounded > 9)
      fraction = `${BigInt(left) + BigInt(1)}0`.padStart(left.length + 1, "0");
    else
      fraction = `${left}${rounded}`;
    if (fraction.length > decimals) {
      fraction = fraction.slice(1);
      integer = `${BigInt(integer) + 1n}`;
    }
    fraction = fraction.slice(0, decimals);
  } else {
    fraction = fraction.padEnd(decimals, "0");
  }
  return BigInt(`${negative ? "-" : ""}${integer}${fraction}`);
}

// ../utils/tryParseAmount.ts
function tryParseAmount(value, currency) {
  if (!value || !currency) {
    return void 0;
  }
  try {
    const typedValueParsed = parseUnits(value, currency.decimals).toString();
    if (typedValueParsed !== "0") {
      return CurrencyAmount$1.fromRawAmount(currency, BigInt(typedValueParsed));
    }
  } catch (error) {
    console.debug(`Failed to parse input amount: "${value}"`, error);
  }
  return void 0;
}
var tryParseAmount_default = tryParseAmount;

// evm/v3-router/types/pool.ts
var PoolType = /* @__PURE__ */ ((PoolType2) => {
  PoolType2[PoolType2["V2"] = 0] = "V2";
  PoolType2[PoolType2["V3"] = 1] = "V3";
  PoolType2[PoolType2["STABLE"] = 2] = "STABLE";
  PoolType2[PoolType2["V4CL"] = 3] = "V4CL";
  PoolType2[PoolType2["V4BIN"] = 4] = "V4BIN";
  return PoolType2;
})(PoolType || {});

// evm/v3-router/types/route.ts
var RouteType = /* @__PURE__ */ ((RouteType2) => {
  RouteType2[RouteType2["V2"] = 0] = "V2";
  RouteType2[RouteType2["V3"] = 1] = "V3";
  RouteType2[RouteType2["STABLE"] = 2] = "STABLE";
  RouteType2[RouteType2["MIXED"] = 3] = "MIXED";
  RouteType2[RouteType2["MM"] = 4] = "MM";
  RouteType2[RouteType2["V4CL"] = 5] = "V4CL";
  RouteType2[RouteType2["V4BIN"] = 6] = "V4BIN";
  return RouteType2;
})(RouteType || {});

// evm/v3-router/types/v4MixedQuoter.ts
var V4MixedQuoterActions = /* @__PURE__ */ ((V4MixedQuoterActions2) => {
  V4MixedQuoterActions2[V4MixedQuoterActions2["SS_2_EXACT_INPUT_SINGLE"] = 0] = "SS_2_EXACT_INPUT_SINGLE";
  V4MixedQuoterActions2[V4MixedQuoterActions2["SS_3_EXACT_INPUT_SINGLE"] = 1] = "SS_3_EXACT_INPUT_SINGLE";
  V4MixedQuoterActions2[V4MixedQuoterActions2["V2_EXACT_INPUT_SINGLE"] = 2] = "V2_EXACT_INPUT_SINGLE";
  V4MixedQuoterActions2[V4MixedQuoterActions2["V3_EXACT_INPUT_SINGLE"] = 3] = "V3_EXACT_INPUT_SINGLE";
  V4MixedQuoterActions2[V4MixedQuoterActions2["V4_CL_EXACT_INPUT_SINGLE"] = 4] = "V4_CL_EXACT_INPUT_SINGLE";
  V4MixedQuoterActions2[V4MixedQuoterActions2["V4_BIN_EXACT_INPUT_SINGLE"] = 5] = "V4_BIN_EXACT_INPUT_SINGLE";
  return V4MixedQuoterActions2;
})(V4MixedQuoterActions || {});

// evm/v3-router/utils/pool.ts
function isV2Pool(pool) {
  return pool.type === 0 /* V2 */;
}
function isV3Pool(pool) {
  return pool.type === 1 /* V3 */;
}
function isStablePool(pool) {
  return pool.type === 2 /* STABLE */ && pool.balances.length >= 2;
}
function isV4BinPool(pool) {
  return pool.type === 4 /* V4BIN */;
}
function isV4ClPool(pool) {
  return pool.type === 3 /* V4CL */;
}
function involvesCurrency(pool, currency) {
  const token = currency.wrapped;
  if (isV2Pool(pool)) {
    const { reserve0, reserve1 } = pool;
    return reserve0.currency.equals(token) || reserve1.currency.equals(token);
  }
  if (isV3Pool(pool)) {
    const { token0, token1 } = pool;
    return token0.equals(token) || token1.equals(token);
  }
  if (isV4ClPool(pool) || isV4BinPool(pool)) {
    const { currency0, currency1 } = pool;
    return currency0.equals(currency) || currency1.equals(currency) || currency0.wrapped.equals(token) || currency1.wrapped.equals(token);
  }
  if (isStablePool(pool)) {
    const { balances } = pool;
    return balances.some((b) => b.currency.equals(token));
  }
  return false;
}
function getOutputCurrency(pool, currencyIn) {
  const tokenIn = currencyIn.wrapped;
  if (isV2Pool(pool)) {
    const { reserve0, reserve1 } = pool;
    return reserve0.currency.equals(tokenIn) ? reserve1.currency : reserve0.currency;
  }
  if (isV3Pool(pool)) {
    const { token0, token1 } = pool;
    return token0.equals(tokenIn) ? token1 : token0;
  }
  if (isStablePool(pool)) {
    const { balances } = pool;
    return balances[0].currency.equals(tokenIn) ? balances[1].currency : balances[0].currency;
  }
  if (isV4ClPool(pool) || isV4BinPool(pool)) {
    const { currency0, currency1 } = pool;
    return currency0.wrapped.equals(tokenIn) ? currency1 : currency0;
  }
  throw new Error("Cannot get output currency by invalid pool");
}
var computeV3PoolAddress = memoize(
  computePoolAddress,
  ({ deployerAddress, tokenA, tokenB, fee }) => `${tokenA.chainId}_${deployerAddress}_${tokenA.address}_${tokenB.address}_${fee}`
);
var computeV2PoolAddress = memoize(
  Pair.getAddress,
  (tokenA, tokenB) => `${tokenA.chainId}_${tokenA.address}_${tokenB.address}`
);
var getPoolAddress = memoize(
  function getAddress(pool) {
    if (isStablePool(pool) || isV3Pool(pool)) {
      return pool.address;
    }
    if (isV2Pool(pool)) {
      const { reserve0, reserve1 } = pool;
      return computeV2PoolAddress(reserve0.currency.wrapped, reserve1.currency.wrapped);
    }
    return "";
  },
  (pool) => {
    if (isStablePool(pool)) {
      const { balances } = pool;
      const tokenAddresses = balances.map((b) => b.currency.wrapped.address);
      return `${pool.type}_${balances[0]?.currency.chainId}_${tokenAddresses.join("_")}`;
    }
    const [token0, token1] = isV2Pool(pool) ? [pool.reserve0.currency.wrapped, pool.reserve1.currency.wrapped] : isV3Pool(pool) ? [pool.token0.wrapped, pool.token1.wrapped] : [pool.currency0, pool.currency1];
    const fee = isV3Pool(pool) ? pool.fee : "V2_FEE";
    return `${pool.type}_${token0.chainId}_${token0.isNative}_${token0.wrapped.address}_${token1.isNative}_${token1.wrapped.address}_${fee}`;
  }
);
function getTokenPrice(pool, base, quote) {
  if (isV3Pool(pool)) {
    const { token0, token1, fee, liquidity, sqrtRatioX96, tick } = pool;
    const v3Pool = new Pool(token0.wrapped, token1.wrapped, fee, sqrtRatioX96, liquidity, tick);
    return v3Pool.priceOf(base.wrapped);
  }
  if (isV4ClPool(pool)) {
    const { currency0, currency1, fee, liquidity, sqrtRatioX96, tick } = pool;
    const v3Pool = new Pool(currency0.wrapped, currency1.wrapped, fee, sqrtRatioX96, liquidity, tick);
    const tokenPrice = v3Pool.priceOf(base.wrapped);
    const [baseCurrency, quoteCurrency] = base.wrapped.equals(currency0.wrapped) ? [currency0, currency1] : [currency1, currency0];
    return new Price(baseCurrency, quoteCurrency, tokenPrice.denominator, tokenPrice.numerator);
  }
  if (isV4BinPool(pool)) {
    const { activeId, binStep, currency0, currency1 } = pool;
    const rawPrice = getPriceFromId(BigInt(activeId), BigInt(binStep));
    const price = new Price(
      currency0,
      currency1,
      rawPrice * 10n ** BigInt(currency0.decimals),
      SCALE * 10n ** BigInt(currency1.decimals)
    );
    return base.equals(price.baseCurrency) ? price : price.invert();
  }
  if (isV2Pool(pool)) {
    const pair = new Pair(pool.reserve0.wrapped, pool.reserve1.wrapped);
    return pair.priceOf(base.wrapped);
  }
  if (isStablePool(pool)) {
    const { amplifier, balances, fee } = pool;
    const baseIn = tryParseAmount_default("1", base);
    if (!baseIn) {
      throw new Error(`Cannot parse amount for ${base.symbol}`);
    }
    const quoteOut = getSwapOutput({
      amplifier,
      balances,
      fee,
      outputCurrency: quote,
      amount: baseIn
    });
    return new Price({
      baseAmount: baseIn,
      quoteAmount: quoteOut
    });
  }
  return new Price(base, quote, 1n, 0n);
}

// evm/v3-router/utils/encodeMixedRouteToPath.ts
function encodeMixedRouteToPath(route, exactOutput) {
  const firstInputToken = route.input.wrapped;
  const { path, types } = route.pools.reduce(
    ({ inputToken, path: path2, types: types2 }, pool, index) => {
      const outputToken = getOutputCurrency(pool, inputToken).wrapped;
      const fee = isV3Pool(pool) ? pool.fee : V2_FEE_PATH_PLACEHOLDER;
      if (index === 0) {
        return {
          inputToken: outputToken,
          types: ["address", "uint24", "address"],
          path: [inputToken.address, fee, outputToken.address]
        };
      }
      return {
        inputToken: outputToken,
        types: [...types2, "uint24", "address"],
        path: [...path2, fee, outputToken.address]
      };
    },
    { inputToken: firstInputToken, path: [], types: [] }
  );
  return exactOutput ? encodePacked(types.reverse(), path.reverse()) : encodePacked(types, path);
}
function getExecutionPrice(trade) {
  if (!trade) {
    return void 0;
  }
  const { inputAmount, outputAmount } = trade;
  if (inputAmount.quotient === ZERO || outputAmount.quotient === ZERO) {
    return void 0;
  }
  return new Price(inputAmount.currency, outputAmount.currency, inputAmount.quotient, outputAmount.quotient);
}
function getNativeWrappedToken(chainId) {
  return WNATIVE[chainId] ?? null;
}

// evm/v3-router/utils/getOutputOfPools.ts
var getOutputOfPools = (pools, firstInputToken) => {
  const { inputToken: outputToken } = pools.reduce(
    ({ inputToken }, pool) => {
      if (!involvesCurrency(pool, inputToken))
        throw new Error("PATH");
      const output = getOutputCurrency(pool, inputToken);
      return {
        inputToken: output
      };
    },
    { inputToken: firstInputToken }
  );
  return outputToken;
};
function buildBaseRoute(pools, currencyIn, currencyOut) {
  const path = [currencyIn];
  let prevIn = path[0];
  let routeType = null;
  const updateRouteType = (pool, currentRouteType) => {
    if (currentRouteType === null) {
      return getRouteTypeFromPool(pool);
    }
    if (currentRouteType === 3 /* MIXED */ || currentRouteType !== getRouteTypeFromPool(pool)) {
      return 3 /* MIXED */;
    }
    return currentRouteType;
  };
  const lastPool = pools[pools.length - 1];
  for (const pool of pools) {
    routeType = updateRouteType(pool, routeType);
    if (pool === lastPool) {
      path.push(currencyOut);
      continue;
    }
    prevIn = getOutputCurrency(pool, prevIn);
    path.push(prevIn);
  }
  if (routeType === null) {
    throw new Error(`Invalid route type when constructing base route`);
  }
  return {
    path,
    pools,
    type: routeType,
    input: currencyIn,
    output: currencyOut
  };
}
function getRouteTypeFromPool(pool) {
  switch (pool.type) {
    case 0 /* V2 */:
      return 0 /* V2 */;
    case 1 /* V3 */:
      return 1 /* V3 */;
    case 2 /* STABLE */:
      return 2 /* STABLE */;
    case 3 /* V4CL */:
      return 5 /* V4CL */;
    case 4 /* V4BIN */:
      return 6 /* V4BIN */;
    default:
      return 3 /* MIXED */;
  }
}
function getRouteTypeByPools(pools) {
  let routeType;
  for (const p of pools) {
    if (routeType === void 0) {
      routeType = getRouteTypeFromPool(p);
      continue;
    }
    if (routeType === 3 /* MIXED */ || routeType !== getRouteTypeFromPool(p)) {
      routeType = 3 /* MIXED */;
      continue;
    }
  }
  invariant6(routeType !== void 0, "INVALID_ROUTE_TYPE");
  return routeType;
}
function getQuoteCurrency({ input, output }, baseCurrency) {
  return baseCurrency.equals(input) ? output : input;
}
function wrapPrice(price) {
  return new Price(price.baseCurrency.wrapped, price.quoteCurrency.wrapped, price.denominator, price.numerator);
}
function getMidPrice({ path, pools }) {
  let i = 0;
  let price = null;
  const currencyIn = path[0];
  const currencyOut = path[path.length - 1];
  for (const pool of pools) {
    const input = path[i];
    const output = path[i + 1];
    const poolPrice = wrapPrice(getTokenPrice(pool, input, output));
    price = price ? price.multiply(poolPrice) : poolPrice;
    i += 1;
  }
  if (!price) {
    throw new Error("Get mid price failed");
  }
  return new Price(currencyIn, currencyOut, price.denominator, price.numerator);
}

// evm/v3-router/utils/getPriceImpact.ts
function getPriceImpact(trade) {
  let spotOutputAmount = CurrencyAmount.fromRawAmount(trade.outputAmount.currency, 0);
  for (const route of trade.routes) {
    const { inputAmount } = route;
    const midPrice = getMidPrice(route);
    spotOutputAmount = spotOutputAmount.add(
      CurrencyAmount.fromRawAmount(trade.outputAmount.currency, midPrice.wrapped.quote(inputAmount.wrapped).quotient)
    );
  }
  if (spotOutputAmount.equalTo(0)) {
    return ONE_HUNDRED_PERCENT;
  }
  const priceImpact = spotOutputAmount.subtract(trade.outputAmount).divide(spotOutputAmount);
  return new Percent(priceImpact.numerator, priceImpact.denominator);
}

// evm/v3-router/utils/getUsdGasToken.ts
function getUsdGasToken(chainId) {
  return usdGasTokensByChain[chainId]?.[0] ?? null;
}

// evm/v3-router/utils/isCurrenciesSameChain.ts
function isCurrenciesSameChain(...currencies) {
  const chainId = currencies[0]?.chainId;
  for (const currency of currencies) {
    if (currency.chainId !== chainId) {
      return false;
    }
  }
  return true;
}
var SCOPE_PREFIX = "smart-router";
var SCOPE = {
  metric: "metric",
  log: "log",
  error: "error"
};
var log_ = debug(SCOPE_PREFIX);
var metric = log_.extend(SCOPE.metric);
var log = log_.extend(SCOPE.log);
var logger = {
  metric,
  log,
  error: debug(SCOPE_PREFIX).extend(SCOPE.error),
  enable: (namespace) => {
    let namespaces = namespace;
    if (namespace.includes(",")) {
      namespaces = namespace.split(",").map((ns) => `${SCOPE_PREFIX}:${ns}`).join(",");
    } else {
      namespaces = `${SCOPE_PREFIX}:${namespace}`;
    }
    debug.enable(namespaces);
  }
};
function maximumAmountIn(trade, slippage, amountIn = trade.inputAmount) {
  if (trade.tradeType === TradeType.EXACT_INPUT) {
    return amountIn;
  }
  const slippageAdjustedAmountIn = new Fraction(ONE).add(slippage).multiply(amountIn.quotient).quotient;
  return CurrencyAmount.fromRawAmount(amountIn.currency, slippageAdjustedAmountIn);
}
function minimumAmountOut(trade, slippage, amountOut = trade.outputAmount) {
  if (trade.tradeType === TradeType.EXACT_OUTPUT) {
    return amountOut;
  }
  const slippageAdjustedAmountOut = new Fraction(ONE).add(slippage).invert().multiply(amountOut.quotient).quotient;
  return CurrencyAmount.fromRawAmount(amountOut.currency, slippageAdjustedAmountOut);
}

// evm/v3-router/utils/partitionMixedRouteByProtocol.ts
var partitionMixedRouteByProtocol = (route) => {
  const acc = [];
  let left = 0;
  let right = 0;
  while (right < route.pools.length) {
    if (route.pools[left].type !== route.pools[right].type) {
      acc.push(route.pools.slice(left, right));
      left = right;
    }
    right++;
    if (right === route.pools.length) {
      acc.push(route.pools.slice(left, right));
    }
  }
  return acc;
};

// evm/abis/ISwapRouter02.ts
var swapRouter02Abi = [
  {
    inputs: [
      { internalType: "address", name: "_factoryV2", type: "address" },
      { internalType: "address", name: "_deployer", type: "address" },
      { internalType: "address", name: "_factoryV3", type: "address" },
      { internalType: "address", name: "_positionManager", type: "address" },
      { internalType: "address", name: "_stableFactory", type: "address" },
      { internalType: "address", name: "_stableInfo", type: "address" },
      { internalType: "address", name: "_WETH9", type: "address" }
    ],
    stateMutability: "nonpayable",
    type: "constructor"
  },
  {
    anonymous: false,
    inputs: [
      { indexed: true, internalType: "address", name: "previousOwner", type: "address" },
      { indexed: true, internalType: "address", name: "newOwner", type: "address" }
    ],
    name: "OwnershipTransferred",
    type: "event"
  },
  {
    anonymous: false,
    inputs: [
      { indexed: true, internalType: "address", name: "factory", type: "address" },
      { indexed: true, internalType: "address", name: "info", type: "address" }
    ],
    name: "SetStableSwap",
    type: "event"
  },
  {
    inputs: [],
    name: "WETH9",
    outputs: [{ internalType: "address", name: "", type: "address" }],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [{ internalType: "address", name: "token", type: "address" }],
    name: "approveMax",
    outputs: [],
    stateMutability: "payable",
    type: "function"
  },
  {
    inputs: [{ internalType: "address", name: "token", type: "address" }],
    name: "approveMaxMinusOne",
    outputs: [],
    stateMutability: "payable",
    type: "function"
  },
  {
    inputs: [{ internalType: "address", name: "token", type: "address" }],
    name: "approveZeroThenMax",
    outputs: [],
    stateMutability: "payable",
    type: "function"
  },
  {
    inputs: [{ internalType: "address", name: "token", type: "address" }],
    name: "approveZeroThenMaxMinusOne",
    outputs: [],
    stateMutability: "payable",
    type: "function"
  },
  {
    inputs: [{ internalType: "bytes", name: "data", type: "bytes" }],
    name: "callPositionManager",
    outputs: [{ internalType: "bytes", name: "result", type: "bytes" }],
    stateMutability: "payable",
    type: "function"
  },
  {
    inputs: [
      { internalType: "bytes[]", name: "paths", type: "bytes[]" },
      { internalType: "uint128[]", name: "amounts", type: "uint128[]" },
      { internalType: "uint24", name: "maximumTickDivergence", type: "uint24" },
      { internalType: "uint32", name: "secondsAgo", type: "uint32" }
    ],
    name: "checkOracleSlippage",
    outputs: [],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [
      { internalType: "bytes", name: "path", type: "bytes" },
      { internalType: "uint24", name: "maximumTickDivergence", type: "uint24" },
      { internalType: "uint32", name: "secondsAgo", type: "uint32" }
    ],
    name: "checkOracleSlippage",
    outputs: [],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [],
    name: "deployer",
    outputs: [{ internalType: "address", name: "", type: "address" }],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [
      {
        components: [
          { internalType: "bytes", name: "path", type: "bytes" },
          { internalType: "address", name: "recipient", type: "address" },
          { internalType: "uint256", name: "amountIn", type: "uint256" },
          { internalType: "uint256", name: "amountOutMinimum", type: "uint256" }
        ],
        internalType: "struct IV3SwapRouter.ExactInputParams",
        name: "params",
        type: "tuple"
      }
    ],
    name: "exactInput",
    outputs: [{ internalType: "uint256", name: "amountOut", type: "uint256" }],
    stateMutability: "payable",
    type: "function"
  },
  {
    inputs: [
      {
        components: [
          { internalType: "address", name: "tokenIn", type: "address" },
          { internalType: "address", name: "tokenOut", type: "address" },
          { internalType: "uint24", name: "fee", type: "uint24" },
          { internalType: "address", name: "recipient", type: "address" },
          { internalType: "uint256", name: "amountIn", type: "uint256" },
          { internalType: "uint256", name: "amountOutMinimum", type: "uint256" },
          { internalType: "uint160", name: "sqrtPriceLimitX96", type: "uint160" }
        ],
        internalType: "struct IV3SwapRouter.ExactInputSingleParams",
        name: "params",
        type: "tuple"
      }
    ],
    name: "exactInputSingle",
    outputs: [{ internalType: "uint256", name: "amountOut", type: "uint256" }],
    stateMutability: "payable",
    type: "function"
  },
  {
    inputs: [
      { internalType: "address[]", name: "path", type: "address[]" },
      { internalType: "uint256[]", name: "flag", type: "uint256[]" },
      { internalType: "uint256", name: "amountIn", type: "uint256" },
      { internalType: "uint256", name: "amountOutMin", type: "uint256" },
      { internalType: "address", name: "to", type: "address" }
    ],
    name: "exactInputStableSwap",
    outputs: [{ internalType: "uint256", name: "amountOut", type: "uint256" }],
    stateMutability: "payable",
    type: "function"
  },
  {
    inputs: [
      {
        components: [
          { internalType: "bytes", name: "path", type: "bytes" },
          { internalType: "address", name: "recipient", type: "address" },
          { internalType: "uint256", name: "amountOut", type: "uint256" },
          { internalType: "uint256", name: "amountInMaximum", type: "uint256" }
        ],
        internalType: "struct IV3SwapRouter.ExactOutputParams",
        name: "params",
        type: "tuple"
      }
    ],
    name: "exactOutput",
    outputs: [{ internalType: "uint256", name: "amountIn", type: "uint256" }],
    stateMutability: "payable",
    type: "function"
  },
  {
    inputs: [
      {
        components: [
          { internalType: "address", name: "tokenIn", type: "address" },
          { internalType: "address", name: "tokenOut", type: "address" },
          { internalType: "uint24", name: "fee", type: "uint24" },
          { internalType: "address", name: "recipient", type: "address" },
          { internalType: "uint256", name: "amountOut", type: "uint256" },
          { internalType: "uint256", name: "amountInMaximum", type: "uint256" },
          { internalType: "uint160", name: "sqrtPriceLimitX96", type: "uint160" }
        ],
        internalType: "struct IV3SwapRouter.ExactOutputSingleParams",
        name: "params",
        type: "tuple"
      }
    ],
    name: "exactOutputSingle",
    outputs: [{ internalType: "uint256", name: "amountIn", type: "uint256" }],
    stateMutability: "payable",
    type: "function"
  },
  {
    inputs: [
      { internalType: "address[]", name: "path", type: "address[]" },
      { internalType: "uint256[]", name: "flag", type: "uint256[]" },
      { internalType: "uint256", name: "amountOut", type: "uint256" },
      { internalType: "uint256", name: "amountInMax", type: "uint256" },
      { internalType: "address", name: "to", type: "address" }
    ],
    name: "exactOutputStableSwap",
    outputs: [{ internalType: "uint256", name: "amountIn", type: "uint256" }],
    stateMutability: "payable",
    type: "function"
  },
  {
    inputs: [],
    name: "factory",
    outputs: [{ internalType: "address", name: "", type: "address" }],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [],
    name: "factoryV2",
    outputs: [{ internalType: "address", name: "", type: "address" }],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [
      { internalType: "address", name: "token", type: "address" },
      { internalType: "uint256", name: "amount", type: "uint256" }
    ],
    name: "getApprovalType",
    outputs: [{ internalType: "enum IApproveAndCall.ApprovalType", name: "", type: "uint8" }],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [
      {
        components: [
          { internalType: "address", name: "token0", type: "address" },
          { internalType: "address", name: "token1", type: "address" },
          { internalType: "uint256", name: "tokenId", type: "uint256" },
          { internalType: "uint256", name: "amount0Min", type: "uint256" },
          { internalType: "uint256", name: "amount1Min", type: "uint256" }
        ],
        internalType: "struct IApproveAndCall.IncreaseLiquidityParams",
        name: "params",
        type: "tuple"
      }
    ],
    name: "increaseLiquidity",
    outputs: [{ internalType: "bytes", name: "result", type: "bytes" }],
    stateMutability: "payable",
    type: "function"
  },
  {
    inputs: [
      {
        components: [
          { internalType: "address", name: "token0", type: "address" },
          { internalType: "address", name: "token1", type: "address" },
          { internalType: "uint24", name: "fee", type: "uint24" },
          { internalType: "int24", name: "tickLower", type: "int24" },
          { internalType: "int24", name: "tickUpper", type: "int24" },
          { internalType: "uint256", name: "amount0Min", type: "uint256" },
          { internalType: "uint256", name: "amount1Min", type: "uint256" },
          { internalType: "address", name: "recipient", type: "address" }
        ],
        internalType: "struct IApproveAndCall.MintParams",
        name: "params",
        type: "tuple"
      }
    ],
    name: "mint",
    outputs: [{ internalType: "bytes", name: "result", type: "bytes" }],
    stateMutability: "payable",
    type: "function"
  },
  {
    inputs: [
      { internalType: "bytes32", name: "previousBlockhash", type: "bytes32" },
      { internalType: "bytes[]", name: "data", type: "bytes[]" }
    ],
    name: "multicall",
    outputs: [{ internalType: "bytes[]", name: "", type: "bytes[]" }],
    stateMutability: "payable",
    type: "function"
  },
  {
    inputs: [
      { internalType: "uint256", name: "deadline", type: "uint256" },
      { internalType: "bytes[]", name: "data", type: "bytes[]" }
    ],
    name: "multicall",
    outputs: [{ internalType: "bytes[]", name: "", type: "bytes[]" }],
    stateMutability: "payable",
    type: "function"
  },
  {
    inputs: [{ internalType: "bytes[]", name: "data", type: "bytes[]" }],
    name: "multicall",
    outputs: [{ internalType: "bytes[]", name: "results", type: "bytes[]" }],
    stateMutability: "payable",
    type: "function"
  },
  {
    inputs: [],
    name: "owner",
    outputs: [{ internalType: "address", name: "", type: "address" }],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [
      { internalType: "int256", name: "amount0Delta", type: "int256" },
      { internalType: "int256", name: "amount1Delta", type: "int256" },
      { internalType: "bytes", name: "_data", type: "bytes" }
    ],
    name: "pancakeV3SwapCallback",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [],
    name: "positionManager",
    outputs: [{ internalType: "address", name: "", type: "address" }],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [
      { internalType: "address", name: "token", type: "address" },
      { internalType: "uint256", name: "value", type: "uint256" }
    ],
    name: "pull",
    outputs: [],
    stateMutability: "payable",
    type: "function"
  },
  { inputs: [], name: "refundETH", outputs: [], stateMutability: "payable", type: "function" },
  { inputs: [], name: "renounceOwnership", outputs: [], stateMutability: "nonpayable", type: "function" },
  {
    inputs: [
      { internalType: "address", name: "token", type: "address" },
      { internalType: "uint256", name: "value", type: "uint256" },
      { internalType: "uint256", name: "deadline", type: "uint256" },
      { internalType: "uint8", name: "v", type: "uint8" },
      { internalType: "bytes32", name: "r", type: "bytes32" },
      { internalType: "bytes32", name: "s", type: "bytes32" }
    ],
    name: "selfPermit",
    outputs: [],
    stateMutability: "payable",
    type: "function"
  },
  {
    inputs: [
      { internalType: "address", name: "token", type: "address" },
      { internalType: "uint256", name: "nonce", type: "uint256" },
      { internalType: "uint256", name: "expiry", type: "uint256" },
      { internalType: "uint8", name: "v", type: "uint8" },
      { internalType: "bytes32", name: "r", type: "bytes32" },
      { internalType: "bytes32", name: "s", type: "bytes32" }
    ],
    name: "selfPermitAllowed",
    outputs: [],
    stateMutability: "payable",
    type: "function"
  },
  {
    inputs: [
      { internalType: "address", name: "token", type: "address" },
      { internalType: "uint256", name: "nonce", type: "uint256" },
      { internalType: "uint256", name: "expiry", type: "uint256" },
      { internalType: "uint8", name: "v", type: "uint8" },
      { internalType: "bytes32", name: "r", type: "bytes32" },
      { internalType: "bytes32", name: "s", type: "bytes32" }
    ],
    name: "selfPermitAllowedIfNecessary",
    outputs: [],
    stateMutability: "payable",
    type: "function"
  },
  {
    inputs: [
      { internalType: "address", name: "token", type: "address" },
      { internalType: "uint256", name: "value", type: "uint256" },
      { internalType: "uint256", name: "deadline", type: "uint256" },
      { internalType: "uint8", name: "v", type: "uint8" },
      { internalType: "bytes32", name: "r", type: "bytes32" },
      { internalType: "bytes32", name: "s", type: "bytes32" }
    ],
    name: "selfPermitIfNecessary",
    outputs: [],
    stateMutability: "payable",
    type: "function"
  },
  {
    inputs: [
      { internalType: "address", name: "_factory", type: "address" },
      { internalType: "address", name: "_info", type: "address" }
    ],
    name: "setStableSwap",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [],
    name: "stableSwapFactory",
    outputs: [{ internalType: "address", name: "", type: "address" }],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [],
    name: "stableSwapInfo",
    outputs: [{ internalType: "address", name: "", type: "address" }],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [
      { internalType: "uint256", name: "amountIn", type: "uint256" },
      { internalType: "uint256", name: "amountOutMin", type: "uint256" },
      { internalType: "address[]", name: "path", type: "address[]" },
      { internalType: "address", name: "to", type: "address" }
    ],
    name: "swapExactTokensForTokens",
    outputs: [{ internalType: "uint256", name: "amountOut", type: "uint256" }],
    stateMutability: "payable",
    type: "function"
  },
  {
    inputs: [
      { internalType: "uint256", name: "amountOut", type: "uint256" },
      { internalType: "uint256", name: "amountInMax", type: "uint256" },
      { internalType: "address[]", name: "path", type: "address[]" },
      { internalType: "address", name: "to", type: "address" }
    ],
    name: "swapTokensForExactTokens",
    outputs: [{ internalType: "uint256", name: "amountIn", type: "uint256" }],
    stateMutability: "payable",
    type: "function"
  },
  {
    inputs: [
      { internalType: "address", name: "token", type: "address" },
      { internalType: "uint256", name: "amountMinimum", type: "uint256" },
      { internalType: "address", name: "recipient", type: "address" }
    ],
    name: "sweepToken",
    outputs: [],
    stateMutability: "payable",
    type: "function"
  },
  {
    inputs: [
      { internalType: "address", name: "token", type: "address" },
      { internalType: "uint256", name: "amountMinimum", type: "uint256" }
    ],
    name: "sweepToken",
    outputs: [],
    stateMutability: "payable",
    type: "function"
  },
  {
    inputs: [
      { internalType: "address", name: "token", type: "address" },
      { internalType: "uint256", name: "amountMinimum", type: "uint256" },
      { internalType: "uint256", name: "feeBips", type: "uint256" },
      { internalType: "address", name: "feeRecipient", type: "address" }
    ],
    name: "sweepTokenWithFee",
    outputs: [],
    stateMutability: "payable",
    type: "function"
  },
  {
    inputs: [
      { internalType: "address", name: "token", type: "address" },
      { internalType: "uint256", name: "amountMinimum", type: "uint256" },
      { internalType: "address", name: "recipient", type: "address" },
      { internalType: "uint256", name: "feeBips", type: "uint256" },
      { internalType: "address", name: "feeRecipient", type: "address" }
    ],
    name: "sweepTokenWithFee",
    outputs: [],
    stateMutability: "payable",
    type: "function"
  },
  {
    inputs: [{ internalType: "address", name: "newOwner", type: "address" }],
    name: "transferOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [
      { internalType: "uint256", name: "amountMinimum", type: "uint256" },
      { internalType: "address", name: "recipient", type: "address" }
    ],
    name: "unwrapWETH9",
    outputs: [],
    stateMutability: "payable",
    type: "function"
  },
  {
    inputs: [
      { internalType: "uint256", name: "amountMinimum", type: "uint256" },
      { internalType: "address", name: "recipient", type: "address" },
      { internalType: "uint256", name: "feeBips", type: "uint256" },
      { internalType: "address", name: "feeRecipient", type: "address" }
    ],
    name: "unwrapWETH9WithFee",
    outputs: [],
    stateMutability: "payable",
    type: "function"
  },
  {
    inputs: [
      { internalType: "uint256", name: "amountMinimum", type: "uint256" },
      { internalType: "uint256", name: "feeBips", type: "uint256" },
      { internalType: "address", name: "feeRecipient", type: "address" }
    ],
    name: "unwrapWETH9WithFee",
    outputs: [],
    stateMutability: "payable",
    type: "function"
  },
  {
    inputs: [{ internalType: "uint256", name: "value", type: "uint256" }],
    name: "wrapETH",
    outputs: [],
    stateMutability: "payable",
    type: "function"
  },
  { stateMutability: "payable", type: "receive" }
];

// evm/abis/IApproveAndCall.ts
var approveAndCallAbi = [
  {
    inputs: [
      {
        internalType: "address",
        name: "token",
        type: "address"
      }
    ],
    name: "approveMax",
    outputs: [],
    stateMutability: "payable",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "token",
        type: "address"
      }
    ],
    name: "approveMaxMinusOne",
    outputs: [],
    stateMutability: "payable",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "token",
        type: "address"
      }
    ],
    name: "approveZeroThenMax",
    outputs: [],
    stateMutability: "payable",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "token",
        type: "address"
      }
    ],
    name: "approveZeroThenMaxMinusOne",
    outputs: [],
    stateMutability: "payable",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "bytes",
        name: "data",
        type: "bytes"
      }
    ],
    name: "callPositionManager",
    outputs: [
      {
        internalType: "bytes",
        name: "result",
        type: "bytes"
      }
    ],
    stateMutability: "payable",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "token",
        type: "address"
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256"
      }
    ],
    name: "getApprovalType",
    outputs: [
      {
        internalType: "enum IApproveAndCall.ApprovalType",
        name: "",
        type: "uint8"
      }
    ],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [
      {
        components: [
          {
            internalType: "address",
            name: "token0",
            type: "address"
          },
          {
            internalType: "address",
            name: "token1",
            type: "address"
          },
          {
            internalType: "uint256",
            name: "tokenId",
            type: "uint256"
          },
          {
            internalType: "uint256",
            name: "amount0Min",
            type: "uint256"
          },
          {
            internalType: "uint256",
            name: "amount1Min",
            type: "uint256"
          }
        ],
        internalType: "struct IApproveAndCall.IncreaseLiquidityParams",
        name: "params",
        type: "tuple"
      }
    ],
    name: "increaseLiquidity",
    outputs: [
      {
        internalType: "bytes",
        name: "result",
        type: "bytes"
      }
    ],
    stateMutability: "payable",
    type: "function"
  },
  {
    inputs: [
      {
        components: [
          {
            internalType: "address",
            name: "token0",
            type: "address"
          },
          {
            internalType: "address",
            name: "token1",
            type: "address"
          },
          {
            internalType: "uint24",
            name: "fee",
            type: "uint24"
          },
          {
            internalType: "int24",
            name: "tickLower",
            type: "int24"
          },
          {
            internalType: "int24",
            name: "tickUpper",
            type: "int24"
          },
          {
            internalType: "uint256",
            name: "amount0Min",
            type: "uint256"
          },
          {
            internalType: "uint256",
            name: "amount1Min",
            type: "uint256"
          },
          {
            internalType: "address",
            name: "recipient",
            type: "address"
          }
        ],
        internalType: "struct IApproveAndCall.MintParams",
        name: "params",
        type: "tuple"
      }
    ],
    name: "mint",
    outputs: [
      {
        internalType: "bytes",
        name: "result",
        type: "bytes"
      }
    ],
    stateMutability: "payable",
    type: "function"
  }
];

// evm/v3-router/utils/approveAndCall.ts
function isMint(options) {
  return Object.keys(options).some((k) => k === "recipient");
}
var _ApproveAndCall = class {
  /**
   * Cannot be constructed.
   */
  // eslint-disable-next-line no-useless-constructor, @typescript-eslint/no-empty-function
  constructor() {
  }
  static encodeApproveMax(token) {
    return encodeFunctionData({
      abi: _ApproveAndCall.ABI,
      functionName: "approveMax",
      args: [token.address]
    });
  }
  static encodeApproveMaxMinusOne(token) {
    return encodeFunctionData({
      abi: _ApproveAndCall.ABI,
      functionName: "approveMaxMinusOne",
      args: [token.address]
    });
  }
  static encodeApproveZeroThenMax(token) {
    return encodeFunctionData({
      abi: _ApproveAndCall.ABI,
      functionName: "approveZeroThenMax",
      args: [token.address]
    });
  }
  static encodeApproveZeroThenMaxMinusOne(token) {
    return encodeFunctionData({
      abi: _ApproveAndCall.ABI,
      functionName: "approveZeroThenMaxMinusOne",
      args: [token.address]
    });
  }
  static encodeCallPositionManager(calldatas) {
    invariant6(calldatas.length > 0, "NULL_CALLDATA");
    if (calldatas.length === 1) {
      return encodeFunctionData({
        abi: _ApproveAndCall.ABI,
        functionName: "callPositionManager",
        args: calldatas
      });
    }
    const encodedMulticall = encodeFunctionData({
      abi: NonfungiblePositionManager.ABI,
      functionName: "multicall",
      args: [calldatas]
    });
    return encodeFunctionData({
      abi: _ApproveAndCall.ABI,
      functionName: "callPositionManager",
      args: [encodedMulticall]
    });
  }
  /**
   * Encode adding liquidity to a position in the nft manager contract
   * @param position Forcasted position with expected amount out from swap
   * @param minimalPosition Forcasted position with custom minimal token amounts
   * @param addLiquidityOptions Options for adding liquidity
   * @param slippageTolerance Defines maximum slippage
   */
  static encodeAddLiquidity(position, minimalPosition, addLiquidityOptions, slippageTolerance) {
    let { amount0: amount0Min, amount1: amount1Min } = position.mintAmountsWithSlippage(slippageTolerance);
    if (minimalPosition.amount0.quotient < amount0Min) {
      amount0Min = minimalPosition.amount0.quotient;
    }
    if (minimalPosition.amount1.quotient < amount1Min) {
      amount1Min = minimalPosition.amount1.quotient;
    }
    if (isMint(addLiquidityOptions)) {
      return encodeFunctionData({
        abi: _ApproveAndCall.ABI,
        functionName: "mint",
        args: [
          {
            token0: position.pool.token0.address,
            token1: position.pool.token1.address,
            fee: position.pool.fee,
            tickLower: position.tickLower,
            tickUpper: position.tickUpper,
            amount0Min,
            amount1Min,
            recipient: addLiquidityOptions.recipient
          }
        ]
      });
    }
    return encodeFunctionData({
      abi: _ApproveAndCall.ABI,
      functionName: "increaseLiquidity",
      args: [
        {
          token0: position.pool.token0.address,
          token1: position.pool.token1.address,
          amount0Min,
          amount1Min,
          tokenId: BigInt(addLiquidityOptions.tokenId)
        }
      ]
    });
  }
  static encodeApprove(token, approvalType) {
    switch (approvalType) {
      case 1 /* MAX */:
        return _ApproveAndCall.encodeApproveMax(token.wrapped);
      case 2 /* MAX_MINUS_ONE */:
        return _ApproveAndCall.encodeApproveMaxMinusOne(token.wrapped);
      case 3 /* ZERO_THEN_MAX */:
        return _ApproveAndCall.encodeApproveZeroThenMax(token.wrapped);
      case 4 /* ZERO_THEN_MAX_MINUS_ONE */:
        return _ApproveAndCall.encodeApproveZeroThenMaxMinusOne(token.wrapped);
      default:
        throw new Error("Error: invalid ApprovalType");
    }
  }
};
var ApproveAndCall = _ApproveAndCall;
ApproveAndCall.ABI = approveAndCallAbi;

// evm/abis/IMulticallExtended.ts
var multicallExtendedAbi = [
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "previousBlockhash",
        type: "bytes32"
      },
      {
        internalType: "bytes[]",
        name: "data",
        type: "bytes[]"
      }
    ],
    name: "multicall",
    outputs: [
      {
        internalType: "bytes[]",
        name: "results",
        type: "bytes[]"
      }
    ],
    stateMutability: "payable",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "deadline",
        type: "uint256"
      },
      {
        internalType: "bytes[]",
        name: "data",
        type: "bytes[]"
      }
    ],
    name: "multicall",
    outputs: [
      {
        internalType: "bytes[]",
        name: "results",
        type: "bytes[]"
      }
    ],
    stateMutability: "payable",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "bytes[]",
        name: "data",
        type: "bytes[]"
      }
    ],
    name: "multicall",
    outputs: [
      {
        internalType: "bytes[]",
        name: "results",
        type: "bytes[]"
      }
    ],
    stateMutability: "payable",
    type: "function"
  }
];

// evm/v3-router/utils/multicallExtended.ts
function validateAndParseBytes32(bytes32) {
  if (!bytes32.match(/^0x[0-9a-fA-F]{64}$/)) {
    throw new Error(`${bytes32} is not valid bytes32.`);
  }
  return bytes32.toLowerCase();
}
var _MulticallExtended = class {
  /**
   * Cannot be constructed.
   */
  // eslint-disable-next-line no-useless-constructor, @typescript-eslint/no-empty-function
  constructor() {
  }
  static encodeMulticall(calldatas, validation) {
    if (typeof validation === "undefined") {
      return Multicall.encodeMulticall(calldatas);
    }
    if (!Array.isArray(calldatas)) {
      calldatas = [calldatas];
    }
    if (typeof validation === "string" && validation.startsWith("0x")) {
      const previousBlockhash = validateAndParseBytes32(validation);
      return encodeFunctionData({
        abi: _MulticallExtended.ABI,
        functionName: "multicall",
        args: [previousBlockhash, calldatas]
      });
    }
    const deadline = BigInt(validation);
    return encodeFunctionData({
      abi: _MulticallExtended.ABI,
      functionName: "multicall",
      args: [deadline, calldatas]
    });
  }
};
var MulticallExtended = _MulticallExtended;
MulticallExtended.ABI = multicallExtendedAbi;

// evm/abis/IPeripheryPaymentsWithFeeExtended.ts
var peripheryPaymentsWithFeeExtendedAbi = [
  {
    inputs: [
      {
        internalType: "address",
        name: "token",
        type: "address"
      },
      {
        internalType: "uint256",
        name: "value",
        type: "uint256"
      }
    ],
    name: "pull",
    outputs: [],
    stateMutability: "payable",
    type: "function"
  },
  {
    inputs: [],
    name: "refundETH",
    outputs: [],
    stateMutability: "payable",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "token",
        type: "address"
      },
      {
        internalType: "uint256",
        name: "amountMinimum",
        type: "uint256"
      }
    ],
    name: "sweepToken",
    outputs: [],
    stateMutability: "payable",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "token",
        type: "address"
      },
      {
        internalType: "uint256",
        name: "amountMinimum",
        type: "uint256"
      },
      {
        internalType: "address",
        name: "recipient",
        type: "address"
      }
    ],
    name: "sweepToken",
    outputs: [],
    stateMutability: "payable",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "token",
        type: "address"
      },
      {
        internalType: "uint256",
        name: "amountMinimum",
        type: "uint256"
      },
      {
        internalType: "uint256",
        name: "feeBips",
        type: "uint256"
      },
      {
        internalType: "address",
        name: "feeRecipient",
        type: "address"
      }
    ],
    name: "sweepTokenWithFee",
    outputs: [],
    stateMutability: "payable",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "token",
        type: "address"
      },
      {
        internalType: "uint256",
        name: "amountMinimum",
        type: "uint256"
      },
      {
        internalType: "address",
        name: "recipient",
        type: "address"
      },
      {
        internalType: "uint256",
        name: "feeBips",
        type: "uint256"
      },
      {
        internalType: "address",
        name: "feeRecipient",
        type: "address"
      }
    ],
    name: "sweepTokenWithFee",
    outputs: [],
    stateMutability: "payable",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "amountMinimum",
        type: "uint256"
      }
    ],
    name: "unwrapWETH9",
    outputs: [],
    stateMutability: "payable",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "amountMinimum",
        type: "uint256"
      },
      {
        internalType: "address",
        name: "recipient",
        type: "address"
      }
    ],
    name: "unwrapWETH9",
    outputs: [],
    stateMutability: "payable",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "amountMinimum",
        type: "uint256"
      },
      {
        internalType: "uint256",
        name: "feeBips",
        type: "uint256"
      },
      {
        internalType: "address",
        name: "feeRecipient",
        type: "address"
      }
    ],
    name: "unwrapWETH9WithFee",
    outputs: [],
    stateMutability: "payable",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "amountMinimum",
        type: "uint256"
      },
      {
        internalType: "address",
        name: "recipient",
        type: "address"
      },
      {
        internalType: "uint256",
        name: "feeBips",
        type: "uint256"
      },
      {
        internalType: "address",
        name: "feeRecipient",
        type: "address"
      }
    ],
    name: "unwrapWETH9WithFee",
    outputs: [],
    stateMutability: "payable",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "value",
        type: "uint256"
      }
    ],
    name: "wrapETH",
    outputs: [],
    stateMutability: "payable",
    type: "function"
  }
];

// evm/v3-router/utils/paymentsExtended.ts
function encodeFeeBips(fee) {
  return fee.multiply(1e4).quotient;
}
var _PaymentsExtended = class {
  /**
   * Cannot be constructed.
   */
  // eslint-disable-next-line no-useless-constructor, @typescript-eslint/no-empty-function
  constructor() {
  }
  static encodeUnwrapWETH9(amountMinimum, recipient, feeOptions) {
    if (typeof recipient === "string") {
      return Payments.encodeUnwrapWETH9(amountMinimum, recipient, feeOptions);
    }
    if (!!feeOptions) {
      const feeBips = encodeFeeBips(feeOptions.fee);
      const feeRecipient = validateAndParseAddress(feeOptions.recipient);
      return encodeFunctionData({
        abi: _PaymentsExtended.ABI,
        functionName: "unwrapWETH9WithFee",
        args: [amountMinimum, feeBips, feeRecipient]
      });
    }
    return encodeFunctionData({
      abi: _PaymentsExtended.ABI,
      functionName: "unwrapWETH9",
      args: [amountMinimum]
    });
  }
  static encodeSweepToken(token, amountMinimum, recipient, feeOptions) {
    if (typeof recipient === "string") {
      return Payments.encodeSweepToken(token, amountMinimum, recipient, feeOptions);
    }
    if (!!feeOptions) {
      const feeBips = encodeFeeBips(feeOptions.fee);
      const feeRecipient = validateAndParseAddress(feeOptions.recipient);
      return encodeFunctionData({
        abi: _PaymentsExtended.ABI,
        functionName: "sweepTokenWithFee",
        args: [token.address, amountMinimum, feeBips, feeRecipient]
      });
    }
    return encodeFunctionData({
      abi: _PaymentsExtended.ABI,
      functionName: "sweepToken",
      args: [token.address, amountMinimum]
    });
  }
  static encodePull(token, amount) {
    return encodeFunctionData({ abi: _PaymentsExtended.ABI, functionName: "pull", args: [token.address, amount] });
  }
  static encodeWrapETH(amount) {
    return encodeFunctionData({ abi: _PaymentsExtended.ABI, functionName: "wrapETH", args: [amount] });
  }
};
var PaymentsExtended = _PaymentsExtended;
PaymentsExtended.ABI = peripheryPaymentsWithFeeExtendedAbi;

// evm/v3-router/utils/swapRouter.ts
var ZERO2 = 0n;
var REFUND_ETH_PRICE_IMPACT_THRESHOLD = new Percent(50n, 100n);
var _SwapRouter = class {
  /**
   * Cannot be constructed.
   */
  // eslint-disable-next-line no-useless-constructor, @typescript-eslint/no-empty-function
  constructor() {
  }
  /**
   * @notice Generates the calldata for a Swap with a V2 Route.
   * @param trade The V2Trade to encode.
   * @param options SwapOptions to use for the trade.
   * @param routerMustCustody Flag for whether funds should be sent to the router
   * @param performAggregatedSlippageCheck Flag for whether we want to perform an aggregated slippage check
   * @returns A string array of calldatas for the trade.
   */
  static encodeV2Swap(trade, options, routerMustCustody, performAggregatedSlippageCheck) {
    const amountIn = maximumAmountIn(trade, options.slippageTolerance).quotient;
    const amountOut = minimumAmountOut(trade, options.slippageTolerance).quotient;
    const route = trade.routes[0];
    const path = route.path.map((token) => token.wrapped.address);
    const recipient = routerMustCustody ? ADDRESS_THIS : typeof options.recipient === "undefined" ? MSG_SENDER : validateAndParseAddress(options.recipient);
    if (trade.tradeType === TradeType.EXACT_INPUT) {
      const exactInputParams = [amountIn, performAggregatedSlippageCheck ? 0n : amountOut, path, recipient];
      return encodeFunctionData({
        abi: _SwapRouter.ABI,
        functionName: "swapExactTokensForTokens",
        args: exactInputParams
      });
    }
    const exactOutputParams = [amountOut, amountIn, path, recipient];
    return encodeFunctionData({
      abi: _SwapRouter.ABI,
      functionName: "swapTokensForExactTokens",
      args: exactOutputParams
    });
  }
  /**
   * @notice Generates the calldata for a Swap with a Stable Route.
   * @param trade The Trade to encode.
   * @param options SwapOptions to use for the trade.
   * @param routerMustCustody Flag for whether funds should be sent to the router
   * @param performAggregatedSlippageCheck Flag for whether we want to perform an aggregated slippage check
   * @returns A string array of calldatas for the trade.
   */
  static encodeStableSwap(trade, options, routerMustCustody, performAggregatedSlippageCheck) {
    const amountIn = maximumAmountIn(trade, options.slippageTolerance).quotient;
    const amountOut = minimumAmountOut(trade, options.slippageTolerance).quotient;
    if (trade.routes.length > 1 || trade.routes[0].pools.some((p) => !isStablePool(p))) {
      throw new Error("Unsupported trade to encode");
    }
    const route = trade.routes[0];
    const path = route.path.map((token) => token.wrapped.address);
    const flags = route.pools.map((p) => BigInt(p.balances.length));
    const recipient = routerMustCustody ? ADDRESS_THIS : typeof options.recipient === "undefined" ? MSG_SENDER : validateAndParseAddress(options.recipient);
    if (trade.tradeType === TradeType.EXACT_INPUT) {
      const exactInputParams = [
        path,
        flags,
        amountIn,
        performAggregatedSlippageCheck ? 0n : amountOut,
        recipient
      ];
      return encodeFunctionData({
        abi: _SwapRouter.ABI,
        functionName: "exactInputStableSwap",
        args: exactInputParams
      });
    }
    const exactOutputParams = [path, flags, amountOut, amountIn, recipient];
    return encodeFunctionData({
      abi: _SwapRouter.ABI,
      functionName: "exactOutputStableSwap",
      args: exactOutputParams
    });
  }
  /**
   * @notice Generates the calldata for a Swap with a V3 Route.
   * @param trade The V3Trade to encode.
   * @param options SwapOptions to use for the trade.
   * @param routerMustCustody Flag for whether funds should be sent to the router
   * @param performAggregatedSlippageCheck Flag for whether we want to perform an aggregated slippage check
   * @returns A string array of calldatas for the trade.
   */
  static encodeV3Swap(trade, options, routerMustCustody, performAggregatedSlippageCheck) {
    const calldatas = [];
    for (const route of trade.routes) {
      const { inputAmount, outputAmount, pools, path } = route;
      const amountIn = maximumAmountIn(trade, options.slippageTolerance, inputAmount).quotient;
      const amountOut = minimumAmountOut(trade, options.slippageTolerance, outputAmount).quotient;
      const singleHop = pools.length === 1;
      const recipient = routerMustCustody ? ADDRESS_THIS : typeof options.recipient === "undefined" ? MSG_SENDER : validateAndParseAddress(options.recipient);
      if (singleHop) {
        if (trade.tradeType === TradeType.EXACT_INPUT) {
          const exactInputSingleParams = {
            tokenIn: path[0].wrapped.address,
            tokenOut: path[1].wrapped.address,
            fee: pools[0].fee,
            recipient,
            amountIn,
            amountOutMinimum: performAggregatedSlippageCheck ? 0n : amountOut,
            sqrtPriceLimitX96: 0n
          };
          calldatas.push(
            encodeFunctionData({
              abi: _SwapRouter.ABI,
              functionName: "exactInputSingle",
              args: [exactInputSingleParams]
            })
          );
        } else {
          const exactOutputSingleParams = {
            tokenIn: path[0].wrapped.address,
            tokenOut: path[1].wrapped.address,
            fee: pools[0].fee,
            recipient,
            amountOut,
            amountInMaximum: amountIn,
            sqrtPriceLimitX96: 0n
          };
          calldatas.push(
            encodeFunctionData({
              abi: _SwapRouter.ABI,
              functionName: "exactOutputSingle",
              args: [exactOutputSingleParams]
            })
          );
        }
      } else {
        const pathStr = encodeMixedRouteToPath(
          { ...route, input: inputAmount.currency, output: outputAmount.currency },
          trade.tradeType === TradeType.EXACT_OUTPUT
        );
        if (trade.tradeType === TradeType.EXACT_INPUT) {
          const exactInputParams = {
            path: pathStr,
            recipient,
            amountIn,
            amountOutMinimum: performAggregatedSlippageCheck ? 0n : amountOut
          };
          calldatas.push(
            encodeFunctionData({
              abi: _SwapRouter.ABI,
              functionName: "exactInput",
              args: [exactInputParams]
            })
          );
        } else {
          const exactOutputParams = {
            path: pathStr,
            recipient,
            amountOut,
            amountInMaximum: amountIn
          };
          calldatas.push(
            encodeFunctionData({
              abi: _SwapRouter.ABI,
              functionName: "exactOutput",
              args: [exactOutputParams]
            })
          );
        }
      }
    }
    return calldatas;
  }
  /**
   * @notice Generates the calldata for a MixedRouteSwap. Since single hop routes are not MixedRoutes, we will instead generate
   *         them via the existing encodeV3Swap and encodeV2Swap methods.
   * @param trade The MixedRouteTrade to encode.
   * @param options SwapOptions to use for the trade.
   * @param routerMustCustody Flag for whether funds should be sent to the router
   * @param performAggregatedSlippageCheck Flag for whether we want to perform an aggregated slippage check
   * @returns A string array of calldatas for the trade.
   */
  static encodeMixedRouteSwap(trade, options, routerMustCustody, performAggregatedSlippageCheck) {
    let calldatas = [];
    const isExactIn = trade.tradeType === TradeType.EXACT_INPUT;
    for (const route of trade.routes) {
      const { inputAmount, outputAmount, pools } = route;
      const amountIn = maximumAmountIn(trade, options.slippageTolerance, inputAmount).quotient;
      const amountOut = minimumAmountOut(trade, options.slippageTolerance, outputAmount).quotient;
      const singleHop = pools.length === 1;
      const recipient = routerMustCustody ? ADDRESS_THIS : typeof options.recipient === "undefined" ? MSG_SENDER : validateAndParseAddress(options.recipient);
      const mixedRouteIsAllV3 = (r) => {
        return r.pools.every(isV3Pool);
      };
      const mixedRouteIsAllV2 = (r) => {
        return r.pools.every(isV2Pool);
      };
      const mixedRouteIsAllStable = (r) => {
        return r.pools.every(isStablePool);
      };
      if (singleHop) {
        if (mixedRouteIsAllV3(route)) {
          calldatas = [
            ...calldatas,
            ..._SwapRouter.encodeV3Swap(
              {
                ...trade,
                routes: [route],
                inputAmount,
                outputAmount
              },
              options,
              routerMustCustody,
              performAggregatedSlippageCheck
            )
          ];
        } else if (mixedRouteIsAllV2(route)) {
          calldatas = [
            ...calldatas,
            _SwapRouter.encodeV2Swap(
              {
                ...trade,
                routes: [route],
                inputAmount,
                outputAmount
              },
              options,
              routerMustCustody,
              performAggregatedSlippageCheck
            )
          ];
        } else if (mixedRouteIsAllStable(route)) {
          calldatas = [
            ...calldatas,
            _SwapRouter.encodeStableSwap(
              {
                ...trade,
                routes: [route],
                inputAmount,
                outputAmount
              },
              options,
              routerMustCustody,
              performAggregatedSlippageCheck
            )
          ];
        } else {
          throw new Error("Unsupported route to encode");
        }
      } else {
        const sections = partitionMixedRouteByProtocol(route);
        const isLastSectionInRoute = (i) => {
          return i === sections.length - 1;
        };
        let outputToken;
        let inputToken = inputAmount.currency.wrapped;
        for (let i = 0; i < sections.length; i++) {
          const section = sections[i];
          outputToken = getOutputOfPools(section, inputToken);
          const newRoute = buildBaseRoute([...section], inputToken, outputToken);
          inputToken = outputToken.wrapped;
          const lastSectionInRoute = isLastSectionInRoute(i);
          const recipientAddress = lastSectionInRoute ? recipient : ADDRESS_THIS;
          const inAmount = i === 0 ? amountIn : 0n;
          const outAmount = !lastSectionInRoute ? 0n : amountOut;
          if (mixedRouteIsAllV3(newRoute)) {
            const pathStr = encodeMixedRouteToPath(newRoute, !isExactIn);
            if (isExactIn) {
              const exactInputParams = {
                path: pathStr,
                recipient: recipientAddress,
                amountIn: inAmount,
                amountOutMinimum: outAmount
              };
              calldatas.push(
                encodeFunctionData({
                  abi: _SwapRouter.ABI,
                  functionName: "exactInput",
                  args: [exactInputParams]
                })
              );
            } else {
              const exactOutputParams = {
                path: pathStr,
                recipient,
                amountOut: outAmount,
                amountInMaximum: inAmount
              };
              calldatas.push(
                encodeFunctionData({
                  abi: _SwapRouter.ABI,
                  functionName: "exactOutput",
                  args: [exactOutputParams]
                })
              );
            }
          } else if (mixedRouteIsAllV2(newRoute)) {
            const path = newRoute.path.map((token) => token.wrapped.address);
            if (isExactIn) {
              const exactInputParams = [
                inAmount,
                // amountIn
                outAmount,
                // amountOutMin
                path,
                // path
                recipientAddress
                // to
              ];
              calldatas.push(
                encodeFunctionData({
                  abi: _SwapRouter.ABI,
                  functionName: "swapExactTokensForTokens",
                  args: exactInputParams
                })
              );
            } else {
              const exactOutputParams = [outAmount, inAmount, path, recipientAddress];
              calldatas.push(
                encodeFunctionData({
                  abi: _SwapRouter.ABI,
                  functionName: "swapTokensForExactTokens",
                  args: exactOutputParams
                })
              );
            }
          } else if (mixedRouteIsAllStable(newRoute)) {
            const path = newRoute.path.map((token) => token.wrapped.address);
            const flags = newRoute.pools.map((pool) => BigInt(pool.balances.length));
            if (isExactIn) {
              const exactInputParams = [
                path,
                // path
                flags,
                // stable pool types
                inAmount,
                // amountIn
                outAmount,
                // amountOutMin
                recipientAddress
                // to
              ];
              calldatas.push(
                encodeFunctionData({
                  abi: _SwapRouter.ABI,
                  functionName: "exactInputStableSwap",
                  args: exactInputParams
                })
              );
            } else {
              const exactOutputParams = [path, flags, outAmount, inAmount, recipientAddress];
              calldatas.push(
                encodeFunctionData({
                  abi: _SwapRouter.ABI,
                  functionName: "exactOutputStableSwap",
                  args: exactOutputParams
                })
              );
            }
          } else {
            throw new Error("Unsupported route");
          }
        }
      }
    }
    return calldatas;
  }
  static encodeSwaps(anyTrade, options, isSwapAndAdd) {
    const trades = !Array.isArray(anyTrade) ? [anyTrade] : anyTrade;
    const numberOfTrades = trades.reduce((numOfTrades, trade) => numOfTrades + trade.routes.length, 0);
    const sampleTrade = trades[0];
    invariant6(
      trades.every((trade) => trade.inputAmount.currency.equals(sampleTrade.inputAmount.currency)),
      "TOKEN_IN_DIFF"
    );
    invariant6(
      trades.every((trade) => trade.outputAmount.currency.equals(sampleTrade.outputAmount.currency)),
      "TOKEN_OUT_DIFF"
    );
    invariant6(
      trades.every((trade) => trade.tradeType === sampleTrade.tradeType),
      "TRADE_TYPE_DIFF"
    );
    const calldatas = [];
    const inputIsNative = sampleTrade.inputAmount.currency.isNative;
    const outputIsNative = sampleTrade.outputAmount.currency.isNative;
    const performAggregatedSlippageCheck = sampleTrade.tradeType === TradeType.EXACT_INPUT && numberOfTrades > 2;
    const routerMustCustody = outputIsNative || !!options.fee || !!isSwapAndAdd || performAggregatedSlippageCheck;
    if (options.inputTokenPermit) {
      invariant6(sampleTrade.inputAmount.currency.isToken, "NON_TOKEN_PERMIT");
      calldatas.push(SelfPermit.encodePermit(sampleTrade.inputAmount.currency, options.inputTokenPermit));
    }
    for (const trade of trades) {
      if (trade.routes.length === 1 && trade.routes[0].type === 0 /* V2 */) {
        calldatas.push(_SwapRouter.encodeV2Swap(trade, options, routerMustCustody, performAggregatedSlippageCheck));
      } else if (trade.routes.every((r) => r.type === 1 /* V3 */)) {
        for (const calldata of _SwapRouter.encodeV3Swap(
          trade,
          options,
          routerMustCustody,
          performAggregatedSlippageCheck
        )) {
          calldatas.push(calldata);
        }
      } else {
        for (const calldata of _SwapRouter.encodeMixedRouteSwap(
          trade,
          options,
          routerMustCustody,
          performAggregatedSlippageCheck
        )) {
          calldatas.push(calldata);
        }
      }
    }
    const ZERO_IN = CurrencyAmount.fromRawAmount(sampleTrade.inputAmount.currency, 0);
    const ZERO_OUT = CurrencyAmount.fromRawAmount(sampleTrade.outputAmount.currency, 0);
    const minAmountOut = trades.reduce(
      (sum2, trade) => sum2.add(minimumAmountOut(trade, options.slippageTolerance)),
      ZERO_OUT
    );
    const quoteAmountOut = trades.reduce(
      (sum2, trade) => sum2.add(trade.outputAmount),
      ZERO_OUT
    );
    const totalAmountIn = trades.reduce(
      (sum2, trade) => sum2.add(maximumAmountIn(trade, options.slippageTolerance)),
      ZERO_IN
    );
    return {
      calldatas,
      sampleTrade,
      routerMustCustody,
      inputIsNative,
      outputIsNative,
      totalAmountIn,
      minimumAmountOut: minAmountOut,
      quoteAmountOut
    };
  }
  /**
   * Produces the on-chain method name to call and the hex encoded parameters to pass as arguments for a given trade.
   * @param trades to produce call parameters for
   * @param options options for the call parameters
   */
  static swapCallParameters(trades, options) {
    const {
      calldatas,
      sampleTrade,
      routerMustCustody,
      inputIsNative,
      outputIsNative,
      totalAmountIn,
      minimumAmountOut: minAmountOut
    } = _SwapRouter.encodeSwaps(trades, options);
    if (routerMustCustody) {
      if (outputIsNative) {
        calldatas.push(PaymentsExtended.encodeUnwrapWETH9(minAmountOut.quotient, options.recipient, options.fee));
      } else {
        calldatas.push(
          PaymentsExtended.encodeSweepToken(
            sampleTrade.outputAmount.currency.wrapped,
            minAmountOut.quotient,
            options.recipient,
            options.fee
          )
        );
      }
    }
    if (inputIsNative && (sampleTrade.tradeType === TradeType.EXACT_OUTPUT || _SwapRouter.riskOfPartialFill(trades))) {
      calldatas.push(Payments.encodeRefundETH());
    }
    return {
      calldata: MulticallExtended.encodeMulticall(calldatas, options.deadlineOrPreviousBlockhash),
      value: toHex(inputIsNative ? totalAmountIn.quotient : ZERO2)
    };
  }
  /**
   * Produces the on-chain method name to call and the hex encoded parameters to pass as arguments for a given trade.
   * @param trades to produce call parameters for
   * @param options options for the call parameters
   */
  static swapAndAddCallParameters(trades, options, position, addLiquidityOptions, tokenInApprovalType, tokenOutApprovalType) {
    const {
      calldatas,
      inputIsNative,
      outputIsNative,
      sampleTrade,
      totalAmountIn: totalAmountSwapped,
      quoteAmountOut,
      minimumAmountOut: minAmountOut
    } = _SwapRouter.encodeSwaps(trades, options, true);
    if (options.outputTokenPermit) {
      invariant6(quoteAmountOut.currency.isToken, "NON_TOKEN_PERMIT_OUTPUT");
      calldatas.push(SelfPermit.encodePermit(quoteAmountOut.currency, options.outputTokenPermit));
    }
    const {
      inputAmount: {
        currency: { chainId }
      }
    } = sampleTrade;
    const zeroForOne = position.pool.token0.wrapped.address === totalAmountSwapped.currency.wrapped.address;
    const { positionAmountIn, positionAmountOut } = _SwapRouter.getPositionAmounts(position, zeroForOne);
    const tokenIn = inputIsNative ? WNATIVE[chainId] : positionAmountIn.currency.wrapped;
    const tokenOut = outputIsNative ? WNATIVE[chainId] : positionAmountOut.currency.wrapped;
    const amountOutRemaining = positionAmountOut.subtract(quoteAmountOut.wrapped);
    if (amountOutRemaining.greaterThan(CurrencyAmount.fromRawAmount(positionAmountOut.currency, 0))) {
      if (outputIsNative) {
        calldatas.push(PaymentsExtended.encodeWrapETH(amountOutRemaining.quotient));
      } else {
        calldatas.push(PaymentsExtended.encodePull(tokenOut, amountOutRemaining.quotient));
      }
    }
    if (inputIsNative) {
      calldatas.push(PaymentsExtended.encodeWrapETH(positionAmountIn.quotient));
    } else {
      calldatas.push(PaymentsExtended.encodePull(tokenIn, positionAmountIn.quotient));
    }
    if (tokenInApprovalType !== 0 /* NOT_REQUIRED */)
      calldatas.push(ApproveAndCall.encodeApprove(tokenIn, tokenInApprovalType));
    if (tokenOutApprovalType !== 0 /* NOT_REQUIRED */)
      calldatas.push(ApproveAndCall.encodeApprove(tokenOut, tokenOutApprovalType));
    const minimalPosition = Position.fromAmounts({
      pool: position.pool,
      tickLower: position.tickLower,
      tickUpper: position.tickUpper,
      amount0: zeroForOne ? position.amount0.quotient.toString() : minAmountOut.quotient.toString(),
      amount1: zeroForOne ? minAmountOut.quotient.toString() : position.amount1.quotient.toString(),
      useFullPrecision: false
    });
    calldatas.push(
      ApproveAndCall.encodeAddLiquidity(position, minimalPosition, addLiquidityOptions, options.slippageTolerance)
    );
    if (inputIsNative) {
      calldatas.push(PaymentsExtended.encodeUnwrapWETH9(ZERO2));
    } else {
      calldatas.push(PaymentsExtended.encodeSweepToken(tokenIn, ZERO2));
    }
    if (outputIsNative) {
      calldatas.push(PaymentsExtended.encodeUnwrapWETH9(ZERO2));
    } else {
      calldatas.push(PaymentsExtended.encodeSweepToken(tokenOut, ZERO2));
    }
    let value;
    if (inputIsNative) {
      value = totalAmountSwapped.wrapped.add(positionAmountIn.wrapped).quotient;
    } else if (outputIsNative) {
      value = amountOutRemaining.quotient;
    } else {
      value = ZERO2;
    }
    return {
      calldata: MulticallExtended.encodeMulticall(calldatas, options.deadlineOrPreviousBlockhash),
      value: toHex(value.toString())
    };
  }
  // if price impact is very high, there's a chance of hitting max/min prices resulting in a partial fill of the swap
  static riskOfPartialFill(trades) {
    if (Array.isArray(trades)) {
      return trades.some((trade) => {
        return _SwapRouter.v3TradeWithHighPriceImpact(trade);
      });
    }
    return _SwapRouter.v3TradeWithHighPriceImpact(trades);
  }
  static v3TradeWithHighPriceImpact(trade) {
    return !(trade.routes.length === 1 && trade.routes[0].type === 0 /* V2 */) && getPriceImpact(trade).greaterThan(REFUND_ETH_PRICE_IMPACT_THRESHOLD);
  }
  static getPositionAmounts(position, zeroForOne) {
    const { amount0, amount1 } = position.mintAmounts;
    const currencyAmount0 = CurrencyAmount.fromRawAmount(position.pool.token0, amount0);
    const currencyAmount1 = CurrencyAmount.fromRawAmount(position.pool.token1, amount1);
    const [positionAmountIn, positionAmountOut] = zeroForOne ? [currencyAmount0, currencyAmount1] : [currencyAmount1, currencyAmount0];
    return { positionAmountIn, positionAmountOut };
  }
};
var SwapRouter = _SwapRouter;
SwapRouter.ABI = swapRouter02Abi;

// evm/v3-router/utils/transformer.ts
var transformer_exports = {};
__export(transformer_exports, {
  parseCurrency: () => parseCurrency,
  parseCurrencyAmount: () => parseCurrencyAmount,
  parsePool: () => parsePool,
  parseRoute: () => parseRoute,
  parseTick: () => parseTick,
  parseTrade: () => parseTrade,
  serializeCurrency: () => serializeCurrency,
  serializeCurrencyAmount: () => serializeCurrencyAmount,
  serializePool: () => serializePool,
  serializeRoute: () => serializeRoute,
  serializeTick: () => serializeTick,
  serializeTrade: () => serializeTrade
});
var ONE_HUNDRED = 100n;
function serializeCurrency(currency) {
  return {
    address: currency.isNative ? ADDRESS_ZERO : currency.wrapped.address,
    decimals: currency.decimals,
    symbol: currency.symbol
  };
}
function serializeCurrencyAmount(amount) {
  return {
    currency: serializeCurrency(amount.currency),
    value: amount.quotient.toString()
  };
}
function serializeTick(tick) {
  return {
    index: tick.index,
    liquidityNet: String(tick.liquidityNet),
    liquidityGross: String(tick.liquidityGross)
  };
}
function serializePool(pool) {
  if (isV2Pool(pool)) {
    return {
      ...pool,
      reserve0: serializeCurrencyAmount(pool.reserve0),
      reserve1: serializeCurrencyAmount(pool.reserve1)
    };
  }
  if (isV3Pool(pool)) {
    return {
      ...pool,
      token0: serializeCurrency(pool.token0),
      token1: serializeCurrency(pool.token1),
      liquidity: pool.liquidity.toString(),
      sqrtRatioX96: pool.sqrtRatioX96.toString(),
      token0ProtocolFee: pool.token0ProtocolFee.toFixed(0),
      token1ProtocolFee: pool.token1ProtocolFee.toFixed(0),
      ticks: pool.ticks?.map(serializeTick),
      reserve0: pool.reserve0 && serializeCurrencyAmount(pool.reserve0),
      reserve1: pool.reserve1 && serializeCurrencyAmount(pool.reserve1)
    };
  }
  if (isStablePool(pool)) {
    return {
      ...pool,
      balances: pool.balances.map(serializeCurrencyAmount),
      amplifier: pool.amplifier.toString(),
      fee: pool.fee.toSignificant(6)
    };
  }
  if (isV4ClPool(pool)) {
    return {
      ...pool,
      currency0: serializeCurrency(pool.currency0),
      currency1: serializeCurrency(pool.currency1),
      liquidity: pool.liquidity.toString(),
      sqrtRatioX96: pool.sqrtRatioX96.toString(),
      ticks: pool.ticks?.map(serializeTick),
      reserve0: pool.reserve0 && serializeCurrencyAmount(pool.reserve0),
      reserve1: pool.reserve1 && serializeCurrencyAmount(pool.reserve1)
    };
  }
  if (isV4BinPool(pool)) {
    return {
      ...pool,
      currency0: serializeCurrency(pool.currency0),
      currency1: serializeCurrency(pool.currency1),
      reserve0: pool.reserve0 && serializeCurrencyAmount(pool.reserve0),
      reserve1: pool.reserve1 && serializeCurrencyAmount(pool.reserve1)
    };
  }
  throw new Error("Cannot serialize unsupoorted pool");
}
function serializeRoute(route) {
  return {
    ...route,
    pools: route.pools.map(serializePool),
    path: route.path.map(serializeCurrency),
    inputAmount: serializeCurrencyAmount(route.inputAmount),
    outputAmount: serializeCurrencyAmount(route.outputAmount)
  };
}
function serializeTrade(trade) {
  return {
    ...trade,
    inputAmount: serializeCurrencyAmount(trade.inputAmount),
    outputAmount: serializeCurrencyAmount(trade.outputAmount),
    routes: trade.routes.map(serializeRoute),
    gasEstimate: trade.gasEstimate.toString(),
    gasEstimateInUSD: trade.gasEstimateInUSD && serializeCurrencyAmount(trade.gasEstimateInUSD)
  };
}
function parseTick(tick) {
  return new Tick(tick);
}
function parseCurrency(chainId, currency) {
  if (currency.address === ADDRESS_ZERO) {
    return Native.onChain(chainId);
  }
  const { address, decimals, symbol } = currency;
  return new ERC20Token(chainId, address, decimals, symbol);
}
function parseCurrencyAmount(chainId, amount) {
  return CurrencyAmount.fromRawAmount(parseCurrency(chainId, amount.currency), amount.value);
}
function parsePool(chainId, pool) {
  if (pool.type === 0 /* V2 */) {
    return {
      ...pool,
      reserve0: parseCurrencyAmount(chainId, pool.reserve0),
      reserve1: parseCurrencyAmount(chainId, pool.reserve1)
    };
  }
  if (pool.type === 1 /* V3 */) {
    return {
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
  }
  if (pool.type === 2 /* STABLE */) {
    return {
      ...pool,
      balances: pool.balances.map((b) => parseCurrencyAmount(chainId, b)),
      amplifier: BigInt(pool.amplifier),
      fee: new Percent(parseFloat(pool.fee) * 1e6, ONE_HUNDRED * 1000000n)
    };
  }
  if (pool.type === 3 /* V4CL */) {
    return {
      ...pool,
      currency0: parseCurrency(chainId, pool.currency0),
      currency1: parseCurrency(chainId, pool.currency1),
      liquidity: BigInt(pool.liquidity),
      sqrtRatioX96: BigInt(pool.sqrtRatioX96),
      ticks: pool.ticks?.map(parseTick),
      reserve0: pool.reserve0 && parseCurrencyAmount(chainId, pool.reserve0),
      reserve1: pool.reserve1 && parseCurrencyAmount(chainId, pool.reserve1)
    };
  }
  if (pool.type === 4 /* V4BIN */) {
    return {
      ...pool,
      currency0: parseCurrency(chainId, pool.currency0),
      currency1: parseCurrency(chainId, pool.currency1),
      reserve0: pool.reserve0 && parseCurrencyAmount(chainId, pool.reserve0),
      reserve1: pool.reserve1 && parseCurrencyAmount(chainId, pool.reserve1)
    };
  }
  throw new Error("Cannot parse unsupoorted pool");
}
function parseRoute(chainId, route) {
  return {
    ...route,
    pools: route.pools.map((p) => parsePool(chainId, p)),
    path: route.path.map((c) => parseCurrency(chainId, c)),
    inputAmount: parseCurrencyAmount(chainId, route.inputAmount),
    outputAmount: parseCurrencyAmount(chainId, route.outputAmount)
  };
}
function parseTrade(chainId, trade) {
  return {
    ...trade,
    inputAmount: parseCurrencyAmount(chainId, trade.inputAmount),
    outputAmount: parseCurrencyAmount(chainId, trade.outputAmount),
    routes: trade.routes.map((r) => parseRoute(chainId, r)),
    gasEstimate: trade.gasEstimate ? BigInt(trade.gasEstimate) : 0n,
    gasEstimateInUSD: trade.gasEstimateInUSD && parseCurrencyAmount(chainId, trade.gasEstimateInUSD)
  };
}

// evm/v3-router/functions/getPairCombinations.ts
var getToken = memoize(
  (chainId, address) => {
    if (!chainId || !address) {
      return void 0;
    }
    const tokens = getTokensByChain(chainId);
    for (const token of tokens) {
      if (token.address.toLowerCase() === address.toLowerCase()) {
        return token;
      }
    }
    return void 0;
  },
  (chainId, address) => `${chainId}_${address}`
);
function isTokenInCommonBases(token) {
  return Boolean(token && BASES_TO_CHECK_TRADES_AGAINST[token.chainId]?.find((t) => t.equals(token)));
}
function createTokenBasesFromGaugesGetter() {
  const getCurrencyIdentifier = (c) => `${c?.chainId}_${c?.wrapped.address}_${c?.isNative}`;
  const cache = {};
  return async function getTokenBasesFromGauges2(currency) {
    const id = getCurrencyIdentifier(currency);
    if (!id)
      return [];
    if (cache[id])
      return cache[id];
    const chainId = currency?.chainId;
    const address = currency?.wrapped.address;
    const gauges = await safeGetGaugesByChain(chainId);
    const bases = /* @__PURE__ */ new Set();
    const addTokenToBases = (token) => token && !isTokenInCommonBases(token) && bases.add(token);
    const addTokensToBases = (tokens) => tokens.forEach(addTokenToBases);
    const isCurrentToken = (addr) => addr.toLowerCase() === address?.toLowerCase();
    if (currency && chainId && isTokenInCommonBases(currency.wrapped)) {
      cache[id] = [];
      return cache[id];
    }
    for (const gauge of gauges) {
      const { type } = gauge;
      if (type === GaugeType.V2 || type === GaugeType.V3) {
        const { token0Address, token1Address } = gauge;
        if (isCurrentToken(token0Address)) {
          addTokenToBases(getToken(chainId, token1Address));
        }
        if (isCurrentToken(token1Address)) {
          addTokenToBases(getToken(chainId, token0Address));
        }
        continue;
      }
      if (type === GaugeType.StableSwap) {
        const { tokenAddresses } = gauge;
        const index = tokenAddresses.findIndex(isCurrentToken);
        if (index < 0) {
          continue;
        }
        addTokensToBases(
          [...tokenAddresses.slice(0, index), ...tokenAddresses.slice(index + 1)].map((addr) => getToken(chainId, addr)).filter((token) => Boolean(token))
        );
      }
    }
    const baseList = Array.from(bases);
    log(
      `[ADDITIONAL_BASES] Token ${currency?.symbol}, bases from guages: [${baseList.map((base) => base.symbol).join(",")}]`
    );
    cache[id] = baseList;
    return baseList;
  };
}
var getTokenBasesFromGauges = createTokenBasesFromGaugesGetter();
var resolver = (currencyA, currencyB) => {
  if (!currencyA || !currencyB || currencyA.chainId !== currencyB.chainId || currencyA.wrapped.equals(currencyB.wrapped)) {
    return `${currencyA?.chainId}_${currencyA?.wrapped?.address}_${currencyB?.wrapped?.address}`;
  }
  const [token0, token1] = currencyA.wrapped.sortsBefore(currencyB.wrapped) ? [currencyA.wrapped, currencyB.wrapped] : [currencyB.wrapped, currencyA.wrapped];
  return `${token0.chainId}_${token0.address}_${token1.address}`;
};
async function getAdditionalCheckAgainstBaseTokens(currencyA, currencyB) {
  const chainId = currencyA?.chainId;
  const additionalBases = {
    ...chainId ? ADDITIONAL_BASES[chainId] ?? {} : {}
  };
  const uniq = (tokens) => uniqBy(tokens, (t) => t.address);
  const additionalA = currencyA && chainId ? uniq([...additionalBases[currencyA.wrapped.address] || [], ...await getTokenBasesFromGauges(currencyA)]) ?? [] : [];
  const additionalB = currencyB && chainId ? uniq([...additionalBases[currencyB.wrapped.address] || [], ...await getTokenBasesFromGauges(currencyB)]) ?? [] : [];
  return [...additionalA, ...additionalB];
}
var getCheckAgainstBaseTokens = memoize(
  async (currencyA, currencyB) => {
    const chainId = currencyA?.chainId;
    if (!chainId || !currencyA || !currencyB || !isCurrenciesSameChain(currencyA, currencyB)) {
      return [];
    }
    const [tokenA, tokenB] = chainId ? [wrappedCurrency(currencyA, chainId), wrappedCurrency(currencyB, chainId)] : [void 0, void 0];
    if (!tokenA || !tokenB) {
      return [];
    }
    const common = BASES_TO_CHECK_TRADES_AGAINST[chainId] ?? [];
    return [...common, ...await getAdditionalCheckAgainstBaseTokens(currencyA, currencyB)];
  },
  resolver
);
var getPairCombinations = memoize(
  async (currencyA, currencyB) => {
    const chainId = currencyA?.chainId;
    if (!chainId || !currencyA || !currencyB || !isCurrenciesSameChain(currencyA, currencyB)) {
      return [];
    }
    const [tokenA, tokenB] = chainId ? [wrappedCurrency(currencyA, chainId), wrappedCurrency(currencyB, chainId)] : [void 0, void 0];
    if (!tokenA || !tokenB) {
      return [];
    }
    const bases = await getCheckAgainstBaseTokens(currencyA, currencyB);
    const basePairs = flatMap(
      bases,
      (base) => bases.map((otherBase) => [base, otherBase])
    );
    return [
      // the direct pair
      [tokenA, tokenB],
      // token A against all bases
      ...bases.map((base) => [tokenA, base]),
      // token B against all bases
      ...bases.map((base) => [tokenB, base]),
      // each base against all bases
      ...basePairs
    ].filter((tokens) => Boolean(tokens[0] && tokens[1])).filter(([t0, t1]) => !t0.equals(t1)).filter(([tokenA_, tokenB_]) => {
      if (!chainId)
        return true;
      const customBases = CUSTOM_BASES[chainId];
      const customBasesA = customBases?.[tokenA_.wrapped.address];
      const customBasesB = customBases?.[tokenB_.wrapped.address];
      if (!customBasesA && !customBasesB)
        return true;
      if (customBasesA && !customBasesA.find((base) => tokenB_.equals(base)))
        return false;
      if (customBasesB && !customBasesB.find((base) => tokenA_.equals(base)))
        return false;
      return true;
    });
  },
  resolver
);

// evm/v3-router/functions/computeAllRoutes.ts
function computeAllRoutes(input, output, candidatePools, maxHops = 3) {
  logger.metric("Computing routes from", candidatePools.length, "pools");
  const poolsUsed = Array(candidatePools.length).fill(false);
  const routes = [];
  const computeRoutes = (currencyIn, currencyOut, currentRoute, _previousCurrencyOut) => {
    if (currentRoute.length > maxHops) {
      return;
    }
    if (currentRoute.length > 0 && involvesCurrency(currentRoute[currentRoute.length - 1], currencyOut)) {
      routes.push(buildBaseRoute([...currentRoute], currencyIn, currencyOut));
      return;
    }
    for (let i = 0; i < candidatePools.length; i++) {
      if (poolsUsed[i]) {
        continue;
      }
      const curPool = candidatePools[i];
      const previousCurrencyOut = _previousCurrencyOut || currencyIn;
      if (!involvesCurrency(curPool, previousCurrencyOut)) {
        continue;
      }
      const currentTokenOut = getOutputCurrency(curPool, previousCurrencyOut);
      if (currencyIn.wrapped.equals(currentTokenOut.wrapped)) {
        continue;
      }
      currentRoute.push(curPool);
      poolsUsed[i] = true;
      computeRoutes(currencyIn, currencyOut, currentRoute, currentTokenOut);
      poolsUsed[i] = false;
      currentRoute.pop();
    }
  };
  computeRoutes(input, output, []);
  logger.metric("Computed routes from", candidatePools.length, "pools", routes.length, "routes");
  return routes;
}
function getBestRouteCombinationByQuotes(amount, quoteCurrency, routesWithQuote, tradeType, config) {
  const chainId = amount.currency.chainId;
  const percents = [];
  const percentToQuotes = {};
  for (const routeWithQuote of routesWithQuote) {
    if (!percentToQuotes[routeWithQuote.percent]) {
      percentToQuotes[routeWithQuote.percent] = [];
      percents.push(routeWithQuote.percent);
    }
    percentToQuotes[routeWithQuote.percent].push(routeWithQuote);
  }
  const swapRoute = getBestSwapRouteBy(
    tradeType,
    percentToQuotes,
    percents.sort((a, b) => a - b),
    chainId,
    (rq) => rq.quoteAdjustedForGas,
    config
  );
  if (!swapRoute) {
    return null;
  }
  const { routes: routeAmounts } = swapRoute;
  const totalAmount = routeAmounts.reduce(
    (total, routeAmount) => total.add(routeAmount.amount),
    CurrencyAmount.fromRawAmount(routeAmounts[0].amount.currency, 0)
  );
  const missingAmount = amount.subtract(totalAmount);
  if (missingAmount.greaterThan(0)) {
    logger.log(
      "Optimal route's amounts did not equal exactIn/exactOut total. Adding missing amount to last route in array.",
      {
        missingAmount: missingAmount.quotient.toString()
      }
    );
    routeAmounts[routeAmounts.length - 1].amount = routeAmounts[routeAmounts.length - 1].amount.add(missingAmount);
  }
  logger.log(
    {
      routes: routeAmounts,
      numSplits: routeAmounts.length,
      amount: amount.toExact(),
      quote: swapRoute.quote.toExact(),
      quoteGasAdjusted: swapRoute.quoteGasAdjusted.toFixed(Math.min(swapRoute.quoteGasAdjusted.currency.decimals, 2)),
      estimatedGasUSD: swapRoute.estimatedGasUsedUSD.toFixed(
        Math.min(swapRoute.estimatedGasUsedUSD.currency.decimals, 2)
      ),
      estimatedGasToken: swapRoute.estimatedGasUsedQuoteToken.toFixed(
        Math.min(swapRoute.estimatedGasUsedQuoteToken.currency.decimals, 2)
      )
    },
    `Found best swap route. ${routeAmounts.length} split.`
  );
  const { routes, quote: quoteAmount, estimatedGasUsed, estimatedGasUsedUSD } = swapRoute;
  const quote = CurrencyAmount.fromRawAmount(quoteCurrency, quoteAmount.quotient);
  const isExactIn = tradeType === TradeType.EXACT_INPUT;
  return {
    routes: routes.map(({ type, amount: routeAmount, quote: routeQuoteAmount, pools, path, percent }) => {
      const routeQuote = CurrencyAmount.fromRawAmount(quoteCurrency, routeQuoteAmount.quotient);
      return {
        percent,
        type,
        pools,
        path,
        inputAmount: isExactIn ? routeAmount : routeQuote,
        outputAmount: isExactIn ? routeQuote : routeAmount
      };
    }),
    gasEstimate: estimatedGasUsed,
    gasEstimateInUSD: estimatedGasUsedUSD,
    inputAmount: isExactIn ? amount : quote,
    outputAmount: isExactIn ? quote : amount
  };
}
function getBestSwapRouteBy(tradeType, percentToQuotes, percents, chainId, by, { maxSplits = 4, minSplits = 0 }) {
  const percentToSortedQuotes = mapValues(percentToQuotes, (routeQuotes) => {
    return routeQuotes.sort((routeQuoteA, routeQuoteB) => {
      if (tradeType === TradeType.EXACT_INPUT) {
        return by(routeQuoteA).greaterThan(by(routeQuoteB)) ? -1 : 1;
      }
      return by(routeQuoteA).lessThan(by(routeQuoteB)) ? -1 : 1;
    });
  });
  const quoteCompFn = tradeType === TradeType.EXACT_INPUT ? (a, b) => a.greaterThan(b) : (a, b) => a.lessThan(b);
  const sumFn = (currencyAmounts) => {
    let sum2 = currencyAmounts[0];
    for (let i = 1; i < currencyAmounts.length; i++) {
      sum2 = sum2.add(currencyAmounts[i]);
    }
    return sum2;
  };
  let bestQuote;
  let bestSwap;
  const bestSwapsPerSplit = new FixedReverseHeap(
    Array,
    (a, b) => {
      return quoteCompFn(a.quote, b.quote) ? -1 : 1;
    },
    3
  );
  if (!percentToSortedQuotes[100] || minSplits > 1) {
    logger.log(
      {
        percentToSortedQuotes: mapValues(percentToSortedQuotes, (p) => p.length)
      },
      "Did not find a valid route without any splits. Continuing search anyway."
    );
  } else {
    bestQuote = by(percentToSortedQuotes[100][0]);
    bestSwap = [percentToSortedQuotes[100][0]];
    for (const routeWithQuote of percentToSortedQuotes[100].slice(0, 5)) {
      bestSwapsPerSplit.push({
        quote: by(routeWithQuote),
        routes: [routeWithQuote]
      });
    }
  }
  const queue = new Queue();
  for (let i = percents.length; i >= 0; i--) {
    const percent = percents[i];
    if (!percentToSortedQuotes[percent]) {
      continue;
    }
    queue.enqueue({
      curRoutes: [percentToSortedQuotes[percent][0]],
      percentIndex: i,
      remainingPercent: 100 - percent,
      special: false
    });
    if (!percentToSortedQuotes[percent] || !percentToSortedQuotes[percent][1]) {
      continue;
    }
    queue.enqueue({
      curRoutes: [percentToSortedQuotes[percent][1]],
      percentIndex: i,
      remainingPercent: 100 - percent,
      special: true
    });
  }
  let splits = 1;
  while (queue.size > 0) {
    logger.log(
      {
        top5: Array.from(bestSwapsPerSplit.consume()).map(
          (q) => `${q.quote.toExact()} (${q.routes.map(
            (r) => `${r.percent}% ${r.amount.toExact()} ${r.pools.map((p) => {
              if (isV2Pool(p)) {
                return `V2 ${p.reserve0.currency.symbol}-${p.reserve1.currency.symbol}`;
              }
              if (isV3Pool(p)) {
                return `V3 fee ${p.fee} ${p.token0.symbol}-${p.token1.symbol}`;
              }
              if (isStablePool(p)) {
                return `Stable ${p.balances.map((b) => b.currency).join("-")}`;
              }
              return `Unsupported pool ${p}`;
            }).join(", ")} ${r.quote.toExact()}`
          ).join(", ")})`
        ),
        onQueue: queue.size
      },
      `Top 3 with ${splits} splits`
    );
    bestSwapsPerSplit.clear();
    let layer = queue.size;
    splits++;
    if (splits >= 3 && bestSwap && bestSwap.length < splits - 1) {
      break;
    }
    if (splits > maxSplits) {
      logger.log("Max splits reached. Stopping search.");
      break;
    }
    while (layer > 0) {
      layer--;
      const { remainingPercent, curRoutes, percentIndex, special } = queue.dequeue();
      for (let i = percentIndex; i >= 0; i--) {
        const percentA = percents[i];
        if (percentA > remainingPercent) {
          continue;
        }
        if (!percentToSortedQuotes[percentA]) {
          continue;
        }
        const candidateRoutesA = percentToSortedQuotes[percentA];
        const routeWithQuoteA = findFirstRouteNotUsingUsedPools(curRoutes, candidateRoutesA);
        if (!routeWithQuoteA) {
          continue;
        }
        const remainingPercentNew = remainingPercent - percentA;
        const curRoutesNew = [...curRoutes, routeWithQuoteA];
        if (remainingPercentNew === 0 && splits >= minSplits) {
          const quotesNew = curRoutesNew.map((r) => by(r));
          const quoteNew = sumFn(quotesNew);
          const gasCostL1QuoteToken2 = CurrencyAmount.fromRawAmount(quoteNew.currency, 0);
          const quoteAfterL1Adjust = tradeType === TradeType.EXACT_INPUT ? quoteNew.subtract(gasCostL1QuoteToken2) : quoteNew.add(gasCostL1QuoteToken2);
          bestSwapsPerSplit.push({
            quote: quoteAfterL1Adjust,
            routes: curRoutesNew
          });
          if (!bestQuote || quoteCompFn(quoteAfterL1Adjust, bestQuote)) {
            bestQuote = quoteAfterL1Adjust;
            bestSwap = curRoutesNew;
          }
        } else {
          queue.enqueue({
            curRoutes: curRoutesNew,
            remainingPercent: remainingPercentNew,
            percentIndex: i,
            special
          });
        }
      }
    }
  }
  if (!bestSwap) {
    logger.log(`Could not find a valid swap`);
    return null;
  }
  let quoteGasAdjusted = sumFn(bestSwap.map((routeWithValidQuote) => routeWithValidQuote.quoteAdjustedForGas));
  const estimatedGasUsed = bestSwap.map((routeWithValidQuote) => routeWithValidQuote.gasEstimate).reduce((sum2, routeWithValidQuote) => sum2 + routeWithValidQuote, 0n);
  if (!usdGasTokensByChain[chainId] || !usdGasTokensByChain[chainId][0]) {
    throw new Error(`Could not find a USD token for computing gas costs on ${chainId}`);
  }
  const usdToken = usdGasTokensByChain[chainId][0];
  const usdTokenDecimals = usdToken.decimals;
  const gasCostsL1ToL2 = {
    gasUsedL1: 0n,
    gasCostL1USD: CurrencyAmount.fromRawAmount(usdToken, 0),
    gasCostL1QuoteToken: CurrencyAmount.fromRawAmount(
      // eslint-disable-next-line @typescript-eslint/no-non-null-asserted-optional-chain
      bestSwap[0]?.quote.currency,
      0
    )
  };
  const { gasCostL1USD, gasCostL1QuoteToken } = gasCostsL1ToL2;
  const estimatedGasUsedUSDs = bestSwap.map((routeWithValidQuote) => {
    const decimalsDiff = usdTokenDecimals - routeWithValidQuote.gasCostInUSD.currency.decimals;
    if (decimalsDiff === 0) {
      return CurrencyAmount.fromRawAmount(usdToken, routeWithValidQuote.gasCostInUSD.quotient);
    }
    return CurrencyAmount.fromRawAmount(
      usdToken,
      routeWithValidQuote.gasCostInUSD.quotient * 10n ** BigInt(decimalsDiff)
    );
  });
  let estimatedGasUsedUSD = sumFn(estimatedGasUsedUSDs);
  if (!estimatedGasUsedUSD.currency.equals(gasCostL1USD.currency)) {
    const decimalsDiff = usdTokenDecimals - gasCostL1USD.currency.decimals;
    estimatedGasUsedUSD = estimatedGasUsedUSD.add(
      CurrencyAmount.fromRawAmount(usdToken, gasCostL1USD.quotient * 10n ** BigInt(decimalsDiff))
    );
  } else {
    estimatedGasUsedUSD = estimatedGasUsedUSD.add(gasCostL1USD);
  }
  const estimatedGasUsedQuoteToken = sumFn(
    bestSwap.map((routeWithValidQuote) => routeWithValidQuote.gasCostInToken)
  ).add(gasCostL1QuoteToken);
  const quote = sumFn(bestSwap.map((routeWithValidQuote) => routeWithValidQuote.quote));
  if (tradeType === TradeType.EXACT_INPUT) {
    const quoteGasAdjustedForL1 = quoteGasAdjusted.subtract(gasCostL1QuoteToken);
    quoteGasAdjusted = quoteGasAdjustedForL1;
  } else {
    const quoteGasAdjustedForL1 = quoteGasAdjusted.add(gasCostL1QuoteToken);
    quoteGasAdjusted = quoteGasAdjustedForL1;
  }
  const routeWithQuotes = bestSwap.sort(
    (routeAmountA, routeAmountB) => routeAmountB.amount.greaterThan(routeAmountA.amount) ? 1 : -1
  );
  return {
    quote,
    quoteGasAdjusted,
    estimatedGasUsed,
    estimatedGasUsedUSD,
    estimatedGasUsedQuoteToken,
    routes: routeWithQuotes
  };
}
var findFirstRouteNotUsingUsedPools = (usedRoutes, candidateRouteQuotes) => {
  const poolAddressSet = /* @__PURE__ */ new Set();
  const usedPoolAddresses = flatMap(usedRoutes, ({ pools }) => pools.map(getPoolAddress));
  for (const poolAddress of usedPoolAddresses) {
    poolAddressSet.add(poolAddress);
  }
  for (const routeQuote of candidateRouteQuotes) {
    const { pools } = routeQuote;
    const poolAddresses = pools.map(getPoolAddress);
    if (poolAddresses.some((poolAddress) => poolAddressSet.has(poolAddress))) {
      continue;
    }
    return routeQuote;
  }
  return null;
};
function getTokenPriceByNumber(baseCurrency, quoteCurrency, price) {
  const quoteAmount = tryParseAmount_default(String(price), baseCurrency);
  const baseAmount = tryParseAmount_default("1", quoteCurrency);
  if (!baseAmount || !quoteAmount) {
    return void 0;
  }
  return new Price({ baseAmount, quoteAmount });
}
async function createGasModel({
  gasPriceWei,
  poolProvider,
  quoteCurrency,
  blockNumber,
  quoteCurrencyUsdPrice,
  nativeCurrencyUsdPrice
}) {
  const { chainId } = quoteCurrency;
  const usdToken = getUsdGasToken(chainId);
  if (!usdToken) {
    throw new Error(`No valid usd token found on chain ${chainId}`);
  }
  const nativeWrappedToken = getNativeWrappedToken(chainId);
  if (!nativeWrappedToken) {
    throw new Error(`Unsupported chain ${chainId}. Native wrapped token not found.`);
  }
  const gasPrice = BigInt(typeof gasPriceWei === "function" ? await gasPriceWei() : gasPriceWei);
  const [usdPool, nativePool] = await Promise.all([
    getHighestLiquidityUSDPool(poolProvider, chainId, blockNumber),
    getHighestLiquidityNativePool(poolProvider, quoteCurrency, blockNumber)
  ]);
  const priceInUsd = quoteCurrencyUsdPrice ? getTokenPriceByNumber(usdToken, quoteCurrency, quoteCurrencyUsdPrice) : void 0;
  const nativePriceInUsd = nativeCurrencyUsdPrice ? getTokenPriceByNumber(usdToken, nativeWrappedToken, nativeCurrencyUsdPrice) : void 0;
  const priceInNative = priceInUsd && nativePriceInUsd ? nativePriceInUsd.multiply(priceInUsd.invert()) : void 0;
  const estimateGasCost2 = ({ pools }, { initializedTickCrossedList }) => {
    const isQuoteNative = nativeWrappedToken.equals(quoteCurrency.wrapped);
    const totalInitializedTicksCrossed = BigInt(Math.max(1, sum(initializedTickCrossedList)));
    const poolTypeSet = /* @__PURE__ */ new Set();
    let baseGasUse = 0n;
    for (const pool of pools) {
      const { type } = pool;
      if (isV2Pool(pool)) {
        if (!poolTypeSet.has(type)) {
          baseGasUse += BASE_SWAP_COST_V2;
          poolTypeSet.add(type);
          continue;
        }
        baseGasUse += COST_PER_EXTRA_HOP_V2;
        continue;
      }
      if (isV3Pool(pool)) {
        if (!poolTypeSet.has(type)) {
          baseGasUse += BASE_SWAP_COST_V3(chainId);
          poolTypeSet.add(type);
        }
        baseGasUse += COST_PER_HOP_V3(chainId);
        continue;
      }
      if (isStablePool(pool)) {
        if (!poolTypeSet.has(type)) {
          baseGasUse += BASE_SWAP_COST_STABLE_SWAP;
          poolTypeSet.add(type);
          continue;
        }
        baseGasUse += COST_PER_EXTRA_HOP_STABLE_SWAP;
        continue;
      }
    }
    const tickGasUse = COST_PER_INIT_TICK(chainId) * totalInitializedTicksCrossed;
    const uninitializedTickGasUse = COST_PER_UNINIT_TICK * 0n;
    baseGasUse = baseGasUse + tickGasUse + uninitializedTickGasUse;
    const baseGasCostWei = gasPrice * baseGasUse;
    const totalGasCostNativeCurrency = CurrencyAmount.fromRawAmount(nativeWrappedToken, baseGasCostWei);
    let gasCostInToken = CurrencyAmount.fromRawAmount(quoteCurrency.wrapped, 0);
    let gasCostInUSD = CurrencyAmount.fromRawAmount(usdToken, 0);
    try {
      if (isQuoteNative) {
        gasCostInToken = totalGasCostNativeCurrency;
      }
      if (!isQuoteNative) {
        const price = priceInNative || nativePool && getTokenPrice(nativePool, nativeWrappedToken, quoteCurrency.wrapped);
        if (price) {
          gasCostInToken = price.quote(totalGasCostNativeCurrency);
        }
      }
      const nativeTokenUsdPrice = nativePriceInUsd || usdPool && getTokenPrice(usdPool, nativeWrappedToken, usdToken);
      if (nativeTokenUsdPrice) {
        gasCostInUSD = nativeTokenUsdPrice.quote(totalGasCostNativeCurrency);
      }
    } catch (e) {
    }
    return {
      gasEstimate: baseGasUse,
      gasCostInToken: isQuoteNative && quoteCurrency.isNative ? CurrencyAmount.fromRawAmount(Native.onChain(chainId), gasCostInToken.quotient) : gasCostInToken,
      gasCostInUSD
    };
  };
  return {
    estimateGasCost: estimateGasCost2
  };
}
async function getHighestLiquidityNativePool(poolProvider, currency, blockNumber) {
  const nativeWrappedToken = getNativeWrappedToken(currency.chainId);
  if (!nativeWrappedToken || currency.wrapped.equals(nativeWrappedToken)) {
    return null;
  }
  const pools = await poolProvider.getCandidatePools({
    blockNumber,
    pairs: [[nativeWrappedToken, currency]],
    currencyA: nativeWrappedToken,
    currencyB: currency
  });
  return pools[0] ?? null;
}
async function getHighestLiquidityUSDPool(poolProvider, chainId, blockNumber) {
  const usdToken = getUsdGasToken(chainId);
  const nativeWrappedToken = getNativeWrappedToken(chainId);
  if (!usdToken || !nativeWrappedToken) {
    return null;
  }
  const pools = await poolProvider.getCandidatePools({
    blockNumber,
    pairs: [[nativeWrappedToken, usdToken]],
    currencyA: nativeWrappedToken,
    currencyB: usdToken
  });
  return pools[0] ?? null;
}
async function getRoutesWithValidQuote({
  amount,
  baseRoutes,
  distributionPercent,
  quoteProvider,
  tradeType,
  blockNumber,
  gasModel,
  quoterOptimization = true,
  signal
}) {
  const [percents, amounts] = getAmountDistribution(amount, distributionPercent);
  const routesWithoutQuote = amounts.reduce(
    (acc, curAmount, i) => [
      ...acc,
      ...baseRoutes.map((r) => ({
        ...r,
        amount: curAmount,
        percent: percents[i]
      }))
    ],
    []
  );
  const getRoutesWithQuote = tradeType === TradeType.EXACT_INPUT ? quoteProvider.getRouteWithQuotesExactIn : quoteProvider.getRouteWithQuotesExactOut;
  if (!quoterOptimization) {
    return getRoutesWithQuote(routesWithoutQuote, { blockNumber, gasModel, signal });
  }
  const requestCallback = typeof window === "undefined" ? setTimeout : window.requestIdleCallback || window.setTimeout;
  logger.metric("Get quotes", "from", routesWithoutQuote.length, "routes", routesWithoutQuote);
  const getQuotes = (routes) => new Promise((resolve, reject) => {
    requestCallback(async () => {
      try {
        const result2 = await getRoutesWithQuote(routes, { blockNumber, gasModel, signal });
        resolve(result2);
      } catch (e) {
        reject(e);
      }
    });
  });
  const chunks = chunk(routesWithoutQuote, 10);
  const result = await Promise.all(chunks.map(getQuotes));
  const quotes = result.reduce((acc, cur) => {
    acc.push(...cur);
    return acc;
  }, []);
  logger.metric("Get quotes", "success, got", quotes.length, "quoted routes", quotes);
  return quotes;
}
var DEFAULT_POOL_SELECTOR_CONFIG = {
  topN: 2,
  topNDirectSwaps: 2,
  topNTokenInOut: 2,
  topNSecondHop: 1,
  topNWithEachBaseToken: 3,
  topNWithBaseToken: 3
};
var V3_DEFAULT_POOL_SELECTOR_CONFIG = {
  [ChainId.BSC]: {
    topN: 2,
    topNDirectSwaps: 2,
    topNTokenInOut: 2,
    topNSecondHop: 1,
    topNWithEachBaseToken: 3,
    topNWithBaseToken: 4
  },
  [ChainId.BSC_TESTNET]: {
    topN: 2,
    topNDirectSwaps: 2,
    topNTokenInOut: 2,
    topNSecondHop: 1,
    topNWithEachBaseToken: 3,
    topNWithBaseToken: 4
  },
  [ChainId.ETHEREUM]: {
    topN: 2,
    topNDirectSwaps: 2,
    topNTokenInOut: 2,
    topNSecondHop: 1,
    topNWithEachBaseToken: 3,
    topNWithBaseToken: 4
  },
  [ChainId.GOERLI]: {
    topN: 2,
    topNDirectSwaps: 2,
    topNTokenInOut: 2,
    topNSecondHop: 1,
    topNWithEachBaseToken: 3,
    topNWithBaseToken: 4
  }
};
var V2_DEFAULT_POOL_SELECTOR_CONFIG = {
  [ChainId.BSC]: {
    topN: 3,
    topNDirectSwaps: 2,
    topNTokenInOut: 2,
    topNSecondHop: 1,
    topNWithEachBaseToken: 3,
    topNWithBaseToken: 3
  },
  [ChainId.BSC_TESTNET]: {
    topN: 3,
    topNDirectSwaps: 2,
    topNTokenInOut: 2,
    topNSecondHop: 1,
    topNWithEachBaseToken: 3,
    topNWithBaseToken: 3
  },
  [ChainId.ETHEREUM]: {
    topN: 3,
    topNDirectSwaps: 2,
    topNTokenInOut: 2,
    topNSecondHop: 1,
    topNWithEachBaseToken: 3,
    topNWithBaseToken: 3
  },
  [ChainId.GOERLI]: {
    topN: 3,
    topNDirectSwaps: 2,
    topNTokenInOut: 2,
    topNSecondHop: 1,
    topNWithEachBaseToken: 3,
    topNWithBaseToken: 3
  }
};
var V3_TOKEN_POOL_SELECTOR_CONFIG = {
  [ChainId.BSC]: {
    [bscTokens.ankr.address]: {
      topNTokenInOut: 4
    },
    [bscTokens.ankrbnb.address]: {
      topNTokenInOut: 4
    },
    [bscTokens.ankrETH.address]: {
      topNTokenInOut: 4
    },
    [bscTokens.wbeth.address]: {
      topNSecondHop: 3
    }
  }
};
var V2_TOKEN_POOL_SELECTOR_CONFIG = {
  [ChainId.BSC]: {
    // GEM
    "0x701F1ed50Aa5e784B8Fb89d1Ba05cCCd627839a7": {
      topNTokenInOut: 4
    }
  }
};
var ROUTE_CONFIG_BY_CHAIN = {
  [ChainId.POLYGON_ZKEVM]: {
    distributionPercent: 50
  },
  [ChainId.ZKSYNC]: {
    distributionPercent: 20
  },
  [ChainId.BASE]: {
    distributionPercent: 10
  }
};

// evm/v3-router/getBestTrade.ts
async function getBestTrade(amount, currency, tradeType, config) {
  const { blockNumber: blockNumberFromConfig } = config;
  const blockNumber = typeof blockNumberFromConfig === "function" ? await blockNumberFromConfig() : blockNumberFromConfig;
  const bestRoutes = await getBestRoutes(amount, currency, tradeType, {
    ...config,
    blockNumber
  });
  if (!bestRoutes || bestRoutes.outputAmount.equalTo(ZERO)) {
    throw new Error("Cannot find a valid swap route");
  }
  const { routes, gasEstimateInUSD, gasEstimate, inputAmount, outputAmount } = bestRoutes;
  return {
    tradeType,
    routes,
    gasEstimate,
    gasEstimateInUSD,
    inputAmount,
    outputAmount,
    blockNumber
  };
}
async function getBestRoutes(amount, currency, tradeType, routeConfig) {
  const { chainId } = currency;
  const {
    maxHops = 3,
    maxSplits = 4,
    distributionPercent = 5,
    poolProvider,
    quoteProvider,
    blockNumber,
    gasPriceWei,
    allowedPoolTypes,
    quoterOptimization,
    quoteCurrencyUsdPrice,
    nativeCurrencyUsdPrice,
    signal
  } = {
    ...routeConfig,
    ...ROUTE_CONFIG_BY_CHAIN[chainId] || {}
  };
  const isExactIn = tradeType === TradeType.EXACT_INPUT;
  const inputCurrency = isExactIn ? amount.currency : currency;
  const outputCurrency = isExactIn ? currency : amount.currency;
  const candidatePools = await poolProvider?.getCandidatePools({
    currencyA: amount.currency,
    currencyB: currency,
    blockNumber,
    protocols: allowedPoolTypes,
    signal
  });
  let baseRoutes = computeAllRoutes(inputCurrency, outputCurrency, candidatePools, maxHops);
  if (tradeType === TradeType.EXACT_OUTPUT) {
    baseRoutes = baseRoutes.filter(({ type }) => type !== 3 /* MIXED */);
  }
  const gasModel = await createGasModel({
    gasPriceWei,
    poolProvider,
    quoteCurrency: currency,
    blockNumber,
    quoteCurrencyUsdPrice,
    nativeCurrencyUsdPrice
  });
  const routesWithValidQuote = await getRoutesWithValidQuote({
    amount,
    baseRoutes,
    distributionPercent,
    quoteProvider,
    tradeType,
    blockNumber,
    gasModel,
    quoterOptimization,
    signal
  });
  return getBestRouteCombinationByQuotes(amount, currency, routesWithValidQuote, tradeType, { maxSplits });
}

// evm/v3-router/providers/poolProviders/poolProviderWithCache.ts
function createPoolProviderWithCache(provider) {
  return provider;
}
function formatFraction(fraction, precision = 6, rounding = void 0) {
  if (!fraction || fraction.denominator === 0n) {
    return void 0;
  }
  if (precision === 0 || fraction.greaterThan(10n ** BigInt(precision))) {
    return fraction.toFixed(0);
  }
  return fraction.toSignificant(precision, void 0, rounding);
}
function formatPrice(price, precision) {
  if (!price) {
    return void 0;
  }
  return formatFraction(price?.asFraction.multiply(price?.scalar), precision);
}

// evm/utils/withFallback.ts
function withTimeout(fn, duration) {
  return function callWithTimeout(...args) {
    return Promise.race([
      fn(...args),
      new Promise((_, reject) => {
        setTimeout(() => reject(new Error(`Request timeout ${duration}ms`)), duration);
      })
    ]);
  };
}
function withFallback(calls) {
  return async function asyncCall(...args) {
    const numOfCalls = calls.length;
    if (numOfCalls === 0) {
      throw new Error("No valid calls");
    }
    for (const [index, { timeout = 2e3, asyncFn }] of calls.entries()) {
      const fn = index < numOfCalls - 1 ? withTimeout(asyncFn, timeout) : asyncFn;
      try {
        const result = await fn(...args);
        return result;
      } catch (e) {
        if (index === numOfCalls - 1) {
          throw e;
        }
        logger.error(`Call failed with error %O, try next fallback`, e);
      }
    }
    throw new Error("Unexpected end of call");
  };
}
function createAsyncCallWithFallbacks(defaultCall, options) {
  const { fallbacks = [], fallbackTimeout: timeout = 3e3 } = options || {};
  return withFallback(
    [defaultCall, ...fallbacks].map((asyncFn) => ({
      asyncFn,
      timeout
    }))
  );
}
var tokenPriceQuery = gql`
  query getTokens($pageSize: Int!, $tokenAddrs: [ID!]) {
    tokens(first: $pageSize, where: { id_in: $tokenAddrs }) {
      id
      derivedUSD
    }
  }
`;
function createCommonTokenPriceProvider(getTokenPrices) {
  return async function getCommonTokenPrices2({ currencyA, currencyB, ...rest }) {
    const baseTokens = await getCheckAgainstBaseTokens(currencyA, currencyB);
    if (!baseTokens) {
      return null;
    }
    const map = /* @__PURE__ */ new Map();
    const idToToken = {};
    const addresses = baseTokens.map((t) => {
      const address = getAddress(t.address);
      idToToken[address] = t;
      return address;
    });
    const tokenPrices = await getTokenPrices({ addresses, chainId: currencyA?.chainId, ...rest });
    for (const { address, priceUSD } of tokenPrices) {
      const token = idToToken[getAddress(address)];
      if (token) {
        map.set(token.wrapped.address, parseFloat(priceUSD) || 0);
      }
    }
    return map;
  };
}
var getTokenUsdPricesBySubgraph = async ({
  addresses,
  chainId,
  provider
}) => {
  const client = provider?.({ chainId });
  if (!client) {
    throw new Error("No valid subgraph data provider");
  }
  const { tokens: tokenPrices } = await client.request(
    tokenPriceQuery,
    {
      pageSize: 1e3,
      tokenAddrs: addresses.map((addr) => addr.toLocaleLowerCase())
    }
  );
  return tokenPrices.map(({ id, derivedUSD }) => ({
    address: id,
    priceUSD: derivedUSD
  }));
};
var getCommonTokenPricesBySubgraph = createCommonTokenPriceProvider(getTokenUsdPricesBySubgraph);
var createGetTokenPriceFromLlmaWithCache = ({
  endpoint
}) => {
  const cache = /* @__PURE__ */ new Map();
  return async ({ addresses, chainId }) => {
    if (!chainId || !getLlamaChainName(chainId)) {
      return [];
    }
    const [cachedResults, addressesToFetch] = addresses.reduce(
      ([cachedAddrs, newAddrs], address) => {
        const cached = cache.get(address);
        if (!cached) {
          newAddrs.push(address);
        } else {
          cachedAddrs.push(cached);
        }
        return [cachedAddrs, newAddrs];
      },
      [[], []]
    );
    if (!addressesToFetch.length) {
      return cachedResults;
    }
    const list = addressesToFetch.map((address) => `${getLlamaChainName(chainId)}:${address.toLocaleLowerCase()}`).join(",");
    const result = await fetch(`${endpoint}/${list}`).then(
      (res) => res.json()
    );
    const { coins = {} } = result;
    return [
      ...cachedResults,
      ...Object.entries(coins).map(([key, value]) => {
        const [, address] = key.split(":");
        const tokenPrice = { address, priceUSD: value.price };
        cache.set(getAddress(address), tokenPrice);
        return tokenPrice;
      })
    ];
  };
};
var getCommonTokenPricesByLlma = createCommonTokenPriceProvider(
  createGetTokenPriceFromLlmaWithCache({
    endpoint: "https://coins.llama.fi/prices/current"
  })
);
var getCommonTokenPricesByWalletApi = createCommonTokenPriceProvider(
  createGetTokenPriceFromLlmaWithCache({
    endpoint: "https://wallet-api.pancakeswap.com/v1/prices"
  })
);
var getCommonTokenPrices = withFallback([
  {
    asyncFn: ({ currencyA, currencyB }) => getCommonTokenPricesByLlma({ currencyA, currencyB }),
    timeout: 3e3
  },
  {
    asyncFn: ({ currencyA, currencyB }) => getCommonTokenPricesByWalletApi({ currencyA, currencyB }),
    timeout: 3e3
  },
  {
    asyncFn: ({ currencyA, currencyB, v3SubgraphProvider }) => getCommonTokenPricesBySubgraph({ currencyA, currencyB, provider: v3SubgraphProvider })
  }
]);
var getV2PoolsOnChain = createOnChainPoolFactory({
  abi: pancakePairABI,
  getPossiblePoolMetas: async ([currencyA, currencyB]) => [
    { id: computeV2PoolAddress(currencyA.wrapped, currencyB.wrapped), currencyA, currencyB }
  ],
  buildPoolInfoCalls: ({ id: address }) => [
    {
      address,
      functionName: "getReserves",
      args: []
    }
  ],
  buildPool: ({ currencyA, currencyB }, [reserves]) => {
    if (!reserves) {
      return null;
    }
    const [reserve0, reserve1] = reserves;
    const [token0, token1] = currencyA.wrapped.sortsBefore(currencyB.wrapped) ? [currencyA, currencyB] : [currencyB, currencyA];
    return {
      type: 0 /* V2 */,
      reserve0: CurrencyAmount.fromRawAmount(token0, reserve0.toString()),
      reserve1: CurrencyAmount.fromRawAmount(token1, reserve1.toString())
    };
  }
});
var getStablePoolsOnChain = createOnChainPoolFactory({
  abi: stableSwapPairABI,
  getPossiblePoolMetas: async ([currencyA, currencyB]) => {
    const poolConfigs = await getStableSwapPools(currencyA.chainId);
    return poolConfigs.filter(({ token, quoteToken }) => {
      const tokenA = deserializeToken(token);
      const tokenB = deserializeToken(quoteToken);
      return tokenA.equals(currencyA.wrapped) && tokenB.equals(currencyB.wrapped) || tokenA.equals(currencyB.wrapped) && tokenB.equals(currencyA.wrapped);
    }).map(({ stableSwapAddress }) => ({
      id: stableSwapAddress,
      currencyA,
      currencyB
    }));
  },
  buildPoolInfoCalls: ({ id: address }) => [
    {
      address,
      functionName: "balances",
      args: [0]
    },
    {
      address,
      functionName: "balances",
      args: [1]
    },
    {
      address,
      functionName: "A",
      args: []
    },
    {
      address,
      functionName: "fee",
      args: []
    },
    {
      address,
      functionName: "FEE_DENOMINATOR",
      args: []
    }
  ],
  buildPool: ({ currencyA, currencyB, id: address }, [balance0, balance1, a, fee, feeDenominator]) => {
    if (!balance0 || !balance1 || !a || !fee || !feeDenominator) {
      return null;
    }
    const [token0, token1] = currencyA.wrapped.sortsBefore(currencyB.wrapped) ? [currencyA, currencyB] : [currencyB, currencyA];
    return {
      address,
      type: 2 /* STABLE */,
      balances: [
        CurrencyAmount.fromRawAmount(token0, balance0.toString()),
        CurrencyAmount.fromRawAmount(token1, balance1.toString())
      ],
      amplifier: BigInt(a.toString()),
      fee: new Percent(BigInt(fee.toString()), BigInt(feeDenominator.toString()))
    };
  }
});
var getV3PoolsWithoutTicksOnChain = createOnChainPoolFactory({
  abi: pancakeV3PoolABI,
  getPossiblePoolMetas: async ([currencyA, currencyB]) => {
    const deployerAddress = DEPLOYER_ADDRESSES[currencyA.chainId];
    if (!deployerAddress) {
      return [];
    }
    return [FeeAmount.LOWEST, FeeAmount.LOW, FeeAmount.MEDIUM, FeeAmount.HIGH].map((fee) => ({
      id: computeV3PoolAddress({
        deployerAddress,
        tokenA: currencyA.wrapped,
        tokenB: currencyB.wrapped,
        fee
      }),
      currencyA,
      currencyB,
      fee
    }));
  },
  buildPoolInfoCalls: ({ id: address, currencyA, currencyB }) => [
    {
      address,
      functionName: "liquidity"
    },
    {
      address,
      functionName: "slot0"
    },
    {
      abi: erc20Abi,
      address: currencyA.wrapped.address,
      functionName: "balanceOf",
      args: [address]
    },
    {
      abi: erc20Abi,
      address: currencyB.wrapped.address,
      functionName: "balanceOf",
      args: [address]
    }
  ],
  buildPool: ({ currencyA, currencyB, fee, id: address }, [liquidity, slot0, balanceA, balanceB]) => {
    if (!slot0) {
      return null;
    }
    const [sqrtPriceX96, tick, , , , feeProtocol] = slot0;
    const sorted = currencyA.wrapped.sortsBefore(currencyB.wrapped);
    const [balance0, balance1] = sorted ? [balanceA, balanceB] : [balanceB, balanceA];
    const [token0, token1] = sorted ? [currencyA, currencyB] : [currencyB, currencyA];
    const [token0ProtocolFee, token1ProtocolFee] = parseProtocolFees(feeProtocol);
    return {
      type: 1 /* V3 */,
      token0,
      token1,
      reserve0: CurrencyAmount.fromRawAmount(token0, balance0),
      reserve1: CurrencyAmount.fromRawAmount(token1, balance1),
      fee,
      liquidity: BigInt(liquidity.toString()),
      sqrtRatioX96: BigInt(sqrtPriceX96.toString()),
      tick: Number(tick),
      address,
      token0ProtocolFee,
      token1ProtocolFee
    };
  }
});
function createOnChainPoolFactory({ abi, getPossiblePoolMetas, buildPoolInfoCalls, buildPool }) {
  return async function poolFactory(pairs, provider, _blockNumber) {
    if (!provider) {
      throw new Error("No valid onchain data provider");
    }
    const chainId = pairs[0]?.[0]?.chainId;
    const client = provider({ chainId });
    if (!chainId || !client) {
      return [];
    }
    const poolAddressSet = /* @__PURE__ */ new Set();
    const poolMetas = [];
    const allPossibleMetas = await Promise.all(pairs.map((pair) => getPossiblePoolMetas(pair)));
    for (const possiblePoolMetas of allPossibleMetas) {
      for (const meta of possiblePoolMetas) {
        if (!poolAddressSet.has(meta.id)) {
          poolMetas.push(meta);
          poolAddressSet.add(meta.id);
        }
      }
    }
    let calls = [];
    let poolCallSize = 0;
    for (const meta of poolMetas) {
      const poolCalls = buildPoolInfoCalls(meta);
      if (!poolCallSize) {
        poolCallSize = poolCalls.length;
      }
      if (!poolCallSize || poolCallSize !== poolCalls.length) {
        throw new Error("Inconsistent pool data call");
      }
      calls = [...calls, ...poolCalls];
    }
    if (!calls.length) {
      return [];
    }
    const results = await client.multicall({
      contracts: calls.map((call) => ({
        abi: call.abi || abi,
        address: call.address,
        functionName: call.functionName,
        args: call.args
      })),
      allowFailure: true
    });
    const pools = [];
    for (let i = 0; i < poolMetas.length; i += 1) {
      const poolResults = results.slice(i * poolCallSize, (i + 1) * poolCallSize);
      const pool = buildPool(
        poolMetas[i],
        poolResults.map((result) => result.result)
      );
      if (pool) {
        pools.push(pool);
      }
    }
    return pools;
  };
}

// evm/v3-router/utils/mergePoolSelectorConfig.ts
function mergePoolSelectorConfig(baseConfig, customConfig) {
  if (!customConfig) {
    return baseConfig;
  }
  const merged = { ...baseConfig };
  const keys = Object.keys(merged);
  for (const key of keys) {
    merged[key] = Math.max(merged[key], customConfig[key] || 0);
  }
  return merged;
}

// evm/v3-router/utils/getPoolSelectorConfig.ts
function poolSelectorConfigFactory(poolSelecorConfigMap, tokenPoolSelectorConfigMap) {
  return function getPoolSelectorConfig(currencyA, currencyB) {
    const chainId = currencyA?.chainId;
    if (!chainId || !poolSelecorConfigMap[chainId]) {
      return DEFAULT_POOL_SELECTOR_CONFIG;
    }
    const additionalConfigA = tokenPoolSelectorConfigMap[chainId]?.[currencyA?.wrapped?.address || "0x"];
    const additionalConfigB = tokenPoolSelectorConfigMap[chainId]?.[currencyB?.wrapped?.address || "0x"];
    return mergePoolSelectorConfig(
      mergePoolSelectorConfig(poolSelecorConfigMap[chainId], additionalConfigA),
      additionalConfigB
    );
  };
}
var getV3PoolSelectorConfig = poolSelectorConfigFactory(
  V3_DEFAULT_POOL_SELECTOR_CONFIG,
  V3_TOKEN_POOL_SELECTOR_CONFIG
);
var getV2PoolSelectorConfig = poolSelectorConfigFactory(
  V2_DEFAULT_POOL_SELECTOR_CONFIG,
  V2_TOKEN_POOL_SELECTOR_CONFIG
);

// evm/v3-router/providers/poolProviders/poolTvlSelectors.ts
var sortByTvl = (a, b) => a.tvlUSD >= b.tvlUSD ? -1 : 1;
function poolSelectorFactory({
  getPoolSelectorConfig,
  getToken0,
  getToken1,
  getPoolAddress: getPoolAddress2
}) {
  return function tvlSelector(currencyA, currencyB, unorderedPoolsWithTvl) {
    const POOL_SELECTION_CONFIG = getPoolSelectorConfig(currencyA, currencyB);
    if (!currencyA || !currencyB || !unorderedPoolsWithTvl.length) {
      return [];
    }
    const poolsFromSubgraph = unorderedPoolsWithTvl.sort(sortByTvl);
    const { chainId } = getToken0(poolsFromSubgraph[0]);
    const baseTokens = BASES_TO_CHECK_TRADES_AGAINST[chainId] ?? [];
    const poolSet = /* @__PURE__ */ new Set();
    const addToPoolSet = (pools2) => {
      for (const pool of pools2) {
        poolSet.add(getPoolAddress2(pool));
      }
    };
    const topByBaseWithTokenIn = baseTokens.map((token) => {
      return poolsFromSubgraph.filter((subgraphPool) => {
        return getToken0(subgraphPool).wrapped.equals(token) && getToken1(subgraphPool).wrapped.equals(currencyA.wrapped) || getToken1(subgraphPool).wrapped.equals(token) && getToken0(subgraphPool).wrapped.equals(currencyA.wrapped);
      }).sort(sortByTvl).slice(0, POOL_SELECTION_CONFIG.topNWithEachBaseToken);
    }).reduce((acc, cur) => {
      acc.push(...cur);
      return acc;
    }, []).sort(sortByTvl).slice(0, POOL_SELECTION_CONFIG.topNWithBaseToken);
    addToPoolSet(topByBaseWithTokenIn);
    const topByBaseWithTokenOut = baseTokens.map((token) => {
      return poolsFromSubgraph.filter((subgraphPool) => {
        if (poolSet.has(getPoolAddress2(subgraphPool))) {
          return false;
        }
        return getToken0(subgraphPool).wrapped.equals(token) && getToken1(subgraphPool).wrapped.equals(currencyB.wrapped) || getToken1(subgraphPool).wrapped.equals(token) && getToken0(subgraphPool).wrapped.equals(currencyB.wrapped);
      }).sort(sortByTvl).slice(0, POOL_SELECTION_CONFIG.topNWithEachBaseToken);
    }).reduce((acc, cur) => {
      acc.push(...cur);
      return acc;
    }, []).sort(sortByTvl).slice(0, POOL_SELECTION_CONFIG.topNWithBaseToken);
    addToPoolSet(topByBaseWithTokenOut);
    const top2DirectPools = poolsFromSubgraph.filter((subgraphPool) => {
      if (poolSet.has(getPoolAddress2(subgraphPool))) {
        return false;
      }
      return getToken0(subgraphPool).wrapped.equals(currencyA.wrapped) && getToken1(subgraphPool).wrapped.equals(currencyB.wrapped) || getToken1(subgraphPool).wrapped.equals(currencyA.wrapped) && getToken0(subgraphPool).wrapped.equals(currencyB.wrapped);
    }).slice(0, POOL_SELECTION_CONFIG.topNDirectSwaps);
    addToPoolSet(top2DirectPools);
    const nativeToken = WNATIVE[chainId];
    const top2EthBaseTokenPool = nativeToken ? poolsFromSubgraph.filter((subgraphPool) => {
      if (poolSet.has(getPoolAddress2(subgraphPool))) {
        return false;
      }
      return getToken0(subgraphPool).wrapped.equals(nativeToken) && getToken1(subgraphPool).wrapped.equals(currencyA.wrapped) || getToken1(subgraphPool).wrapped.equals(nativeToken) && getToken0(subgraphPool).wrapped.equals(currencyA.wrapped);
    }).slice(0, 1) : [];
    addToPoolSet(top2EthBaseTokenPool);
    const top2EthQuoteTokenPool = nativeToken ? poolsFromSubgraph.filter((subgraphPool) => {
      if (poolSet.has(getPoolAddress2(subgraphPool))) {
        return false;
      }
      return getToken0(subgraphPool).wrapped.equals(nativeToken) && getToken1(subgraphPool).wrapped.equals(currencyB.wrapped) || getToken1(subgraphPool).wrapped.equals(nativeToken) && getToken0(subgraphPool).wrapped.equals(currencyB.wrapped);
    }).slice(0, 1) : [];
    addToPoolSet(top2EthQuoteTokenPool);
    const topByTVL = poolsFromSubgraph.slice(0, POOL_SELECTION_CONFIG.topN).filter((pool) => !poolSet.has(getPoolAddress2(pool)));
    addToPoolSet(topByTVL);
    const topByTVLUsingTokenBase = poolsFromSubgraph.filter((subgraphPool) => {
      if (poolSet.has(getPoolAddress2(subgraphPool))) {
        return false;
      }
      return getToken0(subgraphPool).wrapped.equals(currencyA.wrapped) || getToken1(subgraphPool).wrapped.equals(currencyA.wrapped);
    }).slice(0, POOL_SELECTION_CONFIG.topNTokenInOut);
    addToPoolSet(topByTVLUsingTokenBase);
    const topByTVLUsingTokenQuote = poolsFromSubgraph.filter((subgraphPool) => {
      if (poolSet.has(getPoolAddress2(subgraphPool))) {
        return false;
      }
      return getToken0(subgraphPool).wrapped.equals(currencyB.wrapped) || getToken1(subgraphPool).wrapped.equals(currencyB.wrapped);
    }).slice(0, POOL_SELECTION_CONFIG.topNTokenInOut);
    addToPoolSet(topByTVLUsingTokenQuote);
    const getTopByTVLUsingTokenSecondHops = (base, tokenToCompare) => base.map((subgraphPool) => {
      return getToken0(subgraphPool).wrapped.equals(tokenToCompare.wrapped) ? getToken1(subgraphPool) : getToken0(subgraphPool);
    }).map((secondHopToken) => {
      return poolsFromSubgraph.filter((subgraphPool) => {
        if (poolSet.has(getPoolAddress2(subgraphPool))) {
          return false;
        }
        return getToken0(subgraphPool).wrapped.equals(secondHopToken.wrapped) || getToken1(subgraphPool).wrapped.equals(secondHopToken.wrapped);
      });
    }).reduce((acc, cur) => {
      acc.push(...cur);
      return acc;
    }, []).reduce((acc, cur) => {
      if (!acc.some((p) => p === cur)) {
        acc.push(cur);
      }
      return acc;
    }, []).sort(sortByTvl).slice(0, POOL_SELECTION_CONFIG.topNSecondHop);
    const topByTVLUsingTokenInSecondHops = getTopByTVLUsingTokenSecondHops(
      [...topByTVLUsingTokenBase, ...topByBaseWithTokenIn],
      currencyA
    );
    addToPoolSet(topByTVLUsingTokenInSecondHops);
    const topByTVLUsingTokenOutSecondHops = getTopByTVLUsingTokenSecondHops(
      [...topByTVLUsingTokenQuote, ...topByBaseWithTokenOut],
      currencyB
    );
    addToPoolSet(topByTVLUsingTokenOutSecondHops);
    const pools = [
      ...topByBaseWithTokenIn,
      ...topByBaseWithTokenOut,
      ...top2DirectPools,
      ...top2EthBaseTokenPool,
      ...top2EthQuoteTokenPool,
      ...topByTVL,
      ...topByTVLUsingTokenBase,
      ...topByTVLUsingTokenQuote,
      ...topByTVLUsingTokenInSecondHops,
      ...topByTVLUsingTokenOutSecondHops
    ];
    return pools.map(({ tvlUSD, ...rest }) => rest);
  };
}
var v3PoolTvlSelector = poolSelectorFactory({
  getPoolSelectorConfig: getV3PoolSelectorConfig,
  getToken0: (p) => p.token0,
  getToken1: (p) => p.token1,
  getPoolAddress: (p) => p.address
});
var v2PoolTvlSelector = poolSelectorFactory({
  getPoolSelectorConfig: getV2PoolSelectorConfig,
  getToken0: (p) => p.reserve0.currency,
  getToken1: (p) => p.reserve1.currency,
  getPoolAddress: (p) => getPoolAddress(p) || "0x"
});
function subgraphPoolProviderFactory({
  id,
  getPoolMetas,
  getPoolsFromSubgraph
}) {
  return async function subgraphPoolProvider({
    provider,
    pairs
  }) {
    if (!provider) {
      throw new Error("No valid subgraph data provider");
    }
    const chainId = pairs[0]?.[0]?.chainId;
    if (!chainId) {
      return [];
    }
    const client = provider({ chainId });
    if (!client) {
      logger.error("No subgraph client found for chainId", chainId);
      return [];
    }
    metric(`SUBGRAPH_POOLS_START(${id})`, pairs);
    const metaMap = /* @__PURE__ */ new Map();
    for (const pair of pairs) {
      const metas = getPoolMetas(pair);
      for (const meta of metas) {
        metaMap.set(meta.id.toLocaleLowerCase(), meta);
      }
    }
    const addresses = Array.from(metaMap.keys());
    const pools = await getPoolsFromSubgraph({
      addresses,
      getPoolMetaByAddress: (address) => metaMap.get(address.toLocaleLowerCase()) ?? null,
      client
    });
    metric(`SUBGRAPH_POOLS_END(${id})`, pools);
    return pools.filter((p) => !!p);
  };
}
var getV3PoolMeta = memoize(
  ([currencyA, currencyB, feeAmount]) => ({
    id: Pool.getAddress(currencyA.wrapped, currencyB.wrapped, feeAmount),
    currencyA,
    currencyB,
    fee: feeAmount
  }),
  ([currencyA, currencyB, feeAmount]) => {
    if (currencyA.wrapped.equals(currencyB.wrapped)) {
      return [currencyA.chainId, currencyA.wrapped.address, feeAmount].join("_");
    }
    const [token0, token1] = currencyA.wrapped.sortsBefore(currencyB.wrapped) ? [currencyA.wrapped, currencyB.wrapped] : [currencyB.wrapped, currencyA.wrapped];
    return [token0.chainId, token0.address, token1.address, feeAmount].join("_");
  }
);
var getV3PoolMetas = memoize(
  (pair) => [FeeAmount.LOWEST, FeeAmount.LOW, FeeAmount.MEDIUM, FeeAmount.HIGH].map((fee) => getV3PoolMeta([...pair, fee])),
  ([currencyA, currencyB]) => {
    if (currencyA.wrapped.equals(currencyB.wrapped)) {
      return [currencyA.chainId, currencyA.wrapped.address].join("_");
    }
    const [token0, token1] = currencyA.wrapped.sortsBefore(currencyB.wrapped) ? [currencyA.wrapped, currencyB.wrapped] : [currencyB.wrapped, currencyA.wrapped];
    return [token0.chainId, token0.address, token1.address].join("_");
  }
);
var queryV3Pools = gql`
  query getPools($pageSize: Int!, $poolAddrs: [String]) {
    pools(first: $pageSize, where: { id_in: $poolAddrs }) {
      id
      tick
      sqrtPrice
      feeTier
      liquidity
      feeProtocol
      totalValueLockedUSD
    }
  }
`;
var getV3PoolSubgraph = subgraphPoolProviderFactory({
  id: "V3",
  getPoolMetas: getV3PoolMetas,
  getPoolsFromSubgraph: async ({ addresses, getPoolMetaByAddress, client }) => {
    const { pools: poolsFromSubgraph } = await client.request(queryV3Pools, {
      pageSize: 1e3,
      poolAddrs: addresses
    });
    return poolsFromSubgraph.map(({ id, liquidity, sqrtPrice, tick, totalValueLockedUSD, feeProtocol }) => {
      const meta = getPoolMetaByAddress(id);
      if (!meta) {
        return null;
      }
      const { fee, currencyA, currencyB, id: address } = meta;
      const [token0, token1] = currencyA.wrapped.sortsBefore(currencyB.wrapped) ? [currencyA, currencyB] : [currencyB, currencyA];
      const [token0ProtocolFee, token1ProtocolFee] = parseProtocolFees(feeProtocol);
      return {
        type: 1 /* V3 */,
        fee,
        token0,
        token1,
        liquidity: BigInt(liquidity),
        sqrtRatioX96: BigInt(sqrtPrice),
        tick: Number(tick),
        address,
        tvlUSD: BigInt(Number.parseInt(totalValueLockedUSD)),
        token0ProtocolFee,
        token1ProtocolFee
      };
    });
  }
});
var queryV2Pools = gql`
  query getPools($pageSize: Int!, $poolAddrs: [ID!]) {
    pairs(first: $pageSize, where: { id_in: $poolAddrs }) {
      id
      reserve0
      reserve1
      reserveUSD
    }
  }
`;
var getV2PoolSubgraph = subgraphPoolProviderFactory({
  id: "V2",
  getPoolMetas: ([currencyA, currencyB]) => [
    {
      currencyA,
      currencyB,
      id: computeV2PoolAddress(currencyA.wrapped, currencyB.wrapped)
    }
  ],
  getPoolsFromSubgraph: async ({ addresses, getPoolMetaByAddress, client }) => {
    const { pairs: poolsFromSubgraph } = await client.request(queryV2Pools, {
      pageSize: 1e3,
      poolAddrs: addresses
    });
    return poolsFromSubgraph.map(({ id, reserveUSD, reserve0, reserve1 }) => {
      const meta = getPoolMetaByAddress(id);
      if (!meta) {
        return null;
      }
      const { currencyA, currencyB, id: address } = meta;
      const [token0, token1] = currencyA.wrapped.sortsBefore(currencyB.wrapped) ? [currencyA, currencyB] : [currencyB, currencyA];
      const reserve0Amount = tryParseAmount_default(reserve0, token0);
      const reserve1Amount = tryParseAmount_default(reserve1, token1);
      if (!reserve0Amount || !reserve1Amount) {
        return null;
      }
      return {
        address,
        type: 0 /* V2 */,
        reserve0: reserve0Amount,
        reserve1: reserve1Amount,
        tvlUSD: BigInt(Number.parseInt(reserveUSD))
      };
    });
  }
});
function subgraphAllPoolsQueryFactory({
  getPoolsFromSubgraph,
  getPoolId: getPoolId3
}) {
  return async function getAllPools({
    provider,
    chainId,
    pageSize = 1e3
  }) {
    if (!provider || !chainId) {
      throw new Error("No valid subgraph data provider");
    }
    const client = provider({ chainId });
    if (!client) {
      throw new Error(`No subgraph client found for chainId ${chainId}`);
    }
    let hasMorePools = true;
    let lastId = "";
    let pools = [];
    while (hasMorePools) {
      const poolsAtCurrentPage = await getPoolsFromSubgraph({ client, lastId, pageSize, chainId });
      if (poolsAtCurrentPage.length < pageSize) {
        hasMorePools = false;
        pools = [...pools, ...poolsAtCurrentPage];
        break;
      }
      lastId = getPoolId3(poolsAtCurrentPage[poolsAtCurrentPage.length - 1]);
      pools = [...pools, ...poolsAtCurrentPage];
    }
    return pools;
  };
}
var queryAllV3Pools = gql`
  query getPools($pageSize: Int!, $id: String) {
    pools(first: $pageSize, where: { id_gt: $id }) {
      id
      tick
      token0 {
        symbol
        id
        decimals
      }
      token1 {
        symbol
        id
        decimals
      }
      sqrtPrice
      feeTier
      liquidity
      feeProtocol
      totalValueLockedUSD
    }
  }
`;
var getAllV3PoolsFromSubgraph = subgraphAllPoolsQueryFactory({
  id: "getAllV3PoolsFromSubgraph",
  getPoolsFromSubgraph: async ({ lastId, pageSize, client, chainId }) => {
    const { pools: poolsFromSubgraph } = await client.request(
      queryAllV3Pools,
      {
        pageSize,
        id: lastId
      }
    );
    return poolsFromSubgraph.map(
      ({ id, liquidity, sqrtPrice, tick, totalValueLockedUSD, feeProtocol, token0, token1, feeTier }) => {
        const [token0ProtocolFee, token1ProtocolFee] = parseProtocolFees(feeProtocol);
        return {
          type: 1 /* V3 */,
          fee: Number(feeTier),
          token0: new Token(chainId, getAddress(token0.id), Number(token0.decimals), token0.symbol),
          token1: new Token(chainId, getAddress(token1.id), Number(token1.decimals), token1.symbol),
          liquidity: BigInt(liquidity),
          sqrtRatioX96: BigInt(sqrtPrice),
          tick: Number(tick),
          address: getAddress(id),
          tvlUSD: BigInt(Number.parseInt(totalValueLockedUSD)),
          token0ProtocolFee,
          token1ProtocolFee
        };
      }
    );
  },
  getPoolId: (p) => p.address
});

// evm/v3-router/providers/poolProviders/getV2CandidatePools.ts
function createV2PoolsProviderByCommonTokenPrices(getCommonTokenPrices2) {
  return async function getV2Pools({
    currencyA,
    currencyB,
    pairs: providedPairs,
    onChainProvider,
    blockNumber,
    ...rest
  }) {
    const pairs = providedPairs || await getPairCombinations(currencyA, currencyB);
    const [poolsFromOnChain, baseTokenUsdPrices] = await Promise.all([
      getV2PoolsOnChain(pairs, onChainProvider, blockNumber),
      getCommonTokenPrices2({ currencyA, currencyB, ...rest })
    ]);
    if (!poolsFromOnChain) {
      throw new Error("Failed to get v2 candidate pools");
    }
    if (!baseTokenUsdPrices) {
      logger.log("Failed to get base token prices");
      return poolsFromOnChain.map((pool) => {
        return {
          ...pool,
          tvlUSD: BigInt(0),
          address: getPoolAddress(pool)
        };
      });
    }
    return poolsFromOnChain.map((pool) => {
      const getAmountUsd = (amount) => {
        if (amount.equalTo(ZERO)) {
          return 0;
        }
        const price = baseTokenUsdPrices.get(amount.currency.wrapped.address);
        if (price !== void 0) {
          return parseFloat(amount.toExact()) * price;
        }
        const againstAmount = pool.reserve0.currency.equals(amount.currency) ? pool.reserve1 : pool.reserve0;
        const againstUsdPrice = baseTokenUsdPrices.get(againstAmount.currency.wrapped.address);
        if (againstUsdPrice) {
          const poolPrice = new Price({ baseAmount: amount, quoteAmount: againstAmount });
          return parseFloat(amount.toExact()) * parseFloat(formatPrice(poolPrice, 6) || "0");
        }
        return 0;
      };
      return {
        ...pool,
        tvlUSD: BigInt(Math.floor(getAmountUsd(pool.reserve0) + getAmountUsd(pool.reserve1))),
        address: getPoolAddress(pool)
      };
    });
  };
}
var getV2PoolsWithTvlByCommonTokenPrices = createV2PoolsProviderByCommonTokenPrices(getCommonTokenPrices);
function createGetV2CandidatePools(defaultGetV2Pools, options) {
  const getV2PoolsWithFallbacks = createAsyncCallWithFallbacks(defaultGetV2Pools, options);
  return async function getV2Pools(params) {
    const { currencyA, currencyB } = params;
    const pools = await getV2PoolsWithFallbacks(params);
    return v2PoolTvlSelector(currencyA, currencyB, pools);
  };
}
async function getV2CandidatePools(params) {
  const fallbacks = [
    async ({ pairs: providedPairs, currencyA, currencyB, v2SubgraphProvider }) => {
      const pairs = providedPairs || await getPairCombinations(currencyA, currencyB);
      return getV2PoolSubgraph({ provider: v2SubgraphProvider, pairs });
    }
  ];
  const getV2PoolsWithFallbacks = createGetV2CandidatePools(getV2PoolsWithTvlByCommonTokenPrices, {
    fallbacks,
    fallbackTimeout: 3e3
  });
  return getV2PoolsWithFallbacks(params);
}
var getV3PoolTvl = memoize(
  (pools, poolAddress) => {
    const poolWithTvl = pools.find((p) => p.address === poolAddress);
    return poolWithTvl?.tvlUSD || 0n;
  },
  (_, poolAddress) => poolAddress
);
var v3PoolsOnChainProviderFactory = (tvlReferenceProvider) => {
  return async function getV3PoolsWithTvlFromOnChain2(params) {
    const { currencyA, currencyB, pairs: providedPairs, onChainProvider, blockNumber } = params;
    const pairs = providedPairs || await getPairCombinations(currencyA, currencyB);
    const [fromOnChain, tvlReference] = await Promise.allSettled([
      getV3PoolsWithoutTicksOnChain(pairs, onChainProvider, blockNumber),
      tvlReferenceProvider(params)
    ]);
    if (fromOnChain.status === "fulfilled" && tvlReference.status === "fulfilled") {
      const { value: poolsFromOnChain } = fromOnChain;
      const { value: poolTvlReferences } = tvlReference;
      if (!Array.isArray(poolTvlReferences)) {
        throw new Error("Failed to get tvl references");
      }
      return poolsFromOnChain.map((pool) => {
        const tvlUSD = BigInt(getV3PoolTvl(poolTvlReferences, pool.address));
        return {
          ...pool,
          tvlUSD
        };
      });
    }
    throw new Error(`Getting v3 pools failed. Onchain ${fromOnChain.status}, tvl references ${tvlReference.status}`);
  };
};
var getV3PoolsWithTvlFromOnChain = v3PoolsOnChainProviderFactory(async (params) => {
  const { currencyA, currencyB, pairs: providedPairs, subgraphProvider } = params;
  const pairs = providedPairs || await getPairCombinations(currencyA, currencyB);
  return getV3PoolSubgraph({ provider: subgraphProvider, pairs });
});
var createFallbackTvlRefGetter = () => {
  const cache = /* @__PURE__ */ new Map();
  return async (params) => {
    const { currencyA } = params;
    if (!currencyA?.chainId) {
      throw new Error(`Cannot get tvl references at chain ${currencyA?.chainId}`);
    }
    const cached = cache.get(currencyA.chainId);
    if (cached) {
      return cached;
    }
    const res = await fetch(`https://routing-api.pancakeswap.com/v0/v3-pools-tvl/${currencyA.chainId}`);
    const refs = await res.json();
    cache.set(currencyA.chainId, refs);
    return refs;
  };
};
var getV3PoolsWithTvlFromOnChainFallback = v3PoolsOnChainProviderFactory(createFallbackTvlRefGetter());
var getV3PoolsWithTvlFromOnChainStaticFallback = v3PoolsOnChainProviderFactory(() => Promise.resolve([]));
function createGetV3CandidatePools(defaultGetV3Pools, options) {
  const getV3PoolsWithFallbacks = createAsyncCallWithFallbacks(defaultGetV3Pools, options);
  return async function getV3Pools2(params) {
    const { currencyA, currencyB } = params;
    const pools = await getV3PoolsWithFallbacks(params);
    return v3PoolTvlSelector(currencyA, currencyB, pools);
  };
}
async function getV3CandidatePools(params) {
  const { subgraphFallback = true, staticFallback = true, fallbackTimeout, ...rest } = params;
  const fallbacks = [];
  if (subgraphFallback) {
    fallbacks.push(getV3PoolsWithTvlFromOnChain);
    fallbacks.push(async (p) => {
      const { currencyA, currencyB, pairs: providedPairs, subgraphProvider } = p;
      const pairs = providedPairs || await getPairCombinations(currencyA, currencyB);
      return getV3PoolSubgraph({ provider: subgraphProvider, pairs });
    });
  }
  if (staticFallback) {
    fallbacks.push(getV3PoolsWithTvlFromOnChainStaticFallback);
  }
  const getV3PoolsWithFallback = createGetV3CandidatePools(getV3PoolsWithTvlFromOnChainFallback, {
    fallbacks,
    fallbackTimeout
  });
  return getV3PoolsWithFallback(rest);
}

// evm/v3-router/providers/poolProviders/getStableCandidatePools.ts
async function getStableCandidatePools(params) {
  const { onChainProvider, currencyA, currencyB, pairs: providedPairs, blockNumber } = params;
  const pairs = providedPairs || await getPairCombinations(currencyA, currencyB);
  return getStablePoolsOnChain(pairs, onChainProvider, blockNumber);
}

// evm/v3-router/providers/poolProviders/getCandidatePools.ts
async function getCandidatePools({
  protocols = [1 /* V3 */, 0 /* V2 */, 2 /* STABLE */],
  v2SubgraphProvider,
  v3SubgraphProvider,
  ...rest
}) {
  const { currencyA } = rest;
  const chainId = currencyA?.chainId;
  if (!chainId) {
    return [];
  }
  const poolSets = await Promise.all(
    protocols.map((protocol) => {
      if (protocol === 0 /* V2 */) {
        return getV2CandidatePools({ ...rest, v2SubgraphProvider, v3SubgraphProvider });
      }
      if (protocol === 1 /* V3 */) {
        return getV3CandidatePools({ ...rest, subgraphProvider: v3SubgraphProvider });
      }
      return getStableCandidatePools(rest);
    })
  );
  return poolSets.reduce((acc, cur) => {
    acc.push(...cur);
    return acc;
  }, []);
}

// evm/v3-router/providers/poolProviders/hybridPoolProvider.ts
function createHybridPoolProvider({
  onChainProvider,
  v2SubgraphProvider,
  v3SubgraphProvider
}) {
  const hybridPoolProvider = {
    getCandidatePools: async (params) => {
      return getCandidatePools({ ...params, onChainProvider, v2SubgraphProvider, v3SubgraphProvider });
    }
  };
  return createPoolProviderWithCache(hybridPoolProvider);
}

// evm/v3-router/providers/poolProviders/staticPoolProvider.ts
function createStaticPoolProvider(pools) {
  const defaultAllowedProtocols = [0 /* V2 */, 2 /* STABLE */, 1 /* V3 */];
  return {
    getCandidatePools: async ({ protocols = defaultAllowedProtocols, pairs }) => {
      if (!pools) {
        return [];
      }
      if (!pairs) {
        return pools.filter((pool) => protocols.includes(pool.type));
      }
      const relatedPools = [];
      for (const [currencyA, currencyB] of pairs) {
        for (const pool of pools) {
          if (involvesCurrency(pool, currencyA) && involvesCurrency(pool, currencyB) && protocols.includes(pool.type)) {
            relatedPools.push(pool);
          }
        }
      }
      return relatedPools;
    }
  };
}

// evm/v3-router/providers/poolProviders/index.ts
function createPoolProvider(config) {
  const hybridPoolProvider = createHybridPoolProvider(config);
  return hybridPoolProvider;
}
var V4_CL_QUOTER_ADDRESSES = {
  [ChainId.BSC_TESTNET]: "0xD2a534e28efb7e44Da94ae942F892E71F7462142"
};
var V4_BIN_QUOTER_ADDRESSES = {
  [ChainId.BSC_TESTNET]: "0x740469475C0e268F2110444BB8Bc3114E5321B90"
};
var V4_MIXED_ROUTE_QUOTER_ADDRESSES = {
  [ChainId.BSC_TESTNET]: "0x5B5209dBFD9dB69Fcc14f6591fD23089c229E143"
};
var V4_SUPPORTED_CHAINS = [ChainId.BSC_TESTNET];
function createOffChainQuoteProvider() {
  const createGetRoutesWithQuotes = (isExactIn = true) => {
    const getV2Quote = createGetV2Quote(isExactIn);
    const getStableQuote = createGetStableQuote(isExactIn);
    const getV3Quote = createGetV3Quote(isExactIn);
    function* each(pools) {
      let i = isExactIn ? 0 : pools.length - 1;
      const hasNext = () => isExactIn ? i < pools.length : i >= 0;
      while (hasNext()) {
        yield [pools[i], i];
        if (isExactIn) {
          i += 1;
        } else {
          i -= 1;
        }
      }
    }
    const adjustQuoteForGas = (quote, gasCostInToken) => {
      if (isExactIn) {
        return quote.subtract(gasCostInToken);
      }
      return quote.add(gasCostInToken);
    };
    return async function getRoutesWithQuotes(routes, { gasModel }) {
      const routesWithQuote = [];
      for (const route of routes) {
        try {
          const { pools, amount, output, input } = route;
          const quoteCurrency = amount.currency.wrapped.equals(input.wrapped) ? output : input;
          let quote = amount;
          const initializedTickCrossedList = Array(pools.length).fill(0);
          let quoteSuccess = true;
          for (const [pool, i] of each(pools)) {
            if (isV2Pool(pool)) {
              ;
              [quote] = getV2Quote(pool, quote);
              continue;
            }
            if (isStablePool(pool)) {
              ;
              [quote] = getStableQuote(pool, quote);
              continue;
            }
            if (isV3Pool(pool)) {
              const v3QuoteResult = await getV3Quote(pool, quote);
              if (!v3QuoteResult || v3QuoteResult.quote.quotient === ZERO) {
                quoteSuccess = false;
                break;
              }
              const { quote: v3Quote, numOfTicksCrossed } = v3QuoteResult;
              quote = v3Quote;
              initializedTickCrossedList[i] = numOfTicksCrossed;
            }
          }
          if (!quoteSuccess) {
            continue;
          }
          const finalQuote = CurrencyAmount.fromRawAmount(quoteCurrency, quote.quotient);
          const { gasEstimate, gasCostInUSD, gasCostInToken } = gasModel.estimateGasCost(
            {
              ...route,
              quote: finalQuote
            },
            { initializedTickCrossedList }
          );
          routesWithQuote.push({
            ...route,
            quote: finalQuote,
            quoteAdjustedForGas: adjustQuoteForGas(finalQuote, gasCostInToken),
            gasEstimate,
            gasCostInUSD,
            gasCostInToken
          });
        } catch (e) {
        }
      }
      return routesWithQuote;
    };
  };
  return {
    getRouteWithQuotesExactIn: createGetRoutesWithQuotes(true),
    getRouteWithQuotesExactOut: createGetRoutesWithQuotes(false)
  };
}
function createGetV2Quote(isExactIn = true) {
  return function getV2Quote(p, amount) {
    const { reserve0, reserve1 } = p;
    const pair = new Pair(reserve0.wrapped, reserve1.wrapped);
    const [quote, newPair] = isExactIn ? pair.getOutputAmount(amount.wrapped) : pair.getInputAmount(amount.wrapped);
    const newPool = { ...p, reserve0: newPair.reserve0, reserve1: newPair.reserve1 };
    return [quote, newPool];
  };
}
function createGetStableQuote(isExactIn = true) {
  const getQuote = isExactIn ? getQuoteExactIn : getQuoteExactOut;
  return function getStableQuote(pool, amount) {
    const { amplifier, balances, fee } = pool;
    const [quote, { balances: newBalances }] = getQuote({
      amount,
      balances,
      amplifier,
      outputCurrency: getOutputCurrency(pool, amount.currency),
      fee
    });
    return [quote, { ...pool, balances: newBalances }];
  };
}
function createGetV3Quote(isExactIn = true) {
  return async function getV3Quote(pool, amount) {
    const { token0, token1, fee, sqrtRatioX96, liquidity, ticks, tick } = pool;
    if (!ticks?.length) {
      return null;
    }
    try {
      const v3Pool = new Pool(token0.wrapped, token1.wrapped, fee, sqrtRatioX96, liquidity, tick, ticks);
      const [quote, poolAfter] = isExactIn ? await v3Pool.getOutputAmount(amount.wrapped) : await v3Pool.getInputAmountByExactOut(amount.wrapped);
      if (quote.quotient <= 0n) {
        return null;
      }
      const { tickCurrent: tickAfter } = poolAfter;
      const newPool = {
        ...pool,
        tick: tickAfter,
        sqrtRatioX96: poolAfter.sqrtRatioX96,
        liquidity: poolAfter.liquidity
      };
      const numOfTicksCrossed = TickList.countInitializedTicksCrossed(ticks, tick, tickAfter);
      return {
        quote,
        numOfTicksCrossed,
        pool: newPool
      };
    } catch (e) {
      return null;
    }
  };
}
function createPoolQuoteGetter(isExactIn = true) {
  const getV2Quote = createGetV2Quote(isExactIn);
  const getStableQuote = createGetStableQuote(isExactIn);
  const getV3Quote = createGetV3Quote(isExactIn);
  return async function getPoolQuote(pool, amount) {
    if (isV2Pool(pool)) {
      const [quote, newPool] = getV2Quote(pool, amount);
      return { quote, pool, poolAfter: newPool };
    }
    if (isV3Pool(pool)) {
      const quote = await getV3Quote(pool, amount);
      return quote ? { quote: quote.quote, pool, poolAfter: quote.pool } : void 0;
    }
    if (isStablePool(pool)) {
      const [quote, newPool] = getStableQuote(pool, amount);
      return { quote, pool, poolAfter: newPool };
    }
    return void 0;
  };
}

// ../utils/abortControl.ts
function isAbortError(error) {
  return error instanceof Error && error.name === "AbortError";
}

// evm/abis/IBinQuoter.ts
var binQuoterAbi = [
  {
    inputs: [{ internalType: "address", name: "_poolManager", type: "address" }],
    stateMutability: "nonpayable",
    type: "constructor"
  },
  { inputs: [{ internalType: "PoolId", name: "poolId", type: "bytes32" }], name: "NotEnoughLiquidity", type: "error" },
  { inputs: [], name: "NotSelf", type: "error" },
  { inputs: [], name: "NotVault", type: "error" },
  { inputs: [{ internalType: "uint256", name: "amount", type: "uint256" }], name: "QuoteSwap", type: "error" },
  { inputs: [], name: "UnexpectedCallSuccess", type: "error" },
  {
    inputs: [{ internalType: "bytes", name: "revertData", type: "bytes" }],
    name: "UnexpectedRevertBytes",
    type: "error"
  },
  {
    inputs: [
      {
        components: [
          { internalType: "Currency", name: "exactCurrency", type: "address" },
          {
            components: [
              { internalType: "Currency", name: "intermediateCurrency", type: "address" },
              { internalType: "uint24", name: "fee", type: "uint24" },
              { internalType: "contract IHooks", name: "hooks", type: "address" },
              { internalType: "contract IPoolManager", name: "poolManager", type: "address" },
              { internalType: "bytes", name: "hookData", type: "bytes" },
              { internalType: "bytes32", name: "parameters", type: "bytes32" }
            ],
            internalType: "struct PathKey[]",
            name: "path",
            type: "tuple[]"
          },
          { internalType: "uint128", name: "exactAmount", type: "uint128" }
        ],
        internalType: "struct IQuoter.QuoteExactParams",
        name: "params",
        type: "tuple"
      }
    ],
    name: "_quoteExactInput",
    outputs: [{ internalType: "bytes", name: "", type: "bytes" }],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [
      {
        components: [
          {
            components: [
              { internalType: "Currency", name: "currency0", type: "address" },
              { internalType: "Currency", name: "currency1", type: "address" },
              { internalType: "contract IHooks", name: "hooks", type: "address" },
              { internalType: "contract IPoolManager", name: "poolManager", type: "address" },
              { internalType: "uint24", name: "fee", type: "uint24" },
              { internalType: "bytes32", name: "parameters", type: "bytes32" }
            ],
            internalType: "struct PoolKey",
            name: "poolKey",
            type: "tuple"
          },
          { internalType: "bool", name: "zeroForOne", type: "bool" },
          { internalType: "uint128", name: "exactAmount", type: "uint128" },
          { internalType: "bytes", name: "hookData", type: "bytes" }
        ],
        internalType: "struct IQuoter.QuoteExactSingleParams",
        name: "params",
        type: "tuple"
      }
    ],
    name: "_quoteExactInputSingle",
    outputs: [{ internalType: "bytes", name: "", type: "bytes" }],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [
      {
        components: [
          { internalType: "Currency", name: "exactCurrency", type: "address" },
          {
            components: [
              { internalType: "Currency", name: "intermediateCurrency", type: "address" },
              { internalType: "uint24", name: "fee", type: "uint24" },
              { internalType: "contract IHooks", name: "hooks", type: "address" },
              { internalType: "contract IPoolManager", name: "poolManager", type: "address" },
              { internalType: "bytes", name: "hookData", type: "bytes" },
              { internalType: "bytes32", name: "parameters", type: "bytes32" }
            ],
            internalType: "struct PathKey[]",
            name: "path",
            type: "tuple[]"
          },
          { internalType: "uint128", name: "exactAmount", type: "uint128" }
        ],
        internalType: "struct IQuoter.QuoteExactParams",
        name: "params",
        type: "tuple"
      }
    ],
    name: "_quoteExactOutput",
    outputs: [{ internalType: "bytes", name: "", type: "bytes" }],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [
      {
        components: [
          {
            components: [
              { internalType: "Currency", name: "currency0", type: "address" },
              { internalType: "Currency", name: "currency1", type: "address" },
              { internalType: "contract IHooks", name: "hooks", type: "address" },
              { internalType: "contract IPoolManager", name: "poolManager", type: "address" },
              { internalType: "uint24", name: "fee", type: "uint24" },
              { internalType: "bytes32", name: "parameters", type: "bytes32" }
            ],
            internalType: "struct PoolKey",
            name: "poolKey",
            type: "tuple"
          },
          { internalType: "bool", name: "zeroForOne", type: "bool" },
          { internalType: "uint128", name: "exactAmount", type: "uint128" },
          { internalType: "bytes", name: "hookData", type: "bytes" }
        ],
        internalType: "struct IQuoter.QuoteExactSingleParams",
        name: "params",
        type: "tuple"
      }
    ],
    name: "_quoteExactOutputSingle",
    outputs: [{ internalType: "bytes", name: "", type: "bytes" }],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [{ internalType: "bytes", name: "data", type: "bytes" }],
    name: "lockAcquired",
    outputs: [{ internalType: "bytes", name: "", type: "bytes" }],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [],
    name: "poolManager",
    outputs: [{ internalType: "contract IBinPoolManager", name: "", type: "address" }],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [
      {
        components: [
          { internalType: "Currency", name: "exactCurrency", type: "address" },
          {
            components: [
              { internalType: "Currency", name: "intermediateCurrency", type: "address" },
              { internalType: "uint24", name: "fee", type: "uint24" },
              { internalType: "contract IHooks", name: "hooks", type: "address" },
              { internalType: "contract IPoolManager", name: "poolManager", type: "address" },
              { internalType: "bytes", name: "hookData", type: "bytes" },
              { internalType: "bytes32", name: "parameters", type: "bytes32" }
            ],
            internalType: "struct PathKey[]",
            name: "path",
            type: "tuple[]"
          },
          { internalType: "uint128", name: "exactAmount", type: "uint128" }
        ],
        internalType: "struct IQuoter.QuoteExactParams",
        name: "params",
        type: "tuple"
      }
    ],
    name: "quoteExactInput",
    outputs: [
      { internalType: "uint256", name: "amountOut", type: "uint256" },
      { internalType: "uint256", name: "gasEstimate", type: "uint256" }
    ],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [
      {
        components: [
          {
            components: [
              { internalType: "Currency", name: "currency0", type: "address" },
              { internalType: "Currency", name: "currency1", type: "address" },
              { internalType: "contract IHooks", name: "hooks", type: "address" },
              { internalType: "contract IPoolManager", name: "poolManager", type: "address" },
              { internalType: "uint24", name: "fee", type: "uint24" },
              { internalType: "bytes32", name: "parameters", type: "bytes32" }
            ],
            internalType: "struct PoolKey",
            name: "poolKey",
            type: "tuple"
          },
          { internalType: "bool", name: "zeroForOne", type: "bool" },
          { internalType: "uint128", name: "exactAmount", type: "uint128" },
          { internalType: "bytes", name: "hookData", type: "bytes" }
        ],
        internalType: "struct IQuoter.QuoteExactSingleParams",
        name: "params",
        type: "tuple"
      }
    ],
    name: "quoteExactInputSingle",
    outputs: [
      { internalType: "uint256", name: "amountOut", type: "uint256" },
      { internalType: "uint256", name: "gasEstimate", type: "uint256" }
    ],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [
      {
        components: [
          { internalType: "Currency", name: "exactCurrency", type: "address" },
          {
            components: [
              { internalType: "Currency", name: "intermediateCurrency", type: "address" },
              { internalType: "uint24", name: "fee", type: "uint24" },
              { internalType: "contract IHooks", name: "hooks", type: "address" },
              { internalType: "contract IPoolManager", name: "poolManager", type: "address" },
              { internalType: "bytes", name: "hookData", type: "bytes" },
              { internalType: "bytes32", name: "parameters", type: "bytes32" }
            ],
            internalType: "struct PathKey[]",
            name: "path",
            type: "tuple[]"
          },
          { internalType: "uint128", name: "exactAmount", type: "uint128" }
        ],
        internalType: "struct IQuoter.QuoteExactParams",
        name: "params",
        type: "tuple"
      }
    ],
    name: "quoteExactOutput",
    outputs: [
      { internalType: "uint256", name: "amountIn", type: "uint256" },
      { internalType: "uint256", name: "gasEstimate", type: "uint256" }
    ],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [
      {
        components: [
          {
            components: [
              { internalType: "Currency", name: "currency0", type: "address" },
              { internalType: "Currency", name: "currency1", type: "address" },
              { internalType: "contract IHooks", name: "hooks", type: "address" },
              { internalType: "contract IPoolManager", name: "poolManager", type: "address" },
              { internalType: "uint24", name: "fee", type: "uint24" },
              { internalType: "bytes32", name: "parameters", type: "bytes32" }
            ],
            internalType: "struct PoolKey",
            name: "poolKey",
            type: "tuple"
          },
          { internalType: "bool", name: "zeroForOne", type: "bool" },
          { internalType: "uint128", name: "exactAmount", type: "uint128" },
          { internalType: "bytes", name: "hookData", type: "bytes" }
        ],
        internalType: "struct IQuoter.QuoteExactSingleParams",
        name: "params",
        type: "tuple"
      }
    ],
    name: "quoteExactOutputSingle",
    outputs: [
      { internalType: "uint256", name: "amountIn", type: "uint256" },
      { internalType: "uint256", name: "gasEstimate", type: "uint256" }
    ],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [],
    name: "vault",
    outputs: [{ internalType: "contract IVault", name: "", type: "address" }],
    stateMutability: "view",
    type: "function"
  }
];

// evm/abis/ICLQuoter.ts
var clQuoterAbi = [
  {
    inputs: [{ internalType: "address", name: "_poolManager", type: "address" }],
    stateMutability: "nonpayable",
    type: "constructor"
  },
  { inputs: [{ internalType: "PoolId", name: "poolId", type: "bytes32" }], name: "NotEnoughLiquidity", type: "error" },
  { inputs: [], name: "NotSelf", type: "error" },
  { inputs: [], name: "NotVault", type: "error" },
  { inputs: [{ internalType: "uint256", name: "amount", type: "uint256" }], name: "QuoteSwap", type: "error" },
  { inputs: [], name: "UnexpectedCallSuccess", type: "error" },
  {
    inputs: [{ internalType: "bytes", name: "revertData", type: "bytes" }],
    name: "UnexpectedRevertBytes",
    type: "error"
  },
  {
    inputs: [
      {
        components: [
          { internalType: "Currency", name: "exactCurrency", type: "address" },
          {
            components: [
              { internalType: "Currency", name: "intermediateCurrency", type: "address" },
              { internalType: "uint24", name: "fee", type: "uint24" },
              { internalType: "contract IHooks", name: "hooks", type: "address" },
              { internalType: "contract IPoolManager", name: "poolManager", type: "address" },
              { internalType: "bytes", name: "hookData", type: "bytes" },
              { internalType: "bytes32", name: "parameters", type: "bytes32" }
            ],
            internalType: "struct PathKey[]",
            name: "path",
            type: "tuple[]"
          },
          { internalType: "uint128", name: "exactAmount", type: "uint128" }
        ],
        internalType: "struct IQuoter.QuoteExactParams",
        name: "params",
        type: "tuple"
      }
    ],
    name: "_quoteExactInput",
    outputs: [{ internalType: "bytes", name: "", type: "bytes" }],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [
      {
        components: [
          {
            components: [
              { internalType: "Currency", name: "currency0", type: "address" },
              { internalType: "Currency", name: "currency1", type: "address" },
              { internalType: "contract IHooks", name: "hooks", type: "address" },
              { internalType: "contract IPoolManager", name: "poolManager", type: "address" },
              { internalType: "uint24", name: "fee", type: "uint24" },
              { internalType: "bytes32", name: "parameters", type: "bytes32" }
            ],
            internalType: "struct PoolKey",
            name: "poolKey",
            type: "tuple"
          },
          { internalType: "bool", name: "zeroForOne", type: "bool" },
          { internalType: "uint128", name: "exactAmount", type: "uint128" },
          { internalType: "bytes", name: "hookData", type: "bytes" }
        ],
        internalType: "struct IQuoter.QuoteExactSingleParams",
        name: "params",
        type: "tuple"
      }
    ],
    name: "_quoteExactInputSingle",
    outputs: [{ internalType: "bytes", name: "", type: "bytes" }],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [
      {
        components: [
          { internalType: "Currency", name: "exactCurrency", type: "address" },
          {
            components: [
              { internalType: "Currency", name: "intermediateCurrency", type: "address" },
              { internalType: "uint24", name: "fee", type: "uint24" },
              { internalType: "contract IHooks", name: "hooks", type: "address" },
              { internalType: "contract IPoolManager", name: "poolManager", type: "address" },
              { internalType: "bytes", name: "hookData", type: "bytes" },
              { internalType: "bytes32", name: "parameters", type: "bytes32" }
            ],
            internalType: "struct PathKey[]",
            name: "path",
            type: "tuple[]"
          },
          { internalType: "uint128", name: "exactAmount", type: "uint128" }
        ],
        internalType: "struct IQuoter.QuoteExactParams",
        name: "params",
        type: "tuple"
      }
    ],
    name: "_quoteExactOutput",
    outputs: [{ internalType: "bytes", name: "", type: "bytes" }],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [
      {
        components: [
          {
            components: [
              { internalType: "Currency", name: "currency0", type: "address" },
              { internalType: "Currency", name: "currency1", type: "address" },
              { internalType: "contract IHooks", name: "hooks", type: "address" },
              { internalType: "contract IPoolManager", name: "poolManager", type: "address" },
              { internalType: "uint24", name: "fee", type: "uint24" },
              { internalType: "bytes32", name: "parameters", type: "bytes32" }
            ],
            internalType: "struct PoolKey",
            name: "poolKey",
            type: "tuple"
          },
          { internalType: "bool", name: "zeroForOne", type: "bool" },
          { internalType: "uint128", name: "exactAmount", type: "uint128" },
          { internalType: "bytes", name: "hookData", type: "bytes" }
        ],
        internalType: "struct IQuoter.QuoteExactSingleParams",
        name: "params",
        type: "tuple"
      }
    ],
    name: "_quoteExactOutputSingle",
    outputs: [{ internalType: "bytes", name: "", type: "bytes" }],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [{ internalType: "bytes", name: "data", type: "bytes" }],
    name: "lockAcquired",
    outputs: [{ internalType: "bytes", name: "", type: "bytes" }],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [],
    name: "poolManager",
    outputs: [{ internalType: "contract ICLPoolManager", name: "", type: "address" }],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [
      {
        components: [
          { internalType: "Currency", name: "exactCurrency", type: "address" },
          {
            components: [
              { internalType: "Currency", name: "intermediateCurrency", type: "address" },
              { internalType: "uint24", name: "fee", type: "uint24" },
              { internalType: "contract IHooks", name: "hooks", type: "address" },
              { internalType: "contract IPoolManager", name: "poolManager", type: "address" },
              { internalType: "bytes", name: "hookData", type: "bytes" },
              { internalType: "bytes32", name: "parameters", type: "bytes32" }
            ],
            internalType: "struct PathKey[]",
            name: "path",
            type: "tuple[]"
          },
          { internalType: "uint128", name: "exactAmount", type: "uint128" }
        ],
        internalType: "struct IQuoter.QuoteExactParams",
        name: "params",
        type: "tuple"
      }
    ],
    name: "quoteExactInput",
    outputs: [
      { internalType: "uint256", name: "amountOut", type: "uint256" },
      { internalType: "uint256", name: "gasEstimate", type: "uint256" }
    ],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [
      {
        components: [
          {
            components: [
              { internalType: "Currency", name: "currency0", type: "address" },
              { internalType: "Currency", name: "currency1", type: "address" },
              { internalType: "contract IHooks", name: "hooks", type: "address" },
              { internalType: "contract IPoolManager", name: "poolManager", type: "address" },
              { internalType: "uint24", name: "fee", type: "uint24" },
              { internalType: "bytes32", name: "parameters", type: "bytes32" }
            ],
            internalType: "struct PoolKey",
            name: "poolKey",
            type: "tuple"
          },
          { internalType: "bool", name: "zeroForOne", type: "bool" },
          { internalType: "uint128", name: "exactAmount", type: "uint128" },
          { internalType: "bytes", name: "hookData", type: "bytes" }
        ],
        internalType: "struct IQuoter.QuoteExactSingleParams",
        name: "params",
        type: "tuple"
      }
    ],
    name: "quoteExactInputSingle",
    outputs: [
      { internalType: "uint256", name: "amountOut", type: "uint256" },
      { internalType: "uint256", name: "gasEstimate", type: "uint256" }
    ],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [
      {
        components: [
          { internalType: "Currency", name: "exactCurrency", type: "address" },
          {
            components: [
              { internalType: "Currency", name: "intermediateCurrency", type: "address" },
              { internalType: "uint24", name: "fee", type: "uint24" },
              { internalType: "contract IHooks", name: "hooks", type: "address" },
              { internalType: "contract IPoolManager", name: "poolManager", type: "address" },
              { internalType: "bytes", name: "hookData", type: "bytes" },
              { internalType: "bytes32", name: "parameters", type: "bytes32" }
            ],
            internalType: "struct PathKey[]",
            name: "path",
            type: "tuple[]"
          },
          { internalType: "uint128", name: "exactAmount", type: "uint128" }
        ],
        internalType: "struct IQuoter.QuoteExactParams",
        name: "params",
        type: "tuple"
      }
    ],
    name: "quoteExactOutput",
    outputs: [
      { internalType: "uint256", name: "amountIn", type: "uint256" },
      { internalType: "uint256", name: "gasEstimate", type: "uint256" }
    ],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [
      {
        components: [
          {
            components: [
              { internalType: "Currency", name: "currency0", type: "address" },
              { internalType: "Currency", name: "currency1", type: "address" },
              { internalType: "contract IHooks", name: "hooks", type: "address" },
              { internalType: "contract IPoolManager", name: "poolManager", type: "address" },
              { internalType: "uint24", name: "fee", type: "uint24" },
              { internalType: "bytes32", name: "parameters", type: "bytes32" }
            ],
            internalType: "struct PoolKey",
            name: "poolKey",
            type: "tuple"
          },
          { internalType: "bool", name: "zeroForOne", type: "bool" },
          { internalType: "uint128", name: "exactAmount", type: "uint128" },
          { internalType: "bytes", name: "hookData", type: "bytes" }
        ],
        internalType: "struct IQuoter.QuoteExactSingleParams",
        name: "params",
        type: "tuple"
      }
    ],
    name: "quoteExactOutputSingle",
    outputs: [
      { internalType: "uint256", name: "amountIn", type: "uint256" },
      { internalType: "uint256", name: "gasEstimate", type: "uint256" }
    ],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [],
    name: "vault",
    outputs: [{ internalType: "contract IVault", name: "", type: "address" }],
    stateMutability: "view",
    type: "function"
  }
];

// evm/abis/IMixedRouteQuoterV1.ts
var mixedRouteQuoterV1ABI = [
  {
    inputs: [
      {
        internalType: "address",
        name: "_deployer",
        type: "address"
      },
      {
        internalType: "address",
        name: "_factory",
        type: "address"
      },
      {
        internalType: "address",
        name: "_factoryV2",
        type: "address"
      },
      {
        internalType: "address",
        name: "_factoryStable",
        type: "address"
      },
      {
        internalType: "address",
        name: "_WETH9",
        type: "address"
      }
    ],
    stateMutability: "nonpayable",
    type: "constructor"
  },
  {
    inputs: [],
    name: "WETH9",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [],
    name: "deployer",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [],
    name: "factory",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [],
    name: "factoryStable",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [],
    name: "factoryV2",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "int256",
        name: "amount0Delta",
        type: "int256"
      },
      {
        internalType: "int256",
        name: "amount1Delta",
        type: "int256"
      },
      {
        internalType: "bytes",
        name: "path",
        type: "bytes"
      }
    ],
    name: "pancakeV3SwapCallback",
    outputs: [],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "bytes",
        name: "path",
        type: "bytes"
      },
      {
        internalType: "uint256[]",
        name: "flag",
        type: "uint256[]"
      },
      {
        internalType: "uint256",
        name: "amountIn",
        type: "uint256"
      }
    ],
    name: "quoteExactInput",
    outputs: [
      {
        internalType: "uint256",
        name: "amountOut",
        type: "uint256"
      },
      {
        internalType: "uint160[]",
        name: "v3SqrtPriceX96AfterList",
        type: "uint160[]"
      },
      {
        internalType: "uint32[]",
        name: "v3InitializedTicksCrossedList",
        type: "uint32[]"
      },
      {
        internalType: "uint256",
        name: "v3SwapGasEstimate",
        type: "uint256"
      }
    ],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [
      {
        components: [
          {
            internalType: "address",
            name: "tokenIn",
            type: "address"
          },
          {
            internalType: "address",
            name: "tokenOut",
            type: "address"
          },
          {
            internalType: "uint256",
            name: "amountIn",
            type: "uint256"
          },
          {
            internalType: "uint256",
            name: "flag",
            type: "uint256"
          }
        ],
        internalType: "struct IMixedRouteQuoterV1.QuoteExactInputSingleStableParams",
        name: "params",
        type: "tuple"
      }
    ],
    name: "quoteExactInputSingleStable",
    outputs: [
      {
        internalType: "uint256",
        name: "amountOut",
        type: "uint256"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [
      {
        components: [
          {
            internalType: "address",
            name: "tokenIn",
            type: "address"
          },
          {
            internalType: "address",
            name: "tokenOut",
            type: "address"
          },
          {
            internalType: "uint256",
            name: "amountIn",
            type: "uint256"
          }
        ],
        internalType: "struct IMixedRouteQuoterV1.QuoteExactInputSingleV2Params",
        name: "params",
        type: "tuple"
      }
    ],
    name: "quoteExactInputSingleV2",
    outputs: [
      {
        internalType: "uint256",
        name: "amountOut",
        type: "uint256"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [
      {
        components: [
          {
            internalType: "address",
            name: "tokenIn",
            type: "address"
          },
          {
            internalType: "address",
            name: "tokenOut",
            type: "address"
          },
          {
            internalType: "uint256",
            name: "amountIn",
            type: "uint256"
          },
          {
            internalType: "uint24",
            name: "fee",
            type: "uint24"
          },
          {
            internalType: "uint160",
            name: "sqrtPriceLimitX96",
            type: "uint160"
          }
        ],
        internalType: "struct IMixedRouteQuoterV1.QuoteExactInputSingleV3Params",
        name: "params",
        type: "tuple"
      }
    ],
    name: "quoteExactInputSingleV3",
    outputs: [
      {
        internalType: "uint256",
        name: "amountOut",
        type: "uint256"
      },
      {
        internalType: "uint160",
        name: "sqrtPriceX96After",
        type: "uint160"
      },
      {
        internalType: "uint32",
        name: "initializedTicksCrossed",
        type: "uint32"
      },
      {
        internalType: "uint256",
        name: "gasEstimate",
        type: "uint256"
      }
    ],
    stateMutability: "nonpayable",
    type: "function"
  }
];

// evm/abis/IQuoterV2.ts
var quoterV2ABI = [
  {
    inputs: [
      {
        internalType: "bytes",
        name: "path",
        type: "bytes"
      },
      {
        internalType: "uint256",
        name: "amountIn",
        type: "uint256"
      }
    ],
    name: "quoteExactInput",
    outputs: [
      {
        internalType: "uint256",
        name: "amountOut",
        type: "uint256"
      },
      {
        internalType: "uint160[]",
        name: "sqrtPriceX96AfterList",
        type: "uint160[]"
      },
      {
        internalType: "uint32[]",
        name: "initializedTicksCrossedList",
        type: "uint32[]"
      },
      {
        internalType: "uint256",
        name: "gasEstimate",
        type: "uint256"
      }
    ],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [
      {
        components: [
          {
            internalType: "address",
            name: "tokenIn",
            type: "address"
          },
          {
            internalType: "address",
            name: "tokenOut",
            type: "address"
          },
          {
            internalType: "uint256",
            name: "amountIn",
            type: "uint256"
          },
          {
            internalType: "uint24",
            name: "fee",
            type: "uint24"
          },
          {
            internalType: "uint160",
            name: "sqrtPriceLimitX96",
            type: "uint160"
          }
        ],
        internalType: "struct IQuoterV2.QuoteExactInputSingleParams",
        name: "params",
        type: "tuple"
      }
    ],
    name: "quoteExactInputSingle",
    outputs: [
      {
        internalType: "uint256",
        name: "amountOut",
        type: "uint256"
      },
      {
        internalType: "uint160",
        name: "sqrtPriceX96After",
        type: "uint160"
      },
      {
        internalType: "uint32",
        name: "initializedTicksCrossed",
        type: "uint32"
      },
      {
        internalType: "uint256",
        name: "gasEstimate",
        type: "uint256"
      }
    ],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "bytes",
        name: "path",
        type: "bytes"
      },
      {
        internalType: "uint256",
        name: "amountOut",
        type: "uint256"
      }
    ],
    name: "quoteExactOutput",
    outputs: [
      {
        internalType: "uint256",
        name: "amountIn",
        type: "uint256"
      },
      {
        internalType: "uint160[]",
        name: "sqrtPriceX96AfterList",
        type: "uint160[]"
      },
      {
        internalType: "uint32[]",
        name: "initializedTicksCrossedList",
        type: "uint32[]"
      },
      {
        internalType: "uint256",
        name: "gasEstimate",
        type: "uint256"
      }
    ],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [
      {
        components: [
          {
            internalType: "address",
            name: "tokenIn",
            type: "address"
          },
          {
            internalType: "address",
            name: "tokenOut",
            type: "address"
          },
          {
            internalType: "uint256",
            name: "amount",
            type: "uint256"
          },
          {
            internalType: "uint24",
            name: "fee",
            type: "uint24"
          },
          {
            internalType: "uint160",
            name: "sqrtPriceLimitX96",
            type: "uint160"
          }
        ],
        internalType: "struct IQuoterV2.QuoteExactOutputSingleParams",
        name: "params",
        type: "tuple"
      }
    ],
    name: "quoteExactOutputSingle",
    outputs: [
      {
        internalType: "uint256",
        name: "amountIn",
        type: "uint256"
      },
      {
        internalType: "uint160",
        name: "sqrtPriceX96After",
        type: "uint160"
      },
      {
        internalType: "uint32",
        name: "initializedTicksCrossed",
        type: "uint32"
      },
      {
        internalType: "uint256",
        name: "gasEstimate",
        type: "uint256"
      }
    ],
    stateMutability: "nonpayable",
    type: "function"
  }
];

// evm/abis/IV4MixedRouteQuoter.ts
var v4MixedRouteQuoterAbi = [
  {
    inputs: [
      { internalType: "address", name: "_factoryV3", type: "address" },
      { internalType: "address", name: "_factoryV2", type: "address" },
      { internalType: "address", name: "_factoryStable", type: "address" },
      { internalType: "address", name: "_WETH9", type: "address" },
      { internalType: "contract ICLQuoter", name: "_clQuoter", type: "address" },
      { internalType: "contract IBinQuoter", name: "_binQuoter", type: "address" }
    ],
    stateMutability: "nonpayable",
    type: "constructor"
  },
  { inputs: [], name: "INVALID_ADDRESS", type: "error" },
  { inputs: [], name: "InputLengthMismatch", type: "error" },
  { inputs: [], name: "InvalidPath", type: "error" },
  { inputs: [], name: "InvalidPoolKeyCurrency", type: "error" },
  { inputs: [], name: "NoActions", type: "error" },
  {
    inputs: [
      { internalType: "uint8", name: "bits", type: "uint8" },
      { internalType: "uint256", name: "value", type: "uint256" }
    ],
    name: "SafeCastOverflowedUintDowncast",
    type: "error"
  },
  {
    inputs: [{ internalType: "uint256", name: "value", type: "uint256" }],
    name: "SafeCastOverflowedUintToInt",
    type: "error"
  },
  { inputs: [{ internalType: "uint256", name: "action", type: "uint256" }], name: "UnsupportedAction", type: "error" },
  {
    inputs: [],
    name: "WETH9",
    outputs: [{ internalType: "address", name: "", type: "address" }],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [],
    name: "binQuoter",
    outputs: [{ internalType: "contract IBinQuoter", name: "", type: "address" }],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [],
    name: "clQuoter",
    outputs: [{ internalType: "contract ICLQuoter", name: "", type: "address" }],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [],
    name: "factoryStable",
    outputs: [{ internalType: "address", name: "", type: "address" }],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [],
    name: "factoryV2",
    outputs: [{ internalType: "address", name: "", type: "address" }],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [],
    name: "factoryV3",
    outputs: [{ internalType: "address", name: "", type: "address" }],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [
      { internalType: "int256", name: "amount0Delta", type: "int256" },
      { internalType: "int256", name: "amount1Delta", type: "int256" },
      { internalType: "bytes", name: "data", type: "bytes" }
    ],
    name: "pancakeV3SwapCallback",
    outputs: [],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [
      {
        components: [
          { internalType: "address", name: "tokenIn", type: "address" },
          { internalType: "address", name: "tokenOut", type: "address" },
          { internalType: "uint256", name: "amountIn", type: "uint256" },
          { internalType: "uint256", name: "flag", type: "uint256" }
        ],
        internalType: "struct IMixedQuoter.QuoteExactInputSingleStableParams",
        name: "params",
        type: "tuple"
      }
    ],
    name: "quoteExactInputSingleStable",
    outputs: [
      { internalType: "uint256", name: "amountOut", type: "uint256" },
      { internalType: "uint256", name: "gasEstimate", type: "uint256" }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [
      {
        components: [
          { internalType: "address", name: "tokenIn", type: "address" },
          { internalType: "address", name: "tokenOut", type: "address" },
          { internalType: "uint256", name: "amountIn", type: "uint256" }
        ],
        internalType: "struct IMixedQuoter.QuoteExactInputSingleV2Params",
        name: "params",
        type: "tuple"
      }
    ],
    name: "quoteExactInputSingleV2",
    outputs: [
      { internalType: "uint256", name: "amountOut", type: "uint256" },
      { internalType: "uint256", name: "gasEstimate", type: "uint256" }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [
      {
        components: [
          { internalType: "address", name: "tokenIn", type: "address" },
          { internalType: "address", name: "tokenOut", type: "address" },
          { internalType: "uint256", name: "amountIn", type: "uint256" },
          { internalType: "uint24", name: "fee", type: "uint24" },
          { internalType: "uint160", name: "sqrtPriceLimitX96", type: "uint160" }
        ],
        internalType: "struct IMixedQuoter.QuoteExactInputSingleV3Params",
        name: "params",
        type: "tuple"
      }
    ],
    name: "quoteExactInputSingleV3",
    outputs: [
      { internalType: "uint256", name: "amountOut", type: "uint256" },
      { internalType: "uint160", name: "sqrtPriceX96After", type: "uint160" },
      { internalType: "uint32", name: "initializedTicksCrossed", type: "uint32" },
      { internalType: "uint256", name: "gasEstimate", type: "uint256" }
    ],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [
      { internalType: "address[]", name: "paths", type: "address[]" },
      { internalType: "bytes", name: "actions", type: "bytes" },
      { internalType: "bytes[]", name: "params", type: "bytes[]" },
      { internalType: "uint256", name: "amountIn", type: "uint256" }
    ],
    name: "quoteMixedExactInput",
    outputs: [
      { internalType: "uint256", name: "amountOut", type: "uint256" },
      { internalType: "uint256", name: "gasEstimate", type: "uint256" }
    ],
    stateMutability: "nonpayable",
    type: "function"
  }
];
function encodeV4MixedRouteActions(route) {
  return bytesToHex(
    new Uint8Array(
      route.pools.map((p) => {
        if (isV2Pool(p)) {
          return 2 /* V2_EXACT_INPUT_SINGLE */;
        }
        if (isV3Pool(p)) {
          return 3 /* V3_EXACT_INPUT_SINGLE */;
        }
        if (isStablePool(p)) {
          return 0 /* SS_2_EXACT_INPUT_SINGLE */;
        }
        if (isV4ClPool(p)) {
          return 4 /* V4_CL_EXACT_INPUT_SINGLE */;
        }
        if (isV4BinPool(p)) {
          return 5 /* V4_BIN_EXACT_INPUT_SINGLE */;
        }
        throw new Error(`Unrecognized pool type ${p}`);
      })
    )
  );
}
var v4RouteParamsAbi = [
  {
    components: [
      {
        components: [
          { name: "currency0", type: "address" },
          { name: "currency1", type: "address" },
          { name: "hooks", type: "address" },
          { name: "poolManager", type: "address" },
          { name: "fee", type: "uint24" },
          { name: "parameters", type: "bytes32" }
        ],
        name: "poolKey",
        type: "tuple"
      },
      { name: "hookData", type: "bytes" }
    ],
    name: "params",
    type: "tuple"
  }
];
function encodeV4MixedRouteParams(route) {
  return route.pools.map((p) => {
    if (isV2Pool(p) || isStablePool(p)) {
      return "0x";
    }
    if (isV3Pool(p)) {
      return encodeAbiParameters(parseAbiParameters("uint24"), [p.fee]);
    }
    if (isV4ClPool(p)) {
      const poolKey = {
        currency0: getCurrencyAddress(p.currency0),
        currency1: getCurrencyAddress(p.currency1),
        fee: p.fee,
        hooks: p.hooks,
        poolManager: p.poolManager,
        parameters: {
          tickSpacing: p.tickSpacing
        }
      };
      return encodeAbiParameters(v4RouteParamsAbi, [
        {
          poolKey: encodePoolKey(poolKey),
          hookData: "0x"
        }
      ]);
    }
    if (isV4BinPool(p)) {
      const poolKey = {
        currency0: getCurrencyAddress(p.currency0),
        currency1: getCurrencyAddress(p.currency1),
        fee: p.fee,
        hooks: p.hooks,
        poolManager: p.poolManager,
        parameters: {
          binStep: Number(p.binStep)
        }
      };
      return encodeAbiParameters(v4RouteParamsAbi, [
        {
          poolKey: encodePoolKey(poolKey),
          hookData: "0x"
        }
      ]);
    }
    throw new Error(`Invalid pool type ${p}`);
  });
}
function encodeV4RouteToPath(route, exactOutput) {
  if (route.pools.some((p) => !isV4ClPool(p) && !isV4BinPool(p))) {
    throw new Error("Failed to encode path keys. Invalid v4 pool found in route.");
  }
  const currencyStart = exactOutput ? route.output : route.input;
  const pools = exactOutput ? [...route.pools].reverse() : route.pools;
  const { path } = pools.reduce(
    ({ baseCurrency, path: path2 }, pool) => {
      const isV4Cl = isV4ClPool(pool);
      const isV4Bin = isV4BinPool(pool);
      if (!isV4Cl && !isV4Bin)
        throw new Error(`Invalid v4 pool ${pool}`);
      const quoteCurrency = getOutputCurrency(pool, baseCurrency);
      const parameters = encodePoolParameters(
        isV4Cl ? {
          tickSpacing: pool.tickSpacing
        } : {
          binStep: pool.binStep
        }
      );
      return {
        baseCurrency: quoteCurrency,
        path: [
          ...path2,
          {
            intermediateCurrency: getCurrencyAddress(quoteCurrency),
            fee: pool.fee,
            hooks: pool.hooks ?? zeroAddress,
            poolManager: pool.poolManager,
            hookData: "0x",
            parameters
          }
        ]
      };
    },
    { baseCurrency: currencyStart, path: [] }
  );
  return exactOutput ? path.reverse() : path;
}

// evm/abis/InterfaceMulticall.ts
var InterfaceMulticall_default = [
  {
    inputs: [],
    name: "getCurrentBlockTimestamp",
    outputs: [
      {
        internalType: "uint256",
        name: "timestamp",
        type: "uint256"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "addr",
        type: "address"
      }
    ],
    name: "getEthBalance",
    outputs: [
      {
        internalType: "uint256",
        name: "balance",
        type: "uint256"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [
      {
        components: [
          {
            internalType: "address",
            name: "target",
            type: "address"
          },
          {
            internalType: "uint256",
            name: "gasLimit",
            type: "uint256"
          },
          {
            internalType: "bytes",
            name: "callData",
            type: "bytes"
          }
        ],
        internalType: "struct PancakeInterfaceMulticall.Call[]",
        name: "calls",
        type: "tuple[]"
      }
    ],
    name: "multicall",
    outputs: [
      {
        internalType: "uint256",
        name: "blockNumber",
        type: "uint256"
      },
      {
        components: [
          {
            internalType: "bool",
            name: "success",
            type: "bool"
          },
          {
            internalType: "uint256",
            name: "gasUsed",
            type: "uint256"
          },
          {
            internalType: "bytes",
            name: "returnData",
            type: "bytes"
          }
        ],
        internalType: "struct PancakeInterfaceMulticall.Result[]",
        name: "returnData",
        type: "tuple[]"
      }
    ],
    stateMutability: "nonpayable",
    type: "function"
  }
];

// evm/v3-router/providers/multicallProvider.ts
var IMulticallProvider = class {
};

// evm/v3-router/providers/multicallSwapProvider.ts
var PancakeMulticallProvider = class extends IMulticallProvider {
  constructor(chainId, provider, gasLimitPerCall = 1e6) {
    super();
    this.chainId = chainId;
    this.provider = provider;
    this.gasLimitPerCall = gasLimitPerCall;
    this.provider = provider;
  }
  async callSameFunctionOnMultipleContracts(params) {
    const { addresses, functionName, functionParams, abi, additionalConfig } = params;
    const gasLimitPerCall = additionalConfig?.gasLimitPerCall ?? this.gasLimitPerCall;
    const callData = encodeFunctionData({
      abi,
      functionName,
      args: functionParams
    });
    const calls = addresses.map((address) => {
      return {
        target: address,
        callData,
        gasLimit: BigInt(gasLimitPerCall)
      };
    });
    const { results: result, blockNumber } = await multicallByGasLimit(calls, {
      gasLimit: additionalConfig?.gasLimit,
      gasBuffer: additionalConfig?.gasBuffer,
      dropUnexecutedCalls: additionalConfig?.dropUnexecutedCalls,
      chainId: this.chainId,
      client: this.provider,
      signal: additionalConfig?.signal
    });
    const results = [];
    const gasUsedForSuccess = [];
    const gasUsedForFail = [];
    for (const { result: callResult, success, gasUsed } of result) {
      if (callResult === "0x" || !success) {
        results.push({
          success: false,
          returnData: callResult
        });
        gasUsedForFail.push(Number(gasUsed));
        continue;
      }
      try {
        results.push({
          success: true,
          result: decodeFunctionResult({
            abi,
            functionName,
            data: callResult
          })
        });
        gasUsedForSuccess.push(Number(gasUsed));
      } catch (e) {
        results.push({
          success: false,
          returnData: callResult
        });
      }
    }
    return {
      blockNumber,
      results,
      approxGasUsedPerSuccessCall: stats.percentile(gasUsedForSuccess, 99),
      approxGasUsedPerFailCall: stats.percentile(gasUsedForFail, 99)
    };
  }
  async callSameFunctionOnContractWithMultipleParams(params) {
    const { address, functionName, functionParams, abi, additionalConfig } = params;
    const gasLimitPerCall = additionalConfig?.gasLimitPerCall ?? this.gasLimitPerCall;
    const calls = functionParams.map((functionParam) => {
      const callData = encodeFunctionData({
        abi,
        functionName,
        args: functionParam
      });
      return {
        target: address,
        callData,
        gasLimit: BigInt(gasLimitPerCall)
      };
    });
    const { results: result, blockNumber } = await multicallByGasLimit(calls, {
      gasLimit: additionalConfig?.gasLimit,
      gasBuffer: additionalConfig?.gasBuffer,
      dropUnexecutedCalls: additionalConfig?.dropUnexecutedCalls,
      chainId: this.chainId,
      client: this.provider,
      signal: additionalConfig?.signal
    });
    const results = [];
    const gasUsedForSuccess = [];
    const gasUsedForFail = [];
    for (const { result: callResult, success, gasUsed } of result) {
      if (callResult === "0x" || !success) {
        results.push({
          success: false,
          returnData: callResult
        });
        gasUsedForFail.push(Number(gasUsed));
        continue;
      }
      try {
        results.push({
          success: true,
          result: decodeFunctionResult({
            abi,
            functionName,
            data: callResult
          })
        });
        gasUsedForSuccess.push(Number(gasUsed));
      } catch (e) {
        results.push({
          success: false,
          returnData: callResult
        });
      }
    }
    return {
      blockNumber,
      results,
      approxGasUsedPerSuccessCall: stats.percentile(gasUsedForSuccess, 99),
      approxGasUsedPerFailCall: stats.percentile(gasUsedForFail, 99)
    };
  }
  async callMultipleFunctionsOnSameContract(params) {
    const { address, functionNames, functionParams, additionalConfig, abi } = params;
    const gasLimitPerCall = additionalConfig?.gasLimitPerCall ?? this.gasLimitPerCall;
    const calls = functionNames.map((functionName, i) => {
      const callData = encodeFunctionData({
        abi,
        functionName,
        args: functionParams ? functionParams[i] : []
      });
      return {
        target: address,
        callData,
        gasLimit: BigInt(gasLimitPerCall)
      };
    });
    const { results: result, blockNumber } = await multicallByGasLimit(calls, {
      gasLimit: additionalConfig?.gasLimit,
      gasBuffer: additionalConfig?.gasBuffer,
      dropUnexecutedCalls: additionalConfig?.dropUnexecutedCalls,
      chainId: this.chainId,
      client: this.provider,
      signal: additionalConfig?.signal
    });
    const results = [];
    const gasUsedForSuccess = [];
    const gasUsedForFail = [];
    for (const [i, { result: callResult, success, gasUsed }] of result.entries()) {
      if (callResult === "0x" || !success) {
        results.push({
          success: false,
          returnData: callResult
        });
        gasUsedForFail.push(Number(gasUsed));
        continue;
      }
      try {
        results.push({
          success: true,
          result: decodeFunctionResult({
            abi,
            functionName: functionNames[i],
            data: callResult
          })
        });
        gasUsedForSuccess.push(Number(gasUsed));
      } catch (e) {
        results.push({
          success: false,
          returnData: callResult
        });
      }
    }
    return {
      blockNumber,
      results,
      approxGasUsedPerSuccessCall: stats.percentile(gasUsedForSuccess, 99),
      approxGasUsedPerFailCall: stats.percentile(gasUsedForFail, 99)
    };
  }
};
PancakeMulticallProvider.abi = InterfaceMulticall_default;

// evm/v3-router/providers/onChainQuoteProvider.ts
var DEFAULT_BATCH_RETRIES = 2;
var SUCCESS_RATE_CONFIG = {
  [ChainId.BSC_TESTNET]: 0.1,
  [ChainId.BSC]: 0.1,
  [ChainId.ETHEREUM]: 0.1,
  [ChainId.GOERLI]: 0.1,
  [ChainId.ARBITRUM_ONE]: 0.1,
  [ChainId.ARBITRUM_GOERLI]: 0.1,
  [ChainId.POLYGON_ZKEVM]: 0.01,
  [ChainId.POLYGON_ZKEVM_TESTNET]: 0,
  [ChainId.ZKSYNC]: 0.2,
  [ChainId.ZKSYNC_TESTNET]: 0.1,
  [ChainId.LINEA]: 0.1,
  [ChainId.LINEA_TESTNET]: 0.1,
  [ChainId.OPBNB]: 0.1,
  [ChainId.OPBNB_TESTNET]: 0.1,
  [ChainId.BASE]: 0.1,
  [ChainId.BASE_TESTNET]: 0.1,
  [ChainId.SCROLL_SEPOLIA]: 0.1,
  [ChainId.SEPOLIA]: 0.1,
  [ChainId.ARBITRUM_SEPOLIA]: 0.1,
  [ChainId.BASE_SEPOLIA]: 0.1,
  [ChainId.MONAD_TESTNET]: 0.1
};
var BlockConflictError = class extends Error {
  constructor() {
    super(...arguments);
    this.name = "BlockConflictError";
  }
};
var SuccessRateError = class extends Error {
  constructor() {
    super(...arguments);
    this.name = "SuccessRateError";
  }
};
var ProviderBlockHeaderError = class extends Error {
  constructor() {
    super(...arguments);
    this.name = "ProviderBlockHeaderError";
  }
};
var ProviderTimeoutError = class extends Error {
  constructor() {
    super(...arguments);
    this.name = "ProviderTimeoutError";
  }
};
var ProviderGasError = class extends Error {
  constructor() {
    super(...arguments);
    this.name = "ProviderGasError";
  }
};
var retryControllerFactory = ({ retries }) => {
  const errors = [];
  let remainingRetries = retries || 0;
  return {
    shouldRetry: (error) => !isAbortError(error) && remainingRetries > 0 && errors.every((err) => err.name !== error.name),
    onRetry: (error) => {
      errors.push(error);
      remainingRetries -= 1;
    },
    getErrorsOnPreviousRetries: () => errors
  };
};
var defaultAdjustQuoteForGas = ({ isExactIn, quote, gasCostInToken }) => isExactIn ? quote.subtract(gasCostInToken) : quote.add(gasCostInToken);
function onChainQuoteProviderFactory({ getQuoteFunctionName, getQuoterAddress, abi, getCallInputs }) {
  return function createOnChainQuoteProvider({
    onChainProvider,
    gasLimit,
    multicallConfigs: multicallConfigsOverride,
    onAdjustQuoteForGas = defaultAdjustQuoteForGas
  }) {
    const createGetRoutesWithQuotes = (isExactIn = true) => {
      const functionName = getQuoteFunctionName(isExactIn);
      const adjustQuoteForGas = ({ quote, gasCostInToken }) => onAdjustQuoteForGas({ quote, gasCostInToken, isExactIn });
      return async function getRoutesWithQuote(routes, { blockNumber: blockNumberFromConfig, gasModel, retry: retryOptions, signal }) {
        if (!routes.length) {
          return [];
        }
        const {
          amount: {
            currency: { chainId }
          }
        } = routes[0];
        const quoterAddress = getQuoterAddress(chainId);
        const minSuccessRate = SUCCESS_RATE_CONFIG[chainId];
        const multicallConfigs = multicallConfigsOverride?.[chainId] || BATCH_MULTICALL_CONFIGS[chainId] || BATCH_MULTICALL_CONFIGS[ChainId.ETHEREUM];
        const {
          defaultConfig: { gasLimitPerCall: defaultGasLimitPerCall, dropUnexecutedCalls }
        } = multicallConfigs;
        const chainProvider = onChainProvider({ chainId });
        const providerConfig = { blockNumber: blockNumberFromConfig };
        const multicall2Provider = new PancakeMulticallProvider(chainId, chainProvider, defaultGasLimitPerCall);
        const inputs = routes.map((route) => getCallInputs(route, isExactIn));
        const retryOptionsWithDefault = {
          retries: DEFAULT_BATCH_RETRIES,
          minTimeout: 25,
          maxTimeout: 250,
          ...retryOptions
        };
        const { shouldRetry, onRetry } = retryControllerFactory(retryOptionsWithDefault);
        async function getQuotes({ gasLimitPerCall }) {
          try {
            const { results, blockNumber, approxGasUsedPerSuccessCall } = await multicall2Provider.callSameFunctionOnContractWithMultipleParams({
              address: quoterAddress,
              abi,
              functionName,
              functionParams: inputs,
              providerConfig,
              additionalConfig: {
                dropUnexecutedCalls,
                gasLimitPerCall,
                gasLimit,
                signal
              }
            });
            const successRateError = validateSuccessRate(results, minSuccessRate);
            if (successRateError) {
              throw successRateError;
            }
            return {
              results,
              blockNumber,
              approxGasUsedPerSuccessCall
            };
          } catch (err) {
            if (err instanceof SuccessRateError || err instanceof BlockConflictError || isAbortError(err)) {
              throw err;
            }
            const slicedErrMsg = err.message.slice(0, 500);
            if (err.message.includes("header not found")) {
              throw new ProviderBlockHeaderError(slicedErrMsg);
            }
            if (err.message.includes("timeout")) {
              throw new ProviderTimeoutError(`Request had ${inputs.length} inputs. ${slicedErrMsg}`);
            }
            if (err.message.includes("out of gas")) {
              throw new ProviderGasError(slicedErrMsg);
            }
            throw new Error(`Unknown error from provider: ${slicedErrMsg}`);
          }
        }
        const quoteResult = await retry(async (bail) => {
          try {
            const quotes = await getQuotes({
              gasLimitPerCall: defaultGasLimitPerCall
            });
            return quotes;
          } catch (e) {
            const error = e instanceof Error ? e : new Error(`Unexpected error type ${e}`);
            if (!shouldRetry(error)) {
              return bail(error);
            }
            if (error instanceof SuccessRateError) {
              onRetry(error);
              const { successRateFailureOverrides } = multicallConfigs;
              return getQuotes({
                gasLimitPerCall: successRateFailureOverrides.gasLimitPerCall
              });
            }
            if (error instanceof ProviderGasError) {
              onRetry(error);
              const { gasErrorFailureOverride } = multicallConfigs;
              return getQuotes({
                gasLimitPerCall: gasErrorFailureOverride.gasLimitPerCall
              });
            }
            throw error;
          }
        }, retryOptionsWithDefault);
        if (!quoteResult) {
          throw new Error(`Unexpected empty quote result ${quoteResult}`);
        }
        const { results: quoteResults } = quoteResult;
        const routesWithQuote = processQuoteResults(quoteResults, routes, gasModel, adjustQuoteForGas);
        return routesWithQuote;
      };
    };
    return {
      getRouteWithQuotesExactIn: createGetRoutesWithQuotes(true),
      getRouteWithQuotesExactOut: createGetRoutesWithQuotes(false)
    };
  };
}
function validateSuccessRate(allResults, quoteMinSuccessRate) {
  const numResults = allResults.length;
  const numSuccessResults = allResults.filter((result) => result.success).length;
  const successRate = 1 * numSuccessResults / numResults;
  if (successRate < quoteMinSuccessRate) {
    return new SuccessRateError(`Quote success rate below threshold of ${quoteMinSuccessRate}: ${successRate}`);
  }
  return void 0;
}
function processQuoteResults(quoteResults, routes, gasModel, adjustQuoteForGas) {
  const routesWithQuote = [];
  for (let i = 0; i < quoteResults.length; i += 1) {
    const route = routes[i];
    const quoteResult = quoteResults[i];
    if (!quoteResult) {
      continue;
    }
    const { success } = quoteResult;
    if (!success) {
      continue;
    }
    const [quoteRaw] = quoteResult.result;
    const initializedTickCrossedList = quoteResult.result.length === 4 ? quoteResult.result[2] : [];
    const quoteCurrency = getQuoteCurrency(route, route.amount.currency);
    const quote = CurrencyAmount$1.fromRawAmount(quoteCurrency, quoteRaw.toString());
    const { gasEstimate, gasCostInToken, gasCostInUSD } = gasModel.estimateGasCost(
      {
        ...route,
        quote
      },
      { initializedTickCrossedList }
    );
    routesWithQuote.push({
      ...route,
      quote,
      quoteAdjustedForGas: adjustQuoteForGas({ quote, gasCostInToken }),
      // sqrtPriceX96AfterList: quoteResult.result[1],
      gasEstimate,
      gasCostInToken,
      gasCostInUSD
    });
  }
  return routesWithQuote;
}
var createMixedRouteOnChainQuoteProvider = onChainQuoteProviderFactory({
  getQuoterAddress: (chainId) => MIXED_ROUTE_QUOTER_ADDRESSES[chainId],
  getQuoteFunctionName: () => "quoteExactInput",
  abi: mixedRouteQuoterV1ABI,
  getCallInputs: (route, isExactIn) => [
    encodeMixedRouteToPath(route, !isExactIn),
    route.pools.map((pool) => {
      if (isV3Pool(pool)) {
        return 0;
      }
      if (isV2Pool(pool)) {
        return 1;
      }
      if (isStablePool(pool)) {
        if (pool.balances.length === 2) {
          return 2;
        }
        if (pool.balances.length === 3) {
          return 3;
        }
      }
      return -1;
    }).filter((index) => index >= 0),
    `0x${route.amount.quotient.toString(16)}`
  ]
});
var createV3OnChainQuoteProvider = onChainQuoteProviderFactory({
  getQuoterAddress: (chainId) => V3_QUOTER_ADDRESSES[chainId],
  getQuoteFunctionName: (isExactIn) => isExactIn ? "quoteExactInput" : "quoteExactOutput",
  abi: quoterV2ABI,
  getCallInputs: (route, isExactIn) => [
    encodeMixedRouteToPath(route, !isExactIn),
    `0x${route.amount.quotient.toString(16)}`
  ]
});
var createV4ClOnChainQuoteProvider = onChainQuoteProviderFactory({
  getQuoterAddress: (chainId) => V4_CL_QUOTER_ADDRESSES[chainId],
  getQuoteFunctionName: (isExactIn) => isExactIn ? "quoteExactInput" : "quoteExactOutput",
  abi: clQuoterAbi,
  getCallInputs: (route, isExactIn) => [
    {
      exactCurrency: getCurrencyAddress(isExactIn ? route.input : route.output),
      path: encodeV4RouteToPath(route, !isExactIn),
      exactAmount: `0x${route.amount.quotient.toString(16)}`
    }
  ]
});
var createMixedRouteOnChainQuoteProviderV2 = onChainQuoteProviderFactory({
  getQuoterAddress: (chainId) => V4_MIXED_ROUTE_QUOTER_ADDRESSES[chainId],
  getQuoteFunctionName: () => "quoteMixedExactInput",
  abi: v4MixedRouteQuoterAbi,
  getCallInputs: (route) => [
    route.path.map((p) => getCurrencyAddress(p)),
    encodeV4MixedRouteActions(route),
    encodeV4MixedRouteParams(route),
    `0x${route.amount.quotient.toString(16)}`
  ]
});
var createV4BinOnChainQuoteProvider = onChainQuoteProviderFactory({
  getQuoterAddress: (chainId) => V4_BIN_QUOTER_ADDRESSES[chainId],
  getQuoteFunctionName: (isExactIn) => isExactIn ? "quoteExactInput" : "quoteExactOutput",
  abi: binQuoterAbi,
  getCallInputs: (route, isExactIn) => [
    {
      exactCurrency: getCurrencyAddress(isExactIn ? route.input : route.output),
      path: encodeV4RouteToPath(route, !isExactIn),
      exactAmount: `0x${route.amount.quotient.toString(16)}`
    }
  ]
});

// evm/v3-router/providers/quoteProviders.ts
function createQuoteProvider(config) {
  const { onChainProvider, multicallConfigs, gasLimit } = config;
  const offChainQuoteProvider = createOffChainQuoteProvider();
  const mixedRouteOnChainQuoteProviderV1 = createMixedRouteOnChainQuoteProvider({
    onChainProvider,
    multicallConfigs,
    gasLimit
  });
  const mixedRouteOnChainQuoteProviderV2 = createMixedRouteOnChainQuoteProviderV2({
    onChainProvider,
    multicallConfigs,
    gasLimit
  });
  const v3OnChainQuoteProvider = createV3OnChainQuoteProvider({ onChainProvider, multicallConfigs, gasLimit });
  const v4ClOnChainQuoteProvider = createV4ClOnChainQuoteProvider({ onChainProvider, multicallConfigs, gasLimit });
  const v4BinOnChainQuoteProvider = createV4BinOnChainQuoteProvider({ onChainProvider, multicallConfigs, gasLimit });
  const createGetRouteWithQuotes = (isExactIn = true) => {
    const getOffChainQuotes = isExactIn ? offChainQuoteProvider.getRouteWithQuotesExactIn : offChainQuoteProvider.getRouteWithQuotesExactOut;
    const getV3Quotes = isExactIn ? v3OnChainQuoteProvider.getRouteWithQuotesExactIn : v3OnChainQuoteProvider.getRouteWithQuotesExactOut;
    const getV4ClQuotes = isExactIn ? v4ClOnChainQuoteProvider.getRouteWithQuotesExactIn : v4ClOnChainQuoteProvider.getRouteWithQuotesExactOut;
    const getV4BinQuotes = isExactIn ? v4BinOnChainQuoteProvider.getRouteWithQuotesExactIn : v4BinOnChainQuoteProvider.getRouteWithQuotesExactOut;
    const createMixedRouteQuoteFetcher = (chainId) => {
      const mixedRouteOnChainQuoteProvider = V4_SUPPORTED_CHAINS.includes(chainId) ? mixedRouteOnChainQuoteProviderV2 : mixedRouteOnChainQuoteProviderV1;
      return isExactIn ? mixedRouteOnChainQuoteProvider.getRouteWithQuotesExactIn : mixedRouteOnChainQuoteProvider.getRouteWithQuotesExactOut;
    };
    return async function getRoutesWithQuotes(routes, { blockNumber, gasModel, signal }) {
      const { chainId } = routes[0]?.input || {};
      const getMixedRouteQuotes = createMixedRouteQuoteFetcher(chainId);
      const v4ClRoutes = [];
      const v4BinRoutes = [];
      const v3SingleHopRoutes = [];
      const v3MultihopRoutes = [];
      const mixedRoutesHaveV3Pool = [];
      const routesCanQuoteOffChain = [];
      for (const route of routes) {
        if (route.type === 0 /* V2 */ || route.type === 2 /* STABLE */) {
          routesCanQuoteOffChain.push(route);
          continue;
        }
        if (route.type === 1 /* V3 */) {
          if (route.pools.length === 1) {
            v3SingleHopRoutes.push(route);
            continue;
          }
          v3MultihopRoutes.push(route);
          continue;
        }
        if (route.type === 5 /* V4CL */) {
          v4ClRoutes.push(route);
          continue;
        }
        if (route.type === 6 /* V4BIN */) {
          v4BinRoutes.push(route);
          continue;
        }
        const { pools } = route;
        if (pools.some((pool) => isV3Pool(pool))) {
          mixedRoutesHaveV3Pool.push(route);
          continue;
        }
        routesCanQuoteOffChain.push(route);
      }
      const results = await Promise.allSettled([
        getOffChainQuotes(routesCanQuoteOffChain, { blockNumber, gasModel, signal }),
        getMixedRouteQuotes(mixedRoutesHaveV3Pool, { blockNumber, gasModel, retry: { retries: 0 }, signal }),
        getV3Quotes(v3SingleHopRoutes, { blockNumber, gasModel, signal }),
        getV3Quotes(v3MultihopRoutes, { blockNumber, gasModel, retry: { retries: 1 }, signal }),
        getV4ClQuotes(v4ClRoutes, { blockNumber, gasModel, signal }),
        getV4BinQuotes(v4BinRoutes, { blockNumber, gasModel, signal })
      ]);
      if (results.every((result) => result.status === "rejected")) {
        throw new Error(results.map((result) => result.reason).join(","));
      }
      return results.filter((result) => result.status === "fulfilled").reduce((acc, cur) => [...acc, ...cur.value], []);
    };
  };
  return {
    getRouteWithQuotesExactIn: createGetRouteWithQuotes(true),
    getRouteWithQuotesExactOut: createGetRouteWithQuotes(false),
    getConfig: () => config
  };
}

// evm/v3-router/schema.ts
var schema_exports = {};
__export(schema_exports, {
  zPools: () => zPools,
  zRouterGetParams: () => zRouterGetParams,
  zRouterPostParams: () => zRouterPostParams
});
var zChainId = z.nativeEnum(ChainId);
var zFee = z.nativeEnum(FeeAmount);
var zTradeType = z.nativeEnum(TradeType);
var zPoolType = z.nativeEnum(PoolType);
var zPoolTypes = z.array(zPoolType);
var zAddress = z.custom((val) => /^0x[a-fA-F0-9]{40}$/.test(val));
var zHex = z.custom((val) => /^0x[a-fA-F0-9]*$/.test(val));
var zBigNumber = z.string().regex(/^[0-9]+$/);
var zCurrency = z.object({
  address: zAddress,
  decimals: z.number(),
  symbol: z.string()
}).required();
var zCurrencyAmount = z.object({
  currency: zCurrency.required(),
  value: zBigNumber
}).required();
var zV2Pool = z.object({
  type: z.literal(0 /* V2 */),
  reserve0: zCurrencyAmount,
  reserve1: zCurrencyAmount
}).required();
var zV3Pool = z.object({
  type: z.literal(1 /* V3 */),
  token0: zCurrency,
  token1: zCurrency,
  fee: zFee,
  liquidity: zBigNumber,
  sqrtRatioX96: zBigNumber,
  tick: z.number(),
  address: zAddress,
  token0ProtocolFee: z.string(),
  token1ProtocolFee: z.string()
}).required();
var zStablePool = z.object({
  type: z.literal(2 /* STABLE */),
  balances: z.array(zCurrencyAmount),
  amplifier: zBigNumber,
  fee: z.string(),
  address: zAddress
}).required();
var zV4ClPool = z.object({
  type: z.literal(3 /* V4CL */),
  currency0: zCurrency,
  currency1: zCurrency,
  fee: zFee,
  liquidity: zBigNumber,
  sqrtRatioX96: zBigNumber,
  tick: z.number(),
  tickSpacing: z.number(),
  poolManager: zAddress,
  id: zHex
}).required().extend({
  hooks: zAddress.optional()
});
var zV4BinPool = z.object({
  type: z.literal(4 /* V4BIN */),
  currency0: zCurrency,
  currency1: zCurrency,
  fee: zFee,
  activeId: z.number(),
  binStep: z.number(),
  poolManager: zAddress,
  id: zHex
}).required().extend({
  hooks: zAddress.optional()
});
var zPools = z.array(z.union([zV2Pool, zV3Pool, zStablePool, zV4ClPool, zV4BinPool]));
var zRouterGetParams = z.object({
  chainId: zChainId,
  tradeType: zTradeType,
  amount: zCurrencyAmount,
  currency: zCurrency,
  gasPriceWei: zBigNumber.optional(),
  maxHops: z.number().optional(),
  maxSplits: z.number().optional(),
  blockNumber: zBigNumber.optional(),
  poolTypes: zPoolTypes.optional()
}).required({
  chainId: true,
  tradeType: true,
  amount: true,
  currency: true,
  candidatePools: true
});
var zRouterPostParams = z.object({
  chainId: zChainId,
  tradeType: zTradeType,
  amount: zCurrencyAmount,
  currency: zCurrency,
  candidatePools: zPools,
  gasPriceWei: zBigNumber.optional(),
  maxHops: z.number().optional(),
  maxSplits: z.number().optional(),
  blockNumber: zBigNumber.optional(),
  poolTypes: zPoolTypes.optional(),
  onChainQuoterGasLimit: zBigNumber.optional(),
  nativeCurrencyUsdPrice: z.number().optional(),
  quoteCurrencyUsdPrice: z.number().optional()
}).required({
  chainId: true,
  tradeType: true,
  amount: true,
  currency: true,
  candidatePools: true
});

// evm/v4-router/index.ts
var v4_router_exports = {};
__export(v4_router_exports, {
  APISchema: () => schema_exports2,
  Transformer: () => transformer_exports2,
  getBestTrade: () => getBestTrade3,
  getV3CandidatePools: () => getV3CandidatePools2,
  getV3Pools: () => getV3Pools,
  getV4BinCandidatePools: () => getV4BinCandidatePools,
  getV4BinPoolsWithoutBins: () => getV4BinPoolsWithoutBins,
  getV4ClCandidatePools: () => getV4ClCandidatePools,
  getV4ClPoolsWithoutTicks: () => getV4ClPoolsWithoutTicks,
  log: () => log2,
  logger: () => logger2,
  metric: () => metric2
});

// evm/abis/ITickLens.ts
var tickLensAbi = [
  {
    inputs: [
      { internalType: "address", name: "pool", type: "address" },
      { internalType: "int16", name: "tickBitmapIndex", type: "int16" }
    ],
    name: "getPopulatedTicksInWord",
    outputs: [
      {
        components: [
          { internalType: "int24", name: "tick", type: "int24" },
          { internalType: "int128", name: "liquidityNet", type: "int128" },
          { internalType: "uint128", name: "liquidityGross", type: "uint128" }
        ],
        internalType: "struct ITickLens.PopulatedTick[]",
        name: "populatedTicks",
        type: "tuple[]"
      }
    ],
    stateMutability: "view",
    type: "function"
  }
];

// evm/v4-router/constants/v3PoolFetchGasLimit.ts
var DEFAULT_FETCH_CONFIG = {
  gasLimit: 3000000n,
  retryGasMultiplier: 2
};
var V3_POOL_FETCH_CONFIG = {};
function getV3PoolFetchConfig(chainId) {
  return V3_POOL_FETCH_CONFIG[chainId] || DEFAULT_FETCH_CONFIG;
}
var CL_PRESETS = [
  {
    fee: 500,
    tickSpacing: 10
  },
  {
    fee: 100,
    tickSpacing: 1e3
  }
];
var CL_HOOKS = [zeroAddress];
var BIN_PRESETS = [
  {
    fee: 500,
    binStep: 10
  },
  {
    fee: 100,
    binStep: 10
  }
];
var BIN_HOOKS = [zeroAddress];

// evm/v4-router/queries/getV3Pools.ts
async function getV3CandidatePools2({
  currencyA,
  currencyB,
  clientProvider,
  gasLimit
}) {
  const pairs = await getPairCombinations(currencyA, currencyB);
  return getV3Pools({ pairs, clientProvider, gasLimit });
}
async function getV3Pools({ pairs, clientProvider, gasLimit }) {
  const pools = await getV3PoolsWithoutTicksOnChain(pairs || [], clientProvider);
  if (!pools.length) {
    return pools;
  }
  return fillPoolsWithTicks({ pools, clientProvider, gasLimit });
}
function getBitmapIndex(tick, tickSpacing) {
  return Math.floor(tick / tickSpacing / 256);
}
function createBitmapIndexListBuilder(tickRange) {
  return function buildBitmapIndexList2({ currentTick, fee, ...rest }) {
    const tickSpacing = TICK_SPACINGS[fee];
    const minIndex = getBitmapIndex(currentTick - tickRange, tickSpacing);
    const maxIndex = getBitmapIndex(currentTick + tickRange, tickSpacing);
    return Array.from(Array(maxIndex - minIndex + 1), (_, i) => ({
      bitmapIndex: minIndex + i,
      ...rest
    }));
  };
}
var buildBitmapIndexList = createBitmapIndexListBuilder(1e3);
async function fillPoolsWithTicks({ pools, clientProvider, gasLimit }) {
  const chainId = pools[0]?.token0.chainId;
  const tickLensAddress = V3_TICK_LENS_ADDRESSES[chainId];
  const client = clientProvider?.({ chainId });
  if (!client || !tickLensAddress) {
    throw new Error("Fill pools with ticks failed. No valid public client or tick lens found.");
  }
  const { gasLimit: gasLimitPerCall, retryGasMultiplier } = getV3PoolFetchConfig(chainId);
  const bitmapIndexes = pools.map(({ tick, fee }, i) => buildBitmapIndexList({ currentTick: tick, fee, poolIndex: i })).reduce((acc, cur) => {
    acc.push(...cur);
    return acc;
  }, []);
  const res = await multicallByGasLimit(
    bitmapIndexes.map(({ poolIndex, bitmapIndex }) => ({
      target: tickLensAddress,
      callData: encodeFunctionData({
        abi: tickLensAbi,
        args: [pools[poolIndex].address, bitmapIndex],
        functionName: "getPopulatedTicksInWord"
      }),
      gasLimit: gasLimitPerCall
    })),
    {
      chainId,
      client,
      gasLimit,
      retryFailedCallsWithGreaterLimit: {
        gasLimitMultiplier: retryGasMultiplier
      }
    }
  );
  const poolsWithTicks = pools.map((p) => ({ ...p }));
  for (const [index, result] of res.results.entries()) {
    const { poolIndex } = bitmapIndexes[index];
    const pool = poolsWithTicks[poolIndex];
    const data = result.success ? decodeFunctionResult({
      abi: tickLensAbi,
      functionName: "getPopulatedTicksInWord",
      data: result.result
    }) : void 0;
    const newTicks = data?.map(
      ({ tick, liquidityNet, liquidityGross }) => new Tick({
        index: tick,
        liquidityNet,
        liquidityGross
      })
    ).reverse();
    if (!newTicks) {
      continue;
    }
    pool.ticks = [...pool.ticks || [], ...newTicks];
  }
  return poolsWithTicks.filter((p) => p.ticks?.length);
}
async function getV4ClCandidatePools({
  currencyA,
  currencyB,
  clientProvider,
  gasLimit
}) {
  if (!currencyA || !currencyB) {
    throw new Error(`Invalid currencyA ${currencyA} or currencyB ${currencyB}`);
  }
  const native = Native.onChain(currencyA?.chainId);
  const wnative = native.wrapped;
  const pairs = await getPairCombinations(currencyA, currencyB);
  const pairsWithNative = [...pairs];
  for (const pair of pairs) {
    const index = pair.findIndex((c) => c.wrapped.equals(wnative));
    if (index >= 0) {
      const pairWithNative = [...pair];
      pairWithNative[index] = native;
      pairsWithNative.push(pairWithNative);
    }
  }
  return getV4ClPoolsWithoutTicks(pairsWithNative, clientProvider);
}
var getV4ClPoolsWithoutTicks = createOnChainPoolFactory({
  abi: CLPoolManager,
  getPossiblePoolMetas: async ([currencyA, currencyB]) => {
    const [currency0, currency1] = sortCurrencies([currencyA, currencyB]);
    const metas = [];
    for (const { fee, tickSpacing } of CL_PRESETS) {
      for (const hooks of CL_HOOKS) {
        const poolKey = {
          currency0: getCurrencyAddress(currency0),
          currency1: getCurrencyAddress(currency1),
          fee,
          parameters: {
            tickSpacing
          },
          // TODO: use constant from v4 sdk
          poolManager: "0x26Ca53c8C5CE90E22aA1FadDA68AB9a08f7BA06f",
          hooks
        };
        const id = getPoolId(poolKey);
        metas.push({
          currencyA,
          currencyB,
          fee,
          tickSpacing,
          hooks,
          poolManager: poolKey.poolManager,
          id
        });
      }
    }
    return metas;
  },
  buildPoolInfoCalls: ({ id, poolManager: address }) => [
    {
      address,
      functionName: "getLiquidity",
      args: [id]
    },
    {
      address,
      functionName: "getSlot0",
      args: [id]
    }
  ],
  buildPool: ({ currencyA, currencyB, fee, id, tickSpacing, poolManager, hooks }, [liquidity, slot0]) => {
    if (!slot0 || !slot0[0]) {
      return null;
    }
    const [sqrtPriceX96, tick] = slot0;
    const [currency0, currency1] = sortCurrencies([currencyA, currencyB]);
    return {
      id,
      type: 3 /* V4CL */,
      currency0,
      currency1,
      fee,
      liquidity: BigInt(liquidity.toString()),
      sqrtRatioX96: BigInt(sqrtPriceX96.toString()),
      tick: Number(tick),
      tickSpacing,
      poolManager,
      hooks
    };
  }
});
async function getV4BinCandidatePools({
  currencyA,
  currencyB,
  clientProvider,
  gasLimit
}) {
  if (!currencyA || !currencyB) {
    throw new Error(`Invalid currencyA ${currencyA} or currencyB ${currencyB}`);
  }
  const native = Native.onChain(currencyA?.chainId);
  const wnative = native.wrapped;
  const pairs = await getPairCombinations(currencyA, currencyB);
  const pairsWithNative = [...pairs];
  for (const pair of pairs) {
    const index = pair.findIndex((c) => c.wrapped.equals(wnative));
    if (index >= 0) {
      const pairWithNative = [...pair];
      pairWithNative[index] = native;
      pairsWithNative.push(pairWithNative);
    }
  }
  return getV4BinPoolsWithoutBins(pairsWithNative, clientProvider);
}
var getV4BinPoolsWithoutBins = createOnChainPoolFactory({
  abi: BinPoolManager,
  getPossiblePoolMetas: async ([currencyA, currencyB]) => {
    const [currency0, currency1] = sortCurrencies([currencyA, currencyB]);
    const metas = [];
    for (const { fee, binStep } of BIN_PRESETS) {
      for (const hooks of BIN_HOOKS) {
        const poolKey = {
          currency0: getCurrencyAddress(currency0),
          currency1: getCurrencyAddress(currency1),
          fee,
          parameters: {
            binStep
          },
          // TODO: use constant from v4 sdk
          poolManager: "0x1DF0be383e9d17DA4448E57712849aBE5b3Fa33b",
          hooks
        };
        const id = getPoolId(poolKey);
        metas.push({
          currencyA,
          currencyB,
          fee,
          binStep,
          hooks,
          poolManager: poolKey.poolManager,
          id
        });
      }
    }
    return metas;
  },
  buildPoolInfoCalls: ({ id, poolManager: address }) => [
    {
      address,
      functionName: "getSlot0",
      args: [id]
    }
  ],
  buildPool: ({ currencyA, currencyB, fee, id, binStep, poolManager, hooks }, [slot0]) => {
    if (!slot0 || !slot0[0]) {
      return null;
    }
    const [activeId] = slot0;
    const [currency0, currency1] = sortCurrencies([currencyA, currencyB]);
    return {
      id,
      type: 4 /* V4BIN */,
      currency0,
      currency1,
      fee,
      activeId,
      binStep,
      poolManager,
      hooks
    };
  }
});

// evm/v4-router/pool.ts
function getCurrencyPairs(p) {
  if (isV3Pool(p)) {
    return [[p.token0, p.token1]];
  }
  if (isV2Pool(p)) {
    return [[p.reserve0.currency, p.reserve1.currency]];
  }
  if (isStablePool(p)) {
    const currencies = p.balances.map((b) => b.currency);
    const pairs = [];
    for (let i = 0; i < currencies.length; i++) {
      for (let j = i + 1; j < currencies.length; j++) {
        pairs.push([currencies[i], currencies[j]]);
      }
    }
    return pairs;
  }
  throw new Error("[Get currency pairs]: Unknown pool type");
}
function getReserve(p, currency) {
  if (isV3Pool(p)) {
    return p.token0.equals(currency.wrapped) ? p.reserve0 : p.reserve1;
  }
  if (isV2Pool(p)) {
    return p.reserve0.currency.wrapped.equals(currency.wrapped) ? p.reserve0 : p.reserve1;
  }
  if (isStablePool(p)) {
    return p.balances.find((b) => b.currency.wrapped.equals(currency.wrapped));
  }
  throw new Error("[Get reserve]: Unknown pool type");
}

// evm/v4-router/graph/edge.ts
function getNeighbour(e, v) {
  return e.vertice0.currency.equals(v.currency) ? e.vertice1 : e.vertice0;
}
function createPriceCalculator({ graph, quote, gasPriceWei }) {
  const { chainId } = quote.currency;
  const priceMap = /* @__PURE__ */ new Map();
  const processedVert = /* @__PURE__ */ new Set();
  const edgeWeight = /* @__PURE__ */ new Map();
  let nextEdges = [];
  const getWeight = (e) => {
    const weight = edgeWeight.get(e);
    if (weight === void 0) {
      throw new Error(`Invalid weight for edge ${e}`);
    }
    return weight;
  };
  priceMap.set(quote, new Price(quote.currency, quote.currency, 1, 1));
  nextEdges = getNextEdges(quote);
  processedVert.add(quote);
  while (nextEdges.length) {
    const bestEdge = nextEdges.pop();
    const [vFrom, vTo] = processedVert.has(bestEdge.vertice1) ? [bestEdge.vertice1, bestEdge.vertice0] : [bestEdge.vertice0, bestEdge.vertice1];
    if (processedVert.has(vTo))
      continue;
    const p = getTokenPrice(bestEdge.pool, vTo.currency, vFrom.currency);
    const vFromQuotePrice = getQuotePrice(vFrom);
    invariant6(vFromQuotePrice !== void 0, "Invalid quote price");
    priceMap.set(vTo, p.multiply(vFromQuotePrice));
    nextEdges = getNextEdges(vTo);
    processedVert.add(vTo);
  }
  const native = Native.onChain(chainId).wrapped;
  const nativeVertice = graph.getVertice(native);
  if (!nativeVertice) {
    throw new Error("No valid native currency price found");
  }
  const nativePriceInQuote = getQuotePrice(nativeVertice);
  const gasPriceInQuote = nativePriceInQuote?.quote(CurrencyAmount.fromRawAmount(native, gasPriceWei));
  if (!gasPriceInQuote) {
    throw new Error("Failed to get gas price in quote");
  }
  function getNextEdges(v) {
    const price = priceMap.get(v);
    if (!price) {
      throw new Error("Invalid price");
    }
    const newEdges = v.edges.filter((e) => {
      if (processedVert.has(getNeighbour(e, v))) {
        return false;
      }
      const tokenReserve = getReserve(e.pool, v.currency);
      invariant6(tokenReserve !== void 0, "Unexpected empty token reserve");
      const liquidity = price.quote(tokenReserve).quotient;
      edgeWeight.set(e, liquidity);
      return true;
    });
    newEdges.sort((e1, e2) => Number(getWeight(e1) - getWeight(e2)));
    const res = [];
    while (nextEdges.length && newEdges.length) {
      if (getWeight(nextEdges[0]) < getWeight(newEdges[0])) {
        res.push(nextEdges.shift());
      } else {
        res.push(newEdges.shift());
      }
    }
    return [...res, ...nextEdges, ...newEdges];
  }
  function getPrice(base, targetQuote) {
    const basePrice = getQuotePrice(base);
    const quotePrice = getQuotePrice(targetQuote);
    return basePrice && quotePrice ? basePrice.multiply(quotePrice.invert()) : void 0;
  }
  function getQuotePrice(base) {
    return priceMap.get(base);
  }
  function getGasPriceInBase(base) {
    const basePrice = getQuotePrice(base);
    return gasPriceInQuote ? basePrice?.invert().quote(gasPriceInQuote) : void 0;
  }
  return {
    graph,
    getGasPriceInBase,
    getQuotePrice,
    getPrice
  };
}
function estimateGasCost({ pool, poolAfter }) {
  if (isV2Pool(pool)) {
    return BASE_SWAP_COST_V2;
  }
  if (isV3Pool(pool) && isV3Pool(poolAfter)) {
    const { ticks, token0, tick } = pool;
    invariant6(ticks !== void 0, "[Estimate gas]: No valid tick list found");
    const { tick: tickAfter } = poolAfter;
    const { chainId } = token0;
    const numOfTicksCrossed = TickList.countInitializedTicksCrossed(ticks, tick, tickAfter);
    const tickGasUse = COST_PER_INIT_TICK(chainId) * BigInt(numOfTicksCrossed);
    return BASE_SWAP_COST_V3(chainId) + COST_PER_HOP_V3(chainId) + tickGasUse;
  }
  if (isStablePool(pool)) {
    return BASE_SWAP_COST_STABLE_SWAP;
  }
  throw new Error("[Estimate gas]: Unknown pool type");
}

// evm/v4-router/graph/route.ts
function isSameRoute(one, another) {
  if (one.pools.length !== another.pools.length) {
    return false;
  }
  for (const [index, p] of one.pools.entries()) {
    if (p.type !== another.pools[index].type) {
      return false;
    }
    if (getPoolAddress(p) !== getPoolAddress(another.pools[index])) {
      return false;
    }
  }
  return true;
}
function mergeRoute(one, another) {
  return {
    ...one,
    inputAmount: one.inputAmount.add(another.inputAmount),
    outputAmount: one.outputAmount.add(another.outputAmount),
    gasUseEstimateQuote: another.gasUseEstimateQuote ? one.gasUseEstimateQuote?.add(another.gasUseEstimateQuote) : one.gasUseEstimateQuote,
    gasUseEstimate: one.gasUseEstimate + another.gasUseEstimate,
    inputAmountWithGasAdjusted: another.inputAmountWithGasAdjusted ? one.inputAmountWithGasAdjusted?.add(another.inputAmountWithGasAdjusted) : one.inputAmountWithGasAdjusted,
    outputAmountWithGasAdjusted: another.outputAmountWithGasAdjusted ? one.outputAmountWithGasAdjusted?.add(another.outputAmountWithGasAdjusted) : one.outputAmountWithGasAdjusted,
    percent: one.percent + another.percent
  };
}

// evm/v4-router/utils/groupPoolsPyType.ts
function groupPoolsByType(pools) {
  const poolsByType = /* @__PURE__ */ new Map();
  for (const pool of pools) {
    poolsByType.set(pool.type, [...poolsByType.get(pool.type) || [], pool]);
  }
  return Array.from(poolsByType.values());
}
function getBetterTrade(tradeA, tradeB) {
  if (!tradeA && !tradeB)
    return void 0;
  if (!tradeA && tradeB)
    return tradeB;
  if (tradeA && !tradeB)
    return tradeA;
  const isExactIn = tradeA.tradeType === TradeType.EXACT_INPUT;
  if (isExactIn) {
    if (tradeB.outputAmountWithGasAdjusted.greaterThan(tradeA.outputAmountWithGasAdjusted)) {
      return tradeB;
    }
    return tradeA;
  }
  if (tradeB.inputAmountWithGasAdjusted.lessThan(tradeA.inputAmountWithGasAdjusted)) {
    return tradeB;
  }
  return tradeA;
}

// evm/v4-router/graph/graph.ts
function getEdgeKey(p, vertA, vertB) {
  const [vert0, vert1] = vertA.currency.wrapped.sortsBefore(vertB.currency.wrapped) ? [vertA, vertB] : [vertB, vertA];
  return `${vert0.currency.chainId}-${vert0.currency.wrapped.address}-${vert1.currency.wrapped.address}-${getPoolAddress(p)}`;
}
function cloneGraph(graph) {
  const pools = graph.edges.map((e) => e.pool);
  return createGraph({ pools });
}
function createGraph({ pools, graph }) {
  if (graph) {
    return cloneGraph(graph);
  }
  if (!pools) {
    throw new Error("[Create graph]: Invalid pools");
  }
  const verticeMap = /* @__PURE__ */ new Map();
  const edgeMap = /* @__PURE__ */ new Map();
  for (const p of pools) {
    const pairs = getCurrencyPairs(p);
    for (const [currency0, currency1] of pairs) {
      const vertice0 = createVertice(currency0);
      const vertice1 = createVertice(currency1);
      const edge = createEdge(p, vertice0, vertice1);
      if (!vertice0.edges.includes(edge))
        vertice0.edges.push(edge);
      if (!vertice1.edges.includes(edge))
        vertice1.edges.push(edge);
    }
  }
  function getVertice(c) {
    return verticeMap.get(c.wrapped.address);
  }
  function getEdge(p, vert0, vert1) {
    return edgeMap.get(getEdgeKey(p, vert0, vert1));
  }
  function createVertice(c) {
    const vert = getVertice(c);
    if (vert) {
      return vert;
    }
    const vertice = { currency: c, edges: [] };
    verticeMap.set(c.wrapped.address, vertice);
    return vertice;
  }
  function createEdge(p, vertice0, vertice1) {
    const edgeKey = getEdgeKey(p, vertice0, vertice1);
    if (!edgeKey) {
      throw new Error(`Create edge failed. Cannot get valid edge key for ${p}`);
    }
    const e = edgeMap.get(edgeKey);
    if (e) {
      return e;
    }
    const edge = {
      vertice0,
      vertice1,
      pool: p
    };
    edgeMap.set(edgeKey, edge);
    return edge;
  }
  const hasValidRouteToVerticeWithinHops = memoize(
    (vertice, target, hops, visitedVertices) => {
      if (vertice === target) {
        return true;
      }
      if (hops <= 0) {
        return false;
      }
      const visited = visitedVertices || /* @__PURE__ */ new Set();
      visited.add(vertice);
      for (const edge of vertice.edges) {
        const nextVertice = getNeighbour(edge, vertice);
        if (nextVertice && !visited.has(nextVertice)) {
          if (hasValidRouteToVerticeWithinHops(nextVertice, target, hops - 1, visited)) {
            return true;
          }
        }
      }
      return false;
    },
    (v1, v2, hops) => `${v1.currency.chainId}-${v1.currency.wrapped.address}-${v2.currency.wrapped.address}-${hops}`
  );
  return {
    vertices: Array.from(verticeMap.values()),
    edges: Array.from(edgeMap.values()),
    getVertice,
    getEdge,
    hasValidRouteToVerticeWithinHops,
    applySwap: async ({ isExactIn, route }) => {
      const getPoolQuote = createPoolQuoteGetter(isExactIn);
      function* loopPools() {
        let i = isExactIn ? 0 : route.pools.length - 1;
        const getNext = () => isExactIn ? i + 1 : i - 1;
        const hasNext = isExactIn ? () => i < route.pools.length : () => i >= 0;
        for (; hasNext(); i = getNext()) {
          yield i;
        }
      }
      const amount = isExactIn ? route.inputAmount : route.outputAmount;
      invariant6(amount !== void 0, "[Apply swap]: Invalid base amount");
      let quote = amount;
      let gasCost = 0n;
      for (const i of loopPools()) {
        const vertA = getVertice(route.path[i]);
        const vertB = getVertice(route.path[i + 1]);
        const p = route.pools[i];
        invariant6(
          vertA !== void 0 && vertB !== void 0 && p !== void 0,
          "[Apply swap]: Invalid vertice and pool"
        );
        const edge = getEdge(p, vertA, vertB);
        invariant6(edge !== void 0, "[Apply swap]: No valid edge found");
        const quoteResult = await getPoolQuote(edge.pool, quote);
        invariant6(quoteResult !== void 0, "[Apply swap]: Failed to get quote");
        edge.pool = quoteResult.poolAfter;
        quote = quoteResult.quote;
        gasCost += estimateGasCost(quoteResult);
      }
      return {
        amount,
        quote,
        gasCost
      };
    }
  };
}
function getStreamedAmounts(amount, streams) {
  const streamSum = Array.isArray(streams) ? streams.reduce((sum3, s) => sum3 + s, 0) : streams;
  const streamDistributions = Array.isArray(streams) ? streams.map((stream) => new Fraction(stream, streamSum)) : Array.from({ length: streams }).map(() => new Fraction(1, streamSum));
  const numOfStreams = streamDistributions.length;
  let sum2 = new Fraction(0);
  const amounts = [];
  for (const [index, stream] of streamDistributions.entries()) {
    const streamAmount = index === numOfStreams - 1 ? amount.subtract(amount.multiply(sum2)) : amount.multiply(stream);
    const revisedStream = index === numOfStreams - 1 ? new Fraction(1).subtract(sum2) : stream;
    const percent = Number(formatFraction(revisedStream) || 0) * 100;
    amounts.push({ amount: streamAmount, percent });
    sum2 = sum2.add(stream);
  }
  return amounts;
}
var getGasCostInCurrency = ({
  priceCalculator,
  gasCost,
  currency
}) => {
  const v = priceCalculator.graph.getVertice(currency);
  const gasPriceInCurrency = v && priceCalculator.getGasPriceInBase(v);
  const gasCostInCurrencyRaw = gasPriceInCurrency?.multiply(gasCost);
  return CurrencyAmount.fromRawAmount(currency, gasCostInCurrencyRaw?.quotient || 0);
};
async function findBestTrade(params) {
  const { tradeType, candidatePools, ...rest } = params;
  const isExactIn = tradeType === TradeType.EXACT_INPUT;
  if (isExactIn) {
    return getBestTrade2(params);
  }
  const poolsByType = groupPoolsByType(candidatePools).filter((pools) => !isStablePool(pools[0]));
  const trades = await Promise.allSettled(
    poolsByType.map((pools) => getBestTrade2({ tradeType, candidatePools: pools, ...rest }))
  );
  let bestTrade;
  for (const result of trades) {
    if (result.status === "rejected") {
      continue;
    }
    const { value: trade } = result;
    if (!trade) {
      continue;
    }
    if (!bestTrade) {
      bestTrade = trade;
      continue;
    }
    bestTrade = getBetterTrade(bestTrade, trade);
  }
  return bestTrade;
}
async function getBestTrade2({
  amount: totalAmount,
  candidatePools,
  quoteCurrency,
  gasPriceWei,
  streams,
  graph: graphOverride,
  tradeType,
  maxHops = 3
}) {
  const isExactIn = tradeType === TradeType.EXACT_INPUT;
  const baseCurrency = totalAmount.currency;
  const inputCurrency = isExactIn ? baseCurrency : quoteCurrency;
  const outputCurrency = isExactIn ? quoteCurrency : baseCurrency;
  const graph = graphOverride || createGraph({ pools: candidatePools });
  const amounts = getStreamedAmounts(totalAmount, streams);
  const getPoolQuote = createPoolQuoteGetter(isExactIn);
  const gasPrice = BigInt(typeof gasPriceWei === "function" ? await gasPriceWei() : gasPriceWei);
  const start = graph.getVertice(baseCurrency);
  const finish = graph.getVertice(quoteCurrency);
  if (!start || !finish) {
    throw new Error(`Invalid start vertice or finish vertice. Start ${start}, finish ${finish}`);
  }
  const priceCalculator = createPriceCalculator({ quote: start, gasPriceWei: gasPrice, graph });
  const adjustQuoteByGas = (quote, gasCostInQuote) => isExactIn ? quote.subtract(gasCostInQuote) : quote.add(gasCostInQuote);
  const isQuoteBetter = (quote, compareTo) => isExactIn ? quote.greaterThan(compareTo) : quote.lessThan(compareTo);
  const getInputAmount = (amount, quote) => isExactIn ? amount : quote;
  const getOutputAmount = (amount, quote) => isExactIn ? quote : amount;
  const getQuoteAmount = (r) => isExactIn ? r.outputAmount : r.inputAmount;
  const buildTrade = (g, routes2) => {
    const {
      gasUseEstimate,
      quoteAmount,
      gasUseEstimateQuote,
      gasUseEstimateBase,
      inputAmountWithGasAdjusted,
      outputAmountWithGasAdjusted
    } = routes2.reduce(
      (result, r) => {
        return {
          gasUseEstimate: result.gasUseEstimate + r.gasUseEstimate,
          quoteAmount: result.quoteAmount.add(getQuoteAmount(r)),
          gasUseEstimateBase: result.gasUseEstimateBase.add(r.gasUseEstimateBase),
          gasUseEstimateQuote: result.gasUseEstimateQuote.add(r.gasUseEstimateQuote),
          inputAmountWithGasAdjusted: result.inputAmountWithGasAdjusted.add(r.inputAmountWithGasAdjusted),
          outputAmountWithGasAdjusted: result.outputAmountWithGasAdjusted.add(r.outputAmountWithGasAdjusted)
        };
      },
      {
        gasUseEstimate: 0n,
        quoteAmount: CurrencyAmount.fromRawAmount(quoteCurrency, 0),
        gasUseEstimateBase: CurrencyAmount.fromRawAmount(baseCurrency, 0),
        gasUseEstimateQuote: CurrencyAmount.fromRawAmount(quoteCurrency, 0),
        inputAmountWithGasAdjusted: CurrencyAmount.fromRawAmount(inputCurrency, 0),
        outputAmountWithGasAdjusted: CurrencyAmount.fromRawAmount(outputCurrency, 0)
      }
    );
    return {
      gasUseEstimate,
      gasUseEstimateQuote,
      gasUseEstimateBase,
      inputAmountWithGasAdjusted,
      outputAmountWithGasAdjusted,
      inputAmount: getInputAmount(totalAmount, quoteAmount),
      outputAmount: getOutputAmount(totalAmount, quoteAmount),
      tradeType,
      graph: g,
      routes: routes2
    };
  };
  async function findBestRoute(amount) {
    invariant6(start !== void 0 && finish !== void 0, "Invalid start/finish vertice");
    const bestResult = /* @__PURE__ */ new Map();
    const processedVert = /* @__PURE__ */ new Set();
    bestResult.set(start, {
      hops: 0,
      bestAmount: amount,
      gasSpent: 0n
    });
    const nextVertList = [start];
    const getHops = (vert) => bestResult.get(vert)?.hops || 0;
    const getBestAmount = (vert) => bestResult.get(vert)?.bestAmount;
    const getBestQuote = (vert) => bestResult.get(vert)?.bestQuote;
    const getBestSource = (vert) => bestResult.get(vert)?.bestSource;
    const getGasSpent = (vert) => bestResult.get(vert)?.gasSpent || 0n;
    const getNextVert = () => {
      let vert;
      let bestQuote;
      let bestVertIndex;
      for (const [i, vertice] of nextVertList.entries()) {
        const currentBestQuote = getBestQuote(vertice);
        if (vert === void 0 || bestQuote === void 0 || currentBestQuote && isQuoteBetter(currentBestQuote, bestQuote)) {
          vert = vertice;
          bestQuote = currentBestQuote;
          bestVertIndex = i;
        }
      }
      return { vert, index: bestVertIndex };
    };
    const getBestRoute = (vert) => {
      const pools = [];
      const path = [vert.currency];
      for (let v = finish; getBestSource(v); v = getNeighbour(getBestSource(v), v)) {
        const bestSource = getBestSource(v);
        invariant6(bestSource !== void 0, "Invalid best source");
        const neighbour = getNeighbour(bestSource, v);
        if (isExactIn) {
          pools.unshift(bestSource.pool);
          path.unshift(neighbour?.currency);
        } else {
          pools.push(bestSource.pool);
          path.push(neighbour?.currency);
        }
      }
      const gasCost = getGasSpent(vert);
      const quoteAmountRaw = getBestAmount(vert);
      invariant6(quoteAmountRaw !== void 0, "Invalid quote amount");
      const quoteAmount = CurrencyAmount.fromRawAmount(quoteCurrency, quoteAmountRaw.quotient);
      const gasUseEstimateBase = getGasCostInCurrency({ priceCalculator, gasCost, currency: baseCurrency });
      const gasUseEstimateQuote = getGasCostInCurrency({ priceCalculator, gasCost, currency: quoteCurrency });
      const quoteAmountWithGasAdjusted = CurrencyAmount.fromRawAmount(
        quoteCurrency,
        gasUseEstimateQuote ? adjustQuoteByGas(quoteAmount, gasUseEstimateQuote).quotient : 0
      );
      const { type } = buildBaseRoute(pools, start.currency, finish.currency);
      return {
        type,
        path,
        pools,
        gasUseEstimate: gasCost,
        inputAmount: getInputAmount(amount, quoteAmount),
        outputAmount: getOutputAmount(amount, quoteAmount),
        inputAmountWithGasAdjusted: getInputAmount(amount, quoteAmountWithGasAdjusted),
        outputAmountWithGasAdjusted: getOutputAmount(amount, quoteAmountWithGasAdjusted),
        gasUseEstimateQuote,
        gasUseEstimateBase
      };
    };
    for (; ; ) {
      const { vert, index } = getNextVert();
      if (!vert || index === void 0)
        return void 0;
      if (vert === finish) {
        return getBestRoute(vert);
      }
      nextVertList.splice(index, 1);
      const currentHop = getHops(vert);
      for (const e of vert.edges) {
        const v2 = vert === e.vertice0 ? e.vertice1 : e.vertice0;
        if (processedVert.has(v2))
          continue;
        if (!graph.hasValidRouteToVerticeWithinHops(v2, finish, maxHops - currentHop - 1)) {
          continue;
        }
        try {
          const bestAmount = getBestAmount(vert);
          invariant6(bestAmount !== void 0, "Invalid amount");
          const quoteResult = await getPoolQuote(e.pool, bestAmount);
          invariant6(quoteResult !== void 0, "Invalid quote result");
          const { quote } = quoteResult;
          const gasPriceInV2 = priceCalculator.getGasPriceInBase(v2);
          invariant6(gasPriceInV2 !== void 0, "Invalid gas price in v2");
          const gasSpent = estimateGasCost(quoteResult) + getGasSpent(vert);
          const price = priceCalculator.getPrice(v2, finish);
          invariant6(
            price !== void 0,
            `Failed to get price, base ${v2.currency.symbol}, quote ${finish.currency.symbol}`
          );
          const gasSpentInQuote = price.quote(gasPriceInV2.multiply(gasSpent));
          const newQuote = adjustQuoteByGas(price.quote(quote), gasSpentInQuote);
          const bestSource = getBestSource(v2);
          const v2BestQuote = getBestQuote(v2);
          if (!bestSource)
            nextVertList.push(v2);
          if (!bestSource || !v2BestQuote || isQuoteBetter(newQuote, v2BestQuote)) {
            bestResult.set(v2, {
              hops: currentHop + 1,
              gasSpent,
              bestAmount: quote,
              bestSource: e,
              bestQuote: newQuote
            });
          }
        } catch (_err) {
          continue;
        }
      }
      processedVert.add(vert);
    }
  }
  let routeMerged = false;
  const routes = [];
  for (const { amount, percent } of amounts) {
    const route = await findBestRoute(amount);
    invariant6(
      route !== void 0,
      `No valid route found for base amount ${amount.toExact()} ${amount.currency.symbol} and quote currency ${quoteCurrency.symbol}`
    );
    await graph.applySwap({ route, isExactIn });
    const newRoute = {
      ...route,
      percent
    };
    const index = routes.findIndex((r) => isSameRoute(r, newRoute));
    if (index < 0) {
      routes.push(newRoute);
    } else {
      routes[index] = mergeRoute(routes[index], newRoute);
      routeMerged = true;
    }
  }
  if (!routes.length) {
    return void 0;
  }
  if (!routeMerged) {
    return buildTrade(graph, routes);
  }
  const finalGraph = createGraph({ graph: graphOverride, pools: candidatePools });
  const s = finalGraph.getVertice(baseCurrency);
  invariant6(s !== void 0, "[Graph rebuild]: Invalid start vertice");
  const pc = createPriceCalculator({ quote: s, gasPriceWei: gasPrice, graph: finalGraph });
  const finalRoutes = [];
  for (const r of routes) {
    const { amount, quote: quoteRaw, gasCost } = await finalGraph.applySwap({ isExactIn, route: r });
    const quote = CurrencyAmount.fromRawAmount(quoteCurrency, quoteRaw.quotient);
    const gasUseEstimateBase = getGasCostInCurrency({ priceCalculator: pc, gasCost, currency: baseCurrency });
    const gasUseEstimateQuote = getGasCostInCurrency({ priceCalculator: pc, gasCost, currency: quoteCurrency });
    const quoteAmountWithGasAdjusted = CurrencyAmount.fromRawAmount(
      quoteCurrency,
      gasUseEstimateQuote ? adjustQuoteByGas(quote, gasUseEstimateQuote).quotient : 0
    );
    finalRoutes.push({
      ...r,
      gasUseEstimate: gasCost,
      inputAmount: getInputAmount(amount, quote),
      outputAmount: getOutputAmount(amount, quote),
      inputAmountWithGasAdjusted: getInputAmount(amount, quoteAmountWithGasAdjusted),
      outputAmountWithGasAdjusted: getOutputAmount(amount, quoteAmountWithGasAdjusted),
      gasUseEstimateQuote,
      gasUseEstimateBase
    });
  }
  return buildTrade(finalGraph, finalRoutes);
}

// evm/v4-router/trade.ts
var DEFAULT_STREAM = 10;
function getBestStreamsConfig(trade) {
  const maxStreams = 100;
  if (!trade) {
    return DEFAULT_STREAM;
  }
  const priceImpact = getPriceImpact(trade);
  if (!priceImpact) {
    return DEFAULT_STREAM;
  }
  const { gasUseEstimateBase, inputAmount, outputAmount } = trade;
  if (!gasUseEstimateBase) {
    return DEFAULT_STREAM;
  }
  const amount = trade.tradeType === TradeType.EXACT_INPUT ? inputAmount : outputAmount;
  const bestFlowAmount = Math.sqrt(
    Number(gasUseEstimateBase.toExact()) * Number(amount.toExact()) / Number(formatFraction(priceImpact.asFraction))
  );
  const streams = Math.round(Number(amount.toExact()) / bestFlowAmount);
  if (!Number.isFinite(streams)) {
    return DEFAULT_STREAM;
  }
  return Math.max(1, Math.min(streams, maxStreams));
}
async function getBestTrade3(amount, quoteCurrency, tradeType, { candidatePools, gasPriceWei, maxHops, maxSplits }) {
  const splitDisabled = maxSplits !== void 0 && maxSplits === 0;
  let bestTrade;
  try {
    bestTrade = await findBestTrade({
      tradeType,
      amount,
      quoteCurrency,
      gasPriceWei,
      candidatePools,
      maxHops,
      streams: 1
    });
  } catch (e) {
    if (splitDisabled) {
      throw e;
    }
    bestTrade = await findBestTrade({
      tradeType,
      amount,
      quoteCurrency,
      gasPriceWei,
      candidatePools,
      maxHops,
      streams: DEFAULT_STREAM
    });
  }
  if (splitDisabled) {
    return bestTrade;
  }
  const streams = getBestStreamsConfig(bestTrade);
  if (streams === 1) {
    return bestTrade;
  }
  const bestTradeWithStreams = await findBestTrade({
    tradeType,
    amount,
    quoteCurrency,
    gasPriceWei,
    candidatePools,
    maxHops,
    streams
  });
  return getBetterTrade(bestTrade, bestTradeWithStreams);
}

// evm/v4-router/schema.ts
var schema_exports2 = {};
__export(schema_exports2, {
  zPools: () => zPools2,
  zRouterPostParams: () => zRouterPostParams2
});
var zChainId2 = z.nativeEnum(ChainId);
var zFee2 = z.nativeEnum(FeeAmount);
var zTradeType2 = z.nativeEnum(TradeType);
var zAddress2 = z.custom((val) => /^0x[a-fA-F0-9]{40}$/.test(val));
var zBigNumber2 = z.string().regex(/^[0-9]+$/);
var zSignedBigInt = z.string().regex(/^-?[0-9]+$/);
var zHex2 = z.custom((val) => /^0x[a-fA-F0-9]*$/.test(val));
var zCurrency2 = z.object({
  address: zAddress2,
  decimals: z.number(),
  symbol: z.string()
}).required();
var zTick = z.object({
  index: z.number(),
  liquidityGross: zSignedBigInt,
  liquidityNet: zSignedBigInt
}).required();
var zCurrencyAmountBase = z.object({
  currency: zCurrency2.required(),
  value: zBigNumber2
});
var zCurrencyAmountOptional = zCurrencyAmountBase.optional();
var zCurrencyAmount2 = zCurrencyAmountBase.required();
var zV2Pool2 = z.object({
  type: z.literal(0 /* V2 */),
  reserve0: zCurrencyAmount2,
  reserve1: zCurrencyAmount2
}).required();
var zV3Pool2 = z.object({
  type: z.literal(1 /* V3 */),
  token0: zCurrency2,
  token1: zCurrency2,
  fee: zFee2,
  liquidity: zBigNumber2,
  sqrtRatioX96: zBigNumber2,
  tick: z.number(),
  address: zAddress2,
  token0ProtocolFee: z.string(),
  token1ProtocolFee: z.string(),
  reserve0: zCurrencyAmountOptional,
  reserve1: zCurrencyAmountOptional,
  ticks: z.array(zTick).optional()
}).required({
  type: true,
  token0: true,
  token1: true,
  fee: true,
  liquidity: true,
  sqrtRatioX96: true,
  tick: true,
  address: true,
  token0ProtocolFee: true,
  token1ProtocolFee: true
});
var zStablePool2 = z.object({
  type: z.literal(2 /* STABLE */),
  balances: z.array(zCurrencyAmount2),
  amplifier: zBigNumber2,
  fee: z.string(),
  address: zAddress2
}).required();
var zV4ClPool2 = z.object({
  type: z.literal(3 /* V4CL */),
  currency0: zCurrency2,
  currency1: zCurrency2,
  fee: zFee2,
  liquidity: zBigNumber2,
  sqrtRatioX96: zBigNumber2,
  tick: z.number(),
  tickSpacing: z.number(),
  poolManager: zAddress2,
  id: zHex2
}).required().extend({
  reserve0: zCurrencyAmountOptional,
  reserve1: zCurrencyAmountOptional,
  hooks: zAddress2.optional(),
  ticks: z.array(zTick).optional()
});
var zV4BinPool2 = z.object({
  type: z.literal(4 /* V4BIN */),
  currency0: zCurrency2,
  currency1: zCurrency2,
  fee: zFee2,
  activeId: z.number(),
  binStep: z.number(),
  poolManager: zAddress2,
  id: zHex2
}).required().extend({
  reserve0: zCurrencyAmountOptional,
  reserve1: zCurrencyAmountOptional,
  hooks: zAddress2.optional()
});
var zPools2 = z.array(z.union([zV3Pool2, zV2Pool2, zStablePool2, zV4ClPool2, zV4BinPool2]));
var zRouterPostParams2 = z.object({
  chainId: zChainId2,
  tradeType: zTradeType2,
  amount: zCurrencyAmount2,
  currency: zCurrency2,
  candidatePools: zPools2,
  gasPriceWei: zBigNumber2.optional(),
  maxHops: z.number().optional(),
  maxSplits: z.number().optional()
}).required({
  chainId: true,
  tradeType: true,
  amount: true,
  currency: true,
  candidatePools: true
});

// evm/v4-router/transformer.ts
var transformer_exports2 = {};
__export(transformer_exports2, {
  parseRoute: () => parseRoute2,
  parseTrade: () => parseTrade2,
  serializeRoute: () => serializeRoute2,
  serializeTrade: () => serializeTrade2
});
function serializeRoute2(route) {
  return {
    ...route,
    pools: route.pools.map(serializePool),
    path: route.path.map(serializeCurrency),
    inputAmount: serializeCurrencyAmount(route.inputAmount),
    outputAmount: serializeCurrencyAmount(route.outputAmount),
    gasUseEstimate: String(route.gasUseEstimate),
    gasUseEstimateBase: serializeCurrencyAmount(route.gasUseEstimateBase),
    gasUseEstimateQuote: serializeCurrencyAmount(route.gasUseEstimateQuote),
    inputAmountWithGasAdjusted: serializeCurrencyAmount(route.inputAmountWithGasAdjusted),
    outputAmountWithGasAdjusted: serializeCurrencyAmount(route.outputAmountWithGasAdjusted)
  };
}
function parseRoute2(chainId, route) {
  return {
    ...route,
    pools: route.pools.map((p) => parsePool(chainId, p)),
    path: route.path.map((c) => parseCurrency(chainId, c)),
    inputAmount: parseCurrencyAmount(chainId, route.inputAmount),
    outputAmount: parseCurrencyAmount(chainId, route.outputAmount),
    gasUseEstimate: BigInt(route.gasUseEstimate),
    gasUseEstimateBase: parseCurrencyAmount(chainId, route.gasUseEstimateBase),
    gasUseEstimateQuote: parseCurrencyAmount(chainId, route.gasUseEstimateQuote),
    inputAmountWithGasAdjusted: parseCurrencyAmount(chainId, route.inputAmountWithGasAdjusted),
    outputAmountWithGasAdjusted: parseCurrencyAmount(chainId, route.outputAmountWithGasAdjusted)
  };
}
function serializeTrade2(trade) {
  const { graph: _graph, ...rest } = trade;
  return {
    ...rest,
    inputAmount: serializeCurrencyAmount(trade.inputAmount),
    outputAmount: serializeCurrencyAmount(trade.outputAmount),
    routes: trade.routes.map(serializeRoute2),
    gasUseEstimate: trade.gasUseEstimate.toString(),
    gasUseEstimateBase: serializeCurrencyAmount(trade.gasUseEstimateBase),
    gasUseEstimateQuote: serializeCurrencyAmount(trade.gasUseEstimateQuote),
    inputAmountWithGasAdjusted: serializeCurrencyAmount(trade.inputAmountWithGasAdjusted),
    outputAmountWithGasAdjusted: serializeCurrencyAmount(trade.outputAmountWithGasAdjusted)
  };
}
function parseTrade2(chainId, trade) {
  return {
    ...trade,
    tradeType: trade.tradeType,
    inputAmount: parseCurrencyAmount(chainId, trade.inputAmount),
    outputAmount: parseCurrencyAmount(chainId, trade.outputAmount),
    routes: trade.routes.map((r) => parseRoute2(chainId, r)),
    gasUseEstimate: trade.gasUseEstimate ? BigInt(trade.gasUseEstimate) : 0n,
    gasUseEstimateBase: parseCurrencyAmount(chainId, trade.gasUseEstimateBase),
    gasUseEstimateQuote: parseCurrencyAmount(chainId, trade.gasUseEstimateQuote),
    inputAmountWithGasAdjusted: parseCurrencyAmount(chainId, trade.inputAmountWithGasAdjusted),
    outputAmountWithGasAdjusted: parseCurrencyAmount(chainId, trade.outputAmountWithGasAdjusted)
  };
}
var SCOPE_PREFIX2 = "v4-router";
var SCOPE2 = {
  metric: "metric",
  log: "log",
  error: "error"
};
var log_2 = debug(SCOPE_PREFIX2);
var metric2 = log_2.extend(SCOPE2.metric);
var log2 = log_2.extend(SCOPE2.log);
var logger2 = {
  metric: metric2,
  log: log2,
  error: debug(SCOPE_PREFIX2).extend(SCOPE2.error),
  enable: (namespace) => {
    let namespaces = namespace;
    if (namespace.includes(",")) {
      namespaces = namespace.split(",").map((ns) => `${SCOPE_PREFIX2}:${ns}`).join(",");
    } else {
      namespaces = `${SCOPE_PREFIX2}:${namespace}`;
    }
    debug.enable(namespaces);
  }
};

export { PoolType, RouteType, smartRouter_exports as SmartRouter, SwapRouter, transformer_exports as Transformer, V4MixedQuoterActions, v4_router_exports as V4Router, feeOnTransferDetectorAddresses, fetchTokenFeeOnTransfer, fetchTokenFeeOnTransferBatch, getPoolAddress, getRouteTypeByPools };
