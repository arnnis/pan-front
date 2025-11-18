import { Currency, Price, TradeType } from '@pancakeswap/sdk';
import { SmartRouterTrade } from '../types';
export declare function getExecutionPrice(trade: Pick<SmartRouterTrade<TradeType>, 'inputAmount' | 'outputAmount'> | undefined | null): Price<Currency, Currency> | undefined;
//# sourceMappingURL=getExecutionPrice.d.ts.map