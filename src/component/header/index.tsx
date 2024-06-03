import React, { FC } from "react";
import logo from "./../../../public/images/logo.png";
import styles from "./header.module.scss";
import Image from "next/image";
import Search from "../search";
import MegaMenu from "../megaMenu";

const Header: FC = () => {
  return (
    <header className={styles.header}>
      <div className={`${styles.headerContent} container`}>
        <div className={styles.logoWrapper}>
          <Image src={logo} alt="logo" />
        </div>
        <MegaMenu />
        <Search />
      </div>
    </header>
  );
};

export default Header;
