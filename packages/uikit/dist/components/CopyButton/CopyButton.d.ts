import { ElementType } from "react";
import { TooltipOptions } from "../../hooks";
import { SvgProps } from "../Svg";
interface CopyButtonProps extends SvgProps {
    text: string;
    tooltipMessage: string;
    defaultTooltipMessage?: string;
    tooltipPlacement?: TooltipOptions["placement"];
    buttonColor?: string;
    icon?: ElementType;
}
export declare const CopyButton: React.FC<React.PropsWithChildren<CopyButtonProps>>;
export {};
