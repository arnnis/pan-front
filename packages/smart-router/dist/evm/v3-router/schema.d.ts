import { TradeType } from '@pancakeswap/sdk';
import { ChainId } from '@pancakeswap/chains';
import { FeeAmount } from '@pancakeswap/v3-sdk';
import { z } from 'zod';
import { PoolType } from './types';
export declare const zPools: z.ZodArray<z.ZodUnion<[z.ZodObject<{
    type: z.ZodLiteral<PoolType.V2>;
    reserve0: z.ZodObject<{
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
    reserve1: z.ZodObject<{
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
}, "strip", z.ZodTypeAny, {
    type: PoolType.V2;
    reserve0: {
        value: string;
        currency: {
            symbol: string;
            address: `0x${string}`;
            decimals: number;
        };
    };
    reserve1: {
        value: string;
        currency: {
            symbol: string;
            address: `0x${string}`;
            decimals: number;
        };
    };
}, {
    type: PoolType.V2;
    reserve0: {
        value: string;
        currency: {
            symbol: string;
            address: `0x${string}`;
            decimals: number;
        };
    };
    reserve1: {
        value: string;
        currency: {
            symbol: string;
            address: `0x${string}`;
            decimals: number;
        };
    };
}>, z.ZodObject<{
    type: z.ZodLiteral<PoolType.V3>;
    token0: z.ZodObject<{
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
    token1: z.ZodObject<{
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
    fee: z.ZodNativeEnum<typeof FeeAmount>;
    liquidity: z.ZodString;
    sqrtRatioX96: z.ZodString;
    tick: z.ZodNumber;
    address: z.ZodType<`0x${string}`, z.ZodTypeDef, `0x${string}`>;
    token0ProtocolFee: z.ZodString;
    token1ProtocolFee: z.ZodString;
}, "strip", z.ZodTypeAny, {
    address: `0x${string}`;
    type: PoolType.V3;
    token0: {
        symbol: string;
        address: `0x${string}`;
        decimals: number;
    };
    token1: {
        symbol: string;
        address: `0x${string}`;
        decimals: number;
    };
    fee: FeeAmount;
    liquidity: string;
    sqrtRatioX96: string;
    tick: number;
    token0ProtocolFee: string;
    token1ProtocolFee: string;
}, {
    address: `0x${string}`;
    type: PoolType.V3;
    token0: {
        symbol: string;
        address: `0x${string}`;
        decimals: number;
    };
    token1: {
        symbol: string;
        address: `0x${string}`;
        decimals: number;
    };
    fee: FeeAmount;
    liquidity: string;
    sqrtRatioX96: string;
    tick: number;
    token0ProtocolFee: string;
    token1ProtocolFee: string;
}>, z.ZodObject<{
    type: z.ZodLiteral<PoolType.STABLE>;
    balances: z.ZodArray<z.ZodObject<{
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
    }>, "many">;
    amplifier: z.ZodString;
    fee: z.ZodString;
    address: z.ZodType<`0x${string}`, z.ZodTypeDef, `0x${string}`>;
}, "strip", z.ZodTypeAny, {
    address: `0x${string}`;
    type: PoolType.STABLE;
    balances: {
        value: string;
        currency: {
            symbol: string;
            address: `0x${string}`;
            decimals: number;
        };
    }[];
    fee: string;
    amplifier: string;
}, {
    address: `0x${string}`;
    type: PoolType.STABLE;
    balances: {
        value: string;
        currency: {
            symbol: string;
            address: `0x${string}`;
            decimals: number;
        };
    }[];
    fee: string;
    amplifier: string;
}>, z.ZodObject<{
    type: z.ZodLiteral<PoolType.V4CL>;
    id: z.ZodType<`0x${string}`, z.ZodTypeDef, `0x${string}`>;
    currency0: z.ZodObject<{
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
    currency1: z.ZodObject<{
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
    fee: z.ZodNativeEnum<typeof FeeAmount>;
    liquidity: z.ZodString;
    sqrtRatioX96: z.ZodString;
    tick: z.ZodNumber;
    tickSpacing: z.ZodNumber;
    poolManager: z.ZodType<`0x${string}`, z.ZodTypeDef, `0x${string}`>;
    hooks: z.ZodOptional<z.ZodType<`0x${string}`, z.ZodTypeDef, `0x${string}`>>;
}, "strip", z.ZodTypeAny, {
    type: PoolType.V4CL;
    id: `0x${string}`;
    currency0: {
        symbol: string;
        address: `0x${string}`;
        decimals: number;
    };
    currency1: {
        symbol: string;
        address: `0x${string}`;
        decimals: number;
    };
    fee: FeeAmount;
    liquidity: string;
    sqrtRatioX96: string;
    tick: number;
    tickSpacing: number;
    poolManager: `0x${string}`;
    hooks?: `0x${string}` | undefined;
}, {
    type: PoolType.V4CL;
    id: `0x${string}`;
    currency0: {
        symbol: string;
        address: `0x${string}`;
        decimals: number;
    };
    currency1: {
        symbol: string;
        address: `0x${string}`;
        decimals: number;
    };
    fee: FeeAmount;
    liquidity: string;
    sqrtRatioX96: string;
    tick: number;
    tickSpacing: number;
    poolManager: `0x${string}`;
    hooks?: `0x${string}` | undefined;
}>, z.ZodObject<{
    type: z.ZodLiteral<PoolType.V4BIN>;
    id: z.ZodType<`0x${string}`, z.ZodTypeDef, `0x${string}`>;
    currency0: z.ZodObject<{
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
    currency1: z.ZodObject<{
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
    fee: z.ZodNativeEnum<typeof FeeAmount>;
    activeId: z.ZodNumber;
    binStep: z.ZodNumber;
    poolManager: z.ZodType<`0x${string}`, z.ZodTypeDef, `0x${string}`>;
    hooks: z.ZodOptional<z.ZodType<`0x${string}`, z.ZodTypeDef, `0x${string}`>>;
}, "strip", z.ZodTypeAny, {
    type: PoolType.V4BIN;
    id: `0x${string}`;
    currency0: {
        symbol: string;
        address: `0x${string}`;
        decimals: number;
    };
    currency1: {
        symbol: string;
        address: `0x${string}`;
        decimals: number;
    };
    fee: FeeAmount;
    activeId: number;
    binStep: number;
    poolManager: `0x${string}`;
    hooks?: `0x${string}` | undefined;
}, {
    type: PoolType.V4BIN;
    id: `0x${string}`;
    currency0: {
        symbol: string;
        address: `0x${string}`;
        decimals: number;
    };
    currency1: {
        symbol: string;
        address: `0x${string}`;
        decimals: number;
    };
    fee: FeeAmount;
    activeId: number;
    binStep: number;
    poolManager: `0x${string}`;
    hooks?: `0x${string}` | undefined;
}>]>, "many">;
export declare const zRouterGetParams: z.ZodObject<{
    blockNumber: z.ZodOptional<z.ZodString>;
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
    chainId: z.ZodNativeEnum<typeof ChainId>;
    tradeType: z.ZodNativeEnum<typeof TradeType>;
    maxSplits: z.ZodOptional<z.ZodNumber>;
    gasPriceWei: z.ZodOptional<z.ZodString>;
    maxHops: z.ZodOptional<z.ZodNumber>;
    poolTypes: z.ZodOptional<z.ZodArray<z.ZodNativeEnum<typeof PoolType>, "many">>;
}, "strip", z.ZodTypeAny, {
    currency: {
        symbol: string;
        address: `0x${string}`;
        decimals: number;
    };
    amount: {
        value: string;
        currency: {
            symbol: string;
            address: `0x${string}`;
            decimals: number;
        };
    };
    chainId: ChainId;
    tradeType: TradeType;
    blockNumber?: string | undefined;
    maxSplits?: number | undefined;
    gasPriceWei?: string | undefined;
    maxHops?: number | undefined;
    poolTypes?: PoolType[] | undefined;
}, {
    currency: {
        symbol: string;
        address: `0x${string}`;
        decimals: number;
    };
    amount: {
        value: string;
        currency: {
            symbol: string;
            address: `0x${string}`;
            decimals: number;
        };
    };
    chainId: ChainId;
    tradeType: TradeType;
    blockNumber?: string | undefined;
    maxSplits?: number | undefined;
    gasPriceWei?: string | undefined;
    maxHops?: number | undefined;
    poolTypes?: PoolType[] | undefined;
}>;
export declare const zRouterPostParams: z.ZodObject<{
    blockNumber: z.ZodOptional<z.ZodString>;
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
    chainId: z.ZodNativeEnum<typeof ChainId>;
    tradeType: z.ZodNativeEnum<typeof TradeType>;
    maxSplits: z.ZodOptional<z.ZodNumber>;
    gasPriceWei: z.ZodOptional<z.ZodString>;
    quoteCurrencyUsdPrice: z.ZodOptional<z.ZodNumber>;
    nativeCurrencyUsdPrice: z.ZodOptional<z.ZodNumber>;
    maxHops: z.ZodOptional<z.ZodNumber>;
    poolTypes: z.ZodOptional<z.ZodArray<z.ZodNativeEnum<typeof PoolType>, "many">>;
    candidatePools: z.ZodArray<z.ZodUnion<[z.ZodObject<{
        type: z.ZodLiteral<PoolType.V2>;
        reserve0: z.ZodObject<{
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
        reserve1: z.ZodObject<{
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
    }, "strip", z.ZodTypeAny, {
        type: PoolType.V2;
        reserve0: {
            value: string;
            currency: {
                symbol: string;
                address: `0x${string}`;
                decimals: number;
            };
        };
        reserve1: {
            value: string;
            currency: {
                symbol: string;
                address: `0x${string}`;
                decimals: number;
            };
        };
    }, {
        type: PoolType.V2;
        reserve0: {
            value: string;
            currency: {
                symbol: string;
                address: `0x${string}`;
                decimals: number;
            };
        };
        reserve1: {
            value: string;
            currency: {
                symbol: string;
                address: `0x${string}`;
                decimals: number;
            };
        };
    }>, z.ZodObject<{
        type: z.ZodLiteral<PoolType.V3>;
        token0: z.ZodObject<{
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
        token1: z.ZodObject<{
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
        fee: z.ZodNativeEnum<typeof FeeAmount>;
        liquidity: z.ZodString;
        sqrtRatioX96: z.ZodString;
        tick: z.ZodNumber;
        address: z.ZodType<`0x${string}`, z.ZodTypeDef, `0x${string}`>;
        token0ProtocolFee: z.ZodString;
        token1ProtocolFee: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        address: `0x${string}`;
        type: PoolType.V3;
        token0: {
            symbol: string;
            address: `0x${string}`;
            decimals: number;
        };
        token1: {
            symbol: string;
            address: `0x${string}`;
            decimals: number;
        };
        fee: FeeAmount;
        liquidity: string;
        sqrtRatioX96: string;
        tick: number;
        token0ProtocolFee: string;
        token1ProtocolFee: string;
    }, {
        address: `0x${string}`;
        type: PoolType.V3;
        token0: {
            symbol: string;
            address: `0x${string}`;
            decimals: number;
        };
        token1: {
            symbol: string;
            address: `0x${string}`;
            decimals: number;
        };
        fee: FeeAmount;
        liquidity: string;
        sqrtRatioX96: string;
        tick: number;
        token0ProtocolFee: string;
        token1ProtocolFee: string;
    }>, z.ZodObject<{
        type: z.ZodLiteral<PoolType.STABLE>;
        balances: z.ZodArray<z.ZodObject<{
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
        }>, "many">;
        amplifier: z.ZodString;
        fee: z.ZodString;
        address: z.ZodType<`0x${string}`, z.ZodTypeDef, `0x${string}`>;
    }, "strip", z.ZodTypeAny, {
        address: `0x${string}`;
        type: PoolType.STABLE;
        balances: {
            value: string;
            currency: {
                symbol: string;
                address: `0x${string}`;
                decimals: number;
            };
        }[];
        fee: string;
        amplifier: string;
    }, {
        address: `0x${string}`;
        type: PoolType.STABLE;
        balances: {
            value: string;
            currency: {
                symbol: string;
                address: `0x${string}`;
                decimals: number;
            };
        }[];
        fee: string;
        amplifier: string;
    }>, z.ZodObject<{
        type: z.ZodLiteral<PoolType.V4CL>;
        id: z.ZodType<`0x${string}`, z.ZodTypeDef, `0x${string}`>;
        currency0: z.ZodObject<{
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
        currency1: z.ZodObject<{
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
        fee: z.ZodNativeEnum<typeof FeeAmount>;
        liquidity: z.ZodString;
        sqrtRatioX96: z.ZodString;
        tick: z.ZodNumber;
        tickSpacing: z.ZodNumber;
        poolManager: z.ZodType<`0x${string}`, z.ZodTypeDef, `0x${string}`>;
        hooks: z.ZodOptional<z.ZodType<`0x${string}`, z.ZodTypeDef, `0x${string}`>>;
    }, "strip", z.ZodTypeAny, {
        type: PoolType.V4CL;
        id: `0x${string}`;
        currency0: {
            symbol: string;
            address: `0x${string}`;
            decimals: number;
        };
        currency1: {
            symbol: string;
            address: `0x${string}`;
            decimals: number;
        };
        fee: FeeAmount;
        liquidity: string;
        sqrtRatioX96: string;
        tick: number;
        tickSpacing: number;
        poolManager: `0x${string}`;
        hooks?: `0x${string}` | undefined;
    }, {
        type: PoolType.V4CL;
        id: `0x${string}`;
        currency0: {
            symbol: string;
            address: `0x${string}`;
            decimals: number;
        };
        currency1: {
            symbol: string;
            address: `0x${string}`;
            decimals: number;
        };
        fee: FeeAmount;
        liquidity: string;
        sqrtRatioX96: string;
        tick: number;
        tickSpacing: number;
        poolManager: `0x${string}`;
        hooks?: `0x${string}` | undefined;
    }>, z.ZodObject<{
        type: z.ZodLiteral<PoolType.V4BIN>;
        id: z.ZodType<`0x${string}`, z.ZodTypeDef, `0x${string}`>;
        currency0: z.ZodObject<{
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
        currency1: z.ZodObject<{
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
        fee: z.ZodNativeEnum<typeof FeeAmount>;
        activeId: z.ZodNumber;
        binStep: z.ZodNumber;
        poolManager: z.ZodType<`0x${string}`, z.ZodTypeDef, `0x${string}`>;
        hooks: z.ZodOptional<z.ZodType<`0x${string}`, z.ZodTypeDef, `0x${string}`>>;
    }, "strip", z.ZodTypeAny, {
        type: PoolType.V4BIN;
        id: `0x${string}`;
        currency0: {
            symbol: string;
            address: `0x${string}`;
            decimals: number;
        };
        currency1: {
            symbol: string;
            address: `0x${string}`;
            decimals: number;
        };
        fee: FeeAmount;
        activeId: number;
        binStep: number;
        poolManager: `0x${string}`;
        hooks?: `0x${string}` | undefined;
    }, {
        type: PoolType.V4BIN;
        id: `0x${string}`;
        currency0: {
            symbol: string;
            address: `0x${string}`;
            decimals: number;
        };
        currency1: {
            symbol: string;
            address: `0x${string}`;
            decimals: number;
        };
        fee: FeeAmount;
        activeId: number;
        binStep: number;
        poolManager: `0x${string}`;
        hooks?: `0x${string}` | undefined;
    }>]>, "many">;
    onChainQuoterGasLimit: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    currency: {
        symbol: string;
        address: `0x${string}`;
        decimals: number;
    };
    amount: {
        value: string;
        currency: {
            symbol: string;
            address: `0x${string}`;
            decimals: number;
        };
    };
    chainId: ChainId;
    tradeType: TradeType;
    candidatePools: ({
        type: PoolType.V2;
        reserve0: {
            value: string;
            currency: {
                symbol: string;
                address: `0x${string}`;
                decimals: number;
            };
        };
        reserve1: {
            value: string;
            currency: {
                symbol: string;
                address: `0x${string}`;
                decimals: number;
            };
        };
    } | {
        address: `0x${string}`;
        type: PoolType.V3;
        token0: {
            symbol: string;
            address: `0x${string}`;
            decimals: number;
        };
        token1: {
            symbol: string;
            address: `0x${string}`;
            decimals: number;
        };
        fee: FeeAmount;
        liquidity: string;
        sqrtRatioX96: string;
        tick: number;
        token0ProtocolFee: string;
        token1ProtocolFee: string;
    } | {
        address: `0x${string}`;
        type: PoolType.STABLE;
        balances: {
            value: string;
            currency: {
                symbol: string;
                address: `0x${string}`;
                decimals: number;
            };
        }[];
        fee: string;
        amplifier: string;
    } | {
        type: PoolType.V4CL;
        id: `0x${string}`;
        currency0: {
            symbol: string;
            address: `0x${string}`;
            decimals: number;
        };
        currency1: {
            symbol: string;
            address: `0x${string}`;
            decimals: number;
        };
        fee: FeeAmount;
        liquidity: string;
        sqrtRatioX96: string;
        tick: number;
        tickSpacing: number;
        poolManager: `0x${string}`;
        hooks?: `0x${string}` | undefined;
    } | {
        type: PoolType.V4BIN;
        id: `0x${string}`;
        currency0: {
            symbol: string;
            address: `0x${string}`;
            decimals: number;
        };
        currency1: {
            symbol: string;
            address: `0x${string}`;
            decimals: number;
        };
        fee: FeeAmount;
        activeId: number;
        binStep: number;
        poolManager: `0x${string}`;
        hooks?: `0x${string}` | undefined;
    })[];
    blockNumber?: string | undefined;
    maxSplits?: number | undefined;
    gasPriceWei?: string | undefined;
    quoteCurrencyUsdPrice?: number | undefined;
    nativeCurrencyUsdPrice?: number | undefined;
    maxHops?: number | undefined;
    poolTypes?: PoolType[] | undefined;
    onChainQuoterGasLimit?: string | undefined;
}, {
    currency: {
        symbol: string;
        address: `0x${string}`;
        decimals: number;
    };
    amount: {
        value: string;
        currency: {
            symbol: string;
            address: `0x${string}`;
            decimals: number;
        };
    };
    chainId: ChainId;
    tradeType: TradeType;
    candidatePools: ({
        type: PoolType.V2;
        reserve0: {
            value: string;
            currency: {
                symbol: string;
                address: `0x${string}`;
                decimals: number;
            };
        };
        reserve1: {
            value: string;
            currency: {
                symbol: string;
                address: `0x${string}`;
                decimals: number;
            };
        };
    } | {
        address: `0x${string}`;
        type: PoolType.V3;
        token0: {
            symbol: string;
            address: `0x${string}`;
            decimals: number;
        };
        token1: {
            symbol: string;
            address: `0x${string}`;
            decimals: number;
        };
        fee: FeeAmount;
        liquidity: string;
        sqrtRatioX96: string;
        tick: number;
        token0ProtocolFee: string;
        token1ProtocolFee: string;
    } | {
        address: `0x${string}`;
        type: PoolType.STABLE;
        balances: {
            value: string;
            currency: {
                symbol: string;
                address: `0x${string}`;
                decimals: number;
            };
        }[];
        fee: string;
        amplifier: string;
    } | {
        type: PoolType.V4CL;
        id: `0x${string}`;
        currency0: {
            symbol: string;
            address: `0x${string}`;
            decimals: number;
        };
        currency1: {
            symbol: string;
            address: `0x${string}`;
            decimals: number;
        };
        fee: FeeAmount;
        liquidity: string;
        sqrtRatioX96: string;
        tick: number;
        tickSpacing: number;
        poolManager: `0x${string}`;
        hooks?: `0x${string}` | undefined;
    } | {
        type: PoolType.V4BIN;
        id: `0x${string}`;
        currency0: {
            symbol: string;
            address: `0x${string}`;
            decimals: number;
        };
        currency1: {
            symbol: string;
            address: `0x${string}`;
            decimals: number;
        };
        fee: FeeAmount;
        activeId: number;
        binStep: number;
        poolManager: `0x${string}`;
        hooks?: `0x${string}` | undefined;
    })[];
    blockNumber?: string | undefined;
    maxSplits?: number | undefined;
    gasPriceWei?: string | undefined;
    quoteCurrencyUsdPrice?: number | undefined;
    nativeCurrencyUsdPrice?: number | undefined;
    maxHops?: number | undefined;
    poolTypes?: PoolType[] | undefined;
    onChainQuoterGasLimit?: string | undefined;
}>;
export type RouterPostParams = z.infer<typeof zRouterPostParams>;
export type RouterGetParams = z.infer<typeof zRouterGetParams>;
export type SerializedPools = z.infer<typeof zPools>;
//# sourceMappingURL=schema.d.ts.map