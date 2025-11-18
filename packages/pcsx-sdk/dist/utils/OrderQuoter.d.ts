import { type Address, type PublicClient } from 'viem';
import { type XSupportedChainId } from '../constants';
import { OrderValidation } from '../errors';
import type { ResolvedOrder, SignedOrder } from '../orders/Order';
export type OrderQuote = {
    validation: OrderValidation;
    quote: ResolvedOrder | undefined;
};
export declare class OrderQuoter {
    private client;
    private chainId;
    private contract;
    constructor(client: PublicClient, chainId: XSupportedChainId, orderQuoterAddress?: Address);
    quote(order: SignedOrder): Promise<OrderQuote>;
    quoteBatch(orders: SignedOrder[]): Promise<OrderQuote[]>;
    private getValidations;
    private checkNonceOrDateExpiry;
}
//# sourceMappingURL=OrderQuoter.d.ts.map