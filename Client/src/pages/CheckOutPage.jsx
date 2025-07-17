import React, { useState } from "react";
import { SERVER_URL } from "../constants";
import { UseAuthContext } from "../hook/UseAuthContext";
import { UseCartContext } from "../hook/UseCartContext";
import { apiCall } from "../utils/apiCall";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import validator from "validator";
import { FiArrowLeft, FiSmartphone, FiMapPin, FiShield } from "react-icons/fi";

const CheckOutPage = () => {
  const { cartItems, clear } = UseCartContext();
  const { user } = UseAuthContext();
  const [phoneNo, setPhoneNo] = useState("");
  const [address, setAddress] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const placeOrder = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    if (!phoneNo) {
      toast.error("Please fill in your phone number");
      setIsSubmitting(false);
      return;
    }
    if (!validator.isMobilePhone(phoneNo, "en-KE")) {
      toast.error("Please enter a valid Kenyan phone number (e.g. 07XXXXXXXX)");
      setIsSubmitting(false);
      return;
    }
    
    if (!address) {
      toast.error("Please fill in your delivery address");
      setIsSubmitting(false);
      return;
    }

    const order = {
      dishes: cartItems.map((item) => ({
        dish_id: item.id,
        quantity: item.quantity,
        unit_price: item.price,
      })),
      delivery_address: address,
      delivery_phone: phoneNo,
    };

    apiCall("/orders/stkPush", "POST", order)
      .then((res) => {
        navigate("/confirmPayment");
        clear();
      })
      .catch((err) => {
        toast.error("Payment request failed. Please try again");
      })
      .finally(() => {
        setIsSubmitting(false);
      });
  };

  const total = cartItems.reduce(
    (acc, item) => acc + item.quantity * item.price,
    0
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Link 
          to="/cart" 
          className="flex items-center text-gray-600 hover:text-gray-900 mb-8 transition-colors"
        >
          <FiArrowLeft className="mr-2" />
          Back to Cart
        </Link>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Order Summary */}
          <div className="lg:w-2/3 bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center mb-6">
              <h2 className="text-xl font-bold text-gray-900">Complete Your M-Pesa Payment</h2>
            </div>

            <div className="mb-8">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Order Summary</h3>
              <div className="space-y-4">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex items-start border-b pb-4">
                    <img 
                      src={`${SERVER_URL}/${item?.image}`} 
                      alt={item.name} 
                      className="w-16 h-16 rounded-lg object-cover mr-4"
                    />
                    <div className="flex-1">
                      <h4 className="font-medium text-gray-900">{item.name}</h4>
                      <p className="text-sm text-gray-500 mt-1">Qty: {item.quantity}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">Ksh {item.price * item.quantity}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="border-t pt-4">
              <div className="flex justify-between items-center mb-2">
                <span className="text-gray-600">Subtotal</span>
                <span className="font-medium">Ksh {total}</span>
              </div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-gray-600">Delivery Fee</span>
                <span className="font-medium">Ksh 0</span>
              </div>
              <div className="flex justify-between items-center pt-4 border-t mt-4">
                <span className="text-lg font-bold">Total</span>
                <span className="text-lg font-bold">Ksh {total}</span>
              </div>
            </div>
          </div>

          {/* Payment Form */}
          <div className="lg:w-1/3">
            <div className="bg-white rounded-xl shadow-sm p-6 sticky top-8">
              <h3 className="text-lg font-semibold text-gray-900 mb-6">Payment Details</h3>
              
              <form onSubmit={placeOrder} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1  items-center">
                    <FiSmartphone className="mr-2 text-gray-500" />
                    M-Pesa Phone Number
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      value={phoneNo}
                      onChange={(e) => setPhoneNo(e.target.value)}
                      placeholder="e.g. 0712345678"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition outline-none"
                    />
                    <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                      <span className="text-gray-500">+254</span>
                    </div>
                  </div>
                  <p className="mt-1 text-xs text-gray-500">Enter the phone number registered with M-Pesa</p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1 items-center">
                    <FiMapPin className="mr-2 text-gray-500" />
                    Delivery Address
                  </label>
                  <input
                    type="text"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder="Enter your full delivery address"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition outline-none"
                  />
                </div>

                <div className="flex items-start mt-6">
                  <div className="flex items-center h-5">
                    <input
                      id="terms"
                      name="terms"
                      type="checkbox"
                      required
                      className="focus:ring-green-500 h-4 w-4 text-green-600 border-gray-300 rounded"
                    />
                  </div>
                  <div className="ml-3 text-sm">
                    <label htmlFor="terms" className="font-medium text-gray-700">
                      I agree to the{' '}
                      <Link to="/terms" className="text-green-600 hover:text-green-800">
                        terms and conditions
                      </Link>
                    </label>
                  </div>
                </div>

                <div className="pt-4">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-white font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition ${isSubmitting ? 'bg-green-400' : 'bg-green-600 hover:bg-green-700'}`}
                  >
                    {isSubmitting ? (
                      <>
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Processing...
                      </>
                    ) : (
                      <>
                        Pay with M-Pesa
                      </>
                    )}
                  </button>
                </div>

                <div className="flex items-center text-xs text-gray-500 mt-4">
                  <FiShield className="mr-2 text-green-500" />
                  <span>Your payment is secured with M-Pesa</span>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckOutPage;