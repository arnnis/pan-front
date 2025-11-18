import { TradeType } from '@pancakeswap/sdk';
import { SmartRouterTrade } from '@pancakeswap/smart-router';
import { MethodParameters } from '@pancakeswap/v3-sdk';
import { PancakeSwapOptions } from './entities/types';
export declare abstract class PancakeSwapUniversalRouter {
    /**
     * Produces the on-chain method name to call and the hex encoded parameters to pass as arguments for a given trade.
     * @param trades to produce call parameters for
     * @param options options for the call parameters
     */
    static swapERC20CallParameters(trade: Omit<SmartRouterTrade<TradeType>, 'gasEstimate'>, options: PancakeSwapOptions): MethodParameters;
    /**
     * Encodes a planned route into a method name and parameters for the Router contract.
     * @param planner the planned route
     * @param nativeCurrencyValue the native currency value of the planned route
     * @param config the router config
     */
    private static encodePlan;
}
//# sourceMappingURL=swapRouter.d.ts.map