import { GetContractReturnType, PublicClient } from 'viem';
import { calcGaugesVotingABI, gaugesVotingABI } from './abis';
export declare const getContract: (client: PublicClient) => GetContractReturnType<typeof gaugesVotingABI, PublicClient>;
export declare const getCalcContract: (client: PublicClient) => GetContractReturnType<typeof calcGaugesVotingABI, PublicClient>;
//# sourceMappingURL=contract.d.ts.map