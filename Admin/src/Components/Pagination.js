import React, { useState } from "react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

function Pagination({
  postsPerPage,
  totalPosts,
  paginate,
  currentPage,
  setCurrentPage
}) {
  const [pageNumberLimit] = useState(5);
  const [maxPageNumberLimit, setMaxPageNumberLimit] = useState(5);
  const [minPageNumberLimit, setMinPageNumberLimit] = useState(0);
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
    pageNumbers.push(i);
  }

  const renderPageNumbers = pageNumbers.map(number => {
    if (number < maxPageNumberLimit + 1 && number > minPageNumberLimit) {
      return (
        <button
          key={number}
          onClick={() => paginate(number)}
          className={`flex items-center justify-center w-10 h-10 mx-1 rounded-full transition-colors duration-200 ${
            currentPage === number 
              ? 'bg-indigo-600 text-white shadow-md'
              : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'
          }`}
        >
          {number}
        </button>
      );
    }
    return null;
  });

  const handlePrev = () => {
    setCurrentPage(currentPage - 1);

    if ((currentPage - 1) % pageNumberLimit === 0) {
      setMaxPageNumberLimit(maxPageNumberLimit - pageNumberLimit);
      setMinPageNumberLimit(minPageNumberLimit - pageNumberLimit);
    }
  };

  const handleNext = () => {
    setCurrentPage(currentPage + 1);

    if (currentPage + 1 > maxPageNumberLimit) {
      setMaxPageNumberLimit(maxPageNumberLimit + pageNumberLimit);
      setMinPageNumberLimit(minPageNumberLimit + pageNumberLimit);
    }
  };

  let pageDecrementBtn = null;
  if (minPageNumberLimit >= 1) {
    pageDecrementBtn = (
      <button 
        className="flex items-center justify-center w-10 h-10 mx-1 text-gray-500"
        onClick={handlePrev}
      >
        &hellip;
      </button>
    );
  }

  let pageIncrementBtn = null;
  if (pageNumbers.length > maxPageNumberLimit) {
    pageIncrementBtn = (
      <button 
        className="flex items-center justify-center w-10 h-10 mx-1 text-gray-500"
        onClick={handleNext}
      >
        &hellip;
      </button>
    );
  }

  return (
    <div className="flex items-center justify-center my-8">
      <nav className="flex items-center space-x-1">
        <button
          onClick={handlePrev}
          disabled={currentPage === pageNumbers[0]}
          className={`flex items-center justify-center w-10 h-10 rounded-full transition-colors duration-200 ${
            currentPage === pageNumbers[0]
              ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
              : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'
          }`}
        >
          <FiChevronLeft className="w-5 h-5" />
        </button>

        {pageDecrementBtn}
        {renderPageNumbers}
        {pageIncrementBtn}

        <button
          onClick={handleNext}
          disabled={currentPage === pageNumbers[pageNumbers.length - 1]}
          className={`flex items-center justify-center w-10 h-10 rounded-full transition-colors duration-200 ${
            currentPage === pageNumbers[pageNumbers.length - 1]
              ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
              : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'
          }`}
        >
          <FiChevronRight className="w-5 h-5" />
        </button>
      </nav>
    </div>
  );
}

export default Pagination;