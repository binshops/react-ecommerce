import React, { FC } from "react";
import styles from "./navigationBar.module.scss";
import Image from "next/image";
import Link from "next/link";
import { navigationItems } from "@/const/navigationBar";

const NavigationBar: FC = () => {
  return (
    <div className={styles.navigationBar}>
      {navigationItems.map((item, idx) => {
        return (
          <Link className={styles.navigationItem} href={item.link} key={idx}>
            <Image src={item.icon} alt={item.text} className={styles.image} />
            <p>{item.text}</p>
          </Link>
        );
      })}
    </div>
  );
};

export default NavigationBar;
