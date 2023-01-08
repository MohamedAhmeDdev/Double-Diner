import { Link } from "react-router-dom";
import React from "react";
import { UseCartContext } from "../hook/UseCartContext";

const Cart = () => {
  const { cartItems, removeFromCart, updateItemQuantity, clear } = UseCartContext(); // it from cart context

  // it calculates the total price of each item
  const totalPrice = cartItems.reduce( (price, item) => price + item.quantity * item.price, 0); // it adds the single price then it times it with the quantity

  return (
    <div className="cart-container">
     <div className="flex flex-col mb-60 my-20">
        <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
            <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">

            {cartItems.length >= 1 && (
              <button class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded flex flex-col  mr-10 m-auto " onClick={clear}>Remove</button>
              )}

              <table className="min-w-full divide-y divide-gray-200"> 
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Image</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Dish</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Increment</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Quantity</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" >Decrement</th>
                    <th scope="col"className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                  </tr>
                </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                  {cartItems.map((item, id) => (
                      <tr  key={id}>
                          <td className="px-6 py-4 whitespace-nowrap text-left">  <div className="flex-shrink-0">
                            <img className="w-24 h-24 rounded-md" src={`http://localhost:5000/${item.image}`} alt=""/></div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-left">{item.name}</td>

                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-left"> 
                           <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"  onClick={() => updateItemQuantity({id: item.id, quantity: item.quantity + 1,}) }>+</button>
                          </td>

                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-left">{item.quantity}</td>

                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-left"> 
                             <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded" onClick={() => {  //If the quantity is greater than 1, then it will decrease the quantity by 1 
                               if (item.quantity > 1) {
                                 updateItemQuantity({ id: item.id, quantity: item.quantity - 1, });
                               } else {//if the quantity is 1, then it will remove the item from the cart
                                removeFromCart(item.id); } }} >
                                 - 
                              </button>
                          </td>

                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-left">{item.quantity} x  {item.price}</td>
                      </tr>
                      ))}      
                  </tbody>
                  <tfoot>
                  {cartItems.length >= 1 && (
                  <td className="px-6 ring-black leading-5 py-4 text-lg text-gray-500 text-left">TOTAL : Ksh {totalPrice}</td>
                  )}
                  </tfoot>
              </table>
              
              <table className="min-w-full divide-y divide-gray-200"> 
                  <tbody className="bg-white divide-y divide-gray-200">
                     {cartItems.length === 0 && (
                       <td className="px-6 py-4 text-center whitespace-nowrap text-sm text-gray-500">No item added to the cart</td>
                     )}      
                  </tbody>
              </table>

              {cartItems.length >= 1 && (
                <button class="bg-green-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded flex flex-col mb-5 m-auto">
                     <Link to="/checkout">Proceed To Checkout</Link>
               </button>
               )}

            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
