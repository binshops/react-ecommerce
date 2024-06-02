import React, { FC, useCallback, useState } from "react";
import styles from "./search.module.scss";
import Image from "next/image";
import search from "./../../../public/images/icon/Search.png";
import { getData } from "@/utils/fetchData";
import { ProductSearchAPI } from "@/const/endPoint";
import { debounce } from "@/utils/function";
import { SearchTransformer } from "@/utils/transformer/search";
import { Product } from "@/utils/type";
import ProductCard from "../productCard";
import { SearchProduct } from "@/utils/type/search";

const Search: FC = () => {
  const [value, setValue] = useState("");
  const [results, setResults] = useState<SearchProduct>();

  const handleInputChange = useCallback(
    debounce(async (value) => {
      const data = getData(ProductSearchAPI)
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
      </div>
      <Image src={search} alt="searchIcon" className={styles.icon} />
      <div className={styles.searchResult}>
        {results?.searchProducts.map((item) => {
          return <ProductCard product={item} key={item.id} />;
        })}
      </div>
    </div>
  );
};

export default Search;
