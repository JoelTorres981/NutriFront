import React, { useState, useEffect, useRef } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const SearchBar = ({ placeholder = 'What are you craving?' }) => {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState([])
  const [loading, setLoading] = useState(false)
  const debounceRef = useRef(null)

  useEffect(() => {
    if (!query) {
      setResults([])
      return
    }

    setLoading(true)
    clearTimeout(debounceRef.current)
    debounceRef.current = setTimeout(async () => {
      try {
        // Demo: usamos TheMealDB (API pública) para búsquedas por nombre
        const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${encodeURIComponent(
          query,
        )}`
        const res = await axios.get(url)
        setResults(res.data?.meals || [])
      } catch (err) {
        console.error('Search error', err)
        setResults([])
      } finally {
        setLoading(false)
      }
    }, 450)

    return () => clearTimeout(debounceRef.current)
  }, [query])

  const navigate = useNavigate()

  return (
    <div className="max-w-3xl mx-auto">
      <div className="flex items-center bg-white rounded-full px-4 py-3 shadow-md">
        <svg className="w-6 h-6 text-gray-400 mr-3" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-4.35-4.35M10.5 18a7.5 7.5 0 100-15 7.5 7.5 0 000 15z" />
        </svg>
        <input
          className="flex-1 outline-none text-gray-700"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={placeholder}
        />
        {loading ? (
          <div className="text-sm text-gray-500">Searching...</div>
        ) : (
          <button
            onClick={() => setQuery('')}
            className="ml-3 text-sm text-gray-500 hover:text-gray-700 font-extrabold"
          >
            <span className='ml-8'/>X   
          </button>
        )}
      </div>

      <div className="mt-4 bg-white rounded-lg shadow-sm overflow-hidden">
        {results.length === 0 && query && !loading && (
          <div className="p-4 text-gray-500">No information was found about "{query}"</div>
        )}

        {results.map((item) => (
          <div
            key={item.idMeal}
            onClick={() => navigate(`/dashboard/food/${encodeURIComponent(item.strMeal)}`)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => (e.key === 'Enter' ? navigate(`/dashboard/food/${encodeURIComponent(item.strMeal)}`) : null)}
            className="block p-3 border-b last:border-b-0 hover:bg-gray-50 cursor-pointer"
          >
            <div className="flex items-center gap-4">
              <img src={item.strMealThumb} alt={item.strMeal} className="w-16 h-16 object-cover rounded-md" />
              <div>
                <div className="font-semibold">{item.strMeal}</div>
                <div className="text-sm text-gray-500">{item.strCategory} • {item.strArea}</div>
              </div>
            </div>
          </div>
        ))}

        {!query && (
          <div className="p-4 text-gray-500 text-center">Type the food to show results</div>
        )}
      </div>
    </div>
  )
}

export default SearchBar
