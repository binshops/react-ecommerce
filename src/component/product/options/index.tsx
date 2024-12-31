import React, { FC } from "react";

import { optionType } from "@/const/productOption";

import SelectBox from "./selectBox";
import ColorSelect from "./colorSelect";
import { OptionsProps } from "./options.type";

import styles from "./options.module.scss";

const Options: FC<OptionsProps> = ({ options, handleSelectOption }) => {
  return (
    <div className={styles.options}>
      {options.map((option, idx) => {
        switch (option.type) {
          case optionType.radio:
            return (
              <SelectBox
                productOption={option}
                handleSelectOption={handleSelectOption}
                key={idx}
              />
            );
          case optionType.color:
            return (
              <ColorSelect
                productOption={option}
                handleSelectOption={handleSelectOption}
                key={idx}
              />
            );
          case optionType.select:
            return (
              <SelectBox
                productOption={option}
                handleSelectOption={handleSelectOption}
                key={idx}
              />
            );
          default:
            break;
        }
      })}
    </div>
  );
};

export default Options;
