import React, { FC } from "react";
import styles from "./subscribe.module.scss";

const Subscribe: FC = () => {
  return (
    <div className={styles.subscribe}>
      <p className={styles.title}>Subscribe to Newsletters</p>
      <p className={styles.description}>
        Be aware of upcoming sales and events. Receive gifts and special offers!
      </p>
      <button className={styles.submit}>Subscribe</button>
    </div>
  );
};

export default Subscribe;
