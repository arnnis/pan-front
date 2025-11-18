import { TradeType } from '@pancakeswap/swap-sdk-core';
import { type FindBestTradeParams } from './findBestTrade';
import { TradeWithGraph } from './types';
export type FindKBestTradesParams = FindBestTradeParams & {
    top: number;
};
export declare function findKBestTrades({ top, ...params }: FindKBestTradesParams): Promise<TradeWithGraph<TradeType>[] | undefined>;
//# sourceMappingURL=findKBestTrades.d.ts.map