import { Link } from "react-router-dom";
import React from "react";
import { UseCartContext } from "../hook/UseCartContext";
import { SERVER_URL } from "../constants";

const Cart = () => {
  const { cartItems, removeFromCart, updateItemQuantity, clear } = UseCartContext(); // it from cart context

  // it calculates the total price of each item
  const totalPrice = cartItems.reduce( (price, item) => price + item.quantity * item.price, 0); // it adds the single price then it times it with the quantity

  return (
    <div className="cart-container">
      <section class=" py-12 sm:py-16 lg:py-20">
        <div class="mx-auto px-4 sm:px-6 lg:px-8">
          <div class="flex items-center justify-center pt-10">
            <h1 class="text-2xl font-semibold text-gray-900">Your Cart</h1>
          </div>

          {cartItems.length >= 1 && (
                <button class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded flex flex-col  mr-10 m-auto " onClick={clear}>Remove</button>
          )}

          <div class="mx-auto mt-8 max-w-2xl md:mt-12">
          {cartItems.length >= 1 && (
            <div class="bg-white shadow">
              <div class="px-4 py-6 sm:px-8 sm:py-10">
                <div class="flow-root">
                  <ul class="-my-8">
                  {cartItems.map((item, id) => (
                    <li key={id} class="flex flex-col space-y-3 py-6 text-left sm:flex-row sm:space-x-5 sm:space-y-0">
                      <div class="shrink-0">
                        <img class="h-24 w-24 max-w-full rounded-lg object-cover" src={`${SERVER_URL}/${item.image}`} alt="" />
                      </div>

                      <div class="relative flex flex-1 flex-col justify-between">
                        <div class="sm:col-gap-5 sm:grid sm:grid-cols-2">
                          <div class="pr-8 sm:pr-5">
                            <p class="text-base font-semibold text-gray-900">{item.name}</p>
                            <p class="mx-0 mt-1 mb-0 text-sm text-gray-400"></p>
                          </div>

                          <div class="mt-4 flex items-end justify-between sm:mt-0 sm:items-start sm:justify-end">
                            <p class="shrink-0 w-20 text-base font-semibold text-gray-900 sm:order-2 sm:ml-8 sm:text-right">{item.quantity} x  {item.price}</p>

                            <div class="sm:order-1">
                              <div class="mx-auto flex h-8 items-stretch text-gray-600">
                                  <button onClick={() => { 
                                    if (item.quantity > 1) {
                                      updateItemQuantity({ id: item.id, quantity: item.quantity - 1, });
                                    } else {//if the quantity is 1, then it will remove the item from the cart
                                      removeFromCart(item.id); } }} class="flex items-center justify-center rounded-l-md bg-gray-200 px-4 transition hover:bg-black hover:text-white">
                                  - 
                                  </button>
                                <div class="flex w-full items-center justify-center bg-gray-100 px-4 text-xs uppercase transition">{item.quantity}</div>
                                <button  onClick={() => updateItemQuantity({id: item.id, quantity: item.quantity + 1,}) } class="flex items-center justify-center rounded-r-md bg-gray-200 px-4 transition hover:bg-black hover:text-white">+</button>
                              </div>
                            </div>
                          </div>
                        </div>

                      </div>
                    </li>
                    ))}   
                  </ul>
                </div>
            
                  <div class="mt-6 border-t border-b py-2">
                      <div class="flex items-center justify-between">
                        <p class="text-sm text-gray-400">Subtotal</p>
                        <p class="text-lg font-semibold text-gray-900"><span class="text-xs font-normal text-gray-400">Ksh</span> {totalPrice}</p>
                      </div>
                  </div>
                  <div class="mt-6 flex items-center justify-between">
                      <p class="text-sm font-medium text-gray-900">Total</p>
                      <p class="text-2xl font-semibold text-gray-900"><span class="text-xs font-normal text-gray-400">Ksh</span>{totalPrice}</p>
                  </div>
              
              
                {cartItems.length >= 1 && (
                <div class="mt-6 text-center">
                  <Link to="/checkout">
                  <button type="button" class="group inline-flex w-full items-center justify-center rounded-md bg-gray-900 px-6 py-4 text-lg font-semibold text-white transition-all duration-200 ease-in-out focus:shadow hover:bg-gray-800">
                    Checkout
                  </button>
                  </Link>
                </div>
                )}
              </div>
            </div>
           )}
             {cartItems.length === 0 && (
                  <p className="px-6 py-4 text-center whitespace-nowrap text-sm text-gray-500">No item added to the cart</p>
               )} 
          </div>
        </div>
     </section>
   </div>
  
  );
};

export default Cart;
