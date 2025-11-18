import { PublicClient } from 'viem';
import { GaugeInfo } from './types';
export declare const fetchAllKilledGauges: (client: PublicClient, gauges: GaugeInfo[], options?: {
    blockNumber?: bigint;
}) => Promise<GaugeInfo[]>;
//# sourceMappingURL=fetchAllKilledGauges.d.ts.map