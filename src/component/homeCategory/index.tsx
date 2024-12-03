import React, { FC } from "react";
import Link from "next/link";

import { mobileBanners } from "@/const/categoryImage";
import { desktopBanners } from "@/const/categoryImage";

import styles from "./homeCategory.module.scss";

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
              <img
                src={mobileBanner.image}
                alt={mobileBanner.title}
                className={styles.image}
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
              <img
                src={desktopBanner.image}
                alt={desktopBanner.title}
                className={styles.image}
              />
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default HomeCategory;
