import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { 
  FiPackage, FiTruck, FiCheckCircle, FiXCircle, FiClock, 
  FiMapPin, FiPhone, FiUser, FiMail, FiArrowLeft, FiShoppingBag,
  FiCreditCard, FiCalendar,  FiCheck, FiAlertCircle
} from "react-icons/fi";
import { apiCall } from "../../utils/apiCall";
import { formatDateTime } from "../../utils/functions";
import { OrderProgressBar } from "../../Components/OrderProgressBar";
import { OrderedDishItem } from "../../Components/OrderedDishItem";

// Enhanced Status Badge with animations
const StatusBadge = ({ status, size = "md" }) => {
  // Normalize status to uppercase for comparison
  const normalizedStatus = status?.toUpperCase();
  
  const statusConfig = {
    PENDING: { 
      color: "bg-amber-50 text-amber-700 border-amber-200/60", 
      icon: <FiClock className="w-4 h-4 mr-1.5 animate-pulse" />,
      label: "Awaiting Approval"
    },
    ACCEPTED: { 
      color: "bg-sky-50 text-sky-700 border-sky-200/60", 
      icon: <FiCheckCircle className="w-4 h-4 mr-1.5" />,
      label: "Order Accepted"
    },
    REJECTED: { 
      color: "bg-rose-50 text-rose-700 border-rose-200/60", 
      icon: <FiXCircle className="w-4 h-4 mr-1.5" />,
      label: "Order Rejected"
    },
    READY_FOR_DELIVERY: { 
      color: "bg-purple-50 text-purple-700 border-purple-200/60", 
      icon: <FiPackage className="w-4 h-4 mr-1.5" />,
      label: "Ready for Pickup"
    },
    DELIVERED: { 
      color: "bg-teal-50 text-teal-700 border-teal-200/60", 
      icon: <FiTruck className="w-4 h-4 mr-1.5" />,
      label: "In Transit"
    },
    COMPLETED: { 
      color: "bg-emerald-50 text-emerald-700 border-emerald-200/60", 
      icon: <FiCheckCircle className="w-4 h-4 mr-1.5" />,
      label: "Completed"
    }
  };

  const config = statusConfig[normalizedStatus] || { 
    color: "bg-slate-50 text-slate-700 border-slate-200/60", 
    icon: null,
    label: status
  };

  const sizeClasses = {
    sm: "px-2 py-0.5 text-[10px]",
    md: "px-3 py-1 text-xs",
    lg: "px-4 py-1.5 text-sm"
  };

  return (
    <span className={`inline-flex items-center rounded-full font-semibold border tracking-wide uppercase ${sizeClasses[size]} ${config.color} shadow-sm`}>
      {config.icon}
      {config.label}
    </span>
  );
};

// Enhanced Detail Item with hover effects
const DetailItem = ({ title, value, icon, action }) => (
  <div className="group flex items-start space-x-3.5 py-3.5 first:pt-0 last:pb-0 border-b border-slate-100 last:border-0 hover:bg-slate-50/50 -mx-3 px-3 rounded-lg transition-colors">
    <div className="flex-shrink-0 mt-0.5 text-slate-400 group-hover:text-blue-600 transition-colors">
      {React.cloneElement(icon, { className: "w-5 h-5" })}
    </div>
    <div className="min-w-0 flex-1">
      <p className="text-xs font-medium text-slate-400 uppercase tracking-wider flex items-center">
        {title}
        {action && (
          <button className="ml-2 text-blue-600 hover:text-blue-800 transition-colors">
            {action}
          </button>
        )}
      </p>
      <p className="text-sm font-semibold text-slate-800 mt-0.5 break-words">
        {value}
      </p>
    </div>
  </div>
);

// Order Summary Card
const OrderSummaryCard = ({ order }) => (
  <div className="bg-white border border-blue-100/80 rounded-2xl p-5 mb-6">
       <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
      <div>
        <p className="text-[10px] font-bold text-blue-600 uppercase tracking-wider">Order ID</p>
        <p className="text-sm font-bold text-slate-800 mt-1">{order?.order_number}</p>
      </div>
      <div>
        <p className="text-[10px] font-bold text-blue-600 uppercase tracking-wider">Date</p>
        <p className="text-sm font-semibold text-slate-700 mt-1 flex items-center whitespace-nowrap">
          <FiCalendar className="w-3 h-3 mr-1.5 text-slate-400" />
          {formatDateTime(order?.order_date)}
        </p>
      </div>
      <div>
        <p className="text-[10px] font-bold text-blue-600 uppercase tracking-wider">Payment</p>
        <p className="text-sm font-semibold text-slate-700 mt-1 flex items-center">
          <FiCreditCard className="w-3 h-3 mr-1.5 text-slate-400" />
          {order?.payment_method}
        </p>
      </div>
       <div>
        <p className="text-[10px] font-bold text-blue-600 uppercase tracking-wider">Payment Status</p>
        <p className="text-sm font-semibold text-slate-700 mt-1">
          {order?.payment_status}
        </p>
      </div>
      <div>
        <p className="text-[10px] font-bold text-blue-600 uppercase tracking-wider">Total</p>
        <p className="text-sm font-semibold text-slate-700 mt-1 flex items-center">
          Ksh {parseFloat(order?.total_price).toLocaleString()}
        </p>
      </div>
      <div>
        <p className="text-[10px] font-bold text-blue-600 uppercase tracking-wider">Order Status</p>
        <p className="text-sm font-semibold text-slate-700 mt-1 flex items-center">
          <StatusBadge status={order?.order_status} size="sm" />
        </p>
      </div>
    </div>
  </div>
);

