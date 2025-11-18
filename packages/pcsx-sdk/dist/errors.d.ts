export declare class MissingConfiguration extends Error {
    constructor(key: string, value: string);
}
export declare enum OrderValidation {
    Expired = 0,
    NonceUsed = 1,
    InsufficientFunds = 2,
    InvalidSignature = 3,
    DeadlineBeforeEndTime = 4,
    InvalidReactor = 5,
    InputAndOutputDecay = 6,
    IncorrectAmounts = 7,
    EndTimeBeforeStartTime = 8,
    OrderEndTimeBeforeStartTime = 9,
    UnknownError = 10,
    ValidationFailed = 11,
    ExclusivityPeriod = 12,
    NotSupportedChain = 13,
    OK = 14
}
export declare const BASIC_ERROR = "0x08c379a0";
export declare const KNOWN_ERRORS: {
    [key: string]: OrderValidation;
};
//# sourceMappingURL=errors.d.ts.map