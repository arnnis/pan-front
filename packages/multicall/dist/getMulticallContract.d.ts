import { ChainId } from '@pancakeswap/chains';
import { Address, PublicClient } from 'viem';
type Params = {
    chainId: ChainId;
    client?: PublicClient;
};
export declare function getMulticallContract({ chainId, client }: Params): {
    read: {
        [x: string]: (...parameters: [options?: import("viem").Prettify<import("viem").UnionOmit<import("viem").ReadContractParameters<{
            inputs: ({
                components: {
                    internalType: string;
                    name: string;
                    type: string;
                }[];
                internalType: string;
                name: string;
                type: string;
            } | {
                internalType: string;
                name: string;
                type: string;
                components?: undefined;
            })[];
            name: string;
            outputs: ({
                internalType: string;
                name: string;
                type: string;
                components?: undefined;
            } | {
                components: {
                    internalType: string;
                    name: string;
                    type: string;
                }[];
                internalType: string;
                name: string;
                type: string;
            })[];
            stateMutability: string;
            type: string;
        }[], string, readonly unknown[]>, "address" | "abi" | "args" | "functionName">> | undefined] | [args: readonly unknown[], options?: import("viem").Prettify<import("viem").UnionOmit<import("viem").ReadContractParameters<{
            inputs: ({
                components: {
                    internalType: string;
                    name: string;
                    type: string;
                }[];
                internalType: string;
                name: string;
                type: string;
            } | {
                internalType: string;
                name: string;
                type: string;
                components?: undefined;
            })[];
            name: string;
            outputs: ({
                internalType: string;
                name: string;
                type: string;
                components?: undefined;
            } | {
                components: {
                    internalType: string;
                    name: string;
                    type: string;
                }[];
                internalType: string;
                name: string;
                type: string;
            })[];
            stateMutability: string;
            type: string;
        }[], string, readonly unknown[]>, "address" | "abi" | "args" | "functionName">> | undefined]) => Promise<import("viem").ReadContractReturnType>;
    };
    estimateGas: {
        [x: string]: (...parameters: [options: import("viem").Prettify<import("viem").UnionOmit<import("viem").EstimateContractGasParameters<{
            inputs: ({
                components: {
                    internalType: string;
                    name: string;
                    type: string;
                }[];
                internalType: string;
                name: string;
                type: string;
            } | {
                internalType: string;
                name: string;
                type: string;
                components?: undefined;
            })[];
            name: string;
            outputs: ({
                internalType: string;
                name: string;
                type: string;
                components?: undefined;
            } | {
                components: {
                    internalType: string;
                    name: string;
                    type: string;
                }[];
                internalType: string;
                name: string;
                type: string;
            })[];
            stateMutability: string;
            type: string;
        }[], string, readonly unknown[], import("viem").Chain | undefined>, "address" | "abi" | "args" | "functionName">>] | [args: readonly unknown[], options: import("viem").Prettify<import("viem").UnionOmit<import("viem").EstimateContractGasParameters<{
            inputs: ({
                components: {
                    internalType: string;
                    name: string;
                    type: string;
                }[];
                internalType: string;
                name: string;
                type: string;
            } | {
                internalType: string;
                name: string;
                type: string;
                components?: undefined;
            })[];
            name: string;
            outputs: ({
                internalType: string;
                name: string;
                type: string;
                components?: undefined;
            } | {
                components: {
                    internalType: string;
                    name: string;
                    type: string;
                }[];
                internalType: string;
                name: string;
                type: string;
            })[];
            stateMutability: string;
            type: string;
        }[], string, readonly unknown[], import("viem").Chain | undefined>, "address" | "abi" | "args" | "functionName">>]) => Promise<import("viem").EstimateContractGasReturnType>;
    } & {
        [x: string]: (...parameters: [options: import("viem").Prettify<import("viem").UnionOmit<import("viem").EstimateContractGasParameters<{
            inputs: ({
                components: {
                    internalType: string;
                    name: string;
                    type: string;
                }[];
                internalType: string;
                name: string;
                type: string;
            } | {
                internalType: string;
                name: string;
                type: string;
                components?: undefined;
            })[];
            name: string;
            outputs: ({
                internalType: string;
                name: string;
                type: string;
                components?: undefined;
            } | {
                components: {
                    internalType: string;
                    name: string;
                    type: string;
                }[];
                internalType: string;
                name: string;
                type: string;
            })[];
            stateMutability: string;
            type: string;
        }[], string, readonly unknown[], import("viem").Chain | undefined>, "address" | "abi" | "args" | "functionName">>] | [args: readonly unknown[], options: import("viem").Prettify<import("viem").UnionOmit<import("viem").EstimateContractGasParameters<{
            inputs: ({
                components: {
                    internalType: string;
                    name: string;
                    type: string;
                }[];
                internalType: string;
                name: string;
                type: string;
            } | {
                internalType: string;
                name: string;
                type: string;
                components?: undefined;
            })[];
            name: string;
            outputs: ({
                internalType: string;
                name: string;
                type: string;
                components?: undefined;
            } | {
                components: {
                    internalType: string;
                    name: string;
                    type: string;
                }[];
                internalType: string;
                name: string;
                type: string;
            })[];
            stateMutability: string;
            type: string;
        }[], string, readonly unknown[], import("viem").Chain | undefined>, "address" | "abi" | "args" | "functionName">>]) => Promise<import("viem").EstimateContractGasReturnType>;
    };
    simulate: {
        [x: string]: <chainOverride extends import("viem").Chain | undefined = undefined, accountOverride extends import("viem").Account | Address | undefined = undefined>(...parameters: [options?: Omit<import("viem").SimulateContractParameters<{
            inputs: ({
                components: {
                    internalType: string;
                    name: string;
                    type: string;
                }[];
                internalType: string;
                name: string;
                type: string;
            } | {
                internalType: string;
                name: string;
                type: string;
                components?: undefined;
            })[];
            name: string;
            outputs: ({
                internalType: string;
                name: string;
                type: string;
                components?: undefined;
            } | {
                components: {
                    internalType: string;
                    name: string;
                    type: string;
                }[];
                internalType: string;
                name: string;
                type: string;
            })[];
            stateMutability: string;
            type: string;
        }[], string, readonly unknown[], import("viem").Chain | undefined, chainOverride, accountOverride>, "address" | "abi" | "args" | "functionName"> | undefined] | [args: readonly unknown[], options?: Omit<import("viem").SimulateContractParameters<{
            inputs: ({
                components: {
                    internalType: string;
                    name: string;
                    type: string;
                }[];
                internalType: string;
                name: string;
                type: string;
            } | {
                internalType: string;
                name: string;
                type: string;
                components?: undefined;
            })[];
            name: string;
            outputs: ({
                internalType: string;
                name: string;
                type: string;
                components?: undefined;
            } | {
                components: {
                    internalType: string;
                    name: string;
                    type: string;
                }[];
                internalType: string;
                name: string;
                type: string;
            })[];
            stateMutability: string;
            type: string;
        }[], string, readonly unknown[], import("viem").Chain | undefined, chainOverride, accountOverride>, "address" | "abi" | "args" | "functionName"> | undefined]) => Promise<import("viem").SimulateContractReturnType>;
    };
    createEventFilter: {
        [x: string]: <strict extends boolean | undefined = undefined>(...parameters: [options?: ({
            fromBlock?: bigint | import("viem").BlockTag | undefined;
            toBlock?: bigint | import("viem").BlockTag | undefined;
        } & {
            strict?: strict | undefined;
        }) | undefined] | [args: readonly unknown[] | {
            [x: string]: unknown;
            address?: undefined;
            abi?: undefined;
            eventName?: undefined;
            fromBlock?: undefined;
            strict?: undefined;
            toBlock?: undefined;
            args?: undefined;
        }, options?: ({
            fromBlock?: bigint | import("viem").BlockTag | undefined;
            toBlock?: bigint | import("viem").BlockTag | undefined;
        } & {
            strict?: strict | undefined;
        }) | undefined]) => Promise<import("viem").CreateContractEventFilterReturnType>;
    };
    getEvents: {
        [x: string]: (...parameters: [options?: {
            strict?: boolean | undefined;
            blockHash?: `0x${string}` | undefined;
            fromBlock?: bigint | import("viem").BlockTag | undefined;
            toBlock?: bigint | import("viem").BlockTag | undefined;
        } | undefined] | [args?: readonly unknown[] | {
            [x: string]: unknown;
            address?: undefined;
            abi?: undefined;
            args?: undefined;
            eventName?: undefined;
            fromBlock?: undefined;
            onError?: undefined;
            onLogs?: undefined;
            strict?: undefined;
            poll?: undefined;
            batch?: undefined;
            pollingInterval?: undefined;
        } | undefined, options?: {
            strict?: boolean | undefined;
            blockHash?: `0x${string}` | undefined;
            fromBlock?: bigint | import("viem").BlockTag | undefined;
            toBlock?: bigint | import("viem").BlockTag | undefined;
        } | undefined]) => Promise<import("viem").GetContractEventsReturnType<{
            inputs: ({
                components: {
                    internalType: string;
                    name: string;
                    type: string;
                }[];
                internalType: string;
                name: string;
                type: string;
            } | {
                internalType: string;
                name: string;
                type: string;
                components?: undefined;
            })[];
            name: string;
            outputs: ({
                internalType: string;
                name: string;
                type: string;
                components?: undefined;
            } | {
                components: {
                    internalType: string;
                    name: string;
                    type: string;
                }[];
                internalType: string;
                name: string;
                type: string;
            })[];
            stateMutability: string;
            type: string;
        }[], string>>;
    };
    watchEvent: {
        [x: string]: (...parameters: [options?: {
            batch?: boolean | undefined | undefined;
            pollingInterval?: number | undefined | undefined;
            strict?: boolean | undefined;
            fromBlock?: bigint | undefined;
            onError?: ((error: Error) => void) | undefined | undefined;
            onLogs: import("viem").WatchContractEventOnLogsFn<{
                inputs: ({
                    components: {
                        internalType: string;
                        name: string;
                        type: string;
                    }[];
                    internalType: string;
                    name: string;
                    type: string;
                } | {
                    internalType: string;
                    name: string;
                    type: string;
                    components?: undefined;
                })[];
                name: string;
                outputs: ({
                    internalType: string;
                    name: string;
                    type: string;
                    components?: undefined;
                } | {
                    components: {
                        internalType: string;
                        name: string;
                        type: string;
                    }[];
                    internalType: string;
                    name: string;
                    type: string;
                })[];
                stateMutability: string;
                type: string;
            }[], string, undefined>;
            poll?: true | undefined | undefined;
        } | undefined] | [args: readonly unknown[] | {
            [x: string]: unknown;
            address?: undefined;
            abi?: undefined;
            args?: undefined;
            eventName?: undefined;
            fromBlock?: undefined;
            onError?: undefined;
            onLogs?: undefined;
            strict?: undefined;
            poll?: undefined;
            batch?: undefined;
            pollingInterval?: undefined;
        }, options?: {
            batch?: boolean | undefined | undefined;
            pollingInterval?: number | undefined | undefined;
            strict?: boolean | undefined;
            fromBlock?: bigint | undefined;
            onError?: ((error: Error) => void) | undefined | undefined;
            onLogs: import("viem").WatchContractEventOnLogsFn<{
                inputs: ({
                    components: {
                        internalType: string;
                        name: string;
                        type: string;
                    }[];
                    internalType: string;
                    name: string;
                    type: string;
                } | {
                    internalType: string;
                    name: string;
                    type: string;
                    components?: undefined;
                })[];
                name: string;
                outputs: ({
                    internalType: string;
                    name: string;
                    type: string;
                    components?: undefined;
                } | {
                    components: {
                        internalType: string;
                        name: string;
                        type: string;
                    }[];
                    internalType: string;
                    name: string;
                    type: string;
                })[];
                stateMutability: string;
                type: string;
            }[], string, undefined>;
            poll?: true | undefined | undefined;
        } | undefined]) => import("viem").WatchContractEventReturnType;
    };
    write: {
        [x: string]: <chainOverride extends import("viem").Chain | undefined, options extends import("viem").UnionOmit<import("viem").WriteContractParameters<{
            inputs: ({
                components: {
                    internalType: string;
                    name: string;
                    type: string;
                }[];
                internalType: string;
                name: string;
                type: string;
            } | {
                internalType: string;
                name: string;
                type: string;
                components?: undefined;
            })[];
            name: string;
            outputs: ({
                internalType: string;
                name: string;
                type: string;
                components?: undefined;
            } | {
                components: {
                    internalType: string;
                    name: string;
                    type: string;
                }[];
                internalType: string;
                name: string;
                type: string;
            })[];
            stateMutability: string;
            type: string;
        }[], string, readonly unknown[], import("viem").Chain | undefined, undefined, chainOverride>, "address" | "abi" | "args" | "functionName"> extends infer T ? { [K in keyof T]: import("viem").UnionOmit<import("viem").WriteContractParameters<{
            inputs: ({
                components: {
                    internalType: string;
                    name: string;
                    type: string;
                }[];
                internalType: string;
                name: string;
                type: string;
            } | {
                internalType: string;
                name: string;
                type: string;
                components?: undefined;
            })[];
            name: string;
            outputs: ({
                internalType: string;
                name: string;
                type: string;
                components?: undefined;
            } | {
                components: {
                    internalType: string;
                    name: string;
                    type: string;
                }[];
                internalType: string;
                name: string;
                type: string;
            })[];
            stateMutability: string;
            type: string;
        }[], string, readonly unknown[], import("viem").Chain | undefined, undefined, chainOverride>, "address" | "abi" | "args" | "functionName">[K]; } : never, Rest extends unknown[] = [options: options]>(...parameters: Rest | [args: readonly unknown[], ...parameters: Rest]) => Promise<import("viem").WriteContractReturnType>;
    };
    address: `0x${string}`;
    abi: {
        inputs: ({
            components: {
                internalType: string;
                name: string;
                type: string;
            }[];
            internalType: string;
            name: string;
            type: string;
        } | {
            internalType: string;
            name: string;
            type: string;
            components?: undefined;
        })[];
        name: string;
        outputs: ({
            internalType: string;
            name: string;
            type: string;
            components?: undefined;
        } | {
            components: {
                internalType: string;
                name: string;
                type: string;
            }[];
            internalType: string;
            name: string;
            type: string;
        })[];
        stateMutability: string;
        type: string;
    }[];
};
export declare function getMulticall3ContractAddress(chainId?: ChainId): Address;
export {};
//# sourceMappingURL=getMulticallContract.d.ts.map