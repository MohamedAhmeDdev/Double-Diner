import OrderItem from "./OrderItem";
import React from "react";
import Pagination from "../Pagination";

const OrderList = ({ 
   orders ,
   postsPerPage, 
   totalPosts,
   paginate,
   currentPage,
   setCurrentPage  
  }) => {
  //tailwindcss classes


  return (
    <div className="flex flex-col">
      <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
          <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order ID</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order Status </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order Date</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" >Total Price </th>
                  <th scope="col"className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"> Delivery Address </th>
                  <th scope="col"className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" >Delivery Phone</th>
                  <th scope="col" className="relative px-6 py-3"><span className="sr-only">View</span></th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {orders?.map((order) => (
                  <OrderItem key={order.order_id} order={order} />
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <Pagination
       postsPerPage={postsPerPage}
       totalPosts={totalPosts}
       paginate={paginate}
       currentPage={currentPage}
       setCurrentPage={setCurrentPage}
      />
    </div>
  );
};

export default OrderList;
