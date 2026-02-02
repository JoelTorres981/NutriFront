import React, { useState, useEffect } from 'react';
import { FaChevronLeft, FaChevronRight, FaPlus, FaTimes, FaCamera } from 'react-icons/fa';
import storeAuth from '../context/storeAuth';
import axios from 'axios';
import { toast } from 'react-toastify';

const Calendary = () => {
    const { token } = storeAuth();
    const [currentDate, setCurrentDate] = useState(new Date());
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [monthData, setMonthData] = useState([]);
    const [showAddModal, setShowAddModal] = useState(false);
    const [showDayDetail, setShowDayDetail] = useState(false);

    // Form states
    const [scanning, setScanning] = useState(false);
    const [selectedImage, setSelectedImage] = useState(null);
    const [previewUrl, setPreviewUrl] = useState(null);

    // Fetch history
    const fetchHistory = async () => {
        try {
            const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/ai/historial`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            setMonthData(response.data);
            console.log("History loaded:", response.data);
        } catch (error) {
            console.error("Error fetching history:", error);
            toast.error("Error loading calendar data");
        }
    };

    useEffect(() => {
        fetchHistory();
    }, [token]);

    // Calendar logic
    const getDaysInMonth = (date) => {
        return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
    };

    const firstDayOfMonth = (date) => {
        return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
    };

    const prevMonth = () => {
        setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
    };

    const nextMonth = () => {
        setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
    };

    const handleDateClick = (day) => {
        const newDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
        setSelectedDate(newDate);
        setShowDayDetail(true);
    };

    const isSameDay = (date1, date2) => {
        return date1.getDate() === date2.getDate() &&
            date1.getMonth() === date2.getMonth() &&
            date1.getFullYear() === date2.getFullYear();
    };

    const isToday = (day) => {
        const today = new Date();
        return day === today.getDate() &&
            currentDate.getMonth() === today.getMonth() &&
            currentDate.getFullYear() === today.getFullYear();
    };

    const hasMeals = (day) => {
        const checkDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
        return monthData.some(meal => {
            const mealDate = new Date(meal.fecha);
            return isSameDay(mealDate, checkDate);
        });
    };

    // Filter meals for selected day
    const selectedDayMeals = monthData.filter(meal => {
        const mealDate = new Date(meal.fecha);
        return isSameDay(mealDate, selectedDate);
    });

    // Handle Image Upload
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setSelectedImage(file);
            setPreviewUrl(URL.createObjectURL(file));
        }
    };

    // Image Resizing Utility
    const resizeImage = (file) => {
        return new Promise((resolve) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = (event) => {
                const img = new Image();
                img.src = event.target.result;
                img.onload = () => {
                    const canvas = document.createElement('canvas');
                    const MAX_WIDTH = 800;
                    const MAX_HEIGHT = 800;
                    let width = img.width;
                    let height = img.height;

                    if (width > height) {
                        if (width > MAX_WIDTH) {
                            height *= MAX_WIDTH / width;
                            width = MAX_WIDTH;
                        }
                    } else {
                        if (height > MAX_HEIGHT) {
                            width *= MAX_HEIGHT / height;
                            height = MAX_HEIGHT;
                        }
                    }

                    canvas.width = width;
                    canvas.height = height;
                    const ctx = canvas.getContext('2d');
                    ctx.drawImage(img, 0, 0, width, height);

                    canvas.toBlob((blob) => {
                        const resizedFile = new File([blob], file.name.replace(/\.[^/.]+$/, ".jpg"), {
                            type: 'image/jpeg',
                            lastModified: Date.now()
                        });
                        resolve(resizedFile);
                    }, 'image/jpeg', 0.7); // 70% quality JPG
                };
            };
        });
    };

    const handleScan = async () => {
        if (!selectedImage) return toast.warning("Por favor selecciona una imagen primero");

        setScanning(true);

        try {
            toast.info("Optimizando imagen...");
            const resizedImage = await resizeImage(selectedImage);

            const formData = new FormData();
            formData.append('image', resizedImage);

            const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/ai/scan`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': `Bearer ${token}`
                }
            });

            toast.success("Comida escaneada exitosamente!");
            setShowAddModal(false);
            setSelectedImage(null);
            setPreviewUrl(null);
            fetchHistory(); // Refresh calendar
        } catch (error) {
            console.error("Scan error:", error);
            toast.error("Error al analizar la imagen");
        } finally {
            setScanning(false);
        }
    };

    // Render Calendar
    const renderCalendarDays = () => {
        const daysInMonth = getDaysInMonth(currentDate);
        const startDay = firstDayOfMonth(currentDate);
        const days = [];

        for (let i = 0; i < startDay; i++) {
            days.push(<div key={`empty-${i}`} className="h-24 md:h-32 bg-gray-50 border border-gray-100"></div>);
        }

        for (let day = 1; day <= daysInMonth; day++) {
            const hasData = hasMeals(day);
            const today = isToday(day);
            const selected = isSameDay(new Date(currentDate.getFullYear(), currentDate.getMonth(), day), selectedDate);

            days.push(
                <div
                    key={day}
                    onClick={() => handleDateClick(day)}
                    className={`h-24 md:h-32 border border-gray-100 p-2 cursor-pointer transition-colors relative hover:bg-green-50
                        ${today ? 'bg-blue-50' : 'bg-white'}
                        ${selected ? 'ring-2 ring-primary inset-0 z-10' : ''}
                    `}
                >
                    <span className={`text-sm font-semibold rounded-full w-7 h-7 flex items-center justify-center
                        ${today ? 'bg-primary text-white' : 'text-gray-700'}
                    `}>{day}</span>

                    {hasData && (
                        <div className="mt-2 flex gap-1 flex-wrap">
                            <div className="w-2 h-2 rounded-full bg-green-500"></div>
                        </div>
                    )}
                </div>
            );
        }
        return days;
    };


    return (
        <div className="flex h-[calc(100vh-theme(spacing.20))] gap-4 relative">

            {/* Main Calendar Area */}
            <div className="flex-1 overflow-y-auto bg-white rounded-xl shadow-sm p-6">

                {/* Header */}
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-3xl font-jaldi font-bold text-gray-800 capitalize">
                        {`${currentDate.toLocaleString('es-ES', { month: 'long' })} - ${currentDate.getFullYear()}`}
                    </h2>
                    <div className="flex gap-2">
                        <button onClick={prevMonth} className="p-2 hover:bg-gray-100 rounded-full text-gray-600"><FaChevronLeft /></button>
                        <button onClick={() => setCurrentDate(new Date())} className="px-4 py-1 text-sm bg-gray-100 rounded-full hover:bg-gray-200 text-gray-700 font-semibold">Hoy</button>
                        <button onClick={nextMonth} className="p-2 hover:bg-gray-100 rounded-full text-gray-600"><FaChevronRight /></button>
                    </div>
                </div>

                {/* Days Header */}
                <div className="grid grid-cols-7 mb-2 text-center text-gray-500 font-semibold uppercase text-xs tracking-wide">
                    <div>Dom</div>
                    <div>Lun</div>
                    <div>Mar</div>
                    <div>Mié</div>
                    <div>Jue</div>
                    <div>Vie</div>
                    <div>Sáb</div>
                </div>

                {/* Days Grid */}
                <div className="grid grid-cols-7 rounded-lg overflow-hidden border border-gray-200">
                    {renderCalendarDays()}
                </div>

            </div>

            {/* Side Panel (Day Detail) */}
            <div className={`fixed inset-y-0 right-0 w-full md:w-96 bg-white shadow-2xl transform transition-transform duration-300 ease-in-out z-40 overflow-y-auto
                ${showDayDetail ? 'translate-x-0' : 'translate-x-full'} md:relative md:translate-x-0 md:shadow-none md:border-l md:w-80 md:flex md:flex-col
            `}>
                <div className="p-6">
                    <div className="flex justify-between items-center mb-6">
                        <h3 className="text-xl font-bold text-gray-800">
                            {selectedDate.toLocaleDateString('es-ES', { weekday: 'long', day: 'numeric', month: 'long' })}
                        </h3>
                        <div className="flex gap-2">
                            <button
                                onClick={() => setShowAddModal(true)}
                                className="bg-primary text-white p-2 rounded-full hover:bg-primary/90 transition shadow-lg"
                                title="Agregar Comida"
                            >
                                <FaPlus />
                            </button>
                            {/* Close button for mobile overlay */}
                            <button onClick={() => setShowDayDetail(false)} className="md:hidden text-gray-500 p-2"><FaTimes /></button>
                        </div>
                    </div>

                    {selectedDayMeals.length === 0 ? (
                        <div className="text-center py-10 text-gray-400">
                            <p className="text-5xl mb-4">🍽️</p>
                            <p>No hay comidas registradas.</p>
                            <button onClick={() => setShowAddModal(true)} className="mt-4 text-primary font-semibold hover:underline">Agregar una ahora</button>
                        </div>
                    ) : (
                        <div className="space-y-4">
                            {selectedDayMeals.map((meal) => (
                                <MealCard key={meal._id} meal={meal} />
                            ))}
                        </div>
                    )}
                </div>
            </div>

            {/* Add Meal Modal */}
            {showAddModal && (
                <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
                    <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden">
                        <div className="bg-primary p-4 flex justify-between items-center text-white">
                            <h3 className="font-bold text-lg flex items-center gap-2"><FaCamera /> Escanear Comida</h3>
                            <button onClick={() => setShowAddModal(false)} className="hover:bg-white/20 p-1 rounded"><FaTimes /></button>
                        </div>

                        <div className="p-6">
                            <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center cursor-pointer hover:bg-gray-50 transition relative"
                                onClick={() => document.getElementById('fileInput').click()}
                            >
                                {previewUrl ? (
                                    <img src={previewUrl} alt="Preview" className="max-h-64 mx-auto rounded-lg shadow-md object-cover" />
                                ) : (
                                    <div className="text-gray-400">
                                        <FaCamera className="text-4xl mx-auto mb-2" />
                                        <p>Haz clic para subir una imagen</p>
                                    </div>
                                )}
                                <input
                                    type="file"
                                    id="fileInput"
                                    accept="image/png, image/jpeg, image/jpg"
                                    className="hidden"
                                    onChange={handleImageChange}
                                />
                            </div>

                            <button
                                onClick={handleScan}
                                disabled={scanning || !selectedImage}
                                className={`w-full mt-6 py-3 rounded-xl font-bold text-white transition-all
                                    ${scanning || !selectedImage ? 'bg-gray-300 cursor-not-allowed' : 'bg-primary hover:bg-primary/90 shadow-lg hover:shadow-xl'}
                                `}
                            >
                                {scanning ? 'Analizando con IA...' : 'Escanear y Analizar'}
                            </button>
                        </div>
                    </div>
                </div>
            )}

        </div>
    );
};

