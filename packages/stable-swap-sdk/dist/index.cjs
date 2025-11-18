'use strict';

var swapSdkCore = require('@pancakeswap/swap-sdk-core');
var invariant = require('tiny-invariant');
var sdk = require('@pancakeswap/sdk');
var chains = require('@pancakeswap/chains');

function _interopDefault (e) { return e && e.__esModule ? e : { default: e }; }

var invariant__default = /*#__PURE__*/_interopDefault(invariant);

// src/amm/getLPOutputWithoutFee.ts
function getD({ amplifier, balances }) {
  const numOfCoins = balances.length;
  invariant__default.default(numOfCoins > 1, "To get constant D, pool should have at least two coins.");
  const sum = balances.reduce((s, cur) => s + BigInt(cur), swapSdkCore.ZERO);
  if (sum === swapSdkCore.ZERO) {
    return swapSdkCore.ZERO;
  }
  const n = BigInt(numOfCoins);
  const precision = swapSdkCore.ONE;
  const ann = BigInt(amplifier) * n;
  let dPrev = swapSdkCore.ZERO;
  let d = sum;
  for (let i = 0; i < 255; i += 1) {
    let dp = d;
    for (const b of balances) {
      dp = dp * d / (BigInt(b) * n + 1n);
    }
    dPrev = d;
    d = (ann * sum + dp * n) * d / ((ann - swapSdkCore.ONE) * d + (n + swapSdkCore.ONE) * dp);
    if (d > dPrev && d - dPrev <= precision) {
      break;
    }
    if (d <= dPrev && dPrev - d <= precision) {
      break;
    }
  }
  return d;
}
function getY({ amplifier, balances, i, j, x }) {
  const numOfCoins = balances.length;
  invariant__default.default(numOfCoins > 1, "To get y, pool should have at least two coins.");
  invariant__default.default(i !== j && i >= 0 && j >= 0 && i < numOfCoins && j < numOfCoins, `Invalid i: ${i} and j: ${j}`);
  const n = BigInt(numOfCoins);
  const d = getD({ amplifier, balances });
  let sum = swapSdkCore.ZERO;
  let c = d;
  const ann = BigInt(amplifier) * n;
  for (const [index, b2] of balances.entries()) {
    if (index === j) {
      continue;
    }
    let balanceAfterDeposit = BigInt(b2);
    if (index === i) {
      balanceAfterDeposit += BigInt(x);
    }
    invariant__default.default(balanceAfterDeposit > swapSdkCore.ZERO, "Insufficient liquidity");
    sum += balanceAfterDeposit;
    c = c * d / (balanceAfterDeposit * n);
  }
  c = c * d / (ann * n);
  const b = sum + d / ann;
  const precision = swapSdkCore.ONE;
  let yPrev = swapSdkCore.ZERO;
  let y = d;
  for (let k = 0; k < 255; k += 1) {
    yPrev = y;
    y = (y * y + c) / (2n * y + b - d);
    if (y > yPrev && y - yPrev <= precision) {
      break;
    }
    if (y <= yPrev && yPrev - y <= precision) {
      break;
    }
  }
  return y;
}
var PRECISION = 10n ** 18n;
var getRawAmount = (amount) => {
  return amount.quotient * PRECISION / 10n ** BigInt(amount.currency.decimals);
};
var parseAmount = (currency, rawAmount) => {
  return swapSdkCore.CurrencyAmount.fromRawAmount(currency, rawAmount * 10n ** BigInt(currency.decimals) / PRECISION);
};

