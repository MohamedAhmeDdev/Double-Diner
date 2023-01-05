import { Link } from "react-router-dom";
import React from "react";
import { formatDateTime } from "../../utils/functions";

const OrderItem = ({ order }) => {
  const {
    order_id,
    order_status,
    order_date,
    total_price,
    delivery_address,
    delivery_phone,
  } = order;

  return (
    <tr>
      <td className="px-6 py-4 whitespace-nowrap text-left">
        <div className="flex items-center">
          <div className="ml-4">
            <div className="text-sm font-medium text-gray-900">{order_id}</div>
          </div>
        </div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-left">
        <div className="text-sm text-gray-900">{order.user.name}</div>
        <div className="text-sm text-gray-500">{order.user.email}</div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-left">
        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
          {order_status}
        </span>
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-left">
        {formatDateTime(order_date)}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-left">
        {total_price}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-left">
        {delivery_address}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-left">
        {delivery_phone}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium text-left">
        <Link
          to={`/orders/${order_id}`}
          className="text-indigo-600 hover:text-indigo-900"
        >
          View
        </Link>
      </td>
    </tr>
  );
};

export default OrderItem;
