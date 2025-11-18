/**
 * protocol fee charged first, then LP fee charged remaining
 * @param protocolFee
 * @param lpFee
 *
 * @returns swapFee bigint
 *  unit: bps/100
 *  1 = 0.0001%
 */
export declare const calculateSwapFee: (protocolFee: bigint, lpFee: bigint) => bigint;
//# sourceMappingURL=calculateSwapFee.d.ts.map