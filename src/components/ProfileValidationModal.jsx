import { useNavigate } from 'react-router-dom';
import { FaUserEdit, FaExclamationTriangle } from 'react-icons/fa';

const ProfileValidationModal = ({ user }) => {
    const navigate = useNavigate();

    // Campos que deben tener valor
    const requiredFields = ['nombre', 'apellido', 'email', 'fechaNacimiento', 'sexo', 'estatura', 'peso'];

    // Verificar si falta alguno
    const isProfileIncomplete = !user || requiredFields.some(field => !user[field]);

    if (!isProfileIncomplete) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden animate-fadeIn">
                <div className="bg-yellow-500 p-6 flex justify-center">
                    <FaExclamationTriangle className="text-white text-5xl" />
                </div>

                <div className="p-8 text-center">
                    <h2 className="text-2xl font-bold text-gray-800 mb-2">Perfil Incompleto</h2>
                    <p className="text-gray-600 mb-6">
                        Para utilizar las funciones de IA y Calendario, necesitamos que completes tu información personal básica (peso, estatura, etc).
                    </p>

                    <button
                        onClick={() => navigate('/dashboard')}
                        className="w-full bg-primary text-white font-bold py-3 px-6 rounded-xl shadow-lg hover:bg-primary/90 transition flex items-center justify-center gap-2 transform hover:scale-105"
                    >
                        <FaUserEdit /> Completar mi Perfil
                    </button>

                    <p className="mt-4 text-xs text-gray-400">
                        Serás redirigido a la sección de datos personales.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default ProfileValidationModal;
