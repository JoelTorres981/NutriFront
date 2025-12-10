import nutriAppPhone from '../assets/nutriAppPhone.jpeg'
import nutriApp from '../assets/nutriApp.png'
import { LuBotMessageSquare } from "react-icons/lu";
import { BiScan } from "react-icons/bi";
import { GrSchedule } from "react-icons/gr";

import { FaBalanceScaleRight } from "react-icons/fa";
import { FaCameraRetro } from "react-icons/fa";
import { TbToolsKitchen2 } from "react-icons/tb";

import { Link } from 'react-router-dom'
import { MdDashboard } from "react-icons/md";
import { FaRobot } from "react-icons/fa";
import { FaCommentSms } from "react-icons/fa6";
import { FaUserDoctor } from "react-icons/fa6";
import { FaFacebook } from "react-icons/fa";
import { FaSquareInstagram } from "react-icons/fa6";
import { FaXTwitter } from "react-icons/fa6";


export const Home = () => {
    return (
        <>
            <header className="container mx-auto h-40 text-center py-4 md:flex justify-between items-center px-4 md:h-15">
                <h1 className='font-jaldi font-extrabold text-xl my-2 text-primary/80'>Nutri<span className='text-black'>App</span></h1>
                <ul className='flex gap-5 justify-center my-4 flex-wrap'>
                    <li><a href="#" className='font-bold hover:text-primary hover:scale-110 hover:text-xl'>Home</a></li>
                    <li><a href="#" className='font-bold hover:text-primary hover:scale-110 hover:text-xl'>About US</a></li>
                    <li><a href="#" className='font-bold hover:text-primary hover:scale-110 hover:text-xl'>Contact</a></li>
                    <li><a href="#" className='font-bold hover:text-primary hover:scale-110 hover:text-xl'>Services</a></li>                   
                </ul>
            </header>



            <main className='relative flex flex-col text-center justify-center px-8 h-screen overflow-hidden items-center'> 
                <div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-1/2 rounded-3xl bg-gradient-to-b from-primary to-accent 
                    opacity-70 blur-3xl -z-0 pointer-events-none'></div>

                <div className='relative z-10 items-center justify-center'>

                    <h2 className='italic text-2xl text-gray-500'> Transforming your diet with intelligence</h2>
                    <h1 className='font-jaldi font-extrabold text-5xl'> Eat better, not less</h1>

                    <p className='m-4'>
                        The system provides personalized nutritional plans based on individual needs and preferences. 
                        <br/> and monitors progress through an intuitive interface.</p>
                        
                    <Link to="/login" href="#" className='inline-block border-primary border bg-transparent w-40 py-2 mx-auto text-black rounded-3xl text-center sm:mx-0 hover:bg-secondary m-4'>Get started</Link>

                    <img src={nutriApp} className='w-64 md:w-100 object-contain mx-auto'></img>
                </div>
            </main>


            <section className='container mx-auto px-4'>

                <div className='container mx-auto relative mt-6'>
                    <h2 className='font-semibold text-3xl relative z-1 w-50 text-center mx-auto bg-white'>ABOUT US</h2>
                    <div className='text-primary border-2 absolute top-1/2 w-full z-0' />
                </div>

                <div className='my-10 flex flex-col gap-10 items-center sm:flex-row sm:justify-around sm:items-center'>

                    <div className='sm:w-1/2'>
                        <img src={nutriAppPhone} alt="App Store" className='w-[500px] mx-auto object-contain' />
                    </div>

                    <div className='px-10 sm:w-1/2'>
                        <p className='my-4'>NutriApp is the first software on the market that includes
                        </p>
                        <ul className='space-y-4'>
                            <li>
                                <MdDashboard className='inline text-2xl mr-2' />
                                Administrative Dashboard
                            </li>
                            <li>
                                <FaRobot className='inline text-2xl mr-2' />
                                Artificial intelligence
                            </li>
                            <li>
                                <FaCommentSms className='inline text-2xl mr-2' />
                                Realtime chat
                            </li>
                            <li>
                                <LuBotMessageSquare className='inline text-2xl mr-2' />
                                ChatBot
                            </li>
                            <li>
                                <BiScan className='inline text-2xl mr-2' />
                                Food recognition via image
                            </li>
                            <li>
                                <GrSchedule className='inline text-2xl mr-2' />
                                Schedule management
                            </li>
                        </ul>
                        <p className='my-4'>And other features that leverage the modern technologies</p>
                    </div>

                </div>

            </section>

            <section className='container mx-auto px-4'>

                <div className='container mx-auto relative mt-6'>
                    <h2 className='font-semibold text-3xl relative z-1 w-50 text-center mx-auto bg-white'>SERVICES</h2>
                    <div className='text-primary border-2 absolute top-1/2 w-full z-0' />
                </div>

                <div className='my-10 flex justify-between flex-wrap gap-5'>

                    <div className="text-center shadow-[0.1rem_0.1rem_1rem_rgba(0,0,0,0.3)] hover:shadow-[0.1rem_0.1rem_1rem_rgba(0,0,0,0.5)] transition-shadow duration-300 relative pt-4 sm:flex-1">
                        <FaBalanceScaleRight className='inline text-5xl' />
                        <h4 className="text-xl font-jaldi py-4 text-primary hover:font-bold">Calculadora Nutricional</h4>
                        <p className="my-4 px-2">Controla de manera precisa las calorias, proteinas y grasas para alcanzar objetivos 
                            de salud esperados.<br/><br/></p>
                        <hr className="border-1 border-primary absolute w-full" />
                    </div>

                    <div className="text-center shadow-[0.1rem_0.1rem_1rem_rgba(0,0,0,0.3)] hover:shadow-[0.1rem_0.1rem_1rem_rgba(0,0,0,0.5)] transition-shadow duration-300 relative pt-4 sm:flex-1">
                        <FaCameraRetro className='inline text-5xl' />
                        <h4 className="text-xl font-jaldi py-4 text-primary hover:font-bold">Reconocimiento Visual de Alimentos</h4>
                        <p className="my-4 px-2">Se registra el valor nutricional de la comida al instante con una foto y guardado en calendario
                            para planes de alimentacion a lo largo de la semana.</p>
                        <hr className="border-1 border-primary absolute w-full" />
                    </div>

                    <div className="text-center shadow-[0.1rem_0.1rem_1rem_rgba(0,0,0,0.3)] hover:shadow-[0.1rem_0.1rem_1rem_rgba(0,0,0,0.5)] transition-shadow duration-300 relative pt-4 sm:flex-1">
                        <TbToolsKitchen2 className='inline text-5xl' />
                        <h4 className="text-xl font-jaldi py-4 text-primary hover:font-bold">Habilidades en cocina</h4>
                        <p className="my-4 px-2">Accede a una biblioteca de recetas saludables y deliciosas, que te ayuda a mejorar tus
                            tus habilidades culinarias y aprende a combinar alimentos de forma nutritiva y efectiva.</p>
                        <hr className="border-1 border-primary absolute w-full" />
                    </div>

                    <div className="text-center shadow-[0.1rem_0.1rem_1rem_rgba(0,0,0,0.3)] hover:shadow-[0.1rem_0.1rem_1rem_rgba(0,0,0,0.5)] transition-shadow duration-300 relative pt-4 sm:flex-1">
                        <FaUserDoctor className='inline text-5xl' />
                        <h4 className="text-xl font-jaldi py-4 text-primary hover:font-bold">Metas de Salud</h4>
                        <p className="my-4 px-2">Recibe orientacion y recomendaciones para un cuidado personal y alimenticio.<br/><br/><br/></p>
                        <hr className="border-1 border-primary absolute w-full" />
                    </div>                    
                </div>
            </section>


            <footer className='text-center bg-primary/10 p-6 sm:px-20 sm:py-10 mt-20 rounded-tr-3xl rounded-tl-3xl space-y-8'>

                <div className='flex justify-between items-center'>
                    <div className='text-3xl font-extrabold text-primary'>Contact US</div>
                    <ul className='flex gap-4'>
                        <li><FaFacebook className='text-2xl' /></li>
                        <li><FaSquareInstagram className='text-2xl' /></li>
                        <li><FaXTwitter className='text-2xl' /></li>
                    </ul>
                </div>

                <div className='flex justify-between items-center'>
                    <div className='text-left'>
                        <p className='font-bold my-2'>Email: admin@vet.com</p>
                        <p className='font-bold'>Phone: 0995644186</p>
                    </div>
                    
                </div>

                <hr className='border-1 border-primary' />

                <p className='font-semibold'>
                    copyright - © - NUTRIAPP
                </p>
            </footer>

        </>
    )
}