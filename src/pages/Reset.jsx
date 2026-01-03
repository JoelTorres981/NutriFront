import nutriLogo from '../assets/nutriApp.png'
import { useState } from 'react'
import { useEffect } from 'react'
import {useFetch} from '../hooks/useFetch';
import { ToastContainer } from 'react-toastify'
import { useNavigate, useParams } from 'react-router'
import { useForm } from 'react-hook-form'
import resetBackground from '/src/assets/images/resetBackground.jpg'

const Reset = () => {

    const navigate = useNavigate()
    const { token } = useParams()
    const  fetchDataBackend  = useFetch()
    const [tokenback, setTokenBack] = useState(false)
    const { register, handleSubmit, formState: { errors } } = useForm()

    const changePassword = async (dataForm) => {
        const url = `${import.meta.env.VITE_BACKEND_URL}/nuevopassword/${token}`
        await fetchDataBackend(url, dataForm,'POST')
        setTimeout(() => {
            if (dataForm.password === dataForm.confirmpassword) {
                navigate('/login')
            }
        }, 2000)
    }


    useEffect(() => {
        const verifyToken = async()=>{
            const url = `${import.meta.env.VITE_BACKEND_URL}/recuperarpassword/${token}`
            await fetchDataBackend(url,'GET')
            setTokenBack(true)
        }
        verifyToken()
    }, [])
    

    return (
        <div className="relative h-screen">

            <ToastContainer />

            {/* Fondo en toda la pantalla (detrás) */}
            <div className="absolute inset-0 bg-no-repeat bg-cover bg-center z-0 " style={{ backgroundImage: `url(${resetBackground})` }} aria-hidden="true" />
            {/* Overlay suave para mejorar contraste (solo fondo) */}
            <div className="absolute inset-0 bg-black/30 z-0" aria-hidden="true" />

            {/* Contenedor centrado del contenido en tarjeta opaca */}
            <div className="flex items-center justify-center h-full">
                <div className="max-w-md w-full rounded-xl shadow-lg p-8 relative z-10" style={{ backgroundColor: 'rgba(255,255,255,0.8)' }}>

                    <h1 className="text-3xl font-semibold mb-2 text-center" style={{ color: 'var(--color-primary)' }}>
                        Bienvenido nuevamente
                    </h1>
                    <small className="block my-4 text-sm text-center" style={{ color: 'var(--color-secondary)' }}>
                        Pro favor, ingrese los siguientes datos
                    </small>

                    <img
                        className="mx-auto object-cover h-40 w-40 rounded-full border-4 border-solid border-slate-600"
                        src={nutriLogo}
                        alt="image description"
                    />

                    {tokenback && (

                        <form className="w-full mt-6" onSubmit={handleSubmit(changePassword )}>

                            <div className="mb-1">

                                {/* Campo nueva contraseña */}
                                <label className="mb-2 block text-sm font-semibold">Nueva contraseña</label>
                                <input type="password" placeholder="Ingresa tu nueva contraseña"
                                    className="block w-full rounded-md border border-gray-300 py-1 px-1.5 text-gray-500"
                                    {...register("password", { required: "La contraseña es obligatoria" })}
                                />
                                    {errors.password && <p className="text-red-800">{errors.password.message}</p>}


                                {/* Campo repetir contraseña */}
                                <label className="mb-2 block text-sm font-semibold">Confirmar contraseña</label>
                                <input type="password" placeholder="Repite tu contraseña"
                                    className="block w-full rounded-md border border-gray-300 py-1 px-1.5 text-gray-500"
                                    {...register("confirmpassword", { required: "La contraseña es obligatoria" })}
                                />
                                    {errors.confirmpassword && <p className="text-red-800">{errors.confirmpassword.message}</p>}

                            </div>

                            <div className="mb-3">
                                <button className="bg-primary/80 text-slate-300 border py-2 
                                w-full rounded-xl mt-5 hover:scale-105 duration-300 hover:bg-primary 
                                hover:text-white">
                                    Enviar
                                </button>

                            </div>
                            
                        </form>
                    )}
                </div>
            </div>
        </div>
    )
}

export default Reset
