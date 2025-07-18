import React, { useEffect, useState, useRef } from "react";
import { apiCall } from "../utils/apiCall";
import { useReactToPrint } from "react-to-print";
import { FiPrinter, FiDollarSign, FiPieChart, FiTrendingUp } from "react-icons/fi";
import { toast } from "react-toastify";

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
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
      {/* Header */}
      <div className="px-6 py-5 border-b border-gray-100 flex justify-between items-center">
        <div>
          <h2 className="text-xl font-semibold text-gray-800 flex items-center">
            <FiTrendingUp className="mr-2 text-indigo-600" />
            Sales Performance Report
          </h2>
          <p className="mt-1 text-sm text-gray-500">
            Detailed breakdown of dish sales
          </p>
        </div>
        <button
          onClick={handlePrint}
          className="inline-flex items-center px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium rounded-lg shadow-sm transition-colors"
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
  );
}

export default SalesDish;