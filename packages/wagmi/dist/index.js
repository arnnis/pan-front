'use strict';

var chunkMH6DFUPV_js = require('./chunk-MH6DFUPV.js');
var wagmi = require('wagmi');
var react = require('react');
var reactQuery = require('@tanstack/react-query');

function useWeb3React() {
  const { chain, address, connector, isConnected, isConnecting } = wagmi.useAccount();
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
  const { address, connector } = wagmi.useAccount();
  const { signMessageAsync: sign } = wagmi.useSignMessage();
  return {
    signMessageAsync: react.useCallback(
      (args) => chunkMH6DFUPV_js.__async(this, null, function* () {
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
  const queryClient = reactQuery.useQueryClient();
  const queryEnabled = Boolean(chainId && enabled);
  const { data: initialBlock } = wagmi.useBlock({
    chainId,
    blockTag: "latest",
    query: {
      enabled: queryEnabled
    }
  });
  react.useEffect(() => {
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
  wagmi.useWatchBlocks({
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
  const blockNumber = wagmi.useBlockNumber({ chainId, query: { enabled: !watch }, watch: false });
  return watch ? watchedBlockNumber : blockNumber;
}
function useWatchedBlockNumber({ chainId }) {
  return reactQuery.useQuery({
    queryKey: getBlockNumberQueryKey(chainId),
    enabled: false,
    refetchOnReconnect: false,
    refetchOnWindowFocus: false,
    refetchOnMount: false
  });
}
function useBlockTimestamp({ chainId }) {
  return reactQuery.useQuery({
    queryKey: getBlockTimestampQueryKey(chainId),
    enabled: false,
    refetchOnReconnect: false,
    refetchOnWindowFocus: false,
    refetchOnMount: false
  });
}
function useInitialBlockNumber({ chainId }) {
  return reactQuery.useQuery({
    queryKey: getInitialBlockNumberQueryKey(chainId),
    enabled: false,
    refetchOnReconnect: false,
    refetchOnWindowFocus: false,
    refetchOnMount: false
  });
}
function useInitialBlockTimestamp({ chainId }) {
  return reactQuery.useQuery({
    queryKey: getInitialBlockTimestampQueryKey(chainId),
    enabled: false,
    refetchOnReconnect: false,
    refetchOnWindowFocus: false,
    refetchOnMount: false
  });
}
var useFetchBlockData = (chainId) => {
  const queryClient = reactQuery.useQueryClient();
  const provider = wagmi.usePublicClient({ chainId });
  const refetchBlockData = react.useCallback(() => chunkMH6DFUPV_js.__async(void 0, null, function* () {
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
  const isFirstRun = react.useRef(true);
  const prevParams = react.useRef(checkObject);
  react.useEffect(() => {
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
  const _a = parameters, { watch } = _a, queryParameters = chunkMH6DFUPV_js.__objRest(_a, ["watch"]);
  const queryClient = reactQuery.useQueryClient();
  const { data: blockNumber } = useBlockNumber({ watch, chainId: (_c = (_b = parameters.contracts) == null ? void 0 : _b[0]) == null ? void 0 : _c.chainId });
  const readContractResult = wagmi.useReadContracts(queryParameters);
  useDidMountEffect_default(() => {
    if (watch) {
      queryClient.invalidateQueries({ queryKey: readContractResult.queryKey }, { cancelRefetch: false });
    }
  }, blockNumber);
  return readContractResult;
}
function useReadContract(parameters = {}) {
  const _a = parameters, { watch } = _a, queryParameters = chunkMH6DFUPV_js.__objRest(_a, ["watch"]);
  const queryClient = reactQuery.useQueryClient();
  const { data: blockNumber } = useBlockNumber({ chainId: parameters.chainId, watch });
  const readContractResult = wagmi.useReadContract(queryParameters);
  useDidMountEffect_default(() => {
    if (watch) {
      queryClient.invalidateQueries({ queryKey: readContractResult.queryKey }, { cancelRefetch: false });
    }
  }, blockNumber);
  return readContractResult;
}
function useBalance(params = {}) {
  const _a = params, { watch } = _a, queryParameters = chunkMH6DFUPV_js.__objRest(_a, ["watch"]);
  const queryClient = reactQuery.useQueryClient();
  const { data: blockNumber } = useBlockNumber({ chainId: params.chainId, watch });
  const readContractResult = wagmi.useBalance(queryParameters);
  useDidMountEffect_default(() => {
    if (watch) {
      queryClient.invalidateQueries({ queryKey: readContractResult.queryKey }, { cancelRefetch: false });
    }
  }, blockNumber);
  return readContractResult;
}
function useFeeData(parameters = {}) {
  const _a = parameters, { watch } = _a, queryParameters = chunkMH6DFUPV_js.__objRest(_a, ["watch"]);
  const queryClient = reactQuery.useQueryClient();
  const { data: blockNumber } = useBlockNumber({ watch, chainId: parameters.chainId });
  const readContractResult = wagmi.useFeeData(queryParameters);
  useDidMountEffect_default(() => {
    if (watch) {
      queryClient.invalidateQueries({ queryKey: readContractResult.queryKey }, { cancelRefetch: false });
    }
  }, blockNumber);
  return readContractResult;
}

exports.getBlockNumberQueryKey = getBlockNumberQueryKey;
exports.getBlockTimestampQueryKey = getBlockTimestampQueryKey;
exports.getInitialBlockNumberQueryKey = getInitialBlockNumberQueryKey;
exports.getInitialBlockTimestampQueryKey = getInitialBlockTimestampQueryKey;
exports.useBalance = useBalance;
exports.useBlockNumber = useBlockNumber;
exports.useBlockTimestamp = useBlockTimestamp;
exports.useFeeData = useFeeData;
exports.useFetchBlockData = useFetchBlockData;
exports.useInitialBlockNumber = useInitialBlockNumber;
exports.useInitialBlockTimestamp = useInitialBlockTimestamp;
exports.useReadContract = useReadContract;
exports.useReadContracts = useReadContracts;
exports.useSignMessage = useSignMessage;
exports.useWatchBlock = useWatchBlock;
exports.useWatchedBlockNumber = useWatchedBlockNumber;
exports.useWeb3React = useWeb3React;
