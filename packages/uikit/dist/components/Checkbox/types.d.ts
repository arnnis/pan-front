import { PancakeTheme } from "../../theme";
export declare const scales: {
    readonly XS: "xs";
    readonly SM: "sm";
    readonly MD: "md";
};
export type Scales = (typeof scales)[keyof typeof scales];
export interface CheckboxProps {
    scale?: Scales | string;
    colors?: {
        background?: keyof PancakeTheme["colors"];
        checkedBackground?: keyof PancakeTheme["colors"];
        checkedColor?: keyof PancakeTheme["colors"];
        border?: keyof PancakeTheme["colors"];
    };
    indeterminate?: boolean;
}
