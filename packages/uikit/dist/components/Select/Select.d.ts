import { BoxProps } from "../Box";
export interface SelectProps extends BoxProps {
    options: OptionProps[];
    onOptionChange?: (option: OptionProps) => void;
    placeHolderText?: string;
    defaultOptionIndex?: number;
}
export interface OptionProps {
    label: string;
    value: any;
    imageUrl?: string;
}
declare const Select: React.FunctionComponent<React.PropsWithChildren<SelectProps>>;
export default Select;
