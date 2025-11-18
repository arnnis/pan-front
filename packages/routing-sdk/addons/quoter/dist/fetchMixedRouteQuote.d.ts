import { StablePool } from '@pancakeswap/routing-sdk-addon-stable-swap';
import { V2Pool } from '@pancakeswap/routing-sdk-addon-v2';
import { V3Pool } from '@pancakeswap/routing-sdk-addon-v3';
import type { QuoteRoute } from './types';
export type SupportedPool = V3Pool | V2Pool | StablePool;
export declare function buildMixedRouteQuoteCall<P extends SupportedPool = SupportedPool>(route: QuoteRoute<P>): {
    readonly address: "0x678Aa4bF4E210cf2166753e054d5b7c31cc7fa86" | "0xB048Bbc1Ee6b733FFfCFb9e9CeF7375518e25997" | "0x5457fa0318753E9eaC2d17DFfdb6383da207d705" | "0x805e03325116Da555Babf012C7bd490Bdd6EEa95" | "0x4c650FB471fe4e0f476fD3437C3411B1122c4e3B" | "0x9CFCdecF9e37Bf25023A2B42537127c1089600fE" | "0x9B1edFB3848660402E4f1DC25733764e80aA627A" | "0x7931c270f59Cb1c2617e87976689bD6803afF50a" | "0x7d3ed219e45637Cfa77b1a634d0489a2950d1B7F" | "0x118F080BF268aa7De4bE6d5e579D926903E7d6Cb" | "0x9d4277f1D41CCB30C0e91f7d1bBA2A739E19032C" | "0x7f988126C2c5d4967Bb5E70bDeB7e26DB6BD5C28";
    readonly abi: readonly [{
        readonly inputs: readonly [{
            readonly internalType: "bytes";
            readonly name: "path";
            readonly type: "bytes";
        }, {
            readonly internalType: "uint256[]";
            readonly name: "flag";
            readonly type: "uint256[]";
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
            readonly name: "v3SqrtPriceX96AfterList";
            readonly type: "uint160[]";
        }, {
            readonly internalType: "uint32[]";
            readonly name: "v3InitializedTicksCrossedList";
            readonly type: "uint32[]";
        }, {
            readonly internalType: "uint256";
            readonly name: "v3SwapGasEstimate";
            readonly type: "uint256";
        }];
        readonly stateMutability: "nonpayable";
        readonly type: "function";
    }];
    readonly functionName: "quoteExactInput";
    readonly args: readonly [`0x${string}`, (0n | 1n | 2n | 3n | -1n)[], bigint];
};
//# sourceMappingURL=fetchMixedRouteQuote.d.ts.map