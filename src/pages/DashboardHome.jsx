import { Navigate } from 'react-router-dom'
import storeAuth from '../context/storeAuth'
import PersonalData from './PersonalData'

const DashboardHome = () => {
    const { rol } = storeAuth()

    if (rol === 'administrador') {
        return <Navigate to="/dashboard/estadisticas" replace />
    }

    return <PersonalData />
}

export default DashboardHome
