import { Address } from 'viem';
import { Bytes32 } from '../types';
export type AddBinLiquidityParams = {
    /**
     * @see {@link PoolKey}
     */
    poolKey: Bytes32;
    /**
     * Amount to send for token0
     */
    amount0: bigint;
    /**
     * Amount to send for token1
     */
    amount1: bigint;
    /**
     * Min amount to send for token0
     */
    amount0Min: bigint;
    /**
     * Min amount to send for token1
     */
    amount1Min: bigint;
    /**
     * Active id that user wants to add liquidity from
     */
    activeIdDesired: bigint;
    /**
     * Number of id that are allowed to slip
     */
    isSlippage: bigint;
    /**
     * List of delta ids to add liquidity (`deltaId = activeId - desiredId`)
     */
    deltaIds: bigint[];
    /**
     * Distribution of tokenX with sum(distributionX) = 100e18 (100%) or 0 (0%)
     */
    distributionX: bigint[];
    /**
     * Distribution of tokenY with sum(distributionY) = 100e18 (100%) or 0 (0%)
     */
    distributionY: bigint[];
    /**
     * Address of recipient
     */
    to: Address;
    /**
     * Deadline of transaction
     */
    deadline: bigint;
};
export type GetAddBinParams = {
    poolKey: Bytes32;
    binIds: bigint[];
    amount0: bigint;
    amount0Min?: bigint;
    amount1: bigint;
    amount1Min: bigint;
    activeId: bigint;
    isSlippage?: bigint;
    recipient: Address;
    deadline: bigint;
};
export declare const getAddBinParams: ({ poolKey, binIds, amount0, amount0Min, amount1, amount1Min, activeId, isSlippage, recipient, deadline, }: GetAddBinParams) => AddBinLiquidityParams;
//# sourceMappingURL=getAddLiquidityParameters.d.ts.map