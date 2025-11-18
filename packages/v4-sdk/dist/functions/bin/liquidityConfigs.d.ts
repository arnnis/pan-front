import { Hex } from 'viem';
export type LiquidityConfig = {
    /**
     * The distribution of the first token
     */
    distributionX: bigint;
    /**
     * The distribution of the second token
     */
    distributionY: bigint;
    id: bigint;
};
export declare const encodeLiquidityConfig: ({ distributionX, distributionY, id }: LiquidityConfig) => `0x${string}`;
export declare const decodeLiquidityConfig: (config: Hex) => LiquidityConfig;
//# sourceMappingURL=liquidityConfigs.d.ts.map