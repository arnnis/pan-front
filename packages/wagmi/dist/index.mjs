import { __async, __objRest } from './chunk-V5LXLS2A.mjs';
import { useAccount, useSignMessage as useSignMessage$1, useBlock, useWatchBlocks, useBlockNumber as useBlockNumber$1, usePublicClient, useReadContracts as useReadContracts$1, useReadContract as useReadContract$1, useBalance as useBalance$1, useFeeData as useFeeData$1 } from 'wagmi';
import { useCallback, useEffect, useRef } from 'react';
import { useQueryClient, useQuery } from '@tanstack/react-query';

function useWeb3React() {
  const { chain, address, connector, isConnected, isConnecting } = useAccount();
  return {
    chainId: chain == null ? void 0 : chain.id,
    account: isConnected ? address : null,
    // TODO: migrate using `isConnected` instead of account to check wallet auth
    isConnected,
    isConnecting,
    chain,
    connector
  };
}
function useSignMessage() {
  const { address, connector } = useAccount();
  const { signMessageAsync: sign } = useSignMessage$1();
  return {
    signMessageAsync: useCallback(
      (args) => __async(this, null, function* () {
        var _a, _b;
        if ((connector == null ? void 0 : connector.id) === "bsc" && window.BinanceChain && address) {
          const res = yield (_b = (_a = window.BinanceChain).bnbSign) == null ? void 0 : _b.call(_a, address, args.message);
          if (res) {
            return res.signature;
          }
          return null;
        }
        return sign(args);
      }),
      [address, connector == null ? void 0 : connector.id, sign]
    )
  };
}
function createKeyGetter(name) {
  return function getKey(chainId) {
    return [name, chainId];
  };
}
var updateBlockQueryData = (queryClient, chainId, block) => {
  if (chainId) {
    const blockNumber = Number(block.number);
    const timestamp = Number(block.timestamp);
    queryClient.setQueryData(getBlockNumberQueryKey(chainId), blockNumber);
    queryClient.setQueryData(getBlockTimestampQueryKey(chainId), timestamp);
  }
};
var getBlockNumberQueryKey = createKeyGetter("blockNumber");
var getBlockTimestampQueryKey = createKeyGetter("blockTimestamp");
var getInitialBlockNumberQueryKey = createKeyGetter("initialBlockNumber");
var getInitialBlockTimestampQueryKey = createKeyGetter("initialBlockTimestamp");
function useWatchBlock({ chainId, enabled }) {
  const queryClient = useQueryClient();
  const queryEnabled = Boolean(chainId && enabled);
  const { data: initialBlock } = useBlock({
    chainId,
    blockTag: "latest",
    query: {
      enabled: queryEnabled
    }
  });
  useEffect(() => {
    var _a, _b, _c, _d;
    if (!queryEnabled || !initialBlock) {
      return;
    }
    const { number: blockNumber, timestamp: blockTimestamp } = initialBlock;
    updateBlockQueryData(queryClient, chainId, initialBlock);
    const initialBlockNumberQueryKey = getInitialBlockNumberQueryKey(chainId);
    if (!((_b = (_a = queryClient.getQueryCache().find({
      queryKey: initialBlockNumberQueryKey
    })) == null ? void 0 : _a.state) == null ? void 0 : _b.data)) {
      queryClient.setQueryData(initialBlockNumberQueryKey, blockNumber);
    }
    const initialBlockTimestampQueryKey = getInitialBlockTimestampQueryKey(chainId);
    if (!((_d = (_c = queryClient.getQueryCache().find({
      queryKey: initialBlockTimestampQueryKey
    })) == null ? void 0 : _c.state) == null ? void 0 : _d.data)) {
      queryClient.setQueryData(initialBlockTimestampQueryKey, Number(blockTimestamp));
    }
  }, [chainId, initialBlock, queryEnabled, queryClient]);
  useWatchBlocks({
    chainId,
    blockTag: "latest",
    enabled: queryEnabled,
    onBlock: (data) => {
      updateBlockQueryData(queryClient, chainId, data);
    }
  });
}
function useBlockNumber({
  chainId,
  watch
}) {
  const watchedBlockNumber = useWatchedBlockNumber({ chainId });
  const blockNumber = useBlockNumber$1({ chainId, query: { enabled: !watch }, watch: false });
  return watch ? watchedBlockNumber : blockNumber;
}
function useWatchedBlockNumber({ chainId }) {
  return useQuery({
    queryKey: getBlockNumberQueryKey(chainId),
    enabled: false,
    refetchOnReconnect: false,
    refetchOnWindowFocus: false,
    refetchOnMount: false
  });
}
function useBlockTimestamp({ chainId }) {
  return useQuery({
    queryKey: getBlockTimestampQueryKey(chainId),
    enabled: false,
    refetchOnReconnect: false,
    refetchOnWindowFocus: false,
    refetchOnMount: false
  });
}
function useInitialBlockNumber({ chainId }) {
  return useQuery({
    queryKey: getInitialBlockNumberQueryKey(chainId),
    enabled: false,
    refetchOnReconnect: false,
    refetchOnWindowFocus: false,
    refetchOnMount: false
  });
}
function useInitialBlockTimestamp({ chainId }) {
  return useQuery({
    queryKey: getInitialBlockTimestampQueryKey(chainId),
    enabled: false,
    refetchOnReconnect: false,
    refetchOnWindowFocus: false,
    refetchOnMount: false
  });
}
var useFetchBlockData = (chainId) => {
  const queryClient = useQueryClient();
  const provider = usePublicClient({ chainId });
  const refetchBlockData = useCallback(() => __async(void 0, null, function* () {
    try {
      if (provider) {
        const block = yield provider.getBlock();
        updateBlockQueryData(queryClient, chainId, block);
      }
    } catch (error) {
      console.error("Error fetching block data:", error);
    }
  }), [provider, queryClient, chainId]);
  return refetchBlockData;
};
var useDidMountEffect = (func, checkObject) => {
  const isFirstRun = useRef(true);
  const prevParams = useRef(checkObject);
  useEffect(() => {
    if (isFirstRun.current) {
      isFirstRun.current = false;
      return;
    }
    if (prevParams.current !== void 0 && checkObject !== prevParams.current) {
      func();
    }
    prevParams.current = checkObject;
  }, [checkObject]);
};
var useDidMountEffect_default = useDidMountEffect;

