import { CardAPI } from "@/const/endPoint";
import { CartTransformer } from "@/utils/api/transformer/cart";
import { getData } from "@/utils/api/fetchData/apiCall";
import { CartContextType, AddToCartItem, RemoveFromCart } from "@/utils/type";
import React, { createContext, useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";

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
  const [cart, setCart] = useState<any>();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getData(CardAPI, { image_size: "medium_default" });
      const transformedData = CartTransformer(data);
      setCart(transformedData);
    };
    fetchData();
  }, []);

  const addToCart = async (item: AddToCartItem) => {
    setIsLoading(true);
    try {
      const data = await getData(CardAPI, {
        update: item.update,
        id_product: item.id,
        id_product_attribute: item.productAttributeId,
        qty: item.quantity,
        action: "update",
        image_size: "medium_default",
      });
      const transformedData = CartTransformer(data);
      setCart(transformedData);
      setIsLoading(false);
      toast.success("Successfully add to cart");
    } catch (error) {
      console.error("Failed to fetch product data:", error);
      setIsLoading(false);
    }
  };

  const removeFromCart = async (item: RemoveFromCart) => {
    setIsLoading(true);
    try {
      const data = await getData(CardAPI, {
        id_product: item.id,
        id_product_attribute: item.productAttributeId,
        action: "update",
        delete: 1,
        image_size: "medium_default",
      });
      const transformedData = CartTransformer(data);
      setCart(transformedData);
      setIsLoading(false);
      toast.success("Successfully remove from cart");
    } catch (error) {
      console.error("Failed to fetch product data:", error);
      setIsLoading(false);
    }
  };

  const updateQuantity = async (item: AddToCartItem, action: "up" | "down") => {
    setIsLoading(true);
    try {
      const data = await getData(CardAPI, {
        update: item.update,
        id_product: item.id,
        id_product_attribute: item.productAttributeId,
        op: action,
        action: "update",
        image_size: "medium_default",
      });
      const transformedData = CartTransformer(data);
      setCart(transformedData);
      setIsLoading(false);
      toast.success("Successfully update cart");
    } catch (error) {
      console.error("Failed to fetch product data:", error);
      setIsLoading(false);
    }
  };

  return (
    <CartContext.Provider
      value={{ cart, addToCart, removeFromCart, updateQuantity, isLoading }}
    >
      {children}
    </CartContext.Provider>
  );
};
