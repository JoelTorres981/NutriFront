import { FaSave, FaTimes, FaUser, FaHeartbeat, FaRunning, FaWallet, FaIdCard, FaUtensils } from 'react-icons/fa'

const ProfileForm = ({ formData, handleChange, handleSubmit, saving, onCancel }) => {
    return (
        <form onSubmit={handleSubmit} className='bg-white p-8 rounded-2xl shadow-xl animate-fadeIn'>
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-gray-700">Actualizar Perfil Completo</h2>
                <button
                    type="button"
                    onClick={onCancel}
                    className="text-gray-400 hover:text-gray-600"
                >
                    <FaTimes size={24} />
                </button>
            </div>

            {/* Sección: Datos de Cuenta */}
            <fieldset className="mb-6 border border-gray-200 p-5 rounded-xl bg-gray-50/50">
                <legend className="text-sm font-bold text-primary px-2 uppercase flex items-center gap-2"><FaUser /> Datos de Cuenta</legend>
                <div className="grid md:grid-cols-2 gap-5 mb-4">
                    <InputGroup label="Nombre" name="nombre" value={formData.nombre} onChange={handleChange} />
                    <InputGroup label="Apellido" name="apellido" value={formData.apellido} onChange={handleChange} />
                </div>
                <div className="grid md:grid-cols-2 gap-5">
                    <InputGroup label="Email" name="email" type="email" value={formData.email} onChange={handleChange} />
                    <InputGroup label="Celular" name="celular" value={formData.celular} onChange={handleChange} />
                </div>
            </fieldset>

            {/* Sección: Datos Personales */}
            <fieldset className="mb-6 border border-gray-200 p-5 rounded-xl">
                <legend className="text-sm font-bold text-primary px-2 uppercase flex items-center gap-2"><FaIdCard /> Info. Personal</legend>
                <div className="grid md:grid-cols-2 gap-5">
                    <InputGroup label="Fecha de Nacimiento" name="fechaNacimiento" type="date" value={formData.fechaNacimiento} onChange={handleChange} />
                    <div>
                        <label className="mb-2 block text-sm font-semibold text-gray-700">Sexo</label>
                        <select name="sexo" value={formData.sexo} onChange={handleChange} className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-primary/50 outline-none">
                            <option value="">Seleccionar</option>
                            <option value="masculino">Masculino</option>
                            <option value="femenino">Femenino</option>
                            <option value="otro">Otro</option>
                        </select>
                    </div>
                </div>
            </fieldset>

            {/* Sección: Salud y Cuerpo */}
            <fieldset className="mb-6 border border-gray-200 p-5 rounded-xl">
                <legend className="text-sm font-bold text-primary px-2 uppercase flex items-center gap-2"><FaHeartbeat /> Salud Física</legend>
                <div className="grid md:grid-cols-2 gap-5 mb-4">
                    <InputGroup label="Estatura (cm)" name="estatura" type="number" value={formData.estatura} onChange={handleChange} placeholder="Ej: 175" />
                    <InputGroup label="Peso (kg)" name="peso" type="number" step="0.1" value={formData.peso} onChange={handleChange} placeholder="Ej: 70.5" />
                </div>
                <div className="grid md:grid-cols-2 gap-5 mb-4">
                    <InputGroup label="Enfermedades / Condiciones (Opcional)" name="enfermedades" value={formData.enfermedades} onChange={handleChange} placeholder="Ej: Diabetes, Hipertensión..." />
                    <InputGroup label="Medicamentos (Opcional)" name="medicamentos" value={formData.medicamentos} onChange={handleChange} placeholder="Ej: Insulina..." />
                </div>
                <div className="mb-4">
                    <label className="mb-2 block text-sm font-semibold text-gray-700">Alergias Alimentarias (Opcional)</label>
                    <textarea name="alergias" value={formData.alergias} onChange={handleChange} className="w-full border border-gray-300 rounded-lg p-2 h-20 focus:ring-2 focus:ring-primary/50 outline-none" placeholder="Ej: Nueces, mariscos, gluten..." />
                </div>
            </fieldset>

            {/* Sección: Estilo de Vida */}
            <fieldset className="mb-6 border border-gray-200 p-5 rounded-xl">
                <legend className="text-sm font-bold text-primary px-2 uppercase flex items-center gap-2"><FaRunning /> Estilo de Vida</legend>
                <div className="grid md:grid-cols-2 gap-5 mb-4">
                    <div>
                        <label className="mb-2 block text-sm font-semibold text-gray-700">Actividad Física</label>
                        <select name="actividadFisica" value={formData.actividadFisica} onChange={handleChange} className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-primary/50 outline-none">
                            <option value="">Seleccionar</option>
                            <option value="sedentario">Sedentario</option>
                            <option value="ligera">Ligera (1-3 días)</option>
                            <option value="moderada">Moderada (3-5 días)</option>
                            <option value="intensa">Intensa (6-7 días)</option>
                        </select>
                    </div>
                    <div>
                        <label className="mb-2 block text-sm font-semibold text-gray-700">Objetivo (Opcional)</label>
                        <select name="objetivo" value={formData.objetivo} onChange={handleChange} className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-primary/50 outline-none">
                            <option value="">Seleccionar</option>
                            <option value="perder_peso">Perder Peso</option>
                            <option value="mantener_peso">Mantener Peso</option>
                            <option value="ganar_musculo">Ganar Músculo</option>
                            <option value="mejorar_salud">Mejorar Salud</option>
                        </select>
                    </div>
                </div>

                <div className="grid md:grid-cols-3 gap-5 mb-4">
                    <InputGroup label="Consumo Agua (litros) (Opcional)" name="consumoAgua" type="number" step="0.1" value={formData.consumoAgua} onChange={handleChange} />
                    <InputGroup label="Horas de Sueño (Opcional)" name="horasSueno" type="number" value={formData.horasSueno} onChange={handleChange} />
                    <InputGroup label="Nivel Estrés (1-10) (Opcional)" name="nivelEstres" type="number" min="1" max="10" value={formData.nivelEstres} onChange={handleChange} />
                </div>
            </fieldset>

            {/* Sección: Dieta y Economía */}
            <fieldset className="mb-8 border border-gray-200 p-5 rounded-xl">
                <legend className="text-sm font-bold text-primary px-2 uppercase flex items-center gap-2"><FaUtensils /> Dieta y Economía</legend>
                <div className="grid md:grid-cols-2 gap-5 mb-4">
                    <div>
                        <label className="mb-2 block text-sm font-semibold text-gray-700">Tipo de Dieta</label>
                        <select name="dieta" value={formData.dieta} onChange={handleChange} className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-primary/50 outline-none">
                            <option value="">Seleccionar</option>
                            <option value="omnivoro">Omnívoro</option>
                            <option value="vegetariano">Vegetariano</option>
                            <option value="vegano">Vegano</option>
                            <option value="keto">Keto</option>
                            <option value="paleo">Paleo</option>
                        </select>
                    </div>
                    <InputGroup label="Comidas al día" name="comidasAlDia" type="number" value={formData.comidasAlDia} onChange={handleChange} />
                </div>
                <div className="grid md:grid-cols-2 gap-5 mb-4">
                    <InputGroup label="Presupuesto Semanal ($) (Opcional)" name="presupuesto" type="number" value={formData.presupuesto} onChange={handleChange} placeholder="Ej: 50" />
                    <div>
                        <label className="mb-2 block text-sm font-semibold text-gray-700">Frecuencia de Compra</label>
                        <select name="frecuenciaCompra" value={formData.frecuenciaCompra} onChange={handleChange} className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-primary/50 outline-none">
                            <option value="">Seleccionar</option>
                            <option value="diaria">Diaria</option>
                            <option value="semanal">Semanal</option>
                            <option value="quincenal">Quincenal</option>
                            <option value="mensual">Mensual</option>
                        </select>
                    </div>
                </div>

                <div className="mb-4">
                    <label className="mb-2 block text-sm font-semibold text-gray-700">Preferencias Alimenticias (Opcional)</label>
                    <textarea name="preferencias" value={formData.preferencias} onChange={handleChange} className="w-full border border-gray-300 rounded-lg p-2 h-20 focus:ring-2 focus:ring-primary/50 outline-none" placeholder="Ej: Me gusta mucho el pollo, no me gusta el brócoli..." />
                </div>
            </fieldset>


            {/* Action Buttons */}
            <div className="flex gap-4 sticky bottom-4 bg-white p-4 shadow-lg rounded-xl border border-gray-100 z-10">
                <button
                    type="button"
                    onClick={onCancel}
                    className="flex-1 py-3 text-gray-600 font-bold hover:bg-gray-100 rounded-xl transition"
                >
                    Cancelar
                </button>
                <button
                    type="submit"
                    disabled={saving}
                    className={`flex-1 py-3 bg-secondary text-white font-bold rounded-xl shadow-lg transition-all duration-200 transform flex justify-center items-center gap-2
                        ${saving ? 'opacity-70 cursor-not-allowed' : 'hover:bg-secondary/90 hover:scale-105 active:scale-95 active:bg-secondary/100'}
                    `}
                    style={{ backgroundColor: 'var(--color-primary)', color: 'white' }}>
                    {saving ? (
                        <>
                            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                            Guardando...
                        </>
                    ) : (
                        <>
                            <FaSave /> Guardar
                        </>
                    )}
                </button>
            </div>
        </form>
    )
}

const InputGroup = ({ label, name, type = "text", value, onChange, placeholder, step, min, max }) => (
    <div>
        <label className="mb-2 block text-sm font-semibold text-gray-700">{label}</label>
        <input
            type={type}
            name={name}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            step={step}
            min={min}
            max={max}
            className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-secondary/50 outline-none transition"
        />
    </div>
)

export default ProfileForm
