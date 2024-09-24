import React, { FC } from "react";
import styles from "./loading.module.scss";

const Loading: FC = () => {
  return (
    <div className={styles.loading}>
      <img
        src="/images/icon/loading.png"
        alt="loading"
        className={styles.icon}
      />
    </div>
  );
};

export default Loading;
