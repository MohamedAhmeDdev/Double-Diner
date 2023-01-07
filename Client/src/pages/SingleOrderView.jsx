import React, { useEffect, useState } from "react";

import { apiCall } from "../utils/apiCall";
import { useParams } from "react-router-dom";


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
      <p 
      className="text-4xl font-bold text-center"> Order View Page for{" "}<span className="text-green-500">{order.order_id}</span>
      </p>
     
      <div className="flex flex-col mb-60 my-10">
        <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
            <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
              <table className="min-w-full divide-y divide-gray-200"> 
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User_Id</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order_Id</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order_Date</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Phone_No</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" >delivery_address</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" >status</th>
                    <th scope="col"className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">total Price</th>
                  </tr>
                </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                      <tr  key={id}>
                          <td className="px-6 py-4 whitespace-nowrap text-left">{order.user_id}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-left">{order.order_id}</td>

                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-left">{order.order_date}</td>

                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-left">{order.delivery_phone}</td>

                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-left">{order.delivery_address}</td>

                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-left">{order.order_status}</td>

                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-left">{order.total_price}</td>
                      </tr>   
                  </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleOrderView;
