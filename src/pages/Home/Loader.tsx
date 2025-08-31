import styles from "./Loader.module.scss";
import React from 'react';

export function Loader() {
  return (
    <div className={styles.backdrop}>
      <div className={styles.spinner}></div>
    </div>
  );
}
