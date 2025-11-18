import { ChainId } from '@pancakeswap/chains';
import { SerializableV2Pool, V2Pool } from './types';
export declare function toSerializableV2Pool(v2Pool: V2Pool): SerializableV2Pool;
export declare function parseV2Pool(chainId: ChainId, pool: SerializableV2Pool): V2Pool;
//# sourceMappingURL=transformer.d.ts.map