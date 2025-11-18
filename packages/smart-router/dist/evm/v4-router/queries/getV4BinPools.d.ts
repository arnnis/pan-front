import { Currency } from '@pancakeswap/swap-sdk-core';
import { V4BinPool } from '../../v3-router/types';
import { GetV4CandidatePoolsParams } from '../types';
export declare function getV4BinCandidatePools({ currencyA, currencyB, clientProvider, gasLimit, }: GetV4CandidatePoolsParams): Promise<V4BinPool[]>;
export declare const getV4BinPoolsWithoutBins: (pairs: [Currency, Currency][], provider?: import("../../v3-router/types").OnChainProvider, _blockNumber?: import("@pancakeswap/swap-sdk-core").BigintIsh) => Promise<V4BinPool[]>;
//# sourceMappingURL=getV4BinPools.d.ts.map