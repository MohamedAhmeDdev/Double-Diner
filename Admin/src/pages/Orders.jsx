import React, { useEffect, useState } from "react";
import OrderList from "../Components/orders/OrderList";
import { apiCall } from "../utils/apiCall";


const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(2);


  // Get current posts
const indexOfLastPost = currentPage * postsPerPage;
const indexOfFirstPost = indexOfLastPost - postsPerPage;
const currentPosts = orders.slice(indexOfFirstPost, indexOfLastPost);

  // Change page
  const paginate = pageNumber => setCurrentPage(pageNumber);

  const fetchOrders = async () => {
    const response = await apiCall("orders", "GET");
    setOrders(response.orders);
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return <OrderList orders={currentPosts} postsPerPage={postsPerPage} totalPosts={orders.length} paginate={paginate} currentPage={currentPage}/>;
};

export default Orders;
