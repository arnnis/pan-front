export declare const BinPoolManager: readonly [{
    readonly type: "constructor";
    readonly inputs: readonly [{
        readonly name: "vault";
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
    readonly name: "MAX_BIN_STEP";
    readonly inputs: readonly [];
    readonly outputs: readonly [{
        readonly name: "";
        readonly type: "uint16";
        readonly internalType: "uint16";
    }];
    readonly stateMutability: "view";
}, {
    readonly type: "function";
    readonly name: "MIN_BIN_STEP";
    readonly inputs: readonly [];
    readonly outputs: readonly [{
        readonly name: "";
        readonly type: "uint16";
        readonly internalType: "uint16";
    }];
    readonly stateMutability: "view";
}, {
    readonly type: "function";
    readonly name: "burn";
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
        readonly internalType: "struct IBinPoolManager.BurnParams";
        readonly components: readonly [{
            readonly name: "ids";
            readonly type: "uint256[]";
            readonly internalType: "uint256[]";
        }, {
            readonly name: "amountsToBurn";
            readonly type: "uint256[]";
            readonly internalType: "uint256[]";
        }, {
            readonly name: "salt";
            readonly type: "bytes32";
            readonly internalType: "bytes32";
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
        readonly type: "uint128";
        readonly internalType: "uint128";
    }, {
        readonly name: "amount1";
        readonly type: "uint128";
        readonly internalType: "uint128";
    }, {
        readonly name: "hookData";
        readonly type: "bytes";
        readonly internalType: "bytes";
    }];
    readonly outputs: readonly [{
        readonly name: "delta";
        readonly type: "int256";
        readonly internalType: "BalanceDelta";
    }, {
        readonly name: "binId";
        readonly type: "uint24";
        readonly internalType: "uint24";
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
        readonly name: "";
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
    readonly name: "getBin";
    readonly inputs: readonly [{
        readonly name: "id";
        readonly type: "bytes32";
        readonly internalType: "PoolId";
    }, {
        readonly name: "binId";
        readonly type: "uint24";
        readonly internalType: "uint24";
    }];
    readonly outputs: readonly [{
        readonly name: "binReserveX";
        readonly type: "uint128";
        readonly internalType: "uint128";
    }, {
        readonly name: "binReserveY";
        readonly type: "uint128";
        readonly internalType: "uint128";
    }];
    readonly stateMutability: "view";
}, {
    readonly type: "function";
    readonly name: "getNextNonEmptyBin";
    readonly inputs: readonly [{
        readonly name: "id";
        readonly type: "bytes32";
        readonly internalType: "PoolId";
    }, {
        readonly name: "swapForY";
        readonly type: "bool";
        readonly internalType: "bool";
    }, {
        readonly name: "binId";
        readonly type: "uint24";
        readonly internalType: "uint24";
    }];
    readonly outputs: readonly [{
        readonly name: "nextId";
        readonly type: "uint24";
        readonly internalType: "uint24";
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
        readonly name: "binId";
        readonly type: "uint24";
        readonly internalType: "uint24";
    }, {
        readonly name: "salt";
        readonly type: "bytes32";
        readonly internalType: "bytes32";
    }];
    readonly outputs: readonly [{
        readonly name: "position";
        readonly type: "tuple";
        readonly internalType: "struct BinPosition.Info";
        readonly components: readonly [{
            readonly name: "share";
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
        readonly name: "activeId";
        readonly type: "uint24";
        readonly internalType: "uint24";
    }, {
        readonly name: "protocolFee";
        readonly type: "uint24";
        readonly internalType: "uint24";
    }, {
        readonly name: "lpFee";
        readonly type: "uint24";
        readonly internalType: "uint24";
    }];
    readonly stateMutability: "view";
}, {
    readonly type: "function";
    readonly name: "getSwapIn";
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
        readonly name: "swapForY";
        readonly type: "bool";
        readonly internalType: "bool";
    }, {
        readonly name: "amountOut";
        readonly type: "uint128";
        readonly internalType: "uint128";
    }];
    readonly outputs: readonly [{
        readonly name: "amountIn";
        readonly type: "uint128";
        readonly internalType: "uint128";
    }, {
        readonly name: "amountOutLeft";
        readonly type: "uint128";
        readonly internalType: "uint128";
    }, {
        readonly name: "fee";
        readonly type: "uint128";
        readonly internalType: "uint128";
    }];
    readonly stateMutability: "view";
}, {
    readonly type: "function";
    readonly name: "getSwapOut";
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
        readonly name: "swapForY";
        readonly type: "bool";
        readonly internalType: "bool";
    }, {
        readonly name: "amountIn";
        readonly type: "uint128";
        readonly internalType: "uint128";
    }];
    readonly outputs: readonly [{
        readonly name: "amountInLeft";
        readonly type: "uint128";
        readonly internalType: "uint128";
    }, {
        readonly name: "amountOut";
        readonly type: "uint128";
        readonly internalType: "uint128";
    }, {
        readonly name: "fee";
        readonly type: "uint128";
        readonly internalType: "uint128";
    }];
    readonly stateMutability: "view";
}, {
    readonly type: "function";
    readonly name: "grantPausableRole";
    readonly inputs: readonly [{
        readonly name: "account";
        readonly type: "address";
        readonly internalType: "address";
    }];
    readonly outputs: readonly [];
    readonly stateMutability: "nonpayable";
}, {
    readonly type: "function";
    readonly name: "hasPausableRole";
    readonly inputs: readonly [{
        readonly name: "";
        readonly type: "address";
        readonly internalType: "address";
    }];
    readonly outputs: readonly [{
        readonly name: "";
        readonly type: "bool";
        readonly internalType: "bool";
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
        readonly name: "activeId";
        readonly type: "uint24";
        readonly internalType: "uint24";
    }, {
        readonly name: "hookData";
        readonly type: "bytes";
        readonly internalType: "bytes";
    }];
    readonly outputs: readonly [];
    readonly stateMutability: "nonpayable";
}, {
    readonly type: "function";
    readonly name: "mint";
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
        readonly internalType: "struct IBinPoolManager.MintParams";
        readonly components: readonly [{
            readonly name: "liquidityConfigs";
            readonly type: "bytes32[]";
            readonly internalType: "bytes32[]";
        }, {
            readonly name: "amountIn";
            readonly type: "bytes32";
            readonly internalType: "bytes32";
        }, {
            readonly name: "salt";
            readonly type: "bytes32";
            readonly internalType: "bytes32";
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
    }, {
        readonly name: "mintArray";
        readonly type: "tuple";
        readonly internalType: "struct BinPool.MintArrays";
        readonly components: readonly [{
            readonly name: "ids";
            readonly type: "uint256[]";
            readonly internalType: "uint256[]";
        }, {
            readonly name: "amounts";
            readonly type: "bytes32[]";
            readonly internalType: "bytes32[]";
        }, {
            readonly name: "liquidityMinted";
            readonly type: "uint256[]";
            readonly internalType: "uint256[]";
        }];
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
    readonly name: "pause";
    readonly inputs: readonly [];
    readonly outputs: readonly [];
    readonly stateMutability: "nonpayable";
}, {
    readonly type: "function";
    readonly name: "paused";
    readonly inputs: readonly [];
    readonly outputs: readonly [{
        readonly name: "";
        readonly type: "bool";
        readonly internalType: "bool";
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
        readonly internalType: "struct BinPool.Slot0";
        readonly components: readonly [{
            readonly name: "activeId";
            readonly type: "uint24";
            readonly internalType: "uint24";
        }, {
            readonly name: "protocolFee";
            readonly type: "uint24";
            readonly internalType: "uint24";
        }, {
            readonly name: "lpFee";
            readonly type: "uint24";
            readonly internalType: "uint24";
        }];
    }, {
        readonly name: "level0";
        readonly type: "bytes32";
        readonly internalType: "bytes32";
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
    readonly name: "revokePausableRole";
    readonly inputs: readonly [{
        readonly name: "account";
        readonly type: "address";
        readonly internalType: "address";
    }];
    readonly outputs: readonly [];
    readonly stateMutability: "nonpayable";
}, {
    readonly type: "function";
    readonly name: "setMaxBinStep";
    readonly inputs: readonly [{
        readonly name: "maxBinStep";
        readonly type: "uint16";
        readonly internalType: "uint16";
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
    }, {
        readonly name: "newProtocolFee";
        readonly type: "uint24";
        readonly internalType: "uint24";
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
        readonly name: "swapForY";
        readonly type: "bool";
        readonly internalType: "bool";
    }, {
        readonly name: "amountIn";
        readonly type: "uint128";
        readonly internalType: "uint128";
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
    readonly name: "unpause";
    readonly inputs: readonly [];
    readonly outputs: readonly [];
    readonly stateMutability: "nonpayable";
}, {
    readonly type: "function";
    readonly name: "updateDynamicLPFee";
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
        readonly name: "newDynamicLPFee";
        readonly type: "uint24";
        readonly internalType: "uint24";
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
    readonly name: "Burn";
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
        readonly name: "ids";
        readonly type: "uint256[]";
        readonly indexed: false;
        readonly internalType: "uint256[]";
    }, {
        readonly name: "salt";
        readonly type: "bytes32";
        readonly indexed: false;
        readonly internalType: "bytes32";
    }, {
        readonly name: "amounts";
        readonly type: "bytes32[]";
        readonly indexed: false;
        readonly internalType: "bytes32[]";
    }];
    readonly anonymous: false;
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
        readonly type: "int128";
        readonly indexed: false;
        readonly internalType: "int128";
    }, {
        readonly name: "amount1";
        readonly type: "int128";
        readonly indexed: false;
        readonly internalType: "int128";
    }, {
        readonly name: "binId";
        readonly type: "uint24";
        readonly indexed: false;
        readonly internalType: "uint24";
    }];
    readonly anonymous: false;
}, {
    readonly type: "event";
    readonly name: "DynamicLPFeeUpdated";
    readonly inputs: readonly [{
        readonly name: "id";
        readonly type: "bytes32";
        readonly indexed: true;
        readonly internalType: "PoolId";
    }, {
        readonly name: "dynamicLPFee";
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
        readonly name: "binStep";
        readonly type: "uint16";
        readonly indexed: false;
        readonly internalType: "uint16";
    }, {
        readonly name: "hooks";
        readonly type: "address";
        readonly indexed: false;
        readonly internalType: "contract IHooks";
    }];
    readonly anonymous: false;
}, {
    readonly type: "event";
    readonly name: "Mint";
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
        readonly name: "ids";
        readonly type: "uint256[]";
        readonly indexed: false;
        readonly internalType: "uint256[]";
    }, {
        readonly name: "salt";
        readonly type: "bytes32";
        readonly indexed: false;
        readonly internalType: "bytes32";
    }, {
        readonly name: "amounts";
        readonly type: "bytes32[]";
        readonly indexed: false;
        readonly internalType: "bytes32[]";
    }, {
        readonly name: "compositionFee";
        readonly type: "bytes32";
        readonly indexed: false;
        readonly internalType: "bytes32";
    }, {
        readonly name: "pFee";
        readonly type: "bytes32";
        readonly indexed: false;
        readonly internalType: "bytes32";
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
    readonly name: "PausableRoleGranted";
    readonly inputs: readonly [{
        readonly name: "account";
        readonly type: "address";
        readonly indexed: true;
        readonly internalType: "address";
    }];
    readonly anonymous: false;
}, {
    readonly type: "event";
    readonly name: "PausableRoleRevoked";
    readonly inputs: readonly [{
        readonly name: "account";
        readonly type: "address";
        readonly indexed: true;
        readonly internalType: "address";
    }];
    readonly anonymous: false;
}, {
    readonly type: "event";
    readonly name: "Paused";
    readonly inputs: readonly [{
        readonly name: "account";
        readonly type: "address";
        readonly indexed: false;
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
        readonly type: "uint24";
        readonly indexed: false;
        readonly internalType: "uint24";
    }];
    readonly anonymous: false;
}, {
    readonly type: "event";
    readonly name: "SetMaxBinStep";
    readonly inputs: readonly [{
        readonly name: "maxBinStep";
        readonly type: "uint16";
        readonly indexed: false;
        readonly internalType: "uint16";
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
        readonly name: "activeId";
        readonly type: "uint24";
        readonly indexed: false;
        readonly internalType: "uint24";
    }, {
        readonly name: "fee";
        readonly type: "uint24";
        readonly indexed: false;
        readonly internalType: "uint24";
    }, {
        readonly name: "protocolFee";
        readonly type: "uint24";
        readonly indexed: false;
        readonly internalType: "uint24";
    }];
    readonly anonymous: false;
}, {
    readonly type: "event";
    readonly name: "Unpaused";
    readonly inputs: readonly [{
        readonly name: "account";
        readonly type: "address";
        readonly indexed: false;
        readonly internalType: "address";
    }];
    readonly anonymous: false;
}, {
    readonly type: "error";
    readonly name: "BinHelper__CompositionFactorFlawed";
    readonly inputs: readonly [{
        readonly name: "id";
        readonly type: "uint24";
        readonly internalType: "uint24";
    }];
}, {
    readonly type: "error";
    readonly name: "BinPool__BurnZeroAmount";
    readonly inputs: readonly [{
        readonly name: "id";
        readonly type: "uint24";
        readonly internalType: "uint24";
    }];
}, {
    readonly type: "error";
    readonly name: "BinPool__EmptyLiquidityConfigs";
    readonly inputs: readonly [];
}, {
    readonly type: "error";
    readonly name: "BinPool__InsufficientAmountOut";
    readonly inputs: readonly [];
}, {
    readonly type: "error";
    readonly name: "BinPool__InvalidBurnInput";
    readonly inputs: readonly [];
}, {
    readonly type: "error";
    readonly name: "BinPool__NoLiquidityToReceiveFees";
    readonly inputs: readonly [];
}, {
    readonly type: "error";
    readonly name: "BinPool__ZeroAmountsOut";
    readonly inputs: readonly [{
        readonly name: "id";
        readonly type: "uint24";
        readonly internalType: "uint24";
    }];
}, {
    readonly type: "error";
    readonly name: "BinPool__ZeroShares";
    readonly inputs: readonly [{
        readonly name: "id";
        readonly type: "uint24";
        readonly internalType: "uint24";
    }];
}, {
    readonly type: "error";
    readonly name: "BinStepTooLarge";
    readonly inputs: readonly [];
}, {
    readonly type: "error";
    readonly name: "BinStepTooSmall";
    readonly inputs: readonly [];
}, {
    readonly type: "error";
    readonly name: "CurrenciesInitializedOutOfOrder";
    readonly inputs: readonly [];
}, {
    readonly type: "error";
    readonly name: "FeeTooLarge";
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
    readonly name: "HookPermissionsValidationError";
    readonly inputs: readonly [];
}, {
    readonly type: "error";
    readonly name: "InsufficientAmountIn";
    readonly inputs: readonly [];
}, {
    readonly type: "error";
    readonly name: "InvalidCaller";
    readonly inputs: readonly [];
}, {
    readonly type: "error";
    readonly name: "InvalidHookResponse";
    readonly inputs: readonly [];
}, {
    readonly type: "error";
    readonly name: "LiquidityConfigurations__InvalidConfig";
    readonly inputs: readonly [];
}, {
    readonly type: "error";
    readonly name: "MaxBinStepTooSmall";
    readonly inputs: readonly [{
        readonly name: "maxBinStep";
        readonly type: "uint16";
        readonly internalType: "uint16";
    }];
}, {
    readonly type: "error";
    readonly name: "NoPausableRole";
    readonly inputs: readonly [];
}, {
    readonly type: "error";
    readonly name: "PackedUint128Math__AddOverflow";
    readonly inputs: readonly [];
}, {
    readonly type: "error";
    readonly name: "PackedUint128Math__SubUnderflow";
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
    readonly name: "ProtocolFeeCannotBeFetched";
    readonly inputs: readonly [];
}, {
    readonly type: "error";
    readonly name: "Uint128x128Math__PowUnderflow";
    readonly inputs: readonly [{
        readonly name: "x";
        readonly type: "uint256";
        readonly internalType: "uint256";
    }, {
        readonly name: "y";
        readonly type: "int256";
        readonly internalType: "int256";
    }];
}, {
    readonly type: "error";
    readonly name: "Uint256x256Math__MulDivOverflow";
    readonly inputs: readonly [];
}, {
    readonly type: "error";
    readonly name: "Uint256x256Math__MulShiftOverflow";
    readonly inputs: readonly [];
}, {
    readonly type: "error";
    readonly name: "UnauthorizedDynamicLPFeeUpdate";
    readonly inputs: readonly [];
}, {
    readonly type: "error";
    readonly name: "UnusedBitsNonZero";
    readonly inputs: readonly [];
}];
//# sourceMappingURL=BinPoolManager.d.ts.map