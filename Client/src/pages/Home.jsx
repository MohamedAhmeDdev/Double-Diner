import React, { useState } from "react";
import DishesMenuList from "../Components/DishesMenuList";

export const DISH_CATEGORIES = [
  { id: 1, name: "Appetizer", value: "appetizer" },
  { id: 2, name: "Main Course", value: "maincourse" },
  { id: 3, name: "Dessert", value: "dessert" },
  { id: 4, name: "Beverage", value: "beverage" },
  { id: 5, name: "Side Dish", value: "sidedish" },
];

const HomePage = () => {
  const [activeTab, setActiveTab] = useState(DISH_CATEGORIES[0].value);

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
            {DISH_CATEGORIES.map((category) => (
              <button
                key={category.id}
                onClick={() => setActiveTab(category.value)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                  activeTab === category.value
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