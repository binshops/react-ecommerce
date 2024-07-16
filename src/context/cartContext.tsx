import { AddToCardAPI } from "@/const/endPoint";
import { getData } from "@/utils/fetchData";
import {
  CartContextType,
  AddToCartItem,
  CartType,
} from "@/utils/type/cartContext";
import React, { createContext, useContext, useState } from "react";

const CartContext = createContext<CartContextType | undefined>(undefined);

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [cart, setCart] = useState<CartType[]>([]);

  const addToCart = async (item: AddToCartItem) => {
    try {
      const productData = await getData(AddToCardAPI, {
        update: item.update,
        id_product: item.id,
        id_product_attribute: item.productAttributeId,
        qty: item.quantity,
        action: "update",
        image_size: "medium_default",
      });
    } catch (error) {
      console.error("Failed to fetch product data:", error);
    }
    setCart([...cart, { id: item.id }]);
  };

  const removeFromCart = (id: string) => {
    setCart(cart.filter((item) => item.id !== id));
  };

  const updateQuantity = (id: string, newQuantity: number) => {
    setCart(
      cart.map((item) =>
        item.id === id ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  return (
    <CartContext.Provider
      value={{ cart, addToCart, removeFromCart, updateQuantity }}
    >
      {children}
    </CartContext.Provider>
  );
};
