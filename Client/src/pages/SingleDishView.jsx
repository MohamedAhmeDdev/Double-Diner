import React, { useEffect, useState } from "react";

import { SERVER_URL } from "../constants";
import axios from "axios";
import { useParams } from "react-router-dom";

const DishView = () => {
  const [dish, setDish] = useState({});

  const { id } = useParams();

  useEffect(() => {
    const getDish = async () => {
      const res = await axios.get(`${SERVER_URL}/dishes/${id}`);

      if (res.status === 200) {
        setDish(res.data.dish);
      }
    };

    getDish();
  }, [id]);

  // You have access to the dish here design the UI
  console.log(dish);

  return (
    <div className="mt-32 my-10">
      <p className="text-4xl font-bold text-center">Dish View Page for <span className="text-green-500">{dish?.name}</span> </p>

      <div className='container-xxxl'>
          <div className='flex  my-5 flex flex-col m-auto'>
            
            <div className='col-md-5 col-start-6  shadow'>
              <img className="mx-auto d-block imgId my-2 img-fluid w-64" 
                src={`${SERVER_URL}/${dish?.image}`}
                alt={dish?.name}
              /> 
            </div>

            <div className="flex flex-col mb-60">
        <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
            <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">

              <table className="min-w-full divide-y divide-gray-200"> 
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">dish_id</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">category</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">description</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" >quantity</th>
                    <th scope="col"className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">price</th>
                  </tr>
                </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                      <tr>
                          <td className="px-6 py-4 whitespace-nowrap text-left">{dish.id}</td>

                          <td className="px-6 py-4 whitespace-nowrap text-left">{dish.category}</td>

                          <td className="px-6 py-4 whitespace-nowrap text-left">{dish.description}</td>

                          <td className="px-6 py-4 whitespace-nowrap text-left">{dish.quantity}</td>

                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-left">{dish.price}</td>
                      </tr>
                  </tbody>
              </table>
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
