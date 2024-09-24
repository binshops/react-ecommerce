import React, { FC, useState } from "react";
import styles from "./selectBox.module.scss";
import { selectBoxProps } from "./selectBox.types";

const SelectBox: FC<selectBoxProps> = ({
  productOption,
  handleSelectOption,
}) => {
  const [option, setOption] = useState(productOption.items[0].value);
  const [showMore, setShowMore] = useState(false);
  const SelectOption = (option: string) => {
    setOption(option);
    setShowMore(!showMore);
  };

  return (
    <div className={styles.selectBox}>
      <div
        className={styles.selectedOption}
        onClick={() => setShowMore(!showMore)}
      >
        <p>{option}</p>
        <img src="/images/icon/Chevron.png" alt="arrow" />
      </div>
      <div className={`${styles.moreOption} ${showMore ? styles.show : ""}`}>
        {productOption.items.map((option) => {
          return (
            <p
              key={option.id}
              onClick={() => {
                SelectOption(option.value);
                handleSelectOption(productOption.id, option.id);
              }}
            >
              {" "}
              {option.value}
            </p>
          );
        })}
      </div>
    </div>
  );
};

export default SelectBox;
