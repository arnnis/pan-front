import { BoxProps } from "../Box";
interface CollapseProps extends Omit<BoxProps, "title" | "content"> {
    title?: React.ReactNode;
    content?: React.ReactNode;
    isOpen?: boolean;
    onToggle?: () => void;
    recalculateDep?: boolean;
    titleBoxProps?: BoxProps;
    contentBoxProps?: BoxProps;
    contentExtendableMaxHeight?: number;
}
export declare const Collapse: React.FC<CollapseProps>;
export {};
