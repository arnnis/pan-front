export type FeeTierProps = {
    type: string;
    fee: number;
    denominator?: number;
    dynamic?: boolean;
};
export declare const FeeTier: import("react").ForwardRefExoticComponent<FeeTierProps & import("react").RefAttributes<HTMLSpanElement>>;
