import { TradeType } from '@pancakeswap/sdk';
import { SmartRouterTrade } from '@pancakeswap/smart-router';
import { RoutePlanner } from '../../utils/routerCommands';
import { Command, RouterTradeType } from '../Command';
import { PancakeSwapOptions } from '../types';
export declare class PancakeSwapTrade implements Command {
    trade: Omit<SmartRouterTrade<TradeType>, 'gasEstimate'>;
    options: PancakeSwapOptions;
    readonly tradeType: RouterTradeType;
    readonly type: TradeType;
    constructor(trade: Omit<SmartRouterTrade<TradeType>, 'gasEstimate'>, options: PancakeSwapOptions);
    encode(planner: RoutePlanner): void;
}
//# sourceMappingURL=pancakeswap.d.ts.map