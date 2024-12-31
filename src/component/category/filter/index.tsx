import React, { FC } from "react";
import { useTranslation } from "react-i18next";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilter } from "@fortawesome/free-solid-svg-icons";

import useWindowSize from "@/utils/hooks/useWindowSize";
import { useScrollLock } from "@/utils/hooks";

import Modal from "@/component/modal";

import CheckBox from "./checkBox";

import { FilterProps } from "./filter.types";

import styles from "./filter.module.scss";

const Filter: FC<FilterProps> = ({
  filters,
  setFilterQuery,
  isOpenFilter,
  setIsOpenFilter,
}) => {
  const { lockScroll, unlockScroll } = useScrollLock();
  const { width } = useWindowSize();
  const { t } = useTranslation();
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
        <FontAwesomeIcon icon={faFilter} fontSize={18} />
        <p className={styles.title}>{t("category.filters")}</p>
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
          {filters?.map((filter, idx) => {
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
