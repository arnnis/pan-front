import { TradeType } from '@pancakeswap/swap-sdk-core';
import { ChainId } from '@pancakeswap/chains';
import { z, ZodObject } from 'zod';
type GetRouterPostParamsSchemaOptions = {
    zCandidatePools: ZodObject<any>;
};
export declare function getRouterPostParamsSchema({ zCandidatePools }: GetRouterPostParamsSchemaOptions): z.ZodObject<{
    tradeType: z.ZodNativeEnum<typeof TradeType>;
    amount: z.ZodObject<{
        currency: z.ZodObject<{
            address: z.ZodType<`0x${string}`, z.ZodTypeDef, `0x${string}`>;
            decimals: z.ZodNumber;
            symbol: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            symbol: string;
            address: `0x${string}`;
            decimals: number;
        }, {
            symbol: string;
            address: `0x${string}`;
            decimals: number;
        }>;
        value: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        value: string;
        currency: {
            symbol: string;
            address: `0x${string}`;
            decimals: number;
        };
    }, {
        value: string;
        currency: {
            symbol: string;
            address: `0x${string}`;
            decimals: number;
        };
    }>;
    gasPriceWei: z.ZodOptional<z.ZodString>;
    chainId: z.ZodNativeEnum<typeof ChainId>;
    maxHops: z.ZodOptional<z.ZodNumber>;
    maxSplits: z.ZodOptional<z.ZodNumber>;
    candidatePools: z.ZodObject<any, z.UnknownKeysParam, z.ZodTypeAny, {
        [x: string]: any;
    }, {
        [x: string]: any;
    }>;
    currency: z.ZodObject<{
        address: z.ZodType<`0x${string}`, z.ZodTypeDef, `0x${string}`>;
        decimals: z.ZodNumber;
        symbol: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        symbol: string;
        address: `0x${string}`;
        decimals: number;
    }, {
        symbol: string;
        address: `0x${string}`;
        decimals: number;
    }>;
}, "strip", z.ZodTypeAny, {
    tradeType: TradeType;
    amount: {
        value: string;
        currency: {
            symbol: string;
            address: `0x${string}`;
            decimals: number;
        };
    };
    chainId: ChainId;
    candidatePools: {
        [x: string]: any;
    };
    currency: {
        symbol: string;
        address: `0x${string}`;
        decimals: number;
    };
    gasPriceWei?: string | undefined;
    maxHops?: number | undefined;
    maxSplits?: number | undefined;
}, {
    tradeType: TradeType;
    amount: {
        value: string;
        currency: {
            symbol: string;
            address: `0x${string}`;
            decimals: number;
        };
    };
    chainId: ChainId;
    candidatePools: {
        [x: string]: any;
    };
    currency: {
        symbol: string;
        address: `0x${string}`;
        decimals: number;
    };
    gasPriceWei?: string | undefined;
    maxHops?: number | undefined;
    maxSplits?: number | undefined;
}>;
export type RouterPostParams = z.infer<ReturnType<typeof getRouterPostParamsSchema>>;
export {};
//# sourceMappingURL=schema.d.ts.map