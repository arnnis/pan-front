import { Currency, CurrencyAmount, TradeType } from '@pancakeswap/sdk';
import { Pool } from '../../v3-router/types';
import { V4Trade, Graph, TradeConfig } from '../types';
type GraphParams = {
    pools?: Pool[];
    graph?: Graph;
};
export declare function createGraph({ pools, graph }: GraphParams): Graph;
type FindBestTradeParams = TradeConfig & {
    amount: CurrencyAmount<Currency>;
    quoteCurrency: Currency;
    tradeType: TradeType;
    streams: number[] | number;
    graph?: Graph;
};
export declare function findBestTrade(params: FindBestTradeParams): Promise<V4Trade<TradeType> | undefined>;
export {};
//# sourceMappingURL=graph.d.ts.map