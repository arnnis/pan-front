import { BigintIsh, CurrencyAmount, Currency, Percent } from '@pancakeswap/swap-sdk-core';
export interface GetSwapOutputParams {
    amplifier: BigintIsh;
    balances: CurrencyAmount<Currency>[];
    amount: CurrencyAmount<Currency>;
    outputCurrency: Currency;
    fee: Percent;
}
export declare function getSwapOutput({ amplifier, balances: balanceAmounts, outputCurrency, amount, fee, }: GetSwapOutputParams): CurrencyAmount<Currency>;
export declare function getSwapOutputWithoutFee(params: Omit<GetSwapOutputParams, 'fee'>): CurrencyAmount<Currency>;
export declare function getSwapInput({ amount, ...rest }: GetSwapOutputParams): CurrencyAmount<Currency>;
export declare function getSwapInputWithtouFee(params: Omit<GetSwapOutputParams, 'fee'>): CurrencyAmount<Currency>;
export declare const getQuoteExactIn: (params: GetSwapOutputParams) => [CurrencyAmount<Currency>, Pick<GetSwapOutputParams, "balances" | "fee" | "amplifier">];
export declare const getQuoteExactOut: (params: GetSwapOutputParams) => [CurrencyAmount<Currency>, Pick<GetSwapOutputParams, "balances" | "fee" | "amplifier">];
//# sourceMappingURL=getSwapOutput.d.ts.map