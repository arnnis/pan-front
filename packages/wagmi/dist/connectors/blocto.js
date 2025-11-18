'use strict';

var chunkMH6DFUPV_js = require('../chunk-MH6DFUPV.js');
var BloctoSDK = require('@blocto/sdk');
var viem = require('viem');
var wagmi = require('wagmi');

function _interopDefault (e) { return e && e.__esModule ? e : { default: e }; }

var BloctoSDK__default = /*#__PURE__*/_interopDefault(BloctoSDK);

blocto.type = "blocto";
function blocto({ appId } = {}) {
  let walletProvider;
  const handleConnectReset = () => {
    walletProvider = void 0;
  };
  return wagmi.createConnector((config) => ({
    id: "blocto",
    name: "Blocto",
    type: blocto.type,
    connect() {
      return chunkMH6DFUPV_js.__async(this, arguments, function* ({ chainId } = {}) {
        try {
          const provider = yield this.getProvider({ chainId });
          config.emitter.emit("message", { type: "connecting" });
          yield provider.request({
            method: "eth_requestAccounts"
          });
          const accounts = yield this.getAccounts();
          const _chainId = yield this.getChainId();
          return { accounts, chainId: _chainId };
        } catch (error) {
          handleConnectReset();
          throw error;
        }
      });
    },
    disconnect() {
      return chunkMH6DFUPV_js.__async(this, null, function* () {
        const provider = yield this.getProvider();
        yield provider.request({ method: "wallet_disconnect" });
        handleConnectReset();
      });
    },
    getAccounts() {
      return chunkMH6DFUPV_js.__async(this, null, function* () {
        const provider = yield this.getProvider();
        const accounts = yield provider.request({
          method: "eth_accounts"
        });
        return accounts.map((x) => viem.getAddress(x));
      });
    },
    getChainId() {
      return chunkMH6DFUPV_js.__async(this, null, function* () {
        const provider = yield this.getProvider();
        const chainId = yield provider == null ? void 0 : provider.request({ method: "eth_chainId" });
        return wagmi.normalizeChainId(chainId);
      });
    },
    getProvider() {
      return chunkMH6DFUPV_js.__async(this, arguments, function* ({ chainId } = {}) {
        var _a2, _b, _c, _d;
        if (!walletProvider) {
          const store = yield (_a2 = config.storage) == null ? void 0 : _a2.getItem("store");
          const lastConnectedChainId = (_b = store == null ? void 0 : store.state) == null ? void 0 : _b.chainId;
          const desiredChainId = chainId != null ? chainId : lastConnectedChainId;
          const ethereum = {
            chainId: desiredChainId,
            rpc: (_c = config.chains.find((x) => x.id === desiredChainId)) == null ? void 0 : _c.rpcUrls.default.http[0]
          };
          walletProvider = (_d = new BloctoSDK__default.default({ ethereum, appId })) == null ? void 0 : _d.ethereum;
          if (!walletProvider) {
            throw new Error("Blocto SDK is not initialized.");
          }
          walletProvider.on("accountsChanged", this.onAccountsChanged.bind(this));
          walletProvider.on("chainChanged", this.onChainChanged.bind(this));
          walletProvider.on("disconnect", this.onDisconnect.bind(this));
        }
        return Promise.resolve(walletProvider);
      });
    },
    isAuthorized() {
      return chunkMH6DFUPV_js.__async(this, null, function* () {
        var _a2;
        const recentConnectorId = yield (_a2 = config.storage) == null ? void 0 : _a2.getItem("recentConnectorId");
        if (recentConnectorId !== this.id)
          return false;
        const accounts = yield this.getAccounts();
        return !!accounts.length;
      });
    },
    switchChain(_0) {
      return chunkMH6DFUPV_js.__async(this, arguments, function* ({ chainId }) {
        try {
          const provider = yield this.getProvider();
          const id = viem.numberToHex(chainId);
          const chain = config.chains.find((x) => x.id === chainId);
          const evmSupportMap = yield provider._blocto.supportNetworkList;
          const isBloctoSupportChain = evmSupportMap[`${chainId}`];
          if (!chain) {
            throw new viem.SwitchChainError(new Error(`Chain not in config: ${id}`));
          }
          if (!isBloctoSupportChain) {
            throw new viem.SwitchChainError(new Error(`Blocto unsupported chain: ${id}`));
          }
          yield provider.request({
            method: "wallet_addEthereumChain",
            params: [{ chainId: id, rpcUrls: chain == null ? void 0 : chain.rpcUrls.default.http }]
          });
          yield provider.request({
            method: "wallet_switchEthereumChain",
            params: [{ chainId: id }]
          });
          return chain;
        } catch (err) {
          const error = err;
          if (error.code === viem.UserRejectedRequestError.code)
            throw new viem.UserRejectedRequestError(error);
          throw new viem.SwitchChainError(error);
        }
      });
    },
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    onAccountsChanged() {
    },
    onChainChanged(chainId) {
      return chunkMH6DFUPV_js.__async(this, null, function* () {
        const accounts = yield this.getAccounts();
        config.emitter.emit("change", {
          chainId: wagmi.normalizeChainId(chainId),
          accounts
        });
      });
    },
    onDisconnect() {
      return chunkMH6DFUPV_js.__async(this, null, function* () {
        config.emitter.emit("disconnect");
      });
    }
  }));
}

exports.blocto = blocto;
