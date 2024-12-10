import { ProductOptions } from "@/utils/type";

export interface OptionsProps {
  options: ProductOptions[];
  handleSelectOption: (productId: string, optionId: string) => void;
}
