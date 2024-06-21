import React, { FC } from "react";
import styles from "./homeCategory.module.scss";
import Image from "next/image";
import Link from "next/link";
import { mobileBanners } from "@/const/categoryImage";
import { desktopBanners } from "@/const/categoryImage";

const HomeCategory: FC = () => {
  return (
    <div className={styles.categoryContainer}>
      <div className={styles.mobileCategory}>
        {mobileBanners.map((mobileBanner, idx) => {
          return (
            <Link
              href={mobileBanner.link}
              className={styles.categoryItem}
              key={idx}
            >
              <Image
                src={mobileBanner.image}
                alt=""
                className={styles.image}
                width={100}
                height={100}
              />
            </Link>
          );
        })}
      </div>

      <div className={styles.desktopCategory}>
        {desktopBanners.map((desktopBanner, idx) => {
          return (
            <Link
              href={desktopBanner.link}
              className={`${styles.categoryItem} ${
                styles[desktopBanner.class]
              }`}
              key={idx}
            >
              <Image
                src={desktopBanner.image}
                alt=""
                className={styles.image}
                width={100}
                height={100}
              />
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default HomeCategory;
