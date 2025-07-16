import { Link } from "react-router-dom";
import React from "react";
import { UseCartContext } from "../hook/UseCartContext";
import { SERVER_URL } from "../constants";
import { FiTrash2, FiShoppingBag, FiChevronLeft } from "react-icons/fi";

const Cart = () => {
  const { cartItems, removeFromCart, updateItemQuantity, clear } = UseCartContext();
  const totalPrice = cartItems.reduce((price, item) => price + item.quantity * item.price, 0);

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <Link to="/" className="flex items-center text-gray-600 hover:text-gray-900 transition-colors">
            <FiChevronLeft className="mr-2" size={20} />
            Continue Shopping
          </Link>
          <h1 className="text-2xl font-bold text-gray-900 flex items-center">
            <FiShoppingBag className="mr-2" />
            Your Cart
          </h1>
          {cartItems.length >= 1 && (
            <button 
              onClick={clear}
              className="flex items-center text-red-500 hover:text-red-700 transition-colors"
            >
              <FiTrash2 className="mr-1" />
              Clear All
            </button>
          )}
        </div>

        {/* Cart Content */}
        {cartItems.length === 0 ? (
          <div className="bg-white rounded-xl shadow-sm p-8 text-center">
            <div className="mx-auto w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-4">
              <FiShoppingBag size={32} className="text-gray-400" />
            </div>
            <h2 className="text-xl font-medium text-gray-700 mb-2">Your cart is empty</h2>
            <p className="text-gray-500 mb-6">Add some delicious items from our menu</p>
            <Link to="/" className="inline-block px-6 py-3 bg-green-600 hover:bg-green-700 text-white font-medium rounded-lg transition-colors">
              Browse Menu
            </Link>
          </div>
        ) : (
          <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            {/* Cart Items */}
            <ul className="divide-y divide-gray-200">
              {cartItems.map((item) => (
                <li key={item.id} className="p-4 sm:p-6">
                  <div className="flex items-start">
                    {/* Item Image */}
                    <div className="flex-shrink-0 w-24 h-24 rounded-lg overflow-hidden">
                      <img className="w-full h-full object-cover" src={`${SERVER_URL}/${item.image}`}  alt={item.name}/>
                    </div>

                    {/* Item Details */}
                    <div className="ml-4 flex-1">
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className="text-lg font-medium text-gray-900">{item.name}</h3>
                          <p className="mt-1 text-sm text-gray-500">{item.category}</p>
                        </div>
                        <p className="text-lg font-semibold text-gray-900">Ksh {item.price * item.quantity}</p>
                      </div>

                      {/* Quantity Controls */}
                      <div className="mt-4 flex items-center justify-between">
                        <div className="flex items-center border border-gray-300 rounded-lg">
                          <button
                            onClick={() => {
                              if (item.quantity > 1) {
                                updateItemQuantity({ id: item.id, quantity: item.quantity - 1 });
                              } else {
                                removeFromCart(item.id);
                              }
                            }}
                            className="w-10 h-10 flex items-center justify-center text-gray-600 bg-[#f4f0f0] rounded-l-md transition-colors"
                          >
                            -
                          </button>
                          <span className="w-12 text-center font-medium">{item.quantity}</span>
                          <button
                            onClick={() => updateItemQuantity({ id: item.id, quantity: item.quantity + 1 })}
                            className="w-10 h-10 flex items-center justify-center text-gray-600 bg-[#f4f0f0] rounded-r-md transition-colors"
                          >
                            +
                          </button>
                        </div>
                        <button onClick={() => removeFromCart(item.id)} className="text-red-500 hover:text-red-700 transition-colors">
                          <FiTrash2 />
                        </button>
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>

            {/* Order Summary */}
            <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
              <div className="flex justify-between text-base font-medium text-gray-900 mb-4">
                <p>Subtotal</p>
                <p>Ksh {totalPrice}</p>
              </div>
              <div className="flex justify-between text-lg font-bold text-gray-900 mb-6">
                <p>Total</p>
                <p>Ksh {totalPrice}</p>
              </div>
              <div className="flex justify-end">
                <Link to="/checkout" className="w-full sm:w-auto flex justify-center items-center px-6 py-3 bg-green-600 hover:bg-green-700 text-white font-medium rounded-lg shadow-sm transition-colors">
                  Proceed to Checkout
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;