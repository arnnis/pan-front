import { IOptionType, ISelectItem } from "./types";
export declare const BORDER_RADIUS = "16px";
export interface IAdaptiveInputForwardProps {
    clear: () => void;
    focus: () => void;
    value: () => string;
}
export interface ISearchBoxProps<T extends number | string> {
    selectedItems: IOptionType<T>;
    onFilter?: (text: string) => void;
    onClear: (e: React.MouseEvent<HTMLOrSVGElement>) => void;
    onLabelDelete: (e: React.MouseEvent<HTMLOrSVGElement> | React.KeyboardEvent, item: ISelectItem<T>) => void;
}
export interface ISearchBoxForwardProps {
    clear: () => void;
    focus: () => void;
}
declare const SearchBox: <T extends number | string>({ onFilter, selectedItems, onLabelDelete, onClear }: ISearchBoxProps<T>, ref: React.Ref<ISearchBoxForwardProps>) => import("react/jsx-runtime").JSX.Element;
declare const _default: <T extends string | number>(props: ISearchBoxProps<T> & {
    ref?: React.Ref<IAdaptiveInputForwardProps>;
}) => ReturnType<typeof SearchBox>;
export default _default;
