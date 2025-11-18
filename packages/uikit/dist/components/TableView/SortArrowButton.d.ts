import { ButtonProps } from "../Button";
export declare enum SORT_ORDER {
    NULL = 0,
    ASC = 1,
    DESC = -1
}
export type ISortOrder = SORT_ORDER.NULL | SORT_ORDER.ASC | SORT_ORDER.DESC;
type ISortArrowButton = ButtonProps & {
    width?: string;
    height?: string;
    onSort?: (sortOrder: ISortOrder) => void;
    sortOrder?: ISortOrder;
    onlyDESC?: boolean;
};
export declare const SortArrowButton: (props: ISortArrowButton) => import("react/jsx-runtime").JSX.Element;
export {};
