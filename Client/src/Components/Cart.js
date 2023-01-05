import "../css/Cart.css";

import { Link } from "react-router-dom";
import React from "react";
import { UseCartContext } from "../hook/UseCartContext";

const Cart = () => {
  const { cartItems, removeFromCart, updateItemQuantity, clear } =
    UseCartContext();

  // it calculates the total price of each item
  const totalPrice = cartItems.reduce(
    (price, item) => price + item.quantity * item.price,
    0
  ); // it adds the single price then it times it with the quantity

  return (
    <div className="cart-container">
      <div className="cart-container-grid">
        <h3 className="header">Add To Cart</h3>
        {cartItems.length === 0 && (
          <p className="error">No item added to the cart</p>
        )}
        {cartItems.length >= 1 && (
          <button className="clear-button" onClick={clear}>
            clear
          </button>
        )}
        <div className="head-div">
          <p>Item</p>
          <p>Quantity</p>
          <p>Price</p>
        </div>
        {cartItems.map((item, id) => (
          <div className="cart-grid" key={id}>
            <div className="cart-div">
              <div className="image">
                <img
                  src={`http://localhost:5000/${item.image}`}
                  width="100%"
                  height="100%"
                  alt=""
                />
              </div>
              <div className="cart-info">
                <p className="item-info">{item.foodName}</p>
                <p className="item-info">{item.price}</p>
              </div>
            </div>

            <div className="count">
              <button
                className="items"
                onClick={() =>
                  updateItemQuantity({
                    id: item.id,
                    quantity: item.quantity + 1,
                  })
                }
              >
                +
              </button>
              <p className="quantity">{item.quantity}</p>
              <button
                className="items"
                onClick={() => {
                  //If the quantity is greater than 1, then it will decrease the quantity by 1
                  if (item.quantity > 1) {
                    updateItemQuantity({
                      id: item.id,
                      quantity: item.quantity - 1,
                    });
                  } else {
                    //if the quantity is 1, then it will remove the item from the cart
                    removeFromCart(item.id);
                  }
                }}
              >
                -
              </button>
            </div>

            <div className="price">
              <p className="quantity">{item.price * item.quantity}</p>
            </div>
          </div>
        ))}
        <p className="total">TOTAL : Ksh {totalPrice}</p>
        {cartItems.length >= 1 && (
          <Link className="orderPage" to="/checkout">
            Proceed To Checkout
          </Link>
        )}
      </div>
    </div>
  );
};

export default Cart;
