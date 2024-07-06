import React, { FC } from "react";
import styles from "./options.module.scss";
import SelectBox from "./selectBox";
import ColorSelect from "./colorSelect";
import { ProductOptions } from "@/utils/type";
import { OptionsProps } from "./options.type";

const optionType = {
  radio: "dimension",
  color: "Color",
  select: "Size",
};

const Options: FC<OptionsProps> = ({ options }) => {
  return (
    <div className={styles.options}>
      {options.map((option) => {
        switch (option.title) {
          case optionType.radio:
            return "dimension";
          case optionType.color:
            return <ColorSelect productOption={option} />;
          case optionType.select:
            return <SelectBox productOption={option} />;
          default:
            break;
        }
      })}
    </div>
  );
};

export default Options;
