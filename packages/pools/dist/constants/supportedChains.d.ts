import { ChainId } from '@pancakeswap/chains';
export declare const SUPPORTED_CHAIN_IDS: readonly [ChainId.BSC, ChainId.BSC_TESTNET, ChainId.ETHEREUM, ChainId.ARBITRUM_ONE, ChainId.ARBITRUM_GOERLI, ChainId.ZKSYNC, ChainId.ZKSYNC_TESTNET, ChainId.LINEA_TESTNET, ChainId.BASE_TESTNET, ChainId.POLYGON_ZKEVM_TESTNET, ChainId.OPBNB, ChainId.BASE];
export type SupportedChainId = (typeof SUPPORTED_CHAIN_IDS)[number];
export declare const CAKE_VAULT_SUPPORTED_CHAINS: readonly [ChainId.BSC, ChainId.BSC_TESTNET];
export type CakeVaultSupportedChainId = (typeof CAKE_VAULT_SUPPORTED_CHAINS)[number];
//# sourceMappingURL=supportedChains.d.ts.map