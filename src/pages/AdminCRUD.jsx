import { useEffect, useState } from 'react'
import axios from 'axios'
import storeAuth from '../context/storeAuth'
import { FaTrash, FaEdit, FaPlus, FaSpinner, FaTimes } from 'react-icons/fa'
import { toast } from 'react-toastify'
import { useForm } from 'react-hook-form'

const AdminCRUD = () => {
    const [admins, setAdmins] = useState([])
    const [loading, setLoading] = useState(true)
    const [modalOpen, setModalOpen] = useState(false)
    const [editMode, setEditMode] = useState(false)
    const [currentAdminId, setCurrentAdminId] = useState(null)
    const { token } = storeAuth()
    const { register, handleSubmit, reset, setValue, formState: { errors } } = useForm()

    const fetchAdmins = async () => {
        try {
            const url = `${import.meta.env.VITE_BACKEND_URL}/admin/listar`
            const response = await axios.get(url, {
                headers: { Authorization: `Bearer ${token}` }
            })
            setAdmins(response.data)
        } catch (error) {
            console.error("Error fetching admins:", error)
            toast.error("Error al cargar administradores")
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchAdmins()
    }, [token])

    const onSubmit = async (data) => {
        try {
            if (editMode) {
                const url = `${import.meta.env.VITE_BACKEND_URL}/admin/actualizar/${currentAdminId}`
                await axios.put(url, data, {
                    headers: { Authorization: `Bearer ${token}` }
                })
                toast.success("Administrador actualizado correctamente")
            } else {
                const url = `${import.meta.env.VITE_BACKEND_URL}/admin/registro`
                await axios.post(url, data, {
                    headers: { Authorization: `Bearer ${token}` }
                })
                toast.success("Administrador creado exitosamente")
            }
            closeModal()
            fetchAdmins()
        } catch (error) {
            console.error(error)
            toast.error(error.response?.data?.msg || "Error en la operación")
        }
    }

    const handleDelete = async (id) => {
        if (!confirm("¿Estás seguro de eliminar este administrador?")) return

        try {
            const url = `${import.meta.env.VITE_BACKEND_URL}/admin/eliminar/${id}`
            await axios.delete(url, {
                headers: { Authorization: `Bearer ${token}` }
            })
            toast.success("Administrador eliminado")
            fetchAdmins()
        } catch (error) {
            console.error(error)
            toast.error(error.response?.data?.msg || "Error al eliminar")
        }
    }

    const openModal = (admin = null) => {
        if (admin) {
            setEditMode(true)
            setCurrentAdminId(admin._id)
            setValue('usuario', admin.usuario)
            setValue('email', admin.email)
            setValue('telefono', admin.telefono || '')
            setValue('direccion', admin.direccion || '')
        } else {
            setEditMode(false)
            setCurrentAdminId(null)
            reset()
        }
        setModalOpen(true)
    }

    const closeModal = () => {
        setModalOpen(false)
        reset()
    }

    if (loading) return (
        <div className="flex justify-center items-center h-full">
            <FaSpinner className="animate-spin text-4xl text-primary" />
        </div>
    )

    return (
        <div className='p-4'>
            <div className='flex justify-between items-center mb-6'>
                <h1 className='text-3xl font-black text-gray-800'>Administradores</h1>
                <button
                    onClick={() => openModal()}
                    className='bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors'
                >
                    <FaPlus /> Crear Nuevo
                </button>
            </div>

            <div className='bg-white rounded-lg shadow-md overflow-hidden'>
                <div className="overflow-x-auto">
                    <table className="min-w-full leading-normal">
                        <thead>
                            <tr>
                                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Usuario</th>
                                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Email</th>
                                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Teléfono</th>
                                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {admins.map((admin) => (
                                <tr key={admin._id}>
                                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                        <div className="flex items-center">
                                            <div className="ml-3">
                                                <p className="text-gray-900 whitespace-no-wrap font-semibold">{admin.usuario}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                        <p className="text-gray-900 whitespace-no-wrap">{admin.email}</p>
                                    </td>
                                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                        <p className="text-gray-900 whitespace-no-wrap">{admin.telefono || 'N/A'}</p>
                                    </td>
                                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm text-center">
                                        <button
                                            onClick={() => openModal(admin)}
                                            className="text-blue-600 hover:text-blue-900 mx-2"
                                            title="Editar"
                                        >
                                            <FaEdit size={18} />
                                        </button>
                                        <button
                                            onClick={() => handleDelete(admin._id)}
                                            className="text-red-600 hover:text-red-900 mx-2"
                                            title="Eliminar"
                                        >
                                            <FaTrash size={18} />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Modal */}
            {modalOpen && (
                <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50 flex justify-center items-center">
                    <div className="relative bg-white rounded-lg shadow-xl p-8 w-full max-w-md mx-4">
                        <button
                            onClick={closeModal}
                            className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
                        >
                            <FaTimes size={24} />
                        </button>

                        <h2 className="text-2xl font-bold mb-6 text-gray-800">
                            {editMode ? 'Editar Administrador' : 'Nuevo Administrador'}
                        </h2>

                        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                            <div>
                                <label className="block text-gray-700 text-sm font-bold mb-2">Usuario</label>
                                <input
                                    {...register("usuario", { required: "El usuario es obligatorio" })}
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                />
                                {errors.usuario && <p className="text-red-500 text-xs italic">{errors.usuario.message}</p>}
                            </div>

                            <div>
                                <label className="block text-gray-700 text-sm font-bold mb-2">Email</label>
                                <input
                                    type="email"
                                    {...register("email", { required: "El email es obligatorio" })}
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                />
                                {errors.email && <p className="text-red-500 text-xs italic">{errors.email.message}</p>}
                            </div>

                            <div>
                                <label className="block text-gray-700 text-sm font-bold mb-2">Teléfono</label>
                                <input
                                    {...register("telefono")}
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                />
                            </div>

                            <div>
                                <label className="block text-gray-700 text-sm font-bold mb-2">Dirección</label>
                                <input
                                    {...register("direccion")}
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                />
                            </div>

                            <div className="flex justify-end pt-4">
                                <button
                                    type="button"
                                    onClick={closeModal}
                                    className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded mr-2"
                                >
                                    Cancelar
                                </button>
                                <button
                                    type="submit"
                                    className="bg-primary hover:bg-primary-dark text-white font-bold py-2 px-4 rounded"
                                >
                                    {editMode ? 'Actualizar' : 'Guardar'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    )
}

export default AdminCRUD
