import { useState, useEffect } from 'react'
import storeAuth from '../context/storeAuth'
import axios from 'axios'
import { toast } from 'react-toastify'
import ProfileView from '../components/ProfileView'
import ProfileForm from '../components/ProfileForm'

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
                <ProfileView onEdit={() => setIsEditing(true)} userProfile={userProfile} />
            ) : (
                <ProfileForm
                    formData={formData}
                    handleChange={handleChange}
                    handleSubmit={handleSubmit}
                    saving={saving}
                    onCancel={() => setIsEditing(false)}
                />
            )}
        </div>
    )
}

export default PersonalData
