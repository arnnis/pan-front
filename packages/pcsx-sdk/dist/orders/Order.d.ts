import type { PermitTransferFrom, PermitTransferFromData, Witness } from '@pancakeswap/permit2-sdk';
import type { Address, Hex } from 'viem';
import type { XSupportedChainId } from '../constants';
export declare const OrderInfoStruct = "struct OrderInfo {address reactor; address swapper; uint256 nonce; uint256 deadline; address additionalValidationContract; bytes additionalValidationData; }";
export type OrderInfo = {
    reactor: Address;
    swapper: Address;
    nonce: bigint;
    deadline: bigint;
    additionalValidationContract: Address;
    additionalValidationData: Hex;
};
export type TokenAmount = {
    readonly token: string;
    readonly amount: bigint;
};
export type SignedOrder = {
    order: Order;
    signature: Hex;
};
export interface ResolvedOrder {
    input: TokenAmount;
    outputs: TokenAmount[];
    info: OrderInfo;
    sig: Hex;
    hash: Hex;
}
export declare abstract class Order {
    abstract info: OrderInfo;
    abstract chainId: XSupportedChainId;
    /**
     * Returns the abi encoded order
     * @return The abi encoded serialized order which can be submitted on-chain
     */
    abstract encode(): Hex;
    /**
     * Returns the witness for permit2
     * @return The witness
     */
    abstract witness(): Witness;
    /**
     * Returns the json for permit2 transfer details
     * @return The json for permit2 transfer details
     */
    abstract toPermit(): PermitTransferFrom;
    /**
     * Returns the data for generating the maker EIP-712 permit signature
     * @return The data for generating the maker EIP-712 permit signature
     */
    abstract permitData(): PermitTransferFromData;
    /**
     * Returns the order hash
     * @return The order hash which is used as a key on-chain
     */
    abstract hash(): Hex;
}
//# sourceMappingURL=Order.d.ts.map