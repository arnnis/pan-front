import { __async } from '../chunk-V5LXLS2A.mjs';
import BloctoSDK from '@blocto/sdk';
import { getAddress, numberToHex, SwitchChainError, UserRejectedRequestError } from 'viem';
import { createConnector, normalizeChainId } from 'wagmi';

blocto.type = "blocto";
function blocto({ appId } = {}) {
  let walletProvider;
  const handleConnectReset = () => {
    walletProvider = void 0;
  };
  return createConnector((config) => ({
    id: "blocto",
    name: "Blocto",
    type: blocto.type,
    connect() {
      return __async(this, arguments, function* ({ chainId } = {}) {
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
      return __async(this, null, function* () {
        const provider = yield this.getProvider();
        yield provider.request({ method: "wallet_disconnect" });
        handleConnectReset();
      });
    },
    getAccounts() {
      return __async(this, null, function* () {
        const provider = yield this.getProvider();
        const accounts = yield provider.request({
          method: "eth_accounts"
        });
        return accounts.map((x) => getAddress(x));
      });
    },
    getChainId() {
      return __async(this, null, function* () {
        const provider = yield this.getProvider();
        const chainId = yield provider == null ? void 0 : provider.request({ method: "eth_chainId" });
        return normalizeChainId(chainId);
      });
    },
    getProvider() {
      return __async(this, arguments, function* ({ chainId } = {}) {
        var _a2, _b, _c, _d;
        if (!walletProvider) {
          const store = yield (_a2 = config.storage) == null ? void 0 : _a2.getItem("store");
          const lastConnectedChainId = (_b = store == null ? void 0 : store.state) == null ? void 0 : _b.chainId;
          const desiredChainId = chainId != null ? chainId : lastConnectedChainId;
          const ethereum = {
            chainId: desiredChainId,
            rpc: (_c = config.chains.find((x) => x.id === desiredChainId)) == null ? void 0 : _c.rpcUrls.default.http[0]
          };
          walletProvider = (_d = new BloctoSDK({ ethereum, appId })) == null ? void 0 : _d.ethereum;
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
      return __async(this, null, function* () {
        var _a2;
        const recentConnectorId = yield (_a2 = config.storage) == null ? void 0 : _a2.getItem("recentConnectorId");
        if (recentConnectorId !== this.id)
          return false;
        const accounts = yield this.getAccounts();
        return !!accounts.length;
      });
    },
    switchChain(_0) {
      return __async(this, arguments, function* ({ chainId }) {
        try {
          const provider = yield this.getProvider();
          const id = numberToHex(chainId);
          const chain = config.chains.find((x) => x.id === chainId);
          const evmSupportMap = yield provider._blocto.supportNetworkList;
          const isBloctoSupportChain = evmSupportMap[`${chainId}`];
          if (!chain) {
            throw new SwitchChainError(new Error(`Chain not in config: ${id}`));
          }
          if (!isBloctoSupportChain) {
            throw new SwitchChainError(new Error(`Blocto unsupported chain: ${id}`));
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
          if (error.code === UserRejectedRequestError.code)
            throw new UserRejectedRequestError(error);
          throw new SwitchChainError(error);
        }
      });
    },
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    onAccountsChanged() {
    },
    onChainChanged(chainId) {
      return __async(this, null, function* () {
        const accounts = yield this.getAccounts();
        config.emitter.emit("change", {
          chainId: normalizeChainId(chainId),
          accounts
        });
      });
    },
    onDisconnect() {
      return __async(this, null, function* () {
        config.emitter.emit("disconnect");
      });
    }
  }));
}

export { blocto };
