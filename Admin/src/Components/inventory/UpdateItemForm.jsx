import React, { useEffect, useState } from "react";
import { DISH_CATEGORIES } from "../../constants";
import { useParams , useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { SERVER_URL } from "../../constants";
import { apiCall } from "../../utils/apiCall";

const UpdateItemForm = ({ item }) => {
  // const { id, name, price, category, quantity, image } = item;
  const [image, setImage] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [quantity, setQuantity] = useState("");
  const { id } = useParams();

  const navigate = useNavigate();


const getInventoryById = async () => {
    const response = await axios.get(`${SERVER_URL}/dishes/${id}`);
    console.log(response);
    setName(response.data.dish.name);
    setDescription(response.data.dish.description);
    setPrice(response.data.dish.price);
    setCategory(response.data.dish.category);
    setQuantity(response.data.dish.quantity);
}

    useEffect(() => {
      getInventoryById();
    }, []);


  const updateDishes = (e) => {
      e.preventDefault();
  
      if (!name || !description || !price || !category || !image || !quantity) {
        return toast.error("Please fill all the fields");
      }
  
      const formData = new FormData();
  
      formData.append("name", name);
      formData.append("description", description);
      formData.append("price", price);
      formData.append("category", category);
      formData.append("image", image);
      formData.append("quantity", quantity);
  
      apiCall(`/dishes/${id}`, "patch", formData, {
        "Content-Type": "multipart/form-data",
      })
        .then((res) => {
          toast.success("Dish Updated successfully");
          navigate("/inventory");
        })
  
        .catch((error) => {
          toast.error("Failed to create dish");
        });
    };
  

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

            {/* image input  with preview */}
            <div>
            {/* small image preview */}
            <div className="flex flex-col items-center justify-center w-full h-full">
              <img
                className="w-8 h-8 mt-4"
                src={image ? URL.createObjectURL(image) : ""}
                alt="preview"
              />


              {/* image input*/}
              <label className="text-2xl font-bold text-gray-700">Image</label>
              <input
                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                type="file"
                onChange={(e) => setImage(e.target.files[0])}
                accept="image/*"
              />
            </div> 
          </div>



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
