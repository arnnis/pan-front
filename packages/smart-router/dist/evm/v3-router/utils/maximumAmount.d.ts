import { CurrencyAmount, Percent, TradeType } from '@pancakeswap/sdk';
import { SmartRouterTrade } from '../types';
export declare function maximumAmountIn(trade: Pick<SmartRouterTrade<TradeType>, 'inputAmount' | 'tradeType'>, slippage: Percent, amountIn?: CurrencyAmount<import("@pancakeswap/sdk").Currency>): CurrencyAmount<import("@pancakeswap/sdk").Currency>;
export declare function minimumAmountOut(trade: Pick<SmartRouterTrade<TradeType>, 'outputAmount' | 'tradeType'>, slippage: Percent, amountOut?: CurrencyAmount<import("@pancakeswap/sdk").Currency>): CurrencyAmount<import("@pancakeswap/sdk").Currency>;
//# sourceMappingURL=maximumAmount.d.ts.map