import { BoxProps } from "../Box";
import { PageHeaderProps } from "./types";
declare const PageHeader: React.FC<React.PropsWithChildren<PageHeaderProps & {
    innerProps?: BoxProps;
}>>;
export default PageHeader;
