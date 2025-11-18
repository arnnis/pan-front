import { ChainId } from '@pancakeswap/chains';
import { Address } from './types/common';
export declare const zeroAddress: "0x0000000000000000000000000000000000000000";
type TokenUsdPrice = {
    address: Address;
    priceUSD: number;
};
export type CurrencyParams = {
    chainId: ChainId;
    address: Address;
    isNative?: false;
} | {
    chainId: ChainId;
    isNative: true;
};
export type CurrencyKey = `${number}:${string}`;
export type CurrencyUsdResult = Record<CurrencyKey, number>;
export declare function getCurrencyKey(currencyParams?: CurrencyParams): CurrencyKey | undefined;
export declare function getCurrencyListKey(currencyListParams?: CurrencyParams[]): string | undefined;
export declare function getCurrencyUsdPrice(currencyParams?: CurrencyParams, options?: RequestInit): Promise<number>;
export declare function getCurrencyListUsdPrice(currencyListParams?: CurrencyParams[], options?: RequestInit): Promise<CurrencyUsdResult>;
export declare function getTokenPrices(chainId: ChainId, addresses: Address[], options?: RequestInit): Promise<TokenUsdPrice[]>;
export declare function getNativeTokenPrices(chainIds: ChainId[], options?: RequestInit): Promise<Map<ChainId, number>>;
export {};
//# sourceMappingURL=getCurrencyPrice.d.ts.map