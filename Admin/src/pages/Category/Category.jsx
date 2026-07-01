import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { apiCall } from '../../utils/apiCall';
import { toast } from 'react-toastify';
import Pagination from "../../Components/Pagination";

function Category() {
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isDeleting, setIsDeleting] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = categories.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = pageNumber => setCurrentPage(pageNumber);

  const fetchCategories = async () => {
    try {
      setIsLoading(true);
      const response = await apiCall('/categories', 'get');
      setCategories(response.categories);
    } catch (error) {
      toast.error('Failed to load categories');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleDelete = async (id) => {
    try {
      setIsDeleting(true);
      await apiCall(`/categories/${id}`, 'delete');
      toast.success('Category deleted successfully');
      fetchCategories();
    } catch (error) {
      toast.error('Failed to delete category');
    } finally {
      setIsDeleting(false);
    }
  };

  // Enhanced Skeleton loader with more realistic placeholder shapes
  const SkeletonRow = () => (
    <tr className="animate-pulse">
      <td className="px-6 py-4">
        <div className="h-4 bg-gray-200 rounded w-16"></div>
      </td>
      <td className="px-6 py-4 text-right">
        <div className="h-4 bg-gray-200 rounded w-32 ml-auto"></div>
      </td>
      <td className="px-6 py-4 text-right">
        <div className="flex justify-end space-x-2">
          <div className="h-9 w-20 bg-gray-200 rounded-lg"></div>
          <div className="h-9 w-20 bg-gray-200 rounded-lg"></div>
        </div>
      </td>
    </tr>
  );

  return (
    <div className="min-h-screen bg-white text-gray-900 antialiased p-6 md:p-12 lg:p-16 mx-auto">
      {/* Main Content Layout Panel */}
      <div className="w-full mx-auto space-y-6">
        
        {/* Component Title and Creation Trigger Actions */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-gray-200 pb-6">
          <div>
            <h1 className="text-md md:text-2xl font-bold tracking-tight text-gray-900 uppercase">
              Category Management
            </h1>
            <p className="mt-1 text-sm text-gray-500">
              Complete baseline index of global category entities, operational states, and structural item lists.
            </p>
          </div>
          <Link
            to="/categories/create"
            className="inline-flex justify-center items-center px-4 py-2.5 bg-black hover:bg-neutral-800 text-white text-xs font-semibold uppercase tracking-wider rounded-lg shadow-sm transition-all"
          >
            <svg className="-ml-1 mr-2 h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
            </svg>
            Add New Category
          </Link>
        </div>

        {/* Category Viewport Table */}
        <div className="border border-gray-200 rounded-xl overflow-x-auto shadow-sm bg-white">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-4 text-left text-xs font-bold text-black uppercase tracking-wider">ID</th>
                  <th scope="col" className="px-6 py-4 text-right text-xs font-bold text-black uppercase tracking-wider">Category Name</th>
                  <th scope="col" className="px-6 py-4 text-right text-xs font-bold text-black uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {isLoading ? (
                  // Show skeleton rows matching itemsPerPage
                  Array.from({ length: itemsPerPage }).map((_, idx) => <SkeletonRow key={`skeleton-${idx}`} />)
                ) : (
                  currentItems?.map((category) => (
                    <tr key={category.category_id || category.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-semibold text-gray-900 uppercase tracking-tight">
                          #{category.category_id || category.id}
                        </div>
                      </td>
                      <td className="px-6 py-4 text-right whitespace-nowrap">
                        <div className="text-sm font-semibold text-gray-900 uppercase tracking-tight">
                          {category.name}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <div className="flex justify-end space-x-2">
                          <Link 
                            to={`/categories/update/${category.category_id || category.id}`} 
                            className="text-black hover:text-white p-2 border border-gray-200 hover:border-black hover:bg-black rounded-lg transition-all inline-flex items-center"
                          >
                            <svg className="w-3.5 h-3.5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                            </svg>
                            <span className="text-xs font-bold uppercase tracking-wide">Edit</span>
                          </Link>
                          <button 
                            type="button" 
                            className="text-red-600 hover:text-white p-2 border border-gray-200 hover:border-red-600 hover:bg-red-600 rounded-lg transition-all inline-flex items-center" 
                            onClick={() => handleDelete(category.category_id || category.id)}
                            disabled={isDeleting}
                          >
                            <svg className="w-3.5 h-3.5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                            <span className="text-xs font-bold uppercase tracking-wide">Delete</span>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
          
          {/* Empty Table Fallback Grid */}
          {!isLoading && categories?.length === 0 && (
            <div className="text-center py-20 bg-white">
              <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
              </svg>
              <h3 className="mt-4 text-sm font-semibold text-gray-900 uppercase tracking-wide">No categories logs located</h3>
              <p className="mt-1 text-xs text-gray-400 max-w-xs mx-auto">
                No category assets are registered within active category tracking indices currently.
              </p>
              <div className="mt-6">
                <Link
                  to="/categories/create"
                  className="inline-flex justify-center items-center px-4 py-2 bg-black hover:bg-neutral-800 text-white text-xs font-semibold uppercase tracking-wider rounded-lg shadow-sm transition-all"
                >
                  <svg className="-ml-1 mr-2 h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
                  </svg>
                  New Category
                </Link>
              </div>
            </div>
          )}

          {/* Pagination Controls */}
          {!isLoading && categories?.length > 0 && (
            <div className="px-6 py-4 border-t border-gray-200 bg-gray-50/30">
              <Pagination
                currentPage={currentPage}
                totalItems={categories.length}
                itemsPerPage={itemsPerPage}
                onPageChange={paginate}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Category;