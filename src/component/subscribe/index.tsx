import React, { FC } from "react";
import styles from "./subscribe.module.scss";
import { useTranslation } from "react-i18next";

const Subscribe: FC = () => {
  const { t } = useTranslation();

  return (
    <div className={styles.subscribe}>
      <div>
        <p className={styles.title}>{t("subscribe.title")}</p>
        <p className={styles.description}>{t("subscribe.description")}</p>
      </div>
      <button className={styles.submit}>{t("subscribe.submit")}</button>
    </div>
  );
};

export default Subscribe;
