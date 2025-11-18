import { Colors } from "../../theme";
export declare const StyledIconContainer: import("styled-components").IStyledComponent<"web", import("styled-components/dist/types").Substitute<import("react").DetailedHTMLProps<import("react").HTMLAttributes<HTMLDivElement>, HTMLDivElement>, {
    activeBackgroundColor?: keyof Colors;
}>>;
export declare const StyledAnimatedIconComponent: import("styled-components").IStyledComponent<"web", import("styled-components/dist/types").Substitute<Omit<import("react").DetailedHTMLProps<import("react").HTMLAttributes<HTMLDivElement>, HTMLDivElement>, "ref"> & {
    ref?: ((instance: HTMLDivElement | null) => void) | import("react").RefObject<HTMLDivElement> | null | undefined;
}, {
    isActive: boolean;
    height?: string;
    width?: string;
    hasFillIcon: boolean;
}>>;
