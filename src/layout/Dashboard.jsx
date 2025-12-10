import { Link, Outlet, useLocation } from 'react-router-dom'
import nutriAppLogo from '../assets/nutriApp.png'
import storeAuth from '../context/storeAuth'

const Dashboard = () => {
    const location = useLocation()
    const urlActual = location.pathname
    const { clearToken } = storeAuth()
    return (
        <div className='md:flex md:min-h-screen'>

            <div className='md:w-1/5 bg-primary/80 px-5 py-4'>

                <h2 className='text-4xl font-jaldi font-bold text-center text-base'>NutriApp</h2>

                <img src={nutriAppLogo} alt="img-client" className="bg-base m-auto mt-8 p-1 border-2 border-base rounded-full" width={120} height={120} />
                <p className='text-slate-800 text-center my-4 text-sm'> <span className='bg-green-600 w-3 h-3 inline-block rounded-full'></span> Welcome </p>
                <hr className="mt-5 border-base" />

                <ul className="mt-5">

                    <li className="text-center">
                        <Link to='/dashboard' className={`${urlActual === '/dashboard' ? 'text-slate-900 bg-secondary px-3 py-2 rounded-md text-center' : 'text-slate-600'} text-xl block mt-2 hover:text-slate-600`}>Personal Information</Link>
                    </li>

                    <li className="text-center">
                        <Link to='/dashboard/listar' className={`${urlActual === '/dashboard/listar' ? 'text-slate-900 bg-secondary px-3 py-2 rounded-md text-center' : 'text-slate-600'} text-xl block mt-2 hover:text-slate-600`}>Search</Link>
                    </li>
                </ul>

            </div>

            <div className='flex-1 flex flex-col justify-between h-screen bg-gray-100'>
                <div className='bg-primary/80 py-2 flex md:justify-end items-center gap-5 justify-center'>
                    <div className='text-md font-semibold text-slate-100'>
                        User - 
                    </div>
                    <div>
                        <img src="https://cdn-icons-png.flaticon.com/512/4715/4715329.png" alt="img-client" className="border-2 border-base rounded-full" width={50} height={50} />
                    </div>
                    <div>
                        <Link to='/' className=" text-white mr-3 text-md block hover:bg-red-900 text-center
                        bg-red-800 px-4 py-1 rounded-lg" onClick={() => clearToken()}>Exit</Link>
                    </div>
                </div>
                <div className='overflow-y-scroll p-8'>
                    <Outlet />
                </div>
                <div className='bg-primary/80 h-12'>
                    <p className='text-center  text-slate-100 leading-[2.9rem]'>© 2025 NutriApp. <snap className='font-bold'> All rights reserved.</snap> </p>
                </div>

            </div>



        </div>
    )
}

export default Dashboard