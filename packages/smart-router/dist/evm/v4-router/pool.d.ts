import { Currency, CurrencyAmount } from '@pancakeswap/sdk';
import { Pool } from '../v3-router/types';
export declare function getCurrencyPairs(p: Pool): [Currency, Currency][];
export declare function getReserve(p: Pool, currency: Currency): CurrencyAmount<Currency> | undefined;
//# sourceMappingURL=pool.d.ts.map