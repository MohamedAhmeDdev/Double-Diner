import { Link } from "react-router-dom";
import React from "react";
import { formatDateTime } from "../utils/functions";
import { FiEye, FiX, FiTrash2, FiClock, FiCheckCircle, FiTruck } from "react-icons/fi";

const OrderItem = ({ order, onCancelOrder, handleDelete }) => {
  const formatItemsListToSting = (items = []) => {
    const itemsList = items.map((item) => item.name);
    if (itemsList.length > 3) {
      return itemsList.slice(0, 3).join(", ") + ` +${itemsList.length - 3}`;
    }
    return itemsList.join(", ");
  };

  const orderedItems = order?.dishes?.map((item) => item?.metadata);

  const getStatusBadge = (status) => {
    switch(status) {
      case 'PENDING':
        return (
          <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-yellow-100 text-yellow-800">
            <FiClock className="mr-1" /> Pending
          </span>
        );
      case 'COMPLETED':
        return (
          <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
            <FiCheckCircle className="mr-1" /> Completed
          </span>
        );
      case 'CANCELLED':
        return (
          <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-red-100 text-red-800">
            <FiX className="mr-1" /> Cancelled
          </span>
        );
      case 'DELIVERED':
        return (
          <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
            <FiTruck className="mr-1" /> Delivered
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-gray-100 text-gray-800">
            {status}
          </span>
        );
    }
  };

  return (
    <tr className="border-b border-gray-200 hover:bg-gray-50 transition-colors">
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="text-sm font-medium text-gray-900">#{order.order_id}</div>
      </td>

      <td className="px-6 py-4 whitespace-nowrap">
        <div className="text-sm text-gray-500">{formatDateTime(order.order_date)}</div>
      </td>

      <td className="px-6 py-4 whitespace-nowrap">
        <div className="text-sm font-semibold text-gray-900">Ksh {order.total_price}</div>
      </td>

      <td className="px-6 py-4 whitespace-nowrap">
        {getStatusBadge(order.order_status)}
      </td>

      <td className="px-6 py-4">
        <div className="text-sm text-gray-500 max-w-xs truncate">
          {formatItemsListToSting(orderedItems)}
        </div>
      </td>

      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
        <div className="flex items-center space-x-2">
          <Link 
            to={`/orders/${order.order_id}`}
            className="text-gray-600 hover:text-blue-600 transition-colors p-2 rounded-full hover:bg-blue-50"
            title="View Details"
          >
            <FiEye size={18} />
          </Link>
          
          {order.order_status === "PENDING" && (
            <button
              onClick={() => onCancelOrder(order.order_id)}
              className="text-gray-600 hover:text-red-600 transition-colors p-2 rounded-full hover:bg-red-50"
              title="Cancel Order"
            >
              <FiX size={18} />
            </button>
          )}

          {order.order_status === "CANCELLED" && (
            <button
              onClick={() => handleDelete(order.order_id)}
              className="text-gray-600 hover:text-red-600 transition-colors p-2 rounded-full hover:bg-red-50"
              title="Delete Order"
            >
              <FiTrash2 size={18} />
            </button>
          )}
        </div>
      </td>
    </tr>
  );
};

const OrderList = ({ orders, onCancelOrder, handleDelete }) => {
  return (
    <div className="bg-white shadow rounded-lg overflow-hidden">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Order ID
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Date
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Amount
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Items
              </th>
              <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {orders?.length > 0 ? (
              orders.map((order) => (
                <OrderItem 
                  key={order.order_id} 
                  order={order} 
                  onCancelOrder={onCancelOrder} 
                  handleDelete={handleDelete} 
                />
              ))
            ) : (
              <tr>
                <td colSpan={6} className="px-6 py-12 text-center">
                  <div className="flex flex-col items-center justify-center">
                    {/* <FiPackage className="mx-auto h-12 w-12 text-gray-400" /> */}
                    <h3 className="mt-2 text-lg font-medium text-gray-900">No orders found</h3>
                    <p className="mt-1 text-sm text-gray-500">Get started by placing a new order.</p>
                    <div className="mt-6">
                      <Link
                        to="/menu"
                        className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                      >
                        Browse Menu
                      </Link>
                    </div>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OrderList;