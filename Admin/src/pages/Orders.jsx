import React, { useEffect, useState } from "react";

import OrderList from "../Components/orders/OrderList";
import { apiCall } from "../utils/apiCall";

const Orders = () => {
  const [orders, setOrders] = useState([]);

  const fetchOrders = async () => {
    const response = await apiCall("orders", "GET");
    setOrders(response.orders);
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return <OrderList orders={orders} />;
};

export default Orders;
