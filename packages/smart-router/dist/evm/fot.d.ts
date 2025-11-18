import { Address, PublicClient } from 'viem';
export declare const feeOnTransferDetectorAddresses: {
    readonly 1: "0xe9200516a475b9e6FD4D1c452858097F345A6760";
    readonly 11155111: "0xD8b14F915b1b4b1c4EE4bF8321Bea018E72E5cf3";
    readonly 56: "0x003BD52f589F23346E03fA431209C29cD599d693";
    readonly 97: "0xE83BD854c1fBf54424b4d914163BF855aB1131Aa";
    readonly 42161: "0xD8b14F915b1b4b1c4EE4bF8321Bea018E72E5cf3";
    readonly 421614: "0xD8b14F915b1b4b1c4EE4bF8321Bea018E72E5cf3";
    readonly 1101: "0xe9200516a475b9e6FD4D1c452858097F345A6760";
    readonly 1442: "0xbc60A0d9536B6F75b1FfE18b47364ED684EA0260";
    readonly 8453: "0xD8b14F915b1b4b1c4EE4bF8321Bea018E72E5cf3";
    readonly 84532: "0xD8b14F915b1b4b1c4EE4bF8321Bea018E72E5cf3";
    readonly 324: "0xED87D01674199355CEfC05648d17E037306d7962";
    readonly 280: "0x869505373d830104130F95c1E7d578dE7E58C0a8";
    readonly 59144: "0xD8b14F915b1b4b1c4EE4bF8321Bea018E72E5cf3";
    readonly 59140: "0x3412378f17B1b44E8bcFD157EcE1a4f59DA5A77a";
};
export declare function fetchTokenFeeOnTransfer<TPublicClient extends PublicClient>(publicClient: TPublicClient, tokenAddress: Address): Promise<import("viem").SimulateContractReturnType<readonly [{
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
}], "validate", readonly [`0x${string}`, `0x${string}`, bigint], import("viem").Chain | undefined, (TPublicClient extends {
    wallet: import("viem").Client;
} ? TPublicClient["wallet"] : TPublicClient) extends infer T ? T extends (TPublicClient extends {
    wallet: import("viem").Client;
} ? TPublicClient["wallet"] : TPublicClient) ? T extends import("viem").Client ? T["account"] : undefined : never : never, undefined, undefined>>;
export declare function fetchTokenFeeOnTransferBatch<TPublicClient extends PublicClient>(publicClient: TPublicClient, tokens: {
    address: Address;
}[]): Promise<({
    error?: undefined;
    result: {
        buyFeeBps: bigint;
        sellFeeBps: bigint;
    };
    status: "success";
} | {
    error: Error;
    result?: undefined;
    status: "failure";
})[]>;
//# sourceMappingURL=fot.d.ts.map