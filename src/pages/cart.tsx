// pages/basket.tsx
import React from "react";
import { useCart } from "@/context/cartContext";


const CartPage = () => {
  const { cart, addToCart, removeFromCart, updateQuantity } = useCart();

  return (
    <div>
      <h1>Your Basket</h1>
      {cart.length > 0 ? (
        cart.map(item => (
            item.name
        ))
      ) : (
        <p>Your basket is empty.</p>
      )}
      {/* Add buttons for actions like addToCart, updateQuantity, removeFromCart */}
    </div>
  );
};

export default CartPage;
