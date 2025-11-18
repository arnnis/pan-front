export declare const orderQuoterAbi: readonly [{
    readonly inputs: readonly [];
    readonly name: "OrdersLengthIncorrect";
    readonly type: "error";
}, {
    readonly inputs: readonly [{
        readonly internalType: "bytes";
        readonly name: "order";
        readonly type: "bytes";
    }];
    readonly name: "getReactor";
    readonly outputs: readonly [{
        readonly internalType: "contract IReactor";
        readonly name: "reactor";
        readonly type: "address";
    }];
    readonly stateMutability: "pure";
    readonly type: "function";
}, {
    readonly inputs: readonly [{
        readonly internalType: "bytes";
        readonly name: "order";
        readonly type: "bytes";
    }, {
        readonly internalType: "bytes";
        readonly name: "sig";
        readonly type: "bytes";
    }];
    readonly name: "quote";
    readonly outputs: readonly [{
        readonly components: readonly [{
            readonly components: readonly [{
                readonly internalType: "contract IReactor";
                readonly name: "reactor";
                readonly type: "address";
            }, {
                readonly internalType: "address";
                readonly name: "swapper";
                readonly type: "address";
            }, {
                readonly internalType: "uint256";
                readonly name: "nonce";
                readonly type: "uint256";
            }, {
                readonly internalType: "uint256";
                readonly name: "deadline";
                readonly type: "uint256";
            }, {
                readonly internalType: "contract IValidationCallback";
                readonly name: "additionalValidationContract";
                readonly type: "address";
            }, {
                readonly internalType: "bytes";
                readonly name: "additionalValidationData";
                readonly type: "bytes";
            }];
            readonly internalType: "struct OrderInfo";
            readonly name: "info";
            readonly type: "tuple";
        }, {
            readonly components: readonly [{
                readonly internalType: "contract ERC20";
                readonly name: "token";
                readonly type: "address";
            }, {
                readonly internalType: "uint256";
                readonly name: "amount";
                readonly type: "uint256";
            }, {
                readonly internalType: "uint256";
                readonly name: "maxAmount";
                readonly type: "uint256";
            }];
            readonly internalType: "struct InputToken";
            readonly name: "input";
            readonly type: "tuple";
        }, {
            readonly components: readonly [{
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
            readonly internalType: "struct OutputToken[]";
            readonly name: "outputs";
            readonly type: "tuple[]";
        }, {
            readonly internalType: "bytes";
            readonly name: "sig";
            readonly type: "bytes";
        }, {
            readonly internalType: "bytes32";
            readonly name: "hash";
            readonly type: "bytes32";
        }];
        readonly internalType: "struct ResolvedOrder";
        readonly name: "result";
        readonly type: "tuple";
    }];
    readonly stateMutability: "nonpayable";
    readonly type: "function";
}, {
    readonly inputs: readonly [{
        readonly components: readonly [{
            readonly components: readonly [{
                readonly internalType: "contract IReactor";
                readonly name: "reactor";
                readonly type: "address";
            }, {
                readonly internalType: "address";
                readonly name: "swapper";
                readonly type: "address";
            }, {
                readonly internalType: "uint256";
                readonly name: "nonce";
                readonly type: "uint256";
            }, {
                readonly internalType: "uint256";
                readonly name: "deadline";
                readonly type: "uint256";
            }, {
                readonly internalType: "contract IValidationCallback";
                readonly name: "additionalValidationContract";
                readonly type: "address";
            }, {
                readonly internalType: "bytes";
                readonly name: "additionalValidationData";
                readonly type: "bytes";
            }];
            readonly internalType: "struct OrderInfo";
            readonly name: "info";
            readonly type: "tuple";
        }, {
            readonly components: readonly [{
                readonly internalType: "contract ERC20";
                readonly name: "token";
                readonly type: "address";
            }, {
                readonly internalType: "uint256";
                readonly name: "amount";
                readonly type: "uint256";
            }, {
                readonly internalType: "uint256";
                readonly name: "maxAmount";
                readonly type: "uint256";
            }];
            readonly internalType: "struct InputToken";
            readonly name: "input";
            readonly type: "tuple";
        }, {
            readonly components: readonly [{
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
            readonly internalType: "struct OutputToken[]";
            readonly name: "outputs";
            readonly type: "tuple[]";
        }, {
            readonly internalType: "bytes";
            readonly name: "sig";
            readonly type: "bytes";
        }, {
            readonly internalType: "bytes32";
            readonly name: "hash";
            readonly type: "bytes32";
        }];
        readonly internalType: "struct ResolvedOrder[]";
        readonly name: "resolvedOrders";
        readonly type: "tuple[]";
    }, {
        readonly internalType: "bytes";
        readonly name: "";
        readonly type: "bytes";
    }];
    readonly name: "reactorCallback";
    readonly outputs: readonly [];
    readonly stateMutability: "pure";
    readonly type: "function";
}];
//# sourceMappingURL=OrderQuoter.d.ts.map