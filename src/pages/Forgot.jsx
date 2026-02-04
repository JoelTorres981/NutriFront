import { Link } from 'react-router'
import { useForm } from 'react-hook-form';
import { ToastContainer } from 'react-toastify'
import { useFetch } from '../hooks/useFetch'
import resetBackground from '/src/assets/images/resetBackground.jpg'

export const Forgot = () => {

    const { register, handleSubmit, formState: { errors } } = useForm()
    const fetchDataBackend = useFetch()

    const sendMail = async (dataForm) => {
        const url = `${import.meta.env.VITE_BACKEND_URL}/recuperarpassword`
        await fetchDataBackend(url, dataForm, 'POST')
    }

    return (
        <div className="relative h-screen">

            <ToastContainer />

            {/* Fondo en toda la pantalla (detrás) - imagen para forgot */}
            <div className="absolute inset-0 bg-no-repeat bg-cover bg-center z-0" style={{ backgroundImage: `url(${resetBackground})` }} aria-hidden="true" />
            {/* Overlay suave para mejorar contraste (solo fondo) */}
            <div className="absolute inset-0 bg-black/30 z-0" aria-hidden="true" />

            {/* Contenedor centrado del formulario (ventana flotante opaca) */}
            <div className="flex items-center justify-center h-full">
                <div className="md:w-4/5 sm:w-full max-w-md rounded-xl shadow-lg p-8 relative z-10" style={{ backgroundColor: 'rgba(255,255,255,0.92)' }}>

                    <h1 className="text-3xl font-semibold mb-2 text-center uppercase" style={{ color: 'var(--color-primary)' }}>!Olvidaste tu contraseña¡</h1>
                    <small className="block my-4 text-sm text-center" style={{ color: 'var(--color-secondary)' }}>No te preocupes</small>

                    {/* Formulario */}
                    <form onSubmit={handleSubmit(sendMail)}>

                        {/* Campo correo electrónico */}
                        <div className="mb-1">
                            <label className="mb-2 block text-sm font-semibold">Correo electrónico</label>
                            <input type="email" placeholder="Ingresa un correo electrónico válido" className="block w-full rounded-md border border-gray-300 py-1 px-1.5 text-gray-500"
                                {...register("email", { required: "El correo electrónico es obligatorio" })}
                            />
                            {errors.email && <p className="text-red-800">{errors.email.message}</p>}
                        </div>


                        {/* Botón Forgot password */}
                        <div className="mb-3">
                            <button className="bg-gray-600 text-slate-300 border py-2 w-full rounded-xl mt-5 hover:scale-105 duration-300 hover:bg-gray-900 hover:text-white"
                                style={{ backgroundColor: 'var(--color-primary)', color: 'white' }}>Enviar correo
                            </button>
                        </div>

                    </form>


                    <div className="mt-5 text-xs border-b-2 py-4 " />


                    {/* Enlace para iniciar sesión si ya posee una cuenta */}
                    <div className="mt-3 text-sm flex justify-between items-center">
                        <p>¿Ya posees una cuenta?</p>
                        <Link to="/login" className="py-2 px-5 bg-gray-600 text-slate-300 border rounded-xl hover:scale-110 duration-300 hover:bg-gray-900 hover:text-white"
                            style={{ backgroundColor: 'var(--color-secondary)', color: 'white' }}>Iniciar sesión</Link>
                    </div>

                </div>
            </div>

        </div>
    )
}