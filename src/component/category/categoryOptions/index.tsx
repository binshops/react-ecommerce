import React, { FC, useEffect, useState } from "react";
import styles from "./categoryOptions.module.scss";
import { CategoryOptionsProps } from "../category.types";
import Sort from "../sort";
import Filter from "../filter";
import { CategoryAPI } from "@/const/endPoint";
import { CategoryTransformer } from "@/utils/api/transformer/category";
import { getData } from "@/utils/api/fetchData/apiCall";

const CategoryOptions: FC<CategoryOptionsProps> = ({
  filters,
  sortOptions,
  count,
  setCategory,
  categoryId,
  setIsLoading,
  activeSort,
  activeFilter,
}) => {
  const [filterQuery, setFilterQuery] = useState();
  const [orderQuery, setOrderQuery] = useState<string | undefined>();
  const [isOpenFilter, setIsOpenFilter] = useState(false);
  const [showSortOption, setShowSortOption] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const productData = await getData(CategoryAPI, {
          id_category: categoryId,
          page: 1,
          q: filterQuery || activeFilter.replace("+", " "),
          order: orderQuery || activeSort,
        });
        const transformedData = CategoryTransformer(productData);
        setCategory(transformedData);
        setIsLoading(false);
      } catch (error) {
        console.error("Failed to fetch product data:", error);
      }
    };
    (orderQuery || filterQuery) && fetchData();
    setShowSortOption(false);
    setIsOpenFilter(false);
  }, [orderQuery, filterQuery]);

  return (
    <div className={styles.optionsWrapper}>
      <Filter
        filters={filters}
        setFilterQuery={setFilterQuery}
        isOpenFilter={isOpenFilter}
        setIsOpenFilter={setIsOpenFilter}
      />
      <p className={styles.count}>{count} Item(s)</p>
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
