import React, { useState, useEffect } from 'react';
import { SERVER_URL } from "../constants";
import { apiCall } from "../utils/apiCall";
import { UseCartContext } from "../hook/UseCartContext";
import { Link } from 'react-router-dom';
import { FiCheckCircle, FiXCircle, FiRotateCw } from 'react-icons/fi';
import ClipLoader from "react-spinners/ClipLoader";

function ConfirmPayment() {
  const { cartItems, clear } = UseCartContext();
  const [requestId, setRequestId] = useState("");
  const [message, setMessage] = useState("Verifying payment with M-Pesa...");
  const [responseDescription, setResponseDescription] = useState("");
  const [resultDesc, setResultDesc] = useState("");
  const [resultCode, setResultCode] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  const getRequestId = async () => {
    try {
      const res = await apiCall(`${SERVER_URL}/orders/RequestID`, "GET");
      setRequestId(res.user.CheckoutRequestID);
    } catch (err) {
      setIsLoading(false);
    }
  };

  const verifyPayment = async (id) => {
    try {
      const order = {
        dishes: cartItems.map((item) => ({
          dish_id: item.id,
          quantity: item.quantity,
          unit_price: item.price,
        })),
      };
  
      const res = await apiCall(`${SERVER_URL}/orders/confirmPayment/${id}`, "POST", order);
  
      if (res.errorMessage === "The transaction is being processed") {
        setMessage(res.errorMessage);
        setTimeout(() => verifyPayment(id), 3000); 
      } else {
        setResponseDescription(res.ResponseDescription);
        setResultDesc(res.ResultDesc);
        setResultCode(res.ResultCode);
        setIsLoading(false);
  
        if (res.ResultCode === '0') { 
          clear();
        }
      }
    } catch (err) {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getRequestId();
  }, []);

  useEffect(() => {
    if (requestId) {
      verifyPayment(requestId);
    }
  }, [requestId]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-50">
        <div className="w-full max-w-md p-8 bg-white rounded-xl shadow-md">
          <div className="flex flex-col items-center space-y-6">
            <div className="relative">
              <ClipLoader size={60} color={"#4F46E5"} />
            </div>
            <div className="text-center space-y-2">
              <h3 className="text-lg font-medium text-gray-900">{message}</h3>
              <p className="text-sm text-gray-500">Please wait while we process your payment</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50 p-4">
      {resultCode !== "0" ? (
        <div className="w-full max-w-md p-8 bg-white rounded-xl shadow-md space-y-6">
          <div className="flex flex-col items-center space-y-4">
            <div className="p-3 bg-red-100 rounded-full">
              <FiXCircle className="text-red-500" size={48} />
            </div>
            <div className="text-center space-y-2">
              <h3 className="text-xl font-semibold text-gray-900">{resultDesc}</h3>
              <p className="text-gray-600">{responseDescription}</p>
            </div>
          </div>
          <Link 
            to='/'
            className="block w-full py-3 px-4 text-center bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-lg transition duration-200"
          >
            Try Again
          </Link>
        </div>
      ) : (
        <div className="w-full max-w-md p-8 bg-white rounded-xl shadow-md space-y-6">
          <div className="flex flex-col items-center space-y-4">
            <div className="p-3 bg-green-100 rounded-full">
              <FiCheckCircle className="text-green-500" size={48} />
            </div>
            <div className="text-center space-y-2">
              <h3 className="text-xl font-semibold text-gray-900">{resultDesc}</h3>
              <p className="text-gray-600">{responseDescription}</p>
            </div>
          </div>
          <Link 
            to='/orders'
            className="block w-full py-3 px-4 text-center bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-lg transition duration-200"
          >
            View Your Orders
          </Link>
        </div>
      )}
    </div>
  );
}

export default ConfirmPayment;