export declare const BinFungiblePositionManagerAbi: readonly [{
    readonly type: "constructor";
    readonly inputs: readonly [{
        readonly name: "_vault";
        readonly type: "address";
        readonly internalType: "contract IVault";
    }, {
        readonly name: "_poolManager";
        readonly type: "address";
        readonly internalType: "contract IBinPoolManager";
    }, {
        readonly name: "_WETH9";
        readonly type: "address";
        readonly internalType: "address";
    }];
    readonly stateMutability: "nonpayable";
}, {
    readonly type: "receive";
    readonly stateMutability: "payable";
}, {
    readonly type: "function";
    readonly name: "WETH9";
    readonly inputs: readonly [];
    readonly outputs: readonly [{
        readonly name: "";
        readonly type: "address";
        readonly internalType: "address";
    }];
    readonly stateMutability: "view";
}, {
    readonly type: "function";
    readonly name: "addLiquidity";
    readonly inputs: readonly [{
        readonly name: "params";
        readonly type: "tuple";
        readonly internalType: "struct IBinFungiblePositionManager.AddLiquidityParams";
        readonly components: readonly [{
            readonly name: "poolKey";
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
            readonly name: "amount0Min";
            readonly type: "uint128";
            readonly internalType: "uint128";
        }, {
            readonly name: "amount1Min";
            readonly type: "uint128";
            readonly internalType: "uint128";
        }, {
            readonly name: "activeIdDesired";
            readonly type: "uint256";
            readonly internalType: "uint256";
        }, {
            readonly name: "idSlippage";
            readonly type: "uint256";
            readonly internalType: "uint256";
        }, {
            readonly name: "deltaIds";
            readonly type: "int256[]";
            readonly internalType: "int256[]";
        }, {
            readonly name: "distributionX";
            readonly type: "uint256[]";
            readonly internalType: "uint256[]";
        }, {
            readonly name: "distributionY";
            readonly type: "uint256[]";
            readonly internalType: "uint256[]";
        }, {
            readonly name: "to";
            readonly type: "address";
            readonly internalType: "address";
        }, {
            readonly name: "deadline";
            readonly type: "uint256";
            readonly internalType: "uint256";
        }];
    }];
    readonly outputs: readonly [{
        readonly name: "amount0";
        readonly type: "uint128";
        readonly internalType: "uint128";
    }, {
        readonly name: "amount1";
        readonly type: "uint128";
        readonly internalType: "uint128";
    }, {
        readonly name: "tokenIds";
        readonly type: "uint256[]";
        readonly internalType: "uint256[]";
    }, {
        readonly name: "liquidityMinted";
        readonly type: "uint256[]";
        readonly internalType: "uint256[]";
    }];
    readonly stateMutability: "payable";
}, {
    readonly type: "function";
    readonly name: "approveForAll";
    readonly inputs: readonly [{
        readonly name: "operator";
        readonly type: "address";
        readonly internalType: "address";
    }, {
        readonly name: "approved";
        readonly type: "bool";
        readonly internalType: "bool";
    }];
    readonly outputs: readonly [];
    readonly stateMutability: "nonpayable";
}, {
    readonly type: "function";
    readonly name: "balanceOf";
    readonly inputs: readonly [{
        readonly name: "";
        readonly type: "address";
        readonly internalType: "address";
    }, {
        readonly name: "";
        readonly type: "uint256";
        readonly internalType: "uint256";
    }];
    readonly outputs: readonly [{
        readonly name: "";
        readonly type: "uint256";
        readonly internalType: "uint256";
    }];
    readonly stateMutability: "view";
}, {
    readonly type: "function";
    readonly name: "balanceOfBatch";
    readonly inputs: readonly [{
        readonly name: "owners";
        readonly type: "address[]";
        readonly internalType: "address[]";
    }, {
        readonly name: "ids";
        readonly type: "uint256[]";
        readonly internalType: "uint256[]";
    }];
    readonly outputs: readonly [{
        readonly name: "balances";
        readonly type: "uint256[]";
        readonly internalType: "uint256[]";
    }];
    readonly stateMutability: "view";
}, {
    readonly type: "function";
    readonly name: "batchTransferFrom";
    readonly inputs: readonly [{
        readonly name: "from";
        readonly type: "address";
        readonly internalType: "address";
    }, {
        readonly name: "to";
        readonly type: "address";
        readonly internalType: "address";
    }, {
        readonly name: "ids";
        readonly type: "uint256[]";
        readonly internalType: "uint256[]";
    }, {
        readonly name: "amounts";
        readonly type: "uint256[]";
        readonly internalType: "uint256[]";
    }];
    readonly outputs: readonly [];
    readonly stateMutability: "nonpayable";
}, {
    readonly type: "function";
    readonly name: "initialize";
    readonly inputs: readonly [{
        readonly name: "poolKey";
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
    readonly name: "isApprovedForAll";
    readonly inputs: readonly [{
        readonly name: "";
        readonly type: "address";
        readonly internalType: "address";
    }, {
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
    readonly name: "lockAcquired";
    readonly inputs: readonly [{
        readonly name: "rawData";
        readonly type: "bytes";
        readonly internalType: "bytes";
    }];
    readonly outputs: readonly [{
        readonly name: "returnData";
        readonly type: "bytes";
        readonly internalType: "bytes";
    }];
    readonly stateMutability: "nonpayable";
}, {
    readonly type: "function";
    readonly name: "name";
    readonly inputs: readonly [];
    readonly outputs: readonly [{
        readonly name: "";
        readonly type: "string";
        readonly internalType: "string";
    }];
    readonly stateMutability: "view";
}, {
    readonly type: "function";
    readonly name: "poolManager";
    readonly inputs: readonly [];
    readonly outputs: readonly [{
        readonly name: "";
        readonly type: "address";
        readonly internalType: "contract IBinPoolManager";
    }];
    readonly stateMutability: "view";
}, {
    readonly type: "function";
    readonly name: "positions";
    readonly inputs: readonly [{
        readonly name: "tokenId";
        readonly type: "uint256";
        readonly internalType: "uint256";
    }];
    readonly outputs: readonly [{
        readonly name: "currency0";
        readonly type: "address";
        readonly internalType: "Currency";
    }, {
        readonly name: "currency1";
        readonly type: "address";
        readonly internalType: "Currency";
    }, {
        readonly name: "fee";
        readonly type: "uint24";
        readonly internalType: "uint24";
    }, {
        readonly name: "binId";
        readonly type: "uint24";
        readonly internalType: "uint24";
    }];
    readonly stateMutability: "view";
}, {
    readonly type: "function";
    readonly name: "refundETH";
    readonly inputs: readonly [];
    readonly outputs: readonly [];
    readonly stateMutability: "payable";
}, {
    readonly type: "function";
    readonly name: "removeLiquidity";
    readonly inputs: readonly [{
        readonly name: "params";
        readonly type: "tuple";
        readonly internalType: "struct IBinFungiblePositionManager.RemoveLiquidityParams";
        readonly components: readonly [{
            readonly name: "poolKey";
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
            readonly name: "amount0Min";
            readonly type: "uint128";
            readonly internalType: "uint128";
        }, {
            readonly name: "amount1Min";
            readonly type: "uint128";
            readonly internalType: "uint128";
        }, {
            readonly name: "ids";
            readonly type: "uint256[]";
            readonly internalType: "uint256[]";
        }, {
            readonly name: "amounts";
            readonly type: "uint256[]";
            readonly internalType: "uint256[]";
        }, {
            readonly name: "from";
            readonly type: "address";
            readonly internalType: "address";
        }, {
            readonly name: "to";
            readonly type: "address";
            readonly internalType: "address";
        }, {
            readonly name: "deadline";
            readonly type: "uint256";
            readonly internalType: "uint256";
        }];
    }];
    readonly outputs: readonly [{
        readonly name: "amount0";
        readonly type: "uint128";
        readonly internalType: "uint128";
    }, {
        readonly name: "amount1";
        readonly type: "uint128";
        readonly internalType: "uint128";
    }, {
        readonly name: "tokenIds";
        readonly type: "uint256[]";
        readonly internalType: "uint256[]";
    }];
    readonly stateMutability: "payable";
}, {
    readonly type: "function";
    readonly name: "sweepToken";
    readonly inputs: readonly [{
        readonly name: "currency";
        readonly type: "address";
        readonly internalType: "Currency";
    }, {
        readonly name: "amountMinimum";
        readonly type: "uint256";
        readonly internalType: "uint256";
    }, {
        readonly name: "recipient";
        readonly type: "address";
        readonly internalType: "address";
    }];
    readonly outputs: readonly [];
    readonly stateMutability: "payable";
}, {
    readonly type: "function";
    readonly name: "symbol";
    readonly inputs: readonly [];
    readonly outputs: readonly [{
        readonly name: "";
        readonly type: "string";
        readonly internalType: "string";
    }];
    readonly stateMutability: "view";
}, {
    readonly type: "function";
    readonly name: "totalSupply";
    readonly inputs: readonly [{
        readonly name: "";
        readonly type: "uint256";
        readonly internalType: "uint256";
    }];
    readonly outputs: readonly [{
        readonly name: "";
        readonly type: "uint256";
        readonly internalType: "uint256";
    }];
    readonly stateMutability: "view";
}, {
    readonly type: "function";
    readonly name: "unwrapWETH9";
    readonly inputs: readonly [{
        readonly name: "amountMinimum";
        readonly type: "uint256";
        readonly internalType: "uint256";
    }, {
        readonly name: "recipient";
        readonly type: "address";
        readonly internalType: "address";
    }];
    readonly outputs: readonly [];
    readonly stateMutability: "payable";
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
    readonly name: "ApprovalForAll";
    readonly inputs: readonly [{
        readonly name: "account";
        readonly type: "address";
        readonly indexed: true;
        readonly internalType: "address";
    }, {
        readonly name: "sender";
        readonly type: "address";
        readonly indexed: true;
        readonly internalType: "address";
    }, {
        readonly name: "approved";
        readonly type: "bool";
        readonly indexed: false;
        readonly internalType: "bool";
    }];
    readonly anonymous: false;
}, {
    readonly type: "event";
    readonly name: "TransferBatch";
    readonly inputs: readonly [{
        readonly name: "sender";
        readonly type: "address";
        readonly indexed: true;
        readonly internalType: "address";
    }, {
        readonly name: "from";
        readonly type: "address";
        readonly indexed: true;
        readonly internalType: "address";
    }, {
        readonly name: "to";
        readonly type: "address";
        readonly indexed: true;
        readonly internalType: "address";
    }, {
        readonly name: "ids";
        readonly type: "uint256[]";
        readonly indexed: false;
        readonly internalType: "uint256[]";
    }, {
        readonly name: "amounts";
        readonly type: "uint256[]";
        readonly indexed: false;
        readonly internalType: "uint256[]";
    }];
    readonly anonymous: false;
}, {
    readonly type: "error";
    readonly name: "AddLiquidityInputActiveIdMismath";
    readonly inputs: readonly [];
}, {
    readonly type: "error";
    readonly name: "BinFungibleToken_AddressThisOrZero";
    readonly inputs: readonly [];
}, {
    readonly type: "error";
    readonly name: "BinFungibleToken_BurnExceedsBalance";
    readonly inputs: readonly [{
        readonly name: "from";
        readonly type: "address";
        readonly internalType: "address";
    }, {
        readonly name: "id";
        readonly type: "uint256";
        readonly internalType: "uint256";
    }, {
        readonly name: "amount";
        readonly type: "uint256";
        readonly internalType: "uint256";
    }];
}, {
    readonly type: "error";
    readonly name: "BinFungibleToken_InvalidLength";
    readonly inputs: readonly [];
}, {
    readonly type: "error";
    readonly name: "BinFungibleToken_SelfApproval";
    readonly inputs: readonly [{
        readonly name: "owner";
        readonly type: "address";
        readonly internalType: "address";
    }];
}, {
    readonly type: "error";
    readonly name: "BinFungibleToken_SpenderNotApproved";
    readonly inputs: readonly [{
        readonly name: "from";
        readonly type: "address";
        readonly internalType: "address";
    }, {
        readonly name: "spender";
        readonly type: "address";
        readonly internalType: "address";
    }];
}, {
    readonly type: "error";
    readonly name: "BinFungibleToken_TransferExceedsBalance";
    readonly inputs: readonly [{
        readonly name: "from";
        readonly type: "address";
        readonly internalType: "address";
    }, {
        readonly name: "id";
        readonly type: "uint256";
        readonly internalType: "uint256";
    }, {
        readonly name: "amount";
        readonly type: "uint256";
        readonly internalType: "uint256";
    }];
}, {
    readonly type: "error";
    readonly name: "DeadlineExceeded";
    readonly inputs: readonly [{
        readonly name: "";
        readonly type: "uint256";
        readonly internalType: "uint256";
    }, {
        readonly name: "";
        readonly type: "uint256";
        readonly internalType: "uint256";
    }];
}, {
    readonly type: "error";
    readonly name: "ERC20TransferFailed";
    readonly inputs: readonly [];
}, {
    readonly type: "error";
    readonly name: "IdDesiredOverflows";
    readonly inputs: readonly [{
        readonly name: "";
        readonly type: "uint24";
        readonly internalType: "uint24";
    }];
}, {
    readonly type: "error";
    readonly name: "IdOverflows";
    readonly inputs: readonly [{
        readonly name: "";
        readonly type: "int256";
        readonly internalType: "int256";
    }];
}, {
    readonly type: "error";
    readonly name: "IncorrectOutputAmount";
    readonly inputs: readonly [];
}, {
    readonly type: "error";
    readonly name: "InputLengthMismatch";
    readonly inputs: readonly [];
}, {
    readonly type: "error";
    readonly name: "InsufficientToken";
    readonly inputs: readonly [];
}, {
    readonly type: "error";
    readonly name: "InvalidTokenID";
    readonly inputs: readonly [];
}, {
    readonly type: "error";
    readonly name: "NativeTransferFailed";
    readonly inputs: readonly [];
}, {
    readonly type: "error";
    readonly name: "OnlyVaultCaller";
    readonly inputs: readonly [];
}, {
    readonly type: "error";
    readonly name: "OutputAmountSlippage";
    readonly inputs: readonly [];
}, {
    readonly type: "error";
    readonly name: "TransactionTooOld";
    readonly inputs: readonly [];
}];
//# sourceMappingURL=BinFungiblePositionManager.d.ts.map