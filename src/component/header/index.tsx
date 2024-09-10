import React, { FC } from "react";
import logo from "./../../../public/images/logo.png";
import styles from "./header.module.scss";
import Image from "next/image";
import Search from "../search";
import MegaMenu from "../megaMenu";
import Link from "next/link";

const Header: FC = () => {
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
    </header>
  );
};

export default Header;
