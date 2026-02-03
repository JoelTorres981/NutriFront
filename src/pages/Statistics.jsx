import { useEffect, useState } from 'react'
import axios from 'axios'
import storeAuth from '../context/storeAuth'
import { useNavigate } from 'react-router-dom'
import { FaUsers, FaUserShield, FaUtensils } from 'react-icons/fa'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts'

const Statistics = () => {
    const [stats, setStats] = useState(null)
    const [loading, setLoading] = useState(true)
    const { token, rol } = storeAuth()
    const navigate = useNavigate()

    useEffect(() => {
        if (rol !== 'administrador') {
            navigate('/dashboard')
            return
        }

        const fetchStats = async () => {
            try {
                const url = `${import.meta.env.VITE_BACKEND_URL}/admin/estadisticas`
                const response = await axios.get(url, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                })
                setStats(response.data)
                setLoading(false)
            } catch (error) {
                console.error("Error fetching statistics:", error)
                setLoading(false)
            }
        }

        fetchStats()
    }, [rol, token, navigate])

    if (loading) return (
        <div className="flex justify-center items-center h-full">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        </div>
    )

    const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

    return (
        <div className='p-4 space-y-8'>
            <h1 className='text-4xl font-black text-gray-800 '>Panel de Estadísticas</h1>

            {/* KPI Cards */}
            <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
                {/* Total Estudiantes */}
                <div className='bg-white p-6 rounded-lg shadow-md border-l-4 border-blue-500 hover:shadow-lg transition-all transform hover:-translate-y-1'>
                    <div className='flex items-center justify-between'>
                        <div>
                            <p className='text-gray-500 text-sm font-bold uppercase'>Total Estudiantes</p>
                            <p className='text-3xl font-bold text-gray-800 mt-2'>{stats?.totalEstudiantes || 0}</p>
                        </div>
                        <div className='bg-blue-100 p-3 rounded-full'>
                            <FaUsers className='text-blue-500 text-2xl' />
                        </div>
                    </div>
                </div>

                {/* Total Administradores */}
                <div className='bg-white p-6 rounded-lg shadow-md border-l-4 border-green-500 hover:shadow-lg transition-all transform hover:-translate-y-1'>
                    <div className='flex items-center justify-between'>
                        <div>
                            <p className='text-gray-500 text-sm font-bold uppercase'>Administradores</p>
                            <p className='text-3xl font-bold text-gray-800 mt-2'>{stats?.totalAdministradores || 0}</p>
                        </div>
                        <div className='bg-green-100 p-3 rounded-full'>
                            <FaUserShield className='text-green-500 text-2xl' />
                        </div>
                    </div>
                </div>

                {/* Comida Más Consultada */}
                <div className='bg-white p-6 rounded-lg shadow-md border-l-4 border-orange-500 hover:shadow-lg transition-all transform hover:-translate-y-1'>
                    <div className='flex items-center justify-between'>
                        <div>
                            <p className='text-gray-500 text-sm font-bold uppercase'>Top Comida</p>
                            <p className='text-xl font-bold text-gray-800 mt-2 truncate max-w-[150px]' title={stats?.comidaMasConsultada?.nombre}>
                                {stats?.comidaMasConsultada?.nombre || "N/A"}
                            </p>
                            <p className='text-xs text-gray-400 mt-1'>
                                {stats?.comidaMasConsultada?.consultas || 0} consultas
                            </p>
                        </div>
                        <div className='bg-orange-100 p-3 rounded-full'>
                            <FaUtensils className='text-orange-500 text-2xl' />
                        </div>
                    </div>
                </div>
            </div>

            {/* Graficos */}
            <div className='grid grid-cols-1 lg:grid-cols-2 gap-8'>

                {/* Grafico de Barras - Top Comidas */}
                <div className='bg-white p-6 rounded-lg shadow-md'>
                    <h3 className='text-lg font-bold text-gray-700 mb-4'>Comidas Más Consultadas</h3>
                    <div className='h-80 w-full'>
                        {stats?.graficos?.comidasPopulares?.length > 0 ? (
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart
                                    data={stats.graficos.comidasPopulares}
                                    layout="vertical"
                                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                                >
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis type="number" />
                                    <YAxis dataKey="name" type="category" width={100} />
                                    <Tooltip />
                                    <Legend />
                                    <Bar dataKey="consultas" fill="#f97316" name="Consultas" radius={[0, 4, 4, 0]} />
                                </BarChart>
                            </ResponsiveContainer>
                        ) : (
                            <div className="h-full flex items-center justify-center text-gray-400">
                                No hay datos suficientes
                            </div>
                        )}
                    </div>
                </div>

                {/* Grafico de Pastel - Distribucion de Usuarios */}
                <div className='bg-white p-6 rounded-lg shadow-md'>
                    <h3 className='text-lg font-bold text-gray-700 mb-4'>Distribución de Usuarios</h3>
                    <div className='h-80 w-full'>
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={stats?.graficos?.distribucionUsuarios}
                                    cx="50%"
                                    cy="50%"
                                    innerRadius={60}
                                    outerRadius={100}
                                    fill="#8884d8"
                                    paddingAngle={5}
                                    dataKey="value"
                                >
                                    {stats?.graficos?.distribucionUsuarios.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                    ))}
                                </Pie>
                                <Tooltip />
                                <Legend verticalAlign="bottom" height={36} />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default Statistics
