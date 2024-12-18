import React from 'react'
import { nanoid } from 'nanoid'

const FormInput = ({ onSubmit, onClose, category }) => {
  const [formData, setFormData] = React.useState({
    title: '',
    textContent: '',
  })

  const handleChange = e => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  const handleSubmit = e => {
    e.preventDefault()
    const noteWithId = { ...formData, id: nanoid() } 
    onSubmit(noteWithId)
    setFormData({ title: '', textContent: '' })
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white w-full max-w-md rounded-2xl shadow-lg p-2 mb-2 transform transition duration-500 hover:scale-105 hover:shadow-2xl relative backdrop:blur "
    >
      <button
        type="button"
        className="absolute top-2 right-2 text-gray-500"
        onClick={onClose}
      >
      </button>
      <div className="flex flex-col mb-4">
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          placeholder="Title"
          style={{border:`1px solid black, `}}
          className="text-2xl font-bold text-gray-900 flex-grow outline-none mb-2 rounded-full text-center"
        />
      </div>
      <p className="text-black justify-end flex items-end ml-56 pr-7 font-bold rounded-full bg-gray-300">
        {category}
      </p>
      <textarea
        name="textContent"
        value={formData.textContent}
        onChange={handleChange}
        placeholder="Enter your note here"
        className="text-gray-800 mb-6 w-full h-24 resize-none outline-none"
        required
        title="You can not save empty note"
      />
      <div className="flex justify-end">
        <button type="submit" className="text-sm text-gray-500 mr-2">
          Submit
        </button>
      </div>
    </form>
  )
}

export default FormInput
