'use strict';

var swapSdkCore = require('@pancakeswap/swap-sdk-core');
var memoize = require('lodash/memoize.js');
var invariant3 = require('tiny-invariant');
var swapSdkEvm = require('@pancakeswap/swap-sdk-evm');

function _interopDefault (e) { return e && e.__esModule ? e : { default: e }; }

var memoize__default = /*#__PURE__*/_interopDefault(memoize);
var invariant3__default = /*#__PURE__*/_interopDefault(invariant3);

// src/graph/vertice.ts
function getWrappedCurrencyKey(c) {
  return `${c.chainId}-${swapSdkCore.getCurrencyAddress(c.wrapped)}`;
}
function getVerticeKey(vertice) {
  return getWrappedCurrencyKey(vertice.currency);
}

// src/graph/edge.ts
function getNeighbour(e, v) {
  return e.vertice0.currency.equals(v.currency) ? e.vertice1 : e.vertice0;
}
function getEdgeKey(p, vertA, vertB) {
  const [vert0, vert1] = vertA.currency.sortsBefore(vertB.currency) ? [vertA, vertB] : [vertB, vertA];
  return `${getVerticeKey(vert0)}-${getVerticeKey(vert1)}-${p.getId()}`;
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
    const pairs = p.getTradingPairs();
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
    return verticeMap.get(getWrappedCurrencyKey(c));
  }
  function getEdge(p, vert0, vert1) {
    return edgeMap.get(getEdgeKey(p, vert0, vert1));
  }
  function createVertice(c) {
    const vert = getVertice(c);
    if (vert) {
      return vert;
    }
    const vertice = { currency: c.wrapped, edges: [] };
    verticeMap.set(getWrappedCurrencyKey(c), vertice);
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
  const hasValidRouteToVerticeWithinHops = memoize__default.default(
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
    (v1, v2, hops) => `${getVerticeKey(v1)}-${getVerticeKey(v2)}-${hops}`
  );
  return {
    hasValidRouteToVerticeWithinHops,
    vertices: Array.from(verticeMap.values()),
    edges: Array.from(edgeMap.values()),
    getVertice,
    getEdge,
    applySwap: async ({ isExactIn, route }) => {
      function* loopPools() {
        let i = isExactIn ? 0 : route.pools.length - 1;
        const getNext = () => isExactIn ? i + 1 : i - 1;
        const hasNext = isExactIn ? () => i < route.pools.length : () => i >= 0;
        for (; hasNext(); i = getNext()) {
          yield i;
        }
      }
      const amount = isExactIn ? route.inputAmount : route.outputAmount;
      invariant3__default.default(amount !== void 0, "[Apply swap]: Invalid base amount");
      let quote = amount;
      let gasUseEstimate = 0n;
      for (const i of loopPools()) {
        const vertA = getVertice(route.path[i]);
        const vertB = getVertice(route.path[i + 1]);
        const p = route.pools[i];
        invariant3__default.default(
          vertA !== void 0 && vertB !== void 0 && p !== void 0,
          "[Apply swap]: Invalid vertice and pool"
        );
        const edge = getEdge(p, vertA, vertB);
        invariant3__default.default(edge !== void 0, "[Apply swap]: No valid edge found");
        const quoteCurrency = quote.currency.wrapped.equals(vertA.currency.wrapped) ? vertB.currency : vertA.currency;
        const quoteResult = edge.pool.getQuote({
          amount: quote,
          isExactIn,
          quoteCurrency
        });
        invariant3__default.default(quoteResult !== void 0, "[Apply swap]: Failed to get quote");
        edge.pool = quoteResult.poolAfter;
        quote = quoteResult.quote;
        gasUseEstimate += edge.pool.estimateGasCostForQuote(quoteResult);
      }
      return {
        amount,
        quote,
        gasUseEstimate
      };
    }
  };
}
function createPriceCalculator({ graph, quote, gasPriceWei }) {
  const { chainId } = quote.currency;
  const priceMap = /* @__PURE__ */ new Map();
  const priceSources = /* @__PURE__ */ new Map();
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
  priceMap.set(quote, new swapSdkCore.Price(quote.currency, quote.currency, 1, 1));
  nextEdges = getNextEdges(quote);
  processedVert.add(quote);
  while (nextEdges.length) {
    const bestEdge = nextEdges.pop();
    const [vFrom, vTo] = processedVert.has(bestEdge.vertice1) ? [bestEdge.vertice1, bestEdge.vertice0] : [bestEdge.vertice0, bestEdge.vertice1];
    if (processedVert.has(vTo))
      continue;
    const p = bestEdge.pool.getCurrentPrice(vTo.currency, vFrom.currency);
    const vFromQuotePrice = getQuotePrice(vFrom);
    invariant3__default.default(vFromQuotePrice !== void 0, "Invalid quote price");
    priceMap.set(vTo, p.wrapped.multiply(vFromQuotePrice));
    priceSources.set(vTo, [...priceSources.get(vFrom) || [], bestEdge]);
    nextEdges = getNextEdges(vTo);
    processedVert.add(vTo);
  }
  const wnative = swapSdkEvm.Native.onChain(chainId).wrapped;
  const nativeVertice = graph.getVertice(wnative);
  if (!nativeVertice) {
    throw new Error("No valid native currency price found");
  }
  const nativePriceInQuote = getQuotePrice(nativeVertice);
  const gasPriceInQuote = nativePriceInQuote?.quote(swapSdkCore.CurrencyAmount.fromRawAmount(wnative, gasPriceWei));
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
      const tokenReserve = e.pool.getReserve(v.currency);
      invariant3__default.default(tokenReserve !== void 0, "Unexpected empty token reserve");
      const liquidity = price.quote(tokenReserve.wrapped).quotient;
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
    return priceMap.get(base)?.wrapped;
  }
  function getGasPriceInBase(base) {
    const basePrice = getQuotePrice(base);
    return gasPriceInQuote ? basePrice?.invert().quote(gasPriceInQuote) : void 0;
  }
  function getPriceSources(v) {
    return priceSources.get(v) || [];
  }
  return {
    graph,
    getGasPriceInBase,
    getQuotePrice,
    getPrice,
    getPriceSources
  };
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

