import { Currency, CurrencyAmount, Percent } from '@pancakeswap/swap-sdk-core';
import type { SerializableCurrencyAmount, Pool } from '@pancakeswap/routing-sdk';
import { STABLE_POOL_TYPE } from './constants/poolType';
export type Address = `0x${string}`;
export type StablePoolType = typeof STABLE_POOL_TYPE;
export type StablePoolData = {
    address: Address;
    balances: CurrencyAmount<Currency>[];
    amplifier: bigint;
    fee: Percent;
};
export type StablePool = Pool<StablePoolType, StablePoolData>;
export type SerializableStablePool = {
    address: Address;
    balances: SerializableCurrencyAmount[];
    amplifier: string;
    fee: string;
};
//# sourceMappingURL=types.d.ts.map