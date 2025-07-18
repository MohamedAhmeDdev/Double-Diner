import React, { useEffect, useState } from "react";
import InventoryList from "../Components/inventory/InventoryList";
import { apiCall } from "../utils/apiCall";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { RiDashboardLine } from "react-icons/ri";
import { MdOutlineInventory } from "react-icons/md";

const Inventory = () => {
  const [inventoryItems, setInventoryItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

useEffect(() => {
  const fetchInventoryItems = async () => {
    try {
      const response = await apiCall("/dishes", "GET");
      setInventoryItems(response.dishes);
    } catch (error) {
      toast.error("Failed to fetch inventory items");
    } finally {
      setIsLoading(false);
    }
  };

  fetchInventoryItems();
}, []);


  const handleDelete = (id) => {
    apiCall(`/dishes/${id}`, "DELETE").then((response) => {
      setInventoryItems((items) => items.filter((item) => item.id !== id));
    })(
      toast.success("Dish Deleted successfully")
    )
  };

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
              <MdOutlineInventory className="mr-1.5 text-orange-500" size={16} />
              Inventory
            </span>
          </li>
        </ol>
      </nav>

      <InventoryList listItems={inventoryItems} onDelete={handleDelete} isLoading={isLoading} />
    </div>
  );
};

export default Inventory;
