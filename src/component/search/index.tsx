import React, { FC, useCallback, useEffect, useRef, useState } from "react";
import { faMagnifyingGlass, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useTranslation } from "react-i18next";

import { SearchTransformer } from "@/utils/api/transformer/search";
import { getData } from "@/utils/api/fetchData/apiCall";
import { debounce } from "@/utils/function";

import { ProductSearchAPI } from "@/const/endPoint";

import ProductCard from "../productCard";

import { SearchProduct } from "./search.types";

import styles from "./search.module.scss";

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
  const { t } = useTranslation();

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
          placeholder={t("search.placeHolder")}
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
