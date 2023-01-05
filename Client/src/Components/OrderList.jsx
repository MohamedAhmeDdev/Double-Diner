import { Link } from "react-router-dom";
import React from "react";
import { formatDateTime } from "../utils/functions";

const OrderItem = ({ order, onCancelOrder }) => {
  const formatItemsListToSting = (items = []) => {
    const itemsList = items.map((item) => item.name);

    if (itemsList.length > 3) {
      return (
        itemsList.slice(0, 3).join(", ") + ` + ${itemsList.length - 3}  more`
      );
    }

    return itemsList.join(", ");
  };

  const orderedItems = order?.dishes?.map((item) => item?.metadata);

  return (
    <tr className="border-b border-gray-200 hover:bg-gray-100">
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
        {order.order_id}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
        {formatDateTime(order.order_date)}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
        Ksh. {order.total_price}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
        {order.order_status}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500       max-w-2xl overflow-hidden overflow-ellipsis truncate ">
        {formatItemsListToSting(orderedItems)}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
        <div className="flex justify-center gap-2">
          <Link to={`/orders/${order.order_id}`}>
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
              View
            </button>
          </Link>
          {order.order_status === "PENDING" && (
            <button
              className="bg-red-800 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
              onClick={() => onCancelOrder(order.order_id)}
            >
              Cancel
            </button>
          )}
        </div>
      </td>
    </tr>
  );
};

const OrderList = ({ orders, onCancelOrder }) => {
  return (
    <div className="flex flex-col">
      <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="py-4 inline-block min-w-full sm:px-6 lg:px-8">
          <div className="overflow-hidden">
            <table className="min-w-full text-center">
              <thead className="border-b bg-gray-800">
                <tr>
                  <th
                    scope="col"
                    className="text-sm font-medium text-white px-6 py-4"
                  >
                    OrderId
                  </th>
                  <th
                    scope="col"
                    className="text-sm font-medium text-white px-6 py-4"
                  >
                    Date
                  </th>
                  <th
                    scope="col"
                    className="text-sm font-medium text-white px-6 py-4"
                  >
                    Total Amount
                  </th>
                  <th
                    scope="col"
                    className="text-sm font-medium text-white px-6 py-4"
                  >
                    Status
                  </th>
                  <th
                    scope="col"
                    className="text-sm font-medium text-white px-6 py-4"
                  >
                    Items Ordered
                  </th>
                  <th
                    scope="col"
                    className="text-sm font-medium text-white px-6 py-4"
                  >
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {orders?.length > 0 ? (
                  <>
                    {orders.map((order) => (
                      <OrderItem
                        key={order.order_id}
                        order={order}
                        onCancelOrder={onCancelOrder}
                      />
                    ))}
                  </>
                ) : (
                  <tr>
                    <td
                      colSpan={6}
                      className="text-center text-2xl font-bold text-gray-600"
                    >
                      No Orders Found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderList;
