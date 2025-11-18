import React from "react";
import { Colors } from "../../theme";
export interface Props {
    color?: keyof Colors;
    cakePriceUsd?: number;
    showSkeleton?: boolean;
    chainId: number;
}
declare const _default: React.NamedExoticComponent<React.PropsWithChildren<Props>>;
export default _default;
