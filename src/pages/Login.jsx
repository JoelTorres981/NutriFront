import { useState } from 'react';
import { Link, useNavigate } from "react-router"
import { useFetch } from '../hooks/useFetch'
import { ToastContainer } from 'react-toastify'
import { useForm } from 'react-hook-form'
import storeAuth from "../context/storeAuth"
import loginBackground from '/src/assets/images/loginBackground.jpg'
import { MdVisibility, MdVisibilityOff } from 'react-icons/md'

const Login = () => {
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate()
    const { register, handleSubmit, formState: { errors } } = useForm()
    const fetchDataBackend = useFetch()
    const { setToken, setRol } = storeAuth()

    const loginUser = async (dataForm) => {
        const url = dataForm.password.includes("ADM")
            ? `${import.meta.env.VITE_BACKEND_URL}/admin/login`
            : `${import.meta.env.VITE_BACKEND_URL}/estudiante/login`
        const response = await fetchDataBackend(url, dataForm, 'POST')
        setToken(response.token)
        setRol(response.rol)
        if (response) {
            navigate('/dashboard')
        }
    }

    return (
        <div className="relative h-screen">

            <ToastContainer />

            {/* Fondo en toda la pantalla (detrás) */}
            <div className="absolute inset-0 bg-no-repeat bg-cover bg-center z-0" style={{ backgroundImage: `url(${loginBackground})` }} aria-hidden="true" />
            {/* Capa de overlay suave para mejorar contraste (sólo fondo) */}
            <div className="absolute inset-0 bg-black/30 z-0" aria-hidden="true" />

            {/* Contenedor del formulario centrado (ventana flotante) */}
            <div className="flex items-center justify-center h-full">
                <div className="md:w-4/5 sm:w-full max-w-md rounded-xl shadow-lg p-8 relative z-10" style={{ backgroundColor: 'var(--color-base)' }}>
                    <h1 className="text-3xl font-semibold mb-2 text-center uppercase">Bienvenido</h1>
                    <small className="block my-4 text-sm" style={{ color: 'var(--color-secondary)' }}>Por favor ingresa tus datos</small>

                    <form onSubmit={handleSubmit(loginUser)}>
                        {/* Correo electrónico */}
                        <div className="mb-3">
                            <label className="mb-2 block text-sm font-semibold">Correo electrónico</label>
                            <input type="email" placeholder="Ingresa tu correo" className="block w-full rounded-md border border-gray-300 focus:border-purple-700 focus:outline-none focus:ring-1 focus:ring-purple-700 py-1 px-2 text-gray-500"
                                {...register("email", { required: "Campo obligatorio" })}
                            />
                            {errors.email && <p className="text-red-800 text-xs">{errors.email.message}</p>}
                        </div>

                        {/* Contraseña */}
                        <div className="mb-3 relative">
                            <label className="mb-2 block text-sm font-semibold">Contraseña</label>
                            <div className="relative">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    placeholder="Ingresa tu contraseña"
                                    className="block w-full rounded-md border border-gray-300 focus:border-purple-700 focus:outline-none focus:ring-1 focus:ring-purple-700 py-1 px-1.5 text-gray-500 pr-10"
                                    {...register("password", { required: "Campo obligatorio" })}
                                />
                                {errors.password && <p className="text-red-800 text-xs">{errors.password.message}</p>}
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute top-2 right-3 text-gray-500 hover:text-gray-700 text-xl"
                                >
                                    {showPassword ? <MdVisibilityOff /> : <MdVisibility />}
                                </button>
                            </div>
                        </div>

                        {/* Botón de iniciar sesión */}
                        <button className="py-2 w-full block text-center bg-gray-500 text-slate-300 border rounded-xl 
                            hover:scale-100 duration-300 hover:bg-gray-900 hover:text-white">Iniciar sesión</button>
                    </form>

                    {/* Olvidaste tu contraseña */}
                    <div className="mt-5 text-xs border-b-2 py-4">
                        <Link to="/forgot/id" className="underline text-sm hover:text-gray-900" style={{ color: 'var(--color-secondary)' }}>¿Olvidaste tu contraseña?</Link>
                    </div>

                    {/* Enlaces para volver o registrarse */}
                    <div className="mt-3 text-sm flex justify-between items-center">
                        <Link to="/" className="underline text-sm hover:text-gray-900" style={{ color: 'var(--color-secondary)' }}>Volver</Link>
                        <Link to="/register" className="py-2 px-5 border rounded-xl hover:scale-110 duration-300 hover:bg-gray-900 hover:text-white" style={{ backgroundColor: 'var(--color-secondary)', color: 'white' }}>Registrarse</Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;