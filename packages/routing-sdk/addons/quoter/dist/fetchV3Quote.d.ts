import { StablePool } from '@pancakeswap/routing-sdk-addon-stable-swap';
import { V2Pool } from '@pancakeswap/routing-sdk-addon-v2';
import { V3Pool } from '@pancakeswap/routing-sdk-addon-v3';
import type { FetchQuote, QuoteRoute } from './types';
export type SupportedPool = V3Pool | V2Pool | StablePool;
export declare function buildV3QuoteCall<P extends SupportedPool = SupportedPool>(route: QuoteRoute<P>): {
    readonly address: "0xB048Bbc1Ee6b733FFfCFb9e9CeF7375518e25997" | "0xbC203d7f83677c7ed3F7acEc959963E7F4ECC5C2" | "0xC0F9488345ed89105b3bd135150905F718Bb254E" | "0xA9c08a89Be4503E04Fd84Eadad4320eE34e9B11D" | "0x3d146FcE6c1006857750cBe8aF44f76a28041CCc" | "0x43e273b4Ffd6bC9d6Be1a862D19893549c3b9b46" | "0x669254936caE83bE34008BdFdeeA63C902497B31" | "0x052a99849Ef2e13a5CB28275862991671D4b6fF5" | "0x6cc56b20bf8C4FfD58050D15AbA2978A745CC691" | "0x74b06eFA24F39C60AA7F61BD516a3eaf39613D57";
    readonly abi: readonly [{
        readonly inputs: readonly [{
            readonly internalType: "bytes";
            readonly name: "path";
            readonly type: "bytes";
        }, {
            readonly internalType: "uint256";
            readonly name: "amountIn";
            readonly type: "uint256";
        }];
        readonly name: "quoteExactInput";
        readonly outputs: readonly [{
            readonly internalType: "uint256";
            readonly name: "amountOut";
            readonly type: "uint256";
        }, {
            readonly internalType: "uint160[]";
            readonly name: "sqrtPriceX96AfterList";
            readonly type: "uint160[]";
        }, {
            readonly internalType: "uint32[]";
            readonly name: "initializedTicksCrossedList";
            readonly type: "uint32[]";
        }, {
            readonly internalType: "uint256";
            readonly name: "gasEstimate";
            readonly type: "uint256";
        }];
        readonly stateMutability: "nonpayable";
        readonly type: "function";
    }, {
        readonly inputs: readonly [{
            readonly internalType: "bytes";
            readonly name: "path";
            readonly type: "bytes";
        }, {
            readonly internalType: "uint256";
            readonly name: "amountOut";
            readonly type: "uint256";
        }];
        readonly name: "quoteExactOutput";
        readonly outputs: readonly [{
            readonly internalType: "uint256";
            readonly name: "amountIn";
            readonly type: "uint256";
        }, {
            readonly internalType: "uint160[]";
            readonly name: "sqrtPriceX96AfterList";
            readonly type: "uint160[]";
        }, {
            readonly internalType: "uint32[]";
            readonly name: "initializedTicksCrossedList";
            readonly type: "uint32[]";
        }, {
            readonly internalType: "uint256";
            readonly name: "gasEstimate";
            readonly type: "uint256";
        }];
        readonly stateMutability: "nonpayable";
        readonly type: "function";
    }];
    readonly functionName: "quoteExactInput" | "quoteExactOutput";
    readonly args: readonly [`0x${string}`, bigint];
};
export declare const fetchV3Quote: FetchQuote<SupportedPool>;
//# sourceMappingURL=fetchV3Quote.d.ts.map