const SingleOrder = () => {
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [order, setOrder] = useState({});
  const [isUpdating, setIsUpdating] = useState(false);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const response = await apiCall(`orders/${id}`, "GET");
        setOrder(response.order);
      } catch (error) {
        console.error("Error fetching order:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchOrder();
  }, [id]);

  const updateOrder = async (order_id, status) => {
    setIsUpdating(true);
    try {
      const response = await apiCall(`orders/${order_id}`, "PATCH", { order_status: status });
      setOrder(response.order);
    } catch (err) {
      console.log(err);
    } finally {
      setIsUpdating(false);
    }
  };

  if (isLoading) {
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

  return (
    <div className="min-h-screen bg-gray-50/50 py-8 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-7xl mx-auto">
        
        {/* Header with actions */}
        <div className="mb-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <Link 
            to="/dashboard/orders" 
            className="group inline-flex items-center text-sm font-semibold text-slate-500 hover:text-slate-800 transition-colors"
          >
            <FiArrowLeft className="mr-2 w-4 h-4 group-hover:-translate-x-0.5 transition-transform" /> 
            Back to Orders
          </Link>
        </div>

        {/* Order Summary Card */}
        <OrderSummaryCard order={order} />

        {/* Order Progress Timeline */}
        <OrderProgressBar currentStatus={order?.order_status} />

        {/* Main Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
          
          {/* Left Column */}
          <div className="lg:col-span-6 space-y-6">
            
            {/* Customer Details*/}
            <div className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-sm">
              <div className="flex items-center justify-between mb-4 border-b border-slate-100 pb-3">
                <h3 className="text-base font-extrabold text-slate-800 tracking-tight flex items-center">
                  <FiUser className="w-4 h-4 mr-2 text-blue-600" />
                  Customer Information
                </h3>
              </div>
              <div className="divide-y divide-slate-100">
                <DetailItem title="Full Name" value={order?.user?.name} icon={<FiUser />} />
                <DetailItem title="Email Address" value={order?.user?.email} icon={<FiMail />} />
                <DetailItem 
                  title="Delivery Address" 
                  value={order?.user?.address} 
                  icon={<FiMapPin />}
                />
                <DetailItem title="Contact Phone" value={order?.user?.phone} icon={<FiPhone />} />
                {order?.delivery_date && (
                  <DetailItem 
                    title="Delivery Date" 
                    value={formatDateTime(order.delivery_date)} 
                    icon={<FiCalendar />} 
                  />
                )}
              </div>
            </div>

          </div>

          {/* Right Column - Order Items */}
          <div className="lg:col-span-6">
            <div className="bg-white border border-slate-200/80 rounded-2xl p-4 shadow-sm sticky top-6">
              <div className="flex items-center justify-between mb-4 border-b border-slate-100 pb-3">
                <h3 className="text-base font-extrabold text-slate-800 tracking-tight flex items-center">
                  <FiShoppingBag className="w-4 h-4 mr-2 text-blue-600" />
                  Order Items
                </h3>
                <span className="text-xs font-bold bg-blue-50 text-blue-600 px-3 py-1 rounded-full">
                  {order?.dishes?.length} {order?.dishes?.length === 1 ? 'item' : 'items'}
                </span>
              </div>
              
              {/* Items List */}
              <div className="divide-y divide-slate-100 max-h-[420px] overflow-y-auto pr-1">
                {order?.dishes && order.dishes.length > 0 ? (
                  order.dishes.map((dish) => {
                    // Extract dish details properly
                    const dishData = {
                      ...dish,
                      // The quantity and total_price are in order_dishes
                      quantity: dish.order_dishes?.quantity,
                      unit_price: parseFloat(dish.price) ,
                      total_price: parseFloat(dish.order_dishes?.total_price)
                    };
                    
                    return (
                      <OrderedDishItem
                        key={dish.dish_id}
                        dishOrderDetails={dishData}
                        dishDetails={dish}
                      />
                    );
                  })
                ) : (
                  <div className="py-8 text-center text-slate-500">
                    <FiShoppingBag className="w-12 h-12 mx-auto text-slate-300 mb-3" />
                    <p className="text-sm font-medium">No items in this order</p>
                    <p className="text-xs text-slate-400 mt-1">The order appears to be empty</p>
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
                <div className="flex justify-between items-center">
                  <span className="text-base font-black text-slate-800">Total Payable</span>
                  <span className="text-lg font-black bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
                    Ksh {parseFloat(order?.total_price).toLocaleString()}
                  </span>
                </div>
              </div>
            </div>

            {/* Order Actions */}
            <div className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-sm mt-6">
              <h3 className="text-base font-extrabold text-slate-800 tracking-tight mb-4 border-b border-slate-100 pb-3 flex items-center">
                <FiCheckCircle className="w-4 h-4 mr-2 text-blue-600" />
                Order Actions
              </h3>
              
              <div className="flex flex-wrap gap-3">
                {order?.order_status?.toUpperCase() === "PENDING" && (
                  <>
                    <button 
                      onClick={() => updateOrder(order.order_id, "ACCEPTED")}
                      disabled={isUpdating}
                      className="flex-1 min-w-[140px] bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 text-white font-semibold text-sm px-4 py-2.5 rounded-xl shadow-sm transition-all active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                    >
                      {isUpdating ? (
                        <span className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></span>
                      ) : (
                        <>
                          <FiCheckCircle className="w-4 h-4 mr-2" /> Accept Order
                        </>
                      )}
                    </button>
                    <button 
                      onClick={() => updateOrder(order.order_id, "REJECTED")}
                      disabled={isUpdating}
                      className="flex-1 min-w-[140px] bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200/60 font-semibold text-sm px-4 py-2.5 rounded-xl transition-all active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                    >
                      <FiXCircle className="w-4 h-4 mr-2" /> Reject Order
                    </button>
                  </>
                )}
                {order?.order_status?.toUpperCase() === "ACCEPTED" && (
                  <button 
                    onClick={() => updateOrder(order.order_id, "READY_FOR_DELIVERY")}
                    disabled={isUpdating}
                    className="w-full bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white font-semibold text-sm px-4 py-2.5 rounded-xl shadow-sm transition-all active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                  >
                    {isUpdating ? (
                      <span className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></span>
                    ) : (
                      <>
                        <FiPackage className="w-4 h-4 mr-2" /> Mark Ready for Delivery
                      </>
                    )}
                  </button>
                )}
                {order?.order_status?.toUpperCase() === "READY_FOR_DELIVERY" && (
                  <button 
                    onClick={() => updateOrder(order.order_id, "DELIVERED")}
                    disabled={isUpdating}
                    className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold text-sm px-4 py-2.5 rounded-xl shadow-sm transition-all active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                  >
                    {isUpdating ? (
                      <span className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></span>
                    ) : (
                      <>
                        <FiTruck className="w-4 h-4 mr-2" /> Mark as Delivered
                      </>
                    )}
                  </button>
                )}
                {order?.order_status?.toUpperCase() === "DELIVERED" && (
                  <button 
                    onClick={() => updateOrder(order.order_id, "COMPLETED")}
                    disabled={isUpdating}
                    className="w-full bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 text-white font-semibold text-sm px-4 py-2.5 rounded-xl shadow-sm transition-all active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                  >
                    {isUpdating ? (
                      <span className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></span>
                    ) : (
                      <>
                        <FiCheck className="w-4 h-4 mr-2" /> Complete Order
                      </>
                    )}
                  </button>
                )}
                  
                {order?.order_status?.toUpperCase() === "CANCELLED" && (
                  <div className="w-full bg-gradient-to-r from-rose-50 to-rose-100/50 text-rose-800 text-sm font-semibold p-4 rounded-xl text-center border border-rose-100/80 flex items-center justify-center">
                    <FiAlertCircle className="w-5 h-5 mr-2 text-rose-600 flex-shrink-0" />
                    This order has been cancelled
                  </div>
                )}
                {order?.order_status?.toUpperCase() === "COMPLETED" && (
                  <div className="w-full bg-gradient-to-r from-emerald-50 to-emerald-100/50 text-emerald-800 text-sm font-semibold p-4 rounded-xl text-center border border-emerald-100/80 flex items-center justify-center">
                    <FiCheckCircle className="w-5 h-5 mr-2 text-emerald-600" />
                    Order successfully completed
                  </div>
                )}
                {order?.order_status?.toUpperCase() === "REJECTED" && (
                  <div className="w-full bg-gradient-to-r from-rose-50 to-rose-100/50 text-rose-800 text-sm font-semibold p-4 rounded-xl text-center border border-rose-100/80 flex items-center justify-center">
                    <FiAlertCircle className="w-5 h-5 mr-2 text-rose-600" />
                    Order has been cancelled
                  </div>
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