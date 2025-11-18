export interface MultiSelectorOptionsProps {
    id: number;
    label: string;
    value: any;
}
export interface MultiSelectorProps {
    pickMultiSelect: Array<number>;
    placeHolderText: string;
    onOptionChange: (data: Array<number>) => void;
    options: MultiSelectorOptionsProps[];
    closeDropdownWhenClickOption?: boolean;
}
declare const MultiSelector: React.FunctionComponent<React.PropsWithChildren<MultiSelectorProps>>;
export default MultiSelector;
