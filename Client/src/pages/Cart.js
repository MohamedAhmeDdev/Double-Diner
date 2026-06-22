import { Link } from "react-router-dom";
import React from "react";
import { UseCartContext } from "../hook/UseCartContext";
import { SERVER_URL } from "../constants";
import { 
  FiTrash2, 
  FiShoppingBag, 
  FiChevronLeft, 
  FiPlus, 
  FiMinus,
  FiCreditCard,
  FiShoppingCart,
  FiTruck,
  FiCheckCircle
} from "react-icons/fi";

const Cart = () => {
  const { cartItems, removeFromCart, updateItemQuantity, clear } = UseCartContext();
  const totalPrice = cartItems.reduce((price, item) => price + item.quantity * item.price, 0);
  const itemCount = cartItems.reduce((count, item) => count + item.quantity, 0);

  return (
    <div className="min-h-screen bg-gray-50/50">
      <div className="max-w-7xl mx-auto px-4 py-6 md:py-8 md:px-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
          <Link 
            to="/" 
            className="group inline-flex items-center text-sm font-semibold text-gray-500 hover:text-gray-800 transition-colors"
          >
            <div className="p-1.5 rounded-lg bg-gray-100 group-hover:bg-gray-200 transition-all duration-200 mr-2">
              <FiChevronLeft size={16} className="group-hover:-translate-x-0.5 transition-transform" />
            </div>
            Continue Shopping
          </Link>
          
          {cartItems.length > 0 && (
            <button 
              onClick={clear}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-600 hover:text-gray-800 transition-all duration-200 text-sm font-medium"
            >
              <FiTrash2 size={16} />
              Clear Cart
            </button>
          )}
        </div>

        {/* Title Section */}
        <div className="mb-8">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 flex items-center gap-3">
            <div className="p-3 rounded-2xl bg-gray-100">
              <FiShoppingBag className="text-gray-700" size={24} />
            </div>
            <span>Your Cart</span>
          </h1>
          {cartItems.length > 0 && (
            <p className="text-gray-500 mt-1 ml-2 text-sm">
              {itemCount} {itemCount === 1 ? 'item' : 'items'} in your cart
            </p>
          )}
        </div>

        {/* Cart Content */}
        {cartItems.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-12 text-center">
            <div className="max-w-md mx-auto">
              <div className="w-24 h-24 bg-gray-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <FiShoppingCart size={40} className="text-gray-400" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-3">Your cart is empty</h2>
              <p className="text-gray-500 mb-8">Browse our menu and discover delicious meals waiting for you!</p>
              <Link 
                to="/" 
                className="inline-flex items-center gap-2 px-6 py-3 bg-gray-900 text-white rounded-xl hover:bg-gray-800 transition-all duration-200 font-medium hover:-translate-y-0.5 hover:shadow-lg"
              >
                <FiShoppingBag size={18} />
                Browse Menu
              </Link>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Cart Items */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="overflow-x-auto">
                  <ul className="divide-y divide-gray-100">
                    {cartItems.map((item, index) => (
                      <li 
                        key={item.id} 
                        className="p-6 hover:bg-gray-50/50 transition-all duration-200 group"
                      >
                        <div className="flex flex-col sm:flex-row gap-4">
                          {/* Item Image */}
                          <div className="flex-shrink-0 w-full sm:w-28 h-28 rounded-xl overflow-hidden bg-gray-50 border border-gray-100 group-hover:scale-[1.02] transition-transform duration-300">
                            <img 
                              className="w-full h-full object-cover" 
                              src={`${SERVER_URL}/${item.image}`} 
                              alt={item.name}
                              loading="lazy"
                            />
                          </div>

                          {/* Item Details */}
                          <div className="flex-1 min-w-0">
                            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2">
                              <div className="flex-1 min-w-0">
                                <h3 className="text-lg font-semibold text-gray-900 truncate">{item.name}</h3>
                                {item.category && (
                                  <span className="inline-block mt-1 text-xs font-medium text-gray-500 bg-gray-100 px-2.5 py-1 rounded-full">
                                    {item.category}
                                  </span>
                                )}
                              </div>
                              <div className="flex flex-col items-end gap-1">
                                <p className="text-sm text-gray-500 whitespace-nowrap">
                                  Ksh {item.price.toLocaleString()} × {item.quantity}
                                </p>
                                <p className="text-lg font-bold text-gray-900 whitespace-nowrap">
                                  Ksh {(item.price * item.quantity).toLocaleString()}
                                </p>
                              </div>
                            </div>

                            {/* Quantity Controls */}
                            <div className="mt-4 flex items-center justify-between">
                              <div className="flex items-center bg-gray-50 rounded-full border border-gray-200 p-1">
                                <button
                                  onClick={() => {
                                    if (item.quantity > 1) {
                                      updateItemQuantity({ id: item.id, quantity: item.quantity - 1 });
                                    } else {
                                      removeFromCart(item.id);
                                    }
                                  }}
                                  className="w-8 h-8 flex items-center justify-center text-gray-600 hover:bg-white hover:text-gray-900 rounded-full transition-all duration-200 hover:shadow-sm"
                                  aria-label="Decrease quantity"
                                >
                                  <FiMinus size={14} />
                                </button>
                                <span className="w-10 text-center text-sm font-semibold text-gray-900">{item.quantity}</span>
                                <button
                                  onClick={() => updateItemQuantity({ id: item.id, quantity: item.quantity + 1 })}
                                  className="w-8 h-8 flex items-center justify-center text-gray-600 hover:bg-white hover:text-gray-900 rounded-full transition-all duration-200 hover:shadow-sm"
                                  aria-label="Increase quantity"
                                >
                                  <FiPlus size={14} />
                                </button>
                              </div>
                              <button 
                                onClick={() => removeFromCart(item.id)} 
                                className="p-2 rounded-xl text-gray-400 hover:text-red-600 hover:bg-red-50 transition-all duration-200"
                                aria-label="Remove item"
                              >
                                <FiTrash2 size={18} />
                              </button>
                            </div>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sticky top-6">
                <h3 className="text-lg font-bold text-gray-900 mb-6 flex items-center gap-2">
                  <FiCreditCard className="text-gray-700" />
                  Order Summary
                </h3>
                
                <div className="space-y-3">
                  <div className="flex justify-between text-sm text-gray-600">
                    <span>Total Items</span>
                    <span className="font-medium text-gray-900">{itemCount}</span>
                  </div>
                  <div className="flex justify-between text-sm text-gray-600">
                    <span>Subtotal</span>
                    <span className="font-medium text-gray-900">Ksh {totalPrice.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-sm text-gray-600">
                    <span>Delivery Fee</span>
                    <span className="font-medium text-emerald-600">Free</span>
                  </div>
                  <div className="h-px bg-gray-200 my-4"></div>
                  <div className="flex justify-between items-center">
                    <span className="text-base font-bold text-gray-900">Total</span>
                    <span className="text-xl font-bold text-gray-900">
                      Ksh {totalPrice.toLocaleString()}
                    </span>
                  </div>
                </div>

                <Link 
                  to="/checkout" 
                  className="mt-6 w-full flex items-center justify-center gap-2 px-6 py-3.5 bg-gray-900 hover:bg-gray-800 text-white font-semibold rounded-xl transition-all duration-200 hover:shadow-lg group"
                >
                  <span>Proceed to Checkout</span>
                  <FiChevronLeft className="group-hover:translate-x-1 transition-transform rotate-180" size={18} />
                </Link>
                
                <div className="mt-4 flex items-center justify-center gap-4 text-xs text-gray-500">
                  <span className="flex items-center gap-1">
                    <FiCheckCircle size={12} className="text-emerald-500" />
                    Secure payment
                  </span>
                  <span className="flex items-center gap-1">
                    <FiTruck size={12} className="text-gray-500" />
                    Free delivery
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;