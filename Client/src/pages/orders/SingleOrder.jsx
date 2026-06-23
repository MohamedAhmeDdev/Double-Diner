import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { 
  FiArrowLeft, FiClock, FiMapPin, FiPhone, FiPackage, 
  FiX, FiCheckCircle, FiTruck, FiUser, FiMail,
  FiCreditCard, FiCalendar, FiShoppingBag, FiAlertCircle
} from "react-icons/fi";
import { apiCall } from "../../utils/apiCall";
import { formatDate, formatTime } from "../../constants/index";
import { SERVER_URL } from "../../constants";
import { toast } from "react-toastify";
import { OrderProgressBar } from "../../Components/OrderProgressBar";

// Enhanced Status Badge Component
const StatusBadge = ({ status, size = "md" }) => {
  const normalizedStatus = status?.toUpperCase();
  
  const STATUS_CONFIG = {
    PENDING: { 
      bg: "bg-amber-50", 
      text: "text-amber-700", 
      border: "border-amber-200",
      icon: <FiClock className="w-4 h-4 mr-1.5 animate-pulse" />,
      label: "Awaiting Approval"
    },
    ACCEPTED: { 
      bg: "bg-sky-50", 
      text: "text-sky-700", 
      border: "border-sky-200",
      icon: <FiCheckCircle className="w-4 h-4 mr-1.5" />,
      label: "Order Accepted"
    },
    REJECTED: { 
      bg: "bg-rose-50", 
      text: "text-rose-700", 
      border: "border-rose-200",
      icon: <FiX className="w-4 h-4 mr-1.5" />,
      label: "Order Rejected"
    },
    READY_FOR_DELIVERY: { 
      bg: "bg-purple-50", 
      text: "text-purple-700", 
      border: "border-purple-200",
      icon: <FiPackage className="w-4 h-4 mr-1.5" />,
      label: "Ready for Pickup"
    },
    DELIVERED: { 
      bg: "bg-blue-50", 
      text: "text-blue-700", 
      border: "border-blue-200",
      icon: <FiTruck className="w-4 h-4 mr-1.5" />,
      label: "In Transit"
    },
    COMPLETED: { 
      bg: "bg-emerald-50", 
      text: "text-emerald-700", 
      border: "border-emerald-200",
      icon: <FiCheckCircle className="w-4 h-4 mr-1.5" />,
      label: "Completed"
    },
    CANCELLED: {
      bg: "bg-rose-50",
      text: "text-rose-700",
      border: "border-rose-200",
      icon: <FiX className="w-4 h-4 mr-1.5" />,
      label: "Cancelled"
    }
  };

  const config = STATUS_CONFIG[normalizedStatus];
  
  const sizeClasses = {
    sm: "px-2.5 py-0.5 text-[10px]",
    md: "px-3.5 py-1.5 text-xs",
    lg: "px-5 py-2 text-sm"
  };

  return (
    <span className={`inline-flex items-center rounded-full font-semibold border tracking-wide uppercase shadow-sm ${sizeClasses[size]} ${config.bg} ${config.text} ${config.border}`}>
      {config.icon}
      {config.label}
    </span>
  );
};

// Payment Status Badge
const PaymentStatusBadge = ({ status }) => {
  const normalizedStatus = status?.toUpperCase();
  
  const PAYMENT_CONFIG = {
    PENDING: {
      bg: "bg-amber-50",
      text: "text-amber-700",
      border: "border-amber-200",
      icon: <FiClock className="w-4 h-4 mr-1.5 animate-pulse" />,
      label: "Pending"
    },
    PAID: {
      bg: "bg-emerald-50",
      text: "text-emerald-700",
      border: "border-emerald-200",
      icon: <FiCheckCircle className="w-4 h-4 mr-1.5" />,
      label: "Paid"
    },
    FAILED: {
      bg: "bg-rose-50",
      text: "text-rose-700",
      border: "border-rose-200",
      icon: <FiAlertCircle className="w-4 h-4 mr-1.5" />,
      label: "Failed"
    }
  };

  const config = PAYMENT_CONFIG[normalizedStatus];

  return (
    <span className={`inline-flex items-center rounded-full font-semibold border tracking-wide uppercase text-xs px-3 py-1.5 ${config.bg} ${config.text} ${config.border}`}>
      {config.icon}
      {config.label}
    </span>
  );
};

// Enhanced Detail Item with hover effects
const DetailItem = ({ title, value, icon, className = "" }) => (
  <div className={`group flex items-start space-x-3.5 py-3.5 first:pt-0 last:pb-0 border-b border-slate-100 last:border-0 hover:bg-slate-50/50 -mx-3 px-3 rounded-lg transition-colors ${className}`}>
    <div className="flex-shrink-0 mt-0.5 text-slate-400 group-hover:text-blue-600 transition-colors">
      {React.cloneElement(icon, { className: "w-5 h-5" })}
    </div>
    <div className="min-w-0 flex-1">
      <p className="text-xs font-medium text-slate-400 uppercase tracking-wider">{title}</p>
      <p className="text-sm font-semibold text-slate-800 mt-0.5 break-words">
        {value}
      </p>
    </div>
  </div>
);

