import React, { useEffect, useState } from "react";

import OrderView from "./OrderView";
import { apiCall } from "../../utils/apiCall";
import { useParams } from "react-router-dom";

const SingleOrderView = () => {
  const { id } = useParams();

  const [order, setOrder] = useState({});

  useEffect(() => {
    const fetchOrder = async () => {
      const response = await apiCall(`orders/${id}`, "GET");
      setOrder(response.order);
    };

    fetchOrder();
  }, [id]);

  const updateOrder = (order_id, status) => {
    apiCall(`orders/${order_id}`, "PATCH", { order_status: status })
      .then((response) => {
        setOrder(response.order);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div>{order && <OrderView order={order} updateOrder={updateOrder} />}</div>
  );
};

export default SingleOrderView;