// src/amm/getLPOutput.ts
function getLPOutput({
  amplifier,
  balances,
  totalSupply,
  amounts,
  fee
}) {
  const lpToken = totalSupply.currency;
  const lpTotalSupply = totalSupply.quotient;
  if (lpTotalSupply === swapSdkCore.ZERO || !balances.length || balances.every((b) => b.quotient === swapSdkCore.ZERO)) {
    const d = getD({ amplifier, balances: amounts.map(getRawAmount) });
    return swapSdkCore.CurrencyAmount.fromRawAmount(lpToken, d);
  }
  const currentBalances = [];
  const newBalances = [];
  for (const [i, balance] of balances.entries()) {
    const amount = amounts[i] || swapSdkCore.CurrencyAmount.fromRawAmount(balance.currency, 0);
    invariant__default.default(
      amount.currency.wrapped.equals(balance.currency.wrapped),
      "User input currency should be the same as pool balance currency."
    );
    const balanceRaw = getRawAmount(balance);
    const amountRaw = getRawAmount(amount);
    currentBalances.push(balanceRaw);
    newBalances.push(balanceRaw + amountRaw);
  }
  const d0 = getD({ amplifier, balances: currentBalances });
  const d1 = getD({ amplifier, balances: newBalances });
  invariant__default.default(d1 >= d0, "D1 should be greater than or equal than d0.");
  const isFirstSupply = lpTotalSupply <= swapSdkCore.ZERO;
  if (isFirstSupply) {
    return swapSdkCore.CurrencyAmount.fromRawAmount(totalSupply.currency, d1);
  }
  const n = currentBalances.length;
  const eachTokenFee = fee.multiply(n).divide(4 * (n - 1));
  let d2 = d1;
  for (const [i, b] of currentBalances.entries()) {
    const idealBalance = d1 * b / d0;
    let diff = swapSdkCore.ZERO;
    if (idealBalance > newBalances[i]) {
      diff = idealBalance - newBalances[i];
    } else {
      diff = newBalances[i] - idealBalance;
    }
    const feeAmount = eachTokenFee.multiply(diff).quotient;
    newBalances[i] = newBalances[i] - feeAmount;
  }
  d2 = getD({ amplifier, balances: newBalances });
  const expectedMintLP = lpTotalSupply * (d2 - d0) / d0;
  return swapSdkCore.CurrencyAmount.fromRawAmount(totalSupply.currency, expectedMintLP);
}

// src/amm/getLPOutputWithoutFee.ts
function getLPOutputWithoutFee(params) {
  return getLPOutput({ ...params, fee: new swapSdkCore.Percent(0) });
}

// src/config/endpoint.ts
var STABLE_SWAP_API = "https://configs.pancakeswap.com/api/data/cached/stableswaps";
var isStableSwapSupported = (chainId) => {
  if (!chainId) {
    return false;
  }
  return STABLE_SUPPORTED_CHAIN_IDS.includes(chainId);
};
var STABLE_SUPPORTED_CHAIN_IDS = [
  chains.ChainId.BSC,
  chains.ChainId.BSC_TESTNET,
  chains.ChainId.ARBITRUM_ONE,
  chains.ChainId.ETHEREUM
];

// src/constants/pools/index.ts
var stableSwapCache = {};
var inProgressFetches = {};
var fetchStableSwapData = async (chainId) => {
  const cacheKey = `${chainId}-all`;
  if (stableSwapCache[cacheKey]) {
    return stableSwapCache[cacheKey];
  }
  if (inProgressFetches[cacheKey]) {
    return inProgressFetches[cacheKey];
  }
  inProgressFetches[cacheKey] = fetch(`${STABLE_SWAP_API}?chainId=${chainId}`, {
    signal: AbortSignal.timeout(3e3)
  }).then((response) => response.json()).then((result) => {
    const newData = result.map((p) => ({
      ...p,
      token: new sdk.ERC20Token(
        p.token.chainId,
        p.token.address,
        p.token.decimals,
        p.token.symbol,
        p.token.name,
        p.token.projectLink
      ),
      quoteToken: new sdk.ERC20Token(
        p.quoteToken.chainId,
        p.quoteToken.address,
        p.quoteToken.decimals,
        p.quoteToken.symbol,
        p.quoteToken.name,
        p.quoteToken.projectLink
      )
    }));
    stableSwapCache[cacheKey] = newData;
    return newData;
  }).catch(() => {
    return [];
  }).finally(() => {
    delete inProgressFetches[cacheKey];
  });
  return inProgressFetches[cacheKey];
};
async function getStableSwapPools(chainId) {
  if (!isStableSwapSupported(chainId)) {
    return [];
  }
  const stableSwapData = await fetchStableSwapData(chainId);
  return stableSwapData;
}

