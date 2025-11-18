import { BinPoolState } from './createBinPool';
export type AmountsChanged = {
    /**
     * The amounts of tokens that will be added to the pool, including fees
     */
    amountsInWithFee: [bigint, bigint];
    /**
     * The amounts of tokens that will be removed from the pool
     */
    amountsOutOfBin: [bigint, bigint];
    /**
     * The fees that will be charged
     */
    totalFees: [bigint, bigint];
};
/**
 * Returns the amounts of tokens that will be added and removed from the bin during a swap
 * along with the fees that will be charged
 *
 * @param binPool BinPoolState
 * @param swapForY boolean
 * @param amountIn bigint
 * @returns AmountsChanged
 */
export declare const getAmounts: (binPool: BinPoolState, swapForY: boolean, amountIn: bigint) => AmountsChanged;
//# sourceMappingURL=getAmounts.d.ts.map