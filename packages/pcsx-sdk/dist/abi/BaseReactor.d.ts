export declare const baseReactorAbi: readonly [{
    readonly inputs: readonly [];
    readonly name: "DeadlinePassed";
    readonly type: "error";
}, {
    readonly inputs: readonly [{
        readonly internalType: "address";
        readonly name: "duplicateToken";
        readonly type: "address";
    }];
    readonly name: "DuplicateFeeOutput";
    readonly type: "error";
}, {
    readonly inputs: readonly [{
        readonly internalType: "address";
        readonly name: "token";
        readonly type: "address";
    }, {
        readonly internalType: "uint256";
        readonly name: "amount";
        readonly type: "uint256";
    }, {
        readonly internalType: "address";
        readonly name: "recipient";
        readonly type: "address";
    }];
    readonly name: "FeeTooLarge";
    readonly type: "error";
}, {
    readonly inputs: readonly [];
    readonly name: "InsufficientEth";
    readonly type: "error";
}, {
    readonly inputs: readonly [{
        readonly internalType: "address";
        readonly name: "feeToken";
        readonly type: "address";
    }];
    readonly name: "InvalidFeeToken";
    readonly type: "error";
}, {
    readonly inputs: readonly [];
    readonly name: "InvalidReactor";
    readonly type: "error";
}, {
    readonly inputs: readonly [];
    readonly name: "NativeTransferFailed";
    readonly type: "error";
}, {
    readonly inputs: readonly [];
    readonly name: "ReentrancyGuardReentrantCall";
    readonly type: "error";
}, {
    readonly anonymous: false;
    readonly inputs: readonly [{
        readonly indexed: true;
        readonly internalType: "bytes32";
        readonly name: "orderHash";
        readonly type: "bytes32";
    }, {
        readonly indexed: true;
        readonly internalType: "address";
        readonly name: "filler";
        readonly type: "address";
    }, {
        readonly indexed: true;
        readonly internalType: "address";
        readonly name: "swapper";
        readonly type: "address";
    }, {
        readonly indexed: false;
        readonly internalType: "uint256";
        readonly name: "nonce";
        readonly type: "uint256";
    }];
    readonly name: "Fill";
    readonly type: "event";
}, {
    readonly anonymous: false;
    readonly inputs: readonly [{
        readonly indexed: true;
        readonly internalType: "address";
        readonly name: "user";
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
        readonly name: "oldFeeController";
        readonly type: "address";
    }, {
        readonly indexed: false;
        readonly internalType: "address";
        readonly name: "newFeeController";
        readonly type: "address";
    }];
    readonly name: "ProtocolFeeControllerSet";
    readonly type: "event";
}, {
    readonly inputs: readonly [{
        readonly components: readonly [{
            readonly internalType: "bytes";
            readonly name: "order";
            readonly type: "bytes";
        }, {
            readonly internalType: "bytes";
            readonly name: "sig";
            readonly type: "bytes";
        }];
        readonly internalType: "struct SignedOrder";
        readonly name: "order";
        readonly type: "tuple";
    }];
    readonly name: "execute";
    readonly outputs: readonly [];
    readonly stateMutability: "payable";
    readonly type: "function";
}, {
    readonly inputs: readonly [{
        readonly components: readonly [{
            readonly internalType: "bytes";
            readonly name: "order";
            readonly type: "bytes";
        }, {
            readonly internalType: "bytes";
            readonly name: "sig";
            readonly type: "bytes";
        }];
        readonly internalType: "struct SignedOrder[]";
        readonly name: "orders";
        readonly type: "tuple[]";
    }];
    readonly name: "executeBatch";
    readonly outputs: readonly [];
    readonly stateMutability: "payable";
    readonly type: "function";
}, {
    readonly inputs: readonly [{
        readonly components: readonly [{
            readonly internalType: "bytes";
            readonly name: "order";
            readonly type: "bytes";
        }, {
            readonly internalType: "bytes";
            readonly name: "sig";
            readonly type: "bytes";
        }];
        readonly internalType: "struct SignedOrder[]";
        readonly name: "orders";
        readonly type: "tuple[]";
    }, {
        readonly internalType: "bytes";
        readonly name: "callbackData";
        readonly type: "bytes";
    }];
    readonly name: "executeBatchWithCallback";
    readonly outputs: readonly [];
    readonly stateMutability: "payable";
    readonly type: "function";
}, {
    readonly inputs: readonly [{
        readonly components: readonly [{
            readonly internalType: "bytes";
            readonly name: "order";
            readonly type: "bytes";
        }, {
            readonly internalType: "bytes";
            readonly name: "sig";
            readonly type: "bytes";
        }];
        readonly internalType: "struct SignedOrder";
        readonly name: "order";
        readonly type: "tuple";
    }, {
        readonly internalType: "bytes";
        readonly name: "callbackData";
        readonly type: "bytes";
    }];
    readonly name: "executeWithCallback";
    readonly outputs: readonly [];
    readonly stateMutability: "payable";
    readonly type: "function";
}, {
    readonly inputs: readonly [];
    readonly name: "feeController";
    readonly outputs: readonly [{
        readonly internalType: "contract IProtocolFeeController";
        readonly name: "";
        readonly type: "address";
    }];
    readonly stateMutability: "view";
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
    readonly inputs: readonly [];
    readonly name: "permit2";
    readonly outputs: readonly [{
        readonly internalType: "contract IPermit2";
        readonly name: "";
        readonly type: "address";
    }];
    readonly stateMutability: "view";
    readonly type: "function";
}, {
    readonly inputs: readonly [{
        readonly internalType: "address";
        readonly name: "_newFeeController";
        readonly type: "address";
    }];
    readonly name: "setProtocolFeeController";
    readonly outputs: readonly [];
    readonly stateMutability: "nonpayable";
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
    readonly stateMutability: "payable";
    readonly type: "receive";
}];
//# sourceMappingURL=BaseReactor.d.ts.map