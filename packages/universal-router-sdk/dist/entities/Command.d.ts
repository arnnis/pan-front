import { RoutePlanner } from '../utils/routerCommands';
export type TradeConfig = {
    allowRevert: boolean;
};
export declare enum RouterTradeType {
    PancakeSwapTrade = "PancakeSwapTrade",
    UnwrapWETH = "UnwrapWETH"
}
export interface Command {
    tradeType: RouterTradeType;
    encode(planner: RoutePlanner, config: TradeConfig): void;
}
//# sourceMappingURL=Command.d.ts.map