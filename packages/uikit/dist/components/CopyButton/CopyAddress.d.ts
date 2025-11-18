import { FlexProps } from "../Box";
interface CopyAddressProps extends FlexProps {
    account: string | undefined;
    tooltipMessage: string;
}
export declare const CopyAddress: React.FC<React.PropsWithChildren<CopyAddressProps>>;
export {};
