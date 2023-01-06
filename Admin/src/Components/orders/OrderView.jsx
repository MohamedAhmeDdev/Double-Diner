import React from "react";
import { SERVER_URL } from "../../constants";
import { formatDateTime } from "../../utils/functions";

const DetailItem = ({ label, value }) => (
  <div className="flex items-center">
    <div className="flex flex-col">
      <span className="text-gray-600 text-sm">{label}</span>
      <span className="text-gray-900 text-lg font-medium">{value}</span>
    </div>
  </div>
);

const OrderedDishItem = ({ dishOrderDetails, dishDetails }) => {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center space-x-4">
        <div className="flex-shrink-0">
          <img
            className="w-24 h-24 rounded-md"
            src={`${SERVER_URL}/${dishDetails?.image}`}
            alt=""
          />
        </div>

        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium text-gray-900 truncate capitalize">  {dishDetails?.name}</p>
        </div>
      </div>

      <div className="flex flex-col">
        <span className="text-gray-600 text-sm">
          {dishOrderDetails?.dish_name}
        </span>
        <span className="text-gray-900 text-lg font-medium">
          {dishOrderDetails?.quantity} x {dishOrderDetails?.unit_price}
        </span>
      </div>
      <span className="text-gray-900 text-lg font-medium">
        Ksh. {dishOrderDetails?.quantity * dishOrderDetails?.unit_price}
      </span>
    </div>
  );
};

const OrderView = ({ order, updateOrder }) => {
  const rejectOrder = () => {
    updateOrder(order.order_id, "REJECTED");
  };

  const acceptOrder = () => {
    updateOrder(order.order_id, "ACCEPTED");
  };

  const markReadyForDelivery = () => {
    updateOrder(order.order_id, "READY_FOR_DELIVERY");
  };

  const markDelivered = () => {
    updateOrder(order.order_id, "DELIVERED");
  };

  const completeOrder = () => {
    updateOrder(order.order_id, "COMPLETED");
  };

  const btn_class_name =
    "inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out";

  return (
    <div
      className="flex h-full w-full
    justify-center items-center
    flex-col space-y-4 md:space-y-0 md:flex-row md:space-x-4
    "
    >
      <div className="rounded-lg shadow-lg bg-white w-[32rem]">
        <div className="p-6 flex flex-col space-y-4 w-full">
          <div className="flex flex-col space-y-4">
            <DetailItem label="Order ID" value={order.order_id} />
            <DetailItem
              label="Order Date"
              value={formatDateTime(order?.order_date)}
            />
            <DetailItem label="Order Status" value={order?.order_status} />

            <DetailItem
              label="Delivery Address"
              value={order?.delivery_address}
            />

            <DetailItem label="Delivery Phone" value={order?.delivery_phone} />
            <DetailItem label="Customer Name" value={order?.user?.name} />
            <DetailItem label="Customer Email" value={order?.user?.email} />
          </div>

          <div className="flex flex-col md:flex-row space-y-4 justify-between items-center">
            {order?.order_status === "PENDING" && (
              <>
                <button type="button" className={btn_class_name} onClick={acceptOrder}>Confirm</button>
                <button type="button" className={btn_class_name} onClick={rejectOrder}>Reject</button>
              </>
            )}

            {order?.order_status === "ACCEPTED" && (
              <button type="button" className={btn_class_name}onClick={markReadyForDelivery}> Mark Ready For Delivery </button>
            )}
            
            {order?.order_status === "READY_FOR_DELIVERY" && (
              <button type="button"className={btn_class_name} onClick={markDelivered}> Mark Delivered </button>
            )}

            {order?.order_status === "DELIVERED" && (
              <button type="button" className={btn_class_name} onClick={completeOrder}>Complete Order</button>
            )}
          </div>
        </div>
      </div>

      {/** dishes  image, name, price and quantiy */}
      <div className="rounded-lg shadow-lg bg-white w-[32rem] flex flex-col space-y-4 p-6">
        {order?.dishes?.map((dish) => (
          <OrderedDishItem
            dishOrderDetails={dish}
            key={Math.random()} //?
            dishDetails={dish?.metadata}//?
          />
        ))}
          <DetailItem label="Total Price" value={`Ksh. ${order?.total_price}`} />
      </div>
    </div>
  );
};

export default OrderView;
