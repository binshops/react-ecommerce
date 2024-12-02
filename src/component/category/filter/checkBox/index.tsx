import React, { FC } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";

import { CheckBoxProps } from "./checkBox.types";

import styles from "./checkBox.module.scss";

const CheckBox: FC<CheckBoxProps> = ({ filter, setFilterQuery }) => {
  return (
    <div className={styles.content}>
      <div
        className={styles.check}
        onClick={() => {
          setFilterQuery(
            filter.filterQuery !== "" ? filter.filterQuery : "undefined"
          );
        }}
      >
        <div
          className={`${styles.box} ${filter.active ? styles.active : ""}`}
          style={{
            backgroundColor: filter.properties.color
              ? filter.properties.color
              : undefined,
          }}
        >
          {filter.active && <FontAwesomeIcon icon={faCheck} color="#fff" />}
        </div>
        <p className={styles.label}>{filter.label}</p>
        <p className={styles.count}>( {filter.productCount} )</p>
      </div>
    </div>
  );
};

export default CheckBox;
