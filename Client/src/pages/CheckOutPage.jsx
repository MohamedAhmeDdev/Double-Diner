import React, { useState } from "react";
import { SERVER_URL } from "../constants";
import { UseAuthContext } from "../hook/UseAuthContext";
import { UseCartContext } from "../hook/UseCartContext";
import { apiCall } from "../utils/apiCall";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import validator from "validator";
import ClipLoader from "react-spinners/ClipLoader";


const CheckOutPage = () => {
  const { cartItems, clear } = UseCartContext();
  const { user } = UseAuthContext();
  const [phoneNo, setPhoneNo] = useState("");
  const [address, setAddress] = useState("");

  const navigate = useNavigate();

  const placeOrder = (e) => {
    e.preventDefault();
    if (!phoneNo ) {
      toast.error("Please fill in your phone number");
      return;
    }
    if (!validator.isMobilePhone(phoneNo, "en-KE")) {
      toast.error("Please enter a valid phone number");
      return;
    }
    
    if (!address) {
      toast.error("Please fill in your address");
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
console.log(order);

    apiCall("/orders/stkPush", "POST", order)
    .then((res) => {
      navigate("/confirmPayment");
      setPhoneNo("")
      setAddress("")
    })
    .catch((err) => {
      toast.error("Something went wrong, please try again Later");
    });
};

  const total = cartItems.reduce(
    (acc, item) => acc + item.quantity * item.price,
    0
  );

  return (

      <div class="relative mx-auto w-full mt-16">
        <div class="grid min-h-screen grid-cols-10">
       
          <div class="relative col-span-full flex flex-col py-6 pl-8 pr-4 sm:py-12 lg:col-span-6 lg:py-24 bg-gray-50">
            <h2 class="sr-only text-black">Order summary</h2>
          
            <div class="relative">
              <ul class="space-y-5">
              {cartItems.map((item, id) => (
                <li key={id} class="flex justify-between border-b pb-5">
                  <div class="inline-flex">
                    <img src={`${SERVER_URL}/${item?.image}`} alt="" class="max-h-16" />
                    <div class="ml-3">
                      <p class="text-base font-semibold text-black">{item?.name}</p>
                      <p class="text-sm font-light  text-gray-500 text-opacity-80">{item?.description}</p>
                    </div>
                  </div>
                  <p class="text-sm font-semibold text-black">ksh {item?.price}</p>
                </li>
               ))}
              </ul>

              <div class="space-y-2 border-t">
                <p class="flex justify-between text-lg text-black"><span>Total price:</span><span>ksh. {total} {"/="}</span></p>
              </div>
            </div>

            <div class="relative mt-10 text-black">
              <h3 class="mb-5 text-lg font-bold capitalize">user information</h3>
              <p class="text-sm  text-gray-500 capitalize">{user?.name}</p>
              <p class="mt-1 text-sm  text-gray-500">{user?.email}</p>
              <p class="mt-2 text-xs text-gray-500">Contact us now for payment related issues</p>
            </div>
          
          </div>

          <div class="col-span-full py-6 px-4 sm:py-12 lg:col-span-4 lg:py-24">
            <div class="mx-auto w-full max-w-lg">
              <h1 class="relative text-2xl font-medium text-gray-700 sm:text-3xl">Checkout<span class="mt-2 block h-1 w-10 bg-teal-600 sm:w-20"></span></h1>
              <form onSubmit={placeOrder} class="mt-10 flex flex-col space-y-4">
                <div>
                  <label for="email" class="text-xs font-semibold text-gray-500">Phone Number</label>
                  <input type="text" value={phoneNo}onChange={(e) => setPhoneNo(e.target.value)} placeholder="07-XXXX-XXXX" class="mt-1 block w-full rounded border-gray-300 bg-gray-50 py-3 px-4 text-sm placeholder-gray-300 shadow-sm outline-none transition focus:ring-2 focus:ring-gray-300" />
                </div>
                <div class="relative">
                  <label for="card-number" class="text-xs font-semibold text-gray-500">Address</label>
                  <input type="text"  value={address} onChange={(e) => setAddress(e.target.value)} placeholder="Bronx, NY 10461" class="block w-full rounded border-gray-300 bg-gray-50 py-3 px-4 pr-10 text-sm placeholder-gray-300 shadow-sm outline-none transition focus:ring-2 focus:ring-gray-300" />
                  </div>
          
              <p class="mt-10 text-center text-sm font-semibold text-gray-500">By placing this order you agree to the 
               <Link to="/Terms" class="whitespace-nowrap text-teal-400 underline hover:text-teal-600">Terms and Conditions</Link>
              </p>
              <button type="submit" class="mt-4 inline-flex w-full items-center justify-center rounded bg-gray-600 py-2.5 px-4 text-base font-semibold tracking-wide text-white text-opacity-80 outline-none ring-offset-2 transition hover:text-opacity-100 focus:ring-2 focus:ring-gray-300 sm:text-lg">Place Order</button>
              </form>
            </div>
          </div>
        </div>
      </div>
  );
};

export default CheckOutPage;
