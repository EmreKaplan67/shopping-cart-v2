import React, { useRef } from "react"
import { useProductStore } from "../store/useProductStore"

const SearchBar = () => {

  console.log('SearchBar rendered')

  const inputRef = useRef()
  const setSearchTerm = useProductStore((state) => state.setSearchTerm)

  const handleSubmit = (e) => {
    e.preventDefault()
    setSearchTerm(inputRef.current.value.trim())
    inputRef.current.focus()
  }

  return (
    <form onSubmit={handleSubmit} className="flex gap-2 w-full max-w-2xl">
      <input
        ref={inputRef}  
        type="text"
        placeholder="Search products..."
        className="flex-1 px-3 md:px-4 py-2 text-sm md:text-base border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
      />
      <button 
        type="submit"
        className="px-4 md:px-6 py-2 bg-blue-600 text-white text-sm md:text-base font-medium rounded-lg hover:bg-blue-700 active:bg-blue-800 transition-colors shadow-sm whitespace-nowrap"
      >
        Search
      </button>
    </form>
  )
}

export default React.memo(SearchBar);
