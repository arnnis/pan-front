export type PromptFn = (params: {
    title?: string;
    message?: string;
    defaultValue?: string;
    onConfirm: (value: string) => void;
}) => void;
export type ConfirmFn = (params: {
    title?: string;
    message?: string;
    onConfirm: (value: boolean) => void;
}) => void;
export type DialogOptions = {
    title?: string;
    message?: string;
    defaultValue?: string;
    placeholder?: string;
    confirmText?: string;
    cancelText?: string;
    onConfirm: Parameters<PromptFn>[0]["onConfirm"] | Parameters<ConfirmFn>[0]["onConfirm"];
    useInput: boolean;
};
type DialogContext = {
    prompt: PromptFn;
    confirm: ConfirmFn;
    options: DialogOptions;
    isOpen: boolean;
    onOpen: () => void;
    onDismiss: () => void;
};
export declare const Context: import("react").Context<DialogContext>;
export declare const DialogProvider: React.FC<React.PropsWithChildren>;
export declare const useDialogContext: () => DialogContext;
export declare const useDialogOptions: () => {
    isOpen: boolean;
    onOpen: () => void;
    onDismiss: () => void;
    title?: string;
    message?: string;
    defaultValue?: string;
    placeholder?: string;
    confirmText?: string;
    cancelText?: string;
    onConfirm: Parameters<PromptFn>[0]["onConfirm"] | Parameters<ConfirmFn>[0]["onConfirm"];
    useInput: boolean;
};
export declare const DialogGlobal: () => import("react/jsx-runtime").JSX.Element;
export {};
