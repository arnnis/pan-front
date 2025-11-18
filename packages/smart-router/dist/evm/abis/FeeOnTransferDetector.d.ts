export declare const feeOnTransferDetectorAbi: readonly [{
    readonly inputs: readonly [{
        readonly internalType: "address";
        readonly name: "_factoryV2";
        readonly type: "address";
    }];
    readonly stateMutability: "nonpayable";
    readonly type: "constructor";
}, {
    readonly inputs: readonly [];
    readonly name: "PairLookupFailed";
    readonly type: "error";
}, {
    readonly inputs: readonly [];
    readonly name: "SameToken";
    readonly type: "error";
}, {
    readonly inputs: readonly [{
        readonly internalType: "address[]";
        readonly name: "tokens";
        readonly type: "address[]";
    }, {
        readonly internalType: "address";
        readonly name: "baseToken";
        readonly type: "address";
    }, {
        readonly internalType: "uint256";
        readonly name: "amountToBorrow";
        readonly type: "uint256";
    }];
    readonly name: "batchValidate";
    readonly outputs: readonly [{
        readonly components: readonly [{
            readonly internalType: "uint256";
            readonly name: "buyFeeBps";
            readonly type: "uint256";
        }, {
            readonly internalType: "uint256";
            readonly name: "sellFeeBps";
            readonly type: "uint256";
        }];
        readonly internalType: "struct TokenFees[]";
        readonly name: "fotResults";
        readonly type: "tuple[]";
    }];
    readonly stateMutability: "nonpayable";
    readonly type: "function";
}, {
    readonly inputs: readonly [{
        readonly internalType: "address";
        readonly name: "";
        readonly type: "address";
    }, {
        readonly internalType: "uint256";
        readonly name: "amount0";
        readonly type: "uint256";
    }, {
        readonly internalType: "uint256";
        readonly name: "";
        readonly type: "uint256";
    }, {
        readonly internalType: "bytes";
        readonly name: "data";
        readonly type: "bytes";
    }];
    readonly name: "pancakeCall";
    readonly outputs: readonly [];
    readonly stateMutability: "nonpayable";
    readonly type: "function";
}, {
    readonly inputs: readonly [{
        readonly internalType: "address";
        readonly name: "token";
        readonly type: "address";
    }, {
        readonly internalType: "address";
        readonly name: "baseToken";
        readonly type: "address";
    }, {
        readonly internalType: "uint256";
        readonly name: "amountToBorrow";
        readonly type: "uint256";
    }];
    readonly name: "validate";
    readonly outputs: readonly [{
        readonly components: readonly [{
            readonly internalType: "uint256";
            readonly name: "buyFeeBps";
            readonly type: "uint256";
        }, {
            readonly internalType: "uint256";
            readonly name: "sellFeeBps";
            readonly type: "uint256";
        }];
        readonly internalType: "struct TokenFees";
        readonly name: "fotResult";
        readonly type: "tuple";
    }];
    readonly stateMutability: "nonpayable";
    readonly type: "function";
}];
//# sourceMappingURL=FeeOnTransferDetector.d.ts.map