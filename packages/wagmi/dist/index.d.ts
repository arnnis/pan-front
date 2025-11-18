import { Chain, SignableMessage, Abi, ContractFunctionName, ContractFunctionArgs, FeeValuesType } from 'viem';
import { Connector, Config, ResolvedRegister, UseReadContractsParameters, UseReadContractsReturnType, UseReadContractParameters, UseReadContractReturnType, UseBalanceParameters, UseBalanceReturnType, UseEstimateFeesPerGasParameters, UseEstimateFeesPerGasReturnType, useBlockNumber as useBlockNumber$1 } from 'wagmi';
import { ReadContractsData, ReadContractData, EstimateFeesPerGasData } from 'wagmi/query';
import * as _tanstack_react_query from '@tanstack/react-query';

declare function useWeb3React(): {
    chainId: number | undefined;
    account: `0x${string}` | null | undefined;
    isConnected: boolean;
    isConnecting: boolean;
    chain: (Chain & {
        unsupported?: boolean | undefined;
    }) | undefined;
    connector: Connector | undefined;
};

interface SignMessageArgs {
    message: SignableMessage;
}
declare function useSignMessage(): {
    signMessageAsync: (args: SignMessageArgs) => Promise<any>;
};

declare function useReadContracts<const contracts extends readonly unknown[], allowFailure extends boolean = true, config extends Config = ResolvedRegister['config'], selectData = ReadContractsData<contracts, allowFailure>>(parameters?: UseReadContractsParameters<contracts, allowFailure, config, selectData> & {
    watch?: boolean;
}): UseReadContractsReturnType<contracts, allowFailure, selectData>;

declare function useReadContract<const abi extends Abi | readonly unknown[], functionName extends ContractFunctionName<abi, 'pure' | 'view'>, args extends ContractFunctionArgs<abi, 'pure' | 'view', functionName>, config extends Config = ResolvedRegister['config'], selectData = ReadContractData<abi, functionName, args>>(parameters?: UseReadContractParameters<abi, functionName, args, config, selectData> & {
    watch?: boolean;
}): UseReadContractReturnType<abi, functionName, args, selectData>;

type Evaluate<type> = {
    [key in keyof type]: type[key];
} & unknown;
type GetBalanceReturnType = {
    decimals: number;
    /** @deprecated */
    formatted: string;
    symbol: string;
    value: bigint;
};
type GetBalanceQueryFnData = Evaluate<GetBalanceReturnType>;
type GetBalanceData = GetBalanceQueryFnData;

declare function useBalance<config extends Config = ResolvedRegister['config'], selectData = GetBalanceData>(params?: UseBalanceParameters<config, selectData> & {
    watch?: boolean;
}): UseBalanceReturnType<selectData>;

declare function useFeeData<config extends Config = ResolvedRegister['config'], type extends FeeValuesType = 'eip1559', selectData = EstimateFeesPerGasData<type>>(parameters?: UseEstimateFeesPerGasParameters<type, config, selectData> & {
    watch?: boolean;
}): UseEstimateFeesPerGasReturnType<type, selectData>;

type Params = {
    chainId?: number;
    enabled?: boolean;
};
declare const getBlockNumberQueryKey: (chainId?: number) => (string | number | undefined)[];
declare const getBlockTimestampQueryKey: (chainId?: number) => (string | number | undefined)[];
declare const getInitialBlockNumberQueryKey: (chainId?: number) => (string | number | undefined)[];
declare const getInitialBlockTimestampQueryKey: (chainId?: number) => (string | number | undefined)[];
declare function useWatchBlock({ chainId, enabled }: Params): void;
declare function useBlockNumber({ chainId, watch, }: Omit<Params, 'enabled'> & {
    watch?: boolean;
}): ReturnType<typeof useWatchedBlockNumber> | ReturnType<typeof useBlockNumber$1>;
declare function useWatchedBlockNumber({ chainId }: Omit<Params, 'enabled'>): _tanstack_react_query.UseQueryResult<bigint, Error>;
declare function useBlockTimestamp({ chainId }: Omit<Params, 'enabled'>): _tanstack_react_query.UseQueryResult<number, Error>;
declare function useInitialBlockNumber({ chainId }: Omit<Params, 'enabled'>): _tanstack_react_query.UseQueryResult<bigint, Error>;
declare function useInitialBlockTimestamp({ chainId }: Omit<Params, 'enabled'>): _tanstack_react_query.UseQueryResult<number, Error>;
declare const useFetchBlockData: (chainId: number) => () => Promise<void>;

export { getBlockNumberQueryKey, getBlockTimestampQueryKey, getInitialBlockNumberQueryKey, getInitialBlockTimestampQueryKey, useBalance, useBlockNumber, useBlockTimestamp, useFeeData, useFetchBlockData, useInitialBlockNumber, useInitialBlockTimestamp, useReadContract, useReadContracts, useSignMessage, useWatchBlock, useWatchedBlockNumber, useWeb3React };
