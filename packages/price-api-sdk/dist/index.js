import { isTestnetChainId } from '@pancakeswap/chains';
import { ExclusiveDutchOrder, createExclusiveDutchOrderTrade } from '@pancakeswap/pcsx-sdk';
import { PoolType, V4Router } from '@pancakeswap/smart-router';
import { TradeType } from '@pancakeswap/swap-sdk-core';

// src/getCurrencyPrice.ts
var WALLET_API = "https://wallet-api.pancakeswap.com/v1/prices/list/";
var zeroAddress = "0x0000000000000000000000000000000000000000";
function getCurrencyKey(currencyParams) {
  if (!currencyParams) {
    return void 0;
  }
  if ("isNative" in currencyParams && currencyParams.isNative === true) {
    return `${currencyParams.chainId}:${zeroAddress}`;
  }
  const { chainId, address } = currencyParams;
  return `${chainId}:${address.toLowerCase()}`;
}
function getCurrencyListKey(currencyListParams) {
  if (!currencyListParams) {
    return void 0;
  }
  const currencyKeys = currencyListParams.map(getCurrencyKey).filter((key) => !!key);
  const uniqueKeys = [...new Set(currencyKeys)];
  return uniqueKeys.join(",");
}
function getRequestUrl(params) {
  if (!params) {
    return void 0;
  }
  const infoList = Array.isArray(params) ? params : [params];
  const key = getCurrencyListKey(infoList.filter((c) => !isTestnetChainId(c.chainId)));
  if (!key) {
    return void 0;
  }
  const encodedKey = encodeURIComponent(key);
  return `${WALLET_API}${encodedKey}`;
}
async function getCurrencyUsdPrice(currencyParams, options) {
  if (!currencyParams || isTestnetChainId(currencyParams.chainId)) {
    return 0;
  }
  const prices = await getCurrencyListUsdPrice([currencyParams], options);
  const key = getCurrencyKey(currencyParams);
  return (key && prices[key]) ?? 0;
}
async function getCurrencyListUsdPrice(currencyListParams, options) {
  const requestUrl = getRequestUrl(currencyListParams);
  if (!requestUrl || !currencyListParams) {
    throw new Error(`Invalid request for currency prices, request url: ${requestUrl}`);
  }
  const res = await fetch(requestUrl, options);
  const data = await res.json();
  return data;
}
async function getTokenPrices(chainId, addresses, options) {
  const requestParams = addresses.map((address) => ({
    address,
    chainId
  }));
  const prices = await getCurrencyListUsdPrice(requestParams, options);
  return addresses.map((address) => {
    const key = getCurrencyKey({
      address,
      chainId
    });
    const priceUSD = (key && prices[key]) ?? 0;
    return { address, priceUSD };
  });
}
async function getNativeTokenPrices(chainIds, options) {
  const requestParams = chainIds.map((chainId) => ({
    isNative: true,
    chainId
  }));
  const prices = await getCurrencyListUsdPrice(requestParams, options);
  return chainIds.reduce((acc, chainId) => {
    const key = getCurrencyKey({
      chainId,
      isNative: true
    });
    acc.set(chainId, (key && prices[key]) ?? 0);
    return acc;
  }, /* @__PURE__ */ new Map());
}

// src/types/api.ts
var ResponseType = /* @__PURE__ */ ((ResponseType2) => {
  ResponseType2["PRICE_RESPONSE"] = "PRICE_RESPONSE";
  ResponseType2["MM_PRICE_RESPONSE"] = "MM_PRICE_RESPONSE";
  ResponseType2["DUTCH_LIMIT_RESPONSE"] = "DUTCH_LIMIT_RESPONSE";
  ResponseType2["AMM_PRICE_RESPONSE"] = "AMM_PRICE_RESPONSE";
  ResponseType2["ERROR"] = "ERROR";
  return ResponseType2;
})(ResponseType || {});

