import { ChainId } from '@pancakeswap/chains';
import { SerializedPool } from '../../types';
export declare const getPoolsConfig: (chainId: ChainId) => Promise<SerializedPool[] | undefined>;
export declare const getLivePoolsConfig: (chainId: ChainId) => Promise<SerializedPool[] | undefined>;
export declare const MAX_LOCK_DURATION = 31536000;
export declare const UNLOCK_FREE_DURATION = 604800;
export declare const ONE_WEEK_DEFAULT = 604800;
export declare const BOOST_WEIGHT = 20000000000000n;
export declare const DURATION_FACTOR = 31536000n;
//# sourceMappingURL=index.d.ts.map