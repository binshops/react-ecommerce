import React, { FC } from "react";
import styles from "./categoryOptions.module.scss";
import { CategoryOptionsProps } from "../category.types";
import Sort from "../sort";
import Filter from "../filter";

const CategoryOptions: FC<CategoryOptionsProps> = ({
  filters,
  sortOptions,
  count,
  setCategory,
  categoryId,
  setIsLoading,
}) => {
  return (
    <div className={styles.optionsWrapper}>
      <Filter filters={filters} />
      <p className={styles.count}>{count} Items</p>
      <Sort
        sortOptions={sortOptions}
        setCategory={setCategory}
        categoryId={categoryId}
        setIsLoading={setIsLoading}
      />
    </div>
  );
};

export default CategoryOptions;
