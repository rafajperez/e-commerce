import { useContext } from "react";
import { CartContext } from "../context/CartTypes";
import type { CartContextType } from "../context/CartTypes";

export const useCart = (): CartContextType => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
