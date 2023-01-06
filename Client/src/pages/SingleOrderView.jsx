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
  console.log(order);

  return (
    <div className="mt-32">
      <p 
      className="text-4xl font-bold text-center"> Order View Page for{" "}<span className="text-green-500">{order?.order_id}</span>
      </p>
      <br />
      <p className="text-2xl font-bold text-center text-gray-600"> You have access to the order here design the UI</p>
    </div>
  );
};

export default SingleOrderView;
