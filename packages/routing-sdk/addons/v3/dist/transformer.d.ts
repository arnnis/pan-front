import { ChainId } from '@pancakeswap/chains';
import { Tick } from '@pancakeswap/v3-sdk';
import { SerializableTick, SerializableV3Pool, V3Pool } from './types';
export declare function toSerializableTick(tick: Tick): SerializableTick;
export declare function toSerializableV3Pool(v3Pool: V3Pool): SerializableV3Pool;
export declare function parseTick(tick: SerializableTick): Tick;
export declare function parseV3Pool(chainId: ChainId, pool: SerializableV3Pool): V3Pool;
//# sourceMappingURL=transformer.d.ts.map