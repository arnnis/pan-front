import { BigintIsh } from '@pancakeswap/sdk';
import { Address, Hex, TypedData } from 'viem';
import { TypedDataDomain } from './utils/types';
export interface PermitDetails {
    token: string;
    amount: BigintIsh;
    expiration: BigintIsh;
    nonce: BigintIsh;
}
export interface PermitSingle {
    details: PermitDetails;
    spender: string;
    sigDeadline: BigintIsh;
    [key: string]: unknown;
}
export interface PermitBatch {
    details: PermitDetails[];
    spender: string;
    sigDeadline: BigintIsh;
    [key: string]: unknown;
}
type TypedStructData<TTypes extends TypedData, TValue, TType> = {
    domain: TypedDataDomain;
    types: TTypes;
    values: TValue;
    primaryType: TType;
};
export type PermitSingleData = TypedStructData<typeof PERMIT_TYPES, PermitSingle, 'PermitSingle'>;
export type PermitBatchData = TypedStructData<typeof PERMIT_BATCH_TYPES, PermitBatch, 'PermitBatch'>;
declare const PERMIT_TYPES: {
    PermitSingle: {
        name: string;
        type: string;
    }[];
    PermitDetails: {
        name: string;
        type: string;
    }[];
};
declare const PERMIT_BATCH_TYPES: {
    PermitBatch: {
        name: string;
        type: string;
    }[];
    PermitDetails: {
        name: string;
        type: string;
    }[];
};
export declare abstract class AllowanceTransfer {
    /**
     * Cannot be constructed.
     */
    private constructor();
    static getPermitData<TPermit extends PermitSingle | PermitBatch, ReturnType = TPermit extends PermitSingle ? PermitSingleData : PermitBatchData>(permit: TPermit, permit2Address: Address | undefined, chainId: number): ReturnType;
    static hash(permit: PermitSingle | PermitBatch, permit2Address: Address, chainId: number): Hex;
}
export {};
//# sourceMappingURL=allowanceTransfer.d.ts.map