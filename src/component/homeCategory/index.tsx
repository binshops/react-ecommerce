import React, { FC } from "react";
import logo from "./../../../public/images/logo.png";
import styles from "./HomeCategory.module.scss";
import Image from "next/image";
import Link from "next/link";
import banner1 from "../../../public/images/home/category/banner1.jpg";
import banner2 from "../../../public/images/home/category/banner2.jpg";

const HomeCategory: FC = () => {
  return (
    <div className={styles.categoryContainer}>
      <Link href={"/"} className={styles.categoryItem}>
        <Image src={banner1} alt="" className={styles.image} />
      </Link>
      <Link href={"/"} className={styles.categoryItem}>
        <Image src={banner2} alt="" className={styles.image} />
      </Link>
    </div>
  );
};

export default HomeCategory;
