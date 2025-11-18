import { TradeType } from '@pancakeswap/swap-sdk-core';
import { Trade } from '../types';
export declare function isTradeBetter<T extends Trade<TradeType>>(tradeA: T, tradeB: T): boolean;
export declare function getBetterTrade<T extends Trade<TradeType>>(tradeA?: T, tradeB?: T): T | undefined;
//# sourceMappingURL=getBetterTrade.d.ts.map