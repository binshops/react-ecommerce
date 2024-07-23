import React, { FC, useEffect, useState } from "react";
import styles from "./sort.module.scss";
import { SortProps } from "../category.types";
import arrow from "./../../../../public/images/icon/Chevron.png";
import Image from "next/image";
import { getData } from "@/utils/fetchData";
import { CategoryAPI } from "@/const/endPoint";
import { CategoryTransformer } from "@/utils/transformer/category";

const Sort: FC<SortProps> = ({
  sortOptions,
  setCategory,
  categoryId,
  setIsLoading,
}) => {
  const activeSort = sortOptions?.find((item) => item.isActive === true);
  const [orderQuery, setOrderQuery] = useState<string>();
  const [showOption, setOption] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const productData = await getData(CategoryAPI, {
          id_category: categoryId,
          page: 1,
          order: orderQuery,
        }).then(() => setIsLoading(false));
        const transformedData = CategoryTransformer(productData);
        setCategory(transformedData);
      } catch (error) {
        console.error("Failed to fetch product data:", error);
      }
    };
    orderQuery && fetchData();
    setOption(false);
  }, [orderQuery]);
  return (
    <div className={styles.sortWrapper}>
      <div className={styles.activeItem} onClick={() => setOption(!showOption)}>
        <p className={styles.title}>{activeSort?.label}</p>
        <Image src={arrow} alt="arrow" />
      </div>
      <div className={`${styles.sortOptions} ${showOption ? styles.show : ""}`}>
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
