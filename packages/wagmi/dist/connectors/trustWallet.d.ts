import * as wagmi from 'wagmi';
import * as _walletconnect_ethereum_provider from '@walletconnect/ethereum-provider';

declare global {
    interface Window {
        trustwallet?: any;
        ethereum?: any;
    }
}
declare function getTrustWalletProvider(): any | undefined;
declare function trustWalletConnect(): wagmi.CreateConnectorFn<_walletconnect_ethereum_provider.default, {}, {
    store: any;
    'wagmi.recentConnectorId': string;
}>;
declare namespace trustWalletConnect {
    var type: "trustWalletConnect";
}

export { getTrustWalletProvider, trustWalletConnect };
