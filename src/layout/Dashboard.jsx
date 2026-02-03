import { Link, Outlet, useLocation } from 'react-router-dom'
import { useState } from 'react'
import { FaUser, FaSearch, FaChartBar } from "react-icons/fa";
import { GrSchedule } from "react-icons/gr";
import nutriAppLogo from '../assets/nutriApp.png'
import storeAuth from '../context/storeAuth'

const Dashboard = () => {
    const location = useLocation()
    const urlActual = location.pathname
    const { clearToken, nombre, rol } = storeAuth()
    const [expanded, setExpanded] = useState(false)
    return (
        <div className='md:flex md:min-h-screen'>

            <div className={`bg-primary/80 px-5 py-4 transition-all duration-300 md:h-screen md:sticky md:top-0 md:overflow-y-auto ${expanded ? 'md:w-64' : 'md:w-20'} w-full`}>

                <div
                    onClick={() => setExpanded(!expanded)}
                    className="cursor-pointer flex flex-col items-center"
                    title="Click to toggle menu"
                >
                    <h2 className={`text-4xl font-jaldi font-bold text-center text-base transition-all duration-300 ${!expanded && 'md:scale-0 md:h-0 md:opacity-0'}`}>NutriApp</h2>

                    <img
                        src={nutriAppLogo}
                        alt="img-client"
                        className={`bg-base transition-all duration-300 border-base rounded-full object-cover hidden md:block ${expanded ? 'm-auto mt-8 p-1 border-2 w-32 h-32' : 'mt-2 p-0.5 border w-10 h-10'}`}
                    />
                    {/* Mobile Logo fallback */}
                    <img
                        src={nutriAppLogo}
                        alt="img-client"
                        className="bg-base m-auto mt-8 p-1 border-2 border-base rounded-full w-32 h-32 md:hidden"
                    />
                </div>

                <div className={`transition-all duration-300 overflow-hidden ${expanded ? 'opacity-100 max-h-20' : 'md:opacity-0 md:max-h-0'}`}>
                    <p className='text-slate-800 text-center my-4 text-sm whitespace-nowrap'> <span className='bg-green-600 w-3 h-3 inline-block rounded-full'></span> Bienvenido </p>
                </div>

                <hr className="mt-5 border-base" />

                {rol === 'estudiante' && (
                    <ul className="mt-5 space-y-2">

                        <li className="text-center">
                            <Link to='/dashboard' className={`${urlActual === '/dashboard' ? 'text-slate-900 bg-secondary' : 'text-slate-600'} text-lg mt-2 hover:text-slate-600 flex items-center gap-3 px-2 py-2 rounded-md ${!expanded && 'md:justify-center'}`}>
                                <FaUser className="text-2xl min-w-[1.5rem]" />
                                <span className={`whitespace-nowrap duration-200 ${!expanded && 'md:hidden'}`}>Información Personal</span>
                            </Link>
                        </li>

                        <li className="text-center">
                            <Link to='/dashboard/listar' className={`${urlActual === '/dashboard/listar' ? 'text-slate-900 bg-secondary' : 'text-slate-600'} text-lg mt-2 hover:text-slate-600 flex items-center gap-3 px-2 py-2 rounded-md ${!expanded && 'md:justify-center'}`}>
                                <FaSearch className="text-2xl min-w-[1.5rem]" />
                                <span className={`whitespace-nowrap duration-200 ${!expanded && 'md:hidden'}`}>Buscar</span>
                            </Link>
                        </li>

                        <li className="text-center">
                            <Link to='/dashboard/calendary' className={`${urlActual === '/dashboard/calendary' ? 'text-slate-900 bg-secondary' : 'text-slate-600'} text-lg mt-2 hover:text-slate-600 flex items-center gap-3 px-2 py-2 rounded-md ${!expanded && 'md:justify-center'}`}>
                                <GrSchedule className="text-2xl min-w-[1.5rem]" />
                                <span className={`whitespace-nowrap duration-200 ${!expanded && 'md:hidden'}`}>Calendario</span>
                            </Link>
                        </li>
                    </ul>
                )}

                {rol === 'administrador' && (
                    <ul className="mt-5 space-y-2">
                        <li className="text-center">
                            <Link to='/dashboard/estadisticas' className={`${urlActual === '/dashboard/estadisticas' ? 'text-slate-900 bg-secondary' : 'text-slate-600'} text-lg mt-2 hover:text-slate-600 flex items-center gap-3 px-2 py-2 rounded-md ${!expanded && 'md:justify-center'}`}>
                                <FaChartBar className="text-2xl min-w-[1.5rem]" />
                                <span className={`whitespace-nowrap duration-200 ${!expanded && 'md:hidden'}`}>Estadísticas</span>
                            </Link>
                        </li>
                    </ul>
                )}

            </div>

            <div className='flex-1 flex flex-col justify-between h-screen bg-gray-100'>
                <div className='bg-primary/80 py-2 flex md:justify-end items-center gap-5 justify-center'>
                    <div className='text-md font-semibold text-slate-100'>
                        Usuario - {nombre}
                    </div>
                    <div>
                        <img src="https://cdn-icons-png.flaticon.com/512/4715/4715329.png" alt="img-client" className="border-2 border-base rounded-full" width={50} height={50} />
                    </div>
                    <div>
                        <Link to='/' className=" text-white mr-3 text-md block hover:bg-red-900 text-center
                        bg-red-800 px-4 py-1 rounded-lg" onClick={() => clearToken()}>Salir</Link>
                    </div>
                </div>
                <div className='overflow-y-scroll p-8'>
                    <Outlet />
                </div>
                <div className='bg-primary/80 h-12'>
                    <p className='text-center  text-slate-100 leading-[2.9rem]'>© 2025 NutriApp. <snap className='font-bold'> All rights reserved.</snap> </p>
                </div>

            </div>



        </div >
    )
}

export default Dashboard