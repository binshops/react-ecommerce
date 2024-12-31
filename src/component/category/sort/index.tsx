import React, { FC, useEffect, useRef } from "react";
import styles from "./sort.module.scss";
import { SortProps } from "./sort.types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";

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
    <div className={styles.sortWrapper} ref={divRef}>
      <div
        className={styles.activeItem}
        onClick={() => setShowSortOption(!showSortOption)}
      >
        <p className={styles.title}>{activeSort?.label}</p>
        <FontAwesomeIcon icon={faChevronDown} />
      </div>
      <div
        className={`${styles.sortOptions} ${showSortOption ? styles.show : ""}`}
      >
        {sortOptions?.map((item, index) => {
          return (
            <div
              onClick={() => setOrderQuery(item.querySort)}
              className={styles.item}
              key={index}
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
