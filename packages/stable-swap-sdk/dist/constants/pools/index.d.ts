import { ChainId } from '@pancakeswap/chains';
import { StableSwapPool } from '../../types';
import { isStableSwapSupported, STABLE_SUPPORTED_CHAIN_IDS } from './pools';
export declare const fetchStableSwapData: (chainId: ChainId) => Promise<StableSwapPool[]>;
export declare function getStableSwapPools(chainId: ChainId): Promise<StableSwapPool[]>;
export { isStableSwapSupported, STABLE_SUPPORTED_CHAIN_IDS };
//# sourceMappingURL=index.d.ts.map