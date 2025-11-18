import { type ReactNode } from "react";
import { TextProps } from "./types";
type SkeletonTextProps = {
    loading: boolean;
    initialWidth: number;
    initialHeight?: number;
    color?: string;
    children: ReactNode;
};
declare const SkeletonText: ({ loading, initialWidth, initialHeight, children, ...props }: TextProps & SkeletonTextProps) => import("react/jsx-runtime").JSX.Element;
export default SkeletonText;
