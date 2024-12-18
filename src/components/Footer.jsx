import React, { useState } from 'react'
import FormInput from './FormInput'
import dayjs from 'dayjs'
const Footer = ({ showContainer, toggleContainer, addCard }) => {
  const [selectedCategory, setSelectedCategory] = useState(null)
  const [category, setCategory] = useState(null)
  const handleCategoryClick = category => {
    setSelectedCategory(category)
    setCategory(category)
  }

  const handleSubmit = data => {
    const currentTime = new Date()
    const formattedTime = `${currentTime.toLocaleDateString()} ${currentTime.toLocaleTimeString()}`
    const date=dayjs(formattedTime).format('MMM DD, YYYY')
    console.log(date)
    addCard({ ...data, time: date, category })
    setSelectedCategory(null)
    setCategory(null)
    toggleContainer()
  }

  const handleClose = () => {
    setSelectedCategory(null)
  }

  return (
    <div className=" content-center  mb-1  fixed   bottom-10 text-white inset-x-0 flex justify-center">
      <button
        className=" h-[50px]  w-[50px] bg-yellow-300 rounded-full   pb-1 text-center font-bold text-black text-[2rem]"
        onClick={toggleContainer}
      >
        {showContainer ? '-' : '+'}
      </button>
      {showContainer  && (
        <div className="container  mb-4 flex justify-between rounded-full w-[80%] sm:w-[50%] items-center gap-4 sm:gap-10">
          <div
            className="text-black   cursor-pointer w-1/4 sm:w-full text-center rounded-full hover:bg-yellow-200"
            onClick={() => handleCategoryClick('Family')}
          >
            Family
          </div>
          <div
            className="text-black  cursor-pointer w-1/4 sm:w-full text-center rounded-full hover:bg-red-200"
            onClick={() => handleCategoryClick('Study')}
          >
            Study
          </div>
          <div
            className="text-black cursor-pointer w-1/4 sm:w-full text-center rounded-full hover:bg-blue-200"
            onClick={() => handleCategoryClick('Work')}
          >
            Work
          </div>
          <div
            className="text-black cursor-pointer w-1/4 sm:w-full text-center rounded-full hover:bg-purple-200"
            onClick={() => handleCategoryClick('Personal')}
          >
            Personal
          </div>
        </div>
      )}
      {selectedCategory && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-4 rounded-lg shadow-lg relative">
            <button
              className="absolute top-2 right-2 text-gray-500"
              onClick={handleClose}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
            <h2 className="text-xl mb-4">Add a note for {selectedCategory}</h2>
            <FormInput category={category} onSubmit={handleSubmit} />
          </div>
        </div>
      )}
    </div>
  )
}

export default Footer
