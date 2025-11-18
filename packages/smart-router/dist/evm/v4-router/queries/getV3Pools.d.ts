import { BigintIsh, Currency } from '@pancakeswap/sdk';
import { OnChainProvider, V3Pool } from '../../v3-router/types';
type WithMulticallGasLimit = {
    gasLimit?: BigintIsh;
};
type WithClientProvider = {
    clientProvider?: OnChainProvider;
};
export type GetV3CandidatePoolsParams = {
    currencyA?: Currency;
    currencyB?: Currency;
} & WithClientProvider & WithMulticallGasLimit;
export declare function getV3CandidatePools({ currencyA, currencyB, clientProvider, gasLimit, }: GetV3CandidatePoolsParams): Promise<V3Pool[]>;
export type GetV3PoolsParams = {
    pairs?: [Currency, Currency][];
} & WithClientProvider & WithMulticallGasLimit;
export declare function getV3Pools({ pairs, clientProvider, gasLimit }: GetV3PoolsParams): Promise<V3Pool[]>;
export {};
//# sourceMappingURL=getV3Pools.d.ts.map