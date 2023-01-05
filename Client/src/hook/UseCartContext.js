import { CartContext } from "../context/CartContext";
import { useContext } from "react";

export const UseCartContext = () => {
  const context = useContext(CartContext);

  if (!context) {
    throw Error("useCartContext must be used inside an CartContextProvider ");
  }

  return context;
};
