import { createContext } from "react";
import type { Product } from "../hooks/useFetchProducts";

export interface CartItem extends Product {
  quantity: number;
}

export interface CartContextType {
  items: CartItem[];
  addItem: (product: Product) => void;
  removeItem: (id: string) => void;
  getTotalPrice: () => number;
  incrementQuantity: (id: string) => void;
  decrementQuantity: (id: string) => void;
  clearCart: () => void;
}

export const CartContext = createContext<CartContextType | undefined>(
  undefined
);
