import { ChainId } from '@pancakeswap/chains';
import { BigintIsh } from '@pancakeswap/sdk';
import { RoutePlanner } from '../../utils/routerCommands';
import { Command, RouterTradeType, TradeConfig } from '../Command';
import { Permit2Signature } from '../types';
export declare class UnwrapWETH implements Command {
    readonly tradeType: RouterTradeType;
    readonly permit2Data: Permit2Signature | undefined;
    readonly wethAddress: string;
    readonly amount: BigintIsh;
    constructor(amount: BigintIsh, chainId: ChainId, permit2?: Permit2Signature);
    encode(planner: RoutePlanner, _: TradeConfig): void;
}
//# sourceMappingURL=unwrapWETH.d.ts.map