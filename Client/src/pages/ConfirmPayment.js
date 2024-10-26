import React, { useState, useEffect } from 'react';
import { SERVER_URL } from "../constants";
import { apiCall } from "../utils/apiCall";
import ClipLoader from "react-spinners/ClipLoader";
import { Link } from 'react-router-dom';
import { UseCartContext } from "../hook/UseCartContext";

function ConfirmPayment() {
  const { cartItems, clear } = UseCartContext();
  const [RequestID, setRequestID] = useState("");
  const [Message, setMessage] = useState("");
  const [ResponseDescription, setResponseDescription] = useState("");
  const [ResultDesc, setResultDesc] = useState("");
  const [ResultCode, setResultCode] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  const getRequestID = async () => {
    try {
      const res = await apiCall(`${SERVER_URL}/orders/RequestID`, "GET");
      setRequestID(res.user.CheckoutRequestID);
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
        console.log(res);
        setMessage(res.errorMessage);
        setTimeout(() => verifyPayment(id), 3000); 
      } else {
        console.log(res);
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
    getRequestID();
  }, []);


  useEffect(() => {
    if (RequestID) {
      verifyPayment(RequestID);
    }
  }, [RequestID]);


  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
           <div class="absolute inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 p-6">
          <div class="bg-gray-200 w-4/6 p-6 rounded-lg shadow-lg md:mx-auto">
            <div class="flex justify-center items-center py-10 pb-10">
              <ClipLoader size={70} color={"#333333"} />
            </div>
            <div class="text-center">
              <h3 class="md:text-2xl text-base text-gray-900 font-semibold capitalize">{Message}</h3>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="mt-40">
      {ResultCode !== "0" ? (
        <div className="bg-gray-200 w-4/6 p-6 rounded-lg shadow-lg md:mx-auto">
          <svg viewBox="0 0 24 24" className="text-red-500 h-20 w-20 mx-auto my-6" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor">
            <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 11.793a1 1 0 1 1-1.414 1.414L10 11.414l-2.293 2.293a1 1 0 0 1-1.414-1.414L8.586 10 6.293 7.707a1 1 0 0 1 1.414-1.414L10 8.586l2.293-2.293a1 1 0 0 1 1.414 1.414L11.414 10l2.293 2.293Z" />
          </svg>
          <div className="text-center">
            <h3 className="text-gray-600 my-2 text-2xl font-bold">{ResultDesc}</h3>
            <p className="text-md text-gray-900 text-center">{ResponseDescription}</p>
          </div>

          <div>
            <Link to='/'>
             <button class="mt-4  inline-flex w-full items-center justify-center rounded bg-gray-600 py-2.5 px-4 text-base font-semibold tracking-wide text-white text-opacity-80 outline-none ring-offset-2 transition hover:text-opacity-100 focus:ring-2 focus:ring-gray-300 sm:text-lg">
                Retry 
            </button>
          </Link>
          </div>
        </div>
      ) : (
        <div className="bg-gray-200 w-4/6 p-6 rounded-lg shadow-lg md:mx-auto">
          <svg viewBox="0 0 24 24" className="text-green-600 w-16 h-16 mx-auto my-6">
            <path fill="currentColor" d="M12,0A12,12,0,1,0,24,12,12.014,12.014,0,0,0,12,0Zm6.927,8.2-6.845,9.289a1.011,1.011,0,0,1-1.43.188L5.764,13.769a1,1,0,1,1,1.25-1.562l4.076,3.261,6.227-8.451A1,1,0,1,1,18.927,8.2Z" />
          </svg>
          <div className="text-center">
            <h3 className="text-gray-600 my-2 text-2xl font-bold">{ResultDesc}</h3>
            <p className="text-md text-gray-900 text-center">{ResponseDescription}</p>
          </div>


          <div>
          <Link to='/orders'>
             <button class="mt-4  inline-flex w-full items-center justify-center rounded bg-gray-600 py-2.5 px-4 text-base font-semibold tracking-wide text-white text-opacity-80 outline-none ring-offset-2 transition hover:text-opacity-100 focus:ring-2 focus:ring-gray-300 sm:text-lg">
                Order Page
            </button>
          </Link>
          </div>

        </div>
      )}
    </div>
  );
}

export default ConfirmPayment;
