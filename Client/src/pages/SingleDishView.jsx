import React, { useEffect, useState } from "react";
import { MdAddShoppingCart, MdRemoveShoppingCart } from "react-icons/md";
import { SERVER_URL } from "../constants";
import axios from "axios";
import { useParams } from "react-router-dom";
import { MdArrowBack, MdDescription } from "react-icons/md";
import { Link } from "react-router-dom";
import { UseCartContext } from "../hook/UseCartContext";

const DishView = () => {
    const { cartItems, addToCart, removeFromCart } = UseCartContext();
  const [dish, setDish] = useState({});
  const [isLoading, setIsLoading] = useState(true);
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
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        <Link 
          to="/" 
          className="flex items-center text-black hover:text-green-800 mb-6 transition-colors duration-200"
        >
          <MdArrowBack className="mr-2" size={20} />
          Back to Menu
        </Link>

        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="md:flex">
            {/* Dish Image */}
            <div className="md:w-1/2 p-6 flex items-center justify-center bg-gray-100">
              <img className="w-full h-96 object-cover rounded-lg shadow-md" src={`${SERVER_URL}/${dish?.image}`} alt={dish?.name}/>
            </div>

            {/* Dish Details */}
            <div className="md:w-1/2 p-8">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">{dish?.name}</h1>
              <div className="flex items-center mb-6">
                <span className="bg-[#f4f0f0] text-gray-800 text-sm font-semibold px-3 py-1 rounded-full">
                  {dish?.category}
                </span>
                <span className="ml-4 text-lg font-semibold text-green-600 flex items-center">
                  Ksh: {dish?.price}
                </span>
              </div>

              {/* Description */}
              <div className="mb-8">
                <h2 className="flex items-center text-lg font-semibold text-gray-800 mb-3">
                  <MdDescription className="mr-2 text-green-600" size={20} />
                  Description
                </h2>
                <p className="text-gray-600 leading-relaxed">{dish?.description}</p>
              </div>

              {/* Action Buttons */}
              <div className="flex space-x-4">
                <button 
                 onClick={() => isAdded ? removeFromCart(dish.id) : addToCart(dish)}
                 className={`flex-1 text-white font-medium py-3 gap-3 px-6 rounded-lg transition-colors duration-200 flex items-center justify-center ${isAdded ? 'bg-rose-100 text-rose-600' : 'bg-emerald-100 text-emerald-600'}`}>
                 {isAdded ? (
                  <>
                      Remove from cart  <MdRemoveShoppingCart size={20} />
                    </>
                  ) : (
                    <>
                      Add to cart <MdAddShoppingCart size={20} />
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DishView;