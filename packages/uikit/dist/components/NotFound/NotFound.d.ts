import { JSXElementConstructor, ReactNode } from "react";
declare const NotFound: ({ statusCode, children, LinkComp, }: {
    LinkComp: JSXElementConstructor<any>;
    statusCode?: number;
    children: ReactNode;
}) => import("react/jsx-runtime").JSX.Element;
export default NotFound;
