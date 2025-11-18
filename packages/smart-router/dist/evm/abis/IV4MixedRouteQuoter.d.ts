export declare const v4MixedRouteQuoterAbi: readonly [{
    readonly inputs: readonly [{
        readonly internalType: "address";
        readonly name: "_factoryV3";
        readonly type: "address";
    }, {
        readonly internalType: "address";
        readonly name: "_factoryV2";
        readonly type: "address";
    }, {
        readonly internalType: "address";
        readonly name: "_factoryStable";
        readonly type: "address";
    }, {
        readonly internalType: "address";
        readonly name: "_WETH9";
        readonly type: "address";
    }, {
        readonly internalType: "contract ICLQuoter";
        readonly name: "_clQuoter";
        readonly type: "address";
    }, {
        readonly internalType: "contract IBinQuoter";
        readonly name: "_binQuoter";
        readonly type: "address";
    }];
    readonly stateMutability: "nonpayable";
    readonly type: "constructor";
}, {
    readonly inputs: readonly [];
    readonly name: "INVALID_ADDRESS";
    readonly type: "error";
}, {
    readonly inputs: readonly [];
    readonly name: "InputLengthMismatch";
    readonly type: "error";
}, {
    readonly inputs: readonly [];
    readonly name: "InvalidPath";
    readonly type: "error";
}, {
    readonly inputs: readonly [];
    readonly name: "InvalidPoolKeyCurrency";
    readonly type: "error";
}, {
    readonly inputs: readonly [];
    readonly name: "NoActions";
    readonly type: "error";
}, {
    readonly inputs: readonly [{
        readonly internalType: "uint8";
        readonly name: "bits";
        readonly type: "uint8";
    }, {
        readonly internalType: "uint256";
        readonly name: "value";
        readonly type: "uint256";
    }];
    readonly name: "SafeCastOverflowedUintDowncast";
    readonly type: "error";
}, {
    readonly inputs: readonly [{
        readonly internalType: "uint256";
        readonly name: "value";
        readonly type: "uint256";
    }];
    readonly name: "SafeCastOverflowedUintToInt";
    readonly type: "error";
}, {
    readonly inputs: readonly [{
        readonly internalType: "uint256";
        readonly name: "action";
        readonly type: "uint256";
    }];
    readonly name: "UnsupportedAction";
    readonly type: "error";
}, {
    readonly inputs: readonly [];
    readonly name: "WETH9";
    readonly outputs: readonly [{
        readonly internalType: "address";
        readonly name: "";
        readonly type: "address";
    }];
    readonly stateMutability: "view";
    readonly type: "function";
}, {
    readonly inputs: readonly [];
    readonly name: "binQuoter";
    readonly outputs: readonly [{
        readonly internalType: "contract IBinQuoter";
        readonly name: "";
        readonly type: "address";
    }];
    readonly stateMutability: "view";
    readonly type: "function";
}, {
    readonly inputs: readonly [];
    readonly name: "clQuoter";
    readonly outputs: readonly [{
        readonly internalType: "contract ICLQuoter";
        readonly name: "";
        readonly type: "address";
    }];
    readonly stateMutability: "view";
    readonly type: "function";
}, {
    readonly inputs: readonly [];
    readonly name: "factoryStable";
    readonly outputs: readonly [{
        readonly internalType: "address";
        readonly name: "";
        readonly type: "address";
    }];
    readonly stateMutability: "view";
    readonly type: "function";
}, {
    readonly inputs: readonly [];
    readonly name: "factoryV2";
    readonly outputs: readonly [{
        readonly internalType: "address";
        readonly name: "";
        readonly type: "address";
    }];
    readonly stateMutability: "view";
    readonly type: "function";
}, {
    readonly inputs: readonly [];
    readonly name: "factoryV3";
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
    readonly stateMutability: "view";
    readonly type: "function";
}, {
    readonly inputs: readonly [{
        readonly components: readonly [{
            readonly internalType: "address";
            readonly name: "tokenIn";
            readonly type: "address";
        }, {
            readonly internalType: "address";
            readonly name: "tokenOut";
            readonly type: "address";
        }, {
            readonly internalType: "uint256";
            readonly name: "amountIn";
            readonly type: "uint256";
        }, {
            readonly internalType: "uint256";
            readonly name: "flag";
            readonly type: "uint256";
        }];
        readonly internalType: "struct IMixedQuoter.QuoteExactInputSingleStableParams";
        readonly name: "params";
        readonly type: "tuple";
    }];
    readonly name: "quoteExactInputSingleStable";
    readonly outputs: readonly [{
        readonly internalType: "uint256";
        readonly name: "amountOut";
        readonly type: "uint256";
    }, {
        readonly internalType: "uint256";
        readonly name: "gasEstimate";
        readonly type: "uint256";
    }];
    readonly stateMutability: "view";
    readonly type: "function";
}, {
    readonly inputs: readonly [{
        readonly components: readonly [{
            readonly internalType: "address";
            readonly name: "tokenIn";
            readonly type: "address";
        }, {
            readonly internalType: "address";
            readonly name: "tokenOut";
            readonly type: "address";
        }, {
            readonly internalType: "uint256";
            readonly name: "amountIn";
            readonly type: "uint256";
        }];
        readonly internalType: "struct IMixedQuoter.QuoteExactInputSingleV2Params";
        readonly name: "params";
        readonly type: "tuple";
    }];
    readonly name: "quoteExactInputSingleV2";
    readonly outputs: readonly [{
        readonly internalType: "uint256";
        readonly name: "amountOut";
        readonly type: "uint256";
    }, {
        readonly internalType: "uint256";
        readonly name: "gasEstimate";
        readonly type: "uint256";
    }];
    readonly stateMutability: "view";
    readonly type: "function";
}, {
    readonly inputs: readonly [{
        readonly components: readonly [{
            readonly internalType: "address";
            readonly name: "tokenIn";
            readonly type: "address";
        }, {
            readonly internalType: "address";
            readonly name: "tokenOut";
            readonly type: "address";
        }, {
            readonly internalType: "uint256";
            readonly name: "amountIn";
            readonly type: "uint256";
        }, {
            readonly internalType: "uint24";
            readonly name: "fee";
            readonly type: "uint24";
        }, {
            readonly internalType: "uint160";
            readonly name: "sqrtPriceLimitX96";
            readonly type: "uint160";
        }];
        readonly internalType: "struct IMixedQuoter.QuoteExactInputSingleV3Params";
        readonly name: "params";
        readonly type: "tuple";
    }];
    readonly name: "quoteExactInputSingleV3";
    readonly outputs: readonly [{
        readonly internalType: "uint256";
        readonly name: "amountOut";
        readonly type: "uint256";
    }, {
        readonly internalType: "uint160";
        readonly name: "sqrtPriceX96After";
        readonly type: "uint160";
    }, {
        readonly internalType: "uint32";
        readonly name: "initializedTicksCrossed";
        readonly type: "uint32";
    }, {
        readonly internalType: "uint256";
        readonly name: "gasEstimate";
        readonly type: "uint256";
    }];
    readonly stateMutability: "nonpayable";
    readonly type: "function";
}, {
    readonly inputs: readonly [{
        readonly internalType: "address[]";
        readonly name: "paths";
        readonly type: "address[]";
    }, {
        readonly internalType: "bytes";
        readonly name: "actions";
        readonly type: "bytes";
    }, {
        readonly internalType: "bytes[]";
        readonly name: "params";
        readonly type: "bytes[]";
    }, {
        readonly internalType: "uint256";
        readonly name: "amountIn";
        readonly type: "uint256";
    }];
    readonly name: "quoteMixedExactInput";
    readonly outputs: readonly [{
        readonly internalType: "uint256";
        readonly name: "amountOut";
        readonly type: "uint256";
    }, {
        readonly internalType: "uint256";
        readonly name: "gasEstimate";
        readonly type: "uint256";
    }];
    readonly stateMutability: "nonpayable";
    readonly type: "function";
}];
//# sourceMappingURL=IV4MixedRouteQuoter.d.ts.map