// src/route.ts
function isSameRoute(one, another) {
  if (one.pools.length !== another.pools.length) {
    return false;
  }
  for (const [index, p] of one.pools.entries()) {
    if (p.type !== another.pools[index].type) {
      return false;
    }
    if (p.getId() !== another.pools[index].getId()) {
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
    gasUseEstimateBase: another.gasUseEstimateBase ? one.gasUseEstimateBase.add(another.gasUseEstimateBase) : one.gasUseEstimateBase,
    gasUseEstimateQuote: another.gasUseEstimateQuote ? one.gasUseEstimateQuote.add(another.gasUseEstimateQuote) : one.gasUseEstimateQuote,
    gasUseEstimate: one.gasUseEstimate + another.gasUseEstimate,
    inputAmountWithGasAdjusted: another.inputAmountWithGasAdjusted ? one.inputAmountWithGasAdjusted?.add(another.inputAmountWithGasAdjusted) : one.inputAmountWithGasAdjusted,
    outputAmountWithGasAdjusted: another.outputAmountWithGasAdjusted ? one.outputAmountWithGasAdjusted?.add(another.outputAmountWithGasAdjusted) : one.outputAmountWithGasAdjusted,
    percent: one.percent + another.percent
  };
}

// src/utils/groupPoolsByType.ts
function groupPoolsByType(pools) {
  const poolsByType = /* @__PURE__ */ new Map();
  for (const pool of pools) {
    poolsByType.set(pool.type, [...poolsByType.get(pool.type) || [], pool]);
  }
  return Array.from(poolsByType.values());
}
function isTradeBetter(tradeA, tradeB) {
  const isExactIn = tradeA.tradeType === swapSdkCore.TradeType.EXACT_INPUT;
  if (isExactIn) {
    return tradeA.outputAmountWithGasAdjusted.greaterThan(tradeB.outputAmountWithGasAdjusted);
  }
  return tradeA.inputAmountWithGasAdjusted.lessThan(tradeB.inputAmountWithGasAdjusted);
}
function getBetterTrade(tradeA, tradeB) {
  if (!tradeA && !tradeB)
    return void 0;
  if (!tradeA && tradeB)
    return tradeB;
  if (tradeA && !tradeB)
    return tradeA;
  if (isTradeBetter(tradeB, tradeA)) {
    return tradeB;
  }
  return tradeA;
}

// src/utils/logCurrency.ts
function logCurrency(c) {
  return `${c.chainId}_${c.isNative}_${c.wrapped.address}`;
}

// src/constants.ts
var ADDRESS_ZERO = "0x0000000000000000000000000000000000000000";

// src/utils/transformer.ts
function toSerializableCurrency(currency) {
  return {
    address: currency.isNative ? ADDRESS_ZERO : currency.wrapped.address,
    decimals: currency.decimals,
    symbol: currency.symbol
  };
}
function toSerializableCurrencyAmount(amount) {
  return {
    currency: toSerializableCurrency(amount.currency),
    value: amount.quotient.toString()
  };
}
function toSerializableRoute(route, { toSerializablePool }) {
  return {
    ...route,
    pools: route.pools.map(toSerializablePool),
    path: route.path.map(toSerializableCurrency),
    inputAmount: toSerializableCurrencyAmount(route.inputAmount),
    outputAmount: toSerializableCurrencyAmount(route.outputAmount),
    gasUseEstimate: String(route.gasUseEstimate),
    gasUseEstimateBase: toSerializableCurrencyAmount(route.gasUseEstimateBase),
    gasUseEstimateQuote: toSerializableCurrencyAmount(route.gasUseEstimateQuote),
    inputAmountWithGasAdjusted: toSerializableCurrencyAmount(route.inputAmountWithGasAdjusted),
    outputAmountWithGasAdjusted: toSerializableCurrencyAmount(route.outputAmountWithGasAdjusted)
  };
}
function toSerializableTrade(trade, config) {
  return {
    ...trade,
    inputAmount: toSerializableCurrencyAmount(trade.inputAmount),
    outputAmount: toSerializableCurrencyAmount(trade.outputAmount),
    routes: trade.routes.map((route) => toSerializableRoute(route, config)),
    gasUseEstimate: String(trade.gasUseEstimate),
    gasUseEstimateBase: toSerializableCurrencyAmount(trade.gasUseEstimateBase),
    gasUseEstimateQuote: toSerializableCurrencyAmount(trade.gasUseEstimateQuote),
    inputAmountWithGasAdjusted: toSerializableCurrencyAmount(trade.inputAmountWithGasAdjusted),
    outputAmountWithGasAdjusted: toSerializableCurrencyAmount(trade.outputAmountWithGasAdjusted)
  };
}
function parseCurrency(chainId, currency) {
  if (currency.address === ADDRESS_ZERO) {
    return swapSdkEvm.Native.onChain(chainId);
  }
  const { address, decimals, symbol } = currency;
  return new swapSdkEvm.ERC20Token(chainId, address, decimals, symbol);
}
function parseCurrencyAmount(chainId, amount) {
  return swapSdkCore.CurrencyAmount.fromRawAmount(parseCurrency(chainId, amount.currency), amount.value);
}
function parseRoute(chainId, route, { parsePool }) {
  return {
    ...route,
    pools: route.pools.map((p) => parsePool(chainId, p)),
    path: route.path.map((n) => parseCurrency(chainId, n)),
    inputAmount: parseCurrencyAmount(chainId, route.inputAmount),
    outputAmount: parseCurrencyAmount(chainId, route.outputAmount),
    gasUseEstimate: BigInt(route.gasUseEstimate),
    gasUseEstimateBase: parseCurrencyAmount(chainId, route.gasUseEstimateBase),
    gasUseEstimateQuote: parseCurrencyAmount(chainId, route.gasUseEstimateQuote),
    inputAmountWithGasAdjusted: parseCurrencyAmount(chainId, route.inputAmountWithGasAdjusted),
    outputAmountWithGasAdjusted: parseCurrencyAmount(chainId, route.outputAmountWithGasAdjusted)
  };
}
function parseTrade(chainId, trade, config) {
  return {
    ...trade,
    routes: trade.routes.map((r) => parseRoute(chainId, r, config)),
    inputAmount: parseCurrencyAmount(chainId, trade.inputAmount),
    outputAmount: parseCurrencyAmount(chainId, trade.outputAmount),
    gasUseEstimate: BigInt(trade.gasUseEstimate),
    gasUseEstimateBase: parseCurrencyAmount(chainId, trade.gasUseEstimateBase),
    gasUseEstimateQuote: parseCurrencyAmount(chainId, trade.gasUseEstimateQuote),
    inputAmountWithGasAdjusted: parseCurrencyAmount(chainId, trade.inputAmountWithGasAdjusted),
    outputAmountWithGasAdjusted: parseCurrencyAmount(chainId, trade.outputAmountWithGasAdjusted)
  };
}
function getPriceImpact(trade) {
  let spotOutputAmount = swapSdkCore.CurrencyAmount.fromRawAmount(trade.outputAmount.currency.wrapped, 0);
  for (const route of trade.routes) {
    const { inputAmount } = route;
    const midPrice = getMidPrice(route);
    spotOutputAmount = spotOutputAmount.add(midPrice.quote(inputAmount.wrapped));
  }
  const priceImpact = spotOutputAmount.subtract(trade.outputAmount.wrapped).divide(spotOutputAmount);
  return new swapSdkCore.Percent(priceImpact.numerator, priceImpact.denominator);
}
function getMidPrice({ path, pools }) {
  let i = 0;
  let price = null;
  for (const pool of pools) {
    const input = path[i].wrapped;
    const output = path[i + 1].wrapped;
    const poolPrice = pool.getCurrentPrice(input, output);
    price = price ? price.multiply(poolPrice) : poolPrice;
    i += 1;
  }
  if (!price) {
    throw new Error("Get mid price failed");
  }
  return price;
}

// src/stream.ts
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
  const amount = trade.tradeType === swapSdkCore.TradeType.EXACT_INPUT ? inputAmount : outputAmount;
  const bestFlowAmount = Math.sqrt(
    Number(gasUseEstimateBase.toExact()) * Number(amount.toExact()) / Number(formatFraction(priceImpact.asFraction))
  );
  const streams = Math.round(Number(amount.toExact()) / bestFlowAmount);
  if (!Number.isFinite(streams)) {
    return DEFAULT_STREAM;
  }
  return Math.max(1, Math.min(streams, maxStreams));
}

