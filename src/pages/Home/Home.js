import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import { Header } from "../../pages/Home/Header.js";
import { Hero } from "../../pages/Home/Hero.js";
import { UsersList } from "../../components/UsersList/UsersList.js";
import { RegistrationForm } from "../../components/RegistrationForm/RegistrationForm.js";
import { useRef } from "react";
export default function Home() {
    const resetRef = useRef(null);
    return (_jsxs(_Fragment, { children: [_jsx(Header, {}), _jsx(Hero, {}), _jsx(UsersList, { onReadyReset: (fn) => (resetRef.current = fn) }), _jsx(RegistrationForm, { onSuccess: () => resetRef.current?.() })] }));
}
