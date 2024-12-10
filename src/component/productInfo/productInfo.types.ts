import { ProductOptions } from "@/utils/type";

export interface productInfoProps {
  id: string;
  title: string;
  price: string;
  options: ProductOptions[];
  description: string;
  setProduct: Function;
  productAttributeId: number;
}
