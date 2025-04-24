import React, { FC, useEffect, useRef, useState } from "react";
import styles from "./languageSelector.module.scss";
import { useTranslation } from "react-i18next";
import { useRouter } from "next/router";
import { queryClient } from "@/const/queryClient";

const LanguageSelector: FC = () => {
  const [openLanguage, setOpenLanguage] = useState(false);
  const { i18n } = useTranslation();
  const divRef = useRef<HTMLDivElement | null>(null);

  const router = useRouter();
  const locale = router.locale;

  const handleClickOutside = (event: MouseEvent) => {
    if (divRef.current && !divRef.current.contains(event.target as Node)) {
      setOpenLanguage(false);
    }
  };

  const changeLanguage = (lng: string) => {
    if (i18n.language !== lng) {
      i18n.changeLanguage(lng);
      const { pathname, query } = router;
      router.push({ pathname, query }, undefined, { locale: lng });
      queryClient.invalidateQueries();
    }
    setOpenLanguage(false);
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    if (locale && i18n.language !== locale) {
      changeLanguage(locale);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [locale, i18n.language]);

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
