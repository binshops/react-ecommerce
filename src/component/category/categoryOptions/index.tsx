import React, { FC, useState } from "react";
import { useTranslation } from "react-i18next";

import { CategoryOptionsProps } from "./categoryOptions.types";
import Sort from "../sort";
import Filter from "../filter";

import styles from "./categoryOptions.module.scss";

const CategoryOptions: FC<CategoryOptionsProps> = ({
  filters,
  sortOptions,
  count,
  setFilterQuery,
  setOrderQuery,
}) => {
  const [isOpenFilter, setIsOpenFilter] = useState(false);
  const [showSortOption, setShowSortOption] = useState(false);
  const { t } = useTranslation();

  return (
    <div className={styles.optionsWrapper}>
      <Filter
        filters={filters}
        setFilterQuery={setFilterQuery}
        isOpenFilter={isOpenFilter}
        setIsOpenFilter={setIsOpenFilter}
      />
      <p className={styles.count}>
        {count} {t("category.items")}
      </p>
      <Sort
        sortOptions={sortOptions}
        setOrderQuery={setOrderQuery}
        showSortOption={showSortOption}
        setShowSortOption={setShowSortOption}
      />
    </div>
  );
};

export default CategoryOptions;
