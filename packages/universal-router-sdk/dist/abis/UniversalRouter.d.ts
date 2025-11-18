export declare const UniversalRouterABI: readonly [{
    readonly inputs: readonly [{
        readonly components: readonly [{
            readonly internalType: "address";
            readonly name: "permit2";
            readonly type: "address";
        }, {
            readonly internalType: "address";
            readonly name: "weth9";
            readonly type: "address";
        }, {
            readonly internalType: "address";
            readonly name: "seaportV1_5";
            readonly type: "address";
        }, {
            readonly internalType: "address";
            readonly name: "seaportV1_4";
            readonly type: "address";
        }, {
            readonly internalType: "address";
            readonly name: "openseaConduit";
            readonly type: "address";
        }, {
            readonly internalType: "address";
            readonly name: "x2y2";
            readonly type: "address";
        }, {
            readonly internalType: "address";
            readonly name: "looksRareV2";
            readonly type: "address";
        }, {
            readonly internalType: "address";
            readonly name: "routerRewardsDistributor";
            readonly type: "address";
        }, {
            readonly internalType: "address";
            readonly name: "looksRareRewardsDistributor";
            readonly type: "address";
        }, {
            readonly internalType: "address";
            readonly name: "looksRareToken";
            readonly type: "address";
        }, {
            readonly internalType: "address";
            readonly name: "v2Factory";
            readonly type: "address";
        }, {
            readonly internalType: "address";
            readonly name: "v3Factory";
            readonly type: "address";
        }, {
            readonly internalType: "address";
            readonly name: "v3Deployer";
            readonly type: "address";
        }, {
            readonly internalType: "bytes32";
            readonly name: "v2InitCodeHash";
            readonly type: "bytes32";
        }, {
            readonly internalType: "bytes32";
            readonly name: "v3InitCodeHash";
            readonly type: "bytes32";
        }, {
            readonly internalType: "address";
            readonly name: "stableFactory";
            readonly type: "address";
        }, {
            readonly internalType: "address";
            readonly name: "stableInfo";
            readonly type: "address";
        }, {
            readonly internalType: "address";
            readonly name: "pancakeNFTMarket";
            readonly type: "address";
        }];
        readonly internalType: "struct RouterParameters";
        readonly name: "params";
        readonly type: "tuple";
    }];
    readonly stateMutability: "nonpayable";
    readonly type: "constructor";
}, {
    readonly inputs: readonly [];
    readonly name: "BalanceTooLow";
    readonly type: "error";
}, {
    readonly inputs: readonly [];
    readonly name: "BuyPancakeNFTFailed";
    readonly type: "error";
}, {
    readonly inputs: readonly [];
    readonly name: "BuyPunkFailed";
    readonly type: "error";
}, {
    readonly inputs: readonly [];
    readonly name: "ContractLocked";
    readonly type: "error";
}, {
    readonly inputs: readonly [];
    readonly name: "ETHNotAccepted";
    readonly type: "error";
}, {
    readonly inputs: readonly [{
        readonly internalType: "uint256";
        readonly name: "commandIndex";
        readonly type: "uint256";
    }, {
        readonly internalType: "bytes";
        readonly name: "message";
        readonly type: "bytes";
    }];
    readonly name: "ExecutionFailed";
    readonly type: "error";
}, {
    readonly inputs: readonly [];
    readonly name: "FromAddressIsNotOwner";
    readonly type: "error";
}, {
    readonly inputs: readonly [];
    readonly name: "InsufficientETH";
    readonly type: "error";
}, {
    readonly inputs: readonly [];
    readonly name: "InsufficientToken";
    readonly type: "error";
}, {
    readonly inputs: readonly [];
    readonly name: "InvalidBips";
    readonly type: "error";
}, {
    readonly inputs: readonly [{
        readonly internalType: "uint256";
        readonly name: "commandType";
        readonly type: "uint256";
    }];
    readonly name: "InvalidCommandType";
    readonly type: "error";
}, {
    readonly inputs: readonly [];
    readonly name: "InvalidOwnerERC1155";
    readonly type: "error";
}, {
    readonly inputs: readonly [];
    readonly name: "InvalidOwnerERC721";
    readonly type: "error";
}, {
    readonly inputs: readonly [];
    readonly name: "InvalidPath";
    readonly type: "error";
}, {
    readonly inputs: readonly [];
    readonly name: "InvalidPoolAddress";
    readonly type: "error";
}, {
    readonly inputs: readonly [];
    readonly name: "InvalidPoolLength";
    readonly type: "error";
}, {
    readonly inputs: readonly [];
    readonly name: "InvalidReserves";
    readonly type: "error";
}, {
    readonly inputs: readonly [];
    readonly name: "InvalidSpender";
    readonly type: "error";
}, {
    readonly inputs: readonly [];
    readonly name: "LengthMismatch";
    readonly type: "error";
}, {
    readonly inputs: readonly [];
    readonly name: "SliceOutOfBounds";
    readonly type: "error";
}, {
    readonly inputs: readonly [];
    readonly name: "StableInvalidPath";
    readonly type: "error";
}, {
    readonly inputs: readonly [];
    readonly name: "StableTooLittleReceived";
    readonly type: "error";
}, {
    readonly inputs: readonly [];
    readonly name: "StableTooMuchRequested";
    readonly type: "error";
}, {
    readonly inputs: readonly [];
    readonly name: "TransactionDeadlinePassed";
    readonly type: "error";
}, {
    readonly inputs: readonly [];
    readonly name: "UnableToClaim";
    readonly type: "error";
}, {
    readonly inputs: readonly [];
    readonly name: "UnsafeCast";
    readonly type: "error";
}, {
    readonly inputs: readonly [];
    readonly name: "V2InvalidPath";
    readonly type: "error";
}, {
    readonly inputs: readonly [];
    readonly name: "V2TooLittleReceived";
    readonly type: "error";
}, {
    readonly inputs: readonly [];
    readonly name: "V2TooMuchRequested";
    readonly type: "error";
}, {
    readonly inputs: readonly [];
    readonly name: "V3InvalidAmountOut";
    readonly type: "error";
}, {
    readonly inputs: readonly [];
    readonly name: "V3InvalidCaller";
    readonly type: "error";
}, {
    readonly inputs: readonly [];
    readonly name: "V3InvalidSwap";
    readonly type: "error";
}, {
    readonly inputs: readonly [];
    readonly name: "V3TooLittleReceived";
    readonly type: "error";
}, {
    readonly inputs: readonly [];
    readonly name: "V3TooMuchRequested";
    readonly type: "error";
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
        readonly internalType: "uint256";
        readonly name: "amount";
        readonly type: "uint256";
    }];
    readonly name: "RewardsSent";
    readonly type: "event";
}, {
    readonly anonymous: false;
    readonly inputs: readonly [{
        readonly indexed: true;
        readonly internalType: "address";
        readonly name: "factory";
        readonly type: "address";
    }, {
        readonly indexed: true;
        readonly internalType: "address";
        readonly name: "info";
        readonly type: "address";
    }];
    readonly name: "SetStableSwap";
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
    readonly inputs: readonly [{
        readonly internalType: "bytes";
        readonly name: "looksRareClaim";
        readonly type: "bytes";
    }];
    readonly name: "collectRewards";
    readonly outputs: readonly [];
    readonly stateMutability: "nonpayable";
    readonly type: "function";
}, {
    readonly inputs: readonly [{
        readonly internalType: "bytes";
        readonly name: "commands";
        readonly type: "bytes";
    }, {
        readonly internalType: "bytes[]";
        readonly name: "inputs";
        readonly type: "bytes[]";
    }];
    readonly name: "execute";
    readonly outputs: readonly [];
    readonly stateMutability: "payable";
    readonly type: "function";
}, {
    readonly inputs: readonly [{
        readonly internalType: "bytes";
        readonly name: "commands";
        readonly type: "bytes";
    }, {
        readonly internalType: "bytes[]";
        readonly name: "inputs";
        readonly type: "bytes[]";
    }, {
        readonly internalType: "uint256";
        readonly name: "deadline";
        readonly type: "uint256";
    }];
    readonly name: "execute";
    readonly outputs: readonly [];
    readonly stateMutability: "payable";
    readonly type: "function";
}, {
    readonly inputs: readonly [{
        readonly internalType: "address";
        readonly name: "";
        readonly type: "address";
    }, {
        readonly internalType: "address";
        readonly name: "";
        readonly type: "address";
    }, {
        readonly internalType: "uint256[]";
        readonly name: "";
        readonly type: "uint256[]";
    }, {
        readonly internalType: "uint256[]";
        readonly name: "";
        readonly type: "uint256[]";
    }, {
        readonly internalType: "bytes";
        readonly name: "";
        readonly type: "bytes";
    }];
    readonly name: "onERC1155BatchReceived";
    readonly outputs: readonly [{
        readonly internalType: "bytes4";
        readonly name: "";
        readonly type: "bytes4";
    }];
    readonly stateMutability: "pure";
    readonly type: "function";
}, {
    readonly inputs: readonly [{
        readonly internalType: "address";
        readonly name: "";
        readonly type: "address";
    }, {
        readonly internalType: "address";
        readonly name: "";
        readonly type: "address";
    }, {
        readonly internalType: "uint256";
        readonly name: "";
        readonly type: "uint256";
    }, {
        readonly internalType: "uint256";
        readonly name: "";
        readonly type: "uint256";
    }, {
        readonly internalType: "bytes";
        readonly name: "";
        readonly type: "bytes";
    }];
    readonly name: "onERC1155Received";
    readonly outputs: readonly [{
        readonly internalType: "bytes4";
        readonly name: "";
        readonly type: "bytes4";
    }];
    readonly stateMutability: "pure";
    readonly type: "function";
}, {
    readonly inputs: readonly [{
        readonly internalType: "address";
        readonly name: "";
        readonly type: "address";
    }, {
        readonly internalType: "address";
        readonly name: "";
        readonly type: "address";
    }, {
        readonly internalType: "uint256";
        readonly name: "";
        readonly type: "uint256";
    }, {
        readonly internalType: "bytes";
        readonly name: "";
        readonly type: "bytes";
    }];
    readonly name: "onERC721Received";
    readonly outputs: readonly [{
        readonly internalType: "bytes4";
        readonly name: "";
        readonly type: "bytes4";
    }];
    readonly stateMutability: "pure";
    readonly type: "function";
}, {
    readonly inputs: readonly [];
    readonly name: "owner";
    readonly outputs: readonly [{
        readonly internalType: "address";
        readonly name: "";
        readonly type: "address";
    }];
    readonly stateMutability: "view";
    readonly type: "function";
}, {
    readonly inputs: readonly [{
        readonly internalType: "int256";
        readonly name: "amount0Delta";
        readonly type: "int256";
    }, {
        readonly internalType: "int256";
        readonly name: "amount1Delta";
        readonly type: "int256";
    }, {
        readonly internalType: "bytes";
        readonly name: "data";
        readonly type: "bytes";
    }];
    readonly name: "pancakeV3SwapCallback";
    readonly outputs: readonly [];
    readonly stateMutability: "nonpayable";
    readonly type: "function";
}, {
    readonly inputs: readonly [];
    readonly name: "pause";
    readonly outputs: readonly [];
    readonly stateMutability: "nonpayable";
    readonly type: "function";
}, {
    readonly inputs: readonly [];
    readonly name: "paused";
    readonly outputs: readonly [{
        readonly internalType: "bool";
        readonly name: "";
        readonly type: "bool";
    }];
    readonly stateMutability: "view";
    readonly type: "function";
}, {
    readonly inputs: readonly [];
    readonly name: "renounceOwnership";
    readonly outputs: readonly [];
    readonly stateMutability: "nonpayable";
    readonly type: "function";
}, {
    readonly inputs: readonly [{
        readonly internalType: "address";
        readonly name: "_factory";
        readonly type: "address";
    }, {
        readonly internalType: "address";
        readonly name: "_info";
        readonly type: "address";
    }];
    readonly name: "setStableSwap";
    readonly outputs: readonly [];
    readonly stateMutability: "nonpayable";
    readonly type: "function";
}, {
    readonly inputs: readonly [];
    readonly name: "stableSwapFactory";
    readonly outputs: readonly [{
        readonly internalType: "address";
        readonly name: "";
        readonly type: "address";
    }];
    readonly stateMutability: "view";
    readonly type: "function";
}, {
    readonly inputs: readonly [];
    readonly name: "stableSwapInfo";
    readonly outputs: readonly [{
        readonly internalType: "address";
        readonly name: "";
        readonly type: "address";
    }];
    readonly stateMutability: "view";
    readonly type: "function";
}, {
    readonly inputs: readonly [{
        readonly internalType: "bytes4";
        readonly name: "interfaceId";
        readonly type: "bytes4";
    }];
    readonly name: "supportsInterface";
    readonly outputs: readonly [{
        readonly internalType: "bool";
        readonly name: "";
        readonly type: "bool";
    }];
    readonly stateMutability: "pure";
    readonly type: "function";
}, {
    readonly inputs: readonly [{
        readonly internalType: "address";
        readonly name: "newOwner";
        readonly type: "address";
    }];
    readonly name: "transferOwnership";
    readonly outputs: readonly [];
    readonly stateMutability: "nonpayable";
    readonly type: "function";
}, {
    readonly inputs: readonly [];
    readonly name: "unpause";
    readonly outputs: readonly [];
    readonly stateMutability: "nonpayable";
    readonly type: "function";
}, {
    readonly stateMutability: "payable";
    readonly type: "receive";
}];
//# sourceMappingURL=UniversalRouter.d.ts.map