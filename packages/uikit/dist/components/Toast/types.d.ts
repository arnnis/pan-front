import { ReactNode } from "react";
export declare const types: {
    SUCCESS: string;
    DANGER: string;
    WARNING: string;
    INFO: string;
};
export type Types = (typeof types)[keyof typeof types];
export interface ToastData {
    id: string | number;
    type: Types;
    title: string;
    description?: ReactNode;
}
export interface ToastProps {
    toast: ToastData;
    onRemove: (id: string | number) => void;
}
