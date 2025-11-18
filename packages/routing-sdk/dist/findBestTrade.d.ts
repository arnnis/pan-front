import { Currency, CurrencyAmount, TradeType } from '@pancakeswap/swap-sdk-core';
import { Graph, TradeConfig, TradeWithGraph } from './types';
export type FindBestTradeByStreamsParams = TradeConfig & {
    amount: CurrencyAmount<Currency>;
    quoteCurrency: Currency;
    tradeType: TradeType;
    streams: number[] | number;
    graph?: Graph;
};
export type FindBestTradeParams = Omit<FindBestTradeByStreamsParams, 'streams'>;
export declare function findBestTrade({ maxSplits, ...params }: FindBestTradeParams): Promise<TradeWithGraph<TradeType> | undefined>;
export declare function findBestTradeByStreams(params: FindBestTradeByStreamsParams): Promise<TradeWithGraph<TradeType> | undefined>;
//# sourceMappingURL=findBestTrade.d.ts.map