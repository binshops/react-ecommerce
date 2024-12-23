import React, { FC, useState } from "react";
import Link from "next/link";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";

import { useScrollLock } from "@/utils/hooks";
import { useCart } from "@/context/cartContext";

import Search from "../search";
import MegaMenu from "../megaMenu";
import CartContent from "../cartContent";
import LoadingIndicator from "../loadingIndicator";

import styles from "./header.module.scss";
import { useTranslation } from "react-i18next";
import { useRouter } from "next/router";

const Header: FC = () => {
  const { lockScroll } = useScrollLock();
  const [openCart, setOpenCart] = useState(false);
  const { cart } = useCart();
  const { i18n } = useTranslation();
  const router = useRouter();
  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
    const { pathname, query } = router;
    router.push({ pathname, query }, undefined, { locale: lng });
  };
  return (
    <header className={styles.header}>
      <div className={`${styles.headerContent} container`}>
        <div className={styles.logoWrapper}>
          <Link href={"/"}>
            <img src="/images/logo.png" alt="logo" />
          </Link>
        </div>
        <MegaMenu />
        <Search />
        <div className={styles.iconBox}>
          <div
            onClick={(e) => {
              e.preventDefault();
              setOpenCart(true);
              lockScroll();
            }}
          >
            <div className={styles.cartIcon}>
              {cart?.products?.length > 0 && (
                <div className={styles.badge}>
                  <span>{cart?.products?.length}</span>
                </div>
              )}
              <FontAwesomeIcon icon={faCartShopping} fontSize={20} />
            </div>
          </div>
          {i18n.language === "en" ? (
            <button
              onClick={() => changeLanguage("fr")}
              className={styles.lang}
            >
              French 🇫🇷
            </button>
          ) : (
            <button
              onClick={() => changeLanguage("en")}
              className={styles.lang}
            >
              English 🇬🇧
            </button>
          )}
        </div>
      </div>
      <CartContent isOpen={openCart} setIsOpen={setOpenCart} />
      <LoadingIndicator />
    </header>
  );
};

export default Header;
