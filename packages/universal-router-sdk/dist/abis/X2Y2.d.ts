export declare const x2y2Abi: readonly [{
    readonly anonymous: false;
    readonly inputs: readonly [{
        readonly indexed: true;
        readonly internalType: "bytes32";
        readonly name: "itemHash";
        readonly type: "bytes32";
    }, {
        readonly indexed: false;
        readonly internalType: "address";
        readonly name: "currency";
        readonly type: "address";
    }, {
        readonly indexed: false;
        readonly internalType: "address";
        readonly name: "to";
        readonly type: "address";
    }, {
        readonly indexed: false;
        readonly internalType: "uint256";
        readonly name: "amount";
        readonly type: "uint256";
    }, {
        readonly indexed: false;
        readonly internalType: "uint256";
        readonly name: "incentive";
        readonly type: "uint256";
    }];
    readonly name: "EvAuctionRefund";
    readonly type: "event";
}, {
    readonly anonymous: false;
    readonly inputs: readonly [{
        readonly indexed: true;
        readonly internalType: "bytes32";
        readonly name: "itemHash";
        readonly type: "bytes32";
    }];
    readonly name: "EvCancel";
    readonly type: "event";
}, {
    readonly anonymous: false;
    readonly inputs: readonly [{
        readonly indexed: false;
        readonly internalType: "address";
        readonly name: "delegate";
        readonly type: "address";
    }, {
        readonly indexed: false;
        readonly internalType: "bool";
        readonly name: "isRemoval";
        readonly type: "bool";
    }];
    readonly name: "EvDelegate";
    readonly type: "event";
}, {
    readonly anonymous: false;
    readonly inputs: readonly [{
        readonly indexed: false;
        readonly internalType: "uint256";
        readonly name: "index";
        readonly type: "uint256";
    }, {
        readonly indexed: false;
        readonly internalType: "bytes";
        readonly name: "error";
        readonly type: "bytes";
    }];
    readonly name: "EvFailure";
    readonly type: "event";
}, {
    readonly anonymous: false;
    readonly inputs: readonly [{
        readonly indexed: false;
        readonly internalType: "uint256";
        readonly name: "newValue";
        readonly type: "uint256";
    }];
    readonly name: "EvFeeCapUpdate";
    readonly type: "event";
}, {
    readonly anonymous: false;
    readonly inputs: readonly [{
        readonly indexed: true;
        readonly internalType: "bytes32";
        readonly name: "itemHash";
        readonly type: "bytes32";
    }, {
        readonly indexed: false;
        readonly internalType: "address";
        readonly name: "maker";
        readonly type: "address";
    }, {
        readonly indexed: false;
        readonly internalType: "address";
        readonly name: "taker";
        readonly type: "address";
    }, {
        readonly indexed: false;
        readonly internalType: "uint256";
        readonly name: "orderSalt";
        readonly type: "uint256";
    }, {
        readonly indexed: false;
        readonly internalType: "uint256";
        readonly name: "settleSalt";
        readonly type: "uint256";
    }, {
        readonly indexed: false;
        readonly internalType: "uint256";
        readonly name: "intent";
        readonly type: "uint256";
    }, {
        readonly indexed: false;
        readonly internalType: "uint256";
        readonly name: "delegateType";
        readonly type: "uint256";
    }, {
        readonly indexed: false;
        readonly internalType: "uint256";
        readonly name: "deadline";
        readonly type: "uint256";
    }, {
        readonly indexed: false;
        readonly internalType: "contract IERC20Upgradeable";
        readonly name: "currency";
        readonly type: "address";
    }, {
        readonly indexed: false;
        readonly internalType: "bytes";
        readonly name: "dataMask";
        readonly type: "bytes";
    }, {
        readonly components: readonly [{
            readonly internalType: "uint256";
            readonly name: "price";
            readonly type: "uint256";
        }, {
            readonly internalType: "bytes";
            readonly name: "data";
            readonly type: "bytes";
        }];
        readonly indexed: false;
        readonly internalType: "struct Market.OrderItem";
        readonly name: "item";
        readonly type: "tuple";
    }, {
        readonly components: readonly [{
            readonly internalType: "enum Market.Op";
            readonly name: "op";
            readonly type: "uint8";
        }, {
            readonly internalType: "uint256";
            readonly name: "orderIdx";
            readonly type: "uint256";
        }, {
            readonly internalType: "uint256";
            readonly name: "itemIdx";
            readonly type: "uint256";
        }, {
            readonly internalType: "uint256";
            readonly name: "price";
            readonly type: "uint256";
        }, {
            readonly internalType: "bytes32";
            readonly name: "itemHash";
            readonly type: "bytes32";
        }, {
            readonly internalType: "contract IDelegate";
            readonly name: "executionDelegate";
            readonly type: "address";
        }, {
            readonly internalType: "bytes";
            readonly name: "dataReplacement";
            readonly type: "bytes";
        }, {
            readonly internalType: "uint256";
            readonly name: "bidIncentivePct";
            readonly type: "uint256";
        }, {
            readonly internalType: "uint256";
            readonly name: "aucMinIncrementPct";
            readonly type: "uint256";
        }, {
            readonly internalType: "uint256";
            readonly name: "aucIncDurationSecs";
            readonly type: "uint256";
        }, {
            readonly components: readonly [{
                readonly internalType: "uint256";
                readonly name: "percentage";
                readonly type: "uint256";
            }, {
                readonly internalType: "address";
                readonly name: "to";
                readonly type: "address";
            }];
            readonly internalType: "struct Market.Fee[]";
            readonly name: "fees";
            readonly type: "tuple[]";
        }];
        readonly indexed: false;
        readonly internalType: "struct Market.SettleDetail";
        readonly name: "detail";
        readonly type: "tuple";
    }];
    readonly name: "EvInventory";
    readonly type: "event";
}, {
    readonly anonymous: false;
    readonly inputs: readonly [{
        readonly indexed: false;
        readonly internalType: "bytes32";
        readonly name: "itemHash";
        readonly type: "bytes32";
    }, {
        readonly indexed: false;
        readonly internalType: "address";
        readonly name: "currency";
        readonly type: "address";
    }, {
        readonly indexed: false;
        readonly internalType: "address";
        readonly name: "to";
        readonly type: "address";
    }, {
        readonly indexed: false;
        readonly internalType: "uint256";
        readonly name: "amount";
        readonly type: "uint256";
    }];
    readonly name: "EvProfit";
    readonly type: "event";
}, {
    readonly anonymous: false;
    readonly inputs: readonly [{
        readonly indexed: false;
        readonly internalType: "address";
        readonly name: "signer";
        readonly type: "address";
    }, {
        readonly indexed: false;
        readonly internalType: "bool";
        readonly name: "isRemoval";
        readonly type: "bool";
    }];
    readonly name: "EvSigner";
    readonly type: "event";
}, {
    readonly anonymous: false;
    readonly inputs: readonly [{
        readonly indexed: true;
        readonly internalType: "address";
        readonly name: "previousOwner";
        readonly type: "address";
    }, {
        readonly indexed: true;
        readonly internalType: "address";
        readonly name: "newOwner";
        readonly type: "address";
    }];
    readonly name: "OwnershipTransferred";
    readonly type: "event";
}, {
    readonly anonymous: false;
    readonly inputs: readonly [{
        readonly indexed: false;
        readonly internalType: "address";
        readonly name: "account";
        readonly type: "address";
    }];
    readonly name: "Paused";
    readonly type: "event";
}, {
    readonly anonymous: false;
    readonly inputs: readonly [{
        readonly indexed: false;
        readonly internalType: "address";
        readonly name: "account";
        readonly type: "address";
    }];
    readonly name: "Unpaused";
    readonly type: "event";
}, {
    readonly inputs: {};
    readonly name: "RATE_BASE";
    readonly outputs: readonly [{
        readonly internalType: "uint256";
        readonly name: "";
        readonly type: "uint256";
    }];
    readonly stateMutability: "view";
    readonly type: "function";
}, {
    readonly inputs: readonly [{
        readonly internalType: "bytes32[]";
        readonly name: "itemHashes";
        readonly type: "bytes32[]";
    }, {
        readonly internalType: "uint256";
        readonly name: "deadline";
        readonly type: "uint256";
    }, {
        readonly internalType: "uint8";
        readonly name: "v";
        readonly type: "uint8";
    }, {
        readonly internalType: "bytes32";
        readonly name: "r";
        readonly type: "bytes32";
    }, {
        readonly internalType: "bytes32";
        readonly name: "s";
        readonly type: "bytes32";
    }];
    readonly name: "cancel";
    readonly outputs: {};
    readonly stateMutability: "nonpayable";
    readonly type: "function";
}, {
    readonly inputs: readonly [{
        readonly internalType: "address";
        readonly name: "";
        readonly type: "address";
    }];
    readonly name: "delegates";
    readonly outputs: readonly [{
        readonly internalType: "bool";
        readonly name: "";
        readonly type: "bool";
    }];
    readonly stateMutability: "view";
    readonly type: "function";
}, {
    readonly inputs: {};
    readonly name: "feeCapPct";
    readonly outputs: readonly [{
        readonly internalType: "uint256";
        readonly name: "";
        readonly type: "uint256";
    }];
    readonly stateMutability: "view";
    readonly type: "function";
}, {
    readonly inputs: readonly [{
        readonly internalType: "uint256";
        readonly name: "feeCapPct_";
        readonly type: "uint256";
    }, {
        readonly internalType: "address";
        readonly name: "weth_";
        readonly type: "address";
    }];
    readonly name: "initialize";
    readonly outputs: {};
    readonly stateMutability: "nonpayable";
    readonly type: "function";
}, {
    readonly inputs: readonly [{
        readonly internalType: "bytes32";
        readonly name: "";
        readonly type: "bytes32";
    }];
    readonly name: "inventoryStatus";
    readonly outputs: readonly [{
        readonly internalType: "enum Market.InvStatus";
        readonly name: "";
        readonly type: "uint8";
    }];
    readonly stateMutability: "view";
    readonly type: "function";
}, {
    readonly inputs: readonly [{
        readonly internalType: "bytes32";
        readonly name: "";
        readonly type: "bytes32";
    }];
    readonly name: "ongoingAuctions";
    readonly outputs: readonly [{
        readonly internalType: "uint256";
        readonly name: "price";
        readonly type: "uint256";
    }, {
        readonly internalType: "uint256";
        readonly name: "netPrice";
        readonly type: "uint256";
    }, {
        readonly internalType: "uint256";
        readonly name: "endAt";
        readonly type: "uint256";
    }, {
        readonly internalType: "address";
        readonly name: "bidder";
        readonly type: "address";
    }];
    readonly stateMutability: "view";
    readonly type: "function";
}, {
    readonly inputs: {};
    readonly name: "owner";
    readonly outputs: readonly [{
        readonly internalType: "address";
        readonly name: "";
        readonly type: "address";
    }];
    readonly stateMutability: "view";
    readonly type: "function";
}, {
    readonly inputs: {};
    readonly name: "pause";
    readonly outputs: {};
    readonly stateMutability: "nonpayable";
    readonly type: "function";
}, {
    readonly inputs: {};
    readonly name: "paused";
    readonly outputs: readonly [{
        readonly internalType: "bool";
        readonly name: "";
        readonly type: "bool";
    }];
    readonly stateMutability: "view";
    readonly type: "function";
}, {
    readonly inputs: {};
    readonly name: "renounceOwnership";
    readonly outputs: {};
    readonly stateMutability: "nonpayable";
    readonly type: "function";
}, {
    readonly inputs: readonly [{
        readonly components: readonly [{
            readonly components: readonly [{
                readonly internalType: "uint256";
                readonly name: "salt";
                readonly type: "uint256";
            }, {
                readonly internalType: "address";
                readonly name: "user";
                readonly type: "address";
            }, {
                readonly internalType: "uint256";
                readonly name: "network";
                readonly type: "uint256";
            }, {
                readonly internalType: "uint256";
                readonly name: "intent";
                readonly type: "uint256";
            }, {
                readonly internalType: "uint256";
                readonly name: "delegateType";
                readonly type: "uint256";
            }, {
                readonly internalType: "uint256";
                readonly name: "deadline";
                readonly type: "uint256";
            }, {
                readonly internalType: "contract IERC20Upgradeable";
                readonly name: "currency";
                readonly type: "address";
            }, {
                readonly internalType: "bytes";
                readonly name: "dataMask";
                readonly type: "bytes";
            }, {
                readonly components: readonly [{
                    readonly internalType: "uint256";
                    readonly name: "price";
                    readonly type: "uint256";
                }, {
                    readonly internalType: "bytes";
                    readonly name: "data";
                    readonly type: "bytes";
                }];
                readonly internalType: "struct Market.OrderItem[]";
                readonly name: "items";
                readonly type: "tuple[]";
            }, {
                readonly internalType: "bytes32";
                readonly name: "r";
                readonly type: "bytes32";
            }, {
                readonly internalType: "bytes32";
                readonly name: "s";
                readonly type: "bytes32";
            }, {
                readonly internalType: "uint8";
                readonly name: "v";
                readonly type: "uint8";
            }, {
                readonly internalType: "uint8";
                readonly name: "signVersion";
                readonly type: "uint8";
            }];
            readonly internalType: "struct Market.Order[]";
            readonly name: "orders";
            readonly type: "tuple[]";
        }, {
            readonly components: readonly [{
                readonly internalType: "enum Market.Op";
                readonly name: "op";
                readonly type: "uint8";
            }, {
                readonly internalType: "uint256";
                readonly name: "orderIdx";
                readonly type: "uint256";
            }, {
                readonly internalType: "uint256";
                readonly name: "itemIdx";
                readonly type: "uint256";
            }, {
                readonly internalType: "uint256";
                readonly name: "price";
                readonly type: "uint256";
            }, {
                readonly internalType: "bytes32";
                readonly name: "itemHash";
                readonly type: "bytes32";
            }, {
                readonly internalType: "contract IDelegate";
                readonly name: "executionDelegate";
                readonly type: "address";
            }, {
                readonly internalType: "bytes";
                readonly name: "dataReplacement";
                readonly type: "bytes";
            }, {
                readonly internalType: "uint256";
                readonly name: "bidIncentivePct";
                readonly type: "uint256";
            }, {
                readonly internalType: "uint256";
                readonly name: "aucMinIncrementPct";
                readonly type: "uint256";
            }, {
                readonly internalType: "uint256";
                readonly name: "aucIncDurationSecs";
                readonly type: "uint256";
            }, {
                readonly components: readonly [{
                    readonly internalType: "uint256";
                    readonly name: "percentage";
                    readonly type: "uint256";
                }, {
                    readonly internalType: "address";
                    readonly name: "to";
                    readonly type: "address";
                }];
                readonly internalType: "struct Market.Fee[]";
                readonly name: "fees";
                readonly type: "tuple[]";
            }];
            readonly internalType: "struct Market.SettleDetail[]";
            readonly name: "details";
            readonly type: "tuple[]";
        }, {
            readonly components: readonly [{
                readonly internalType: "uint256";
                readonly name: "salt";
                readonly type: "uint256";
            }, {
                readonly internalType: "uint256";
                readonly name: "deadline";
                readonly type: "uint256";
            }, {
                readonly internalType: "uint256";
                readonly name: "amountToEth";
                readonly type: "uint256";
            }, {
                readonly internalType: "uint256";
                readonly name: "amountToWeth";
                readonly type: "uint256";
            }, {
                readonly internalType: "address";
                readonly name: "user";
                readonly type: "address";
            }, {
                readonly internalType: "bool";
                readonly name: "canFail";
                readonly type: "bool";
            }];
            readonly internalType: "struct Market.SettleShared";
            readonly name: "shared";
            readonly type: "tuple";
        }, {
            readonly internalType: "bytes32";
            readonly name: "r";
            readonly type: "bytes32";
        }, {
            readonly internalType: "bytes32";
            readonly name: "s";
            readonly type: "bytes32";
        }, {
            readonly internalType: "uint8";
            readonly name: "v";
            readonly type: "uint8";
        }];
        readonly internalType: "struct Market.RunInput";
        readonly name: "input";
        readonly type: "tuple";
    }];
    readonly name: "run";
    readonly outputs: {};
    readonly stateMutability: "payable";
    readonly type: "function";
}, {
    readonly inputs: readonly [{
        readonly components: readonly [{
            readonly internalType: "uint256";
            readonly name: "salt";
            readonly type: "uint256";
        }, {
            readonly internalType: "address";
            readonly name: "user";
            readonly type: "address";
        }, {
            readonly internalType: "uint256";
            readonly name: "network";
            readonly type: "uint256";
        }, {
            readonly internalType: "uint256";
            readonly name: "intent";
            readonly type: "uint256";
        }, {
            readonly internalType: "uint256";
            readonly name: "delegateType";
            readonly type: "uint256";
        }, {
            readonly internalType: "uint256";
            readonly name: "deadline";
            readonly type: "uint256";
        }, {
            readonly internalType: "contract IERC20Upgradeable";
            readonly name: "currency";
            readonly type: "address";
        }, {
            readonly internalType: "bytes";
            readonly name: "dataMask";
            readonly type: "bytes";
        }, {
            readonly components: readonly [{
                readonly internalType: "uint256";
                readonly name: "price";
                readonly type: "uint256";
            }, {
                readonly internalType: "bytes";
                readonly name: "data";
                readonly type: "bytes";
            }];
            readonly internalType: "struct Market.OrderItem[]";
            readonly name: "items";
            readonly type: "tuple[]";
        }, {
            readonly internalType: "bytes32";
            readonly name: "r";
            readonly type: "bytes32";
        }, {
            readonly internalType: "bytes32";
            readonly name: "s";
            readonly type: "bytes32";
        }, {
            readonly internalType: "uint8";
            readonly name: "v";
            readonly type: "uint8";
        }, {
            readonly internalType: "uint8";
            readonly name: "signVersion";
            readonly type: "uint8";
        }];
        readonly internalType: "struct Market.Order";
        readonly name: "order";
        readonly type: "tuple";
    }, {
        readonly components: readonly [{
            readonly internalType: "uint256";
            readonly name: "salt";
            readonly type: "uint256";
        }, {
            readonly internalType: "uint256";
            readonly name: "deadline";
            readonly type: "uint256";
        }, {
            readonly internalType: "uint256";
            readonly name: "amountToEth";
            readonly type: "uint256";
        }, {
            readonly internalType: "uint256";
            readonly name: "amountToWeth";
            readonly type: "uint256";
        }, {
            readonly internalType: "address";
            readonly name: "user";
            readonly type: "address";
        }, {
            readonly internalType: "bool";
            readonly name: "canFail";
            readonly type: "bool";
        }];
        readonly internalType: "struct Market.SettleShared";
        readonly name: "shared";
        readonly type: "tuple";
    }, {
        readonly components: readonly [{
            readonly internalType: "enum Market.Op";
            readonly name: "op";
            readonly type: "uint8";
        }, {
            readonly internalType: "uint256";
            readonly name: "orderIdx";
            readonly type: "uint256";
        }, {
            readonly internalType: "uint256";
            readonly name: "itemIdx";
            readonly type: "uint256";
        }, {
            readonly internalType: "uint256";
            readonly name: "price";
            readonly type: "uint256";
        }, {
            readonly internalType: "bytes32";
            readonly name: "itemHash";
            readonly type: "bytes32";
        }, {
            readonly internalType: "contract IDelegate";
            readonly name: "executionDelegate";
            readonly type: "address";
        }, {
            readonly internalType: "bytes";
            readonly name: "dataReplacement";
            readonly type: "bytes";
        }, {
            readonly internalType: "uint256";
            readonly name: "bidIncentivePct";
            readonly type: "uint256";
        }, {
            readonly internalType: "uint256";
            readonly name: "aucMinIncrementPct";
            readonly type: "uint256";
        }, {
            readonly internalType: "uint256";
            readonly name: "aucIncDurationSecs";
            readonly type: "uint256";
        }, {
            readonly components: readonly [{
                readonly internalType: "uint256";
                readonly name: "percentage";
                readonly type: "uint256";
            }, {
                readonly internalType: "address";
                readonly name: "to";
                readonly type: "address";
            }];
            readonly internalType: "struct Market.Fee[]";
            readonly name: "fees";
            readonly type: "tuple[]";
        }];
        readonly internalType: "struct Market.SettleDetail";
        readonly name: "detail";
        readonly type: "tuple";
    }];
    readonly name: "run1";
    readonly outputs: readonly [{
        readonly internalType: "uint256";
        readonly name: "";
        readonly type: "uint256";
    }];
    readonly stateMutability: "nonpayable";
    readonly type: "function";
}, {
    readonly inputs: readonly [{
        readonly internalType: "address";
        readonly name: "";
        readonly type: "address";
    }];
    readonly name: "signers";
    readonly outputs: readonly [{
        readonly internalType: "bool";
        readonly name: "";
        readonly type: "bool";
    }];
    readonly stateMutability: "view";
    readonly type: "function";
}, {
    readonly inputs: readonly [{
        readonly internalType: "address";
        readonly name: "newOwner";
        readonly type: "address";
    }];
    readonly name: "transferOwnership";
    readonly outputs: {};
    readonly stateMutability: "nonpayable";
    readonly type: "function";
}, {
    readonly inputs: {};
    readonly name: "unpause";
    readonly outputs: {};
    readonly stateMutability: "nonpayable";
    readonly type: "function";
}, {
    readonly inputs: readonly [{
        readonly internalType: "address[]";
        readonly name: "toAdd";
        readonly type: "address[]";
    }, {
        readonly internalType: "address[]";
        readonly name: "toRemove";
        readonly type: "address[]";
    }];
    readonly name: "updateDelegates";
    readonly outputs: {};
    readonly stateMutability: "nonpayable";
    readonly type: "function";
}, {
    readonly inputs: readonly [{
        readonly internalType: "uint256";
        readonly name: "val";
        readonly type: "uint256";
    }];
    readonly name: "updateFeeCap";
    readonly outputs: {};
    readonly stateMutability: "nonpayable";
    readonly type: "function";
}, {
    readonly inputs: readonly [{
        readonly internalType: "address[]";
        readonly name: "toAdd";
        readonly type: "address[]";
    }, {
        readonly internalType: "address[]";
        readonly name: "toRemove";
        readonly type: "address[]";
    }];
    readonly name: "updateSigners";
    readonly outputs: {};
    readonly stateMutability: "nonpayable";
    readonly type: "function";
}, {
    readonly inputs: {};
    readonly name: "weth";
    readonly outputs: readonly [{
        readonly internalType: "contract IWETHUpgradable";
        readonly name: "";
        readonly type: "address";
    }];
    readonly stateMutability: "view";
    readonly type: "function";
}, {
    readonly stateMutability: "payable";
    readonly type: "receive";
}];
//# sourceMappingURL=X2Y2.d.ts.map