import { type Address, type PublicClient } from 'viem';
import { type XSupportedChainId } from '../constants';
import type { SignedOrder } from '../orders/Order';
type SplitNonce = {
    word: bigint;
    bitPos: bigint;
};
export declare class NonceManager {
    private chainId;
    private contract;
    constructor(client: PublicClient, chainId: XSupportedChainId, permit2Address?: Address);
    getSigner(order: SignedOrder): Promise<Address>;
    isUsed(address: Address, nonce: bigint): Promise<boolean>;
    static splitNonce(nonce: bigint): SplitNonce;
}
export {};
//# sourceMappingURL=NonceManager.d.ts.map