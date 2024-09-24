import React, { FC } from "react";
import styles from "./checkBox.module.scss";
import { CheckBoxProps } from "./checkBox.types";

const CheckBox: FC<CheckBoxProps> = ({ filter, setFilterQuery }) => {
  return (
    <>
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
            {filter.active && <img src="/images/icon/check.png" alt="check" />}
          </div>
          <p className={styles.label}>{filter.label}</p>
          <p className={styles.count}>( {filter.productCount} )</p>
        </div>
      </div>
    </>
  );
};

export default CheckBox;
