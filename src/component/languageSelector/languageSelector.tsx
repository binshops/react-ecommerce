import React, { FC, useState } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";

import styles from "./languageSelector.module.scss";
import { useTranslation } from "react-i18next";
import { useRouter } from "next/router";

const LanguageSelector: FC = () => {
  const [openLanguage, setOpenLanguage] = useState(false);
  const { i18n } = useTranslation();
  const router = useRouter();
  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
    const { pathname, query } = router;
    router.push({ pathname, query }, undefined, { locale: lng });
    setOpenLanguage(!openLanguage);
  };
  return (
    <div className={styles.languageBox}>
      <button
        onClick={() => setOpenLanguage(!openLanguage)}
        className={styles.lang}
      >
        {i18n.language === "en" ? <span> 🇬🇧 </span> : <span> 🇫🇷 </span>}
        <FontAwesomeIcon icon={faChevronDown} className={styles.icon} />
      </button>

      {openLanguage && (
        <div className={styles.languageList}>
          <div onClick={() => changeLanguage("fr")} className={styles.item}>
            French 🇫🇷
          </div>
          <div onClick={() => changeLanguage("en")} className={styles.item}>
            English 🇬🇧
          </div>
        </div>
      )}
    </div>
  );
};

export default LanguageSelector;
