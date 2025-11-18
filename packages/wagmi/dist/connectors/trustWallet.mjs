import { __async } from '../chunk-V5LXLS2A.mjs';
import { getAddress } from 'viem';
import { createConnector, normalizeChainId } from 'wagmi';

function getTrustWalletProvider() {
  var _a, _b;
  const isTrustWallet = (ethereum) => {
    const trustWallet = !!ethereum.isTrust;
    return trustWallet;
  };
  const injectedProviderExist = typeof window !== "undefined" && window !== null && typeof window.ethereum !== "undefined" && window.ethereum !== null;
  if (!injectedProviderExist) {
    return;
  }
  if (isTrustWallet(window.ethereum)) {
    return window.ethereum;
  }
  let trustWalletProvider;
  if ((_b = (_a = window.ethereum) == null ? void 0 : _a.providers) == null ? void 0 : _b.length) {
    trustWalletProvider = window.ethereum.providers.find((provider) => provider && isTrustWallet(provider));
  }
  if (!trustWalletProvider) {
    trustWalletProvider = window.trustwallet;
  }
  return trustWalletProvider;
}
trustWalletConnect.type = "trustWalletConnect";
function trustWalletConnect() {
  let walletProvider;
  const handleConnectReset = () => {
    walletProvider = void 0;
  };
  return createConnector((config) => ({
    id: "trustWalletConnect",
    name: "TrustWallet",
    type: trustWalletConnect.type,
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
      return __async(this, null, function* () {
        if (!walletProvider) {
          walletProvider = getTrustWalletProvider();
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

export { getTrustWalletProvider, trustWalletConnect };
