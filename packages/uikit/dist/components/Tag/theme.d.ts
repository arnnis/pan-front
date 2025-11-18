export declare const scaleVariants: {
    md: {
        height: string;
        padding: string;
        fontSize: string;
    };
    sm: {
        height: string;
        padding: string;
        fontSize: string;
    };
};
interface IStyleVariantsProps {
    backgroundColor?: string;
    bg?: string;
    color?: string;
    border?: string;
    borderColor?: string;
}
export declare const styleVariants: {
    [key: string]: IStyleVariantsProps;
};
export {};
