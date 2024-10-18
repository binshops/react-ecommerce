import React, { FC, useEffect, useRef } from "react";
import styles from "./sort.module.scss";
import { SortProps } from "../category.types";

const Sort: FC<SortProps> = ({
  sortOptions,
  setOrderQuery,
  showSortOption,
  setShowSortOption,
}) => {
  const activeSort = sortOptions?.find((item) => item.isActive === true);

  const divRef = useRef<HTMLDivElement | null>(null);

  const handleClickOutside = (event: MouseEvent) => {
    if (divRef.current && !divRef.current.contains(event.target as Node)) {
      setShowSortOption(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className={styles.sortWrapper}>
      <div
        className={styles.activeItem}
        onClick={() => setShowSortOption(!showSortOption)}
      >
        <p className={styles.title}>{activeSort?.label}</p>
        <img src="/images/icon/Chevron.png" alt="arrow" />
      </div>
      <div
        className={`${styles.sortOptions} ${showSortOption ? styles.show : ""}`}
        ref={divRef}
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
