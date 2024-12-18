import React from 'react'

const Pagination = ({
  currentPage,
  totalPages,
  goToPrevPage,
  goToNextPage,
}) => {
  if (totalPages <= 1) {
    return null
  }

  return (
    <div>
      <div className="pagination mb-10 gap-5 text-center text-white flex justify-center items-center">
        <button
          className="bg-gray-400 rounded-full w-24"
          onClick={goToPrevPage}
          disabled={currentPage === 1}
        >
          {`<<`}Previous
        </button>
        <span>
          {currentPage} of {totalPages}
        </span>
        <button
          className="bg-gray-400 rounded-full w-24"
          onClick={goToNextPage}
          disabled={currentPage === totalPages}
        >
          Next{`>>`}
        </button>
      </div>
    </div>
  )
}

export default Pagination
