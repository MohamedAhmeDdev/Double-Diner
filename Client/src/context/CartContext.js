import React, { createContext, useReducer, useEffect } from "react";

export const CartContext = createContext({
  cartItems: [],
  addToCart: (item) => {},
  removeFromCart: (id) => {},
  clear: () => {},
  updateItemQuantity: (item) => {},
});

export const cartReducer = (state, action) => {
  switch (action.type) {
    case "INITIALIZE_CART":
      return {
        cartItems: action.payload,
      };

    case "ADD_TO_CART":
      const newStateAdd = {
        cartItems: [action.payload, ...state.cartItems],
      };
      localStorage.setItem("cart", JSON.stringify(newStateAdd.cartItems));
      return newStateAdd;

    case "REMOVE_FROM_CART":
      const newStateRemove = {
        cartItems: state.cartItems.filter((item) => item.id !== action.payload),
      };
      localStorage.setItem("cart", JSON.stringify(newStateRemove.cartItems));
      return newStateRemove;

    case "CLEAR_CART":
      localStorage.removeItem("cart");
      return {
        cartItems: [],
      };

    case "UPDATE_ITEM_QUANTITY":
      const newStateUpdate = {
        cartItems: state.cartItems.map((item) => {
          if (item.id === action.payload.id) {
            return {
              ...item,
              quantity: action.payload.quantity,
            };
          }
          return item;
        }),
      };
      localStorage.setItem("cart", JSON.stringify(newStateUpdate.cartItems));
      return newStateUpdate;

    default:
      return state;
  }
};

export const CartContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, {
    cartItems: [],
  });

  // Load cart from localStorage on initial render
  useEffect(() => {
    const storedCart = localStorage.getItem("cart");
    if (storedCart) {
      dispatch({ type: "INITIALIZE_CART", payload: JSON.parse(storedCart) });
    }
  }, []);

  const addToCart = (item) => {
    dispatch({ type: "ADD_TO_CART", payload: item });
  };

  const removeFromCart = (id) => {
    dispatch({ type: "REMOVE_FROM_CART", payload: id });
  };

  const clear = () => {
    dispatch({ type: "CLEAR_CART" });
  };

  const updateItemQuantity = (item) => {
    dispatch({ type: "UPDATE_ITEM_QUANTITY", payload: item });
  };

  console.log("CartContext state:", state);

  return (
    <CartContext.Provider
      value={{
        addToCart,
        removeFromCart,
        cartItems: state.cartItems,
        clear,
        updateItemQuantity,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};