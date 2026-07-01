import { MdAddShoppingCart, MdRemoveShoppingCart, MdArrowOutward } from "react-icons/md";
import { FiShoppingBag, FiClock } from "react-icons/fi";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { SERVER_URL } from "../utils/constants/index";
import { UseCartContext } from "../hook/UseCartContext";
import axios from "axios";

const DishItem = ({ dish }) => {
  const { cartItems, addToCart, removeFromCart } = UseCartContext();
  const [isLoading, setIsLoading] = useState(true);
  const isAdded = cartItems.find((item) => item.dish_id === dish.dish_id);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsLoading(false);
    }, 500);

    return () => clearTimeout(timeout);
  }, []);

  if (isLoading) {
    return (
      <div className="w-full animate-pulse">
        <div className="h-52 w-full rounded-t-xl bg-gray-200" />
        <div className="space-y-3 rounded-b-xl border border-t-0 border-gray-100 bg-white p-4 pt-6">
          <div className="h-5 w-2/3 rounded bg-gray-200" />
          <div className="h-3 w-full rounded bg-gray-200" />
          <div className="h-3 w-4/5 rounded bg-gray-200" />
        </div>
      </div>
    );
  }

  return (
    <div className="group bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
      {/* Image */}
      <div className="relative h-52 w-full overflow-hidden bg-gray-100">
        <img
          className="h-full w-full object-cover"
          src={`${SERVER_URL}/${dish?.image}`}
          alt={dish?.name}
        />
        <div className="absolute bottom-3 left-3 bg-white/95 backdrop-blur-sm px-2 py-1 md:px-3 md:py-1.5 rounded-lg shadow-sm border border-gray-100">
          <span className="font-mono text-xs md:text-sm font-bold text-gray-900">
            Ksh {dish?.price?.toLocaleString()}
          </span>
        </div>
        {dish?.prep_time && (
          <div className="absolute top-3 right-3 bg-white/95 backdrop-blur-sm px-2.5 py-1 rounded-lg shadow-sm border border-gray-100">
            <span className="flex items-center gap-1 text-xs text-gray-500">
              <FiClock size={12} />
              {dish.prep_time}min
            </span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-4">
        <div className="flex items-start justify-between gap-3">
          <h3 className="font-semibold text-gray-900 line-clamp-1">{dish?.name}</h3>
          <button
            onClick={() => (isAdded ? removeFromCart(dish.dish_id) : addToCart(dish))}
            className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg transition-all duration-200 ${
              isAdded
                ? "bg-rose-50 text-rose-600 hover:bg-rose-100"
                : "bg-gray-900 text-white hover:bg-gray-800 hover:shadow-md"
            }`}
          >
            {isAdded ? <MdRemoveShoppingCart size={16} /> : <MdAddShoppingCart size={16} />}
          </button>
        </div>

        <p className="mt-1.5 line-clamp-2 text-sm text-gray-500">{dish?.description}</p>

        <div className="mt-3 flex flex-row items-center justify-between gap-2 sm:gap-0">
          <div className="flex flex-wrap items-center gap-2">
            {dish?.category && (
              <span className="text-xs px-2.5 py-1 bg-gray-100 rounded-full text-gray-600 capitalize whitespace-nowrap">
                {dish.category.name}
              </span>
            )}
          </div>
          <Link
            to={`/dishes/${dish.dish_id}`}
            className="text-xs font-medium text-gray-600 hover:text-gray-900 transition-colors flex items-center gap-0.5 group shrink-0"
          >
            View Details
            <MdArrowOutward size={14} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </Link>
        </div>
      </div>
    </div>
  );
};

const DishesMenuList = ({ category }) => {
  const [dishes, setDishes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    const URL = `${SERVER_URL}/dishes${category === "all" ? "" : `/list/?category=${category}`}`;

    const fetchDishes = async () => {
      try {
        const response = await axios.get(URL);
        const allDishes = response.data.dishes;

        const availableDishes = allDishes.filter((dish) => dish.quantity > 0);
        const dishes = availableDishes.map((dish) => ({
          ...dish,
          quantity: 1,
        }));

        setDishes(dishes);
      } catch (error) {
        console.error("Failed to fetch dishes:", error);
        setDishes([]);
      } finally {
        setLoading(false);
      }
    };

    fetchDishes();
  }, [category]);

  if (loading) {
    return (
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4">
        {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
          <div key={i} className="w-full animate-pulse">
            <div className="h-52 w-full rounded-t-xl bg-gray-200" />
            <div className="space-y-3 rounded-b-xl border border-t-0 border-gray-100 bg-white p-4 pt-6">
              <div className="h-5 w-2/3 rounded bg-gray-200" />
              <div className="h-3 w-full rounded bg-gray-200" />
              <div className="h-3 w-4/5 rounded bg-gray-200" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (dishes.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center gap-4 px-5 py-20 text-center">
        <div className="w-20 h-20 bg-gray-100 rounded-2xl flex items-center justify-center">
          <FiShoppingBag size={32} className="text-gray-400" />
        </div>
        <div>
          <h3 className="text-lg font-bold text-gray-900">No dishes available</h3>
          <p className="text-sm text-gray-500 max-w-sm">
            This category is empty right now. Try another category.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4">
      {dishes.map((dish) => (
        <DishItem key={dish.dish_id} dish={dish} />
      ))}
    </div>
  );
};

export default DishesMenuList;