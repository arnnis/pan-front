import { ChainId } from '@pancakeswap/chains';
import { BoosterConfig } from '../../utils/boosted/types';
export type BoostedPoolsConfigByChain<TChainId extends ChainId> = {
    [chainId in TChainId]?: BoosterConfig[];
};
export declare const BOOSTED_POOLS_CONFIG_BY_CHAIN: BoostedPoolsConfigByChain<ChainId>;
export declare const getBoostedPoolsConfig: (chainId: ChainId) => BoosterConfig[] | undefined;
export declare const getBoostedPoolConfig: (chainId: ChainId, contractAddress: string) => BoosterConfig | undefined;
//# sourceMappingURL=index.d.ts.map