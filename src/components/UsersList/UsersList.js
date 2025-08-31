import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from "react";
import { getUsers } from "../../api/users.js";
import styles from "./  UsersList.module.scss";
import photoCover from "./photo-cover.svg";
import { Loader } from "../../pages/Home/Loader.js";
export function UsersList(props) {
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(false);
    const load = async (p = 1, replace = false) => {
        setLoading(true);
        try {
            const data = await getUsers(p, 6);
            setTotalPages(data.total_pages);
            setUsers(prev => (replace ? data.users : [...prev, ...data.users]));
            setPage(p);
        }
        finally {
            setLoading(false);
        }
    };
    useEffect(() => {
        load(1, true);
        props.onReadyReset?.(() => load(1, true));
    }, []);
    const isLast = page >= totalPages;
    const isBadPhoto = (url) => !url ||
        url.trim() === "" ||
        url.includes("/placeholders/placeholder.png");
    return (_jsxs("section", { id: "users", className: styles.wrap, children: [loading && _jsx(Loader, {}), _jsx("h2", { className: styles.title, children: "Working with GET request" }), _jsxs("div", { className: styles.grid, children: [users.map(u => (_jsxs("article", { className: styles.card, children: [_jsx("img", { src: isBadPhoto(u.photo) ? photoCover : u.photo, alt: u.name, width: 70, height: 70, loading: "lazy", onError: (e) => {
                                    e.currentTarget.src = photoCover;
                                    e.currentTarget.onerror = null;
                                }, style: { objectFit: "cover", borderRadius: "50%" } }), _jsx("h3", { title: u.name, children: u.name }), _jsx("p", { title: u.position, children: u.position }), _jsx("p", { title: u.email, children: u.email }), _jsx("p", { title: u.phone, children: u.phone })] }, u.id))), !isLast && (_jsx("div", { className: styles.actions, children: _jsx("button", { className: "btn btn--primary", disabled: loading, onClick: () => load(page + 1), children: loading ? "Loading..." : "Show more" }) }))] })] }));
}
