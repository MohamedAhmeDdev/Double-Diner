import React from "react";
import { Link } from "react-router-dom";
import { 
  FiEye, FiX, FiTrash2, FiClock, FiCheckCircle, 
  FiTruck, FiPackage, FiShoppingBag, FiCalendar,
  FiCreditCard, FiAlertCircle
} from "react-icons/fi";
import { formatDateTime } from "../utils/functions";

// Skeleton row component
const SkeletonRow = () => (
  <tr className="border-b border-gray-100 animate-pulse">
    <td className="px-6 py-4">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 bg-gray-200 rounded-xl"></div>
        <div className="h-4 bg-gray-200 rounded w-24"></div>
      </div>
    </td>
    <td className="px-6 py-4">
      <div className="h-4 bg-gray-200 rounded w-20"></div>
    </td>
    <td className="px-6 py-4">
      <div className="h-8 bg-gray-200 rounded-full w-24"></div>
    </td>
    <td className="px-6 py-4">
      <div className="h-4 bg-gray-200 rounded w-16"></div>
    </td>
    <td className="px-6 py-4">
      <div className="h-6 bg-gray-200 rounded w-16"></div>
    </td>
    <td className="px-6 py-4">
      <div className="h-4 bg-gray-200 rounded w-32"></div>
    </td>
    <td className="px-6 py-4">
      <div className="h-4 bg-gray-200 rounded w-28"></div>
    </td>
    <td className="px-6 py-4">
      <div className="flex items-center justify-end gap-2">
        <div className="h-9 w-9 bg-gray-200 rounded-xl"></div>
      </div>
    </td>
  </tr>
);

// Status configuration
const STATUS_CONFIG = {
  PENDING: {
    bg: "bg-amber-50",
    text: "text-amber-700",
    border: "border-amber-200",
    icon: FiClock,
    label: "Pending",
    dotColor: "bg-amber-500"
  },
  ACCEPTED: {
    bg: "bg-sky-50",
    text: "text-sky-700",
    border: "border-sky-200",
    icon: FiCheckCircle,
    label: "Accepted",
    dotColor: "bg-sky-500"
  },
  READY_FOR_DELIVERY: {
    bg: "bg-purple-50",
    text: "text-purple-700",
    border: "border-purple-200",
    icon: FiPackage,
    label: "Ready for Delivery",
    dotColor: "bg-purple-500"
  },
  DELIVERED: {
    bg: "bg-blue-50",
    text: "text-blue-700",
    border: "border-blue-200",
    icon: FiTruck,
    label: "Delivered",
    dotColor: "bg-blue-500"
  },
  COMPLETED: {
    bg: "bg-emerald-50",
    text: "text-emerald-700",
    border: "border-emerald-200",
    icon: FiCheckCircle,
    label: "Completed",
    dotColor: "bg-emerald-500"
  },
  REJECTED: {
    bg: "bg-rose-50",
    text: "text-rose-700",
    border: "border-rose-200",
    icon: FiX,
    label: "Rejected",
    dotColor: "bg-rose-500"
  },
  CANCELLED: {
    bg: "bg-rose-50",
    text: "text-rose-700",
    border: "border-rose-200",
    icon: FiX,
    label: "Cancelled",
    dotColor: "bg-rose-500"
  }
};

