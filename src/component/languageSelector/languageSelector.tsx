import React, { FC, useEffect, useRef, useState } from "react";

import styles from "./languageSelector.module.scss";
import { useTranslation } from "react-i18next";
import { useRouter } from "next/router";

const LanguageSelector: FC = () => {
  const [openLanguage, setOpenLanguage] = useState(false);
  const { i18n } = useTranslation();
  const divRef = useRef<HTMLDivElement | null>(null);

  const router = useRouter();

  const handleClickOutside = (event: MouseEvent) => {
    if (divRef.current && !divRef.current.contains(event.target as Node)) {
      setOpenLanguage(false);
    }
  };

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
    const { pathname, query } = router;
    router.push({ pathname, query }, undefined, { locale: lng });
    setOpenLanguage(!openLanguage);
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  return (
    <div className={styles.languageBox}>
      <button
        onClick={() => setOpenLanguage(!openLanguage)}
        className={styles.lang}
      >
        {i18n.language === "en" ? <span> 🇬🇧 </span> : <span> 🇫🇷 </span>}
      </button>

      {openLanguage && (
        <div className={styles.languageList} ref={divRef}>
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
