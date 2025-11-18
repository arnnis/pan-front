import type { ChainId } from '@pancakeswap/chains';
import type { SerializedToken, Token } from '@pancakeswap/sdk';
export declare function getTokensByChain(chainId?: ChainId): Token[];
export declare function getTokenByAddress(chainId: ChainId, address: SerializedToken['address']): Token | undefined;
//# sourceMappingURL=getTokensByChain.d.ts.map