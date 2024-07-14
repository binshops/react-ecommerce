export type AddToCartItem = {
  update: number;
  id: string;
  productAttributeId: number;
  quantity: number;
};
export type CartType = {
  id: string;
};
export type CartContextType = {
  cart: CartType[];
  addToCart: (item: AddToCartItem) => void;
  removeFromCart: (id: string) => void;
  updateQuantity: (id: string, newQuantity: number) => void;
};
