import React, { FC } from "react";
import styles from "./options.module.scss";
import SelectBox from "./selectBox";
import ColorSelect from "./colorSelect";
import { ProductOptions } from "@/utils/type";
import { OptionsProps } from "./options.type";

const optionType = {
  radio: "radio",
  color: "color",
  select: "select",
};

const Options: FC<OptionsProps> = ({ options, handleSelectOption }) => {
  return (
    <div className={styles.options}>
      {options.map((option) => {
        switch (option.type) {
          case optionType.radio:
            return (
              <SelectBox
                productOption={option}
                handleSelectOption={handleSelectOption}
              />
            );
          case optionType.color:
            return (
              <ColorSelect
                productOption={option}
                handleSelectOption={handleSelectOption}
              />
            );
          case optionType.select:
            return (
              <SelectBox
                productOption={option}
                handleSelectOption={handleSelectOption}
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
