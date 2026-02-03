import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { FaArrowLeft, FaUtensils, FaYoutube, FaLink, FaGlobeAmericas, FaTags } from 'react-icons/fa'

const FoodDetail = () => {
  const { name } = useParams()
  const navigate = useNavigate()
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [info, setInfo] = useState(null)

  useEffect(() => {
    const fetchMealDetail = async () => {
      setLoading(true)
      setError(null)

      try {
        const url = `${import.meta.env.VITE_BACKEND_URL}/meals/detail/${name}`
        const res = await axios.get(url)
        setInfo(res.data)
      } catch (err) {
        console.error(err)
        setError('Error al cargar la información de la receta.')
      } finally {
        setLoading(false)
      }
    }

    if (name) {
      fetchMealDetail()
    }
  }, [name])

  if (loading) return (
    <div className="flex justify-center items-center min-h-[50vh]">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
    </div>
  )

  if (error) return (
    <div className="p-8 text-center">
      <p className="text-red-500 text-xl font-semibold mb-4">{error}</p>
      <button onClick={() => navigate(-1)} className="text-blue-600 hover:underline">Volver atrás</button>
    </div>
  )

  if (!info) return null

  return (
    <div className="max-w-5xl mx-auto p-4 md:p-8 bg-white rounded-2xl shadow-xl mt-4 animate-fade-in-up">
      <button
        onClick={() => navigate(-1)}
        className="flex items-center text-gray-600 hover:text-primary mb-6 transition-colors font-medium"
      >
        <FaArrowLeft className="mr-2" /> Volver
      </button>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">

        {/* Left Column: Image & Basic Info */}
        <div>
          <div className="relative rounded-2xl overflow-hidden shadow-lg mb-6 group">
            <img
              src={info.thumbnail}
              alt={info.name}
              className="w-full h-auto object-cover transform group-hover:scale-105 transition-transform duration-500"
            />
            {info.area && (
              <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-4 py-1 rounded-full text-sm font-bold text-gray-800 flex items-center shadow-sm">
                <FaGlobeAmericas className="mr-2 text-blue-500" /> {info.area}
              </div>
            )}
          </div>

          <div className="flex flex-wrap gap-2 mb-6">
            <span className="bg-orange-100 text-orange-800 px-3 py-1 rounded-full text-sm font-semibold flex items-center">
              <FaUtensils className="mr-2" /> {info.category}
            </span>
            {info.tags && info.tags.map((tag, idx) => (
              <span key={idx} className="bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-sm font-medium flex items-center">
                <FaTags className="mr-1 text-gray-400 text-xs" /> {tag}
              </span>
            ))}
          </div>

          {/* Links */}
          <div className="flex gap-4">
            {info.youtube && (
              <a href={info.youtube} target="_blank" rel="noopener noreferrer" className="flex-1 bg-red-600 hover:bg-red-700 text-white text-center py-2.5 rounded-lg font-bold transition-colors flex justify-center items-center shadow-md">
                <FaYoutube className="mr-2 text-xl" /> Ver en YouTube
              </a>
            )}
            {info.source && (
              <a href={info.source} target="_blank" rel="noopener noreferrer" className="flex-1 bg-gray-800 hover:bg-gray-900 text-white text-center py-2.5 rounded-lg font-bold transition-colors flex justify-center items-center shadow-md">
                <FaLink className="mr-2" /> Fuente Original
              </a>
            )}
          </div>
        </div>

        {/* Right Column: Ingredients & Instructions */}
        <div>
          <h1 className="text-4xl font-black text-gray-900 mb-6 leading-tight">{info.name}</h1>

          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-4 border-l-4 border-primary pl-3">Ingredientes</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {info.ingredients.map((ing, index) => (
                <div key={index} className="flex items-center p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                  <div className="w-2 h-2 rounded-full bg-secondary mr-3"></div>
                  <span className="font-semibold text-gray-700 mr-2">{ing.measure}</span>
                  <span className="text-gray-600">{ing.ingredient}</span>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-gray-800 mb-4 border-l-4 border-secondary pl-3">Instrucciones</h2>
            <div className="prose text-gray-600 leading-relaxed text-justify whitespace-pre-line">
              {info.instructions}
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}

export default FoodDetail
