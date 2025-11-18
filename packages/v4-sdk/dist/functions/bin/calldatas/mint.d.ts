import { Address, Hex } from 'viem';
import { PoolKey } from '../../../types';
import { LiquidityConfig } from '../liquidityConfigs';
export type BinPoolMintParams = {
    /**
     * nft minted to
     */
    to: Address;
    liquidityConfigs: LiquidityConfig[];
    amountIn: [bigint, bigint];
    binStep: bigint;
    salt: string | number;
};
export declare const binPoolMintCalldata: <THookData extends Hex>(key: PoolKey, params: BinPoolMintParams, hookData: THookData) => `0x${string}`;
//# sourceMappingURL=mint.d.ts.map