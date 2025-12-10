import React from 'react'
import SearchBar from '../components/SearchBar'

const Listar = () => {
  return (
    <div className='items-center flex flex-col'>
      <h2 className="text-2xl font-bold mb-6">What food or product would you like to know about?</h2>
      <SearchBar />
    </div>
  )
}

export default Listar
