import React, { FC, useState } from "react";
import Link from "next/link";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBars,
  faCartShopping,
  faHouse,
} from "@fortawesome/free-solid-svg-icons";
import { useTranslation } from "react-i18next";

import { useMegaMenu } from "@/context/menuContext";
import { useCart } from "@/context/cartContext";
import { useScrollLock } from "@/utils/hooks";

import AccordionItem from "../accordionItem";
import CartContent from "../cartContent";
import Modal from "../modal";

import styles from "./navigationBar.module.scss";

const NavigationBar: FC = () => {
  const { lockScroll, unlockScroll } = useScrollLock();
  const [openMenu, setOpenMenu] = useState(false);
  const [openCart, setOpenCart] = useState(false);
  const megaMenuContext = useMegaMenu();
  const { cart } = useCart();
  const { t } = useTranslation();

  const menu = megaMenuContext?.menu;

  return (
    <>
      <div className={styles.navigationBar}>
        <div
          className={styles.navigationItem}
          onClick={(e) => {
            e.preventDefault();
            setOpenMenu(true);
            lockScroll();
          }}
        >
          <div>
            <FontAwesomeIcon icon={faBars} className={styles.icon} />
          </div>
          <p>{t("navigation.menu")}</p>
        </div>
        <Link className={styles.navigationItem} href={"/"}>
          <div>
            <FontAwesomeIcon icon={faHouse} className={styles.icon} />
          </div>
          <p>{t("navigation.home")}</p>
        </Link>
        <div
          className={styles.navigationItem}
          onClick={(e) => {
            e.preventDefault();
            setOpenCart(true);
            lockScroll();
          }}
        >
          <div className={styles.cartImage}>
            {cart?.products?.length > 0 && <div className={styles.badge}></div>}
            <FontAwesomeIcon icon={faCartShopping} fontSize={20} color="#fff" />
          </div>
          <p className={styles.cartItem}>{t("navigation.card")}</p>
        </div>
      </div>
      <Modal
        isOpen={openMenu}
        onClose={() => {
          setOpenMenu(false);
          unlockScroll();
        }}
        isFullScreen
      >
        <div className={styles.modalContent}>
          {menu?.map((item) => {
            return (
              <AccordionItem
                title={item.label}
                links={item.children}
                titleLink={item.link}
                mode="dark"
                key={item.id}
              />
            );
          })}
        </div>
      </Modal>
      <CartContent isOpen={openCart} setIsOpen={setOpenCart} />
    </>
  );
};

export default NavigationBar;
