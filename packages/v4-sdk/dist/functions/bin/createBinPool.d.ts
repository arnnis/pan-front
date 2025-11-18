import { BigintIsh, Currency } from '@pancakeswap/swap-sdk-core';
import { Address } from 'viem';
import type { BinTree } from '../../types';
type ActiveId = number;
type Reserve = {
    reserveX: bigint;
    reserveY: bigint;
};
export type BinPoolState = {
    /**
     * the first currency of the pool
     */
    currencyX: Currency;
    /**
     * the second currency of the pool
     */
    currencyY: Currency;
    /**
     * the bin step of the pool
     * constraints: 1 <= binStep <= 100
     */
    binStep: bigint;
    /**
     * current active bin id of the pool
     */
    activeId: bigint;
    reserveOfBin: Record<ActiveId, Reserve>;
    /**
     * fee charged by Liquidity Providers
     * constraints: 0 <= lpFee <= 10000(10%)
     * unit: bps
     * 1 = 0.01%
     */
    lpFee: bigint;
    /**
     * fee charged by the protocol
     * constraints: 0 <= protocolFee <= 1000(0.1%)
     * the first element is the feeRate charged when swapForX
     * the second element is the feeRate charged when swapForY
     * unit: bps/100
     * 1 = 0.0001%
     */
    protocolFees: [bigint, bigint];
    lmPool?: Address;
    tree?: BinTree;
};
/**
 * Returns a new BinPoolState object
 */
export declare const createBinPool: ({ currencyA, currencyB, activeId, binStep, lpFee, protocolFees, lmPool, tree, reserveOfBin, }: {
    currencyA: Currency;
    currencyB: Currency;
    activeId: BigintIsh;
    binStep: BigintIsh;
    lpFee: BigintIsh;
    protocolFees: [BigintIsh, BigintIsh];
    lmPool?: Address;
    tree?: BinTree;
    reserveOfBin?: Record<ActiveId, Reserve>;
}) => BinPoolState;
export {};
//# sourceMappingURL=createBinPool.d.ts.map