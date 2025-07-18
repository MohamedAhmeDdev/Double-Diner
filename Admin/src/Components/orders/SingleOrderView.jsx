import React, { useEffect, useState } from "react";

import OrderView from "./OrderView";
import { apiCall } from "../../utils/apiCall";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { RiDashboardLine } from "react-icons/ri";
import { GiShoppingCart } from "react-icons/gi";

const SingleOrderView = () => {
  const { id } = useParams();
 const [isLoading, setIsLoading] = useState(true);
  const [order, setOrder] = useState({});

  useEffect(() => {
    const fetchOrder = async () => {
      try{
      const response = await apiCall(`orders/${id}`, "GET");
      setOrder(response.order);
        } catch (error) {
        console.error("Error fetching dish:", error);
      } finally {
        setIsLoading(false);
      }
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
    <div>
        <nav className="flex h-16 items-center mb-3 pl-4 lg:pl-6 border-b border-gray-100 bg-white" aria-label="Breadcrumb">
                  <ol className="flex items-center space-x-2">
                    <li className="flex items-center">
                      <Link  to="/"  className="group flex items-center transition-all duration-200 hover:-translate-x-0.5">
                        <div className="p-1.5 rounded-lg bg-indigo-50 group-hover:bg-indigo-100 mr-2 transition-colors duration-200 shadow-sm">
                          <RiDashboardLine className="text-indigo-600 group-hover:text-indigo-700" size={16} />
                        </div>
                        <span className="text-sm font-medium text-indigo-600 group-hover:text-indigo-800 transition-colors duration-200">
                          Dashboard
                        </span>
                      </Link>
                    </li>

                    <li className="flex items-center">
                        <Link to="/orders" className="group flex items-center transition-all duration-200 hover:-translate-x-0.5">
                      <span>
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
                      </span>
                        <div className="p-1.5 rounded-lg bg-green-50 group-hover:bg-green-100 mr-2 transition-colors duration-200 shadow-sm">
                        <GiShoppingCart className="text-green-500 group-hover:text-green-700" size={16} />
                      </div>
                       <span className="text-sm font-medium text-green-500 group-hover:text-green-500 transition-colors duration-200">
                          Orders
                        </span>
                       </Link>
                    </li>

                      <li className="flex items-center">
                        <Link 
                        to="/orders" 
                        className="group flex items-center transition-all duration-200 hover:-translate-x-0.5"
                      >
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
                       View Order
                      </span>
                       </Link>
                    </li>
                  </ol>
          </nav>

      {order && <OrderView order={order} updateOrder={updateOrder} isLoading={isLoading} />}
      </div>
  );
};

export default SingleOrderView;
