import { Currency } from '@pancakeswap/swap-sdk-core';
import { V4ClPool } from '../../v3-router/types';
import { GetV4CandidatePoolsParams } from '../types';
export declare function getV4ClCandidatePools({ currencyA, currencyB, clientProvider, gasLimit, }: GetV4CandidatePoolsParams): Promise<V4ClPool[]>;
export declare const getV4ClPoolsWithoutTicks: (pairs: [Currency, Currency][], provider?: import("../../v3-router/types").OnChainProvider, _blockNumber?: import("@pancakeswap/swap-sdk-core").BigintIsh) => Promise<V4ClPool[]>;
//# sourceMappingURL=getV4ClPools.d.ts.map