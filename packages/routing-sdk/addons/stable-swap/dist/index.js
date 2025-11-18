'use strict';

var swapSdkCore = require('@pancakeswap/swap-sdk-core');
var routingSdk = require('@pancakeswap/routing-sdk');
var stableSwapSdk = require('@pancakeswap/stable-swap-sdk');
var invariant = require('tiny-invariant');

function _interopDefault (e) { return e && e.__esModule ? e : { default: e }; }

var invariant__default = /*#__PURE__*/_interopDefault(invariant);

// src/constants/poolType.ts
var STABLE_POOL_TYPE = "STABLE";

// src/constants/gasCost.ts
var BASE_SWAP_COST_STABLE_SWAP = 180000n;
var COST_PER_EXTRA_HOP_STABLE_SWAP = 70000n;

// ../../../utils/viem/parseUnits.ts
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

// ../../../utils/tryParseAmount.ts
function tryParseAmount(value, currency) {
  if (!value || !currency) {
    return void 0;
  }
  try {
    const typedValueParsed = parseUnits(value, currency.decimals).toString();
    if (typedValueParsed !== "0") {
      return swapSdkCore.CurrencyAmount.fromRawAmount(currency, BigInt(typedValueParsed));
    }
  } catch (error) {
    console.debug(`Failed to parse input amount: "${value}"`, error);
  }
  return void 0;
}
var tryParseAmount_default = tryParseAmount;
function createStablePool(params) {
  let p = { ...params, type: STABLE_POOL_TYPE };
  const pool = {
    type: STABLE_POOL_TYPE,
    getReserve: (c) => {
      const reserve = p.balances.find((b) => b.currency.wrapped.equals(c.wrapped));
      invariant__default.default(reserve !== void 0, "NO_RESERVE_FOUND");
      return reserve;
    },
    getCurrentPrice: (base, quote) => {
      const { amplifier, balances, fee } = p;
      const baseIn = tryParseAmount_default("1", base);
      if (!baseIn) {
        throw new Error(`Cannot parse amount for ${base.symbol}`);
      }
      const quoteOut = stableSwapSdk.getSwapOutput({
        amplifier,
        balances,
        fee,
        outputCurrency: quote,
        amount: baseIn
      });
      return new swapSdkCore.Price({
        baseAmount: baseIn,
        quoteAmount: quoteOut
      });
    },
    getTradingPairs: () => {
      const pairs = [];
      const size = p.balances.length;
      for (let i = 0; i < size - 1; i += 1) {
        for (let j = i + 1; j < size; j += 1) {
          pairs.push([p.balances[i].currency, p.balances[j].currency]);
        }
      }
      return pairs;
    },
    getId: () => p.address,
    update: (poolData) => {
      p = { ...p, ...poolData };
    },
    log: () => `Stable Swap ${p.balances.map((b) => b.currency.symbol).join(" - ")} (${p.address}`,
    getPoolData: () => p,
    getQuote: ({ amount, isExactIn, quoteCurrency }) => {
      const getQuote = isExactIn ? stableSwapSdk.getQuoteExactIn : stableSwapSdk.getQuoteExactOut;
      const { amplifier, balances, fee } = p;
      const [quote, { balances: newBalances }] = getQuote({
        amount,
        balances,
        amplifier,
        outputCurrency: quoteCurrency,
        fee
      });
      const newPoolData = { ...p, balances: newBalances };
      return {
        poolAfter: createStablePool(newPoolData),
        quote,
        pool
      };
    },
    estimateGasCostForQuote: () => {
      return BASE_SWAP_COST_STABLE_SWAP + COST_PER_EXTRA_HOP_STABLE_SWAP;
    }
  };
  return pool;
}

// src/transformer.ts
var ONE_HUNDRED = 100n;
function toSerializableStablePool(stablePool) {
  const pool = stablePool.getPoolData();
  return {
    ...pool,
    balances: pool.balances.map(routingSdk.toSerializableCurrencyAmount),
    amplifier: pool.amplifier.toString(),
    fee: pool.fee.toSignificant(6)
  };
}
function parseStablePool(chainId, pool) {
  const poolData = {
    ...pool,
    balances: pool.balances.map((b) => routingSdk.parseCurrencyAmount(chainId, b)),
    amplifier: BigInt(pool.amplifier),
    fee: new swapSdkCore.Percent(parseFloat(pool.fee) * 1e6, ONE_HUNDRED * 1000000n)
  };
  return createStablePool(poolData);
}

// src/utils/isStablePool.ts
function isStablePool(p) {
  return p.type === STABLE_POOL_TYPE;
}

exports.BASE_SWAP_COST_STABLE_SWAP = BASE_SWAP_COST_STABLE_SWAP;
exports.COST_PER_EXTRA_HOP_STABLE_SWAP = COST_PER_EXTRA_HOP_STABLE_SWAP;
exports.STABLE_POOL_TYPE = STABLE_POOL_TYPE;
exports.createStablePool = createStablePool;
exports.isStablePool = isStablePool;
exports.parseStablePool = parseStablePool;
exports.toSerializableStablePool = toSerializableStablePool;
//# sourceMappingURL=out.js.map
//# sourceMappingURL=index.js.map