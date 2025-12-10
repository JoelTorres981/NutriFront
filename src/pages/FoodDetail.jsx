import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'

const FoodDetail = () => {
  const { name } = useParams()
  const decodedName = decodeURIComponent(name || '')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [info, setInfo] = useState(null)

  useEffect(() => {
    const fetchFromSpoonacular = async () => {
      setLoading(true)
      setError(null)

      const apiKey = import.meta.env.VITE_SPOONACULAR_KEY
      if (!apiKey) {
        setError('Dont find the API key from Spoonacular.')
        setLoading(false)
        return
      }

      try {
        // 1) Buscar receta por nombre
        const searchUrl = `https://api.spoonacular.com/recipes/complexSearch?query=${encodeURIComponent(decodedName)}&number=1&apiKey=${apiKey}`
        const searchRes = await axios.get(searchUrl)
        const result = searchRes.data?.results?.[0]
        if (!result) {
          setError('No results found on Spoonacular for: ' + decodedName)
          setLoading(false)
          return
        }

        // 2) Obtener información detallada (incluyendo nutrición)
        const infoUrl = `https://api.spoonacular.com/recipes/${result.id}/information?includeNutrition=true&apiKey=${apiKey}`
        const infoRes = await axios.get(infoUrl)
        setInfo(infoRes.data)
      } catch (err) {
        console.error(err)
        const status = err.response?.status
        const serverMsg = err.response?.data?.message || err.response?.data?.status || err.response?.data || err.message
        if (status === 401) {
          setError('401 Unauthorized: Please verify your Spoonacular API key.')
        } else {
          setError(`Error fetching from Spoonacular${status ? ` (status ${status})` : ''}: ${serverMsg}`)
        }
      } finally {
        setLoading(false)
      }
    }

    fetchFromSpoonacular()
  }, [decodedName])

  if (loading) return <div className="p-4">Loading information...</div>
  if (error) return <div className="p-4 text-red-600">{error}</div>

  // helper to get nutrient value
  const nutrientValue = (names) => {
    const nutrients = info?.nutrition?.nutrients || []
    const n = nutrients.find((x) => names.some((s) => x.name?.toLowerCase().includes(s)))
    if (!n) return null
    const amount = Math.round((n.amount || 0) * 10) / 10
    return { label: n.name, value: amount, unit: n.unit }
  }

  const calories = nutrientValue(['calories', 'energy'])
  const protein = nutrientValue(['protein'])
  const fat = nutrientValue(['fat'])
  const carbs = nutrientValue(['carbohydrates', 'carb'])

  return (
    <div className="p-4 bg-white rounded-lg shadow-sm">
      <div className="flex flex-col md:flex-row gap-6">
        {/* Image & meta */}
        <div className="md:w-1/3 shrink-0">
          {info.image ? (
            <img src={info.image} alt={info.title} className="w-full h-64 md:h-72 object-cover rounded-lg shadow-md mb-4" />
          ) : (
            <div className="w-full h-64 md:h-72 bg-gray-100 rounded-lg mb-4 flex items-center justify-center">No image</div>
          )}

          <div className="flex flex-wrap gap-2">
            {info.readyInMinutes && (
              <span className="px-3 py-1 rounded-full text-sm font-medium" style={{ backgroundColor: 'var(--color-secondary)', color: 'white' }}>{info.readyInMinutes} min</span>
            )}
            {info.servings && (
              <span className="px-3 py-1 rounded-full text-sm font-medium" style={{ backgroundColor: 'var(--color-primary)', color: 'white' }}>{info.servings} servings</span>
            )}
            {typeof info.healthScore !== 'undefined' && (
              <span className="px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">Health {info.healthScore}</span>
            )}
          </div>
        </div>

        {/* Details */}
        <div className="md:w-2/3">
          <h2 className="text-2xl font-bold mb-2">{info.title}</h2>

          <div className="mb-4 text-sm text-gray-600">
            {info.dishTypes && info.dishTypes.length > 0 && (
              <span className="mr-2">{info.dishTypes.join(' • ')}</span>
            )}
            {info.cuisines && info.cuisines.length > 0 && (
              <span className="text-gray-500">{info.cuisines.join(', ')}</span>
            )}
          </div>

          {info.summary ? (
            <div className="prose max-w-none mb-4" dangerouslySetInnerHTML={{ __html: info.summary }} />
          ) : (
            <p className="mb-4 text-gray-700">No description available.</p>
          )}

          {/* Nutrition  cards */}
          <div className="mb-4">
            <h3 className="text-lg font-semibold mb-2">Nutrition</h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {calories ? (
                <div className="p-3 rounded-lg shadow-sm text-center" style={{ backgroundColor: 'rgba(55,151,164,0.06)' }}>
                  <div className="text-xs text-gray-500">Calories</div>
                  <div className="text-lg font-semibold">{calories.value} {calories.unit}</div>
                </div>
              ) : (
                <div className="p-3 rounded-lg shadow-sm text-center text-gray-400">-</div>
              )}

              {protein ? (
                <div className="p-3 rounded-lg shadow-sm text-center" style={{ backgroundColor: 'rgba(110,227,151,0.07)' }}>
                  <div className="text-xs text-gray-500">Protein</div>
                  <div className="text-lg font-semibold">{protein.value} {protein.unit}</div>
                </div>
              ) : (
                <div className="p-3 rounded-lg shadow-sm text-center text-gray-400">-</div>
              )}

              {fat ? (
                <div className="p-3 rounded-lg shadow-sm text-center" style={{ backgroundColor: 'rgba(203,205,205,0.06)' }}>
                  <div className="text-xs text-gray-500">Fat</div>
                  <div className="text-lg font-semibold">{fat.value} {fat.unit}</div>
                </div>
              ) : (
                <div className="p-3 rounded-lg shadow-sm text-center text-gray-400">-</div>
              )}

              {carbs ? (
                <div className="p-3 rounded-lg shadow-sm text-center" style={{ backgroundColor: 'rgba(139,197,205,0.06)' }}>
                  <div className="text-xs text-gray-500">Carbs</div>
                  <div className="text-lg font-semibold">{carbs.value} {carbs.unit}</div>
                </div>
              ) : (
                <div className="p-3 rounded-lg shadow-sm text-center text-gray-400">-</div>
              )}
            </div>
          </div>

          {/* Ingredients */}
          <div className="mb-4">
            <h3 className="text-lg font-semibold mb-2">Ingredients</h3>
            {Array.isArray(info.extendedIngredients) && info.extendedIngredients.length > 0 ? (
              <div className="flex flex-wrap gap-2">
                {info.extendedIngredients.map((ing) => {
                  const key = ing.id || ing.name
                  const amount = ing.measures?.us?.amount || ing.amount || ''
                  const unit = ing.measures?.us?.unitShort || ing.unit || ''
                  const label = ing.original || `${amount} ${unit} ${ing.name}`.trim()
                  return (
                    <span key={key} className="px-3 py-1 rounded-full text-sm bg-gray-100 text-gray-700">{label}</span>
                  )
                })}
              </div>
            ) : (
              <p className="text-gray-700">No ingredients available.</p>
            )}
          </div>

          {info.sourceUrl && (
            <p className="mt-2">Source: <a target="_blank" rel="noreferrer" href={info.sourceUrl} className="text-blue-600 underline">View Full Recipe</a></p>
          )}
        </div>
      </div>
    </div>
  )
}

export default FoodDetail
