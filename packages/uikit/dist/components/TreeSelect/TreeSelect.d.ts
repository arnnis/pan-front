import { TreeSelectProps } from "primereact/treeselect";
import type { TreeNode } from "primereact/treenode";
export interface ITreeSelectProps extends TreeSelectProps {
    data?: TreeNode[];
}
export declare const TreeSelect: (props: ITreeSelectProps) => import("react/jsx-runtime").JSX.Element;
