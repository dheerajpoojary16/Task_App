import { faSearch } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useContext } from 'react'
import { MyContext } from '../App'

const Header = () => {
  const { searchQuery, setSearchQuery } = useContext(MyContext)

  const handleSearchChange = e => {
    setSearchQuery(e.target.value)
  }

  return (
    <header className="header font-bold h-[5em] p-5 flex flex-col justify-end gap-4 text-4xl">
      <div className="logo-container ">
        <span className="logo-text">SnapThoughts</span>
      </div>
      <div className="search-container relative border-1 border-black border w-fit bg-white rounded-full ">
        <div className="search-box text-black flex justify-center items-center">
          <FontAwesomeIcon
            icon={faSearch}
            className="search-icon relative text-[1.5rem] p-0.5 "
          />
          <input
            type="text"
            placeholder="Search notes..."
            className="search-input bg-transparent text-black "
            onChange={handleSearchChange}
          />
        </div>
      </div>
    </header>
  )
}

export default Header
