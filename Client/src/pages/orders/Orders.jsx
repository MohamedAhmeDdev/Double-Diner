import React, { useEffect, useState } from "react";
import OrderList from "../../Components/OrderList";
import { apiCall } from "../../utils/apiCall";
import { SERVER_URL } from "../../constants";
import { toast } from "react-toastify";
import { FiSearch } from "react-icons/fi";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("ALL");

  useEffect(() => {
    getOrders();
  }, []);

  const getOrders = async () => {
    setLoading(true);
    const data = await apiCall("/orders", "GET");
    if (data) {
      setOrders(data.orders);
    }
    setLoading(false);
  };

  const handleDelete = (id) => {
    apiCall(`${SERVER_URL}/orders/${id}`, "DELETE")
      .then((response) => {
        setOrders((items) => items.filter((item) => item.order_id !== id));
        toast.success("Order Deleted Successfully");
      })
      .catch((error) => {
        toast.error("Failed to delete order");
      });
  };

  // Filter orders
  const filteredOrders = orders.filter((order) => {
    const matchesSearch = order.order_id.toString().includes(searchTerm) ||
      order.dishes?.some(item => item?.metadata?.name?.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesStatus = filterStatus === "ALL" || order.order_status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="min-h-screen bg-gray-50/50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 flex items-center gap-3">
            <span>Orders</span>
          </h1>
          <p className="text-gray-500 mt-1 text-sm">Manage and track all your orders</p>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-2xl shadow-sm p-4 mb-6 border border-gray-100">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search by order ID or item name..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-900/20 focus:border-gray-900 transition-all text-sm"
              />
            </div>
            <div className="flex gap-2 flex-wrap">
              {["ALL", "PENDING", "COMPLETED", "CANCELLED", "DELIVERED"].map((status) => (
                <button
                  key={status}
                  onClick={() => setFilterStatus(status)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                    filterStatus === status
                      ? "bg-gray-900 text-white shadow-sm"
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                  }`}
                >
                  {status.charAt(0) + status.slice(1).toLowerCase()}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Order List */}
        <OrderList 
          orders={filteredOrders} 
          handleDelete={handleDelete}
          loading={loading}
        />
      </div>
    </div>
  );
};

export default Orders;