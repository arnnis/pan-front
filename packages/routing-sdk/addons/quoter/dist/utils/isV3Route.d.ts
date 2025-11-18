import type { Pool } from '@pancakeswap/routing-sdk';
type Route<P extends Pool> = {
    pools: P[];
};
export declare function isV3Route<P extends Pool = Pool>({ pools }: Route<P>): boolean;
export {};
//# sourceMappingURL=isV3Route.d.ts.map