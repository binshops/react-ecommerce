import React, { FC, useCallback, useState } from "react";
import styles from "./search.module.scss";
import { getData } from "@/utils/fetchData";
import { ProductSearchAPI } from "@/const/endPoint";
import { debounce } from "@/utils/function";
import { SearchTransformer } from "@/utils/transformer/search";
import ProductCard from "../productCard";
import { SearchProduct } from "@/utils/type/search";

const Search: FC = () => {
  const [value, setValue] = useState("");
  const [results, setResults] = useState<SearchProduct>();

  const handleInputChange = useCallback(
    debounce(async (value) => {
      getData(ProductSearchAPI, { s: value, resultsPerPage: 10 })
        .then((data) => {
          const products = SearchTransformer(data);
          setResults(products);
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
        });
    }, 500),
    []
  );
  return (
    <div className={styles.searchBox}>
      <div className={styles.searchInput}>
        <input
          type="text"
          placeholder="Search for items"
          value={value}
          onChange={(e) => {
            setValue(e.target.value);
            handleInputChange(e.target.value);
          }}
        />
        <img
          src="/images/icon/Search.png"
          alt="searchIcon"
          className={styles.icon}
        />
      </div>
      <div className={styles.searchResult}>
        {value.length >= 3 &&
          results?.searchProducts.map((item) => {
            return <ProductCard product={item} key={item.id} />;
          })}
      </div>
    </div>
  );
};

export default Search;
