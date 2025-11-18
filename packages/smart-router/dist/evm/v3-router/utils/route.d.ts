import { Currency, Price } from '@pancakeswap/sdk';
import { BaseRoute, Pool, RouteType, Route } from '../types';
export declare function buildBaseRoute(pools: Pool[], currencyIn: Currency, currencyOut: Currency): BaseRoute;
export declare function getRouteTypeByPools(pools: Pick<Pool, 'type'>[]): RouteType;
export declare function getQuoteCurrency({ input, output }: BaseRoute, baseCurrency: Currency): Currency;
export declare function getMidPrice({ path, pools }: Pick<Route, 'path' | 'pools'>): Price<Currency, Currency>;
//# sourceMappingURL=route.d.ts.map