// src/constants/index.ts
var ONE_HUNDRED_PERCENT = new swapSdkCore.Percent("1");

// src/amm/getSwapOutput.ts
function getSwapOutput({
  amplifier,
  balances: balanceAmounts,
  outputCurrency,
  amount,
  fee
}) {
  const validateAmountOut = (a) => invariant__default.default(!a.lessThan(swapSdkCore.ZERO), "Insufficient liquidity to perform the swap");
  let i = null;
  let j = null;
  const balances = [];
  for (const [index, b] of balanceAmounts.entries()) {
    balances.push(getRawAmount(b));
    if (b.currency.wrapped.equals(amount.currency.wrapped)) {
      i = index;
      continue;
    }
    if (b.currency.wrapped.equals(outputCurrency.wrapped)) {
      j = index;
      continue;
    }
  }
  invariant__default.default(
    i !== null && j !== null && i !== j,
    "Input currency or output currency does not match currencies of token balances."
  );
  if (amount.quotient < swapSdkCore.ZERO) {
    const x = ONE_HUNDRED_PERCENT.subtract(fee).invert().multiply(getRawAmount(amount)).quotient;
    const y2 = getY({ amplifier, balances, i, j, x });
    const dy2 = y2 - balances[j];
    const amountOut2 = parseAmount(outputCurrency, dy2);
    validateAmountOut(amountOut2);
    return amountOut2;
  }
  const y = getY({ amplifier, balances, i, j, x: getRawAmount(amount) });
  const dy = balances[j] - y;
  const feeAmount = fee.multiply(dy).quotient;
  const amountOut = parseAmount(outputCurrency, dy - feeAmount);
  validateAmountOut(amountOut);
  return amountOut;
}
function getSwapOutputWithoutFee(params) {
  return getSwapOutput({ ...params, fee: new swapSdkCore.Percent(0) });
}
function getSwapInput({ amount, ...rest }) {
  return getSwapOutput({
    ...rest,
    amount: swapSdkCore.CurrencyAmount.fromRawAmount(amount.currency, -amount.quotient)
  });
}
function getSwapInputWithtouFee(params) {
  return getSwapInput({ ...params, fee: new swapSdkCore.Percent(0) });
}
function createQuoteGetter(isExactIn) {
  const getSwapQuote = isExactIn ? getSwapOutput : getSwapInput;
  const applySwap = (balances, amount, quote) => balances.map((b) => {
    if (b.currency.equals(amount.currency)) {
      return isExactIn ? b.add(amount) : b.subtract(amount);
    }
    if (b.currency.equals(quote.currency)) {
      return isExactIn ? b.subtract(quote) : b.add(quote);
    }
    return b;
  });
  return function getQuote(params) {
    const { balances, amplifier, fee, amount } = params;
    const quote = getSwapQuote(params);
    return [
      quote,
      {
        balances: applySwap(balances, amount, quote),
        amplifier,
        fee
      }
    ];
  };
}
var getQuoteExactIn = createQuoteGetter(true);
var getQuoteExactOut = createQuoteGetter(false);

exports.ONE_HUNDRED_PERCENT = ONE_HUNDRED_PERCENT;
exports.STABLE_SUPPORTED_CHAIN_IDS = STABLE_SUPPORTED_CHAIN_IDS;
exports.fetchStableSwapData = fetchStableSwapData;
exports.getD = getD;
exports.getLPOutput = getLPOutput;
exports.getLPOutputWithoutFee = getLPOutputWithoutFee;
exports.getQuoteExactIn = getQuoteExactIn;
exports.getQuoteExactOut = getQuoteExactOut;
exports.getStableSwapPools = getStableSwapPools;
exports.getSwapInput = getSwapInput;
exports.getSwapInputWithtouFee = getSwapInputWithtouFee;
exports.getSwapOutput = getSwapOutput;
exports.getSwapOutputWithoutFee = getSwapOutputWithoutFee;
exports.isStableSwapSupported = isStableSwapSupported;
//# sourceMappingURL=out.js.map
//# sourceMappingURL=index.cjs.map