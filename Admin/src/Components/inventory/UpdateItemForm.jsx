import React, { useEffect, useState } from "react";
import { DISH_CATEGORIES } from "../../constants";
import { useParams , useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { SERVER_URL } from "../../constants";
import { apiCall } from "../../utils/apiCall";

const UpdateItemForm = ({ item }) => {
  // const { id, name, price, category, quantity, image } = item;
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [quantity, setQuantity] = useState("");
  const { id } = useParams();

  const navigate = useNavigate();


const getInventoryById = async () => {
 
    const response = await axios.get(`${SERVER_URL}/dishes/${id}`);
    // console.log(response);
    setName(response.data.name);
    console.log(name);
    setDescription(response.data.description);
    setPrice(response.data.price);
    setCategory(response.data.category);
    setQuantity(response.data.quantity);
}

    useEffect(() => {
      getInventoryById();
    }, []);


    const updateDishes = (e) => {
      e.preventDefault();
      try {
        apiCall(`dishes/${id}`, "PATCH", { 
          name: name,
          description: description,
          price: price,
          category: category,
          quantity: quantity,
        })
       
        .catch((err) => {
          toast.error(err);
        });
  } catch (error) {
      if (error.response?.status === 400) {
        console.log(error);
        return toast.error("Id or name or description or price  or category or quantity is missing"); //send errors if email exist in database
      }
    }
  }
    
  

  return (     
      <div className="flex flex-col items-center justify-center w-full h-full">
      {/* name input*/}
      <form className="w-full max-w-xl border-slate-200 shadow-lg rounded-sm py-2 px-3">
        <div className="flex flex-col items-center justify-center w-full h-full">
          <label className="text-2xl font-bold text-gray-700">Name</label>
          <input
            className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          {/* description input*/}
          <label className="text-2xl font-bold text-gray-700">
            Description
          </label>
          <textarea
            className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={6}
            cols={50}
          />

          {/* price input*/}
          <label className="text-2xl font-bold text-gray-700">Price</label>
          <input
            className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />

          {/* category input*/}
          <label className="text-2xl font-bold text-gray-700">Category</label>
          <select
            className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="" />
            {DISH_CATEGORIES.map((category) => (
              <option key={category.id} value={category.value}>
                {category.name}
              </option>
            ))}
          </select>


          {/* quantity input*/}
          <label className="text-2xl font-bold text-gray-700">Quantity</label>
          <input
            className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
            type="number"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
          />

          {/* submit button*/}
          <button className="w-1/2 h-10 mt-4 text-white bg-blue-500 rounded-md hover:bg-blue-600" onClick={updateDishes} >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default UpdateItemForm;
