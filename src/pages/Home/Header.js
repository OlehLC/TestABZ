import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import styles from "./Header.module.scss";
import logo from "../../data/Logo.svg";
export function Header() {
    return (_jsx("header", { className: styles.header, children: _jsx("div", { className: "container", children: _jsxs("div", { className: styles.row, children: [_jsx("img", { className: "imgLogo", src: logo, alt: "LOGO", width: "150", height: "200" }), _jsxs("nav", { className: styles.nav, children: [_jsx("a", { className: "btn btn--primary", href: "#users", children: "Users" }), _jsx("a", { className: "btn btn--primary", href: "#signup", children: "Sign up" })] })] }) }) }));
}
