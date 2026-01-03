import { useState } from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form"
import { ToastContainer } from 'react-toastify'
import { useFetch } from "../hooks/useFetch"
import loginBackground from '/src/assets/images/loginBackground.jpg'

export const Register = () => {
    const [showPassword, setShowPassword] = useState(false);
    const fetchDataBackend = useFetch()
    const { register, handleSubmit, formState: { errors } } = useForm()
    
    const registerUser = async (dataForm) => {
        const url = `${import.meta.env.VITE_BACKEND_URL}/registro`
        await fetchDataBackend(url, dataForm, "POST")
    }

    return (
        <div className="relative h-screen">

            <ToastContainer />

            {/* Fondo en toda la pantalla (detrás) - usando la imagen de registro */}
            <div className="absolute inset-0 bg-no-repeat bg-cover bg-center z-0" style={{ backgroundImage: `url(${loginBackground})` }} aria-hidden="true" />
            {/* Overlay suave para mejorar contraste (solo fondo) */}
            <div className="absolute inset-0 bg-black/30 z-0" aria-hidden="true" />

            {/* Contenedor centrado del formulario (ventana flotante opaca) */}
            <div className="flex items-center justify-center h-full">
                <div className="md:w-4/5 sm:w-full max-w-md rounded-xl shadow-lg p-8 relative z-10" style={{ backgroundColor: 'var(--color-base)' }}>

                    <h1 className="text-3xl font-semibold mb-2 text-center uppercase">Bienvenido</h1>
                    <small className="block my-4 text-sm" style={{ color: 'var(--color-secondary)' }}>Por favor ingresa tus datos</small>

                    <form onSubmit={handleSubmit(registerUser)}>

                        {/* Campo para nombre */}
                        <div className="mb-3">
                            <label className="mb-2 block text-sm font-semibold">Nombre</label>
                                <input type="text" placeholder="Ingresa tu nombre" className="block w-full rounded-md border border-gray-300 focus:border-purple-700 focus:outline-none focus:ring-1 focus:ring-purple-700 py-1 px-1.5 text-gray-500" 
                            {...register("nombre", { required: "Campo obligatorio" })}
                            />
                            {errors.nombre && <p className="text-red-800 text-xs">{errors.nombre.message}</p>}
                        </div>

                        {/* Campo para apellido */}
                        <div className="mb-3">
                            <label className="mb-2 block text-sm font-semibold">Apellido</label>
                                <input type="text" placeholder="Ingresa tu apellido" className="block w-full rounded-md border border-gray-300 focus:border-purple-700 focus:outline-none focus:ring-1 focus:ring-purple-700 py-1 px-1.5 text-gray-500" 
                            {...register("apellido", { required: "Campo obligatorio" })}
                            />
                            {errors.apellido && <p className="text-red-800 text-xs">{errors.apellido.message}</p>}
                        </div>

                        {/* Campo para dirección */}
                        <div className="mb-3">
                            <label className="mb-2 block text-sm font-semibold">Dirección</label>
                                <input type="text" placeholder="Ingresa tu dirección" className="block w-full rounded-md border border-gray-300 focus:border-purple-700 focus:outline-none focus:ring-1 focus:ring-purple-700 py-1 px-1.5 text-gray-500" 
                            {...register("direccion", { required: "Campo obligatorio" })}
                            />
                            {errors.direccion && <p className="text-red-800 text-xs">{errors.direccion.message}</p>}
                        </div>
                        
                        {/* Campo para celular */}
                        <div className="mb-3">
                            <label className="mb-2 block text-sm font-semibold">Teléfono</label>
                                <input type="tel" placeholder="Ingresa tu número de teléfono" className="block w-full rounded-md border border-gray-300 focus:border-purple-700 focus:outline-none focus:ring-1 focus:ring-purple-700 py-1 px-1.5 text-gray-500" 
                            {...register("celular", { required: "Campo obligatorio" })}
                            />
                            {errors.celular && <p className="text-red-800 text-xs">{errors.celular.message}</p>}
                        </div>

                        {/* Campo para correo electrónico */}
                        <div className="mb-3">
                            <label className="mb-2 block text-sm font-semibold">Correo electrónico</label>
                                <input type="email" placeholder="Ingresa tu correo electrónico" className="block w-full rounded-md border border-gray-300 focus:border-purple-700 focus:outline-none focus:ring-1 focus:ring-purple-700 py-1 px-1.5 text-gray-500" 
                            {...register("email", { required: "Campo obligatorio" })}
                            />
                            {errors.email && <p className="text-red-800 text-xs">{errors.email.message}</p>}
                        </div>

                        {/* Campo para contraseña */}
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

                        {/* Botón para enviar el formulario */}
                        <div className="mb-3">
                            <button className="border py-2 w-full rounded-xl mt-5 hover:scale-105 duration-300 hover:bg-gray-900 hover:text-white" style={{ backgroundColor: 'var(--color-primary)', color: 'white' }}>Registrarse</button>
                        </div>

                    </form>

                    {/* Enlace para iniciar sesión si ya tiene una cuenta */}
                    <div className="mt-3 text-sm flex justify-between items-center">
                        <p style={{ color: 'var(--color-secondary)' }}>¿Ya tienes una cuenta?</p>
                        <Link to="/login" className="py-2 px-5 border rounded-xl hover:scale-110 duration-300 hover:bg-gray-900" style={{ backgroundColor: 'var(--color-secondary)', color: 'white' }}>Iniciar sesión</Link>
                    </div>

                </div>
            </div>
        </div>
    );
};