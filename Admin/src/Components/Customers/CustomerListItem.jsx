import React from "react";

const CustomerListItem = ({ customer: { name, email } }) => {
  return (
    <li className="py-3 sm:py-4">
      <div className="flex items-center space-x-4">
        <div className="flex-shrink-0">
          <img
            className="w-8 h-8 rounded-full"
            src="https://cdn.pixabay.com/photo/2018/12/20/23/55/tiger-3887020_960_720.jpg"
            alt=""
          />
        </div>
        <div className="flex-1 min-w-0">
          <p
            className="text-sm font-medium text-gray-900 truncate
            capitalize"
          >
            {name}
          </p>
          <p className="text-sm text-gray-500 truncate dark:text-gray-400">
            {email}
          </p>
        </div>
        <div className="inline-flex items-center text-base font-semibold text-gray-900">
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            View
          </button>
        </div>
      </div>
    </li>
  );
};

export default CustomerListItem;
