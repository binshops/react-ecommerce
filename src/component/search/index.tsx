import React, { FC, useCallback, useEffect, useRef, useState } from "react";
import styles from "./search.module.scss";
import { getData } from "@/utils/fetchData";
import { ProductSearchAPI } from "@/const/endPoint";
import { debounce } from "@/utils/function";
import { SearchTransformer } from "@/utils/transformer/search";
import ProductCard from "../productCard";
import { SearchProduct } from "@/utils/type/search";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass, faXmark } from "@fortawesome/free-solid-svg-icons";

const Search: FC = () => {
  const [value, setValue] = useState("");
  const [results, setResults] = useState<SearchProduct>();
  const divRef = useRef<HTMLDivElement | null>(null);

  const [isOpen, setIsOpen] = useState(false);
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

  const handleClickOutside = (event: MouseEvent) => {
    if (divRef.current && !divRef.current.contains(event.target as Node)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    if (!isOpen) {
      setResults(undefined);
    }
  }, [isOpen]);

  useEffect(() => {
    if (value.length === 0) {
      setIsOpen(false);
    } else if (value.length >= 3) {
      setIsOpen(true);
    }
  }, [value]);

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
        {value.length === 0 ? (
          <FontAwesomeIcon icon={faMagnifyingGlass} className={styles.icon} />
        ) : (
          <FontAwesomeIcon
            icon={faXmark}
            className={styles.icon}
            onClick={() => setValue("")}
          />
        )}
      </div>
      <div
        className={`${styles.searchResult} ${
          isOpen && results && results?.searchProducts.length > 0
            ? styles.show
            : ""
        }`}
        ref={divRef}
      >
        {results?.searchProducts.map((item) => {
          return (
            <div onClick={() => setIsOpen(false)} key={item.id}>
              <ProductCard product={item} />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Search;
