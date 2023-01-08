import React, { useEffect, useState } from "react";

import OrderList from "../Components/OrderList";
import Footer from "../Components/Footer";
import { apiCall } from "../utils/apiCall";

const OrdersListPage = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const getOrders = async () => {
      const data = await apiCall("/orders", "GET");

      if (data) {
        setOrders(data.orders);
      }
    };

    getOrders();
  }, []);

  const cancelOrder = async (order_id) => {
    const data = await apiCall(`/orders/${order_id}`, "PATCH", {
      order_status: "CANCELLED",
    });

    if (data) {
      const updatedOrder = data.order;

      setOrders((prevOrders) => {
        return prevOrders.map((order) => {
          if (order.order_id === updatedOrder.order_id) {
            return updatedOrder;
          }
          return order;
        });
      });
    }
  };

  return (
    <div className="mt-32">
      <OrderList orders={orders} onCancelOrder={cancelOrder} />
      
      <Footer/>
    </div>
  );
};

export default OrdersListPage;
