import * as wagmi from 'wagmi';
import { EthereumProviderInterface } from '@blocto/sdk';

type BloctoParameters = {
    /**
     * Your app’s unique identifier that can be obtained at https://developers.blocto.app,
     * To get advanced features and support with Blocto.
     *
     * https://docs.blocto.app/blocto-sdk/register-app-id
     */
    appId?: string;
};
declare function blocto({ appId }?: BloctoParameters): wagmi.CreateConnectorFn<EthereumProviderInterface, {}, {
    store: any;
    'wagmi.recentConnectorId': string;
}>;
declare namespace blocto {
    var type: "blocto";
}

export { BloctoParameters, blocto };
