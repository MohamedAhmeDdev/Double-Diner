import React from 'react'

function DishItem({listItem}) {

  const totalPrice = listItem.reduce((total, sales) => total + (sales.unit_price * sales.quantity), 0);
  return (
    <div className="flex flex-col">
    <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
      <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
        <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" >Dish_id</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Dish_Name</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">sales_quantity</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">single_dish_sales</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
            {listItem?.map((item, id) => (
              <tr key={id}>
                  <td className="px-6 py-4 whitespace-nowrap  text-sm text-left text-gray-500">{item.dish_id}</td> 
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-left text-gray-500">{item.metadata.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-left text-gray-500">{item.dish_id_quantity}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-left text-gray-500">
                     <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                       {item.unit_price * item.quantity}
                    </span>
                  </td>
              </tr>
                ))}
            </tbody>
            <tfoot>
               <td className="px-6 py-4 whitespace-nowrap  text-sm text-left text-gray-500 text-lg font-bold">Total Sales = {totalPrice}</td> 
            </tfoot>
          </table>
        </div>
      </div>
    </div>

   
  </div>
  )
}

export default DishItem