// src/types/orderType.ts
var OrderType = /* @__PURE__ */ ((OrderType2) => {
  OrderType2["DUTCH_LIMIT"] = "DUTCH_LIMIT";
  OrderType2["PCS_CLASSIC"] = "PCS_CLASSIC";
  return OrderType2;
})(OrderType || {});
function getPoolType(type) {
  return PoolType[type];
}
function getPoolTypeKey(poolType) {
  for (const [key, value] of Object.entries(PoolType)) {
    if (value === poolType) {
      return key;
    }
  }
  throw new Error(`Invalid pool type: ${poolType}`);
}
function getTradeTypeKey(tradeType) {
  for (const [key, value] of Object.entries(TradeType)) {
    if (value === tradeType) {
      return key;
    }
  }
  throw new Error(`Invalid trade type: ${tradeType}`);
}

// src/orderPriceApiParsers.ts
var getCurrencyIdentifier = (currency) => currency.isNative ? zeroAddress : currency.wrapped.address;
function getRequestBody({ amount, quoteCurrency, tradeType, amm, x, slippage }) {
  const [currencyIn, currencyOut] = tradeType === TradeType.EXACT_INPUT ? [amount.currency, quoteCurrency] : [quoteCurrency, amount.currency];
  const configs = [];
  if (amm) {
    configs.push({
      protocols: amm.poolTypes?.map(getPoolTypeKey) || ["V2", "V3", "STABLE"],
      routingType: "PCS_CLASSIC" /* PCS_CLASSIC */,
      gasPriceWei: amm.gasPriceWei?.toString(),
      maxHops: amm.maxHops,
      maxSplits: amm.maxSplits
    });
  }
  if (x) {
    configs.push({
      routingType: "DUTCH_LIMIT" /* DUTCH_LIMIT */,
      ...x
    });
  }
  return {
    amount: amount.quotient.toString(),
    type: getTradeTypeKey(tradeType),
    tokenInChainId: currencyIn.chainId,
    tokenOutChainId: currencyOut.chainId,
    slippageTolerance: slippage?.toFixed(2),
    tokenIn: getCurrencyIdentifier(currencyIn),
    tokenOut: getCurrencyIdentifier(currencyOut),
    configs
  };
}
function parseQuoteResponse(res, {
  chainId,
  currencyOut,
  currencyIn,
  tradeType
}) {
  if (res.messageType === "ERROR" /* ERROR */) {
    throw new Error(res.message.error);
  }
  const { bestOrder, allPossibleOrders } = res.message;
  if (bestOrder.type === "PCS_CLASSIC" /* PCS_CLASSIC */) {
    return {
      type: "PCS_CLASSIC" /* PCS_CLASSIC */,
      trade: V4Router.Transformer.parseTrade(chainId, bestOrder.order)
    };
  }
  if (bestOrder.type === "DUTCH_LIMIT" /* DUTCH_LIMIT */) {
    const order = ExclusiveDutchOrder.fromJSON(bestOrder.order.orderInfo, chainId);
    const otherAmmTrade = allPossibleOrders.find((o) => o.type === "PCS_CLASSIC" /* PCS_CLASSIC */);
    return {
      type: "DUTCH_LIMIT" /* DUTCH_LIMIT */,
      ammTrade: otherAmmTrade ? V4Router.Transformer.parseTrade(chainId, otherAmmTrade.order) : void 0,
      trade: createExclusiveDutchOrderTrade({
        currencyIn,
        currenciesOut: [currencyOut],
        orderInfo: order.info,
        tradeType
      })
    };
  }
  throw new Error(`Unknown order type`);
}
function parseAMMPriceResponse(chainId, res) {
  const {
    message: { gasUseEstimateUSD, ...rest }
  } = res;
  const trade = V4Router.Transformer.parseTrade(chainId, rest);
  return {
    ...trade,
    gasUseEstimateUSD: Number(gasUseEstimateUSD)
  };
}

export { OrderType, ResponseType, getCurrencyKey, getCurrencyListKey, getCurrencyListUsdPrice, getCurrencyUsdPrice, getNativeTokenPrices, getPoolType, getPoolTypeKey, getRequestBody, getTokenPrices, parseAMMPriceResponse, parseQuoteResponse, zeroAddress };
//# sourceMappingURL=out.js.map
//# sourceMappingURL=index.js.map