export declare const gaugesVotingABI: readonly [{
    readonly inputs: readonly [{
        readonly internalType: "address";
        readonly name: "_votingEscrow";
        readonly type: "address";
    }];
    readonly stateMutability: "nonpayable";
    readonly type: "constructor";
}, {
    readonly anonymous: false;
    readonly inputs: readonly [{
        readonly indexed: false;
        readonly internalType: "string";
        readonly name: "name";
        readonly type: "string";
    }, {
        readonly indexed: false;
        readonly internalType: "uint256";
        readonly name: "type_id";
        readonly type: "uint256";
    }];
    readonly name: "AddType";
    readonly type: "event";
}, {
    readonly anonymous: false;
    readonly inputs: readonly [{
        readonly indexed: true;
        readonly internalType: "address";
        readonly name: "sender";
        readonly type: "address";
    }, {
        readonly indexed: false;
        readonly internalType: "uint256";
        readonly name: "allocation";
        readonly type: "uint256";
    }];
    readonly name: "AdminAllocationChanged";
    readonly type: "event";
}, {
    readonly anonymous: false;
    readonly inputs: readonly [{
        readonly indexed: true;
        readonly internalType: "address";
        readonly name: "sender";
        readonly type: "address";
    }, {
        readonly indexed: false;
        readonly internalType: "uint256";
        readonly name: "period";
        readonly type: "uint256";
    }];
    readonly name: "AdminOnlyPeriodUpdated";
    readonly type: "event";
}, {
    readonly anonymous: false;
    readonly inputs: readonly [{
        readonly indexed: true;
        readonly internalType: "address";
        readonly name: "sender";
        readonly type: "address";
    }, {
        readonly indexed: true;
        readonly internalType: "address";
        readonly name: "gauage_addr";
        readonly type: "address";
    }, {
        readonly indexed: false;
        readonly internalType: "uint256";
        readonly name: "chainId";
        readonly type: "uint256";
    }, {
        readonly indexed: false;
        readonly internalType: "bytes32";
        readonly name: "hash";
        readonly type: "bytes32";
    }];
    readonly name: "GaugeKilled";
    readonly type: "event";
}, {
    readonly anonymous: false;
    readonly inputs: readonly [{
        readonly indexed: true;
        readonly internalType: "address";
        readonly name: "sender";
        readonly type: "address";
    }, {
        readonly indexed: true;
        readonly internalType: "address";
        readonly name: "gauage_addr";
        readonly type: "address";
    }, {
        readonly indexed: false;
        readonly internalType: "uint256";
        readonly name: "chainId";
        readonly type: "uint256";
    }, {
        readonly indexed: false;
        readonly internalType: "bytes32";
        readonly name: "hash";
        readonly type: "bytes32";
    }];
    readonly name: "GaugeUnKilled";
    readonly type: "event";
}, {
    readonly anonymous: false;
    readonly inputs: readonly [{
        readonly indexed: false;
        readonly internalType: "bytes32";
        readonly name: "hash";
        readonly type: "bytes32";
    }, {
        readonly indexed: false;
        readonly internalType: "uint256";
        readonly name: "gauge_type";
        readonly type: "uint256";
    }, {
        readonly indexed: false;
        readonly internalType: "uint256";
        readonly name: "weight";
        readonly type: "uint256";
    }, {
        readonly indexed: false;
        readonly internalType: "uint256";
        readonly name: "pid";
        readonly type: "uint256";
    }, {
        readonly indexed: false;
        readonly internalType: "address";
        readonly name: "masterChef";
        readonly type: "address";
    }, {
        readonly indexed: false;
        readonly internalType: "uint256";
        readonly name: "chainId";
        readonly type: "uint256";
    }, {
        readonly indexed: false;
        readonly internalType: "uint256";
        readonly name: "boostMultiplier";
        readonly type: "uint256";
    }, {
        readonly indexed: false;
        readonly internalType: "uint256";
        readonly name: "maxVoteCap";
        readonly type: "uint256";
    }];
    readonly name: "NewGauge";
    readonly type: "event";
}, {
    readonly anonymous: false;
    readonly inputs: readonly [{
        readonly indexed: false;
        readonly internalType: "bytes32";
        readonly name: "hash";
        readonly type: "bytes32";
    }, {
        readonly indexed: false;
        readonly internalType: "uint256";
        readonly name: "time";
        readonly type: "uint256";
    }, {
        readonly indexed: false;
        readonly internalType: "uint256";
        readonly name: "weight";
        readonly type: "uint256";
    }, {
        readonly indexed: false;
        readonly internalType: "uint256";
        readonly name: "total_weight";
        readonly type: "uint256";
    }];
    readonly name: "NewGaugeWeight";
    readonly type: "event";
}, {
    readonly anonymous: false;
    readonly inputs: readonly [{
        readonly indexed: false;
        readonly internalType: "uint256";
        readonly name: "type_id";
        readonly type: "uint256";
    }, {
        readonly indexed: false;
        readonly internalType: "uint256";
        readonly name: "time";
        readonly type: "uint256";
    }, {
        readonly indexed: false;
        readonly internalType: "uint256";
        readonly name: "weight";
        readonly type: "uint256";
    }, {
        readonly indexed: false;
        readonly internalType: "uint256";
        readonly name: "total_weight";
        readonly type: "uint256";
    }];
    readonly name: "NewTypeWeight";
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
        readonly internalType: "address";
        readonly name: "account";
        readonly type: "address";
    }];
    readonly name: "Unpaused";
    readonly type: "event";
}, {
    readonly anonymous: false;
    readonly inputs: readonly [{
        readonly indexed: false;
        readonly internalType: "bytes32";
        readonly name: "hash";
        readonly type: "bytes32";
    }, {
        readonly indexed: false;
        readonly internalType: "uint256";
        readonly name: "pid";
        readonly type: "uint256";
    }, {
        readonly indexed: false;
        readonly internalType: "address";
        readonly name: "masterChef";
        readonly type: "address";
    }, {
        readonly indexed: false;
        readonly internalType: "uint256";
        readonly name: "chainId";
        readonly type: "uint256";
    }, {
        readonly indexed: false;
        readonly internalType: "uint256";
        readonly name: "boostMultiplier";
        readonly type: "uint256";
    }, {
        readonly indexed: false;
        readonly internalType: "uint256";
        readonly name: "maxVoteCap";
        readonly type: "uint256";
    }];
    readonly name: "UpdateGaugeInfo";
    readonly type: "event";
}, {
    readonly anonymous: false;
    readonly inputs: readonly [{
        readonly indexed: false;
        readonly internalType: "uint256";
        readonly name: "time";
        readonly type: "uint256";
    }, {
        readonly indexed: false;
        readonly internalType: "address";
        readonly name: "user";
        readonly type: "address";
    }, {
        readonly indexed: false;
        readonly internalType: "bytes32";
        readonly name: "hash";
        readonly type: "bytes32";
    }, {
        readonly indexed: false;
        readonly internalType: "uint256";
        readonly name: "weight";
        readonly type: "uint256";
    }];
    readonly name: "VoteForGauge";
    readonly type: "event";
}, {
    readonly anonymous: false;
    readonly inputs: readonly [{
        readonly indexed: false;
        readonly internalType: "uint256";
        readonly name: "time";
        readonly type: "uint256";
    }, {
        readonly indexed: false;
        readonly internalType: "address";
        readonly name: "user";
        readonly type: "address";
    }, {
        readonly indexed: false;
        readonly internalType: "bytes32";
        readonly name: "hash";
        readonly type: "bytes32";
    }, {
        readonly indexed: false;
        readonly internalType: "uint256";
        readonly name: "weight";
        readonly type: "uint256";
    }];
    readonly name: "VoteForGaugeFromAdmin";
    readonly type: "event";
}, {
    readonly anonymous: false;
    readonly inputs: readonly [{
        readonly indexed: true;
        readonly internalType: "address";
        readonly name: "sender";
        readonly type: "address";
    }, {
        readonly indexed: false;
        readonly internalType: "uint256";
        readonly name: "delay";
        readonly type: "uint256";
    }];
    readonly name: "WeightVoteDelayChanged";
    readonly type: "event";
}, {
    readonly inputs: readonly [];
    readonly name: "ADMIN_VOTE_PERIOD";
    readonly outputs: readonly [{
        readonly internalType: "uint256";
        readonly name: "";
        readonly type: "uint256";
    }];
    readonly stateMutability: "view";
    readonly type: "function";
}, {
    readonly inputs: readonly [];
    readonly name: "WEIGHT_VOTE_DELAY";
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
        readonly name: "gauge_addr";
        readonly type: "address";
    }, {
        readonly internalType: "uint256";
        readonly name: "gauge_type";
        readonly type: "uint256";
    }, {
        readonly internalType: "uint256";
        readonly name: "_weight";
        readonly type: "uint256";
    }, {
        readonly internalType: "uint256";
        readonly name: "_pid";
        readonly type: "uint256";
    }, {
        readonly internalType: "address";
        readonly name: "_masterChef";
        readonly type: "address";
    }, {
        readonly internalType: "uint256";
        readonly name: "_chainId";
        readonly type: "uint256";
    }, {
        readonly internalType: "uint256";
        readonly name: "_boostMultiplier";
        readonly type: "uint256";
    }, {
        readonly internalType: "uint256";
        readonly name: "_maxVoteCap";
        readonly type: "uint256";
    }];
    readonly name: "addGauge";
    readonly outputs: readonly [];
    readonly stateMutability: "nonpayable";
    readonly type: "function";
}, {
    readonly inputs: readonly [{
        readonly internalType: "string";
        readonly name: "_name";
        readonly type: "string";
    }, {
        readonly internalType: "uint256";
        readonly name: "_weight";
        readonly type: "uint256";
    }];
    readonly name: "addType";
    readonly outputs: readonly [];
    readonly stateMutability: "nonpayable";
    readonly type: "function";
}, {
    readonly inputs: readonly [];
    readonly name: "adminAllocation";
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
        readonly name: "";
        readonly type: "uint256";
    }];
    readonly name: "adminSlopes";
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
        readonly name: "_numerator";
        readonly type: "uint256";
    }];
    readonly name: "changeAdminAllocation";
    readonly outputs: readonly [];
    readonly stateMutability: "nonpayable";
    readonly type: "function";
}, {
    readonly inputs: readonly [{
        readonly internalType: "address";
        readonly name: "gauge_addr";
        readonly type: "address";
    }, {
        readonly internalType: "uint256";
        readonly name: "weight";
        readonly type: "uint256";
    }, {
        readonly internalType: "uint256";
        readonly name: "_chainId";
        readonly type: "uint256";
    }];
    readonly name: "changeGaugeWeight";
    readonly outputs: readonly [];
    readonly stateMutability: "nonpayable";
    readonly type: "function";
}, {
    readonly inputs: readonly [{
        readonly internalType: "uint256";
        readonly name: "type_id";
        readonly type: "uint256";
    }, {
        readonly internalType: "uint256";
        readonly name: "weight";
        readonly type: "uint256";
    }];
    readonly name: "changeTypeWeight";
    readonly outputs: readonly [];
    readonly stateMutability: "nonpayable";
    readonly type: "function";
}, {
    readonly inputs: readonly [{
        readonly internalType: "uint256";
        readonly name: "_delay";
        readonly type: "uint256";
    }];
    readonly name: "changeWeightVoteDelay";
    readonly outputs: readonly [];
    readonly stateMutability: "nonpayable";
    readonly type: "function";
}, {
    readonly inputs: readonly [];
    readonly name: "checkpoint";
    readonly outputs: readonly [];
    readonly stateMutability: "nonpayable";
    readonly type: "function";
}, {
    readonly inputs: readonly [{
        readonly internalType: "address";
        readonly name: "gauge_addr";
        readonly type: "address";
    }, {
        readonly internalType: "uint256";
        readonly name: "_chainId";
        readonly type: "uint256";
    }];
    readonly name: "checkpointGauge";
    readonly outputs: readonly [];
    readonly stateMutability: "nonpayable";
    readonly type: "function";
}, {
    readonly inputs: readonly [{
        readonly internalType: "bytes32";
        readonly name: "";
        readonly type: "bytes32";
    }, {
        readonly internalType: "uint256";
        readonly name: "";
        readonly type: "uint256";
    }];
    readonly name: "gaugeChangesWeight";
    readonly outputs: readonly [{
        readonly internalType: "uint256";
        readonly name: "";
        readonly type: "uint256";
    }];
    readonly stateMutability: "view";
    readonly type: "function";
}, {
    readonly inputs: readonly [];
    readonly name: "gaugeCount";
    readonly outputs: readonly [{
        readonly internalType: "uint256";
        readonly name: "";
        readonly type: "uint256";
    }];
    readonly stateMutability: "view";
    readonly type: "function";
}, {
    readonly inputs: readonly [{
        readonly internalType: "bytes32";
        readonly name: "";
        readonly type: "bytes32";
    }];
    readonly name: "gaugeIndex_";
    readonly outputs: readonly [{
        readonly internalType: "uint256";
        readonly name: "";
        readonly type: "uint256";
    }];
    readonly stateMutability: "view";
    readonly type: "function";
}, {
    readonly inputs: readonly [{
        readonly internalType: "bytes32";
        readonly name: "";
        readonly type: "bytes32";
    }];
    readonly name: "gaugeIsKilled_";
    readonly outputs: readonly [{
        readonly internalType: "bool";
        readonly name: "";
        readonly type: "bool";
    }];
    readonly stateMutability: "view";
    readonly type: "function";
}, {
    readonly inputs: readonly [{
        readonly internalType: "bytes32";
        readonly name: "";
        readonly type: "bytes32";
    }];
    readonly name: "gaugeLastScheduled";
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
        readonly name: "";
        readonly type: "uint256";
    }];
    readonly name: "gaugePointsTotal";
    readonly outputs: readonly [{
        readonly internalType: "uint256";
        readonly name: "";
        readonly type: "uint256";
    }];
    readonly stateMutability: "view";
    readonly type: "function";
}, {
    readonly inputs: readonly [{
        readonly internalType: "bytes32";
        readonly name: "";
        readonly type: "bytes32";
    }, {
        readonly internalType: "uint256";
        readonly name: "";
        readonly type: "uint256";
    }];
    readonly name: "gaugePointsWeight";
    readonly outputs: readonly [{
        readonly internalType: "uint256";
        readonly name: "bias";
        readonly type: "uint256";
    }, {
        readonly internalType: "uint256";
        readonly name: "slope";
        readonly type: "uint256";
    }];
    readonly stateMutability: "view";
    readonly type: "function";
}, {
    readonly inputs: readonly [{
        readonly internalType: "address";
        readonly name: "gauge_addr";
        readonly type: "address";
    }, {
        readonly internalType: "uint256";
        readonly name: "time";
        readonly type: "uint256";
    }, {
        readonly internalType: "uint256";
        readonly name: "_chainId";
        readonly type: "uint256";
    }];
    readonly name: "gaugeRelativeWeight";
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
        readonly name: "gauge_addr";
        readonly type: "address";
    }, {
        readonly internalType: "uint256";
        readonly name: "time";
        readonly type: "uint256";
    }, {
        readonly internalType: "uint256";
        readonly name: "_chainId";
        readonly type: "uint256";
    }];
    readonly name: "gaugeRelativeWeight_write";
    readonly outputs: readonly [{
        readonly internalType: "uint256";
        readonly name: "";
        readonly type: "uint256";
    }];
    readonly stateMutability: "nonpayable";
    readonly type: "function";
}, {
    readonly inputs: readonly [{
        readonly internalType: "uint256";
        readonly name: "";
        readonly type: "uint256";
    }, {
        readonly internalType: "uint256";
        readonly name: "";
        readonly type: "uint256";
    }];
    readonly name: "gaugeTypeChangesSum";
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
        readonly name: "";
        readonly type: "uint256";
    }];
    readonly name: "gaugeTypeLastScheduled";
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
        readonly name: "";
        readonly type: "uint256";
    }];
    readonly name: "gaugeTypeNames";
    readonly outputs: readonly [{
        readonly internalType: "string";
        readonly name: "";
        readonly type: "string";
    }];
    readonly stateMutability: "view";
    readonly type: "function";
}, {
    readonly inputs: readonly [{
        readonly internalType: "uint256";
        readonly name: "";
        readonly type: "uint256";
    }, {
        readonly internalType: "uint256";
        readonly name: "";
        readonly type: "uint256";
    }];
    readonly name: "gaugeTypePointsSum";
    readonly outputs: readonly [{
        readonly internalType: "uint256";
        readonly name: "bias";
        readonly type: "uint256";
    }, {
        readonly internalType: "uint256";
        readonly name: "slope";
        readonly type: "uint256";
    }];
    readonly stateMutability: "view";
    readonly type: "function";
}, {
    readonly inputs: readonly [{
        readonly internalType: "uint256";
        readonly name: "";
        readonly type: "uint256";
    }, {
        readonly internalType: "uint256";
        readonly name: "";
        readonly type: "uint256";
    }];
    readonly name: "gaugeTypePointsWeight";
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
        readonly name: "";
        readonly type: "uint256";
    }];
    readonly name: "gaugeTypeSumLastScheduled";
    readonly outputs: readonly [{
        readonly internalType: "uint256";
        readonly name: "";
        readonly type: "uint256";
    }];
    readonly stateMutability: "view";
    readonly type: "function";
}, {
    readonly inputs: readonly [];
    readonly name: "gaugeTypes";
    readonly outputs: readonly [{
        readonly internalType: "uint256";
        readonly name: "";
        readonly type: "uint256";
    }];
    readonly stateMutability: "view";
    readonly type: "function";
}, {
    readonly inputs: readonly [{
        readonly internalType: "bytes32";
        readonly name: "";
        readonly type: "bytes32";
    }];
    readonly name: "gaugeTypes_";
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
        readonly name: "";
        readonly type: "uint256";
    }];
    readonly name: "gauges";
    readonly outputs: readonly [{
        readonly internalType: "uint256";
        readonly name: "pid";
        readonly type: "uint256";
    }, {
        readonly internalType: "address";
        readonly name: "masterChef";
        readonly type: "address";
    }, {
        readonly internalType: "uint256";
        readonly name: "chainId";
        readonly type: "uint256";
    }, {
        readonly internalType: "address";
        readonly name: "pairAddress";
        readonly type: "address";
    }, {
        readonly internalType: "uint256";
        readonly name: "boostMultiplier";
        readonly type: "uint256";
    }, {
        readonly internalType: "uint256";
        readonly name: "maxVoteCap";
        readonly type: "uint256";
    }];
    readonly stateMutability: "view";
    readonly type: "function";
}, {
    readonly inputs: readonly [{
        readonly internalType: "address";
        readonly name: "gauge_addr";
        readonly type: "address";
    }, {
        readonly internalType: "uint256";
        readonly name: "_chainId";
        readonly type: "uint256";
    }, {
        readonly internalType: "bool";
        readonly name: "inCap";
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
        readonly internalType: "bool";
        readonly name: "inCap";
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
        readonly internalType: "uint256";
        readonly name: "_typeId";
        readonly type: "uint256";
    }, {
        readonly internalType: "uint256";
        readonly name: "_chainId";
        readonly type: "uint256";
    }];
    readonly name: "getTypeAndChainIdWeightCapped";
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
        readonly name: "_typeId";
        readonly type: "uint256";
    }];
    readonly name: "getWeightsSumPerType";
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
        readonly name: "_gauge_addr";
        readonly type: "address";
    }, {
        readonly internalType: "uint256";
        readonly name: "_chainId";
        readonly type: "uint256";
    }];
    readonly name: "killGauge";
    readonly outputs: readonly [];
    readonly stateMutability: "nonpayable";
    readonly type: "function";
}, {
    readonly inputs: readonly [{
        readonly internalType: "address";
        readonly name: "";
        readonly type: "address";
    }, {
        readonly internalType: "bytes32";
        readonly name: "";
        readonly type: "bytes32";
    }];
    readonly name: "lastUserVote";
    readonly outputs: readonly [{
        readonly internalType: "uint256";
        readonly name: "";
        readonly type: "uint256";
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
    readonly inputs: readonly [];
    readonly name: "totalLastScheduled";
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
        readonly name: "newOwner";
        readonly type: "address";
    }];
    readonly name: "transferOwnership";
    readonly outputs: readonly [];
    readonly stateMutability: "nonpayable";
    readonly type: "function";
}, {
    readonly inputs: readonly [{
        readonly internalType: "address";
        readonly name: "_gauge_addr";
        readonly type: "address";
    }, {
        readonly internalType: "uint256";
        readonly name: "_chainId";
        readonly type: "uint256";
    }];
    readonly name: "unkillGauge";
    readonly outputs: readonly [];
    readonly stateMutability: "nonpayable";
    readonly type: "function";
}, {
    readonly inputs: readonly [{
        readonly internalType: "uint256";
        readonly name: "_newAdminOnlyPeriod";
        readonly type: "uint256";
    }];
    readonly name: "updateAdminOnlyPeriod";
    readonly outputs: readonly [];
    readonly stateMutability: "nonpayable";
    readonly type: "function";
}, {
    readonly inputs: readonly [{
        readonly internalType: "address";
        readonly name: "gauge_addr";
        readonly type: "address";
    }, {
        readonly internalType: "uint256";
        readonly name: "_pid";
        readonly type: "uint256";
    }, {
        readonly internalType: "address";
        readonly name: "_masterChef";
        readonly type: "address";
    }, {
        readonly internalType: "uint256";
        readonly name: "_chainId";
        readonly type: "uint256";
    }, {
        readonly internalType: "uint256";
        readonly name: "_boostMultiplier";
        readonly type: "uint256";
    }, {
        readonly internalType: "uint256";
        readonly name: "_maxVoteCap";
        readonly type: "uint256";
    }];
    readonly name: "updateGaugeInfo";
    readonly outputs: readonly [];
    readonly stateMutability: "nonpayable";
    readonly type: "function";
}, {
    readonly inputs: readonly [{
        readonly internalType: "address";
        readonly name: "_gauge_addr";
        readonly type: "address";
    }, {
        readonly internalType: "uint256";
        readonly name: "_user_weight";
        readonly type: "uint256";
    }, {
        readonly internalType: "uint256";
        readonly name: "_chainId";
        readonly type: "uint256";
    }, {
        readonly internalType: "bool";
        readonly name: "_skipNative";
        readonly type: "bool";
    }, {
        readonly internalType: "bool";
        readonly name: "_skipProxy";
        readonly type: "bool";
    }];
    readonly name: "voteForGaugeWeights";
    readonly outputs: readonly [];
    readonly stateMutability: "nonpayable";
    readonly type: "function";
}, {
    readonly inputs: readonly [{
        readonly internalType: "address[]";
        readonly name: "_gauge_addrs";
        readonly type: "address[]";
    }, {
        readonly internalType: "uint256[]";
        readonly name: "_user_weights";
        readonly type: "uint256[]";
    }, {
        readonly internalType: "uint256[]";
        readonly name: "_chainIds";
        readonly type: "uint256[]";
    }, {
        readonly internalType: "bool";
        readonly name: "_skipNative";
        readonly type: "bool";
    }, {
        readonly internalType: "bool";
        readonly name: "_skipProxy";
        readonly type: "bool";
    }];
    readonly name: "voteForGaugeWeightsBulk";
    readonly outputs: readonly [];
    readonly stateMutability: "nonpayable";
    readonly type: "function";
}, {
    readonly inputs: readonly [{
        readonly internalType: "address";
        readonly name: "_gauge_addr";
        readonly type: "address";
    }, {
        readonly internalType: "uint256";
        readonly name: "_admin_weight";
        readonly type: "uint256";
    }, {
        readonly internalType: "uint256";
        readonly name: "_end";
        readonly type: "uint256";
    }, {
        readonly internalType: "uint256";
        readonly name: "_chainId";
        readonly type: "uint256";
    }];
    readonly name: "voteFromAdmin";
    readonly outputs: readonly [];
    readonly stateMutability: "nonpayable";
    readonly type: "function";
}, {
    readonly inputs: readonly [{
        readonly internalType: "address[]";
        readonly name: "_gauge_addrs";
        readonly type: "address[]";
    }, {
        readonly internalType: "uint256[]";
        readonly name: "_admin_weights";
        readonly type: "uint256[]";
    }, {
        readonly internalType: "uint256[]";
        readonly name: "_ends";
        readonly type: "uint256[]";
    }, {
        readonly internalType: "uint256[]";
        readonly name: "_chainIds";
        readonly type: "uint256[]";
    }];
    readonly name: "voteFromAdminBulk";
    readonly outputs: readonly [];
    readonly stateMutability: "nonpayable";
    readonly type: "function";
}, {
    readonly inputs: readonly [{
        readonly internalType: "address";
        readonly name: "";
        readonly type: "address";
    }];
    readonly name: "voteUserPower";
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
        readonly name: "";
        readonly type: "address";
    }, {
        readonly internalType: "bytes32";
        readonly name: "";
        readonly type: "bytes32";
    }];
    readonly name: "voteUserSlopes";
    readonly outputs: readonly [{
        readonly internalType: "uint256";
        readonly name: "slope";
        readonly type: "uint256";
    }, {
        readonly internalType: "uint256";
        readonly name: "power";
        readonly type: "uint256";
    }, {
        readonly internalType: "uint256";
        readonly name: "end";
        readonly type: "uint256";
    }];
    readonly stateMutability: "view";
    readonly type: "function";
}, {
    readonly inputs: readonly [];
    readonly name: "votingEscrow";
    readonly outputs: readonly [{
        readonly internalType: "address";
        readonly name: "";
        readonly type: "address";
    }];
    readonly stateMutability: "view";
    readonly type: "function";
}];
//# sourceMappingURL=gaugesVoting.d.ts.map