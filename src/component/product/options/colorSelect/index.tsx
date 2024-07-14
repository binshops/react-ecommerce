import React, { FC, useState } from "react";
import styles from "./colorSelect.module.scss";
import { selectBoxProps } from "./ colorSelect.types";

const ColorSelect: FC<selectBoxProps> = ({ productOption ,handleSelectOption }) => {
  const [color, setColor] = useState(productOption.items[0].hex_value);
  return (
    <div className={styles.colorSelect}>
      <p className={styles.title}>{productOption.title}</p>
      <div className={styles.colors}>
        {productOption.items.map((option) => {
          return (
            <div
              key={option.id}
              style={{ backgroundColor: option.hex_value }}
              onClick={() => {setColor(option.hex_value); handleSelectOption(productOption.id , option.id)}}
              className={`${styles.color} ${
                option.hex_value === color ? styles.select : ""
              }`}
            ></div>
          );
        })}
      </div>
    </div>
  );
};

export default ColorSelect;
