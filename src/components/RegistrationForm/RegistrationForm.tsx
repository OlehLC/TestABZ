import { useEffect, useState } from "react";
import { createUser, getPositions, type Position } from "../../api/users.js";
import { regSchema } from "../../ utils/validation.js";
import { validateImage } from "../../ utils/  image.js";
import styles from "./ RegistrationForm.module.scss";
import successImg from "../../data/success-image.svg";
import {Loader} from "../../pages/Home/Loader.js"
import React from 'react';

export function RegistrationForm({ onSuccess }: { onSuccess: () => void }) {
  const [positions, setPositions] = useState<Position[]>([]);
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    position_id: 0,
    photo: undefined as File | undefined
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);
  const [fileName, setFileName] = useState("Upload your photo");
  const [success, setSuccess] = useState(false);

  useEffect(() => { getPositions().then(setPositions); }, []);
  const set = (k: keyof typeof form, v: any) => setForm(prev => ({ ...prev, [k]: v }));

  const validate = async () => {
    const parsed = regSchema.safeParse({ ...form, position_id: Number(form.position_id) });
    if (!parsed.success) {
      const map: Record<string, string> = {};
      parsed.error.issues.forEach(i => (map[String(i.path[0])] = i.message));
      setErrors(map);
      return false;
    }
    if (form.photo) await validateImage(form.photo);
    setErrors({});
    return true;
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!(await validate())) return;
    setSubmitting(true);
    try {
      await createUser({
        name: form.name,
        email: form.email,
        phone: form.phone,
        position_id: Number(form.position_id),
        photo: form.photo!,
      });
      onSuccess?.();
      setSuccess(true);
      setFileName("Upload your photo");
      setForm({ name: "", email: "", phone: "", position_id: 0, photo: undefined }); // очистити форму
    } catch (err: any) {
      setErrors({ form: err?.response?.data?.message ?? "Submission error" });
    } finally {
      setSubmitting(false);
    }
  };


  const hasErrors = !!errors.name || !!errors.email || !!errors.phone ||
                    !!errors.position_id || !!errors.photo || !!errors.form;

  const requiredFilled =
    form.name.trim().length > 0 &&
    form.email.trim().length > 0 &&
    form.phone.trim().length > 0 &&
    Number(form.position_id) > 0 &&
    !!form.photo;

  const isValid = requiredFilled && !hasErrors;

  return (
    <section id="signup" className={styles.wrap}>
        {submitting&& <Loader />}
      <div className={styles.container3}>
        <h2 className={styles.title}>Working with POST request</h2>

        {success ? (
          <div className={styles.successBox}>
            <p>User successfully registered</p>
            <img className={styles.successImg} src={successImg} loading="lazy" alt="Success" width="400" height="300"/>
          </div>
        ) : (
          <form className={styles.form} onSubmit={submit} noValidate>
           {/* Name */}
<div className={[
  styles.field,
  form.name ? styles.isFilled : "",
  errors.name ? styles.isError : ""
].join(" ")}>
  <div className={styles.control}>
    <input
      type="text"
      value={form.name}
      onChange={(e) => set("name", e.target.value)}
      required
      placeholder=" "
      aria-invalid={!!errors.name}
    />
    <label>Name</label>
  </div>
  {errors.name
    ? <small className="error">{errors.name}</small>
    : <small className="helper">Enter your name</small>}
</div>

{/* Email */}
<div className={[
  styles.field,
  form.email ? styles.isFilled : "",
  errors.email ? styles.isError : ""
].join(" ")}>
  <div className={styles.control}>
    <input
      type="email"
      value={form.email}
      onChange={(e) => set("email", e.target.value)}
      required
      placeholder=" "
      aria-invalid={!!errors.email}
    />
    <label>Email</label>
  </div>
  {errors.email
    ? <small className="error">{errors.email}</small>
    : <small className="helper">Enter your email</small>}
</div>

{/* Phone */}
<div className={[
  styles.field,
  form.phone ? styles.isFilled : "",
  errors.phone ? styles.isError : ""
].join(" ")}>
  <div className={styles.control}>
    <input
      type="tel"
      value={form.phone}
      onChange={(e) => set("phone", e.target.value)}
      required
      placeholder=" "
      aria-invalid={!!errors.phone}
      // за потреби: pattern="+380[0-9]{9}"
    />
    <label>Phone</label>
  </div>
  {errors.phone
    ? <small className="error">{errors.phone}</small>
    : <small className="helper">+38 (XXX) XXX XX XX</small>}
</div>

            {/* Positions */}
            <div className={styles.field}>
              <label>Select your position</label>
              <div className={styles.radios} role="radiogroup" aria-invalid={!!errors.position_id}>
                {positions.map(p => (
                  <label key={p.id}>
                    <input
                      type="radio"
                      name="position"
                      value={p.id}
                      checked={Number(form.position_id) === p.id}
                      onChange={() => set("position_id", p.id)}
                    />
                    {p.name}
                  </label>
                ))}
              </div>
              {errors.position_id && <small>{errors.position_id}</small>}
            </div>

            {/* Upload */}
            <div className={styles.field}>
              <div className={styles.uploadRow}>
                <button type="button" onClick={() => document.getElementById("photo-input")?.click()}>
                  Upload
                </button>
                <div className={styles.fileName}>{form.photo ? fileName : "Upload your photo"}</div>
              </div>
              <input
                id="photo-input"
                type="file"
                accept="image/jpeg,image/jpg"
                hidden
                onChange={e => {
                  const f = e.target.files?.[0];
                  if (f) { set("photo", f); setFileName(f.name); }
                }}
              />
              {errors.photo && <small>{errors.photo}</small>}
              {errors.form && <small>{errors.form}</small>}
            </div>

            {/* Submit */}
            <div className={styles.submit}>
              <button
                className={`btn ${isValid? "btn--primary" : "btn--disabled"}`}
                disabled={!isValid }
              >
                {submitting ? "Submitting..." : "Sign up"}
              </button>
            </div>
          </form>
        )}
      </div>
    </section>
  );
}
