import { PublicClient } from 'viem';
import { Gauge } from './types';
export type getAllGaugesOptions = {
    testnet?: boolean;
    inCap?: boolean;
    bothCap?: boolean;
    killed?: boolean;
    blockNumber?: bigint;
};
export declare const getAllGauges: (client: PublicClient, options?: getAllGaugesOptions) => Promise<Gauge[]>;
//# sourceMappingURL=getAllGauges.d.ts.map