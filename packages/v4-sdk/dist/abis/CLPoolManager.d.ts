export declare const CLPoolManager: readonly [{
    readonly type: "constructor";
    readonly inputs: readonly [{
        readonly name: "_vault";
        readonly type: "address";
        readonly internalType: "contract IVault";
    }, {
        readonly name: "controllerGasLimit";
        readonly type: "uint256";
        readonly internalType: "uint256";
    }];
    readonly stateMutability: "nonpayable";
}, {
    readonly type: "function";
    readonly name: "MAX_TICK_SPACING";
    readonly inputs: readonly [];
    readonly outputs: readonly [{
        readonly name: "";
        readonly type: "int24";
        readonly internalType: "int24";
    }];
    readonly stateMutability: "view";
}, {
    readonly type: "function";
    readonly name: "MIN_PROTOCOL_FEE_DENOMINATOR";
    readonly inputs: readonly [];
    readonly outputs: readonly [{
        readonly name: "";
        readonly type: "uint8";
        readonly internalType: "uint8";
    }];
    readonly stateMutability: "view";
}, {
    readonly type: "function";
    readonly name: "MIN_TICK_SPACING";
    readonly inputs: readonly [];
    readonly outputs: readonly [{
        readonly name: "";
        readonly type: "int24";
        readonly internalType: "int24";
    }];
    readonly stateMutability: "view";
}, {
    readonly type: "function";
    readonly name: "collectProtocolFees";
    readonly inputs: readonly [{
        readonly name: "recipient";
        readonly type: "address";
        readonly internalType: "address";
    }, {
        readonly name: "currency";
        readonly type: "address";
        readonly internalType: "Currency";
    }, {
        readonly name: "amount";
        readonly type: "uint256";
        readonly internalType: "uint256";
    }];
    readonly outputs: readonly [{
        readonly name: "amountCollected";
        readonly type: "uint256";
        readonly internalType: "uint256";
    }];
    readonly stateMutability: "nonpayable";
}, {
    readonly type: "function";
    readonly name: "donate";
    readonly inputs: readonly [{
        readonly name: "key";
        readonly type: "tuple";
        readonly internalType: "struct PoolKey";
        readonly components: readonly [{
            readonly name: "currency0";
            readonly type: "address";
            readonly internalType: "Currency";
        }, {
            readonly name: "currency1";
            readonly type: "address";
            readonly internalType: "Currency";
        }, {
            readonly name: "hooks";
            readonly type: "address";
            readonly internalType: "contract IHooks";
        }, {
            readonly name: "poolManager";
            readonly type: "address";
            readonly internalType: "contract IPoolManager";
        }, {
            readonly name: "fee";
            readonly type: "uint24";
            readonly internalType: "uint24";
        }, {
            readonly name: "parameters";
            readonly type: "bytes32";
            readonly internalType: "bytes32";
        }];
    }, {
        readonly name: "amount0";
        readonly type: "uint256";
        readonly internalType: "uint256";
    }, {
        readonly name: "amount1";
        readonly type: "uint256";
        readonly internalType: "uint256";
    }, {
        readonly name: "hookData";
        readonly type: "bytes";
        readonly internalType: "bytes";
    }];
    readonly outputs: readonly [{
        readonly name: "delta";
        readonly type: "int256";
        readonly internalType: "BalanceDelta";
    }];
    readonly stateMutability: "nonpayable";
}, {
    readonly type: "function";
    readonly name: "extsload";
    readonly inputs: readonly [{
        readonly name: "slot";
        readonly type: "bytes32";
        readonly internalType: "bytes32";
    }];
    readonly outputs: readonly [{
        readonly name: "val";
        readonly type: "bytes32";
        readonly internalType: "bytes32";
    }];
    readonly stateMutability: "view";
}, {
    readonly type: "function";
    readonly name: "extsload";
    readonly inputs: readonly [{
        readonly name: "slots";
        readonly type: "bytes32[]";
        readonly internalType: "bytes32[]";
    }];
    readonly outputs: readonly [{
        readonly name: "";
        readonly type: "bytes32[]";
        readonly internalType: "bytes32[]";
    }];
    readonly stateMutability: "view";
}, {
    readonly type: "function";
    readonly name: "getLiquidity";
    readonly inputs: readonly [{
        readonly name: "id";
        readonly type: "bytes32";
        readonly internalType: "PoolId";
    }, {
        readonly name: "_owner";
        readonly type: "address";
        readonly internalType: "address";
    }, {
        readonly name: "tickLower";
        readonly type: "int24";
        readonly internalType: "int24";
    }, {
        readonly name: "tickUpper";
        readonly type: "int24";
        readonly internalType: "int24";
    }];
    readonly outputs: readonly [{
        readonly name: "liquidity";
        readonly type: "uint128";
        readonly internalType: "uint128";
    }];
    readonly stateMutability: "view";
}, {
    readonly type: "function";
    readonly name: "getLiquidity";
    readonly inputs: readonly [{
        readonly name: "id";
        readonly type: "bytes32";
        readonly internalType: "PoolId";
    }];
    readonly outputs: readonly [{
        readonly name: "liquidity";
        readonly type: "uint128";
        readonly internalType: "uint128";
    }];
    readonly stateMutability: "view";
}, {
    readonly type: "function";
    readonly name: "getLmPool";
    readonly inputs: readonly [{
        readonly name: "id";
        readonly type: "bytes32";
        readonly internalType: "PoolId";
    }];
    readonly outputs: readonly [{
        readonly name: "lmPool";
        readonly type: "address";
        readonly internalType: "address";
    }];
    readonly stateMutability: "view";
}, {
    readonly type: "function";
    readonly name: "getPosition";
    readonly inputs: readonly [{
        readonly name: "id";
        readonly type: "bytes32";
        readonly internalType: "PoolId";
    }, {
        readonly name: "owner";
        readonly type: "address";
        readonly internalType: "address";
    }, {
        readonly name: "tickLower";
        readonly type: "int24";
        readonly internalType: "int24";
    }, {
        readonly name: "tickUpper";
        readonly type: "int24";
        readonly internalType: "int24";
    }];
    readonly outputs: readonly [{
        readonly name: "position";
        readonly type: "tuple";
        readonly internalType: "struct CLPosition.Info";
        readonly components: readonly [{
            readonly name: "liquidity";
            readonly type: "uint128";
            readonly internalType: "uint128";
        }, {
            readonly name: "feeGrowthInside0LastX128";
            readonly type: "uint256";
            readonly internalType: "uint256";
        }, {
            readonly name: "feeGrowthInside1LastX128";
            readonly type: "uint256";
            readonly internalType: "uint256";
        }];
    }];
    readonly stateMutability: "view";
}, {
    readonly type: "function";
    readonly name: "getSlot0";
    readonly inputs: readonly [{
        readonly name: "id";
        readonly type: "bytes32";
        readonly internalType: "PoolId";
    }];
    readonly outputs: readonly [{
        readonly name: "sqrtPriceX96";
        readonly type: "uint160";
        readonly internalType: "uint160";
    }, {
        readonly name: "tick";
        readonly type: "int24";
        readonly internalType: "int24";
    }, {
        readonly name: "protocolFee";
        readonly type: "uint16";
        readonly internalType: "uint16";
    }, {
        readonly name: "swapFee";
        readonly type: "uint24";
        readonly internalType: "uint24";
    }];
    readonly stateMutability: "view";
}, {
    readonly type: "function";
    readonly name: "initialize";
    readonly inputs: readonly [{
        readonly name: "key";
        readonly type: "tuple";
        readonly internalType: "struct PoolKey";
        readonly components: readonly [{
            readonly name: "currency0";
            readonly type: "address";
            readonly internalType: "Currency";
        }, {
            readonly name: "currency1";
            readonly type: "address";
            readonly internalType: "Currency";
        }, {
            readonly name: "hooks";
            readonly type: "address";
            readonly internalType: "contract IHooks";
        }, {
            readonly name: "poolManager";
            readonly type: "address";
            readonly internalType: "contract IPoolManager";
        }, {
            readonly name: "fee";
            readonly type: "uint24";
            readonly internalType: "uint24";
        }, {
            readonly name: "parameters";
            readonly type: "bytes32";
            readonly internalType: "bytes32";
        }];
    }, {
        readonly name: "sqrtPriceX96";
        readonly type: "uint160";
        readonly internalType: "uint160";
    }, {
        readonly name: "hookData";
        readonly type: "bytes";
        readonly internalType: "bytes";
    }];
    readonly outputs: readonly [{
        readonly name: "tick";
        readonly type: "int24";
        readonly internalType: "int24";
    }];
    readonly stateMutability: "nonpayable";
}, {
    readonly type: "function";
    readonly name: "masterChef";
    readonly inputs: readonly [];
    readonly outputs: readonly [{
        readonly name: "";
        readonly type: "address";
        readonly internalType: "address";
    }];
    readonly stateMutability: "view";
}, {
    readonly type: "function";
    readonly name: "modifyLiquidity";
    readonly inputs: readonly [{
        readonly name: "key";
        readonly type: "tuple";
        readonly internalType: "struct PoolKey";
        readonly components: readonly [{
            readonly name: "currency0";
            readonly type: "address";
            readonly internalType: "Currency";
        }, {
            readonly name: "currency1";
            readonly type: "address";
            readonly internalType: "Currency";
        }, {
            readonly name: "hooks";
            readonly type: "address";
            readonly internalType: "contract IHooks";
        }, {
            readonly name: "poolManager";
            readonly type: "address";
            readonly internalType: "contract IPoolManager";
        }, {
            readonly name: "fee";
            readonly type: "uint24";
            readonly internalType: "uint24";
        }, {
            readonly name: "parameters";
            readonly type: "bytes32";
            readonly internalType: "bytes32";
        }];
    }, {
        readonly name: "params";
        readonly type: "tuple";
        readonly internalType: "struct ICLPoolManager.ModifyLiquidityParams";
        readonly components: readonly [{
            readonly name: "tickLower";
            readonly type: "int24";
            readonly internalType: "int24";
        }, {
            readonly name: "tickUpper";
            readonly type: "int24";
            readonly internalType: "int24";
        }, {
            readonly name: "liquidityDelta";
            readonly type: "int256";
            readonly internalType: "int256";
        }];
    }, {
        readonly name: "hookData";
        readonly type: "bytes";
        readonly internalType: "bytes";
    }];
    readonly outputs: readonly [{
        readonly name: "delta";
        readonly type: "int256";
        readonly internalType: "BalanceDelta";
    }];
    readonly stateMutability: "nonpayable";
}, {
    readonly type: "function";
    readonly name: "owner";
    readonly inputs: readonly [];
    readonly outputs: readonly [{
        readonly name: "";
        readonly type: "address";
        readonly internalType: "address";
    }];
    readonly stateMutability: "view";
}, {
    readonly type: "function";
    readonly name: "pools";
    readonly inputs: readonly [{
        readonly name: "id";
        readonly type: "bytes32";
        readonly internalType: "PoolId";
    }];
    readonly outputs: readonly [{
        readonly name: "slot0";
        readonly type: "tuple";
        readonly internalType: "struct CLPool.Slot0";
        readonly components: readonly [{
            readonly name: "sqrtPriceX96";
            readonly type: "uint160";
            readonly internalType: "uint160";
        }, {
            readonly name: "tick";
            readonly type: "int24";
            readonly internalType: "int24";
        }, {
            readonly name: "protocolFee";
            readonly type: "uint16";
            readonly internalType: "uint16";
        }, {
            readonly name: "swapFee";
            readonly type: "uint24";
            readonly internalType: "uint24";
        }];
    }, {
        readonly name: "feeGrowthGlobal0X128";
        readonly type: "uint256";
        readonly internalType: "uint256";
    }, {
        readonly name: "feeGrowthGlobal1X128";
        readonly type: "uint256";
        readonly internalType: "uint256";
    }, {
        readonly name: "liquidity";
        readonly type: "uint128";
        readonly internalType: "uint128";
    }, {
        readonly name: "lmPool";
        readonly type: "address";
        readonly internalType: "contract ICLLmPool";
    }];
    readonly stateMutability: "view";
}, {
    readonly type: "function";
    readonly name: "protocolFeeController";
    readonly inputs: readonly [];
    readonly outputs: readonly [{
        readonly name: "";
        readonly type: "address";
        readonly internalType: "contract IProtocolFeeController";
    }];
    readonly stateMutability: "view";
}, {
    readonly type: "function";
    readonly name: "protocolFeesAccrued";
    readonly inputs: readonly [{
        readonly name: "currency";
        readonly type: "address";
        readonly internalType: "Currency";
    }];
    readonly outputs: readonly [{
        readonly name: "";
        readonly type: "uint256";
        readonly internalType: "uint256";
    }];
    readonly stateMutability: "view";
}, {
    readonly type: "function";
    readonly name: "renounceOwnership";
    readonly inputs: readonly [];
    readonly outputs: readonly [];
    readonly stateMutability: "nonpayable";
}, {
    readonly type: "function";
    readonly name: "setLmPool";
    readonly inputs: readonly [{
        readonly name: "key";
        readonly type: "tuple";
        readonly internalType: "struct PoolKey";
        readonly components: readonly [{
            readonly name: "currency0";
            readonly type: "address";
            readonly internalType: "Currency";
        }, {
            readonly name: "currency1";
            readonly type: "address";
            readonly internalType: "Currency";
        }, {
            readonly name: "hooks";
            readonly type: "address";
            readonly internalType: "contract IHooks";
        }, {
            readonly name: "poolManager";
            readonly type: "address";
            readonly internalType: "contract IPoolManager";
        }, {
            readonly name: "fee";
            readonly type: "uint24";
            readonly internalType: "uint24";
        }, {
            readonly name: "parameters";
            readonly type: "bytes32";
            readonly internalType: "bytes32";
        }];
    }, {
        readonly name: "lmPool";
        readonly type: "address";
        readonly internalType: "address";
    }];
    readonly outputs: readonly [];
    readonly stateMutability: "nonpayable";
}, {
    readonly type: "function";
    readonly name: "setMasterChef";
    readonly inputs: readonly [{
        readonly name: "_masterChef";
        readonly type: "address";
        readonly internalType: "address";
    }];
    readonly outputs: readonly [];
    readonly stateMutability: "nonpayable";
}, {
    readonly type: "function";
    readonly name: "setProtocolFee";
    readonly inputs: readonly [{
        readonly name: "key";
        readonly type: "tuple";
        readonly internalType: "struct PoolKey";
        readonly components: readonly [{
            readonly name: "currency0";
            readonly type: "address";
            readonly internalType: "Currency";
        }, {
            readonly name: "currency1";
            readonly type: "address";
            readonly internalType: "Currency";
        }, {
            readonly name: "hooks";
            readonly type: "address";
            readonly internalType: "contract IHooks";
        }, {
            readonly name: "poolManager";
            readonly type: "address";
            readonly internalType: "contract IPoolManager";
        }, {
            readonly name: "fee";
            readonly type: "uint24";
            readonly internalType: "uint24";
        }, {
            readonly name: "parameters";
            readonly type: "bytes32";
            readonly internalType: "bytes32";
        }];
    }];
    readonly outputs: readonly [];
    readonly stateMutability: "nonpayable";
}, {
    readonly type: "function";
    readonly name: "setProtocolFeeController";
    readonly inputs: readonly [{
        readonly name: "controller";
        readonly type: "address";
        readonly internalType: "contract IProtocolFeeController";
    }];
    readonly outputs: readonly [];
    readonly stateMutability: "nonpayable";
}, {
    readonly type: "function";
    readonly name: "swap";
    readonly inputs: readonly [{
        readonly name: "key";
        readonly type: "tuple";
        readonly internalType: "struct PoolKey";
        readonly components: readonly [{
            readonly name: "currency0";
            readonly type: "address";
            readonly internalType: "Currency";
        }, {
            readonly name: "currency1";
            readonly type: "address";
            readonly internalType: "Currency";
        }, {
            readonly name: "hooks";
            readonly type: "address";
            readonly internalType: "contract IHooks";
        }, {
            readonly name: "poolManager";
            readonly type: "address";
            readonly internalType: "contract IPoolManager";
        }, {
            readonly name: "fee";
            readonly type: "uint24";
            readonly internalType: "uint24";
        }, {
            readonly name: "parameters";
            readonly type: "bytes32";
            readonly internalType: "bytes32";
        }];
    }, {
        readonly name: "params";
        readonly type: "tuple";
        readonly internalType: "struct ICLPoolManager.SwapParams";
        readonly components: readonly [{
            readonly name: "zeroForOne";
            readonly type: "bool";
            readonly internalType: "bool";
        }, {
            readonly name: "amountSpecified";
            readonly type: "int256";
            readonly internalType: "int256";
        }, {
            readonly name: "sqrtPriceLimitX96";
            readonly type: "uint160";
            readonly internalType: "uint160";
        }];
    }, {
        readonly name: "hookData";
        readonly type: "bytes";
        readonly internalType: "bytes";
    }];
    readonly outputs: readonly [{
        readonly name: "delta";
        readonly type: "int256";
        readonly internalType: "BalanceDelta";
    }];
    readonly stateMutability: "nonpayable";
}, {
    readonly type: "function";
    readonly name: "transferOwnership";
    readonly inputs: readonly [{
        readonly name: "newOwner";
        readonly type: "address";
        readonly internalType: "address";
    }];
    readonly outputs: readonly [];
    readonly stateMutability: "nonpayable";
}, {
    readonly type: "function";
    readonly name: "updateDynamicSwapFee";
    readonly inputs: readonly [{
        readonly name: "key";
        readonly type: "tuple";
        readonly internalType: "struct PoolKey";
        readonly components: readonly [{
            readonly name: "currency0";
            readonly type: "address";
            readonly internalType: "Currency";
        }, {
            readonly name: "currency1";
            readonly type: "address";
            readonly internalType: "Currency";
        }, {
            readonly name: "hooks";
            readonly type: "address";
            readonly internalType: "contract IHooks";
        }, {
            readonly name: "poolManager";
            readonly type: "address";
            readonly internalType: "contract IPoolManager";
        }, {
            readonly name: "fee";
            readonly type: "uint24";
            readonly internalType: "uint24";
        }, {
            readonly name: "parameters";
            readonly type: "bytes32";
            readonly internalType: "bytes32";
        }];
    }];
    readonly outputs: readonly [];
    readonly stateMutability: "nonpayable";
}, {
    readonly type: "function";
    readonly name: "vault";
    readonly inputs: readonly [];
    readonly outputs: readonly [{
        readonly name: "";
        readonly type: "address";
        readonly internalType: "contract IVault";
    }];
    readonly stateMutability: "view";
}, {
    readonly type: "event";
    readonly name: "Donate";
    readonly inputs: readonly [{
        readonly name: "id";
        readonly type: "bytes32";
        readonly indexed: true;
        readonly internalType: "PoolId";
    }, {
        readonly name: "sender";
        readonly type: "address";
        readonly indexed: true;
        readonly internalType: "address";
    }, {
        readonly name: "amount0";
        readonly type: "uint256";
        readonly indexed: false;
        readonly internalType: "uint256";
    }, {
        readonly name: "amount1";
        readonly type: "uint256";
        readonly indexed: false;
        readonly internalType: "uint256";
    }, {
        readonly name: "tick";
        readonly type: "int24";
        readonly indexed: false;
        readonly internalType: "int24";
    }];
    readonly anonymous: false;
}, {
    readonly type: "event";
    readonly name: "DynamicSwapFeeUpdated";
    readonly inputs: readonly [{
        readonly name: "id";
        readonly type: "bytes32";
        readonly indexed: true;
        readonly internalType: "PoolId";
    }, {
        readonly name: "dynamicSwapFee";
        readonly type: "uint24";
        readonly indexed: false;
        readonly internalType: "uint24";
    }];
    readonly anonymous: false;
}, {
    readonly type: "event";
    readonly name: "Initialize";
    readonly inputs: readonly [{
        readonly name: "id";
        readonly type: "bytes32";
        readonly indexed: true;
        readonly internalType: "PoolId";
    }, {
        readonly name: "currency0";
        readonly type: "address";
        readonly indexed: true;
        readonly internalType: "Currency";
    }, {
        readonly name: "currency1";
        readonly type: "address";
        readonly indexed: true;
        readonly internalType: "Currency";
    }, {
        readonly name: "fee";
        readonly type: "uint24";
        readonly indexed: false;
        readonly internalType: "uint24";
    }, {
        readonly name: "tickSpacing";
        readonly type: "int24";
        readonly indexed: false;
        readonly internalType: "int24";
    }, {
        readonly name: "hooks";
        readonly type: "address";
        readonly indexed: false;
        readonly internalType: "contract ICLHooks";
    }];
    readonly anonymous: false;
}, {
    readonly type: "event";
    readonly name: "ModifyLiquidity";
    readonly inputs: readonly [{
        readonly name: "id";
        readonly type: "bytes32";
        readonly indexed: true;
        readonly internalType: "PoolId";
    }, {
        readonly name: "sender";
        readonly type: "address";
        readonly indexed: true;
        readonly internalType: "address";
    }, {
        readonly name: "tickLower";
        readonly type: "int24";
        readonly indexed: false;
        readonly internalType: "int24";
    }, {
        readonly name: "tickUpper";
        readonly type: "int24";
        readonly indexed: false;
        readonly internalType: "int24";
    }, {
        readonly name: "liquidityDelta";
        readonly type: "int256";
        readonly indexed: false;
        readonly internalType: "int256";
    }];
    readonly anonymous: false;
}, {
    readonly type: "event";
    readonly name: "OwnershipTransferred";
    readonly inputs: readonly [{
        readonly name: "previousOwner";
        readonly type: "address";
        readonly indexed: true;
        readonly internalType: "address";
    }, {
        readonly name: "newOwner";
        readonly type: "address";
        readonly indexed: true;
        readonly internalType: "address";
    }];
    readonly anonymous: false;
}, {
    readonly type: "event";
    readonly name: "ProtocolFeeControllerUpdated";
    readonly inputs: readonly [{
        readonly name: "protocolFeeController";
        readonly type: "address";
        readonly indexed: false;
        readonly internalType: "address";
    }];
    readonly anonymous: false;
}, {
    readonly type: "event";
    readonly name: "ProtocolFeeUpdated";
    readonly inputs: readonly [{
        readonly name: "id";
        readonly type: "bytes32";
        readonly indexed: true;
        readonly internalType: "PoolId";
    }, {
        readonly name: "protocolFee";
        readonly type: "uint16";
        readonly indexed: false;
        readonly internalType: "uint16";
    }];
    readonly anonymous: false;
}, {
    readonly type: "event";
    readonly name: "SetLmPool";
    readonly inputs: readonly [{
        readonly name: "id";
        readonly type: "bytes32";
        readonly indexed: true;
        readonly internalType: "PoolId";
    }, {
        readonly name: "lmPool";
        readonly type: "address";
        readonly indexed: false;
        readonly internalType: "address";
    }];
    readonly anonymous: false;
}, {
    readonly type: "event";
    readonly name: "SetMasterChef";
    readonly inputs: readonly [{
        readonly name: "masterChef";
        readonly type: "address";
        readonly indexed: false;
        readonly internalType: "address";
    }];
    readonly anonymous: false;
}, {
    readonly type: "event";
    readonly name: "Swap";
    readonly inputs: readonly [{
        readonly name: "id";
        readonly type: "bytes32";
        readonly indexed: true;
        readonly internalType: "PoolId";
    }, {
        readonly name: "sender";
        readonly type: "address";
        readonly indexed: true;
        readonly internalType: "address";
    }, {
        readonly name: "amount0";
        readonly type: "int128";
        readonly indexed: false;
        readonly internalType: "int128";
    }, {
        readonly name: "amount1";
        readonly type: "int128";
        readonly indexed: false;
        readonly internalType: "int128";
    }, {
        readonly name: "sqrtPriceX96";
        readonly type: "uint160";
        readonly indexed: false;
        readonly internalType: "uint160";
    }, {
        readonly name: "liquidity";
        readonly type: "uint128";
        readonly indexed: false;
        readonly internalType: "uint128";
    }, {
        readonly name: "tick";
        readonly type: "int24";
        readonly indexed: false;
        readonly internalType: "int24";
    }, {
        readonly name: "fee";
        readonly type: "uint24";
        readonly indexed: false;
        readonly internalType: "uint24";
    }, {
        readonly name: "protocolFee";
        readonly type: "uint256";
        readonly indexed: false;
        readonly internalType: "uint256";
    }];
    readonly anonymous: false;
}, {
    readonly type: "error";
    readonly name: "CannotUpdateEmptyPosition";
    readonly inputs: readonly [];
}, {
    readonly type: "error";
    readonly name: "CurrenciesInitializedOutOfOrder";
    readonly inputs: readonly [];
}, {
    readonly type: "error";
    readonly name: "FeeNotDynamic";
    readonly inputs: readonly [];
}, {
    readonly type: "error";
    readonly name: "FeeTooLarge";
    readonly inputs: readonly [];
}, {
    readonly type: "error";
    readonly name: "HookConfigValidationError";
    readonly inputs: readonly [];
}, {
    readonly type: "error";
    readonly name: "InvalidHookResponse";
    readonly inputs: readonly [];
}, {
    readonly type: "error";
    readonly name: "InvalidPrice";
    readonly inputs: readonly [];
}, {
    readonly type: "error";
    readonly name: "InvalidPriceOrLiquidity";
    readonly inputs: readonly [];
}, {
    readonly type: "error";
    readonly name: "InvalidProtocolFeeCollector";
    readonly inputs: readonly [];
}, {
    readonly type: "error";
    readonly name: "InvalidSqrtPriceLimit";
    readonly inputs: readonly [{
        readonly name: "sqrtPriceCurrentX96";
        readonly type: "uint160";
        readonly internalType: "uint160";
    }, {
        readonly name: "sqrtPriceLimitX96";
        readonly type: "uint160";
        readonly internalType: "uint160";
    }];
}, {
    readonly type: "error";
    readonly name: "InvalidSqrtRatio";
    readonly inputs: readonly [];
}, {
    readonly type: "error";
    readonly name: "InvalidTick";
    readonly inputs: readonly [];
}, {
    readonly type: "error";
    readonly name: "NoLiquidityToReceiveFees";
    readonly inputs: readonly [];
}, {
    readonly type: "error";
    readonly name: "NoOpHookMissingBeforeCall";
    readonly inputs: readonly [];
}, {
    readonly type: "error";
    readonly name: "NotEnoughLiquidity";
    readonly inputs: readonly [];
}, {
    readonly type: "error";
    readonly name: "PoolAlreadyInitialized";
    readonly inputs: readonly [];
}, {
    readonly type: "error";
    readonly name: "PoolManagerMismatch";
    readonly inputs: readonly [];
}, {
    readonly type: "error";
    readonly name: "PoolNotInitialized";
    readonly inputs: readonly [];
}, {
    readonly type: "error";
    readonly name: "PoolNotInitialized";
    readonly inputs: readonly [];
}, {
    readonly type: "error";
    readonly name: "PriceOverflow";
    readonly inputs: readonly [];
}, {
    readonly type: "error";
    readonly name: "ProtocolFeeCannotBeFetched";
    readonly inputs: readonly [];
}, {
    readonly type: "error";
    readonly name: "ProtocolFeeControllerCallFailedOrInvalidResult";
    readonly inputs: readonly [];
}, {
    readonly type: "error";
    readonly name: "SafeCastOverflow";
    readonly inputs: readonly [];
}, {
    readonly type: "error";
    readonly name: "SwapAmountCannotBeZero";
    readonly inputs: readonly [];
}, {
    readonly type: "error";
    readonly name: "TickLiquidityOverflow";
    readonly inputs: readonly [{
        readonly name: "tick";
        readonly type: "int24";
        readonly internalType: "int24";
    }];
}, {
    readonly type: "error";
    readonly name: "TickLowerOutOfBounds";
    readonly inputs: readonly [{
        readonly name: "tickLower";
        readonly type: "int24";
        readonly internalType: "int24";
    }];
}, {
    readonly type: "error";
    readonly name: "TickMisaligned";
    readonly inputs: readonly [{
        readonly name: "tick";
        readonly type: "int24";
        readonly internalType: "int24";
    }, {
        readonly name: "tickSpacing";
        readonly type: "int24";
        readonly internalType: "int24";
    }];
}, {
    readonly type: "error";
    readonly name: "TickSpacingTooLarge";
    readonly inputs: readonly [];
}, {
    readonly type: "error";
    readonly name: "TickSpacingTooSmall";
    readonly inputs: readonly [];
}, {
    readonly type: "error";
    readonly name: "TickUpperOutOfBounds";
    readonly inputs: readonly [{
        readonly name: "tickUpper";
        readonly type: "int24";
        readonly internalType: "int24";
    }];
}, {
    readonly type: "error";
    readonly name: "TicksMisordered";
    readonly inputs: readonly [{
        readonly name: "tickLower";
        readonly type: "int24";
        readonly internalType: "int24";
    }, {
        readonly name: "tickUpper";
        readonly type: "int24";
        readonly internalType: "int24";
    }];
}, {
    readonly type: "error";
    readonly name: "UnauthorizedCaller";
    readonly inputs: readonly [];
}];
//# sourceMappingURL=CLPoolManager.d.ts.map