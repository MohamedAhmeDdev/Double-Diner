import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";
import { RiDashboardLine } from "react-icons/ri";
import { MdOutlineInventory } from "react-icons/md";
import { apiCall } from "../../utils/apiCall";
import { DISH_CATEGORIES, SERVER_URL } from "../../constants";

const UpdateInventory = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // Form state
  const [image, setImage] = useState(null);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [quantity, setQuantity] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [currentImage, setCurrentImage] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  // Fetch inventory item by ID
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
      console.error("Fetch error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getInventoryById();
  }, [id]);

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Validation
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
        console.error("Update error:", error);
      })
      .finally(() => {
        setIsSubmitting(false);
      });
  };

  // Modern Mono Loading State Component
  if (isLoading) {
    return (
      <div className="min-h-screen bg-white text-gray-900 antialiased p-6 md:p-12 lg:p-16 max-w-5xl mx-auto flex flex-col justify-center items-center space-y-4">
        <div className="relative w-12 h-12">
          <div className="absolute inset-0 rounded-full border-2 border-gray-100"></div>
          <div className="absolute inset-0 rounded-full border-2 border-black border-t-transparent animate-spin"></div>
        </div>
        <p className="text-xs font-bold uppercase tracking-widest text-gray-400 font-mono">Synchronizing Data...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white text-gray-900 antialiased p-6 md:p-12 lg:p-16 max-w-5xl mx-auto">

      {/* Main Container Wrapper */}
      <div className="w-full max-w-3xl mx-auto space-y-8">
        
        {/* Component Header Metadata Block */}
        <div className="">
          <h1 className="text-2xl font-bold tracking-tight text-gray-900 uppercase">
            Update Inventory Item
          </h1>
          <p className="mt-1 text-sm text-gray-500">
            Amend system parameters, change valuation structures, or replace linked visual digital media objects.
          </p>
        </div>

        {/* Form Module Box Frame */}
        <div className="border border-gray-200 rounded-xl overflow-hidden shadow-sm bg-white">
          <form onSubmit={handleSubmit} className="p-6 md:p-10 space-y-6">
            
            {/* Field Section Heading */}
            <div className="border-b border-gray-100 pb-2">
              <h3 className="text-xs font-bold tracking-wider text-black uppercase">
                Registry Specifications
              </h3>
            </div>

            {/* Name Form Field */}
            <div>
              <label htmlFor="name" className="block text-black text-xs font-bold uppercase tracking-wider mb-2">
                Item Name <span className="text-red-500">*</span>
              </label>
              <input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-white border border-gray-200 hover:border-black rounded-lg py-2.5 px-4 text-sm text-black font-medium transition-colors focus:outline-none focus:border-black focus:ring-1 focus:ring-black"
                placeholder="Ex. Classic Double Espresso"
              />
            </div>

            {/* Description Textarea Field */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <label htmlFor="description" className="block text-black text-xs font-bold uppercase tracking-wider">
                  Description <span className="text-red-500">*</span>
                </label>
                <span className="text-[10px] text-gray-400 font-mono">
                  {description.length}/65 MAX
                </span>
              </div>
              <textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={3}
                className="w-full bg-white border border-gray-200 hover:border-black rounded-lg py-2.5 px-4 text-sm text-black font-medium transition-colors focus:outline-none focus:border-black focus:ring-1 focus:ring-black"
                placeholder="Enter item details..."
              />
            </div>

            {/* Price and Stock Row Grouping */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Price Numeric Input field */}
              <div>
                <label htmlFor="price" className="block text-black text-xs font-bold uppercase tracking-wider mb-2">
                  Price Value <span className="text-red-500">*</span>
                </label>
                <div className="relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <span className="text-gray-400 text-sm font-semibold font-mono">$</span>
                  </div>
                  <input
                    id="price"
                    type="number"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    className="block w-full bg-white border border-gray-200 hover:border-black rounded-lg py-2.5 pl-8 pr-4 text-sm font-semibold text-black tracking-tight focus:outline-none focus:border-black focus:ring-1 focus:ring-black"
                    placeholder="0.00"
                    step="0.01"
                    min="0"
                  />
                </div>
              </div>

              {/* Stock Volume Input field */}
              <div>
                <label htmlFor="quantity" className="block text-black text-xs font-bold uppercase tracking-wider mb-2">
                  Stock Volume <span className="text-red-500">*</span>
                </label>
                <input
                  id="quantity"
                  type="number"
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                  className="w-full bg-white border border-gray-200 hover:border-black rounded-lg py-2.5 px-4 text-sm font-semibold text-black tracking-tight focus:outline-none focus:border-black focus:ring-1 focus:ring-black"
                  placeholder="0"
                  min="0"
                />
              </div>
            </div>

            {/* Custom Minimalist Selection Dropdown */}
            <div>
              <label htmlFor="category" className="block text-black text-xs font-bold uppercase tracking-wider mb-2">
                Classification Category <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <select
                  id="category"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full bg-white border border-gray-200 hover:border-black rounded-lg py-2.5 px-4 text-sm font-semibold text-black uppercase tracking-wide appearance-none focus:outline-none focus:border-black focus:ring-1 focus:ring-black"
                >
                  <option value="" className="text-gray-400">Select standard category type</option>
                  {DISH_CATEGORIES.map((cat) => (
                    <option key={cat.id} value={cat.value}>
                      {cat.name}
                    </option>
                  ))}
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-black">
                  <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                    <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/>
                  </svg>
                </div>
              </div>
            </div>

            {/* Flexible Split-Side Upload Box & Existing Graphic Mirror */}
            <div>
              <label className="block text-black text-xs font-bold uppercase tracking-wider mb-2">
                Asset Graphic Media
              </label>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
                
                {/* Visual Frame Block for Active Target Image */}
                <div className="relative flex items-center justify-center border border-gray-200 p-2 rounded-lg bg-white h-32 w-32 mx-auto md:mx-0">
                  <img
                    src={image ? URL.createObjectURL(image) : `${SERVER_URL}/${currentImage}`}
                    alt="Current Asset state preview"
                    className="h-full w-full object-cover rounded-md"
                  />
                  {image && (
                    <button
                      type="button"
                      onClick={() => setImage(null)}
                      className="absolute -top-2 -right-2 bg-black text-white hover:bg-neutral-800 rounded-full p-1 border border-white transition-colors focus:outline-none"
                    >
                      <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3.5} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  )}
                </div>

                {/* Dropzone Alternative Selector Input */}
                <div className="md:col-span-2">
                  <label className="flex flex-col items-center justify-center w-full h-32 border border-dashed border-gray-300 rounded-lg cursor-pointer bg-gray-50 hover:bg-neutral-50 hover:border-black transition-colors">
                    <div className="flex flex-col items-center justify-center text-center px-4">
                      <svg className="w-5 h-5 text-gray-400 mb-1.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                      </svg>
                      <p className="text-xs text-black font-semibold uppercase tracking-wider mb-0.5">
                        Replace File Image
                      </p>
                      <p className="text-[10px] text-gray-400 font-medium font-mono">PNG, JPG up to 5MB dimension allocation</p>
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
                <p className="mt-2 text-[11px] text-gray-400 font-medium tracking-wide">
                  * Note: The current image variant persists if no replacement upload sequence triggers.
                </p>
              )}
            </div>

            {/* Footer Form Submission Array Section */}
            <div className="pt-4 flex items-center justify-end space-x-3 border-t border-gray-100">
              <button
                type="button"
                onClick={() => navigate("/inventory")}
                className="px-4 py-2 bg-white hover:bg-gray-50 border border-gray-200 text-black text-xs font-semibold uppercase tracking-wider rounded-lg transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className={`min-w-[140px] flex justify-center items-center px-4 py-2.5 bg-black hover:bg-neutral-800 text-white text-xs font-semibold uppercase tracking-wider rounded-lg shadow-sm transition-all ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                {isSubmitting ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Updating
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
  );
};

export default UpdateInventory;