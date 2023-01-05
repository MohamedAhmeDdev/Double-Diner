import { Link } from "react-router-dom";
import React from "react";
import { SERVER_URL } from "../../constants";

const InventoryItem = ({ data, onDelete }) => {
  return (
    <tr>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="flex items-center">
          <div className="flex-shrink-0 h-10 w-10">
            <img
              className="h-10 w-10 rounded-full"
              src={`${SERVER_URL}/${data.image}`}
              alt=""
            />
          </div>
        </div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-left">
        <div className="text-sm text-gray-900">{data.name}</div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-left">
        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
          {data.price}
        </span>
      </td>
      <td className="px-6 py-4 whitespace-nowrap  text-sm text-left text-gray-500">
        {data.category}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-left text-gray-500">
        {data.quantity}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-right text-sm  font-medium">
        {/** edit link an delete button in flex */}
        <div className="flex flex-row space-x-4">
          <Link
            to={`/inventory/update/${data.id}`}
            className="text-indigo-600 hover:text-indigo-900"
          >
            Edit
          </Link>
          <button
            type="button"
            className="text-indigo-600 hover:text-indigo-900"
            onClick={() => onDelete(data.id)}
          >
            Delete
          </button>
        </div>
      </td>
    </tr>
  );
};

export default InventoryItem;
