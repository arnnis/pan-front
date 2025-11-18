import { Address } from 'viem';
import { PoolKey } from '../../../types';
export type AddBinLiquidityParams = {
    poolKey: PoolKey<'Bin'>;
    amount0: bigint;
    amount1: bigint;
    amount0Min: bigint;
    amount1Min: bigint;
    activeIdDesired: bigint;
    idSlippage: bigint;
    deltaIds: bigint[];
    distributionX: bigint[];
    distributionY: bigint[];
    to: Address;
    deadline: bigint;
};
export declare const binPoolAddLiquidityCalldata: (params: AddBinLiquidityParams) => `0x${string}`;
export type RemoveBinLiquidityParams = {
    poolKey: PoolKey<'Bin'>;
    amount0Min: bigint;
    amount1Min: bigint;
    ids: bigint[];
    amounts: bigint[];
    from: Address;
    to: Address;
    deadline: bigint;
};
export declare const binPoolRemoveLiquidityCalldata: (params: RemoveBinLiquidityParams) => `0x${string}`;
//# sourceMappingURL=liquidity.d.ts.map