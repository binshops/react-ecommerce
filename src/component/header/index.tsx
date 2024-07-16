import React, { FC } from "react";
import logo from "./../../../public/images/logo.png";
import styles from "./header.module.scss";
import Image from "next/image";
import Search from "../search";
import MegaMenu from "../megaMenu";
import { useCart } from "@/context/cartContext";
import Link from "next/link";

const Header: FC = () => {
  const { cart } = useCart();
  return (
    <header className={styles.header}>
      <div className={`${styles.headerContent} container`}>
        <div className={styles.logoWrapper}>
          <Link href={"/"}>
            <Image src={logo} alt="logo" />
          </Link>
        </div>
        <MegaMenu />
        <Search />
      </div>
      <div>
        <h1>Your Basket</h1>
        {cart.length > 0 ? (
          cart.map((item) => item.id)
        ) : (
          <p>Your basket is empty.</p>
        )}
        {/* Add buttons for actions like addToCart, updateQuantity, removeFromCart */}
      </div>
    </header>
  );
};

export default Header;
