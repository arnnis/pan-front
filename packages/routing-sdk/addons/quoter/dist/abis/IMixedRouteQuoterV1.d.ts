export declare const mixedRouteQuoterV1ABI: readonly [{
    readonly inputs: readonly [{
        readonly internalType: "bytes";
        readonly name: "path";
        readonly type: "bytes";
    }, {
        readonly internalType: "uint256[]";
        readonly name: "flag";
        readonly type: "uint256[]";
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
        readonly name: "v3SqrtPriceX96AfterList";
        readonly type: "uint160[]";
    }, {
        readonly internalType: "uint32[]";
        readonly name: "v3InitializedTicksCrossedList";
        readonly type: "uint32[]";
    }, {
        readonly internalType: "uint256";
        readonly name: "v3SwapGasEstimate";
        readonly type: "uint256";
    }];
    readonly stateMutability: "nonpayable";
    readonly type: "function";
}];
//# sourceMappingURL=IMixedRouteQuoterV1.d.ts.map