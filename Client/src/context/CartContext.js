import React, { createContext, useReducer } from "react";

// initial state is an empty array, and two functions to add and remove items from the cart
export const CartContext = createContext({
  cartItems: [],
  addToCart: (item) => {},
  removeFromCart: (id) => {},
  clear: () => {},
  updateItemQuantity: (item) => {},
});

export const cartReducer = (state, action) => {
  switch (action.type) {
    // TODO: add case for "INITIALIZE_CART" to set the cartItems to the payload (the cartItems from localStorage)
    case "INITIALIZE_CART":
      return {
        cartItems: action.payload,
      };

    case "ADD_TO_CART":
      // push the item to the cart
      return {
        cartItems: [action.payload, ...state.cartItems],
      };

    case "REMOVE_FROM_CART":
      return {
        cartItems: state.cartItems.filter((item) => item.id !== action.payload),
      }; //remove the user from localStorage

    case "CLEAR_CART":
      return {
        cartItems: [],
      };

    case "UPDATE_ITEM_QUANTITY":
      return {
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

    default:
      return state; //what is this state?
  }
};

export const CartContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, {
    cartItems: [],
  });

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

  console.log("CartContext state :", state);

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
      {children} {/*children is the where we are passing to */}
    </CartContext.Provider>
  );
};
