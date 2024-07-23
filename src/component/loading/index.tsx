import React, { FC } from "react";
import styles from "./loading.module.scss";
import loadingIcon from "./../../../public/images/icon/loading.png";
import Image from "next/image";

const Loading: FC = () => {
  return (
    <div className={styles.loading}>
      <Image src={loadingIcon} alt="loading" className={styles.icon} />
    </div>
  );
};

export default Loading;
