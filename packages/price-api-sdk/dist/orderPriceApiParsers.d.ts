import { ChainId } from '@pancakeswap/chains';
import { PoolType, V4Router } from '@pancakeswap/smart-router';
import { Currency, CurrencyAmount, Percent, TradeType, type BigintIsh } from '@pancakeswap/swap-sdk-core';
import { AMMPriceResponse, ErrorResponse, PriceOrder, type PriceResponse, type Request } from './types';
type RequestInputs = {
    amount: CurrencyAmount<Currency>;
    quoteCurrency: Currency;
    tradeType: TradeType;
    slippage?: Percent;
    amm?: {
        poolTypes?: PoolType[];
        maxHops?: number;
        maxSplits?: number;
        gasPriceWei?: BigintIsh;
    };
    x?: {
        useSyntheticQuotes?: boolean;
        swapper?: `0x${string}`;
        exclusivityOverrideBps?: number;
        startTimeBufferSecs?: number;
        auctionPeriodSecs?: number;
        deadlineBufferSecs?: number;
    };
};
export declare function getRequestBody({ amount, quoteCurrency, tradeType, amm, x, slippage }: RequestInputs): Request;
export declare function parseQuoteResponse<input extends Currency, output extends Currency, tradeType extends TradeType = TradeType>(res: PriceResponse | ErrorResponse, { chainId, currencyOut, currencyIn, tradeType, }: {
    chainId: ChainId;
    currencyIn: input;
    currencyOut: output;
    tradeType: TradeType;
}): PriceOrder<input, output, tradeType>;
export declare function parseAMMPriceResponse(chainId: ChainId, res: AMMPriceResponse): V4Router.V4TradeWithoutGraph<TradeType> & {
    gasUseEstimateUSD: number;
};
export {};
//# sourceMappingURL=orderPriceApiParsers.d.ts.map