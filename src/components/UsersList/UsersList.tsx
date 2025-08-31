import { useEffect, useState } from "react";
import { getUsers, type User } from "../../api/users.js";
import styles from "./  UsersList.module.scss";
import photoCover from "./photo-cover.svg";
import {Loader} from "../../pages/Home/Loader.js"
import React from 'react';

export function UsersList(props: { onReadyReset?: (fn: () => void) => void }) {
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);

  const load = async (p = 1, replace = false) => {
    setLoading(true);
    try {
      const data = await getUsers(p, 6);
      setTotalPages(data.total_pages);
      setUsers(prev => (replace ? data.users : [...prev, ...data.users]));
      setPage(p);
    } finally { setLoading(false); }
  };

  useEffect(() => {
    load(1, true);
    props.onReadyReset?.(() => load(1, true));
  }, []);

  const isLast = page >= totalPages;

  const isBadPhoto = (url?: string | null) =>
    !url ||
    url.trim() === "" ||
    url.includes("/placeholders/placeholder.png");

  return (
    <section id="users" className={styles.wrap}>
        {loading&& <Loader />}
      <h2 className={styles.title}>Working with GET request</h2>

      <div className={styles.grid}>
        {users.map(u => (
          <article key={u.id} className={styles.card}>
            <img
              src={isBadPhoto(u.photo) ? photoCover : (u.photo as string)}
              alt={u.name}
              width={70}
              height={70}
              loading="lazy"
              onError={(e) => {
                e.currentTarget.src = photoCover;
                e.currentTarget.onerror = null;
              }}
              style={{ objectFit: "cover", borderRadius: "50%" }}
            />
            <h3 title={u.name}>{u.name}</h3>
            <p title={u.position}>{u.position}</p>
            <p title={u.email}>{u.email}</p>
            <p title={u.phone}>{u.phone}</p>
          </article>
        ))}

        {!isLast && (
          <div className={styles.actions}>
            <button className="btn btn--primary" disabled={loading} onClick={() => load(page + 1)}>
              {loading ? "Loading..." : "Show more"}
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
