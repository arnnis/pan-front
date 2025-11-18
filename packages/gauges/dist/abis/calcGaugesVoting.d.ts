export declare const calcGaugesVotingABI: readonly [{
    readonly inputs: readonly [];
    readonly name: "gaugeVotingAddress";
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
        readonly name: "_gaugeAddr";
        readonly type: "address";
    }, {
        readonly internalType: "uint256";
        readonly name: "_chainId";
        readonly type: "uint256";
    }, {
        readonly internalType: "bool";
        readonly name: "_inCap";
        readonly type: "bool";
    }];
    readonly name: "getGaugeRelativeWeight";
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
        readonly name: "_gaugeId";
        readonly type: "uint256";
    }, {
        readonly internalType: "bool";
        readonly name: "_inCap";
        readonly type: "bool";
    }];
    readonly name: "getGaugeRelativeWeightById";
    readonly outputs: readonly [{
        readonly internalType: "uint256";
        readonly name: "";
        readonly type: "uint256";
    }];
    readonly stateMutability: "view";
    readonly type: "function";
}, {
    readonly inputs: readonly [{
        readonly internalType: "address";
        readonly name: "_gaugeAddr";
        readonly type: "address";
    }, {
        readonly internalType: "uint256";
        readonly name: "_chainId";
        readonly type: "uint256";
    }, {
        readonly internalType: "bool";
        readonly name: "_inCap";
        readonly type: "bool";
    }];
    readonly name: "getGaugeWeight";
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
        readonly name: "_gaugeId";
        readonly type: "uint256";
    }];
    readonly name: "getGaugeWeightDetails";
    readonly outputs: readonly [{
        readonly internalType: "uint256";
        readonly name: "gaugeWeight";
        readonly type: "uint256";
    }, {
        readonly internalType: "uint256";
        readonly name: "gaugeTotalWeight";
        readonly type: "uint256";
    }, {
        readonly internalType: "uint256";
        readonly name: "gaugeRawPercent";
        readonly type: "uint256";
    }, {
        readonly internalType: "uint256";
        readonly name: "gaugeCappedPercent";
        readonly type: "uint256";
    }, {
        readonly internalType: "uint256";
        readonly name: "gaugeInCapWeight";
        readonly type: "uint256";
    }, {
        readonly internalType: "uint256";
        readonly name: "gaugeTotalFinalWeights";
        readonly type: "uint256";
    }, {
        readonly internalType: "uint256";
        readonly name: "gaugeFinalPercent";
        readonly type: "uint256";
    }];
    readonly stateMutability: "view";
    readonly type: "function";
}, {
    readonly inputs: readonly [{
        readonly internalType: "address";
        readonly name: "_gaugeAddr";
        readonly type: "address";
    }, {
        readonly internalType: "uint256";
        readonly name: "_chainId";
        readonly type: "uint256";
    }, {
        readonly internalType: "bool";
        readonly name: "_inCap";
        readonly type: "bool";
    }, {
        readonly internalType: "uint256";
        readonly name: "_gaugeTotalWeight";
        readonly type: "uint256";
    }, {
        readonly internalType: "uint256";
        readonly name: "_gaugeTotalCappedPercent";
        readonly type: "uint256";
    }, {
        readonly internalType: "uint256";
        readonly name: "_gaugeTotalFinalWeights";
        readonly type: "uint256";
    }];
    readonly name: "getGaugeWeightMass";
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
        readonly name: "_gaugeId";
        readonly type: "uint256";
    }, {
        readonly internalType: "bool";
        readonly name: "_inCap";
        readonly type: "bool";
    }];
    readonly name: "getGaugeWeightbyId";
    readonly outputs: readonly [{
        readonly internalType: "uint256";
        readonly name: "";
        readonly type: "uint256";
    }];
    readonly stateMutability: "view";
    readonly type: "function";
}, {
    readonly inputs: readonly [];
    readonly name: "getRawTotalGaugeWeight";
    readonly outputs: readonly [{
        readonly internalType: "uint256";
        readonly name: "gaugeTotalWeight";
        readonly type: "uint256";
    }];
    readonly stateMutability: "view";
    readonly type: "function";
}, {
    readonly inputs: readonly [];
    readonly name: "getTotalCappedPercent";
    readonly outputs: readonly [{
        readonly internalType: "uint256";
        readonly name: "gaugeTotalCappedPercent";
        readonly type: "uint256";
    }];
    readonly stateMutability: "view";
    readonly type: "function";
}, {
    readonly inputs: readonly [];
    readonly name: "getTotalFinalWeights";
    readonly outputs: readonly [{
        readonly internalType: "uint256";
        readonly name: "gaugeTotalFinalWeights";
        readonly type: "uint256";
    }];
    readonly stateMutability: "view";
    readonly type: "function";
}, {
    readonly inputs: readonly [{
        readonly internalType: "bool";
        readonly name: "_inCap";
        readonly type: "bool";
    }];
    readonly name: "getTotalWeight";
    readonly outputs: readonly [{
        readonly internalType: "uint256";
        readonly name: "";
        readonly type: "uint256";
    }];
    readonly stateMutability: "view";
    readonly type: "function";
}, {
    readonly inputs: readonly [{
        readonly internalType: "bool";
        readonly name: "_inCap";
        readonly type: "bool";
    }];
    readonly name: "massGetGaugeWeight";
    readonly outputs: readonly [{
        readonly internalType: "uint256[]";
        readonly name: "result";
        readonly type: "uint256[]";
    }];
    readonly stateMutability: "view";
    readonly type: "function";
}];
//# sourceMappingURL=calcGaugesVoting.d.ts.map