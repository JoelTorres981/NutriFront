import { useState, useEffect } from 'react';
import axios from 'axios';
import { FaPlus, FaTrash, FaUtensils } from 'react-icons/fa';
import storeAuth from '../context/storeAuth';

const MealPlanning = () => {
    const [plans, setPlans] = useState([]);
    const [loading, setLoading] = useState(false);
    const [deleteMode, setDeleteMode] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [selectedPlanId, setSelectedPlanId] = useState(null);
    const { token } = storeAuth();

    const fetchPlans = async () => {
        try {
            const url = `${import.meta.env.VITE_BACKEND_URL}/ai/plan`;
            const options = {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                }
            };
            const response = await axios.get(url, options);
            setPlans(response.data);
        } catch (error) {
            console.error("Error fetching plans:", error);
        }
    };

    useEffect(() => {
        fetchPlans();
    }, []);

    const handleGenerate = async () => {
        setLoading(true);
        try {
            const url = `${import.meta.env.VITE_BACKEND_URL}/ai/plan`;
            const options = {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                }
            };
            await axios.post(url, {}, options);
            await fetchPlans(); // Refresh list
        } catch (error) {
            console.error("Error generating plan:", error);
            alert("Hubo un error al generar la planificación. Inténtalo de nuevo.");
        } finally {
            setLoading(false);
        }
    };

    const confirmDelete = (id) => {
        setSelectedPlanId(id);
        setShowModal(true);
    };

    const handleDelete = async () => {
        if (!selectedPlanId) return;

        try {
            const url = `${import.meta.env.VITE_BACKEND_URL}/ai/plan/${selectedPlanId}`;
            const options = {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                }
            };
            await axios.delete(url, options);
            setPlans(plans.filter(plan => plan._id !== selectedPlanId));
            setShowModal(false);
            setSelectedPlanId(null);
        } catch (error) {
            console.error("Error deleting plan:", error);
        }
    };

    return (
        <div className="p-6">
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold text-gray-800 flex items-center gap-2">
                    <FaUtensils className="text-primary" /> Planificación de Comidas
                </h1>
                <div className="flex gap-4">
                    <button
                        onClick={() => setDeleteMode(!deleteMode)}
                        className={`px-4 py-2 rounded-lg font-semibold transition-colors flex items-center gap-2 border ${deleteMode ? 'bg-red-100 text-red-600 border-red-300' : 'bg-white text-gray-600 border-gray-300 hover:bg-gray-50'
                            }`}
                    >
                        <FaTrash /> {deleteMode ? 'Cancelar' : 'Eliminar'}
                    </button>
                    <button
                        onClick={handleGenerate}
                        disabled={loading}
                        className={`px-6 py-2 rounded-lg font-bold text-white shadow-md transition-all flex items-center gap-2 ${loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-primary hover:bg-primary-dark'
                            }`}
                    >
                        {loading ? 'Generando...' : <><FaPlus /> Agregar Plan</>}
                    </button>
                </div>
            </div>

            {loading && (
                <div className="flex justify-center items-center py-10">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
                    <span className="ml-3 text-lg text-gray-600">La IA está diseñando tu menú...</span>
                </div>
            )}

            {!loading && plans.length === 0 && (
                <div className="text-center py-20 bg-white rounded-xl shadow-sm border border-gray-100">
                    <div className="text-6xl text-gray-200 mb-4">🍽️</div>
                    <h3 className="text-xl font-medium text-gray-500">No tienes planificaciones guardadas</h3>
                    <p className="text-gray-400 mt-2">Haz clic en "Agregar Plan" para que la IA genere un menú para ti.</p>
                </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {plans.map((plan) => (
                    <div key={plan._id} className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100 relative group hover:shadow-lg transition-shadow">
                        {deleteMode && (
                            <button
                                onClick={() => confirmDelete(plan._id)}
                                className="absolute top-2 right-2 bg-red-500 text-white p-2 rounded-full shadow-md hover:bg-red-600 transition-transform hover:scale-110 z-10"
                                title="Eliminar tarjeta"
                            >
                                <FaTrash size={14} />
                            </button>
                        )}

                        <div className="bg-secondary/10 p-4 border-b border-secondary/20 flex justify-between items-center">
                            <span className="font-bold text-gray-700">
                                {new Date(plan.createdAt).toLocaleDateString('es-ES', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                            </span>
                        </div>

                        <div className="p-4 space-y-4">
                            <div className="flex items-start gap-3">
                                <div className="bg-orange-100 p-2 rounded-lg text-orange-600 min-w-[3rem] text-center text-xs font-bold">
                                    {plan.desayuno.hora}
                                </div>
                                <div>
                                    <h4 className="font-bold text-gray-800 text-sm uppercase tracking-wide text-xs text-orange-600 mb-1">Desayuno</h4>
                                    <p className="text-gray-600 text-sm leading-snug">{plan.desayuno.alimento}</p>
                                </div>
                            </div>

                            <hr className="border-gray-100" />

                            <div className="flex items-start gap-3">
                                <div className="bg-green-100 p-2 rounded-lg text-green-600 min-w-[3rem] text-center text-xs font-bold">
                                    {plan.almuerzo.hora}
                                </div>
                                <div>
                                    <h4 className="font-bold text-gray-800 text-sm uppercase tracking-wide text-xs text-green-600 mb-1">Almuerzo</h4>
                                    <p className="text-gray-600 text-sm leading-snug">{plan.almuerzo.alimento}</p>
                                </div>
                            </div>

                            <hr className="border-gray-100" />

                            <div className="flex items-start gap-3">
                                <div className="bg-blue-100 p-2 rounded-lg text-blue-600 min-w-[3rem] text-center text-xs font-bold">
                                    {plan.cena.hora}
                                </div>
                                <div>
                                    <h4 className="font-bold text-gray-800 text-sm uppercase tracking-wide text-xs text-blue-600 mb-1">Cena</h4>
                                    <p className="text-gray-600 text-sm leading-snug">{plan.cena.alimento}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Modal de Confirmación */}
            {showModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-xl shadow-2xl max-w-sm w-full overflow-hidden transform transition-all scale-100">
                        <div className="p-6 text-center">
                            <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100 mb-4">
                                <FaTrash className="h-6 w-6 text-red-600" />
                            </div>
                            <h3 className="text-lg leading-6 font-medium text-gray-900">¿Eliminar planificación?</h3>
                            <p className="text-sm text-gray-500 mt-2">
                                ¿Estás seguro de que quieres eliminar esta planificación? Esta acción no se puede deshacer.
                            </p>
                        </div>
                        <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse gap-2">
                            <button
                                type="button"
                                onClick={handleDelete}
                                className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
                            >
                                Aceptar
                            </button>
                            <button
                                type="button"
                                onClick={() => setShowModal(false)}
                                className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                            >
                                Cancelar
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default MealPlanning;
