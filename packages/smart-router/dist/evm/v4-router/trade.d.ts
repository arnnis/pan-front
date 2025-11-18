import { Currency, CurrencyAmount, TradeType } from '@pancakeswap/sdk';
import { TradeConfig, V4Trade } from './types';
export declare function getBestTrade(amount: CurrencyAmount<Currency>, quoteCurrency: Currency, tradeType: TradeType, { candidatePools, gasPriceWei, maxHops, maxSplits }: TradeConfig): Promise<V4Trade<TradeType> | undefined>;
//# sourceMappingURL=trade.d.ts.map