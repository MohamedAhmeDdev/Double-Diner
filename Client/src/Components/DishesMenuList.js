import { MdAddShoppingCart, MdRemoveShoppingCart } from "react-icons/md";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { SERVER_URL } from "../constants";
import { UseCartContext } from "../hook/UseCartContext";
import axios from "axios";

const DishItem = ({ dish }) => {
  const { cartItems, addToCart, removeFromCart } = UseCartContext();
  const [isLoading, setIsLoading] = useState(true);
  const [isHovered, setIsHovered] = useState(false);
  const isAdded = cartItems.find((item) => item.id === dish.id);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timeout);
  }, []);

  return (
    <div className="mb-6">
      {isLoading ? (
        <div className="animate-pulse bg-white rounded-xl shadow-md overflow-hidden transition-all duration-300 h-96 w-80">
          <div className="bg-gray-200 h-48 w-full"></div>
          <div className="p-4 space-y-3">
            <div className="bg-gray-200 h-6 w-3/4 rounded"></div>
            <div className="bg-gray-200 h-4 w-full rounded"></div>
            <div className="bg-gray-200 h-4 w-5/6 rounded"></div>
            <div className="flex justify-between items-center pt-4">
              <div className="bg-gray-200 h-8 w-20 rounded"></div>
              <div className="bg-gray-200 h-8 w-8 rounded-full"></div>
            </div>
          </div>
        </div>
      ) : (
        <div 
          className="bg-white rounded-xl shadow-md overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <div className="relative h-48 w-full overflow-hidden">
            <img 
              className={`w-full h-full object-cover transition-transform duration-500 ${isHovered ? 'scale-105' : 'scale-100'}`} 
              src={`${SERVER_URL}/${dish?.image}`} 
              alt={dish?.name}
            />
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
              <span className="text-white font-semibold text-lg">Ksh. {dish?.price}</span>
        </div>
     </div>

          <div className="p-4">
            <div className="flex justify-between items-start">
              <h3 className="text-lg font-semibold text-gray-800 mb-1">{dish?.name}</h3>
              <button
                onClick={() => isAdded ? removeFromCart(dish.id) : addToCart(dish)}
                className={`p-2 rounded-full transition-colors duration-300 ${isAdded ? 'bg-rose-100 text-rose-600' : 'bg-emerald-100 text-emerald-600'} hover:${isAdded ? 'bg-rose-200' : 'bg-emerald-200'}`}
              >
                {isAdded ? <MdRemoveShoppingCart size={20} /> : <MdAddShoppingCart size={20} />}
              </button>
            </div>
            
            <p className="text-gray-600 text-sm mb-4 line-clamp-2">{dish?.description}</p>
            
            <div className="flex justify-between items-center">
              <Link 
                to={`/dish/${dish.id}`} 
                className="text-sm font-medium text-indigo-600 hover:text-indigo-800 transition-colors"
              >
                View Details
              </Link>
            </div>
        </div>
    </div>
     )}

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

      const availableDishes = allDishes.filter((dish) => dish.quantity > 0);
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
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 px-5 md:px-10 py-6">
      {dishes?.map((dish) => (
        <DishItem dish={dish} key={dish.id} />
      ))}
    </div>
  );
};

export default DishesMenuList;
