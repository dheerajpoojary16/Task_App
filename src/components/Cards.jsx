// Cards.jsx
import React from 'react'
import { FaTrash } from 'react-icons/fa'

const Card = ({ title, category, textContent, time, id, deleteCard }) => {
  return (
    <div
      className="bg-white  w-[90%] max-w-md mx-auto rounded-2xl shadow-lg p-6  mb-6 transform transition duration-500 hover:scale-105 hover:shadow-2xl"
    >
      <div className="flex p-1 justify-between items-center mb-4">
        <h2 className="text-2xl font-bold text-gray-600">
          {title || 'NoTitle'}
        </h2>
        <span className="text-sm font-semibold text-gray-700 bg-gray-200 rounded-full px-3 py-1">
          {category}
        </span>
        <button onClick={()=>deleteCard(id)}>
          <FaTrash />
        </button>
      </div>
      <p className="text-gray-800 mb-6">{textContent}</p>

      <div className="flex justify-end">
        <p className="text-sm text-gray-500">{time}</p>
      </div>
    </div>
  )
}

export default Card
