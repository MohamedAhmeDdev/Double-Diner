import React, { useEffect, useState } from "react";
import OrderList from "../Components/orders/OrderList";
import { apiCall } from "../utils/apiCall";
import { Link } from "react-router-dom";
import { RiDashboardLine } from "react-icons/ri";
import { GiShoppingCart } from "react-icons/gi";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(10);

  

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

  return (
  <div className="flex flex-col">
    <nav className="flex h-16 items-center mb-3 pl-4 lg:pl-6 border-b border-gray-100 bg-white" aria-label="Breadcrumb">
            <ol className="flex items-center space-x-2">
              <li className="flex items-center">
                <Link 
                  to="/" 
                  className="group flex items-center transition-all duration-200 hover:-translate-x-0.5"
                >
                  <div className="p-1.5 rounded-lg bg-indigo-50 group-hover:bg-indigo-100 mr-2 transition-colors duration-200 shadow-sm">
                    <RiDashboardLine className="text-indigo-600 group-hover:text-indigo-700" size={16} />
                  </div>
                  <span className="text-sm font-medium text-indigo-600 group-hover:text-indigo-800 transition-colors duration-200">
                    Dashboard
                  </span>
                </Link>
              </li>
              <li className="flex items-center">
                <svg
                  className="h-4 w-4 text-gray-300 mx-1"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
                <span className="text-sm font-medium text-gray-600 ml-1 flex items-center">
                  <GiShoppingCart className="mr-1.5 text-green-500" size={16} />
                  Orders
                </span>
              </li>
            </ol>
    </nav>

    <OrderList
     orders={currentPosts}
    postsPerPage={postsPerPage}
    totalPosts={orders.length}
    paginate={paginate}
    currentPage={currentPage}
    setCurrentPage={setCurrentPage}

    />
  </div>
  )
};

export default Orders;
