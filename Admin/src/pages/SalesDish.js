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
      console.error("Error fetching report:", error);
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

  return (
     <div className="flex flex-col">
        <nav className="flex h-16 items-center mb-3 pl-4 lg:pl-6 border-b border-gray-100 bg-white" aria-label="Breadcrumb">
                <ol className="flex items-center space-x-2">
                  <li className="flex items-center">
                    <Link 
                      to="/" 
                      className="group flex items-center transition-all duration-200 hover:-translate-x-0.5"
                    >
                      <div className="p-1.5 rounded-lg bg-indigo-50 group-hover:bg-indigo-100 mr-2 transition-colors duration-200 shadow-sm">
                        <RiDashboardLine className="text-indigo-600 group-hover:text-indigo-700" size={16} />
                      </div>
                      <span className="text-sm font-medium text-indigo-600 group-hover:text-indigo-800 transition-colors duration-200">
                        Dashboard
                      </span>
                    </Link>
                  </li>
                  <li className="flex items-center">
                    <svg
                      className="h-4 w-4 text-gray-300 mx-1"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      aria-hidden="true"
                    >
                      <path
                        fillRule="evenodd"
                        d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span className="text-sm font-medium text-gray-600 ml-1 flex items-center">
                      <FiPieChart className="mr-1.5 text-red-500" size={16} />
                       sales report
                    </span>
                  </li>
                </ol>
        </nav>
        <div className="w-full mx-auto px-4 sm:px-6 lg:px-8">
    <div className="bg-white rounded-xl shadow-sm overflow-hidden">
      {/* Header */}
       <div className="flex flex-col md:flex-row md:justify-between md:items-center space-y-3 md:space-y-0 pb-4 px-2 border-b border-gray-100">
        <div>
          <h2 className="text-sm md:text-lg font-semibold text-gray-800 flex items-center">
            <FiTrendingUp className="mr-2  text-indigo-600" />
            Sales Performance Report
          </h2>
          <p className="mt-1 text-sm text-gray-500">
            Detailed breakdown of dish sales
          </p>
        </div>
        <button
          onClick={handlePrint}
          className="flex justify-center items-center px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium rounded-lg shadow-sm transition-colors"
        >
          <FiPrinter className="mr-2" />
          Export PDF
        </button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 px-6 py-4 bg-gray-50">
        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-blue-100 mr-4">
              <FiPieChart className="text-blue-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Total Dishes Sold</p>
              <p className="text-2xl font-semibold text-gray-900">
                <p className="text-2xl font-semibold text-gray-900">
                 {dishReport.reduce((sum, item) => sum + Number(item.dish_id_quantity || 0), 0)}
               </p>
              </p>
            </div>
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-green-100 mr-4">
              <FiDollarSign className="text-green-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Total Revenue</p>
              <p className="text-2xl font-semibold text-gray-900">
                Ksh {totalPrice.toLocaleString()}
              </p>
            </div>
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-purple-100 mr-4">
              <FiTrendingUp className="text-purple-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Unique Dishes</p>
              <p className="text-2xl font-semibold text-gray-900">
                {dishReport.length}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Report Table */}
      <div className="overflow-x-auto" ref={componentRef}>
        {isLoading ? (
          <div className="px-6 py-12 text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500 mx-auto"></div>
            <p className="mt-4 text-gray-500">Loading sales report...</p>
          </div>
        ) : (
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Dish ID
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Dish Name
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Quantity Sold
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Revenue
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {dishReport?.length > 0 ? (
                dishReport.map((item, id) => (
                  <tr key={id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      # {item.dish_id}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-medium">
                      {item.metadata?.name || "N/A"}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {item.dish_id_quantity}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-medium">
                      <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-green-100 text-green-800">
                        Ksh {(item.unit_price * item.quantity).toLocaleString()}
                      </span>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="px-6 py-12 text-center">
                    <div className="mx-auto h-16 w-16 rounded-full bg-gray-100 flex items-center justify-center mb-4">
                      <FiPieChart className="text-gray-400" />
                    </div>
                    <h3 className="text-lg font-medium text-gray-900">No sales data available</h3>
                    <p className="mt-1 text-sm text-gray-500">
                      Sales report will appear here when available
                    </p>
                  </td>
                </tr>
              )}
            </tbody>
            {dishReport?.length > 0 && (
              <tfoot className="bg-gray-50">
                <tr>
                  <td colSpan="3" className="px-6 py-4 text-sm font-semibold text-gray-900 text-right">
                    Total Revenue:
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-gray-900">
                    <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-indigo-100 text-indigo-800">
                      Ksh {totalPrice.toLocaleString()}
                    </span>
                  </td>
                </tr>
              </tfoot>
            )}
          </table>
        )}
      </div>
    </div>
      </div>
      </div>
  );
}

export default SalesDish;