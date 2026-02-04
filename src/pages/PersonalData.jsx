import { useState, useEffect } from 'react'
import storeAuth from '../context/storeAuth'
import axios from 'axios'
import { toast } from 'react-toastify'
import { FaEdit, FaSave, FaTimes, FaUser, FaHeartbeat, FaRunning, FaWallet, FaIdCard, FaTint, FaBed, FaBrain, FaNotesMedical, FaPills, FaUtensils } from 'react-icons/fa'

const PersonalData = () => {
    const { token } = storeAuth()
    const [loading, setLoading] = useState(true)
    const [saving, setSaving] = useState(false)
    const [isEditing, setIsEditing] = useState(false)
    const [userProfile, setUserProfile] = useState({})

    // Form state with ALL backend fields
    const [formData, setFormData] = useState({
        nombre: '',
        apellido: '',
        celular: '',
        email: '',
        fechaNacimiento: '',
        estatura: '',
        peso: '',
        alergias: '',
        preferencias: '',
        sexo: '',
        actividadFisica: '',
        dieta: '',
        comidasAlDia: '',
        objetivo: '',
        enfermedades: '',
        medicamentos: '',
        consumoAgua: '',
        horasSueno: '',
        nivelEstres: '',
        presupuesto: '',
        frecuenciaCompra: ''
    })

    // Fetch Profile Data
    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/estudiante/perfil`, {
                    headers: { Authorization: `Bearer ${token}` }
                })
                const data = response.data
                setUserProfile(data)

                // Pre-fill form data with all fields
                setFormData({
                    nombre: data.nombre || '',
                    apellido: data.apellido || '',
                    celular: data.celular || '',
                    email: data.email || '',
                    fechaNacimiento: data.fechaNacimiento?.split('T')[0] || '',
                    estatura: data.estatura || '',
                    peso: data.peso || '',
                    alergias: data.alergias || '',
                    preferencias: data.preferencias || '',
                    sexo: data.sexo || '',
                    actividadFisica: data.actividadFisica || '',
                    dieta: data.dieta || '',
                    comidasAlDia: data.comidasAlDia || '',
                    objetivo: data.objetivo || '',
                    enfermedades: data.enfermedades || '',
                    medicamentos: data.medicamentos || '',
                    consumoAgua: data.consumoAgua || '',
                    horasSueno: data.horasSueno || '',
                    nivelEstres: data.nivelEstres || '',
                    presupuesto: data.presupuesto || '',
                    frecuenciaCompra: data.frecuenciaCompra || ''
                })
            } catch (error) {
                console.error("Error fetching profile:", error)
                toast.error("Error al cargar datos del perfil")
            } finally {
                setLoading(false)
            }
        }

        if (token) fetchProfile()
    }, [token])

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData(prev => ({
            ...prev,
            [name]: value
        }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (!userProfile._id) {
            toast.error("Error crítico: No se encuentra el ID del usuario.")
            return
        }

        // 1. Auto-completar campos opcionales vacíos
        const datosParaEnviar = { ...formData }

        // Campos de texto que pueden ser "Ninguna"
        if (!datosParaEnviar.alergias) datosParaEnviar.alergias = "Ninguna"
        if (!datosParaEnviar.enfermedades) datosParaEnviar.enfermedades = "Ninguna"
        if (!datosParaEnviar.medicamentos) datosParaEnviar.medicamentos = "Ninguno"
        if (!datosParaEnviar.preferencias) datosParaEnviar.preferencias = "Ninguna"
        if (!datosParaEnviar.objetivo) datosParaEnviar.objetivo = "Mantener Salud"

        // Campos numéricos que pueden ser 0
        if (!datosParaEnviar.consumoAgua) datosParaEnviar.consumoAgua = 0
        if (!datosParaEnviar.horasSueno) datosParaEnviar.horasSueno = 7
        if (!datosParaEnviar.nivelEstres) datosParaEnviar.nivelEstres = 1
        if (!datosParaEnviar.presupuesto) datosParaEnviar.presupuesto = 0

        // 2. Validar campos CRÍTICOS (que no pueden inventarse)
        const camposCriticos = ['nombre', 'apellido', 'email', 'fechaNacimiento', 'sexo', 'estatura', 'peso']
        const faltanCriticos = camposCriticos.some(campo => !datosParaEnviar[campo])

        if (faltanCriticos) {
            toast.error("Por favor, completa los campos obligatorios (Nombre, Fecha, Peso, Estatura).")
            return
        }

        console.log("Enviando actualizaciones (PUT)...", datosParaEnviar)
        setSaving(true)

        try {
            // Using PUT method and /actualizarperfil/:id endpoint
            const response = await axios.put(
                `${import.meta.env.VITE_BACKEND_URL}/actualizarperfil/${userProfile._id}`,
                datosParaEnviar,
                { headers: { Authorization: `Bearer ${token}` } }
            )

            console.log("Respuesta actualización:", response.data)
            toast.success("Perfil actualizado correctamente")
            setUserProfile(response.data) // Update local profile view
            // Actualizar formData con los valores "rellenados" para que el usuario los vea
            setFormData(prev => ({ ...prev, ...datosParaEnviar }))
            setIsEditing(false) // Exit edit mode
        } catch (error) {
            console.error("Error updating profile:", error)
            toast.error(error.response?.data?.msg || "Error al guardar los cambios")
        } finally {
            setSaving(false)
        }
    }

    if (loading) return <div className="text-center p-10 font-bold text-gray-500">Cargando perfil...</div>

    return (
        <div className="max-w-5xl mx-auto">
            <div className="mb-8 text-center">
                <h1 className='text-3xl font-jaldi font-bold uppercase text-primary mb-2'>Mi Perfil</h1>
                <p className='text-gray-500'>Gestiona tu información personal y de salud completa</p>
                <hr className='mt-4 border-t-2 border-secondary/20 w-1/2 mx-auto' />
            </div>

            {!isEditing ? (
                // VIEW MODE
                <div className="space-y-6 animate-fadeIn">
                    <div className="flex justify-end">
                        <button
                            onClick={() => setIsEditing(true)}
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
            ) : (
                // EDIT MODE (Full Form)
                <form onSubmit={handleSubmit} className='bg-white p-8 rounded-2xl shadow-xl animate-fadeIn'>
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-xl font-bold text-gray-700">Actualizar Perfil Completo</h2>
                        <button
                            type="button"
                            onClick={() => setIsEditing(false)}
                            className="text-gray-400 hover:text-gray-600"
                        >
                            <FaTimes size={24} />
                        </button>
                    </div>

                    {/* Sección: Datos de Cuenta */}
                    <fieldset className="mb-6 border border-gray-200 p-5 rounded-xl bg-gray-50/50">
                        <legend className="text-sm font-bold text-primary px-2 uppercase flex items-center gap-2"><FaUser /> Datos de Cuenta</legend>
                        <div className="grid md:grid-cols-2 gap-5 mb-4">
                            <InputGroup label="Nombre" name="nombre" value={formData.nombre} onChange={handleChange} />
                            <InputGroup label="Apellido" name="apellido" value={formData.apellido} onChange={handleChange} />
                        </div>
                        <div className="grid md:grid-cols-2 gap-5">
                            <InputGroup label="Email" name="email" type="email" value={formData.email} onChange={handleChange} />
                            <InputGroup label="Celular" name="celular" value={formData.celular} onChange={handleChange} />
                        </div>
                    </fieldset>

                    {/* Sección: Datos Personales */}
                    <fieldset className="mb-6 border border-gray-200 p-5 rounded-xl">
                        <legend className="text-sm font-bold text-primary px-2 uppercase flex items-center gap-2"><FaIdCard /> Info. Personal</legend>
                        <div className="grid md:grid-cols-2 gap-5">
                            <InputGroup label="Fecha de Nacimiento" name="fechaNacimiento" type="date" value={formData.fechaNacimiento} onChange={handleChange} />
                            <div>
                                <label className="mb-2 block text-sm font-semibold text-gray-700">Sexo</label>
                                <select name="sexo" value={formData.sexo} onChange={handleChange} className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-primary/50 outline-none">
                                    <option value="">Seleccionar</option>
                                    <option value="masculino">Masculino</option>
                                    <option value="femenino">Femenino</option>
                                    <option value="otro">Otro</option>
                                </select>
                            </div>
                        </div>
                    </fieldset>

                    {/* Sección: Salud y Cuerpo */}
                    <fieldset className="mb-6 border border-gray-200 p-5 rounded-xl">
                        <legend className="text-sm font-bold text-primary px-2 uppercase flex items-center gap-2"><FaHeartbeat /> Salud Física</legend>
                        <div className="grid md:grid-cols-2 gap-5 mb-4">
                            <InputGroup label="Estatura (cm)" name="estatura" type="number" value={formData.estatura} onChange={handleChange} placeholder="Ej: 175" />
                            <InputGroup label="Peso (kg)" name="peso" type="number" step="0.1" value={formData.peso} onChange={handleChange} placeholder="Ej: 70.5" />
                        </div>
                        <div className="grid md:grid-cols-2 gap-5 mb-4">
                            <InputGroup label="Enfermedades / Condiciones" name="enfermedades" value={formData.enfermedades} onChange={handleChange} placeholder="Ej: Diabetes, Hipertensión..." />
                            <InputGroup label="Medicamentos" name="medicamentos" value={formData.medicamentos} onChange={handleChange} placeholder="Ej: Insulina..." />
                        </div>
                        <div className="mb-4">
                            <label className="mb-2 block text-sm font-semibold text-gray-700">Alergias Alimentarias</label>
                            <textarea name="alergias" value={formData.alergias} onChange={handleChange} className="w-full border border-gray-300 rounded-lg p-2 h-20 focus:ring-2 focus:ring-primary/50 outline-none" placeholder="Ej: Nueces, mariscos, gluten..." />
                        </div>
                    </fieldset>

                    {/* Sección: Estilo de Vida */}
                    <fieldset className="mb-6 border border-gray-200 p-5 rounded-xl">
                        <legend className="text-sm font-bold text-primary px-2 uppercase flex items-center gap-2"><FaRunning /> Estilo de Vida</legend>
                        <div className="grid md:grid-cols-2 gap-5 mb-4">
                            <div>
                                <label className="mb-2 block text-sm font-semibold text-gray-700">Actividad Física</label>
                                <select name="actividadFisica" value={formData.actividadFisica} onChange={handleChange} className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-primary/50 outline-none">
                                    <option value="">Seleccionar</option>
                                    <option value="sedentario">Sedentario</option>
                                    <option value="ligera">Ligera (1-3 días)</option>
                                    <option value="moderada">Moderada (3-5 días)</option>
                                    <option value="intensa">Intensa (6-7 días)</option>
                                </select>
                            </div>
                            <div>
                                <label className="mb-2 block text-sm font-semibold text-gray-700">Objetivo</label>
                                <select name="objetivo" value={formData.objetivo} onChange={handleChange} className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-primary/50 outline-none">
                                    <option value="">Seleccionar</option>
                                    <option value="perder_peso">Perder Peso</option>
                                    <option value="mantener_peso">Mantener Peso</option>
                                    <option value="ganar_musculo">Ganar Músculo</option>
                                    <option value="mejorar_salud">Mejorar Salud</option>
                                </select>
                            </div>
                        </div>

                        <div className="grid md:grid-cols-3 gap-5 mb-4">
                            <InputGroup label="Consumo Agua (litros)" name="consumoAgua" type="number" step="0.1" value={formData.consumoAgua} onChange={handleChange} />
                            <InputGroup label="Horas de Sueño" name="horasSueno" type="number" value={formData.horasSueno} onChange={handleChange} />
                            <InputGroup label="Nivel Estrés (1-10)" name="nivelEstres" type="number" min="1" max="10" value={formData.nivelEstres} onChange={handleChange} />
                        </div>
                    </fieldset>

                    {/* Sección: Dieta y Economía */}
                    <fieldset className="mb-8 border border-gray-200 p-5 rounded-xl">
                        <legend className="text-sm font-bold text-primary px-2 uppercase flex items-center gap-2"><FaUtensils /> Dieta y Economía</legend>
                        <div className="grid md:grid-cols-2 gap-5 mb-4">
                            <div>
                                <label className="mb-2 block text-sm font-semibold text-gray-700">Tipo de Dieta</label>
                                <select name="dieta" value={formData.dieta} onChange={handleChange} className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-primary/50 outline-none">
                                    <option value="">Seleccionar</option>
                                    <option value="omnivoro">Omnívoro</option>
                                    <option value="vegetariano">Vegetariano</option>
                                    <option value="vegano">Vegano</option>
                                    <option value="keto">Keto</option>
                                    <option value="paleo">Paleo</option>
                                </select>
                            </div>
                            <InputGroup label="Comidas al día" name="comidasAlDia" type="number" value={formData.comidasAlDia} onChange={handleChange} />
                        </div>
                        <div className="grid md:grid-cols-2 gap-5 mb-4">
                            <InputGroup label="Presupuesto Semanal ($)" name="presupuesto" type="number" value={formData.presupuesto} onChange={handleChange} placeholder="Ej: 50" />
                            <div>
                                <label className="mb-2 block text-sm font-semibold text-gray-700">Frecuencia de Compra</label>
                                <select name="frecuenciaCompra" value={formData.frecuenciaCompra} onChange={handleChange} className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-primary/50 outline-none">
                                    <option value="">Seleccionar</option>
                                    <option value="diaria">Diaria</option>
                                    <option value="semanal">Semanal</option>
                                    <option value="quincenal">Quincenal</option>
                                    <option value="mensual">Mensual</option>
                                </select>
                            </div>
                        </div>

                        <div className="mb-4">
                            <label className="mb-2 block text-sm font-semibold text-gray-700">Preferencias Alimenticias</label>
                            <textarea name="preferencias" value={formData.preferencias} onChange={handleChange} className="w-full border border-gray-300 rounded-lg p-2 h-20 focus:ring-2 focus:ring-primary/50 outline-none" placeholder="Ej: Me gusta mucho el pollo, no me gusta el brócoli..." />
                        </div>
                    </fieldset>


                    {/* Action Buttons */}
                    <div className="flex gap-4 sticky bottom-4 bg-white p-4 shadow-lg rounded-xl border border-gray-100 z-10">
                        <button
                            type="button"
                            onClick={() => setIsEditing(false)}
                            className="flex-1 py-3 text-gray-600 font-bold hover:bg-gray-100 rounded-xl transition"
                        >
                            Cancelar
                        </button>
                        <button
                            type="submit"
                            disabled={saving}
                            className={`flex-1 py-3 bg-secondary text-white font-bold rounded-xl shadow-lg transition flex justify-center items-center gap-2 ${saving ? 'opacity-70 cursor-not-allowed' : 'hover:bg-secondary/90'}`}
                            style={{ backgroundColor: 'var(--color-primary)', color: 'white' }}>
                            {saving ? (
                                <>
                                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                                    Guardando...
                                </>
                            ) : (
                                <>
                                    <FaSave /> Guardar
                                </>
                            )}
                        </button>
                    </div>
                </form>
            )}
        </div>
    )
}

// Helper Components
const InfoItem = ({ label, value }) => (
    <div className="border-b border-gray-100 last:border-0 pb-2 last:pb-0">
        <span className="text-xs text-gray-400 uppercase font-semibold">{label}</span>
        <p className="text-gray-700 font-medium break-words">{value || <span className="text-gray-300 italic">No especificado</span>}</p>
    </div>
)

const InputGroup = ({ label, name, type = "text", value, onChange, placeholder, step, min, max }) => (
    <div>
        <label className="mb-2 block text-sm font-semibold text-gray-700">{label}</label>
        <input
            type={type}
            name={name}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            step={step}
            min={min}
            max={max}
            className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-secondary/50 outline-none transition"
        />
    </div>
)

export default PersonalData
