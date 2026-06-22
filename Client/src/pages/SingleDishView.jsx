import React, { useEffect, useState } from "react";
import { MdAddShoppingCart, MdRemoveShoppingCart } from "react-icons/md";
import { SERVER_URL } from "../constants";
import axios from "axios";
import { useParams } from "react-router-dom";
import { 
  MdArrowBack,
  MdRestaurant,
} from "react-icons/md";
import { FiShoppingBag, FiTag, FiClock, FiStar } from "react-icons/fi";
import { Link } from "react-router-dom";
import { UseCartContext } from "../hook/UseCartContext";

// Skeleton Component
const DishViewSkeleton = () => {
  return (
    <div className="min-h-screen bg-gray-50/50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Back Button Skeleton */}
        <div className="inline-flex items-center mb-8">
          <div className="p-1.5 rounded-lg bg-gray-200 mr-2 w-8 h-8 animate-pulse"></div>
          <div className="h-4 w-32 bg-gray-200 rounded animate-pulse"></div>
        </div>

        {/* Main Card Skeleton */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="lg:flex">
            {/* Image Section Skeleton */}
            <div className="lg:w-1/2">
              <div className="h-80 lg:h-full min-h-[400px] relative overflow-hidden bg-gray-200 animate-pulse">
                {/* Price Badge Skeleton */}
                <div className="absolute bottom-4 right-4">
                  <div className="px-5 py-2.5 bg-gray-300 rounded-xl w-28 h-12"></div>
                </div>
              </div>
            </div>

            {/* Details Section Skeleton */}
            <div className="lg:w-1/2 p-6 sm:p-8 lg:p-10">
              <div className="mb-6">
                <div className="h-10 bg-gray-200 rounded-lg w-3/4 animate-pulse"></div>
                <div className="flex flex-wrap items-center gap-3 mt-4">
                  <div className="h-8 bg-gray-200 rounded-full w-20 animate-pulse"></div>
                  <div className="h-8 bg-gray-200 rounded-full w-24 animate-pulse"></div>
                </div>
              </div>
              <div className="mb-8 space-y-2">
                <div className="h-4 bg-gray-200 rounded w-full animate-pulse"></div>
                <div className="h-4 bg-gray-200 rounded w-5/6 animate-pulse"></div>
                <div className="h-4 bg-gray-200 rounded w-4/6 animate-pulse"></div>
              </div>
              <div className="mb-8">
                <div className="h-4 bg-gray-200 rounded w-32 animate-pulse mb-3"></div>
                <div className="flex items-center gap-4 bg-gray-50 p-2 rounded-xl border border-gray-100 w-fit">
                  <div className="w-10 h-10 bg-gray-200 rounded-lg animate-pulse"></div>
                  <div className="w-10 h-8 bg-gray-200 rounded animate-pulse"></div>
                  <div className="w-10 h-10 bg-gray-200 rounded-lg animate-pulse"></div>
                </div>
                <div className="mt-2 h-4 bg-gray-200 rounded w-40 animate-pulse"></div>
              </div>
              <div className="space-y-3">
                <div className="w-full h-14 bg-gray-200 rounded-xl animate-pulse"></div>
                <div className="w-full h-12 bg-gray-200 rounded-xl animate-pulse"></div>
              </div>
              <div className="mt-6 p-4 bg-gray-100 rounded-xl border border-gray-200">
                <div className="flex items-center gap-3">
                  <div className="w-4 h-4 bg-gray-300 rounded-full animate-pulse"></div>
                  <div className="h-3 bg-gray-200 rounded w-3/4 animate-pulse"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const DishView = () => {
  const { cartItems, addToCart, removeFromCart } = UseCartContext();
  const [dish, setDish] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const { id } = useParams();
  const isAdded = cartItems.find((item) => item.id === dish.id);

  useEffect(() => {
    const getDish = async () => {
      try {
        const res = await axios.get(`${SERVER_URL}/dishes/${id}`);
        if (res.status === 200) {
          setDish(res.data.dish);
        }
      } catch (error) {
        console.error("Error fetching dish:", error);
      } finally {
        setIsLoading(false);
      }
    };

    getDish();
  }, [id]);

  if (isLoading) {
    return <DishViewSkeleton />;
  }

  // Calculate total price for current quantity
  const totalPrice = (dish.price || 0) * quantity;

  return (
    <div className="min-h-screen bg-gray-50/50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <Link 
          to="/" 
          className="group inline-flex items-center text-sm font-semibold text-gray-500 hover:text-gray-800 transition-colors mb-8"
        >
          <div className="p-1.5 rounded-lg bg-gray-100 group-hover:bg-gray-200 transition-all duration-200 mr-2">
            <MdArrowBack size={16} className="group-hover:-translate-x-0.5 transition-transform" />
          </div>
          Back to Menu
        </Link>

        {/* Main Card */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="lg:flex">
            {/* Image Section */}
            <div className="lg:w-1/2 relative">
              <div className="h-80 lg:h-full min-h-[400px] relative overflow-hidden bg-gray-100">
                <img 
                  className="w-full h-full object-cover" 
                  src={`${SERVER_URL}/${dish?.image}`} 
                  alt={dish?.name}
                  onError={(e) => { e.target.src = "https://placehold.co/600x400?text=Food+Image" }}
                />

                {/* Price Badge on Image */}
                 <div className="absolute  bottom-4 right-4 bg-white/95 backdrop-blur-sm px-3 py-1.5 rounded-lg shadow-sm border border-gray-100">
          <span className="text-lg font-bold text-gray-900">
                    Ksh {dish?.price?.toLocaleString()}
                  </span>
                </div>
              </div>
            </div>

            {/* Details Section */}
            <div className="lg:w-1/2 p-6 sm:p-8 lg:p-10">
              {/* Title */}
              <div className="mb-6">
                <div className="flex items-start justify-between">
                  <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 leading-tight">
                    {dish?.name || 'Delicious Dish'}
                  </h1>
                </div>
                
                {/* Quick Info Tags */}
                <div className="flex flex-wrap items-center gap-3 mt-4">
                  {dish?.category && (
                        <span className="px-4 py-2 bg-white/90 backdrop-blur-sm text-gray-700 text-sm font-semibold rounded-full shadow-sm border border-gray-200 flex items-center gap-1.5">
                      {dish.category}
                    </span>
                  )}
                  {dish?.prep_time && (
                    <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-gray-100 text-gray-700 text-xs font-semibold rounded-full">
                      <FiClock size={12} />
                      {dish.prep_time} min
                    </span>
                  )}
                  {dish?.rating && (
                    <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-gray-100 text-gray-700 text-xs font-semibold rounded-full">
                      <FiStar size={12} />
                      {dish.rating}
                    </span>
                  )}
                </div>
              </div>

              {/* Description */}
              {dish?.description && (
                <p className="text-gray-600 leading-relaxed text-sm sm:text-base mb-8">
                  {dish.description}
                </p>
              )}

              {/* Quantity Selector */}
              <div className="mb-8">
                <label className="block text-xs font-bold tracking-wide uppercase text-gray-600 mb-3">
                  Select Quantity
                </label>
                <div className="flex items-center gap-4 bg-gray-50 p-2 rounded-xl border border-gray-200 w-fit">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-10 h-10 rounded-lg bg-white hover:bg-gray-100 text-gray-700 font-bold transition-all duration-200 flex items-center justify-center shadow-sm hover:shadow hover:-translate-y-0.5"
                    disabled={quantity <= 1}
                  >
                    −
                  </button>
                  <span className="text-xl font-bold text-gray-800 min-w-[40px] text-center">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-10 h-10 rounded-lg bg-white hover:bg-gray-100 text-gray-700 font-bold transition-all duration-200 flex items-center justify-center shadow-sm hover:shadow hover:-translate-y-0.5"
                  >
                    +
                  </button>
                </div>
                <p className="mt-2 text-sm text-gray-500">
                  Total: <span className="font-bold text-gray-900">Ksh {totalPrice.toLocaleString()}</span>
                </p>
              </div>

              {/* Action Buttons */}
              <div className="space-y-3">
                {isAdded ? (
                  <button 
                    onClick={() => removeFromCart(dish.id)}
                    className="w-full flex items-center justify-center gap-3 py-4 px-6 bg-gradient-to-r from-rose-500 to-rose-600 hover:from-rose-600 hover:to-rose-700 text-white font-bold text-base rounded-xl transition-all duration-200 shadow-lg "
                  >
                    <MdRemoveShoppingCart size={22} />
                    Remove from Cart
                  </button>
                ) : (
                  <button 
                    onClick={() => {
                      addToCart({ ...dish, quantity });
                    }}
                    className="w-full flex items-center justify-center gap-3 py-4 px-6 bg-gray-900 hover:bg-gray-800 text-white font-bold text-base rounded-xl"
                  >
                    <MdAddShoppingCart size={22} />
                    Add to Cart
                  </button>
                )}
                
              </div>

              {/* Additional Info */}
              <div className="mt-6 p-4 bg-gray-50 rounded-xl border border-gray-200">
                <div className="flex items-center gap-3 text-xs text-gray-600">
                  <MdRestaurant size={16} className="text-gray-700 flex-shrink-0" />
                  <span>Order from our kitchen and enjoy freshly prepared meals delivered to you</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DishView;