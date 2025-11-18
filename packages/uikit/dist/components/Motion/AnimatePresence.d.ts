import { AnimatePresenceProps, LazyProps, domAnimation } from "framer-motion";
import { FC } from "react";
declare const LazyAnimatePresence: FC<React.PropsWithChildren<LazyProps & AnimatePresenceProps>>;
export { domAnimation };
export default LazyAnimatePresence;
