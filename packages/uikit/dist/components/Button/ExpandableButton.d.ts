import React from "react";
import { SpaceProps } from "styled-system";
export interface ExpandableButtonProps extends SpaceProps {
    onClick?: () => void;
    expanded?: boolean;
    iconColor?: string;
    iconSize?: string;
}
export declare const ExpandableButton: React.FC<React.PropsWithChildren<ExpandableButtonProps>>;
export declare const ExpandableLabel: React.FC<React.PropsWithChildren<ExpandableButtonProps>>;
