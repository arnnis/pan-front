'use strict';

var routingSdk = require('@pancakeswap/routing-sdk');
var swapSdkCore = require('@pancakeswap/swap-sdk-core');
var v2Sdk = require('@pancakeswap/v2-sdk');

// src/constants/poolType.ts
var V2_POOL_TYPE = "V2";

// src/constants/gasCost.ts
var COST_PER_EXTRA_HOP_STABLE_SWAP = 70000n;
var BASE_SWAP_COST_V2 = 135000n;
var COST_PER_EXTRA_HOP_V2 = 50000n;
function createV2Pool(params) {
  let p = { ...params, type: V2_POOL_TYPE };
  const getPoolId = (poolData) => {
    return v2Sdk.Pair.getAddress(poolData.reserve0.currency.wrapped, poolData.reserve1.currency.wrapped);
  };
  let address = getPoolId(p);
  const pool = {
    type: V2_POOL_TYPE,
    getReserve: (c) => p.reserve0.currency.wrapped.equals(c.wrapped) ? p.reserve0 : p.reserve1,
    getCurrentPrice: (base) => {
      const pair = new v2Sdk.Pair(p.reserve0.wrapped, p.reserve1.wrapped);
      const price = pair.priceOf(base.wrapped);
      const [baseCurrency, quoteCurrency] = price.baseCurrency.wrapped.equals(p.reserve0.currency.wrapped) ? [p.reserve0.currency, p.reserve1.currency] : [p.reserve1.currency, p.reserve0.currency];
      return new swapSdkCore.Price(baseCurrency, quoteCurrency, price.denominator, price.numerator);
    },
    getTradingPairs: () => [[p.reserve0.currency, p.reserve1.currency]],
    getId: () => address,
    update: (poolData) => {
      p = { ...p, ...poolData };
      address = getPoolId(p);
    },
    log: () => `V3 ${p.reserve0.currency.symbol} - ${p.reserve1.currency.symbol} (${address} - price ${pool.getCurrentPrice(p.reserve0.currency, p.reserve1.currency).toSignificant(6)} ${p.reserve1.currency.symbol}/${p.reserve0.currency.symbol}`,
    getPoolData: () => p,
    getQuote: ({ amount, isExactIn }) => {
      const pair = new v2Sdk.Pair(p.reserve0.wrapped, p.reserve1.wrapped);
      const quoteCurrency = amount.currency.wrapped.equals(p.reserve0.currency.wrapped) ? p.reserve1.currency : p.reserve0.currency;
      const [quoteAmount, pairAfter] = isExactIn ? pair.getOutputAmount(amount.wrapped) : pair.getInputAmount(amount.wrapped);
      const quote = swapSdkCore.CurrencyAmount.fromRawAmount(quoteCurrency, quoteAmount.quotient);
      const newPool = {
        ...p,
        reserve0: swapSdkCore.CurrencyAmount.fromRawAmount(p.reserve0.currency, pairAfter.reserve0.quotient),
        reserve1: swapSdkCore.CurrencyAmount.fromRawAmount(p.reserve1.currency, pairAfter.reserve1.quotient)
      };
      return {
        quote,
        poolAfter: createV2Pool(newPool),
        pool
      };
    },
    estimateGasCostForQuote: () => {
      return BASE_SWAP_COST_V2 + COST_PER_EXTRA_HOP_V2;
    }
  };
  return pool;
}

// src/transformer.ts
function toSerializableV2Pool(v2Pool) {
  const pool = v2Pool.getPoolData();
  return {
    ...pool,
    reserve0: routingSdk.toSerializableCurrencyAmount(pool.reserve0),
    reserve1: routingSdk.toSerializableCurrencyAmount(pool.reserve1)
  };
}
function parseV2Pool(chainId, pool) {
  const poolData = {
    ...pool,
    reserve0: routingSdk.parseCurrencyAmount(chainId, pool.reserve0),
    reserve1: routingSdk.parseCurrencyAmount(chainId, pool.reserve1)
  };
  return createV2Pool(poolData);
}

// src/utils/isV2Pool.ts
function isV2Pool(p) {
  return p.type === V2_POOL_TYPE;
}

exports.BASE_SWAP_COST_V2 = BASE_SWAP_COST_V2;
exports.COST_PER_EXTRA_HOP_STABLE_SWAP = COST_PER_EXTRA_HOP_STABLE_SWAP;
exports.COST_PER_EXTRA_HOP_V2 = COST_PER_EXTRA_HOP_V2;
exports.V2_POOL_TYPE = V2_POOL_TYPE;
exports.createV2Pool = createV2Pool;
exports.isV2Pool = isV2Pool;
exports.parseV2Pool = parseV2Pool;
exports.toSerializableV2Pool = toSerializableV2Pool;
//# sourceMappingURL=out.js.map
//# sourceMappingURL=index.js.map