// Order Summary Card Component
const OrderSummaryCard = ({ order }) => {
  const orderStatus = order?.order_status?.toUpperCase();
  const paymentStatus = order?.payment_status?.toUpperCase();
  
  return (
    <div className="bg-white border border-blue-100/80 rounded-2xl p-5 mb-6 shadow-sm">
      <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-6 gap-4">     
        <div>
          <p className="text-[10px] font-bold text-blue-600 uppercase tracking-wider">Order ID</p>
          <p className="text-sm font-bold text-slate-800 mt-1">{order?.order_number}</p>
        </div>
        <div>
          <p className="text-[10px] font-bold text-blue-600 uppercase tracking-wider">Date</p>
          <p className="text-sm font-semibold text-slate-700 mt-1 flex items-center whitespace-nowrap">
            <FiCalendar className="w-3 h-3 mr-1.5 text-slate-400" />
            {formatDate(order?.order_date)}
          </p>
          <p className="text-xs text-slate-400 ml-5">{formatTime(order?.order_date)}</p>
        </div>
        <div>
          <p className="text-[10px] font-bold text-blue-600 uppercase tracking-wider">Payment Method</p>
          <p className="text-sm font-semibold text-slate-700 mt-1 flex items-center">
            <FiCreditCard className="w-3 h-3 mr-1.5 text-slate-400" />
            {order?.payment_method?.toUpperCase()}
          </p>
        </div>
        <div>
          <p className="text-[10px] font-bold text-blue-600 uppercase tracking-wider">Payment Status</p>
          <div className="mt-1">
            <PaymentStatusBadge status={paymentStatus} />
          </div>
        </div>
        <div>
          <p className="text-[10px] font-bold text-blue-600 uppercase tracking-wider">Order Status</p>
          <div className="mt-1">
            <StatusBadge status={orderStatus} size="sm" />
          </div>
        </div>
        <div>
          <p className="text-[10px] font-bold text-blue-600 uppercase tracking-wider">Total</p>
          <p className="text-sm font-bold text-slate-800 mt-1 flex items-center">
            Ksh {parseFloat(order?.total_price).toLocaleString()}
          </p>
        </div>
      </div>
    </div>
  );
};

