import { CartItem, Product } from "@/assets/types";
import React, { createContext, useContext, useState } from "react";
type cartType = {
  items: CartItem[];
  addItem: (product: Product, size: CartItem["size"]) => void;
};
const CartContext = createContext<cartType>({ items: [], addItem: () => {} });

const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [items, setItems] = useState<CartItem[]>([]);

  const addItem = (product: Product, size: CartItem["size"]) => {
    const newCartItem: CartItem = {
      id: "1",
      product,
      product_id: product.id,
      size: size,
      quantity: 1,
    };

    setItems([newCartItem, ...items]);
  };
  return (
    <CartContext.Provider value={{ items, addItem }}>
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;

export const useCart = () => useContext(CartContext);
