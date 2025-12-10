import { useState } from 'react';
import { Link, useNavigate } from "react-router"
import {useFetch} from '../hooks/useFetch'
import { ToastContainer } from 'react-toastify'
import { useForm } from 'react-hook-form'
import storeAuth from "../context/storeAuth"

const Login = () => {
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate()
    const { register, handleSubmit, formState: { errors } } = useForm()
    const  fetchDataBackend = useFetch()
    const { setToken, setRol } = storeAuth()

    const loginUser = async(dataForm) => {
        const url = `${import.meta.env.VITE_BACKEND_URL}/estudiante/login`
        const response = await fetchDataBackend(url, dataForm,'POST')
        setToken(response.token)
        setRol(response.rol)
        if(response){
            navigate('/dashboard')
        }
    }

    return (
        <div className="relative h-screen">

            <ToastContainer />

            {/* Fondo en toda la pantalla (detrás) */}
            <div className="absolute inset-0 bg-no-repeat bg-cover bg-center z-0" style={{ backgroundImage: "url('/public/images/loginBackground.jpg')" }} aria-hidden="true" />
            {/* Capa de overlay suave para mejorar contraste (sólo fondo) */}
            <div className="absolute inset-0 bg-black/30 z-0" aria-hidden="true" />

            {/* Contenedor del formulario centrado (ventana flotante) */}
            <div className="flex items-center justify-center h-full">
                <div className="md:w-4/5 sm:w-full max-w-md rounded-xl shadow-lg p-8 relative z-10" style={{ backgroundColor: 'var(--color-base)' }}>
                    <h1 className="text-3xl font-semibold mb-2 text-center uppercase">Welcome Back</h1>
                    <small className="block my-4 text-sm" style={{ color: 'var(--color-secondary)' }}>Please enter your details</small>

                    <form onSubmit={handleSubmit(loginUser)}>
                        {/* Correo electrónico */}
                        <div className="mb-3">
                            <label className="mb-2 block text-sm font-semibold">Email</label>
                            <input type="email" placeholder="Enter your email" className="block w-full rounded-md border border-gray-300 focus:border-purple-700 focus:outline-none focus:ring-1 focus:ring-purple-700 py-1 px-2 text-gray-500" 
                            {...register("email", { required: "El correo es obligatorio" })}
                            />
                            {errors.email && <p className="text-red-800">{errors.email.message}</p>}
                        </div>

                        {/* Contraseña */}
                        <div className="mb-3 relative">
                            <label className="mb-2 block text-sm font-semibold">Password</label>
                            <div className="relative">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    placeholder="Enter your password"
                                    className="block w-full rounded-md border border-gray-300 focus:border-purple-700 focus:outline-none focus:ring-1 focus:ring-purple-700 py-1 px-1.5 text-gray-500 pr-10"
                                    {...register("password", { required: "La contraseña es obligatoria" })}
                                    />
                                    {errors.password && <p className="text-red-800">{errors.password.message}</p>}
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute top-2 right-3 text-gray-500 hover:text-gray-700"
                                >
                                    {showPassword ? (
                                        <svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.875 18.825A9.956 9.956 0 0112 19c-4.418 0-8.165-2.928-9.53-7a10.005 10.005 0 0119.06 0 9.956 9.956 0 01-1.845 3.35M9.9 14.32a3 3 0 114.2-4.2m.5 3.5l3.8 3.8m-3.8-3.8L5.5 5.5" />
                                        </svg>
                                    ) : (
                                        <svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0zm-9.95 0a9.96 9.96 0 0119.9 0m-19.9 0a9.96 9.96 0 0119.9 0M3 3l18 18" />
                                        </svg>
                                    )}
                                </button>
                            </div>
                        </div>

                        {/* Botón de iniciar sesión */}
                        <button className="py-2 w-full block text-center bg-gray-500 text-slate-300 border rounded-xl 
                            hover:scale-100 duration-300 hover:bg-gray-900 hover:text-white">Iniciar sesión</button>
                    </form>

                    {/* Separador con opción de "O" */}
                    <div className="mt-6 grid grid-cols-3 items-center text-gray-400">
                        <hr className="border-gray-400" />
                        <p className="text-center text-sm">OR</p>
                        <hr className="border-gray-400" />
                    </div>

                    {/* Botón de inicio de sesión con Google */}
                    <button className="border py-2 w-full rounded-xl mt-5 flex justify-center items-center text-sm hover:scale-105 duration-300" style={{ backgroundColor: 'white', color: 'var(--color-primary)', borderColor: 'var(--color-primary)' }}>
                        <img className="w-5 mr-2" src="https://cdn-icons-png.flaticon.com/512/281/281764.png" alt="Google icon" />
                        Sign in with Google
                    </button>

                    {/* Olvidaste tu contraseña */}
                    <div className="mt-5 text-xs border-b-2 py-4">
                        <Link to="/forgot/id" className="underline text-sm hover:text-gray-900" style={{ color: 'var(--color-secondary)' }}>Forgot your password?</Link>
                    </div>

                    {/* Enlaces para volver o registrarse */}
                    <div className="mt-3 text-sm flex justify-between items-center">
                        <Link to="/" className="underline text-sm hover:text-gray-900" style={{ color: 'var(--color-secondary)' }}>Back</Link>
                        <Link to="/register" className="py-2 px-5 border rounded-xl hover:scale-110 duration-300 hover:bg-gray-900 hover:text-white" style={{ backgroundColor: 'var(--color-secondary)', color: 'white' }}>Register</Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;