import type { Pool } from '@pancakeswap/routing-sdk';
type Route<P extends Pool> = {
    pools: P[];
};
export declare function isMixedRoute<P extends Pool = Pool>({ pools }: Route<P>): boolean;
export {};
//# sourceMappingURL=isMixedRoute.d.ts.map