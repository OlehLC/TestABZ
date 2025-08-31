import { jsx as _jsx } from "react/jsx-runtime";
import styles from "./Loader.module.scss";
export function Loader() {
    return (_jsx("div", { className: styles.backdrop, children: _jsx("div", { className: styles.spinner }) }));
}
