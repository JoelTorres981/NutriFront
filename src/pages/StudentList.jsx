import { useEffect, useState } from 'react'
import axios from 'axios'
import storeAuth from '../context/storeAuth'
import { FaSpinner } from 'react-icons/fa'

const StudentList = () => {
    const [students, setStudents] = useState([])
    const [loading, setLoading] = useState(true)
    const { token } = storeAuth()

    useEffect(() => {
        const fetchStudents = async () => {
            try {
                const url = `${import.meta.env.VITE_BACKEND_URL}/admin/listar-estudiantes`
                const response = await axios.get(url, {
                    headers: { Authorization: `Bearer ${token}` }
                })
                setStudents(response.data)
            } catch (error) {
                console.error("Error fetching students:", error)
            } finally {
                setLoading(false)
            }
        }
        fetchStudents()
    }, [token])

    if (loading) return (
        <div className="flex justify-center items-center h-full">
            <FaSpinner className="animate-spin text-4xl text-primary" />
        </div>
    )

    return (
        <div className='p-4'>
            <h1 className='text-3xl font-black text-gray-800 mb-6'>Lista de Estudiantes</h1>

            <div className='bg-white rounded-lg shadow-md overflow-hidden'>
                <div className="overflow-x-auto">
                    <table className="min-w-full leading-normal">
                        <thead>
                            <tr>
                                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                    Nombre Completo
                                </th>
                                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                    Email
                                </th>
                                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                    Celular
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {students.length > 0 ? (
                                students.map((student) => (
                                    <tr key={student._id}>
                                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                            <p className="text-gray-900 whitespace-no-wrap">
                                                {student.nombre} {student.apellido}
                                            </p>
                                        </td>
                                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                            <p className="text-gray-900 whitespace-no-wrap">{student.email}</p>
                                        </td>
                                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                            <p className="text-gray-900 whitespace-no-wrap">
                                                {student.celular || 'N/A'}
                                            </p>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="3" className="px-5 py-5 border-b border-gray-200 bg-white text-sm text-center">
                                        No hay estudiantes registrados.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default StudentList
