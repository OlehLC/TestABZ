import styles from "./Header.module.scss";
import logo from "../../data/Logo.svg"
import React from 'react';

export function Header() {
  return (
    <header className={styles.header}>
      <div className="container">
        <div className={styles.row}>
            <img className="imgLogo" src={logo} alt="LOGO" width="150" height="200" />
          <nav className={styles.nav}>
            <a className="btn btn--primary" href="#users">Users</a>
            <a className="btn btn--primary" href="#signup">Sign up</a>
          </nav>
        </div>
      </div>
    </header>
  );
}
