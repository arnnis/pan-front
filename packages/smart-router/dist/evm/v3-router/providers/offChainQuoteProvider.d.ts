import { Currency, CurrencyAmount } from '@pancakeswap/sdk';
import { Pool, QuoteProvider } from '../types';
export declare function createOffChainQuoteProvider(): QuoteProvider;
export type PoolQuote = {
    pool: Pool;
    quote: CurrencyAmount<Currency>;
    poolAfter: Pool;
};
export declare function createPoolQuoteGetter(isExactIn?: boolean): (pool: Pool, amount: CurrencyAmount<Currency>) => Promise<PoolQuote | undefined>;
//# sourceMappingURL=offChainQuoteProvider.d.ts.map