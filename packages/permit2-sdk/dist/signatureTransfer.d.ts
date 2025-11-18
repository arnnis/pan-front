import { BigintIsh } from '@pancakeswap/sdk';
import { Address, Hex } from 'viem';
import { TypedDataDomain, TypedDataParameter } from './utils/types';
export type Witness = {
    witness: {
        [key: string]: unknown;
    };
    witnessTypeName: string;
    witnessType: Record<string, TypedDataParameter[]>;
};
export type TokenPermissions = {
    token: string;
    amount: BigintIsh;
};
export type PermitTransferFrom = {
    permitted: TokenPermissions;
    spender: string;
    nonce: BigintIsh;
    deadline: BigintIsh;
};
export type PermitBatchTransferFrom = {
    permitted: TokenPermissions[];
    spender: string;
    nonce: BigintIsh;
    deadline: BigintIsh;
};
export type PermitTransferFromData = {
    domain: TypedDataDomain;
    types: Record<string, TypedDataParameter[]>;
    values: PermitTransferFrom;
    primaryType: 'PermitTransferFrom';
};
export type PermitWitnessTransferFromData = {
    domain: TypedDataDomain;
    types: Record<string, TypedDataParameter[]>;
    values: PermitTransferFrom & {
        witness: {
            [key: string]: unknown;
        };
    };
    primaryType: 'PermitWitnessTransferFrom';
};
export type PermitBatchTransferFromData = {
    domain: TypedDataDomain;
    types: Record<string, TypedDataParameter[]>;
    values: PermitBatchTransferFrom;
    primaryType: 'PermitBatchTransferFrom';
};
export type PermitBatchWitnessTransferFromData = {
    domain: TypedDataDomain;
    types: Record<string, TypedDataParameter[]>;
    values: PermitBatchTransferFrom & {
        witness: {
            [key: string]: unknown;
        };
    };
    primaryType: 'PermitBatchWitnessTransferFrom';
};
export declare abstract class SignatureTransfer {
    /**
     * Cannot be constructed.
     */
    private constructor();
    static getPermitData<TPermit extends PermitTransferFrom | PermitBatchTransferFrom, TWitness extends Witness | undefined, ReturnType = TPermit extends PermitTransferFrom ? TWitness extends undefined ? PermitTransferFromData : PermitWitnessTransferFromData : TWitness extends undefined ? PermitBatchTransferFromData : PermitBatchWitnessTransferFromData>(permit: TPermit, permit2Address: Address | undefined, chainId: number, witness?: TWitness): ReturnType;
    static hash(permit: PermitTransferFrom | PermitBatchTransferFrom, permit2Address: Address, chainId: number, witness?: Witness): Hex;
}
//# sourceMappingURL=signatureTransfer.d.ts.map