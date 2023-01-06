import "../css/Menu.css";

import React, { useState } from "react";

import DishesMenuList from "../Components/DishesMenuList";

export const DISH_CATEGORIES = [
  { id: 0, name: "Full Menu", value: "all" },
  { id: 1, name: "Appetizer", value: "appetizer" },
  { id: 2, name: "Main Course", value: "maincourse" },
  { id: 3, name: "Dessert", value: "dessert" },
  { id: 4, name: "Beverage", value: "beverage" },
  { id: 5, name: "Side Dish", value: "sidedish" },
  { id: 6, name: "Salad", value: "salad" },
  { id: 7, name: "Drinks", value: "drinks" },
];

const TabItem = ({ dishCategory, activeTab, setActiveTab }) => {
  return (
    <li className="nav-item  cursor-pointer" role="presentation">
      <span
        className={`nav-link block font-medium text-xs leading-tight uppercase border-x-0 border-t-0 border-b-2 border-transparent px-6 py-3 my-2 hover:border-transparent hover:bg-gray-100 focus:border-transparent ${
          activeTab === dishCategory.value
            ? "border-blue-500 text-blue-500"
            : ""
        }`}
        id="tabs-home-tab"
        data-bs-toggle="pill"
        data-bs-target="#tabs-home"
        role="tab"
        aria-controls="tabs-home"
        aria-selected="true"
        onClick={() => setActiveTab(dishCategory.value)}
      >
        {dishCategory.name}
      </span>
    </li>
  );
};

const HomePage = () => {
  const [activeTab, setActiveTab] = useState(DISH_CATEGORIES[0].value);

  return (
    <div className="home-container  h-screen w-screen flex flex-col  items-center">
      <ul
        className="nav nav-tabs flex flex-col md:flex-row flex-wrap list-none border-b-0 pl-0 mb-4"
        id="tabs-tab"
        role="tablist"
      >
        {DISH_CATEGORIES.map((dishCategory) => (
          <TabItem
            key={dishCategory.id}
            dishCategory={dishCategory}
            activeTab={activeTab}
            setActiveTab={setActiveTab}
          />
        ))}
      </ul>

      <DishesMenuList category={activeTab} />
    </div>
  );
};

export default HomePage;
