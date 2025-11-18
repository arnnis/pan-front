import { BoxProps } from "../../components/Box";
import { ModalV2Props } from "../../widgets/Modal/ModalV2";
type DialogProps = ModalV2Props & BoxProps & {
    title?: string;
    message?: string;
    defaultValue?: string;
    confirmText?: string;
    cancelText?: string;
    useInput: boolean;
    onConfirm: ((value: string) => void) | ((value: boolean) => void);
};
export declare const Dialog: React.FC<DialogProps>;
export {};
