import React, { useEffect, useState } from "react";
import { SERVER_URL } from "../constants";
import { UseCartContext } from "../hook/UseCartContext";
import { apiCall } from "../utils/apiCall";
import { toast } from "react-toastify";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { UseAuthContext } from "../hook/UseAuthContext";
import { 
  FiArrowLeft, 

  FiTruck,
  FiCreditCard,
  FiShoppingBag,
  FiMapPin,
} from "react-icons/fi";

const CheckOutPage = () => {
  const { cartItems = [], clear } = UseCartContext();
  const { user } = UseAuthContext();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState(null);
  
  // Fetch user data
  const getUserData = async () => {
    try {
      const response = await axios.get(`${SERVER_URL}/auth/${user.id}`);
      const userData = response.data.user;
      setUserInfo(userData);      
    } catch (error) {
      toast.error("Failed to fetch profile info. Please fill in your details manually.");
    } 
  };

  useEffect(() => {
    getUserData();
  }, [user?.id]);

  const placeOrder = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const order = {
      dishes: cartItems.map((item) => ({
        dish_id: item.dish_id,
        quantity: item.quantity,
        unit_price: item.price,
      })),
    };

    apiCall("/orders", "POST", order)
      .then((res) => {
        toast.success("Order placed successfully!");
        clear();
        navigate("/orders");
      })
      .catch((err) => {
        const errorMessage = err?.response?.data?.message;
        toast.error(errorMessage);
      })
      .finally(() => {
        setIsSubmitting(false);
      });
  };

  const total = cartItems.reduce(
    (acc, item) => acc + item.quantity * item.price,
    0
  );

  const deliveryFee = total > 500 ? 0 : 150;
  const grandTotal = total + deliveryFee;

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50/50 flex flex-col items-center justify-center p-4">
        <div className="text-center max-w-md bg-white p-12 rounded-2xl shadow-sm border border-gray-100">
          <div className="w-24 h-24 bg-gray-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <FiShoppingBag size={40} className="text-gray-400" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Your cart is empty</h2>
          <p className="text-gray-500 text-sm mb-8">Add some delicious meals to your cart before checking out.</p>
          <Link 
            to="/" 
            className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-gray-900 text-white font-semibold rounded-xl hover:bg-gray-800 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg"
          >
            <FiShoppingBag size={18} />
            Browse Menu
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50/50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header Navigation */}
        <div className="flex items-center justify-between mb-8">
          <Link 
            to="/cart" 
            className="group inline-flex items-center text-sm font-semibold text-gray-500 hover:text-gray-800 transition-colors"
          >
            <div className="p-1.5 rounded-lg bg-gray-100 group-hover:bg-gray-200 transition-all duration-200 mr-2">
              <FiArrowLeft size={16} className="group-hover:-translate-x-0.5 transition-transform" />
            </div>
            Back to Cart
          </Link>
        </div>

        {/* Page Title */}
        <div className="mb-8">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 flex items-center gap-3">
            <div className="p-3 rounded-2xl bg-gray-100">
              <FiCreditCard className="text-gray-700" size={24} />
            </div>
            <span>Checkout</span>
          </h1>
          <p className="text-gray-500 mt-1 ml-2 text-sm">Complete your order securely</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column - Order Form */}
          <div className="lg:col-span-7 space-y-6 order-2 lg:order-1">
            {/* Delivery Information */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="px-6 py-5 border-b border-gray-100 flex items-center gap-2">
                <FiMapPin size={18} className="text-gray-700" />
                <h2 className="text-lg font-bold text-gray-900">Delivery Information</h2> 
              </div>
              <div className="p-6 space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-600 mb-1">Full Name</label>
                    <span className="text-gray-900 font-medium block truncate">{userInfo?.name}</span>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-600 mb-1">Email Address</label>
                    <span className="text-gray-900 font-medium block truncate">{userInfo?.email}</span>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-1">Delivery Address</label>
                  <span className="text-gray-900 block break-words">{userInfo?.address}</span>
                </div>
              </div>
            </div>

            {/* Simplified Payment Section*/}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="px-6 py-5 border-b border-gray-100 flex items-center gap-2">
                <FiCreditCard size={18} className="text-gray-700" />
                <h2 className="text-lg font-bold text-gray-900">Payment</h2>
              </div>
              
              <div className="p-6">
                <form onSubmit={placeOrder} className="space-y-5">
                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`w-full flex items-center justify-center gap-2 py-4 px-6 rounded-xl text-white font-bold text-base ${
                      isSubmitting 
                        ? 'bg-gray-300 cursor-not-allowed' 
                        : 'bg-gray-900 hover:bg-gray-800'
                    }`}
                  >
                    {isSubmitting ? (
                      <>
                        <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        <span>Processing Order...</span>
                      </>
                    ) : (
                      <>
                        <FiCreditCard size={18} />
                        <span>Place Order</span>
                      </>
                    )}
                  </button>
                </form>
              </div>
            </div>
          </div>

          {/* Right Column - Order Summary */}
          <div className="lg:col-span-5  space-y-6 order-1 lg:order-2">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="px-6 py-5 border-b border-gray-100 flex items-center justify-between">
                <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                  <FiShoppingBag size={18} className="text-gray-700" />
                  Order Summary
                </h2>
                <span className="text-xs font-semibold px-3 py-1.5 bg-gray-100 text-gray-700 rounded-full">
                  {cartItems.length} {cartItems.length === 1 ? 'Item' : 'Items'}
                </span>
              </div>

              <div className="p-6">
                {/* Items List */}
                <div className="space-y-4 max-h-[380px] overflow-y-auto pr-2 divide-y divide-gray-100">
                  {cartItems.map((item) => (
                    <div 
                      key={item.id} 
                      className="flex items-center gap-4 group pt-4 first:pt-0"
                    >
                      <img 
                        src={`${SERVER_URL}/${item?.image}`} 
                        alt={item.name} 
                        className="w-16 h-16 sm:w-20 sm:h-20 rounded-xl object-cover border border-gray-100 shadow-sm group-hover:scale-105 transition-transform duration-200"
                        onError={(e) => { 
                          e.target.onerror = null;
                          e.target.src = "https://placehold.co/150?text=Food"; 
                        }}
                      />
                      <div className="flex-1 min-w-0">
                        <h4 className="font-semibold text-gray-900 text-sm sm:text-base truncate">{item.name}</h4>
                        <div className="flex items-center gap-2 mt-1 text-xs sm:text-sm text-gray-500">
                          <span>Qty: <strong className="text-gray-700">{item.quantity}</strong></span>
                          <span>×</span>
                          <span>Ksh {item.price.toLocaleString()}</span>
                        </div>
                      </div>
                      <div className="text-right flex-shrink-0">
                        <p className="text-sm sm:text-base font-bold text-gray-900">
                          Ksh {(item.price * item.quantity).toLocaleString()}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Pricing Breakdown */}
                <div className="mt-6 pt-6 border-t border-gray-100 space-y-3">
                  <div className="flex justify-between text-sm text-gray-600">
                    <span>Subtotal</span>
                    <span className="font-medium text-gray-800">Ksh {total.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-sm text-gray-600">
                    <span className="flex items-center gap-1.5">
                      <FiTruck size={14} className="text-gray-400" />
                      Delivery Fee
                    </span>
                    <span className="font-medium text-emerald-600">Free</span>
                  </div>

                  <div className="flex justify-between text-lg font-bold pt-4 border-t border-gray-100">
                    <span className="text-gray-900">Total</span>
                    <span className="text-xl text-gray-900">
                      Ksh {grandTotal.toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckOutPage;