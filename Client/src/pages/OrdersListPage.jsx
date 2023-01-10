import React, { useEffect, useState } from "react";
import OrderList from "../Components/OrderList";
import Footer from "../Components/Footer";
import { apiCall } from "../utils/apiCall";
import { SERVER_URL } from "../constants";

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

  const handleDelete = (id) => {
    apiCall(`${SERVER_URL}/orders/${id}`, "DELETE").then((response) => {
      setOrders((items) => items.filter((item) => item.id !== id));
    });
  };

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
      <OrderList orders={orders} onCancelOrder={cancelOrder}  handleDelete={handleDelete}/>
      
      <Footer/>
    </div>
  );
};

export default OrdersListPage;
