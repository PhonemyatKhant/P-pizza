import { CartItem, Order, Product } from "@/assets/types";
import { randomUUID } from "expo-crypto";
import React, { createContext, useContext, useState } from "react";
import { useInsertOrder } from "../api/orders";
import { useRouter } from "expo-router";
import { useInsertOrderItems } from "../api/order-items";
type cartType = {
  items: CartItem[];
  addItem: (product: Product, size: CartItem["size"]) => void;
  updateQuantity: (id: string, amount: -1 | 1) => void;
  total: number;
  checkout: () => void;
};
const CartContext = createContext<cartType>({
  items: [],
  addItem: () => {},
  updateQuantity: () => {},
  total: 0,
  checkout: () => {},
});

const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [items, setItems] = useState<CartItem[]>([]);

  const { mutate: insertOrder } = useInsertOrder();
  const { mutate: insertOrderItems } = useInsertOrderItems();
  const router = useRouter();

  const checkout = () => {
    insertOrder(
      { total },
      {
        onSuccess:saveOrderItems
      }
    );
  };

  const saveOrderItems = (newOrder:Order) => {
    if (!newOrder) return;
  
    insertOrderItems(
      {
        items,
        order_id: newOrder.id,
      },
      {
        onSuccess() {
          setItems([]);
          router.push(`/(user)/order/${newOrder.id}`);
        },
      }
    );
  };

  const addItem = (product: Product, size: CartItem["size"]) => {
    const existItem = items.find(
      (item) => item.product === product && item.size === size
    );

    if (existItem) {
      updateQuantity(existItem.id, 1);
      return;
    }
    const newCartItem: CartItem = {
      id: randomUUID(),
      product,
      product_id: product.id,
      size: size,
      quantity: 1,
    };

    setItems([newCartItem, ...items]);
  };

  const updateQuantity = (id: string, amount: number) => {
    setItems(
      items
        .map((item) =>
          item.id !== id ? item : { ...item, quantity: item.quantity + amount }
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const total = items.reduce(
    (sum, item) => (sum += item.product.price * item.quantity),
    0
  );
  return (
    <CartContext.Provider
      value={{ items, addItem, updateQuantity, total, checkout }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;

export const useCart = () => useContext(CartContext);
