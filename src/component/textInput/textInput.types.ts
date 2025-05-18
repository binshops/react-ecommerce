import { ChangeEventHandler } from "react";

export interface TextInputProps {
  value: string;
  handleInputChange: ChangeEventHandler<HTMLInputElement>;
  placeholder: string;
}
