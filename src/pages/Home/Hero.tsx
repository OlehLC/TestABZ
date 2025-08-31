import styles from "./Hero.module.scss";
import React from 'react';

export function Hero() {
  return (
    <section className={styles.hero}>
      <div className={styles.overlay} />
      <div className="container1">
        <div className={styles.box}>
          <h1 className={styles.title}>Test assignment for <br/>front-end developer</h1>
          <p className={styles.lead}>
            What defines a good front-end developer is one that has skilled knowledge of HTML, CSS, JS with a vast
            understanding of User design thinking as they'll be building web interfaces with accessibility in mind.
            They should also be excited to learn, as the world of Front-End Development keeps evolving.
          </p>
          <a href="#signup" className="btn btn--primary">Sign up</a>
        </div>
      </div>
    </section>
  );
}


