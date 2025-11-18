import { ChainId } from '@pancakeswap/chains';
import { StableSwapPool } from '../../types';
export type StableSwapPoolMap<TChainId extends number> = {
    [chainId in TChainId]: StableSwapPool[];
};
export declare const isStableSwapSupported: (chainId: number | undefined) => chainId is StableSupportedChainId;
export declare const STABLE_SUPPORTED_CHAIN_IDS: readonly [ChainId.BSC, ChainId.BSC_TESTNET, ChainId.ARBITRUM_ONE, ChainId.ETHEREUM];
export type StableSupportedChainId = (typeof STABLE_SUPPORTED_CHAIN_IDS)[number];
//# sourceMappingURL=pools.d.ts.map