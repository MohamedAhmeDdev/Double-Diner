import React, { useEffect, useState } from "react";
import { apiCall } from "../utils/apiCall";
import { formatDate, formatTime } from "../constants/index";
import { useParams } from "react-router-dom";
import { SERVER_URL } from "../constants";
import { FiArrowLeft, FiClock, FiMapPin, FiPhone, FiPackage } from "react-icons/fi";
import { Link } from "react-router-dom";

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

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header with back button */}
        <div className="mb-6">
          <Link 
            to="/orders" 
            className="flex items-center text-gray-600 hover:text-gray-900 transition-colors"
          >
            <FiArrowLeft className="mr-2" />
            Back to Orders
          </Link>
        </div>

        {/* Order Card */}
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          {/* Order Header */}
          <div className="bg-gray-900 text-white px-6 py-4">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
              <h1 className="text-xl font-bold">Order #{order.order_id}</h1>
              <div className="mt-2 sm:mt-0">
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                  order.status === 'completed' ? 'bg-green-100 text-green-800' : 
                  order.status === 'pending' ? 'bg-yellow-100 text-yellow-800' : 
                  'bg-blue-100 text-blue-800'
                }`}>
                  {order.order_status}
                </span>
              </div>
            </div>
          </div>

          {/* Order Details */}
          <div className="p-6">
            {/* Delivery Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className="bg-gray-50 p-4 rounded-lg">
                <h2 className="flex items-center text-lg font-semibold text-gray-800 mb-3">
                  <FiMapPin className="mr-2 text-green-600" />
                  Delivery Information
                </h2>
                <p className="text-gray-700 capitalize">{order.delivery_address}</p>
                <p className="flex items-center text-gray-600 mt-2">
                  <FiPhone className="mr-2" />
                  {order.delivery_phone}
                </p>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg">
                <h2 className="flex items-center text-lg font-semibold text-gray-800 mb-3">
                  <FiClock className="mr-2 text-green-600" />
                  Order Timeline
                </h2>
                <p className="text-gray-700">
                  <span className="font-medium">Placed on:</span> {formatDate(order.order_date)} at {formatTime(order.order_date)}
                </p>
                {order.delivery_time && (
                  <p className="text-gray-700 mt-2">
                    <span className="font-medium">Delivered on:</span> {formatDate(order.delivery_time)} at {formatTime(order.delivery_time)}
                  </p>
                )}
              </div>
            </div>

            {/* Order Items */}
            <div className="mb-8">
              <h2 className="flex items-center text-lg font-semibold text-gray-800 mb-4">
                <FiPackage className="mr-2 text-green-600" />
                Order Items ({order.dishes ? order.dishes.length : 0})
              </h2>
              
              <div className="space-y-4">
                {order && order.dishes && order.dishes.map((dish, index) => (
                  <div key={index} className="flex items-start border-b pb-4 last:border-b-0">
                    <img 
                      className="w-20 h-20 rounded-lg object-cover mr-4"
                      src={`${SERVER_URL}/${dish.metadata.image}`} 
                      alt={dish.metadata.name}
                    />
                    <div className="flex-1">
                      <h3 className="font-medium text-gray-900">{dish.metadata.name}</h3>
                      <p className="text-sm text-gray-500 mt-1">Qty: {dish.quantity}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">Ksh {dish.metadata.price * dish.quantity}</p>
                      <p className="text-sm text-gray-500">Ksh {dish.metadata.price} each</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Order Summary */}
            <div className="border-t pt-6">
              <div className="flex justify-between mb-2">
                <span className="text-gray-600">Subtotal</span>
                <span className="font-medium">Ksh {order.total_price}</span>
              </div>
              <div className="flex justify-between mb-2">
                <span className="text-gray-600">Delivery Fee</span>
                <span className="font-medium">Ksh 0</span>
              </div>
              <div className="flex justify-between pt-4 border-t mt-4">
                <span className="text-lg font-bold">Total</span>
                <span className="text-lg font-bold">Ksh {order.total_price}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleOrderView;