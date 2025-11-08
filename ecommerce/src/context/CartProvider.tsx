import React, { useState } from "react";
import type { ReactNode } from "react";
import type { Product } from "../hooks/useFetchProducts";
import type { CartItem, CartContextType } from "./CartTypes";
import { CartContext } from "./CartTypes";

interface CartProviderProps {
  children: ReactNode;
}
export const CartProvider: React.FC<CartProviderProps> = ({ children }) => {
  const [items, setItems] = useState<CartItem[]>([]);

  const addItem = (product: Product) => {
    setItems((currentItems) => {
      const isItemInCart = currentItems.find((item) => item.id === product.id);
      if (isItemInCart) {
        return currentItems.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [...currentItems, { ...product, quantity: 1 }];
      }
    });
  };
  const incrementQuantity = (id: string) => {
    setItems((currentItems) =>
      currentItems.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };
  const decrementQuantity = (id: string) => {
    setItems((currentItems) =>
      currentItems
        .map((item) =>
          item.id === id ? { ...item, quantity: item.quantity - 1 } : item
        )
        // Filtra para remover itens cuja quantidade chegou a 0
        .filter((item) => item.quantity > 0)
    );
  };
  const removeItem = (id: string) => {
    setItems((currentItems) => currentItems.filter((item) => item.id !== id));
  };
  const getTotalPrice = () => {
    return items.reduce((total, item) => total + item.preco * item.quantity, 0);
  };
  const value: CartContextType = {
    items,
    addItem,
    removeItem,
    getTotalPrice,
    incrementQuantity,
    decrementQuantity,
  };
  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
