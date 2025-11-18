import { CanonicalBridgeProviderProps } from '@bnb-chain/canonical-bridge-widget';
export interface CanonicalBridgeProps {
    connectWalletButton: CanonicalBridgeProviderProps['connectWalletButton'];
    supportedChainIds: number[];
    rpcConfig: Record<number, string[]>;
}
export declare const CanonicalBridge: (props: CanonicalBridgeProps) => import("react/jsx-runtime").JSX.Element;
