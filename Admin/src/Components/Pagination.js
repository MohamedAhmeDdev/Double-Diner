import React, { useState } from "react";

function Pagination({
  postsPerPage,
   totalPosts,
   paginate ,
   currentPage,
   setCurrentPage
  }){

    const [pageNumberLimit] = useState(5); //it limits the number of page to show
    const [maxPageNumberLimit, setMaxPageNumberLimit] = useState(5);//maximum number of pages 
    const [minPageNumberLimit, setMinPageNumberLimit] = useState(0);//minimum number of pages 
    const pageNumbers = [];


  for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
    pageNumbers.push(i);
  }

  let paginationTemp = pageNumbers.map(number => {
  if (number < maxPageNumberLimit + 1 && number > minPageNumberLimit) {
    return (
    <li key={number}>
      <a onClick={() => paginate(number)} 
          className={currentPage === number ? 'li mt-5 px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white bg-blue-400' : 
          'mt-5 px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white'}>
        {number}
        </a>
    </li>
      );
    } else {
      return null;
    }
    })

  const handlePrev = () => {
    setCurrentPage(currentPage - 1);

    if ((currentPage - 1) % pageNumberLimit == 0) {
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
     pageDecrementBtn = <li onClick={handlePrev}> &hellip; </li>;
  }


   let pageIncrementBtn = null;
  if (pageNumbers.length > maxPageNumberLimit) {
     pageIncrementBtn = <li onClick={handleNext}> &hellip; </li>;
  }



  
  return (
   <div className='m-auto my-10'>
       <nav className='' aria-label="Page navigation example">
        <ul className="inline-flex">
           
              <button onClick={handlePrev}  
                disabled={currentPage == pageNumbers[0] ? true : false} 
                className="btn  px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 rounded-l-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                Previous
              </button>
            
              {pageDecrementBtn}
              {paginationTemp}
              {pageIncrementBtn}
          
              <button onClick={handleNext}
                disabled={currentPage == pageNumbers[pageNumbers.length - 1] ? true : false}
                className="btn px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 rounded-r-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                Next
              </button>
        </ul>
     </nav>
   </div>

  )
}

export default Pagination