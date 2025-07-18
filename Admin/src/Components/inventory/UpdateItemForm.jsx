import React, { useEffect, useState } from "react";
import { DISH_CATEGORIES } from "../../constants";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { SERVER_URL } from "../../constants";
import { apiCall } from "../../utils/apiCall";
import { Link } from "react-router-dom";
import { RiDashboardLine } from "react-icons/ri";
import { MdOutlineInventory } from "react-icons/md";

const UpdateItemForm = () => {
  const [image, setImage] = useState(null);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [quantity, setQuantity] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [currentImage, setCurrentImage] = useState("");
  const { id } = useParams();
  const navigate = useNavigate();

  const getInventoryById = async () => {
    try {
      const response = await apiCall(`/dishes/${id}`, "GET");
      const { dish } = response;
      setName(dish.name);
      setDescription(dish.description);
      setPrice(dish.price);
      setCategory(dish.category);
      setQuantity(dish.quantity);
      setCurrentImage(dish.image);
    } catch (error) {
      toast.error("Failed to fetch item details");
    }
  };

  useEffect(() => {
    getInventoryById();
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    if (!name || !description || !price || !category || !quantity) {
      setIsSubmitting(false);
      return toast.error("Please fill all the fields");
    }

    if (description.length >= 65) {
      setIsSubmitting(false);
      return toast.error("Description should be less than 65 characters");
    }

    const formData = new FormData();
    formData.append("name", name);
    formData.append("description", description);
    formData.append("price", price);
    formData.append("category", category);
    if (image) {
      formData.append("image", image);
    }
    formData.append("quantity", quantity);

    apiCall(`/dishes/${id}`, "PATCH", formData, {
      "Content-Type": "multipart/form-data",
    })
      .then((res) => {
        toast.success("Item updated successfully");
        navigate("/inventory");
      })
      .catch((error) => {
        toast.error("Failed to update item");
      })
      .finally(() => {
        setIsSubmitting(false);
      });
  };

  return (
    <div className="flex flex-col">
      <nav className="flex h-16 items-center mb-3 pl-4 lg:pl-6 border-b border-gray-100 bg-white" aria-label="Breadcrumb">
                <ol className="flex items-center space-x-2">
                  <li className="flex items-center">
                    <Link 
                      to="/" 
                      className="group flex items-center transition-all duration-200 hover:-translate-x-0.5"
                    >
                      <div className="p-1.5 rounded-lg bg-indigo-50 group-hover:bg-indigo-100 mr-2 transition-colors duration-200 shadow-sm">
                        <RiDashboardLine className="text-indigo-600 group-hover:text-indigo-700" size={16} />
                      </div>
                      <span className="text-sm font-medium text-indigo-600 group-hover:text-indigo-800 transition-colors duration-200">
                        Dashboard
                      </span>
                    </Link>
                  </li>
                  <li className="flex items-center">
                    <svg
                      className="h-4 w-4 text-gray-300 mx-1"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      aria-hidden="true"
                    >
                      <path
                        fillRule="evenodd"
                        d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span className="text-sm font-medium text-gray-600 ml-1 flex items-center">
                      <MdOutlineInventory className="mr-1.5 text-orange-500" size={16} />
                      Inventory
                    </span>
                  </li>
                </ol>
      </nav>
      
      <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-extrabold text-gray-900">Update Inventory Item</h2>
            <p className="mt-2 text-sm text-gray-600">
              Modify the details below to update this inventory item
            </p>
          </div>

          <div className="bg-white shadow-xl rounded-lg overflow-hidden">
            <form onSubmit={handleSubmit} className="p-8 space-y-6">
              {/* Name */}
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                  Item Name <span className="text-red-500">*</span>
                </label>
                <input
                  id="name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-200 outline-none"
                  placeholder="Enter item name"
                />
              </div>

              {/* Description */}
              <div>
                <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                  Description <span className="text-red-500">*</span>
                  <span className="text-xs text-gray-500 ml-2">(max 65 characters)</span>
                </label>
                <textarea
                  id="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows={4}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-200 outline-none"
                  placeholder="Enter a brief description"
                />
                <p className="mt-1 text-xs text-gray-500 text-right">
                  {description.length}/65 characters
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Price */}
                <div>
                  <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-1">
                    Price <span className="text-red-500">*</span>
                  </label>
                  <div className="relative rounded-md shadow-sm">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <span className="text-gray-500 sm:text-sm">$</span>
                    </div>
                    <input
                      id="price"
                      type="number"
                      value={price}
                      onChange={(e) => setPrice(e.target.value)}
                      className="block w-full pl-7 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-200 outline-none"
                      placeholder="0.00"
                      step="0.01"
                      min="0"
                    />
                  </div>
                </div>

                {/* Quantity */}
                <div>
                  <label htmlFor="quantity" className="block text-sm font-medium text-gray-700 mb-1">
                    Quantity <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="quantity"
                    type="number"
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-200 outline-none"
                    placeholder="Enter quantity"
                    min="0"
                  />
                </div>
              </div>

              {/* Category */}
              <div>
                <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
                  Category <span className="text-red-500">*</span>
                </label>
                <select
                  id="category"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-200 appearance-none bg-white outline-none"
                >
                  <option value="">Select a category</option>
                  {DISH_CATEGORIES.map((cat) => (
                    <option key={cat.id} value={cat.value}>
                      {cat.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Image Upload */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Image
                </label>
                <div className="mt-1 flex items-center space-x-4">
                  {/* Current Image Preview */}
                  <div className="relative">
                    <img
                      src={image ? URL.createObjectURL(image) : `${SERVER_URL}/${currentImage}`}
                      alt="Current"
                      className="h-32 w-32 object-cover rounded-lg border-2 border-gray-300"
                    />
                    {image && (
                      <button
                        type="button"
                        onClick={() => setImage(null)}
                        className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                      >
                        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    )}
                  </div>

                  {/* Image Upload Button */}
                  <div className="flex items-center justify-center w-full">
                    <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 transition duration-200">
                      <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        <svg className="w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                        </svg>
                        <p className="mb-2 text-sm text-gray-500">
                          <span className="font-semibold">Click to upload</span> or drag and drop
                        </p>
                        <p className="text-xs text-gray-500">PNG, JPG, JPEG (Max. 5MB)</p>
                      </div>
                      <input
                        id="image"
                        type="file"
                        className="hidden"
                        onChange={(e) => setImage(e.target.files[0])}
                        accept="image/*"
                      />
                    </label>
                  </div>
                </div>
                {currentImage && !image && (
                  <p className="mt-1 text-xs text-gray-500">Current image will be kept if no new image is uploaded</p>
                )}
              </div>

              {/* Submit Button */}
              <div className="pt-4 flex space-x-4">
                <button
                  type="button"
                  onClick={() => navigate("/inventory")}
                  className="w-1/2 flex justify-center py-3 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-200"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-1/2 flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-200 ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}`}
                >
                  {isSubmitting ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Updating...
                    </>
                  ) : (
                    'Update Inventory'
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateItemForm;