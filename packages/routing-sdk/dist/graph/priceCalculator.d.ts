import { type Token, CurrencyAmount, Price } from '@pancakeswap/swap-sdk-core';
import { Edge, Graph, Vertice } from '../types';
type Params = {
    graph: Graph;
    quote: Vertice;
    gasPriceWei: bigint;
};
export type PriceCalculator = ReturnType<typeof createPriceCalculator>;
export declare function createPriceCalculator({ graph, quote, gasPriceWei }: Params): {
    graph: Graph;
    getGasPriceInBase: (base: Vertice) => CurrencyAmount<Token> | undefined;
    getQuotePrice: (base: Vertice) => Price<Token, Token> | undefined;
    getPrice: (base: Vertice, targetQuote: Vertice) => Price<Token, Token> | undefined;
    getPriceSources: (v: Vertice) => Edge[];
};
export {};
//# sourceMappingURL=priceCalculator.d.ts.map