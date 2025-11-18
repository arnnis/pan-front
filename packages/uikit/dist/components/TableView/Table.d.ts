import { ISortOrder } from "./SortArrowButton";
export interface BasicDataType {
    [key: string]: any;
}
export interface IColumnsType<T extends BasicDataType> {
    title: React.ReactNode | (() => React.ReactNode);
    dataIndex: keyof T | null;
    key: React.Key;
    render?: (value: any, record: T, index: number) => React.ReactNode;
    sorter?: boolean;
    minWidth?: string;
    display?: boolean;
    clickable?: boolean;
}
export interface ITableViewProps<T extends BasicDataType> {
    getRowKey?: (item: T) => string;
    rowKey?: string;
    columns: IColumnsType<T>[];
    data: T[];
    onSort?: (parms: {
        dataIndex: IColumnsType<T>["dataIndex"];
        order: ISortOrder;
    }) => void;
    sortOrder?: ISortOrder;
    sortField?: IColumnsType<T>["dataIndex"];
    onRowClick?: (record: T, e: React.MouseEvent) => void;
}
export declare const TableView: <T extends BasicDataType>({ columns, data, rowKey, getRowKey: getRowKey_, onSort, sortOrder, sortField, onRowClick, }: ITableViewProps<T>) => import("react/jsx-runtime").JSX.Element;
