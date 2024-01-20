import React, { useEffect, useState } from "react";
import { apiCall } from "../utils/apiCall"; 
import { formatDate } from "../constants/index"; 
import { formatTime } from "../constants/index"; 
import { useParams } from "react-router-dom";
import { SERVER_URL } from "../constants";

const SingleOrderView = () => {
  const [order, setOrder] = useState({});

  const { id } = useParams();

  useEffect(() => {
    const getOrder = async () => {
      const data = await apiCall(`/orders/${id}`, "GET");

      if (data) {
        setOrder(data.order);
      }
    };

    getOrder();
  }, [id]);

  // You have access to the order here design the UI
  // console.log(order);

  return (
    <div className="mt-32">
       <div class="bg-white p-6 rounded-lg">
        <div class="flex justify-between items-center mb-4 w-full lg:w-8/12 mx-auto">
           <h3 class="text-lg lg:text-3xl font-bold text-black mb-1">Order Information</h3>
           <p><span class="text-gray-400 text-md lg:text-xl">ID:</span><span className="font-bold text-black text-md lg:text-lg"> {""}{order.order_id}</span></p>
        </div>

        <div class="mb-4 w-full lg:w-8/12 mx-auto">
            <div class="flex justify-between mb-4">
                <div className="">
                    <p class="text-xl text-gray-600 font-bold">Delivery to</p>
                    <p class="text-sm">{order.delivery_address}</p>
                    <p class="text-sm  text-gray-600">{order.delivery_phone}</p>
                </div>
            </div>

            <div class="flex justify-between items-center mb-4">
                <div>
                    <p class="text-xl pb-2 font-bold text-gray-600">Delivery Time</p>
                    <p class="text-sm">{formatDate(order.order_date)}</p>
                    <p class="text-sm">{formatTime(order.order_date)}</p>
                </div>

            </div>
        </div>

        <div class="border-t border-gray-300 pt-4 mb-4">
          <div className=" p-5 w-full lg:w-7/12 mx-auto">
        {order && order.dishes && order.dishes.map((dish, index) => (
        <div class="flex justify-between items-center mb-2" key={index}>
          <div class="flex items-center">
            <img class=" w-20 h-20 mr-2" src={`${SERVER_URL}/${dish.metadata.image}`} alt={dish.metadata.name} />
            <div class="text-sm font-bold">{dish.metadata.name}</div>
          </div>
          <div class="text-md text-gray-600">{dish.metadata.name}</div>
        </div>
        ))}



            <div class="flex justify-between text-xs text-gray-600 mb-2">
                {/* <div><p className="font-semibold text-md text-black">{order.dishes.length}  item/s</p></div> */}
            </div>
      

        <div class="flex justify-between items-center font-bold">
            <div class="text-lg lg:text-2xl">Total</div>
            <div class="text-lg lg:text-2xl">ksh {order.total_price}</div>
        </div>
        </div>
        </div>
     </div>     
  </div>
  );
};

export default SingleOrderView;
