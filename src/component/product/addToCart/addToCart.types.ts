export interface AddToCartProps {
  quantity: number;
  setQuantity: (value: number) => void;
  handleAdd: () => void;
  isLoading: boolean;
}