const SingleOrder = () => {
  const [order, setOrder] = useState({});
  const [loading, setLoading] = useState(true);
  const [cancelling, setCancelling] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    getOrder();
  }, [id]);

  const getOrder = async () => {
    setLoading(true);
    try {
      const data = await apiCall(`/orders/${id}`, "GET");
      console.log("Fetched order:", data);
      
      if (data) {
        // Check if order is nested in data.order or directly in data
        const orderData = data.order;
        setOrder(orderData);
      }
    } catch (error) {
      console.error("Error fetching order:", error);
      toast.error("Failed to fetch order details");
    } finally {
      setLoading(false);
    }
  };

  const cancelOrder = async () => {
    setCancelling(true);
    try {
      const data = await apiCall(`/orders/${id}`, "PATCH", {
        order_status: "CANCELLED",
      });

      if (data) {
        const updatedOrder = data.order;
        setOrder(updatedOrder);
        toast.info("Order Cancelled Successfully");
        setTimeout(() => {
          navigate("/orders");
        }, 1500);
      }
    } catch (error) {
      toast.error("Failed to cancel order");
    } finally {
      setCancelling(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white flex items-center justify-center">
        <div className="flex flex-col items-center space-y-4">
          <div className="relative">
            <div className="animate-spin rounded-full h-14 w-14 border-4 border-slate-200 border-t-blue-600"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <FiShoppingBag className="w-5 h-5 text-blue-600 opacity-50" />
            </div>
          </div>
          <span className="text-sm font-semibold text-slate-500 tracking-wide">Loading order details...</span>
        </div>
      </div>
    );
  }

  const orderStatus = order?.order_status?.toUpperCase();

  return (
    <div className="min-h-screen bg-gray-50/50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        
        {/* Header with back button */}
        <div className="mb-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <Link 
            to="/orders" 
            className="group inline-flex items-center text-sm font-semibold text-slate-500 hover:text-slate-800 transition-colors"
          >
            <FiArrowLeft className="mr-2 w-4 h-4 group-hover:-translate-x-0.5 transition-transform" /> 
            Back to Orders
          </Link>
        </div>

        {/* Order Summary Card */}
        <OrderSummaryCard order={order} />

        {/* Order Progress Timeline */}
        <OrderProgressBar currentStatus={orderStatus} />

        {/* Main Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Left Column - Details */}
          <div className="lg:col-span-6 space-y-6">
            {/* Order Timeline */}
            <div className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-sm">
              <h3 className="text-base font-extrabold text-slate-800 tracking-tight flex items-center mb-4 border-b border-slate-100 pb-3">
                <FiClock className="w-4 h-4 mr-2 text-blue-600" />
                Order Timeline
              </h3>
              <div className="space-y-2">
                <DetailItem 
                  title="Placed on" 
                  value={`${formatDate(order.order_date )} at ${formatTime(order.order_date)}`} 
                  icon={<FiCalendar />} 
                />
                {order.delivery_date && (
                  <DetailItem 
                    title="Delivery Date" 
                    value={`${formatDate(order.delivery_date)}`} 
                    icon={<FiTruck />} 
                  />
                )}
                <DetailItem 
                  title="Current Status" 
                  value={<StatusBadge status={orderStatus} size="sm" />} 
                  icon={<FiCheckCircle />} 
                />
                <DetailItem 
                  title="Payment Status" 
                  value={<PaymentStatusBadge status={order.payment_status} />} 
                  icon={<FiCreditCard />} 
                />
              </div>
            </div>

            {/* Customer Details */}
            <div className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-sm">
              <h3 className="text-base font-extrabold text-slate-800 tracking-tight flex items-center mb-4 border-b border-slate-100 pb-3">
                <FiUser className="w-4 h-4 mr-2 text-blue-600" />
                Customer Information
              </h3>
              <div className="divide-y divide-slate-100">
                <DetailItem 
                  title="Customer Name" 
                  value={order?.user?.name } 
                  icon={<FiUser />}
                />
                <DetailItem 
                  title="Email" 
                  value={order?.user?.email } 
                  icon={<FiMail />}
                />
                <DetailItem 
                  title="Delivery Address" 
                  value={order?.user?.address } 
                  icon={<FiMapPin />}
                />
                <DetailItem 
                  title="Contact Phone" 
                  value={order?.user?.phone} 
                  icon={<FiPhone />} 
                />
              </div>
            </div>
          </div>

          {/* Right Column - Order Items */}
          <div className="lg:col-span-6 space-y-6">
            <div className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-sm">
              <div className="flex items-center justify-between mb-4 border-b border-slate-100 pb-3">
                <h3 className="text-base font-extrabold text-slate-800 tracking-tight flex items-center">
                  <FiShoppingBag className="w-4 h-4 mr-2 text-blue-600" />
                  Order Items
                </h3>
                <span className="text-xs font-bold bg-blue-50 text-blue-600 px-3 py-1 rounded-full">
                  {order?.dishes?.length } {order?.dishes?.length === 1 ? 'item' : 'items'}
                </span>
              </div>
              
              {/* Items List */}
              <div className="divide-y divide-slate-100 max-h-[420px] overflow-y-auto pr-1">
                {order?.dishes && order.dishes.length > 0 ? (
                  order.dishes.map((dish) => {
                    // Get quantity from order_dishes or directly from dish
                    const quantity = dish.order_dishes?.quantity;
                    const dishPrice = parseFloat(dish.price);
                    const total = dishPrice * quantity;
                    const imageUrl = dish.image ? `${SERVER_URL}/${dish.image}` : null;
                    
                    return (
                      <div key={dish.dish_id} className="flex items-start py-4 first:pt-0 last:pb-0">
                        <div className="w-20 h-20 rounded-lg overflow-hidden bg-slate-100 flex-shrink-0 mr-4">
                          {imageUrl ? (
                            <img 
                              className="w-full h-full object-cover"
                              src={imageUrl} 
                              alt={dish.name}
                              onError={(e) => {
                                e.target.style.display = 'none';
                                e.target.parentElement.innerHTML = '<div class="w-full h-full flex items-center justify-center text-2xl">🍽️</div>';
                              }}
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-2xl">🍽️</div>
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="text-sm font-semibold text-slate-800">{dish.name}</h4>
                          {dish.description && (
                            <p className="text-xs text-slate-500 mt-0.5 line-clamp-1">{dish.description}</p>
                          )}
                          <p className="text-sm text-slate-500 mt-1">Qty: {quantity}</p>
                        </div>
                        <div className="text-right flex-shrink-0 ml-4">
                          <p className="text-xs font-medium text-slate-500">Ksh {dishPrice} × {quantity}</p>
                          <p className="text-sm font-bold text-slate-800 mt-0.5">
                            Ksh {total.toLocaleString()}
                          </p>
                        </div>
                      </div>
                    );
                  })
                ) : (
                  <div className="py-8 text-center text-slate-500">
                    <FiShoppingBag className="w-12 h-12 mx-auto text-slate-300 mb-3" />
                    <p className="text-sm font-medium">No items in this order</p>
                  </div>
                )}
              </div>

              {/* Order Total */}
              <div className="pt-4 mt-4 border-t-2 border-dashed border-slate-200">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm text-slate-500">Subtotal</span>
                  <span className="text-sm font-semibold text-slate-700">
                    Ksh {parseFloat(order?.subtotal).toLocaleString()}
                  </span>
                </div>
                {order?.payment_method && (
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm text-slate-500">Payment Method</span>
                    <span className="text-sm font-semibold text-slate-700 capitalize">
                      {order.payment_method}
                    </span>
                  </div>
                )}
                <div className="flex justify-between items-center">
                  <span className="text-base font-black text-slate-800">Total Payable</span>
                  <span className="text-lg font-black bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
                    Ksh {parseFloat(order?.total_price ).toLocaleString()}
                  </span>
                </div>
              </div>
            </div>

            {/* Order Actions */}
            <div className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-sm">
              <h3 className="text-base font-extrabold text-slate-800 tracking-tight mb-4 border-b border-slate-100 pb-3 flex items-center">
                <FiAlertCircle className="w-4 h-4 mr-2 text-rose-600" />
                Order Actions
              </h3>
              
              <div className="space-y-3">
                {/* Cancel Order - Only for PENDING orders */}
                {orderStatus === "PENDING" && (
                  <button
                    onClick={cancelOrder}
                    disabled={cancelling}
                    className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-rose-600 hover:bg-rose-700 text-white rounded-xl transition-all duration-200 font-semibold text-sm disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-lg hover:shadow-rose-200"
                  >
                    {cancelling ? "Cancelling Order..." : "Cancel Order"}
                  </button>
                )}

                {/* Status Messages for non-cancellable orders */}
                {orderStatus === "CANCELLED" && (
                  <div className="w-full bg-gradient-to-r from-rose-50 to-rose-100/50 text-rose-800 text-sm font-semibold p-4 rounded-xl text-center border border-rose-100/80 flex items-center justify-center">
                    <FiAlertCircle className="w-5 h-5 mr-2 text-rose-600 flex-shrink-0" />
                    This order has been cancelled
                  </div>
                )}

                {orderStatus === "COMPLETED" && (
                  <div className="w-full bg-gradient-to-r from-emerald-50 to-emerald-100/50 text-emerald-800 text-sm font-semibold p-4 rounded-xl text-center border border-emerald-100/80 flex items-center justify-center">
                    <FiCheckCircle className="w-5 h-5 mr-2 text-emerald-600 flex-shrink-0" />
                    Order has been completed successfully
                  </div>
                )}

                {orderStatus === "ACCEPTED" && (
                  <div className="w-full bg-gradient-to-r from-sky-50 to-sky-100/50 text-sky-800 text-sm font-semibold p-4 rounded-xl text-center border border-sky-100/80 flex items-center justify-center">
                    <FiCheckCircle className="w-5 h-5 mr-2 text-sky-600 flex-shrink-0" />
                    Your order has been accepted and is being prepared
                  </div>
                )}

                {orderStatus === "READY_FOR_DELIVERY" && (
                  <div className="w-full bg-gradient-to-r from-purple-50 to-purple-100/50 text-purple-800 text-sm font-semibold p-4 rounded-xl text-center border border-purple-100/80 flex items-center justify-center">
                    <FiPackage className="w-5 h-5 mr-2 text-purple-600 flex-shrink-0" />
                    Your order is ready for pickup/delivery
                  </div>
                )}

                {orderStatus === "DELIVERED" && (
                  <div className="w-full bg-gradient-to-r from-blue-50 to-blue-100/50 text-blue-800 text-sm font-semibold p-4 rounded-xl text-center border border-blue-100/80 flex items-center justify-center">
                    <FiTruck className="w-5 h-5 mr-2 text-blue-600 flex-shrink-0" />
                    Your order is on the way!
                  </div>
                )}

                {orderStatus === "REJECTED" && (
                  <div className="w-full bg-gradient-to-r from-rose-50 to-rose-100/50 text-rose-800 text-sm font-semibold p-4 rounded-xl text-center border border-rose-100/80 flex items-center justify-center">
                    <FiAlertCircle className="w-5 h-5 mr-2 text-rose-600 flex-shrink-0" />
                    Your order has been rejected
                  </div>
                )}

                {/* Helpful message for orders that can't be cancelled */}
                {orderStatus !== "PENDING" && 
                 orderStatus !== "CANCELLED" && 
                 orderStatus !== "COMPLETED" && 
                 orderStatus !== "REJECTED" && (
                  <p className="text-xs text-slate-500 text-center mt-2">
                    <FiAlertCircle className="inline w-3 h-3 mr-1" />
                    Orders cannot be cancelled once they've been processed
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleOrder;