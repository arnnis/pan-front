import React, { ReactElement } from "react";
import { LinkProps } from "./types";
interface ScanLinkProps extends Omit<LinkProps, "external" | "showExternalIcon"> {
    icon?: ReactElement;
    useBscCoinFallback?: boolean;
}
declare const ScanLink: React.FC<React.PropsWithChildren<ScanLinkProps>>;
export default ScanLink;
