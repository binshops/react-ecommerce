import React, { FC, useState } from "react";
import styles from "./header.module.scss";
import Search from "../search";
import MegaMenu from "../megaMenu";
import Link from "next/link";
import { useScrollLock } from "@/utils/hooks";
import CartContent from "../cartContent";
import { useCart } from "@/context/cartContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
import LoadingIndicator from "../loadingIndicator";

const Header: FC = () => {
  const { lockScroll } = useScrollLock();
  const [openCart, setOpenCart] = useState(false);
  const { cart } = useCart();

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
        </div>
      </div>
      <CartContent isOpen={openCart} setIsOpen={setOpenCart} />
      <LoadingIndicator />
    </header>
  );
};

export default Header;
