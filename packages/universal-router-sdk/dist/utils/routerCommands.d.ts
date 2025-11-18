import { AbiParametersToPrimitiveTypes } from 'abitype';
import { Hex } from 'viem';
export type ABIType = typeof ABI_PARAMETER;
export type ABIParametersType<TCommandType extends CommandUsed> = AbiParametersToPrimitiveTypes<ABIType[TCommandType]>;
/**
 * CommandTypes
 * @description Flags that modify a command's execution
 * @enum {number}
 */
export declare enum CommandType {
    ALLOW_REVERT_FLAG = 128,
    COMMAND_TYPE_MASK = 63,
    V3_SWAP_EXACT_IN = 0,
    V3_SWAP_EXACT_OUT = 1,
    PERMIT2_TRANSFER_FROM = 2,
    PERMIT2_PERMIT_BATCH = 3,
    SWEEP = 4,
    TRANSFER = 5,
    PAY_PORTION = 6,
    V2_SWAP_EXACT_IN = 8,
    V2_SWAP_EXACT_OUT = 9,
    PERMIT2_PERMIT = 10,
    WRAP_ETH = 11,
    UNWRAP_WETH = 12,
    PERMIT2_TRANSFER_FROM_BATCH = 13,
    BALANCE_CHECK_ERC20 = 14,
    EXECUTE_SUB_PLAN = 32,
    STABLE_SWAP_EXACT_IN = 34,
    STABLE_SWAP_EXACT_OUT = 35
}
export declare const ABI_PARAMETER: {
    32: readonly [{
        readonly type: "bytes";
        readonly name: "_commands";
    }, {
        readonly type: "bytes[]";
        readonly name: "_inputs";
    }];
    10: readonly [{
        readonly type: "PermitSingle";
        readonly name: "permitSingle";
    }, {
        readonly type: "bytes";
        readonly name: "data";
    }];
    3: readonly [{
        readonly type: "PermitBatch";
        readonly name: "permitBatch";
    }, {
        readonly type: "bytes";
        readonly name: "data";
    }];
    2: readonly [{
        readonly type: "address";
        readonly name: "token";
    }, {
        readonly type: "address";
        readonly name: "recipient";
    }, {
        readonly type: "uint160";
        readonly name: "amount";
    }];
    13: readonly [{
        readonly type: "AllowanceTransferDetails[]";
        readonly name: "batchDetails";
    }];
    0: readonly [{
        readonly type: "address";
        readonly name: "recipient";
    }, {
        readonly type: "uint256";
        readonly name: "amountIn";
    }, {
        readonly type: "uint256";
        readonly name: "amountOutMin";
    }, {
        readonly type: "bytes";
        readonly name: "path";
    }, {
        readonly type: "bool";
        readonly name: "payerIsUser";
    }];
    1: readonly [{
        readonly type: "address";
        readonly name: "recipient";
    }, {
        readonly type: "uint256";
        readonly name: "amountOut";
    }, {
        readonly type: "uint256";
        readonly name: "amountInMax";
    }, {
        readonly type: "bytes";
        readonly name: "path";
    }, {
        readonly type: "bool";
        readonly name: "payerIsUser";
    }];
    8: readonly [{
        readonly type: "address";
        readonly name: "recipient";
    }, {
        readonly type: "uint256";
        readonly name: "amountIn";
    }, {
        readonly type: "uint256";
        readonly name: "amountOutMin";
    }, {
        readonly type: "address[]";
        readonly name: "path";
    }, {
        readonly type: "bool";
        readonly name: "payerIsUser";
    }];
    9: readonly [{
        readonly type: "address";
        readonly name: "recipient";
    }, {
        readonly type: "uint256";
        readonly name: "amountOut";
    }, {
        readonly type: "uint256";
        readonly name: "amountInMax";
    }, {
        readonly type: "address[]";
        readonly name: "path";
    }, {
        readonly type: "bool";
        readonly name: "payerIsUser";
    }];
    34: readonly [{
        readonly type: "address";
        readonly name: "recipient";
    }, {
        readonly type: "uint256";
        readonly name: "amountIn";
    }, {
        readonly type: "uint256";
        readonly name: "amountOutMin";
    }, {
        readonly type: "address[]";
        readonly name: "path";
    }, {
        readonly type: "uint256[]";
        readonly name: "flag";
    }, {
        readonly type: "bool";
        readonly name: "payerIsUser";
    }];
    35: readonly [{
        readonly type: "address";
        readonly name: "recipient";
    }, {
        readonly type: "uint256";
        readonly name: "amountOut";
    }, {
        readonly type: "uint256";
        readonly name: "amountInMax";
    }, {
        readonly type: "address[]";
        readonly name: "path";
    }, {
        readonly type: "uint256[]";
        readonly name: "flag";
    }, {
        readonly type: "bool";
        readonly name: "payerIsUser";
    }];
    11: readonly [{
        readonly type: "address";
        readonly name: "recipient";
    }, {
        readonly type: "uint256";
        readonly name: "amountMin";
    }];
    12: readonly [{
        readonly type: "address";
        readonly name: "recipient";
    }, {
        readonly type: "uint256";
        readonly name: "amountMin";
    }];
    4: readonly [{
        readonly type: "address";
        readonly name: "token";
    }, {
        readonly type: "address";
        readonly name: "recipient";
    }, {
        readonly type: "uint256";
        readonly name: "amountMin";
    }];
    5: readonly [{
        readonly type: "address";
        readonly name: "token";
    }, {
        readonly type: "address";
        readonly name: "recipient";
    }, {
        readonly type: "uint256";
        readonly name: "value";
    }];
    6: readonly [{
        readonly type: "address";
        readonly name: "token";
    }, {
        readonly type: "address";
        readonly name: "recipient";
    }, {
        readonly type: "uint256";
        readonly name: "bips";
    }];
    14: readonly [{
        readonly type: "address";
        readonly name: "owner";
    }, {
        readonly type: "address";
        readonly name: "token";
    }, {
        readonly type: "uint256";
        readonly name: "minBalance";
    }];
};
export type CommandUsed = keyof typeof ABI_PARAMETER;
export declare class RoutePlanner {
    commands: Hex;
    inputs: Hex[];
    constructor();
    addSubPlan(subplan: RoutePlanner): void;
    addCommand<TCommandType extends CommandUsed>(type: TCommandType, parameters: ABIParametersType<TCommandType>, allowRevert?: boolean): void;
}
export type RouterCommand = {
    type: CommandUsed;
    encodedInput: Hex;
};
export declare function createCommand<TCommandType extends CommandUsed>(type: TCommandType, parameters: ABIParametersType<TCommandType>): RouterCommand;
//# sourceMappingURL=routerCommands.d.ts.map