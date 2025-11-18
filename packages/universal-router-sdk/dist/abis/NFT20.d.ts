export declare const nft20Abi: readonly [{
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
    readonly inputs: {};
    readonly name: "ETH";
    readonly outputs: readonly [{
        readonly internalType: "address";
        readonly name: "";
        readonly type: "address";
    }];
    readonly stateMutability: "view";
    readonly type: "function";
}, {
    readonly inputs: {};
    readonly name: "NFT20";
    readonly outputs: readonly [{
        readonly internalType: "contract INFT20Factory";
        readonly name: "";
        readonly type: "address";
    }];
    readonly stateMutability: "view";
    readonly type: "function";
}, {
    readonly inputs: {};
    readonly name: "UNIV2";
    readonly outputs: readonly [{
        readonly internalType: "address";
        readonly name: "";
        readonly type: "address";
    }];
    readonly stateMutability: "view";
    readonly type: "function";
}, {
    readonly inputs: {};
    readonly name: "UNIV3";
    readonly outputs: readonly [{
        readonly internalType: "address";
        readonly name: "";
        readonly type: "address";
    }];
    readonly stateMutability: "view";
    readonly type: "function";
}, {
    readonly inputs: {};
    readonly name: "WETH";
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
        readonly name: "_nft";
        readonly type: "address";
    }, {
        readonly internalType: "uint256[]";
        readonly name: "_toIds";
        readonly type: "uint256[]";
    }, {
        readonly internalType: "uint256[]";
        readonly name: "_toAmounts";
        readonly type: "uint256[]";
    }, {
        readonly internalType: "address";
        readonly name: "_receipient";
        readonly type: "address";
    }, {
        readonly internalType: "uint24";
        readonly name: "_fee";
        readonly type: "uint24";
    }, {
        readonly internalType: "bool";
        readonly name: "isV3";
        readonly type: "bool";
    }];
    readonly name: "ethForNft";
    readonly outputs: {};
    readonly stateMutability: "payable";
    readonly type: "function";
}, {
    readonly inputs: readonly [{
        readonly internalType: "address";
        readonly name: "_nft";
        readonly type: "address";
    }, {
        readonly internalType: "uint256[]";
        readonly name: "_ids";
        readonly type: "uint256[]";
    }, {
        readonly internalType: "uint256[]";
        readonly name: "_amounts";
        readonly type: "uint256[]";
    }, {
        readonly internalType: "bool";
        readonly name: "isErc721";
        readonly type: "bool";
    }, {
        readonly internalType: "uint24";
        readonly name: "_fee";
        readonly type: "uint24";
    }, {
        readonly internalType: "bool";
        readonly name: "isV3";
        readonly type: "bool";
    }];
    readonly name: "nftForEth";
    readonly outputs: {};
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
        readonly internalType: "address";
        readonly name: "tokenAddress";
        readonly type: "address";
    }, {
        readonly internalType: "uint256";
        readonly name: "tokenAmount";
        readonly type: "uint256";
    }, {
        readonly internalType: "address";
        readonly name: "sendTo";
        readonly type: "address";
    }];
    readonly name: "recoverERC20";
    readonly outputs: {};
    readonly stateMutability: "nonpayable";
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
        readonly name: "_registry";
        readonly type: "address";
    }];
    readonly name: "setNFT20";
    readonly outputs: {};
    readonly stateMutability: "nonpayable";
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
    readonly name: "withdrawEth";
    readonly outputs: {};
    readonly stateMutability: "payable";
    readonly type: "function";
}, {
    readonly stateMutability: "payable";
    readonly type: "receive";
}];
//# sourceMappingURL=NFT20.d.ts.map