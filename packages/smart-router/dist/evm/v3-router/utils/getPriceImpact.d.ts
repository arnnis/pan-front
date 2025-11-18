import { Percent, TradeType } from '@pancakeswap/sdk';
import { Route, SmartRouterTrade } from '../types';
export declare function getPriceImpact(trade: Pick<SmartRouterTrade<TradeType>, 'outputAmount' | 'routes'> & {
    routes: Pick<Route, 'path' | 'pools'>[];
}): Percent;
//# sourceMappingURL=getPriceImpact.d.ts.map