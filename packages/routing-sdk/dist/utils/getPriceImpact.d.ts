import { Percent, TradeType, Price, Currency } from '@pancakeswap/swap-sdk-core';
import { Trade, Route } from '../types';
export declare function getPriceImpact(trade: Pick<Trade<TradeType>, 'outputAmount' | 'routes'> & {
    routes: Pick<Route, 'path' | 'pools'>[];
}): Percent;
export declare function getMidPrice({ path, pools }: Pick<Route, 'path' | 'pools'>): Price<Currency, Currency>;
//# sourceMappingURL=getPriceImpact.d.ts.map