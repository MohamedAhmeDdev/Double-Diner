import React, { useEffect, useState, useRef } from "react";
import { apiCall } from "../utils/apiCall";
import { useReactToPrint } from "react-to-print";
import { FiPrinter, FiDollarSign, FiPieChart, FiTrendingUp } from "react-icons/fi";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { RiDashboardLine } from "react-icons/ri";

function SalesDish() {
  const [dishReport, setDishReport] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const componentRef = useRef();

  const getDishReport = async () => {
    try {
      setIsLoading(true);
      const response = await apiCall("/report/dish", "get");
      setDishReport(response.dishReport);
    } catch (error) {
      toast.error("Failed to load sales report");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getDishReport();
  }, []);

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    documentTitle: "sales-report",
    onAfterPrint: () => toast.success("Report printed successfully"),
  });

  const totalPrice = dishReport.reduce((total, sales) => total + (sales.unit_price * sales.quantity), 0);
  const totalDishesSold = dishReport.reduce((sum, item) => sum + Number(item.dish_id_quantity || 0), 0);

  // Skeleton row component
  const SkeletonRow = () => (
    <tr className="animate-pulse">
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="h-4 bg-gray-200 rounded w-16"></div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="h-4 bg-gray-200 rounded w-32"></div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="h-4 bg-gray-200 rounded w-12"></div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="h-4 bg-gray-200 rounded w-20"></div>
      </td>
    </tr>
  );

  return (
    <div className="flex flex-col min-h-screen bg-white text-gray-900 antialiased p-6 md:p-12 lg:p-16 mx-auto">


      <div className="w-full mx-auto space-y-12">
        
        {/* Document Header Panel */}
        <div className="flex flex-col md:flex-row md:justify-between md:items-center space-y-4 md:space-y-0 pb-6 border-b border-gray-200">
          <div>
            <h2 className="text-md md:text-2xl font-bold tracking-tight text-gray-900 uppercase flex items-center">
              <FiTrendingUp className="mr-2 text-black" />
              Sales Performance Report
            </h2>
            <p className="mt-1 text-sm text-gray-500">
              Detailed analytical breakdown of item sales and core marketplace metrics.
            </p>
          </div>
          <button
            onClick={handlePrint}
            disabled={isLoading || dishReport.length === 0}
            className="inline-flex justify-center items-center px-4 py-2.5 bg-black hover:bg-neutral-800 disabled:opacity-50 disabled:cursor-not-allowed text-white text-xs font-semibold uppercase tracking-wider rounded-lg shadow-sm transition-all"
          >
            <FiPrinter className="mr-2" size={14} />
            Export PDF
          </button>
        </div>

        {/* Summary Metrics Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Card 1 */}
          <div className="bg-white p-6 border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-200">
            <div className="flex items-center">
              <div className="p-3 rounded-lg bg-gray-50 border border-gray-100 mr-4">
                <FiPieChart className="text-black" size={20} />
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-gray-400">Total Dishes Sold</p>
                <p className="text-2xl font-bold text-gray-900 mt-0.5">
                  {isLoading ? (
                    <div className="h-8 w-20 bg-gray-200 rounded animate-pulse"></div>
                  ) : (
                    totalDishesSold
                  )}
                </p>
              </div>
            </div>
          </div>
          
          {/* Card 2 */}
          <div className="bg-white p-6 border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-200">
            <div className="flex items-center">
              <div className="p-3 rounded-lg bg-gray-50 border border-gray-100 mr-4">
                <FiDollarSign className="text-black" size={20} />
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-gray-400">Total Revenue</p>
                <p className="text-2xl font-bold text-gray-900 mt-0.5">
                  {isLoading ? (
                    <div className="h-8 w-24 bg-gray-200 rounded animate-pulse"></div>
                  ) : (
                    `Ksh ${totalPrice.toLocaleString()}`
                  )}
                </p>
              </div>
            </div>
          </div>

          {/* Card 3 */}
          <div className="bg-white p-6 border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-200">
            <div className="flex items-center">
              <div className="p-3 rounded-lg bg-gray-50 border border-gray-100 mr-4">
                <FiTrendingUp className="text-black" size={20} />
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-gray-400">Unique Dishes</p>
                <p className="text-2xl font-bold text-gray-900 mt-0.5">
                  {isLoading ? (
                    <div className="h-8 w-12 bg-gray-200 rounded animate-pulse"></div>
                  ) : (
                    dishReport.length
                  )}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Section Heading Label */}
        <div className="border-b border-gray-200 pb-2">
          <h3 className="text-xs font-semibold tracking-wider text-black uppercase">
            Data Ledger
          </h3>
        </div>

        {/* Report Table Viewport Container */}
        <div className="border border-gray-200 rounded-xl overflow-x-auto shadow-sm bg-white" ref={componentRef}>
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-4 text-left text-xs font-bold text-black uppercase tracking-wider">
                  Dish ID
                </th>
                <th scope="col" className="px-6 py-4 text-left text-xs font-bold text-black uppercase tracking-wider">
                  Dish Name
                </th>
                <th scope="col" className="px-6 py-4 text-left text-xs font-bold text-black uppercase tracking-wider">
                  Quantity Sold
                </th>
                <th scope="col" className="px-6 py-4 text-left text-xs font-bold text-black uppercase tracking-wider">
                  Revenue
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {isLoading ? (
                // Show 5 skeleton rows while loading
                Array.from({ length: 5 }).map((_, index) => (
                  <SkeletonRow key={`skeleton-${index}`} />
                ))
              ) : dishReport?.length > 0 ? (
                dishReport.map((item, id) => (
                  <tr key={id} className="hover:bg-gray-50 transition-colors duration-150">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 font-mono">
                      #{item.dish_id}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-semibold uppercase tracking-tight">
                      {item.metadata?.name || "N/A"}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 font-medium">
                      {item.dish_id_quantity}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-bold">
                      Ksh {(item.unit_price * item.quantity).toLocaleString()}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="px-6 py-20 text-center">
                    <div className="mx-auto h-12 w-12 rounded-full bg-gray-50 border border-gray-100 flex items-center justify-center mb-4">
                      <FiPieChart className="text-gray-400" size={18} />
                    </div>
                    <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wide">No data available</h3>
                    <p className="mt-1 text-xs text-gray-400 max-w-xs mx-auto">
                      Sales logs will appear here once transactions are processed.
                    </p>
                  </td>
                </tr>
              )}
            </tbody>
            
            {!isLoading && dishReport?.length > 0 && (
              <tfoot className="bg-gray-50 border-t border-gray-200">
                <tr>
                  <td colSpan="3" className="px-6 py-5 text-xs font-bold uppercase tracking-wider text-black text-right">
                    Cumulative Balance:
                  </td>
                  <td className="px-6 py-5 whitespace-nowrap text-sm font-black text-black">
                    Ksh {totalPrice.toLocaleString()}
                  </td>
                </tr>
              </tfoot>
            )}
          </table>
        </div>
      </div>
    </div>
  );
}

export default SalesDish;