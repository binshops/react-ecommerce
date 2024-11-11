import React, { FC, useState } from "react";
import styles from "./navigationBar.module.scss";
import Link from "next/link";
import { useMegaMenu } from "@/context/menuContext";
import { useScrollLock } from "@/utils/hooks/useScrollLock";
import Modal from "../modal";
import AccordionItem from "../accordionItem";
import { useCart } from "@/context/cartContext";
import CartContent from "../cartContent";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBars,
  faCartShopping,
  faHouse,
} from "@fortawesome/free-solid-svg-icons";

const NavigationBar: FC = () => {
  const { lockScroll, unlockScroll } = useScrollLock();
  const [openMenu, setOpenMenu] = useState(false);
  const [openCart, setOpenCart] = useState(false);
  const megaMenuContext = useMegaMenu();
  const menu = megaMenuContext?.menu;
  const { cart } = useCart();

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
            <FontAwesomeIcon icon={faBars} className={styles.icon}/>
          </div>
          <p>Menu</p>
        </div>
        <Link className={styles.navigationItem} href={"/"}>
          <div>
            <FontAwesomeIcon icon={faHouse} className={styles.icon} />
          </div>
          <p>Home</p>
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
          <p className={styles.cartItem}>Card</p>
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