const MealCard = ({ meal }) => {
    const [expanded, setExpanded] = useState(false);

    return (
        <div
            className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-all cursor-pointer"
            onClick={() => setExpanded(!expanded)}
        >
            <div className="flex p-3 gap-3 items-center">
                <img
                    src={meal.imagenUrl || "https://via.placeholder.com/150"}
                    alt={meal.nombreComida}
                    className="w-16 h-16 rounded-lg object-cover bg-gray-200"
                />
                <div className="flex-1 min-w-0">
                    <h4 className="font-bold text-gray-800 truncate">{meal.nombreComida}</h4>
                    <p className="text-xs text-gray-500">{meal.calorias}</p>
                </div>
            </div>

            <div className={`bg-gray-50 px-4 transition-all duration-300 ease-in-out overflow-hidden ${expanded ? 'max-h-[800px] py-4' : 'max-h-0 py-0'}`}>
                <div className="grid grid-cols-3 gap-2 mb-4 text-center text-xs">
                    <div className="bg-blue-100 p-2 rounded text-blue-800 font-semibold">
                        <span className="block text-[10px] opacity-70">PROT</span>
                        {meal.proteinas}
                    </div>
                    <div className="bg-green-100 p-2 rounded text-green-800 font-semibold">
                        <span className="block text-[10px] opacity-70">CARB</span>
                        {meal.carbohidratos}
                    </div>
                    <div className="bg-yellow-100 p-2 rounded text-yellow-800 font-semibold">
                        <span className="block text-[10px] opacity-70">GRASA</span>
                        {meal.grasas}
                    </div>
                </div>

                {meal.recomendacion && (
                    <div className="text-sm text-gray-600 italic border-l-2 border-primary pl-3 mb-3">
                        <p className="font-semibold text-primary text-xs mb-1">Recomendación de IA:</p>
                        "{meal.recomendacion}"
                    </div>
                )}

                {/* Comida Alternativa */}
                {meal.comidaAlternativa && (
                    <div className="text-sm bg-purple-50 p-2 rounded mb-2 border border-purple-100">
                        <p className="font-bold text-purple-700 text-xs flex items-center gap-1">
                            🥗 Alternativa Saludable:
                        </p>
                        <p className="text-gray-700 mt-1">{meal.comidaAlternativa}</p>
                    </div>
                )}

                {/* Análisis de Costo */}
                {meal.analisisCosto && (
                    <div className="text-sm bg-yellow-50 p-2 rounded border border-yellow-100">
                        <p className="font-bold text-yellow-700 text-xs flex items-center gap-1">
                            💰 Precio Aprox / Análisis:
                        </p>
                        <p className="text-gray-700 mt-1">{meal.analisisCosto}</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Calendary;
