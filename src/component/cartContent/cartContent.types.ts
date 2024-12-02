import { ProductCart } from "@/utils/type";

export interface CartContentProps {
  isOpen: boolean;
  setIsOpen: Function;
}

export interface CartItemProps {
  product: ProductCart;
}

export interface UpdateQuantityProps {
  id: string;
  productAttributeId: number;
  quantity: number;
}
