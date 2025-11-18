import { ChainId } from '@pancakeswap/chains';
import { TradeType } from '@pancakeswap/swap-sdk-core';
import { SerializedCurrency, SerializedCurrencyAmount, SerializedPool } from '../v3-router/utils/transformer';
import { V4Route, V4Trade } from './types';
export type SerializedGasUseInfo = {
    gasUseEstimate: string;
    gasUseEstimateBase: SerializedCurrencyAmount;
    gasUseEstimateQuote: SerializedCurrencyAmount;
    inputAmountWithGasAdjusted: SerializedCurrencyAmount;
    outputAmountWithGasAdjusted: SerializedCurrencyAmount;
};
export type SerializedV4Route = Omit<V4Route, 'pools' | 'path' | 'input' | 'output' | 'inputAmount' | 'outputAmount' | 'gasUseEstimate' | 'gasUseEstimateBase' | 'gasUseEstimateQuote' | 'inputAmountWithGasAdjusted' | 'outputAmountWithGasAdjusted'> & SerializedGasUseInfo & {
    pools: SerializedPool[];
    path: SerializedCurrency[];
    inputAmount: SerializedCurrencyAmount;
    outputAmount: SerializedCurrencyAmount;
};
export type SerializedV4Trade = Omit<V4Trade<TradeType>, 'inputAmount' | 'outputAmount' | 'gasUseEstimate' | 'gasUseEstimateBase' | 'gasUseEstimateQuote' | 'routes' | 'graph' | 'inputAmountWithGasAdjusted' | 'outputAmountWithGasAdjusted'> & SerializedGasUseInfo & {
    inputAmount: SerializedCurrencyAmount;
    outputAmount: SerializedCurrencyAmount;
    routes: SerializedV4Route[];
};
export declare function serializeRoute(route: V4Route): SerializedV4Route;
export declare function parseRoute(chainId: ChainId, route: SerializedV4Route): V4Route;
type Optional<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;
export declare function serializeTrade(trade: Optional<V4Trade<TradeType>, 'graph'>): SerializedV4Trade;
export declare function parseTrade<tradeType extends TradeType = TradeType>(chainId: ChainId, trade: SerializedV4Trade): Omit<V4Trade<tradeType>, 'graph'>;
export {};
//# sourceMappingURL=transformer.d.ts.map