import React, { useEffect, useState } from "react";
import DishesMenuList from "../Components/DishesMenuList";
import axios from "axios";
import { SERVER_URL } from "../utils/constants";

const HomePage = () => {
  const [categories, setCategories] = useState([]);
  const [activeTab, setActiveTab] = useState("");

  const fetchCategories = async () => {
    try {
     const response = await axios.get(`${SERVER_URL}/categories`, 'get');
      setCategories(response.data.categories); 
      
      if (response.data.categories && response.data.categories.length > 0) {
        setActiveTab(response.data.categories[0].name);
      }
    } catch (error) {
      console.error("Failed to fetch categories:", error);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <>
      {/* Header */}
      <div className="bg-white border-b border-gray-100">
        <div className="mx-auto max-w-7xl px-4 py-6 md:py-8 md:px-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
                Our Menu
              </h1>
              <p className="text-gray-500 text-sm mt-0.5">
                Discover our delicious selection of carefully crafted dishes
              </p>
            </div>
          </div>

          {/* Category Filter */}
          <div className="mt-6 flex flex-wrap gap-2">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setActiveTab(category.name)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                  activeTab === category.name
                    ? "bg-gray-900 text-white shadow-sm"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Menu grid */}
      <div className="">
        <div className="mx-auto max-w-7xl py-8 md:py-12 px-4 md:px-6">
          <DishesMenuList category={activeTab} />
        </div>
      </div>
    </>
  );
};

export default HomePage;