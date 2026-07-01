import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { apiCall } from '../../utils/apiCall';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';

function UpdateCategory() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [name, setName] = useState('');

  useEffect(() => {
    fetchCategory();
  }, [id]);

  const fetchCategory = async () => {
    try {
      setIsLoading(true);
      const response = await apiCall(`/categories/${id}`, 'get');      
      const category = response.category;
      setName(category.name);
    } catch (error) {
      toast.error('Failed to load category');
      navigate('/categories');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!name.trim()) {
      return toast.error('Please enter a category name');
    }

    try {
      setIsSubmitting(true);
      await apiCall(`/categories/${id}`, 'put', {
        name: name.trim()
      });
      toast.success('Category updated successfully');
      navigate('/categories');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to update category');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white text-gray-900 antialiased p-6 md:p-12 lg:p-16 max-w-5xl mx-auto">
        <div className="w-full max-w-3xl mx-auto flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-black border-r-transparent"></div>
            <p className="mt-4 text-sm text-gray-500 font-medium">Loading category...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white text-gray-900 antialiased p-6 md:p-12 lg:p-16 max-w-5xl mx-auto">
      {/* Main Structural Frame */}
      <div className="w-full max-w-3xl mx-auto space-y-8">
        
        {/* Component Header Block */}
        <div className="">
          <h1 className="text-2xl font-bold tracking-tight text-gray-900 uppercase">
            Update Category
          </h1>
          <p className="mt-1 text-sm text-gray-500">
            Modify structural category entities, update classification metadata, and manage organizational assets inside your registry.
          </p>
        </div>

        {/* Input Form Module */}
        <div className="border border-gray-200 rounded-xl overflow-hidden shadow-sm bg-white">
          <form onSubmit={handleSubmit} className="p-6 md:p-10 space-y-6">
            
            {/* Field Section Heading */}
            <div className="border-b border-gray-100 pb-2">
              <h3 className="text-xs font-bold tracking-wider text-black uppercase">
                Category Details
              </h3>
            </div>

            {/* Category Name Input */}
            <div>
              <label htmlFor="name" className="block text-black text-xs font-bold uppercase tracking-wider mb-2">
                Category Name <span className="text-red-500">*</span>
              </label>
              <input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-white border border-gray-200 hover:border-black rounded-lg py-2.5 px-4 text-sm text-black font-medium transition-colors focus:outline-none focus:border-black focus:ring-1 focus:ring-black"
                placeholder="Ex. Appetizers, Main Course, Desserts"
              />
              <p className="mt-1 text-[11px] text-gray-400 font-medium">
                Category names should be unique
              </p>
            </div>

            {/* Action Buttons Interface Footer */}
            <div className="pt-4 flex items-center justify-end space-x-3 border-t border-gray-100">
              <Link
                to="/categories"
                className="px-4 py-2 bg-white hover:bg-gray-50 border border-gray-200 text-black text-xs font-semibold uppercase tracking-wider rounded-lg transition-colors"
              >
                Cancel
              </Link>
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
                  'Update Category'
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default UpdateCategory;