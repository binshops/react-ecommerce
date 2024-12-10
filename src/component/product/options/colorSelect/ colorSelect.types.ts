import { ProductOptions } from "@/utils/type";

export interface selectBoxProps {
  productOption: ProductOptions;
  handleSelectOption: (productId: number, optionId: number) => void;
}
