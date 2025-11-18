import { BigintIsh, Currency } from '@pancakeswap/sdk';
import { Abi, Address } from 'viem';
import { OnChainProvider, Pool, StablePool, V2Pool, V3Pool } from '../../types';
import { PoolMeta } from './internalTypes';
export declare const getV2PoolsOnChain: (pairs: [Currency, Currency][], provider?: OnChainProvider, _blockNumber?: BigintIsh) => Promise<V2Pool[]>;
export declare const getStablePoolsOnChain: (pairs: [Currency, Currency][], provider?: OnChainProvider, _blockNumber?: BigintIsh) => Promise<StablePool[]>;
export declare const getV3PoolsWithoutTicksOnChain: (pairs: [Currency, Currency][], provider?: OnChainProvider, _blockNumber?: BigintIsh) => Promise<V3Pool[]>;
type ContractFunctionConfig = {
    abi?: Abi;
    address: Address;
    functionName: string;
    args?: any[];
};
interface OnChainPoolFactoryParams<TPool extends Pool, TPoolMeta extends PoolMeta, TAbi extends Abi | unknown[] = Abi> {
    abi: TAbi;
    getPossiblePoolMetas: (pair: [Currency, Currency]) => Promise<TPoolMeta[]>;
    buildPoolInfoCalls: (poolMeta: TPoolMeta) => ContractFunctionConfig[];
    buildPool: (poolMeta: TPoolMeta, data: any[]) => TPool | null;
}
export declare function createOnChainPoolFactory<TPool extends Pool, TPoolMeta extends PoolMeta = PoolMeta, TAbi extends Abi | unknown[] = Abi>({ abi, getPossiblePoolMetas, buildPoolInfoCalls, buildPool }: OnChainPoolFactoryParams<TPool, TPoolMeta, TAbi>): (pairs: [Currency, Currency][], provider?: OnChainProvider, _blockNumber?: BigintIsh) => Promise<TPool[]>;
export {};
//# sourceMappingURL=onChainPoolProviders.d.ts.map