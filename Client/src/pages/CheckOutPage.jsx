import React, { useState } from "react";
import { SERVER_URL } from "../constants";
import { UseAuthContext } from "../hook/UseAuthContext";
import { UseCartContext } from "../hook/UseCartContext";
import { apiCall } from "../utils/apiCall";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import validator from "validator";

const OrderedItem = ({ item }) => (
  <div className="flex items-center justify-between  w-[48rem]">
    <div className="flex items-center space-x-4">
      <div className="flex-shrink-0">
        <img className="w-24 h-24 rounded-md"src={`${SERVER_URL}/${item?.image}`} alt="" />
      </div>

      <div className="flex-1 min-w-0">
        <p className="text-xl font-bold  text-gray-900 truncatecapitalize"> {item?.name}</p>
        <p className="text-gray-600 text-sm truncate  max-w-sm"> {item?.description}</p>
      </div>
    </div>

    <div className="flex flex-col ">
      <span className="text-gray-900 text-lg font-medium"> {item.quantity} x {item?.price}</span>
    </div>
    <span className="text-gray-900 text-lg font-medium"> Ksh. {item?.quantity * item?.price}</span>
  </div>
);

const CheckOutPage = () => {
  const { cartItems, clear } = UseCartContext();
  const { user } = UseAuthContext();

  const [phoneNo, setPhoneNo] = useState("");
  const [address, setAddress] = useState("");

  const navigate = useNavigate();

  const placeOrder = (e) => {
    e.preventDefault();

    if (!phoneNo) {
      toast.error("Please fill in your phone number");
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

    //Note - we do not send the total price to the server because the server will calculate it

    apiCall("/orders", "POST", order)
      .then((res) => {
        toast.success("Order placed successfully");
        navigate("/orders");
        clear()//its clears the cart
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
    <div className="container mt-32 flex flex-col items-center justify-center">
      <div className="flex flex-col items-center justify-center w-full h-full">
        {cartItems?.length > 0 ? (
          <>
            <p className="text-xl font-bold text-gray-900">Dear{" "}
              <span className="text-2xl font-bold text-blue-600 capitalize">{user?.name} </span>
              , with email{" "}
              <span className="text-2xl font-bold text-blue-600 lowercase">{user?.email}</span>{" "}
              you are about to place an order for{" "}
            </p>
            <div className="flex flex-col w-full h-full gap-4 p-2"> {cartItems.map((item) =>
             (<OrderedItem key={item.id} item={item} />
              ))}
            </div>
          </>
        ) : (
          <div className="flex flex-col items-center justify-center h-96 py-12 px-4 sm:px-6 lg:px-8">
            <h1 className="text-2xl font-bold text-gray-900">
              Your cart is empty
            </h1>
          </div>
        )}
      </div>

      <div className="flex flex-col items-center justify-center  py-12 px-4 sm:px-6 lg:px-8">
        <p className="text-xl font-bold text-gray-500 capitalize">
          Your Total is Ksh.{" "}
          <span className="text-3xl font-bold text-gray-900"> {total} {"/="}</span>{" "}
          payable on delivery
        </p>
      </div>

      <div className="block p-6 rounded-lg shadow-lg bg-white max-w-md my-10">
        <p className="text-2xl font-bold text-gray-900">Please fill in Shipping Details </p>

        <form className="mt-4" onSubmit={placeOrder}>
          <div className="form-group mb-6 p-2">
            <label htmlFor="delivery_phone" className="text-gray-700"> Phone Number</label>
            <input
              type="text"
              className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
              id="delivery_phone"  placeholder="e.g 254712345678" value={phoneNo}onChange={(e) => setPhoneNo(e.target.value)}
            />
          </div>

          <div className="form-group mb-6 p-2">
            <label htmlFor="delivery_address" className="text-gray-700"> Address</label>
            <input
              type="text"
              className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
              id="delivery_address" placeholder="e.g 1234 Main St" value={address} onChange={(e) => setAddress(e.target.value)}
            />
          </div>

          <button type="submit"
            className=" w-full px-6 py-3.5 bg-blue-600 text-white font-medium text-md font-bold leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
          >
            Place Order
          </button>
        </form>
      </div>
    </div>
  );
};

export default CheckOutPage;