// src/findBestTrade.ts
async function findBestTrade({
  maxSplits,
  ...params
}) {
  const splitDisabled = maxSplits !== void 0 && maxSplits === 0;
  let bestTrade;
  try {
    bestTrade = await findBestTradeByStreams({
      ...params,
      streams: 1
    });
  } catch (e) {
    if (splitDisabled) {
      throw e;
    }
    bestTrade = await findBestTradeByStreams({
      ...params,
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
  const bestTradeWithStreams = await findBestTradeByStreams({
    ...params,
    streams
  });
  return getBetterTrade(bestTrade, bestTradeWithStreams);
}
async function findBestTradeByStreams(params) {
  const { tradeType, candidatePools, ...rest } = params;
  const isExactIn = tradeType === swapSdkCore.TradeType.EXACT_INPUT;
  if (isExactIn) {
    return getBestTrade(params);
  }
  const poolsByType = groupPoolsByType(candidatePools);
  const trades = await Promise.allSettled(
    poolsByType.map((pools) => getBestTrade({ tradeType, candidatePools: pools, ...rest }))
  );
  let bestTrade;
  for (const result of trades) {
    if (result.status === "rejected" || !result.value) {
      continue;
    }
    const { value: trade } = result;
    if (!bestTrade) {
      bestTrade = trade;
      continue;
    }
    bestTrade = getBetterTrade(bestTrade, trade);
  }
  return bestTrade;
}
async function getBestTrade({
  amount: totalAmount,
  candidatePools,
  quoteCurrency,
  gasPriceWei,
  streams,
  graph: graphOverride,
  tradeType,
  maxHops = 10
}) {
  const isExactIn = tradeType === swapSdkCore.TradeType.EXACT_INPUT;
  const baseCurrency = totalAmount.currency;
  const inputCurrency = isExactIn ? baseCurrency : quoteCurrency;
  const outputCurrency = isExactIn ? quoteCurrency : baseCurrency;
  const graph = graphOverride || createGraph({ pools: candidatePools });
  const amounts = getStreamedAmounts(totalAmount, streams);
  const gasPrice = BigInt(typeof gasPriceWei === "function" ? await gasPriceWei() : gasPriceWei);
  const start = graph.getVertice(baseCurrency);
  const finish = graph.getVertice(quoteCurrency);
  if (!start || !finish) {
    throw new Error(`Invalid start vertice or finish vertice. Start ${start}, finish ${finish}`);
  }
  const priceCalculator = createPriceCalculator({
    quote: start,
    gasPriceWei: gasPrice,
    graph
  });
  const adjustQuoteByGas = (quote, gasCostInQuote) => isExactIn ? quote.subtract(gasCostInQuote) : quote.add(gasCostInQuote);
  const isQuoteBetter = (quote, compareTo) => isExactIn ? quote.greaterThan(compareTo) : quote.lessThan(compareTo);
  const getInputAmount = (amount, quote) => isExactIn ? amount : quote;
  const getOutputAmount = (amount, quote) => isExactIn ? quote : amount;
  const getQuoteAmount = (r) => isExactIn ? r.outputAmount : r.inputAmount;
  const buildTrade = (g, routes2) => {
    const {
      gasEstimate,
      quoteAmount,
      gasCostInQuote,
      gasCostInBase,
      inputAmountWithGasAdjusted,
      outputAmountWithGasAdjusted
    } = routes2.reduce(
      (result, r) => {
        return {
          gasEstimate: result.gasEstimate + r.gasUseEstimate,
          quoteAmount: result.quoteAmount.add(getQuoteAmount(r)),
          gasCostInBase: result.gasCostInBase.add(r.gasUseEstimateBase),
          gasCostInQuote: result.gasCostInQuote.add(r.gasUseEstimateQuote),
          inputAmountWithGasAdjusted: result.inputAmountWithGasAdjusted.add(r.inputAmountWithGasAdjusted),
          outputAmountWithGasAdjusted: result.outputAmountWithGasAdjusted.add(r.outputAmountWithGasAdjusted)
        };
      },
      {
        gasEstimate: 0n,
        quoteAmount: swapSdkCore.CurrencyAmount.fromRawAmount(quoteCurrency, 0),
        gasCostInBase: swapSdkCore.CurrencyAmount.fromRawAmount(baseCurrency, 0),
        gasCostInQuote: swapSdkCore.CurrencyAmount.fromRawAmount(quoteCurrency, 0),
        inputAmountWithGasAdjusted: swapSdkCore.CurrencyAmount.fromRawAmount(inputCurrency, 0),
        outputAmountWithGasAdjusted: swapSdkCore.CurrencyAmount.fromRawAmount(outputCurrency, 0)
      }
    );
    return {
      gasUseEstimateBase: gasCostInBase,
      gasUseEstimateQuote: gasCostInQuote,
      inputAmountWithGasAdjusted,
      outputAmountWithGasAdjusted,
      gasUseEstimate: gasEstimate,
      inputAmount: getInputAmount(totalAmount, quoteAmount),
      outputAmount: getOutputAmount(totalAmount, quoteAmount),
      tradeType,
      graph: g,
      routes: routes2
    };
  };
  async function findBestRoute(amount) {
    invariant3__default.default(start !== void 0 && finish !== void 0, "Invalid start/finish vertice");
    const bestResult = /* @__PURE__ */ new Map();
    const processedVert = /* @__PURE__ */ new Set();
    bestResult.set(start, {
      hops: 0,
      bestAmount: amount.wrapped,
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
    const getBestRoute2 = (vert) => {
      const pools = [];
      const path = [quoteCurrency];
      for (let v = finish; getBestSource(v); v = getNeighbour(getBestSource(v), v)) {
        const bestSource = getBestSource(v);
        invariant3__default.default(bestSource !== void 0, "Invalid best source");
        const neighbour = getNeighbour(bestSource, v);
        const nextCurrency = neighbour === start ? baseCurrency : neighbour.currency;
        if (isExactIn) {
          pools.unshift(bestSource.pool);
          path.unshift(nextCurrency);
        } else {
          pools.push(bestSource.pool);
          path.push(nextCurrency);
        }
      }
      const gasCost = getGasSpent(vert);
      const quoteAmountRaw = getBestAmount(vert);
      invariant3__default.default(quoteAmountRaw !== void 0, "Invalid quote amount");
      const quoteAmount = swapSdkCore.CurrencyAmount.fromRawAmount(quoteCurrency, quoteAmountRaw.quotient);
      const gasCostInBase = getGasCostInCurrency({
        priceCalculator,
        gasCost,
        currency: baseCurrency
      });
      const gasCostInQuote = getGasCostInCurrency({
        priceCalculator,
        gasCost,
        currency: quoteCurrency
      });
      const quoteAmountWithGasAdjusted = swapSdkCore.CurrencyAmount.fromRawAmount(
        quoteCurrency,
        gasCostInQuote ? adjustQuoteByGas(quoteAmount, gasCostInQuote).quotient : 0
      );
      return {
        path,
        pools,
        gasUseEstimate: gasCost,
        inputAmount: getInputAmount(amount, quoteAmount),
        outputAmount: getOutputAmount(amount, quoteAmount),
        inputAmountWithGasAdjusted: getInputAmount(amount, quoteAmountWithGasAdjusted),
        outputAmountWithGasAdjusted: getOutputAmount(amount, quoteAmountWithGasAdjusted),
        gasUseEstimateQuote: gasCostInQuote,
        gasUseEstimateBase: gasCostInBase
      };
    };
    for (; ; ) {
      const { vert, index } = getNextVert();
      if (!vert || index === void 0)
        return void 0;
      if (vert === finish) {
        return getBestRoute2(vert);
      }
      nextVertList.splice(index, 1);
      const currentHop = getHops(vert);
      for (const e of vert.edges) {
        const prevBestSource = getBestSource(vert);
        if (!isExactIn && prevBestSource && e.pool.type !== prevBestSource.pool.type) {
          continue;
        }
        const v2 = vert === e.vertice0 ? e.vertice1 : e.vertice0;
        if (processedVert.has(v2))
          continue;
        if (!graph.hasValidRouteToVerticeWithinHops(v2, finish, maxHops - currentHop - 1)) {
          continue;
        }
        try {
          const bestAmount = getBestAmount(vert);
          invariant3__default.default(bestAmount !== void 0, "Invalid amount");
          const quoteResult = e.pool.getQuote({
            amount: bestAmount,
            isExactIn,
            quoteCurrency: e.vertice0.currency.equals(bestAmount.currency.wrapped) ? e.vertice1.currency : e.vertice0.currency
          });
          invariant3__default.default(quoteResult !== void 0, "Invalid quote result");
          const { quote } = quoteResult;
          const gasPriceInV2 = priceCalculator.getGasPriceInBase(v2);
          invariant3__default.default(gasPriceInV2 !== void 0, "Invalid gas price in v2");
          const gasSpent = e.pool.estimateGasCostForQuote(quoteResult) + getGasSpent(vert);
          const price = priceCalculator.getPrice(v2, finish);
          invariant3__default.default(
            price !== void 0,
            `Failed to get price, base ${v2.currency.symbol}, quote ${finish.currency.symbol}`
          );
          const gasSpentInQuote = price.quote(gasPriceInV2.multiply(gasSpent));
          const newQuote = adjustQuoteByGas(price.quote(quote.wrapped), gasSpentInQuote);
          const bestSource = getBestSource(v2);
          const v2BestQuote = getBestQuote(v2);
          if (!bestSource)
            nextVertList.push(v2);
          if (!bestSource || !v2BestQuote || isQuoteBetter(newQuote, v2BestQuote)) {
            bestResult.set(v2, {
              hops: currentHop + 1,
              gasSpent,
              bestAmount: quote.wrapped,
              bestSource: e,
              bestQuote: newQuote.wrapped
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
    invariant3__default.default(
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
  const finalGraph = createGraph({
    graph: graphOverride,
    pools: candidatePools
  });
  const s = finalGraph.getVertice(baseCurrency);
  invariant3__default.default(s !== void 0, "[Graph rebuild]: Invalid start vertice");
  const pc = createPriceCalculator({
    quote: s,
    gasPriceWei: gasPrice,
    graph: finalGraph
  });
  const finalRoutes = [];
  for (const r of routes) {
    const { amount, quote: quoteRaw, gasUseEstimate } = await finalGraph.applySwap({ isExactIn, route: r });
    const quote = swapSdkCore.CurrencyAmount.fromRawAmount(quoteCurrency, quoteRaw.quotient);
    const gasCostInBase = getGasCostInCurrency({
      priceCalculator: pc,
      gasCost: gasUseEstimate,
      currency: baseCurrency
    });
    const gasCostInQuote = getGasCostInCurrency({
      priceCalculator: pc,
      gasCost: gasUseEstimate,
      currency: quoteCurrency
    });
    const quoteAmountWithGasAdjusted = swapSdkCore.CurrencyAmount.fromRawAmount(
      quoteCurrency,
      gasCostInQuote ? adjustQuoteByGas(quote, gasCostInQuote).quotient : 0
    );
    finalRoutes.push({
      ...r,
      gasUseEstimate,
      inputAmount: getInputAmount(amount, quote),
      outputAmount: getOutputAmount(amount, quote),
      inputAmountWithGasAdjusted: getInputAmount(amount, quoteAmountWithGasAdjusted),
      outputAmountWithGasAdjusted: getOutputAmount(amount, quoteAmountWithGasAdjusted),
      gasUseEstimateQuote: gasCostInQuote,
      gasUseEstimateBase: gasCostInBase
    });
  }
  return buildTrade(finalGraph, finalRoutes);
}
function getStreamedAmounts(amount, streams) {
  const streamSum = Array.isArray(streams) ? streams.reduce((sum2, s) => sum2 + s, 0) : streams;
  const streamDistributions = Array.isArray(streams) ? streams.map((stream) => new swapSdkCore.Fraction(stream, streamSum)) : Array.from({ length: streams }).map(() => new swapSdkCore.Fraction(1, streamSum));
  const numOfStreams = streamDistributions.length;
  let sum = new swapSdkCore.Fraction(0);
  const amounts = [];
  for (const [index, stream] of streamDistributions.entries()) {
    const streamAmount = index === numOfStreams - 1 ? amount.subtract(amount.multiply(sum)) : amount.multiply(stream);
    const revisedStream = index === numOfStreams - 1 ? new swapSdkCore.Fraction(1).subtract(sum) : stream;
    const percent = Number(formatFraction(revisedStream) || 0) * 100;
    amounts.push({ amount: streamAmount, percent });
    sum = sum.add(stream);
  }
  return amounts;
}
function getGasCostInCurrency({
  priceCalculator,
  gasCost,
  currency
}) {
  const v = priceCalculator.graph.getVertice(currency);
  const gasPriceInCurrency = v && priceCalculator.getGasPriceInBase(v);
  const gasCostInCurrencyRaw = gasPriceInCurrency?.multiply(gasCost);
  return swapSdkCore.CurrencyAmount.fromRawAmount(currency, gasCostInCurrencyRaw?.quotient || 0);
}

// src/findKBestTrades.ts
async function findKBestTrades({
  top,
  ...params
}) {
  const best = await findBestTrade(params);
  if (!best) {
    return void 0;
  }
  const trades = [best];
  const potentialTrades = [];
  const { candidatePools } = params;
  for (let i = 0; i < top - 1; i += 1) {
    const { pools, path } = getBestRoute(trades[i]);
    for (let j = 0; j < path.length - 1; j += 1) {
      const rootPath = j === 0 ? [] : pools.slice(0, j);
      const edgeToRemove = /* @__PURE__ */ new Set();
      const getPoolsToRoute = () => candidatePools.filter((p) => !edgeToRemove.has(p.getId()));
      for (const trade of trades) {
        const route = getBestRoute(trade);
        if (!rootPath.length || route.pools[j] && rootPath.every((edge, index) => edge.getId() === route.pools[index]?.getId())) {
          edgeToRemove.add(route.pools[j].getId());
        }
      }
      if (edgeToRemove.size === 0) {
        continue;
      }
      try {
        const trade = await findBestTrade({ ...params, candidatePools: getPoolsToRoute() });
        if (trade) {
          potentialTrades.push(trade);
        }
      } catch (e) {
        console.error("Fail to find potential trade", e);
      }
    }
    if (!potentialTrades.length) {
      break;
    }
    potentialTrades.sort((a, b) => isTradeBetter(a, b) ? -1 : 1);
    trades.push(potentialTrades.shift());
  }
  return trades;
}
function getBestRoute({ routes }) {
  return routes.sort((r1, r2) => r2.percent - r1.percent)[0];
}

exports.ADDRESS_ZERO = ADDRESS_ZERO;
exports.createGraph = createGraph;
exports.createPriceCalculator = createPriceCalculator;
exports.findBestTrade = findBestTrade;
exports.findBestTradeByStreams = findBestTradeByStreams;
exports.findKBestTrades = findKBestTrades;
exports.getBetterTrade = getBetterTrade;
exports.getEdgeKey = getEdgeKey;
exports.getMidPrice = getMidPrice;
exports.getNeighbour = getNeighbour;
exports.getPriceImpact = getPriceImpact;
exports.getVerticeKey = getVerticeKey;
exports.getWrappedCurrencyKey = getWrappedCurrencyKey;
exports.groupPoolsByType = groupPoolsByType;
exports.isSameRoute = isSameRoute;
exports.isTradeBetter = isTradeBetter;
exports.logCurrency = logCurrency;
exports.mergeRoute = mergeRoute;
exports.parseCurrency = parseCurrency;
exports.parseCurrencyAmount = parseCurrencyAmount;
exports.parseRoute = parseRoute;
exports.parseTrade = parseTrade;
exports.toSerializableCurrency = toSerializableCurrency;
exports.toSerializableCurrencyAmount = toSerializableCurrencyAmount;
exports.toSerializableRoute = toSerializableRoute;
exports.toSerializableTrade = toSerializableTrade;
//# sourceMappingURL=out.js.map
//# sourceMappingURL=index.js.map