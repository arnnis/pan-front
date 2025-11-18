import { BinPoolState } from './createBinPool';
/**
 * dryrun of swap to a given bin pool
 */
export declare const swap: (binPool: BinPoolState, amountIn: bigint, swapForY: boolean) => {
    binPool: BinPoolState;
    feeForProtocol: bigint;
    result: [bigint, bigint];
};
export declare const getSwapIn: (binPool: BinPoolState, amountOut: bigint, swapForY: boolean) => {
    amountIn: bigint;
    fee: bigint;
    amountOutLeft: bigint;
};
export declare const getSwapOut: (binPool: BinPoolState, amountIn: bigint, swapForY: boolean) => {
    amountOut: bigint;
    fee: bigint;
    amountInLeft: bigint;
};
//# sourceMappingURL=swap.d.ts.map