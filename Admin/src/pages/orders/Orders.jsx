import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FiEye, FiClock, FiCheckCircle, FiTruck, FiX } from "react-icons/fi";
import { apiCall } from "../../utils/apiCall";
import Pagination from "../../Components/Pagination";


const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(10);
  const [isLoading, setIsLoading] = useState(true);

  // Get current posts
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = orders.slice(indexOfFirstPost, indexOfLastPost);

  // Change page
  const paginate = pageNumber => setCurrentPage(pageNumber);

  const fetchOrders = async () => {
    try {
      setIsLoading(true);
      const response = await apiCall("orders", "GET");
      setOrders(response.orders);
    } catch (error) {
      console.error("Error fetching orders:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  // Minimal Mono Status Badge Component
  const getStatusBadge = (status) => {
    const baseStyle = "inline-flex items-center px-2 py-0.5 rounded text-[11px] font-bold uppercase tracking-wider font-mono border";
    
    switch(status?.toLowerCase()) {
      case 'pending':
        return (
          <span className={`${baseStyle} bg-white border-neutral-300 text-neutral-600`}>
            <FiClock className="mr-1" strokeWidth={2.5} /> Pending
          </span>
        );
      case 'completed':
        return (
          <span className={`${baseStyle} bg-black border-black text-white`}>
            <FiCheckCircle className="mr-1" strokeWidth={2.5} /> Complete
          </span>
        );
      case 'cancelled':
        return (
          <span className={`${baseStyle} bg-white border-red-200 text-red-600`}>
            <FiX className="mr-1" strokeWidth={2.5} /> Cancelled
          </span>
        );
      case 'delivered':
        return (
          <span className={`${baseStyle} bg-neutral-100 border-neutral-400 text-black`}>
            <FiTruck className="mr-1" strokeWidth={2.5} /> Delivered
          </span>
        );
      default:
        return (
          <span className={`${baseStyle} bg-white border-neutral-200 text-neutral-400`}>
            {status}
          </span>
        );
    }
  };

  // Payment Status Badge
  const getPaymentStatusBadge = (status) => {
    const baseStyle = "inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider font-mono border";
    
    switch(status?.toLowerCase()) {
      case 'paid':
        return (
          <span className={`${baseStyle} bg-green-50 border-green-300 text-green-700`}>
            <FiCheckCircle className="mr-1" strokeWidth={2.5} /> Paid
          </span>
        );
      case 'pending':
        return (
          <span className={`${baseStyle} bg-yellow-50 border-yellow-300 text-yellow-700`}>
            <FiClock className="mr-1" strokeWidth={2.5} /> Pending
          </span>
        );
      case 'failed':
        return (
          <span className={`${baseStyle} bg-red-50 border-red-300 text-red-700`}>
            <FiX className="mr-1" strokeWidth={2.5} /> Failed
          </span>
        );
      default:
        return (
          <span className={`${baseStyle} bg-white border-neutral-200 text-neutral-400`}>
            {status}
          </span>
        );
    }
  };

  // Skeleton row component
  const SkeletonRow = () => (
    <tr className="animate-pulse">
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="h-4 bg-gray-200 rounded w-16"></div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="h-4 bg-gray-200 rounded w-32 mb-1"></div>
        <div className="h-3 bg-gray-200 rounded w-24"></div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="h-6 bg-gray-200 rounded w-20"></div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="h-4 bg-gray-200 rounded w-28"></div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="h-4 bg-gray-200 rounded w-20"></div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="h-6 bg-gray-200 rounded w-16"></div>
      </td>
      <td className="px-6 py-4">
        <div className="h-4 bg-gray-200 rounded w-40 mb-1"></div>
        <div className="h-3 bg-gray-200 rounded w-28"></div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-right">
        <div className="h-8 bg-gray-200 rounded w-16 ml-auto"></div>
      </td>
    </tr>
  );

  return (
    <div className="min-h-screen bg-white text-neutral-900 antialiased p-6 md:p-12 lg:p-16 mx-auto flex flex-col">
      {/* Header View Section */}
      <div className="w-full space-y-8">
        <div className="border-b border-neutral-200 pb-6 flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-neutral-900 uppercase">
              Order Registry Management
            </h1>
            <p className="mt-1 text-sm text-neutral-500">
              Monitor incoming transactions, verify localized logistics, and track full ledger fulfillments.
            </p>
          </div>
        </div>

        {/* Core Table Architecture Box */}
        <div className="border border-neutral-200 rounded-xl overflow-x-auto shadow-sm bg-white">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-neutral-200">
              <thead className="bg-neutral-50">
                <tr>
                  <th scope="col" className="whitespace-nowrap px-6 py-4 text-left text-xs font-bold text-black uppercase tracking-wider font-mono">
                    Order #
                  </th>
                  <th scope="col" className="px-6 py-4 text-left text-xs font-bold text-black uppercase tracking-wider">
                    Customer Details
                  </th>
                  <th scope="col" className="px-6 py-4 text-left text-xs font-bold text-black uppercase tracking-wider">
                    Status
                  </th>
                  <th scope="col" className="px-6 py-4 text-left text-xs font-bold text-black uppercase tracking-wider">
                    Payment
                  </th>
                  <th scope="col" className="px-6 py-4 text-left text-xs font-bold text-black uppercase tracking-wider">
                    Method
                  </th>
                  <th scope="col" className="px-6 py-4 text-left text-xs font-bold text-black uppercase tracking-wider">
                    Amount
                  </th>
                  <th scope="col" className="px-6 py-4 text-left text-xs font-bold text-black uppercase tracking-wider">
                    Delivery Info
                  </th>
                  <th scope="col" className="px-6 py-4 text-right text-xs font-bold text-black uppercase tracking-wider">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-neutral-200">
                {isLoading ? (
                  Array.from({ length: 5 }).map((_, index) => (
                    <SkeletonRow key={`skeleton-${index}`} />
                  ))
                ) : currentPosts?.length > 0 ? (
                  currentPosts.map((order) => (
                    <tr key={order.order_id} className="hover:bg-neutral-50/50 transition-colors duration-150">
                      <td className="px-6 py-4 whitespace-nowrap font-mono text-sm font-bold text-black">
                        {order.order_number}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-bold text-neutral-900">{order.user?.name}</div>
                        <div className="text-xs text-neutral-400 font-mono mt-0.5">{order.user?.email}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {getStatusBadge(order.order_status)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {getPaymentStatusBadge(order.payment_status)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider font-mono border border-neutral-200 bg-white text-neutral-700">
                          {order.payment_method}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap font-mono text-sm font-bold text-black">
                        Ksh {order.total_price}
                      </td>
                      <td className="px-6 py-4 max-w-xs">
                        <div className="text-xs font-semibold text-neutral-800 line-clamp-1">
                          {order.user?.address}
                        </div>
                        <div className="text-xs text-neutral-400 font-mono mt-0.5">
                          {order.user?.phone}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <Link 
                          to={`/orders/${order.order_id}`}
                          className="inline-flex items-center bg-white hover:bg-black border border-neutral-200 text-black hover:text-white px-3 py-1.5 rounded text-xs font-bold uppercase tracking-wider transition-all"
                        >
                          <FiEye className="mr-1.5" strokeWidth={2.5} /> View
                        </Link>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={8} className="text-center py-16 border-t border-neutral-100">
                      <svg className="mx-auto h-8 w-8 text-neutral-400 mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                      </svg>
                      <h3 className="text-xs font-bold uppercase tracking-wider text-black">No active manifests located</h3>
                      <p className="mt-1 text-xs text-neutral-400">Order pipelines are currently unpopulated.</p>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Table Footer / Pagination controls block */}
          {!isLoading && orders.length > 0 && (
            <div className="px-6 py-4 border-t border-neutral-200 bg-neutral-50/30">
              <Pagination
                currentPage={currentPage}
                totalItems={orders.length}
                itemsPerPage={postsPerPage}
                onPageChange={paginate}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Orders;