import { ChainId } from '@pancakeswap/chains';
import { Currency, CurrencyAmount, TradeType } from '@pancakeswap/swap-sdk-core';
import { SerializableCurrency, SerializableCurrencyAmount, Pool, Route, SerializablePool, SerializableRoute, Trade, SerializableTrade } from '../types';
export type SerializableConfig<P extends Pool = Pool, SP extends SerializablePool = SerializablePool> = {
    toSerializablePool: (pool: P) => SP;
};
export type ParseConfig<P extends Pool = Pool, SP extends SerializablePool = SerializablePool> = {
    parsePool: (chainId: ChainId, pool: SP) => P;
};
export declare function toSerializableCurrency(currency: Currency): SerializableCurrency;
export declare function toSerializableCurrencyAmount(amount: CurrencyAmount<Currency>): SerializableCurrencyAmount;
export declare function toSerializableRoute<P extends Pool = Pool, SP extends SerializablePool = SerializablePool>(route: Route<P>, { toSerializablePool }: SerializableConfig<P, SP>): SerializableRoute;
export declare function toSerializableTrade<P extends Pool = Pool, SP extends SerializablePool = SerializablePool>(trade: Trade<TradeType, P>, config: SerializableConfig<P, SP>): SerializableTrade;
export declare function parseCurrency(chainId: ChainId, currency: SerializableCurrency): Currency;
export declare function parseCurrencyAmount(chainId: ChainId, amount: SerializableCurrencyAmount): CurrencyAmount<Currency>;
export declare function parseRoute<P extends Pool = Pool, SP extends SerializablePool = SerializablePool>(chainId: ChainId, route: SerializableRoute, { parsePool }: ParseConfig<P, SP>): Route;
export declare function parseTrade<P extends Pool = Pool, SP extends SerializablePool = SerializablePool>(chainId: ChainId, trade: SerializableTrade, config: ParseConfig<P, SP>): Trade<TradeType>;
//# sourceMappingURL=transformer.d.ts.map