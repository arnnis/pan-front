import type { Address } from 'viem';
import { TypedDataDomain, TypedDataParameter } from './utils/types';
export declare function permit2Domain(permit2Address: Address | undefined, chainId: number): TypedDataDomain;
export type PermitData = {
    domain: TypedDataDomain;
    types: Record<string, TypedDataParameter[]>;
    values: any;
};
//# sourceMappingURL=domain.d.ts.map