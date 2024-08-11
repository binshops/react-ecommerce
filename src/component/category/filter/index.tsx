import React, { FC, useEffect, useState } from "react";
import styles from "./filter.module.scss";
import FilterIcon from "./../../../../public/images/icon/Filter.png";
import Image from "next/image";
import Modal from "@/component/modal";
import CheckBox from "./checkBox";
import { FilterProps } from "@/utils/type/category";
import { useScrollLock } from "@/utils/hooks/useScrollLock";

const Filter: FC<FilterProps> = ({
  filters,
  setFilterQuery,
  isOpenFilter,
  setIsOpenFilter,
}) => {
  const { lockScroll, unlockScroll } = useScrollLock();

  return (
    <>
      <div
        className={styles.filterWrapper}
        onClick={() => {setIsOpenFilter(true);lockScroll()}}
      >
        <Image src={FilterIcon} alt="filterIcon" />
        <p className={styles.title}>Filters</p>
      </div>
      <Modal
        isOpen={isOpenFilter}
        onClose={() =>{ setIsOpenFilter(false);unlockScroll()}}
        isFullScreen
      >
        {filters.map((filter, idx) => {
          return (
            filter.display && (
              <div key={idx}>
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
      </Modal>
    </>
  );
};

export default Filter;
