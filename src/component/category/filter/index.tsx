import React, { FC, useEffect, useState } from "react";
import styles from "./filter.module.scss";
import Modal from "@/component/modal";
import CheckBox from "./checkBox";
import { FilterProps } from "@/utils/type/category";
import { useScrollLock } from "@/utils/hooks/useScrollLock";
import useWindowSize from "@/utils/hooks/useWindowSize";

const Filter: FC<FilterProps> = ({
  filters,
  setFilterQuery,
  isOpenFilter,
  setIsOpenFilter,
}) => {
  const { lockScroll, unlockScroll } = useScrollLock();
  const { width } = useWindowSize();
  const isDeskTop = width > 768;
  return (
    <>
      <div
        className={styles.filterWrapper}
        onClick={() => {
          setIsOpenFilter(true);
          lockScroll();
        }}
      >
        <img src="/images/icon/Filter.png" alt="filterIcon" />
        <p className={styles.title}>Filters</p>
      </div>
      <Modal
        isOpen={isOpenFilter}
        onClose={() => {
          setIsOpenFilter(false);
          unlockScroll();
        }}
        isFullScreen={!isDeskTop}
      >
        <div className={isDeskTop ? styles.row : ""}>
          {filters.map((filter, idx) => {
            return (
              filter.display &&
              filter.type === "checkbox" && (
                <div className={styles.filterColumn} key={idx}>
                  <p className={styles.filterTitle}>{filter.label}</p>
                  {filter.options.map((filter, idx) => {
                    return (
                      <CheckBox
                        filter={filter}
                        setFilterQuery={setFilterQuery}
                        key={idx}
                      />
                    );
                  })}
                </div>
              )
            );
          })}
        </div>
      </Modal>
    </>
  );
};

export default Filter;
