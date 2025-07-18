import React from "react";
import { SERVER_URL } from "../../constants";
import { formatDateTime } from "../../utils/functions";
import { FiPackage, FiTruck, FiCheckCircle, FiXCircle, FiClock, FiDollarSign, FiMapPin, FiPhone, FiUser, FiMail } from "react-icons/fi";

const StatusBadge = ({ status }) => {
  const statusConfig = {
    PENDING: { color: "bg-yellow-100 text-yellow-800", icon: <FiClock className="mr-1" /> },
    ACCEPTED: { color: "bg-blue-100 text-blue-800", icon: <FiCheckCircle className="mr-1" /> },
    REJECTED: { color: "bg-red-100 text-red-800", icon: <FiXCircle className="mr-1" /> },
    READY_FOR_DELIVERY: { color: "bg-purple-100 text-purple-800", icon: <FiPackage className="mr-1" /> },
    DELIVERED: { color: "bg-green-100 text-green-800", icon: <FiTruck className="mr-1" /> },
    COMPLETED: { color: "bg-indigo-100 text-indigo-800", icon: <FiCheckCircle className="mr-1" /> }
  };

  return (
    <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${statusConfig[status]?.color || 'bg-gray-100 text-gray-800'}`}>
      {statusConfig[status]?.icon}
      {status}
    </span>
  );
};

const DetailCard = ({ title, value, icon }) => (
  <div className="flex items-start space-x-3 py-3 border-b border-gray-100">
    <div className="flex-shrink-0 h-10 w-10 rounded-full bg-gray-50 flex items-center justify-center text-gray-500">
      {icon}
    </div>
    <div>
      <p className="text-sm font-medium text-gray-500">{title}</p>
      <p className="text-base font-medium text-gray-900">{value || '-'}</p>
    </div>
  </div>
);

const OrderedDishItem = ({ dishOrderDetails, dishDetails }) => {
  return (
    <div className="flex items-center justify-between py-4 border-b border-gray-200 last:border-0">
      <div className="flex items-center space-x-4">
        <div className="flex-shrink-0 h-20 w-20 rounded-md overflow-hidden">
          <img
            className="w-full h-full object-cover"
            src={`${SERVER_URL}/${dishDetails?.image}`}
            alt={dishDetails?.name}
          />
        </div>
        <div>
          <h4 className="text-sm font-medium text-gray-900 capitalize">{dishDetails?.name}</h4>
          <p className="text-sm text-gray-500">{dishOrderDetails?.dish_name}</p>
        </div>
      </div>
      <div className="text-right">
        <div className="text-sm text-gray-500">{dishOrderDetails?.quantity} × Ksh {dishOrderDetails?.unit_price}</div>
        <div className="text-base font-medium text-gray-900">Ksh {dishOrderDetails?.quantity * dishOrderDetails?.unit_price}</div>
      </div>
    </div>
  );
};

const ActionButton = ({ onClick, children, variant = "primary" }) => {
  const variants = {
    primary: "bg-blue-600 hover:bg-blue-700 text-white",
    danger: "bg-red-600 hover:bg-red-700 text-white",
    success: "bg-green-600 hover:bg-green-700 text-white",
    secondary: "bg-purple-600 hover:bg-purple-700 text-white"
  };

  return (
    <button
      onClick={onClick}
      className={`px-4 py-2 rounded-md font-medium transition-colors ${variants[variant]}`}
    >
      {children}
    </button>
  );
};

const OrderView = ({ order, updateOrder }) => {
  const rejectOrder = () => updateOrder(order.order_id, "REJECTED");
  const acceptOrder = () => updateOrder(order.order_id, "ACCEPTED");
  const markReadyForDelivery = () => updateOrder(order.order_id, "READY_FOR_DELIVERY");
  const markDelivered = () => updateOrder(order.order_id, "DELIVERED");
  const completeOrder = () => updateOrder(order.order_id, "COMPLETED");

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="bg-white shadow rounded-lg overflow-hidden">
        {/* Order Header */}
        <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
          <div className="flex items-center justify-between">
           <div>
             <h2 className="text-xl font-bold text-gray-900">  Order #{order?.order_id} </h2>
            <div className="mt-1 flex items-center space-x-2">
              <StatusBadge status={order?.order_status} />
              <span className="text-sm text-gray-500">
                {formatDateTime(order?.order_date)}
              </span>
            </div>
           </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-6">
          {/* Order Details */}
          <div className="space-y-4">
            <h2 className="text-lg font-medium text-gray-900">Order Details</h2>
            <div className="bg-gray-50 rounded-lg p-4">
              <DetailCard
                title="Customer Name"
                value={order?.user?.name}
                icon={<FiUser />}
              />
              <DetailCard
                title="Customer Email"
                value={order?.user?.email}
                icon={<FiMail />}
              />
              <DetailCard
                title="Delivery Address"
                value={order?.delivery_address}
                icon={<FiMapPin />}
              />
              <DetailCard
                title="Delivery Phone"
                value={order?.delivery_phone}
                icon={<FiPhone />}
              />
            </div>

            {/* Order Actions */}
            <div className="space-y-4">
              <h2 className="text-lg font-medium text-gray-900">
                Order Actions
              </h2>
              <div className="flex flex-wrap gap-3">
                {order?.order_status === "PENDING" && (
                  <>
                    <ActionButton onClick={acceptOrder} variant="success">
                      Accept Order
                    </ActionButton>
                    <ActionButton onClick={rejectOrder} variant="danger">
                      Reject Order
                    </ActionButton>
                  </>
                )}
                {order?.order_status === "ACCEPTED" && (
                  <ActionButton
                    onClick={markReadyForDelivery}
                    variant="secondary"
                  >
                    Ready for Delivery
                  </ActionButton>
                )}
                {order?.order_status === "READY_FOR_DELIVERY" && (
                  <ActionButton onClick={markDelivered}>
                    Mark as Delivered
                  </ActionButton>
                )}
                {order?.order_status === "DELIVERED" && (
                  <ActionButton onClick={completeOrder} variant="success">
                    Complete Order
                  </ActionButton>
                )}
              </div>
            </div>
          </div>

          {/* Ordered Items */}
          <div>
            <h2 className="text-lg font-medium text-gray-900 mb-4">
              Ordered Items ({order?.dishes?.length || 0})
            </h2>
            <div className="bg-gray-50 rounded-lg p-4 divide-y divide-gray-200">
              {order?.dishes?.map((dish) => (
                <OrderedDishItem
                  key={dish.id}
                  dishOrderDetails={dish}
                  dishDetails={dish?.metadata}
                />
              ))}
              <div className="flex justify-between items-center pt-4">
                <span className="text-lg font-medium text-gray-900">Total</span>
                <span className="text-xl font-bold text-blue-600">
                  Ksh {order?.total_price}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderView;