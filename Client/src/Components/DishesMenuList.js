import { MdAddShoppingCart, MdRemoveShoppingCart } from "react-icons/md";
import React, { useEffect, useState } from "react";

import { Link } from "react-router-dom";
import { SERVER_URL } from "../constants";
import { UseCartContext } from "../hook/UseCartContext";
import axios from "axios";

const DishItem = ({ dish }) => {
  const { cartItems, addToCart, removeFromCart } = UseCartContext();//from the cart context

  const isAdded = cartItems.find((item) => item.id === dish.id); //function to see it the cart is added or not

  return (
    <div className="">
      <div className="rounded-lg shadow-lg bg-white max-w-sm h-96">
        <Link to={`/dishes/${dish.id}`}data-mdb-ripple="true" data-mdb-ripple-color="light">
          <img className="rounded-t-lg object-cover h-48 w-96"  src={`${SERVER_URL}/${dish?.image}`} alt={dish?.name} />
        </Link>

        <div className="p-6">
          <h5 className="text-gray-900 text-xl font-medium mb-2"> {dish?.name}</h5>
          <p className="text-gray-700 text-base mb-4 truncate">{dish?.description}</p>
          <div className="flex justify-between  items-center">
            <p className="text-gray-700 text-base mb-4 text-2xl font-bold"> Ksh. {dish?.price} </p>

            {isAdded ? (
              <button
                type="button"
                className="inline-block px-6 py-2.5 bg-red-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-red-700 hover:shadow-lg focus:bg-red-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-red-800 active:shadow-lg transition duration-150 ease-in-out flex items-center justify-center gap-2"
                onClick={() => removeFromCart(dish?.id)}
              >
                Remove{" "}
                <MdRemoveShoppingCart className="inline-block" size={20} />
              </button>
            ) : (
              <button
                type="button"
                className="inline-block px-6 py-2.5  bg-blue-600  text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out flex items-center justify-center gap-2"
                onClick={() => addToCart(dish)}
              >
                Add <MdAddShoppingCart className="inline-block" size={20} />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const DishesMenuList = ({ category }) => {
  const [dishes, setDishes] = useState([]);

  useEffect(() => {
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
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4" >
      {dishes?.map((dish) => (
        <DishItem dish={dish} key={dish.id} />
      ))}
    </div>
  );
};

export default DishesMenuList;
