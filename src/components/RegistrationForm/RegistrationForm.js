import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from "react";
import { createUser, getPositions } from "../../api/users.js";
import { regSchema } from "../../ utils/validation.js";
import { validateImage } from "../../ utils/  image.js";
import styles from "./ RegistrationForm.module.scss";
import successImg from "../../data/success-image.svg";
import { Loader } from "../../pages/Home/Loader.js";
export function RegistrationForm({ onSuccess }) {
    const [positions, setPositions] = useState([]);
    const [form, setForm] = useState({
        name: "",
        email: "",
        phone: "",
        position_id: 0,
        photo: undefined
    });
    const [errors, setErrors] = useState({});
    const [submitting, setSubmitting] = useState(false);
    const [fileName, setFileName] = useState("Upload your photo");
    const [success, setSuccess] = useState(false);
    useEffect(() => { getPositions().then(setPositions); }, []);
    const set = (k, v) => setForm(prev => ({ ...prev, [k]: v }));
    const validate = async () => {
        const parsed = regSchema.safeParse({ ...form, position_id: Number(form.position_id) });
        if (!parsed.success) {
            const map = {};
            parsed.error.issues.forEach(i => (map[String(i.path[0])] = i.message));
            setErrors(map);
            return false;
        }
        if (form.photo)
            await validateImage(form.photo);
        setErrors({});
        return true;
    };
    const submit = async (e) => {
        e.preventDefault();
        if (!(await validate()))
            return;
        setSubmitting(true);
        try {
            await createUser({
                name: form.name,
                email: form.email,
                phone: form.phone,
                position_id: Number(form.position_id),
                photo: form.photo,
            });
            onSuccess?.();
            setSuccess(true);
            setFileName("Upload your photo");
            setForm({ name: "", email: "", phone: "", position_id: 0, photo: undefined }); // очистити форму
        }
        catch (err) {
            setErrors({ form: err?.response?.data?.message ?? "Submission error" });
        }
        finally {
            setSubmitting(false);
        }
    };
    const hasErrors = !!errors.name || !!errors.email || !!errors.phone ||
        !!errors.position_id || !!errors.photo || !!errors.form;
    const requiredFilled = form.name.trim().length > 0 &&
        form.email.trim().length > 0 &&
        form.phone.trim().length > 0 &&
        Number(form.position_id) > 0 &&
        !!form.photo;
    const isValid = requiredFilled && !hasErrors;
    return (_jsxs("section", { id: "signup", className: styles.wrap, children: [submitting && _jsx(Loader, {}), _jsxs("div", { className: styles.container3, children: [_jsx("h2", { className: styles.title, children: "Working with POST request" }), success ? (_jsxs("div", { className: styles.successBox, children: [_jsx("p", { children: "User successfully registered" }), _jsx("img", { className: styles.successImg, src: successImg, loading: "lazy", alt: "Success", width: "400", height: "300" })] })) : (_jsxs("form", { className: styles.form, onSubmit: submit, noValidate: true, children: [_jsxs("div", { className: [
                                    styles.field,
                                    form.name ? styles.isFilled : "",
                                    errors.name ? styles.isError : ""
                                ].join(" "), children: [_jsxs("div", { className: styles.control, children: [_jsx("input", { type: "text", value: form.name, onChange: (e) => set("name", e.target.value), required: true, placeholder: " ", "aria-invalid": !!errors.name }), _jsx("label", { children: "Name" })] }), errors.name
                                        ? _jsx("small", { className: "error", children: errors.name })
                                        : _jsx("small", { className: "helper", children: "Enter your name" })] }), _jsxs("div", { className: [
                                    styles.field,
                                    form.email ? styles.isFilled : "",
                                    errors.email ? styles.isError : ""
                                ].join(" "), children: [_jsxs("div", { className: styles.control, children: [_jsx("input", { type: "email", value: form.email, onChange: (e) => set("email", e.target.value), required: true, placeholder: " ", "aria-invalid": !!errors.email }), _jsx("label", { children: "Email" })] }), errors.email
                                        ? _jsx("small", { className: "error", children: errors.email })
                                        : _jsx("small", { className: "helper", children: "Enter your email" })] }), _jsxs("div", { className: [
                                    styles.field,
                                    form.phone ? styles.isFilled : "",
                                    errors.phone ? styles.isError : ""
                                ].join(" "), children: [_jsxs("div", { className: styles.control, children: [_jsx("input", { type: "tel", value: form.phone, onChange: (e) => set("phone", e.target.value), required: true, placeholder: " ", "aria-invalid": !!errors.phone }), _jsx("label", { children: "Phone" })] }), errors.phone
                                        ? _jsx("small", { className: "error", children: errors.phone })
                                        : _jsx("small", { className: "helper", children: "+38 (XXX) XXX XX XX" })] }), _jsxs("div", { className: styles.field, children: [_jsx("label", { children: "Select your position" }), _jsx("div", { className: styles.radios, role: "radiogroup", "aria-invalid": !!errors.position_id, children: positions.map(p => (_jsxs("label", { children: [_jsx("input", { type: "radio", name: "position", value: p.id, checked: Number(form.position_id) === p.id, onChange: () => set("position_id", p.id) }), p.name] }, p.id))) }), errors.position_id && _jsx("small", { children: errors.position_id })] }), _jsxs("div", { className: styles.field, children: [_jsxs("div", { className: styles.uploadRow, children: [_jsx("button", { type: "button", onClick: () => document.getElementById("photo-input")?.click(), children: "Upload" }), _jsx("div", { className: styles.fileName, children: form.photo ? fileName : "Upload your photo" })] }), _jsx("input", { id: "photo-input", type: "file", accept: "image/jpeg,image/jpg", hidden: true, onChange: e => {
                                            const f = e.target.files?.[0];
                                            if (f) {
                                                set("photo", f);
                                                setFileName(f.name);
                                            }
                                        } }), errors.photo && _jsx("small", { children: errors.photo }), errors.form && _jsx("small", { children: errors.form })] }), _jsx("div", { className: styles.submit, children: _jsx("button", { className: `btn ${isValid ? "btn--primary" : "btn--disabled"}`, disabled: !isValid, children: submitting ? "Submitting..." : "Sign up" }) })] }))] })] }));
}
