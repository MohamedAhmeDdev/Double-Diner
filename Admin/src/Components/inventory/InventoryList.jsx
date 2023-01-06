import InventoryItem from "./InventoryItem";
import { Link } from "react-router-dom";
import React from "react";

const InventoryList = ({ listItems, onDelete }) => {
  return (
    <div className="flex flex-col  space-y-4">
      <div className="flex flex-row justify-end p-4">
        <Link
          to="/inventory/add"
          className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Add New
        </Link>
      </div>

      <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
          <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col"className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" > Image</th>
                  <th scope="col"className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name </th>
                  <th scope="col"className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                  <th scope="col"className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                  <th scope="col"className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Quantity </th>
                  <th scope="col"className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" >Action </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {listItems?.map((item) => (
                  <InventoryItem
                    data={item}
                    key={item.id}
                    onDelete={onDelete}
                  />
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InventoryList;
