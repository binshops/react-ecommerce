import { ProductOptions } from "@/utils/type";

export interface selectBoxProps {
  productOption: ProductOptions;
  handleSelectOption: (productId: string, optionId: string) => void;
}
