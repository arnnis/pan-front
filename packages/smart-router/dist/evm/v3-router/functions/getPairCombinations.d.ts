import { Currency, Token } from '@pancakeswap/sdk';
export declare const getCheckAgainstBaseTokens: ((currencyA?: Currency, currencyB?: Currency) => Promise<Token[]>) & import("lodash").MemoizedFunction;
export declare const getPairCombinations: ((currencyA?: Currency, currencyB?: Currency) => Promise<[Currency, Currency][]>) & import("lodash").MemoizedFunction;
//# sourceMappingURL=getPairCombinations.d.ts.map