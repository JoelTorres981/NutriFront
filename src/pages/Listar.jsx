import React, { useState, useEffect, useRef } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { FaSearch, FaTimes, FaSpinner } from 'react-icons/fa'

const Listar = () => {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState([])
  const [loading, setLoading] = useState(false)
  const debounceRef = useRef(null)
  const navigate = useNavigate()

  useEffect(() => {
    if (!query) {
      setResults([])
      return
    }

    setLoading(true)
    clearTimeout(debounceRef.current)
    debounceRef.current = setTimeout(async () => {
      try {
        const url = `${import.meta.env.VITE_BACKEND_URL}/meals/search?name=${encodeURIComponent(query)}`
        const res = await axios.get(url)
        setResults(res.data || [])
      } catch (err) {
        console.error('Search error', err)
        setResults([])
      } finally {
        setLoading(false)
      }
    }, 450)

    return () => clearTimeout(debounceRef.current)
  }, [query])

  return (
    <div className='flex flex-col items-center p-6 w-full max-w-4xl mx-auto'>
      <h2 className="text-3xl font-black mb-8 text-gray-800 text-center">¿Qué te gustaría comer hoy?</h2>

      {/* Search Input Area */}
      <div className="w-full max-w-2xl relative mb-8">
        <div className="flex items-center bg-white rounded-full px-6 py-4 shadow-lg focus-within:ring-2 focus-within:ring-primary transition-all">
          <FaSearch className="text-gray-400 mr-4 text-xl" />
          <input
            className="flex-1 outline-none text-gray-700 text-lg"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Buscar recetas"
          />
          {loading ? (
            <FaSpinner className="animate-spin text-gray-400" />
          ) : (
            query && (
              <button
                onClick={() => setQuery('')}
                className="ml-3 text-gray-400 hover:text-gray-600 transition-colors"
              >
                <FaTimes />
              </button>
            )
          )}
        </div>
      </div>

      {/* Results Area */}
      <div className="w-full">
        {results.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 animate-fadeIn">
            {results.map((item) => (
              <div
                key={item.id}
                onClick={() => navigate(`/dashboard/food/${item.id}`)}
                className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow cursor-pointer group"
              >
                <div className="relative overflow-hidden h-48 bg-gray-200">
                  <img
                    src={item.thumbnail}
                    alt={item.name}
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = 'https://via.placeholder.com/400x300?text=No+Image';
                    }}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-5">
                  <h3 className="font-bold text-lg text-gray-800 mb-1 truncate" title={item.name}>{item.name}</h3>
                  <p className="text-sm text-gray-500 font-medium">{item.category} • {item.area}</p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          query && !loading && (
            <div className="text-center text-gray-500 mt-8 text-lg">
              No se encontraron resultados para "{query}".
            </div>
          )
        )}

        {!query && (
          <div className="text-center text-gray-400 mt-12">
            <p className="text-lg">Escribe el nombre de un ingrediente o platillo para comenzar.</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default Listar
