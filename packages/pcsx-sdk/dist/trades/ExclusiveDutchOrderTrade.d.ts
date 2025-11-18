import { Currency, CurrencyAmount, Price, TradeType } from '@pancakeswap/swap-sdk-core';
import { ExclusiveDutchOrderInfo } from '../orders';
export type ExclusiveDutchOrderTrade<input extends Currency = Currency, output extends Currency = Currency> = {
    tradeType: TradeType;
    inputAmount: CurrencyAmount<input>;
    outputAmount: CurrencyAmount<output>;
    executionPrice: Price<input, output>;
    worstExecutionPrice: Price<input, output>;
    priceImpact: null;
    maximumAmountIn: CurrencyAmount<input>;
    minimumAmountOut: CurrencyAmount<output>;
    orderInfo: ExclusiveDutchOrderInfo;
};
export declare function createExclusiveDutchOrderTrade<input extends Currency, output extends Currency, tradeType extends TradeType = TradeType>({ currencyIn, currenciesOut, orderInfo, tradeType, }: {
    currencyIn: input;
    currenciesOut: [output] | [output, ...Currency[]];
    orderInfo: ExclusiveDutchOrderInfo;
    tradeType: tradeType;
}): ExclusiveDutchOrderTrade<input, output>;
//# sourceMappingURL=ExclusiveDutchOrderTrade.d.ts.map