import { FaEdit, FaUser, FaHeartbeat, FaRunning, FaWallet, FaIdCard, FaUtensils } from 'react-icons/fa'

const ProfileView = ({ userProfile, onEdit }) => {
    return (
        <div className="space-y-6 animate-fadeIn">
            <div className="flex justify-end">
                <button
                    onClick={onEdit}
                    className="flex items-center gap-2 bg-primary text-white px-6 py-2 rounded-full font-bold shadow-lg hover:bg-primary/90 transition hover:scale-105"
                >
                    <FaEdit /> Editar Perfil Completo
                </button>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* Account Info */}
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 col-span-full lg:col-span-1">
                    <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                        <span className="bg-blue-100 p-2 rounded-lg text-blue-600"><FaIdCard /></span>
                        Cuenta
                    </h3>
                    <div className="space-y-3">
                        <InfoItem label="Nombre" value={`${userProfile.nombre} ${userProfile.apellido}`} />
                        <InfoItem label="Email" value={userProfile.email} />
                        <InfoItem label="Celular" value={userProfile.celular} />
                        <InfoItem label="Fecha Nacimiento" value={userProfile.fechaNacimiento ? new Date(userProfile.fechaNacimiento).toLocaleDateString() : 'No definida'} />
                        <InfoItem label="Sexo" value={userProfile.sexo} />
                    </div>
                </div>

                {/* Health Info */}
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 lg:col-span-2">
                    <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                        <span className="bg-green-100 p-2 rounded-lg text-green-600"><FaHeartbeat /></span>
                        Salud Física
                    </h3>
                    <div className="grid sm:grid-cols-2 gap-4">
                        <InfoItem label="Estatura" value={userProfile.estatura ? `${userProfile.estatura} cm` : 'No definida'} />
                        <InfoItem label="Peso" value={userProfile.peso ? `${userProfile.peso} kg` : 'No definido'} />
                        <InfoItem label="Alergias" value={userProfile.alergias} />
                        <InfoItem label="Enfermedades" value={userProfile.enfermedades} />
                        <InfoItem label="Medicamentos" value={userProfile.medicamentos} />
                        <InfoItem label="Objetivo" value={userProfile.objetivo} />
                    </div>
                </div>

                {/* Lifestyle */}
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 lg:col-span-2">
                    <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                        <span className="bg-orange-100 p-2 rounded-lg text-orange-600"><FaRunning /></span>
                        Estilo de Vida
                    </h3>
                    <div className="grid sm:grid-cols-2 gap-4">
                        <InfoItem label="Actividad Física" value={userProfile.actividadFisica} />
                        <InfoItem label="Tipo de Dieta" value={userProfile.dieta} />
                        <InfoItem label="Comidas al día" value={userProfile.comidasAlDia} />
                        <InfoItem label="Consumo Agua" value={userProfile.consumoAgua} />
                        <InfoItem label="Horas Sueño" value={userProfile.horasSueno} />
                        <InfoItem label="Nivel Estrés" value={userProfile.nivelEstres} />
                    </div>
                </div>

                {/* Economic */}
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                    <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                        <span className="bg-purple-100 p-2 rounded-lg text-purple-600"><FaWallet /></span>
                        Economía
                    </h3>
                    <div className="space-y-3">
                        <InfoItem label="Presupuesto Semanal" value={userProfile.presupuesto ? `$${userProfile.presupuesto}` : 'No definido'} />
                        <InfoItem label="Frecuencia Compra" value={userProfile.frecuenciaCompra} />
                    </div>
                    <div className="mt-4 pt-4 border-t border-gray-100">
                        <InfoItem label="Preferencias" value={userProfile.preferencias} />
                    </div>
                </div>
            </div>
        </div>
    )
}

const InfoItem = ({ label, value }) => (
    <div className="border-b border-gray-100 last:border-0 pb-2 last:pb-0">
        <span className="text-xs text-gray-400 uppercase font-semibold">{label}</span>
        <p className="text-gray-700 font-medium break-words">{value || <span className="text-gray-300 italic">No especificado</span>}</p>
    </div>
)

export default ProfileView
