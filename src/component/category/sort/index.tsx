import React, { FC } from "react";
import styles from "./sort.module.scss";
import { SortProps } from "../category.types";
import arrow from "./../../../../public/images/icon/Chevron.png";
import Image from "next/image";

const Sort: FC<SortProps> = ({
  sortOptions,
  setOrderQuery,
  showSortOption,
  setShowSortOption,
}) => {
  const activeSort = sortOptions?.find((item) => item.isActive === true);

  return (
    <div className={styles.sortWrapper}>
      <div
        className={styles.activeItem}
        onClick={() => setShowSortOption(!showSortOption)}
      >
        <p className={styles.title}>{activeSort?.label}</p>
        <Image src={arrow} alt="arrow" />
      </div>
      <div
        className={`${styles.sortOptions} ${showSortOption ? styles.show : ""}`}
      >
        {sortOptions.map((item, index) => {
          return (
            <div
              onClick={() => setOrderQuery(item.querySort)}
              key={index}
              className={styles.item}
            >
              <p>{item.label}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Sort;