// src/hooks/useReadContracts.ts
function useReadContracts(parameters = {}) {
  var _b, _c;
  const _a = parameters, { watch } = _a, queryParameters = __objRest(_a, ["watch"]);
  const queryClient = useQueryClient();
  const { data: blockNumber } = useBlockNumber({ watch, chainId: (_c = (_b = parameters.contracts) == null ? void 0 : _b[0]) == null ? void 0 : _c.chainId });
  const readContractResult = useReadContracts$1(queryParameters);
  useDidMountEffect_default(() => {
    if (watch) {
      queryClient.invalidateQueries({ queryKey: readContractResult.queryKey }, { cancelRefetch: false });
    }
  }, blockNumber);
  return readContractResult;
}
function useReadContract(parameters = {}) {
  const _a = parameters, { watch } = _a, queryParameters = __objRest(_a, ["watch"]);
  const queryClient = useQueryClient();
  const { data: blockNumber } = useBlockNumber({ chainId: parameters.chainId, watch });
  const readContractResult = useReadContract$1(queryParameters);
  useDidMountEffect_default(() => {
    if (watch) {
      queryClient.invalidateQueries({ queryKey: readContractResult.queryKey }, { cancelRefetch: false });
    }
  }, blockNumber);
  return readContractResult;
}
function useBalance(params = {}) {
  const _a = params, { watch } = _a, queryParameters = __objRest(_a, ["watch"]);
  const queryClient = useQueryClient();
  const { data: blockNumber } = useBlockNumber({ chainId: params.chainId, watch });
  const readContractResult = useBalance$1(queryParameters);
  useDidMountEffect_default(() => {
    if (watch) {
      queryClient.invalidateQueries({ queryKey: readContractResult.queryKey }, { cancelRefetch: false });
    }
  }, blockNumber);
  return readContractResult;
}
function useFeeData(parameters = {}) {
  const _a = parameters, { watch } = _a, queryParameters = __objRest(_a, ["watch"]);
  const queryClient = useQueryClient();
  const { data: blockNumber } = useBlockNumber({ watch, chainId: parameters.chainId });
  const readContractResult = useFeeData$1(queryParameters);
  useDidMountEffect_default(() => {
    if (watch) {
      queryClient.invalidateQueries({ queryKey: readContractResult.queryKey }, { cancelRefetch: false });
    }
  }, blockNumber);
  return readContractResult;
}

export { getBlockNumberQueryKey, getBlockTimestampQueryKey, getInitialBlockNumberQueryKey, getInitialBlockTimestampQueryKey, useBalance, useBlockNumber, useBlockTimestamp, useFeeData, useFetchBlockData, useInitialBlockNumber, useInitialBlockTimestamp, useReadContract, useReadContracts, useSignMessage, useWatchBlock, useWatchedBlockNumber, useWeb3React };
