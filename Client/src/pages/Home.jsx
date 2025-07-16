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
        className={`flex h-8 shrink-0 items-center justify-center gap-x-2 rounded-lg bg-[#f4f0f0] pl-4 pr-4 text-[#181111] text-sm font-medium leading-normal ${
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
        onClick={() => setActiveTab(dishCategory.value)} //changes the category
      >
        {dishCategory.name}
      </span>
    </li>
  );
};

const HomePage = () => {
  const [activeTab, setActiveTab] = useState(DISH_CATEGORIES[0].value);  //set to all categories

  return (
  <>
      <div class="mt-1 lg:px-40 flex-row flex-1 justify-center py-5">
        <div class="layout-content-container flex flex-col max-w-[960px] flex-1">
          <h2 class="text-[#181111] tracking-light text-[28px] font-bold leading-tight px-4 text-left pb-3 pt-5">Menu</h2>
          <ul  className="flex gap-3 p-3 flex-wrap pr-4" id="tabs-tab" role="tablist">
            {DISH_CATEGORIES.map((dishCategory) => ( //mapping the DISH_CATEGORIES array
              <TabItem key={dishCategory.id} dishCategory={dishCategory} activeTab={activeTab}  setActiveTab={setActiveTab} />
            ))}
          </ul>
        </div>
      </div>

      <div className="flex flex-col  items-center">
        <div className="mb-10">
          <DishesMenuList category={activeTab} />
        </div>
      </div>
  </>
  );
};

export default HomePage;
