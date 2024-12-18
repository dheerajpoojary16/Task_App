import { faSearch } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useEffect, useState, useContext, createContext } from 'react'
import './App.css'
import Pagination from './Pagination'
import Card from './components/Cards'
import Footer from './components/Footer'
import Header from './components/Header'
import toast, { Toaster } from 'react-hot-toast'

export const MyContext = createContext()

const App = () => {
  const [showContainer, setShowContainer] = useState(false)
  const [cards, setCards] = useState(() => {
    const storedCards = localStorage.getItem('cards')
    return storedCards ? JSON.parse(storedCards) : []
  })
  const [currentPage, setCurrentPage] = useState(1)
  const [searchQuery, setSearchQuery] = useState('')

  const [cardsPerPage, setCardsPerPage] = useState(() => {
    const initialCardsPerPage = window.innerWidth < 768 ? 2 : 4
    return initialCardsPerPage
  })

  useEffect(() => {
    const handleResize = () => {
      const newCardsPerPage =
        window.innerWidth < 768 ? 2 : window.innerWidth < 992 ? 4 : 8
      setCardsPerPage(newCardsPerPage)
    }

    window.addEventListener('resize', handleResize)

    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const filteredCards = cards.filter(
    card =>
      card.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      card.textContent.toLowerCase().includes(searchQuery.toLowerCase()) ||
      card.category.toLowerCase().includes(searchQuery.toLowerCase())
  )
const totalPages = Math.ceil(filteredCards.length / cardsPerPage)

const indexOfLastNote = currentPage * cardsPerPage
const indexOfFirstNote = indexOfLastNote - cardsPerPage
const currentNotes = filteredCards.slice(indexOfFirstNote, indexOfLastNote)

  const goToNextPage = () => {
    setCurrentPage(prev => Math.min(prev + 1, totalPages))
  }

  const goToPrevPage = () => {
    setCurrentPage(prevPage => Math.max(prevPage - 1, 1))
  }

  useEffect(() => {
    localStorage.setItem('cards', JSON.stringify(cards))
  }, [cards])
  useEffect(() => {
    setCurrentPage(1)
  }, [searchQuery])

  const addCard = newCard => {
    setCards([...cards, newCard])
  }
 const deleteCard = id => {
   const updatedCards = cards.filter(card => card.id !== id)
   setCards(updatedCards)
   toast.success('Deleted Successfully!')

   if (currentNotes.length === 1 && currentPage > 1) {
     setCurrentPage(prevPage => Math.max(prevPage - 1, 1)) 
   }
 }


  const toggleContainer = () => {
    setShowContainer(!showContainer)
  }

  return (
    <MyContext.Provider
      value={{ cards, setCards, searchQuery, setSearchQuery }}
    >
      <div className="h-screen w-full ">
        <Header />
        <Toaster />
        <div className="card grid mt-16 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 ">
          {currentNotes.map(card_data => (
            <Card
              key={card_data.id}
              id={card_data.id}
              title={card_data.title}
              category={card_data.category}
              textContent={card_data.textContent}
              time={card_data.time}
              goToNextPage={goToNextPage}
              goToPrevPage={goToPrevPage}
              deleteCard={deleteCard}
            />
          ))}
        </div>
        {filteredCards.length !== 0 && (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            goToPrevPage={goToPrevPage}
            goToNextPage={goToNextPage}
          />
        )}
        <Footer
          showContainer={showContainer}
          toggleContainer={toggleContainer}
          addCard={addCard}
        />
      </div>
    </MyContext.Provider>
  )
}

export default App
