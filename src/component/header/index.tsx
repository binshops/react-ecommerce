import React, { FC } from "react";
import logo from "./../../../public/images/logo.png";
import styles from "./header.module.scss";
import Image from "next/image";
import Search from "../search";

const Header: FC = () => {
  return (
    <header className={styles.header}>
      <div className={styles.logoWrapper}>
        <Image src={logo} alt="logo" />
      </div>
      <Search />
    </header>
  );
};

export default Header;
