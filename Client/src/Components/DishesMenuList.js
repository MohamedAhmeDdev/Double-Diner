import { MdAddShoppingCart, MdRemoveShoppingCart } from "react-icons/md";
import React, { useEffect, useState } from "react";

import { Link } from "react-router-dom";
import { SERVER_URL } from "../constants";
import { UseCartContext } from "../hook/UseCartContext";
import axios from "axios";

const DishItem = ({ dish }) => {
  const { cartItems, addToCart, removeFromCart } = UseCartContext();//from the cart context
  const [isLoading, setIsLoading] = useState(true);
  const isAdded = cartItems.find((item) => item.id === dish.id); //function to see it the cart is added or not

  useEffect(() => {
    // Simulate an API request delay (you can remove this in a real application)
    const timeout = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timeout);
  }, []);

  return (
    <div className="mb-10">

       {isLoading ? (
     <div class=" p-2 sm:p-4 sm:h-64 rounded-2xl shadow-lg  gap-5 h-96  w-80 ">
       <div class="bg-gray-200 w-full animate-pulse  h-28 rounded-2xl" ></div>
        <div class="flex flex-col flex-1 gap-5 sm:p-2 py-20">
          <div class="flex flex-1 flex-col gap-3">
          <div class="bg-gray-200 w-48 animate-pulse h-3 rounded-2xl" ></div>
            <div class="bg-gray-200 w-full animate-pulse h-3 rounded-2xl" ></div>
            <div class="bg-gray-200 w-full animate-pulse h-3 rounded-2xl" ></div>
          </div>
          <div class="mt-auto flex gap-3 ">
            <div class="bg-gray-200 w-16 h-8 animate-pulse rounded-sm" ></div>
            <div class="bg-gray-200 w-16 h-8 animate-pulse rounded-sm" ></div>
          </div>
        </div>
     </div>
    ) : (
    <div class="max-w-sm rounded overflow-hidden shadow-md relative">
    {/* <div class="absolute top-0 left-0 m-3 bg-white text-black px-3 py-1 rounded-sm  text-xs capitalize font-bold">Breakfast</div> */}
      <img class="w-full h-48" src={`${SERVER_URL}/${dish?.image}`} alt={dish?.name}/>
      <div class="px-3 py-2">
      {/* <span class="inline-block rounded-full  text-sm text-gray-700"> 4.7  ⭐ ⭐ ⭐ ⭐ ⭐</span> */}

          <div class="font-bold text-xl pt-2">{dish?.name}</div>
          <p class="text-gray-700 text-sm"> {dish?.description}</p>
      </div>
      <div class="px-3 pt-2">
            <span class="inline-block bg-blue-100 rounded-sm px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">Ksh. {dish?.price}</span>

            {isAdded ? (
              <button
                type="button"
                className="inline-block bg-red-500 rounded-sm px-5 py-1 text-sm font-semibold text-white mr-2 mb-2 capitalize"
                onClick={() => removeFromCart(dish?.id)}
              >
                Remove{" "}
                <MdRemoveShoppingCart className="inline-block" size={20} />
              </button>
            ) : (
              <button
                type="button"
                className="inline-block bg-blue-500 rounded-sm px-5 py-1 text-sm font-semibold text-white mr-2 mb-2 capitalize"
                onClick={() => addToCart(dish)}
              >
                Add <MdAddShoppingCart className="inline-block" size={20} />
              </button>
            )}
            {/* <span class="inline-block bg-green-400 rounded-sm px-5 py-1 text-sm font-semibold text-white mr-2 mb-2 capitalize">rate</span> */}
        </div>
    </div>
     )}

    </div>
    
  );
};

const DishesMenuList = ({ category }) => {
  const [dishes, setDishes] = useState([]);

  useEffect(() => {
    //if the category is "all", it will return the URL as ${SERVER_URL}/dishes and if the category is not "all" then it will return the URL as ${SERVER_URL}/dishes/list/?category=${category}
    const URL = `${SERVER_URL}/dishes${category === "all" ? "" : `/list/?category=${category}`}`; 

    const fetchDishes = async () => {
      const response = await axios.get(URL);
      const allDishes = response.data.dishes;

      // filter out the dishes that have quantity less than 1
      const availableDishes = allDishes.filter((dish) => dish.quantity > 0);

      // make a new array of dishes with the quantity property set to 1 so that we can add them to the cart as the stored quantity is not relevant to the cart
      const dishes = availableDishes.map((dish) => {
        return {
          ...dish,
          quantity: 1,
        };
      });

      setDishes(dishes);
    };

    fetchDishes();
  }, [category]);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 px-5 pr-10" >
      {dishes?.map((dish) => (
        <DishItem dish={dish} key={dish.id} />
      ))}
    </div>
  );
};

export default DishesMenuList;
