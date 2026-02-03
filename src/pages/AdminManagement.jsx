import { useNavigate } from 'react-router-dom'
import { FaUserShield, FaUsers } from 'react-icons/fa'

const AdminManagement = () => {
    const navigate = useNavigate()

    return (
        <div className='p-8 space-y-8'>
            <h1 className='text-4xl font-black text-gray-800 mb-10'>Gestión del Sistema</h1>

            <div className='grid grid-cols-1 md:grid-cols-2 gap-10 max-w-4xl mx-auto'>
                {/* Card Gestionar Administradores */}
                <div
                    onClick={() => navigate('/dashboard/admin-crud')}
                    className='bg-white p-10 rounded-2xl shadow-xl hover:shadow-2xl transition-all transform hover:-translate-y-2 cursor-pointer border-t-8 border-indigo-600 flex flex-col items-center text-center group'
                >
                    <div className='bg-indigo-100 p-6 rounded-full mb-6 group-hover:bg-indigo-200 transition-colors'>
                        <FaUserShield className='text-6xl text-indigo-600' />
                    </div>
                    <h2 className='text-2xl font-bold text-gray-800 mb-3'>Gestionar Administradores</h2>
                    <p className='text-gray-500'>Crear, editar, eliminar y listar administradores del sistema.</p>
                </div>

                {/* Card Ver Estudiantes */}
                <div
                    onClick={() => navigate('/dashboard/student-list')}
                    className='bg-white p-10 rounded-2xl shadow-xl hover:shadow-2xl transition-all transform hover:-translate-y-2 cursor-pointer border-t-8 border-green-600 flex flex-col items-center text-center group'
                >
                    <div className='bg-green-100 p-6 rounded-full mb-6 group-hover:bg-green-200 transition-colors'>
                        <FaUsers className='text-6xl text-green-600' />
                    </div>
                    <h2 className='text-2xl font-bold text-gray-800 mb-3'>Lista de Estudiantes</h2>
                    <p className='text-gray-500'>Visualizar la lista completa de estudiantes registrados.</p>
                </div>
            </div>
        </div>
    )
}

export default AdminManagement
