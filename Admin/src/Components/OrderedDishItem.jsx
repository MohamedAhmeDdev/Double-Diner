import { 
  FiPackage, FiTruck, FiCheckCircle, FiXCircle, FiClock, 
  FiMapPin, FiPhone, FiUser, FiMail, FiArrowLeft, FiShoppingBag,
  FiCreditCard, FiCalendar, FiPrinter, FiShare2, FiMoreVertical,
  FiChevronRight, FiCheck, FiAlertCircle, FiMessageSquare
} from "react-icons/fi";
import React, { useEffect, useState } from "react";
import { SERVER_URL } from "../constants";


export const OrderedDishItem = ({ dishOrderDetails, dishDetails }) => {
  const [imageError, setImageError] = useState(false);
  
  // Safely access properties with fallbacks
  const dishName = dishDetails?.name || dishOrderDetails?.dish_name || 'Unknown Dish';
  const unitPrice = dishOrderDetails?.unit_price || 0;
  const quantity = dishOrderDetails?.quantity || 0;
  const totalPrice = quantity * unitPrice;
  const imageUrl = dishDetails?.image ? `${SERVER_URL}/${dishDetails.image}` : null;
  
  return (
    <div className="flex items-center justify-between py-3.5 border-b border-slate-100 last:border-0 group hover:bg-slate-50/50 -mx-3 px-3 rounded-lg transition-all">
      <div className="flex items-center space-x-4 min-w-0 flex-1">
        <div className="flex-shrink-0 relative">
          <div className="h-14 w-14 rounded-xl overflow-hidden bg-gradient-to-br from-slate-100 to-slate-200 border border-slate-200/80 shadow-sm">
            {imageUrl ? (
              <img
                className="w-full h-full object-cover"
                src={imageUrl}
                alt={dishName}
                onError={() => setImageError(true)}
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-2xl">
                🍽️
              </div>
            )}
          </div>
          <div className="absolute -top-1 -right-1 min-w-[20px] h-5 bg-blue-600 text-white text-[10px] font-bold rounded-full flex items-center justify-center px-1.5 shadow-sm">
            {quantity}
          </div>
        </div>
        <div className="min-w-0 flex-1">
          <h4 className="text-sm font-bold text-slate-800 capitalize truncate group-hover:text-blue-600 transition-colors">
            {dishName}
          </h4>
          <p className="text-xs text-slate-400 mt-0.5 truncate flex items-center">
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-slate-300 mr-1.5"></span>
            {dishOrderDetails?.dish_name || 'Standard'}
          </p>
        </div>
      </div>
      <div className="text-right flex-shrink-0 pl-4">
        <div className="text-xs font-medium text-slate-500">
          Ksh {unitPrice.toLocaleString()} × {quantity}
        </div>
        <div className="text-sm font-bold text-slate-800 mt-0.5">
          Ksh {totalPrice.toLocaleString()}
        </div>
      </div>
    </div>
  );
};
