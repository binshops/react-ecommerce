import React, { FC } from "react";
import { useTranslation } from "react-i18next";

import styles from "./textInput.module.scss";
import { TextInputProps } from "./textInput.types";

const TextInput: FC<TextInputProps> = ({
  value,
  handleInputChange,
  placeholder,
}) => {
  const { t } = useTranslation();

  return (
    <div className={styles.inputBox}>
      <input
        type="text"
        placeholder={t(placeholder)}
        value={value}
        onChange={handleInputChange}
      />
    </div>
  );
};

export default TextInput;