// Payment Method Badge
const PaymentMethodBadge = ({ method }) => {
  const getMethodColor = (method) => {
    const colors = {
      cash: "bg-green-50 text-green-700 border-green-200",
      card: "bg-blue-50 text-blue-700 border-blue-200",
      mpesa: "bg-purple-50 text-purple-700 border-purple-200",
      bank_transfer: "bg-indigo-50 text-indigo-700 border-indigo-200"
    };
    return colors[method?.toLowerCase()] || "bg-gray-50 text-gray-700 border-gray-200";
  };

  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border ${getMethodColor(method)}`}>
      <FiCreditCard size={12} />
      {method ? method.replace(/_/g, ' ').charAt(0).toUpperCase() + method.replace(/_/g, ' ').slice(1).toLowerCase() : 'N/A'}
    </span>
  );
};

const OrderItem = ({ order, handleDelete }) => {
  // Format items list - updated to use the dish name directly
  const formatItemsListToString = (dishes = []) => {
    const itemsList = dishes.map((dish) => dish?.name || "Unknown").filter(Boolean);
    if (itemsList.length === 0) return "No items";
    if (itemsList.length > 3) {
      return `${itemsList.slice(0, 3).join(", ")} +${itemsList.length - 3} more`;
    }
    return itemsList.join(", ");
  };

  // Get the dishes array
  const dishes = order?.dishes;
  const statusConfig = STATUS_CONFIG[order.order_status];
  const StatusIcon = statusConfig.icon;

  const getStatusBadge = () => (
    <span className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold border ${statusConfig.bg} ${statusConfig.text} ${statusConfig.border}`}>
      <StatusIcon size={14} className="flex-shrink-0" />
      {statusConfig.label}
    </span>
  );

  const getActionButtons = () => {
    const buttons = [];

    // View button - always visible
    buttons.push(
      <Link
        key="view"
        to={`/orders/${order.order_id}`}
        className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white hover:bg-gray-900 border border-gray-200 text-gray-700 hover:text-white rounded-lg text-xs font-medium transition-all duration-200 hover:shadow-md"
      >
        <FiEye size={15} /> View
      </Link>
    );

    // Delete button for cancelled/rejected orders only
    if (order.order_status === "CANCELLED" || order.order_status === "REJECTED") {
      buttons.push(
        <button
          key="delete"
          onClick={() => {
            if (window.confirm('Are you sure you want to permanently delete this order?')) {
              handleDelete(order.order_id);
            }
          }}
          className="p-2 rounded-lg text-gray-400 hover:text-rose-600 hover:bg-rose-50 transition-all duration-200"
          title="Delete Order"
        >
          <FiTrash2 size={18} />
        </button>
      );
    }

    return buttons;
  };

  return (
    <tr className="border-b border-gray-100 hover:bg-gray-50/50 transition-all duration-200 group whitespace-nowrap">
      {/* Order ID */}
      <td className="px-6 py-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gray-100 rounded-xl flex items-center justify-center group-hover:scale-105 transition-transform duration-200">
            <FiShoppingBag className="text-gray-700" size={16} />
          </div>
          <div>
            <span className="font-semibold text-gray-900 text-sm">#{order.order_number || order.order_id}</span>
            <div className="text-xs text-gray-400">{order.order_id}</div>
          </div>
        </div>
      </td>

      {/* Amount */}
      <td className="px-6 py-4">
        <div className="flex items-center gap-1.5 text-sm text-gray-500">
          Ksh
          <span className="font-medium text-gray-900">{order.total_price?.toLocaleString() || 0}</span>
        </div>
        {order.subtotal && order.subtotal !== order.total_price && (
          <div className="text-xs text-gray-400">Subtotal: Ksh {order.subtotal?.toLocaleString()}</div>
        )}
      </td>

      {/* Status */}
      <td className="px-6 py-4">
        {getStatusBadge()}
      </td>

      {/* Payment Status - Simplified */}
      <td className="px-6 py-4">
        <span className="text-sm text-gray-700 capitalize">
          {order.payment_status?.toLowerCase() || 'pending'}
        </span>
      </td>

      {/* Payment Method */}
      <td className="px-6 py-4">
        <PaymentMethodBadge method={order.payment_method} />
      </td>

      {/* Items */}
      <td className="px-6 py-4">
        <div className="flex items-center gap-1.5">
          <span className="text-sm text-gray-600 truncate max-w-[180px]" title={formatItemsListToString(dishes)}>
            {formatItemsListToString(dishes)}
          </span>
          {dishes.length > 3 && (
            <span className="text-xs text-gray-400 font-medium">+{dishes.length - 3}</span>
          )}
        </div>
      </td>

      {/* Order Date */}
      <td className="px-6 py-4">
        <div className="flex items-center gap-1.5 text-sm text-gray-500 whitespace-nowrap">
          <FiCalendar size={14} className="flex-shrink-0" />
          <span>{formatDateTime(order.order_date || order.created_at)}</span>
        </div>
      </td>

      {/* Actions */}
      <td className="px-6 py-4">
        <div className="flex items-center justify-end gap-1.5">
          {getActionButtons()}
        </div>
      </td>
    </tr>
  );
};

// Empty State Component
const EmptyState = () => (
  <div className="rounded-2xl shadow-sm border border-gray-100 p-12 bg-white">
    <div className="flex flex-col items-center justify-center text-center max-w-md mx-auto">
      <div className="w-24 h-24 bg-gray-100 rounded-2xl flex items-center justify-center mb-6 relative">
        <FiPackage className="text-4xl text-gray-400" />
        <div className="absolute -top-1 -right-1 w-6 h-6 bg-gray-400 rounded-full flex items-center justify-center">
          <span className="text-white text-xs font-bold">0</span>
        </div>
      </div>
      <h3 className="text-2xl font-bold text-gray-900 mb-2">No orders yet</h3>
      <p className="text-gray-500 mb-8 leading-relaxed">
        You haven't placed any orders. Browse our menu and discover delicious meals waiting for you!
      </p>
      <Link
        to="/menu"
        className="inline-flex items-center gap-2 px-6 py-3 bg-gray-900 hover:bg-gray-800 text-white rounded-xl transition-all duration-200 font-medium hover:-translate-y-0.5 hover:shadow-lg"
      >
        <FiShoppingBag size={18} />
        Explore Menu
      </Link>
    </div>
  </div>
);

// Main OrderList Component
const OrderList = ({ orders, handleDelete, loading }) => {
  if (loading) {
    return (
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200">
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Order ID
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Amount
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Payment
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Method
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Items
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-4 text-right text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {Array.from({ length: 5 }).map((_, index) => (
                <SkeletonRow key={`skeleton-${index}`} />
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }

  if (!orders || orders.length === 0) {
    return <EmptyState />;
  }

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-200">
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Order ID
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Amount
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Payment
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Method
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Items
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Date
              </th>
              <th className="px-6 py-4 text-right text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <OrderItem
                key={order.order_id}
                order={order}
                handleDelete={handleDelete}
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OrderList;