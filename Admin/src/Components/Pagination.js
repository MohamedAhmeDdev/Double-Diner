// components/Pagination.jsx
import React from 'react';

const Pagination = ({ 
  currentPage, 
  totalItems, 
  itemsPerPage, 
  onPageChange 
}) => {
  const pageNumbers = [];
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  if (totalPages <= 1) return null;

  return (
    <nav className="flex items-center justify-between w-full font-mono text-xs">
      <div className="flex-1 sm:flex items-center justify-end">
        <div>
          <nav 
            className="relative z-0 inline-flex rounded border border-neutral-200 -space-x-px overflow-hidden shadow-sm" 
            aria-label="Pagination"
          >
            <button
              onClick={() => onPageChange(Math.max(currentPage - 1, 1))}
              disabled={currentPage === 1}
              className={`relative inline-flex items-center px-3 py-2 bg-white text-sm ${
                currentPage === 1 ? 'text-neutral-300 cursor-not-allowed' : 'text-black hover:bg-neutral-50'
              }`}
            >
              <span className="sr-only">Previous</span>
              <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
            </button>

            {pageNumbers.map(number => (
              <button
                key={number}
                onClick={() => onPageChange(number)}
                className={`relative inline-flex items-center px-3.5 py-2 font-bold transition-colors ${
                  currentPage === number
                    ? 'bg-black text-white border-black'
                    : 'bg-white text-neutral-500 hover:bg-neutral-50 border-neutral-100 border-r'
                }`}
              >
                {number}
              </button>
            ))}

            <button
              onClick={() => onPageChange(Math.min(currentPage + 1, totalPages))}
              disabled={currentPage === totalPages}
              className={`relative inline-flex items-center px-3 py-2 bg-white text-sm ${
                currentPage === totalPages ? 'text-neutral-300 cursor-not-allowed' : 'text-black hover:bg-neutral-50'
              }`}
            >
              <span className="sr-only">Next</span>
              <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
              </svg>
            </button>
          </nav>
        </div>
      </div>
    </nav>
  );
};

export default Pagination;