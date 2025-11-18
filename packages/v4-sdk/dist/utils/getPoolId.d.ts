import { Bytes32, PoolKey } from '../types';
/**
 * `PoolId` is a bytes32 of `keccak256(abi.encode(poolKey))`
 * @see {@link PoolKey}
 * @see {@link https://github.com/pancakeswap/pancake-v4-core/blob/main/src/types/PoolId.sol|v4-core}
 * @param param0
 * @returns
 */
export declare const getPoolId: ({ currency0, currency1, hooks, poolManager, fee, parameters, }: PoolKey) => Bytes32;
//# sourceMappingURL=getPoolId.d.ts.map