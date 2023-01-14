import React from 'react'

function Pagination({postsPerPage, totalPosts, paginate }) {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
    pageNumbers.push(i);
  }

  
  return (
   <div className='m-auto my-10'>
       <nav className='' aria-label="Page navigation example">
        <ul className="inline-flex -space-x-px">
        {pageNumbers.map(number => (
            <li key={number}>
              <a onClick={() => paginate(number)} 
                  className="px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                 {number}
              </a>
            </li>
        ))}
        </ul>
     </nav>
   </div>

  )
}

export default Pagination