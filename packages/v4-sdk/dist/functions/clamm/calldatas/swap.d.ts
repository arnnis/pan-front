import { Hex } from 'viem';
import { PoolKey } from '../../../types';
export type CLPoolSwapParams = {
    zeroForOne: boolean;
    amountSpecified: bigint;
    sqrtPriceLimitX96: bigint;
};
export declare const clPoolSwapCalldata: (poolKey: PoolKey<"CL">, swapParams: CLPoolSwapParams, hookData?: Hex) => `0x${string}`;
//# sourceMappingURL=swap.d.ts.map