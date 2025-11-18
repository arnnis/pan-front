import { Currency, Token } from '@pancakeswap/sdk';
import { ChainId } from '@pancakeswap/chains';
import { TokenAddressMap } from '@pancakeswap/token-lists';
export * from './getTokensByChain';
/**
 * An empty result, useful as a default.
 */
export declare const EMPTY_LIST: TokenAddressMap<ChainId>;
export declare function serializeTokens(unserializedTokens: any): any;
export declare function unwrappedToken(token?: Token): Currency | undefined;
//# sourceMappingURL=index.d.ts.map