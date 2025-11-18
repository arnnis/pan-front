import { ChainId } from '@pancakeswap/chains';
import { SerializableStablePool, StablePool } from './types';
export declare function toSerializableStablePool(stablePool: StablePool): SerializableStablePool;
export declare function parseStablePool(chainId: ChainId, pool: SerializableStablePool): StablePool;
//# sourceMappingURL=transformer.d.ts.map