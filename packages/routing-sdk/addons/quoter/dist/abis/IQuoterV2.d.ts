export declare const quoterV2ABI: readonly [{
    readonly inputs: readonly [{
        readonly internalType: "bytes";
        readonly name: "path";
        readonly type: "bytes";
    }, {
        readonly internalType: "uint256";
        readonly name: "amountIn";
        readonly type: "uint256";
    }];
    readonly name: "quoteExactInput";
    readonly outputs: readonly [{
        readonly internalType: "uint256";
        readonly name: "amountOut";
        readonly type: "uint256";
    }, {
        readonly internalType: "uint160[]";
        readonly name: "sqrtPriceX96AfterList";
        readonly type: "uint160[]";
    }, {
        readonly internalType: "uint32[]";
        readonly name: "initializedTicksCrossedList";
        readonly type: "uint32[]";
    }, {
        readonly internalType: "uint256";
        readonly name: "gasEstimate";
        readonly type: "uint256";
    }];
    readonly stateMutability: "nonpayable";
    readonly type: "function";
}, {
    readonly inputs: readonly [{
        readonly internalType: "bytes";
        readonly name: "path";
        readonly type: "bytes";
    }, {
        readonly internalType: "uint256";
        readonly name: "amountOut";
        readonly type: "uint256";
    }];
    readonly name: "quoteExactOutput";
    readonly outputs: readonly [{
        readonly internalType: "uint256";
        readonly name: "amountIn";
        readonly type: "uint256";
    }, {
        readonly internalType: "uint160[]";
        readonly name: "sqrtPriceX96AfterList";
        readonly type: "uint160[]";
    }, {
        readonly internalType: "uint32[]";
        readonly name: "initializedTicksCrossedList";
        readonly type: "uint32[]";
    }, {
        readonly internalType: "uint256";
        readonly name: "gasEstimate";
        readonly type: "uint256";
    }];
    readonly stateMutability: "nonpayable";
    readonly type: "function";
}];
//# sourceMappingURL=IQuoterV2.d.ts.map