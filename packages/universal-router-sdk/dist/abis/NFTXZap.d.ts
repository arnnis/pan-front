export declare const nftxZapAbi: readonly [{
    readonly inputs: readonly [{
        readonly internalType: "address";
        readonly name: "_nftxFactory";
        readonly type: "address";
    }, {
        readonly internalType: "address";
        readonly name: "_WETH";
        readonly type: "address";
    }, {
        readonly internalType: "address payable";
        readonly name: "_swapTarget";
        readonly type: "address";
    }, {
        readonly internalType: "uint256";
        readonly name: "_dustThreshold";
        readonly type: "uint256";
    }];
    readonly stateMutability: "nonpayable";
    readonly type: "constructor";
}, {
    readonly anonymous: false;
    readonly inputs: readonly [{
        readonly indexed: false;
        readonly internalType: "uint256";
        readonly name: "count";
        readonly type: "uint256";
    }, {
        readonly indexed: false;
        readonly internalType: "uint256";
        readonly name: "ethSpent";
        readonly type: "uint256";
    }, {
        readonly indexed: false;
        readonly internalType: "address";
        readonly name: "to";
        readonly type: "address";
    }];
    readonly name: "Buy";
    readonly type: "event";
}, {
    readonly anonymous: false;
    readonly inputs: readonly [{
        readonly indexed: false;
        readonly internalType: "uint256";
        readonly name: "ethAmount";
        readonly type: "uint256";
    }, {
        readonly indexed: false;
        readonly internalType: "uint256";
        readonly name: "vTokenAmount";
        readonly type: "uint256";
    }, {
        readonly indexed: false;
        readonly internalType: "address";
        readonly name: "to";
        readonly type: "address";
    }];
    readonly name: "DustReturned";
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
        readonly internalType: "uint256";
        readonly name: "count";
        readonly type: "uint256";
    }, {
        readonly indexed: false;
        readonly internalType: "uint256";
        readonly name: "ethReceived";
        readonly type: "uint256";
    }, {
        readonly indexed: false;
        readonly internalType: "address";
        readonly name: "to";
        readonly type: "address";
    }];
    readonly name: "Sell";
    readonly type: "event";
}, {
    readonly anonymous: false;
    readonly inputs: readonly [{
        readonly indexed: false;
        readonly internalType: "uint256";
        readonly name: "count";
        readonly type: "uint256";
    }, {
        readonly indexed: false;
        readonly internalType: "uint256";
        readonly name: "ethSpent";
        readonly type: "uint256";
    }, {
        readonly indexed: false;
        readonly internalType: "address";
        readonly name: "to";
        readonly type: "address";
    }];
    readonly name: "Swap";
    readonly type: "event";
}, {
    readonly inputs: {};
    readonly name: "WETH";
    readonly outputs: readonly [{
        readonly internalType: "contract IWETH";
        readonly name: "";
        readonly type: "address";
    }];
    readonly stateMutability: "view";
    readonly type: "function";
}, {
    readonly inputs: readonly [{
        readonly internalType: "uint256";
        readonly name: "vaultId";
        readonly type: "uint256";
    }, {
        readonly internalType: "uint256";
        readonly name: "amount";
        readonly type: "uint256";
    }, {
        readonly internalType: "uint256[]";
        readonly name: "specificIds";
        readonly type: "uint256[]";
    }, {
        readonly internalType: "bytes";
        readonly name: "swapCallData";
        readonly type: "bytes";
    }, {
        readonly internalType: "address payable";
        readonly name: "to";
        readonly type: "address";
    }];
    readonly name: "buyAndRedeem";
    readonly outputs: {};
    readonly stateMutability: "payable";
    readonly type: "function";
}, {
    readonly inputs: readonly [{
        readonly internalType: "uint256";
        readonly name: "vaultId";
        readonly type: "uint256";
    }, {
        readonly internalType: "uint256[]";
        readonly name: "idsIn";
        readonly type: "uint256[]";
    }, {
        readonly internalType: "uint256[]";
        readonly name: "amounts";
        readonly type: "uint256[]";
    }, {
        readonly internalType: "uint256[]";
        readonly name: "specificIds";
        readonly type: "uint256[]";
    }, {
        readonly internalType: "bytes";
        readonly name: "swapCallData";
        readonly type: "bytes";
    }, {
        readonly internalType: "address payable";
        readonly name: "to";
        readonly type: "address";
    }];
    readonly name: "buyAndSwap1155";
    readonly outputs: {};
    readonly stateMutability: "payable";
    readonly type: "function";
}, {
    readonly inputs: readonly [{
        readonly internalType: "uint256";
        readonly name: "vaultId";
        readonly type: "uint256";
    }, {
        readonly internalType: "uint256[]";
        readonly name: "idsIn";
        readonly type: "uint256[]";
    }, {
        readonly internalType: "uint256[]";
        readonly name: "specificIds";
        readonly type: "uint256[]";
    }, {
        readonly internalType: "bytes";
        readonly name: "swapCallData";
        readonly type: "bytes";
    }, {
        readonly internalType: "address payable";
        readonly name: "to";
        readonly type: "address";
    }];
    readonly name: "buyAndSwap721";
    readonly outputs: {};
    readonly stateMutability: "payable";
    readonly type: "function";
}, {
    readonly inputs: {};
    readonly name: "dustThreshold";
    readonly outputs: readonly [{
        readonly internalType: "uint256";
        readonly name: "";
        readonly type: "uint256";
    }];
    readonly stateMutability: "view";
    readonly type: "function";
}, {
    readonly inputs: {};
    readonly name: "feeDistributor";
    readonly outputs: readonly [{
        readonly internalType: "address";
        readonly name: "";
        readonly type: "address";
    }];
    readonly stateMutability: "view";
    readonly type: "function";
}, {
    readonly inputs: readonly [{
        readonly internalType: "uint256";
        readonly name: "vaultId";
        readonly type: "uint256";
    }, {
        readonly internalType: "uint256[]";
        readonly name: "ids";
        readonly type: "uint256[]";
    }, {
        readonly internalType: "uint256[]";
        readonly name: "amounts";
        readonly type: "uint256[]";
    }, {
        readonly internalType: "bytes";
        readonly name: "swapCallData";
        readonly type: "bytes";
    }, {
        readonly internalType: "address payable";
        readonly name: "to";
        readonly type: "address";
    }];
    readonly name: "mintAndSell1155";
    readonly outputs: {};
    readonly stateMutability: "nonpayable";
    readonly type: "function";
}, {
    readonly inputs: readonly [{
        readonly internalType: "uint256";
        readonly name: "vaultId";
        readonly type: "uint256";
    }, {
        readonly internalType: "uint256[]";
        readonly name: "ids";
        readonly type: "uint256[]";
    }, {
        readonly internalType: "bytes";
        readonly name: "swapCallData";
        readonly type: "bytes";
    }, {
        readonly internalType: "address payable";
        readonly name: "to";
        readonly type: "address";
    }];
    readonly name: "mintAndSell721";
    readonly outputs: {};
    readonly stateMutability: "nonpayable";
    readonly type: "function";
}, {
    readonly inputs: {};
    readonly name: "nftxFactory";
    readonly outputs: readonly [{
        readonly internalType: "contract INFTXVaultFactory";
        readonly name: "";
        readonly type: "address";
    }];
    readonly stateMutability: "view";
    readonly type: "function";
}, {
    readonly inputs: readonly [{
        readonly internalType: "uint256";
        readonly name: "";
        readonly type: "uint256";
    }];
    readonly name: "nftxVaultAddresses";
    readonly outputs: readonly [{
        readonly internalType: "address";
        readonly name: "";
        readonly type: "address";
    }];
    readonly stateMutability: "view";
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
    readonly stateMutability: "nonpayable";
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
    readonly stateMutability: "nonpayable";
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
    readonly stateMutability: "nonpayable";
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
    readonly inputs: readonly [{
        readonly internalType: "bool";
        readonly name: "_paused";
        readonly type: "bool";
    }];
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
        readonly internalType: "address";
        readonly name: "token";
        readonly type: "address";
    }];
    readonly name: "rescue";
    readonly outputs: {};
    readonly stateMutability: "nonpayable";
    readonly type: "function";
}, {
    readonly inputs: readonly [{
        readonly internalType: "uint256";
        readonly name: "_dustThreshold";
        readonly type: "uint256";
    }];
    readonly name: "setDustThreshold";
    readonly outputs: {};
    readonly stateMutability: "nonpayable";
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
    readonly stateMutability: "payable";
    readonly type: "receive";
}];
//# sourceMappingURL=NFTXZap.d.ts.map