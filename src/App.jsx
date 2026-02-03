import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Home } from './pages/Home'
import Login from './pages/Login'
import { Register } from './pages/Register'
import Listar from './pages/Listar'
import FoodDetail from './pages/FoodDetail'
import PersonalData from './pages/PersonalData'
import { Confirm } from './pages/Confirm'
import Dashboard from './layout/Dashboard'
import Calendary from './pages/Calendary'
import PublicRoute from './routes/PublicRoute'
import ProtectedRoute from './routes/ProtectedRoute'
import { Forgot } from './pages/Forgot'
import Reset from './pages/Reset'
import { NotFound } from './pages/NotFound'
import Statistics from './pages/Statistics'

import DashboardHome from './pages/DashboardHome'
import AdminManagement from './pages/AdminManagement'
import AdminCRUD from './pages/AdminCRUD'
import StudentList from './pages/StudentList'

import { useEffect } from 'react'
import storeProfile from './context/storeProfile'
import storeAuth from './context/storeAuth'


function App() {
  const { profile } = storeProfile()
  const { token, rol } = storeAuth()

  useEffect(() => {
    if (token && rol !== 'administrador') {
      profile()
    }
  }, [token, rol])



  return (
    <>
      <BrowserRouter>
        <Routes>

          <Route element={<PublicRoute />}>
            <Route index element={<Home />} />
            <Route path='login' element={<Login />} />
            <Route path='register' element={<Register />} />
            <Route path='forgot/:id' element={<Forgot />} />
            <Route path='confirm/:token' element={<Confirm />} />
            <Route path='reset/:token' element={<Reset />} />
            <Route path='recuperarpassword/:token' element={<Reset />} />
            <Route path='*' element={<NotFound />} />
          </Route>

          <Route path='dashboard/*' element={
            <ProtectedRoute>
              <Routes>
                <Route element={<Dashboard />}>
                  <Route index element={<DashboardHome />} />
                  <Route path='listar' element={<Listar />} />
                  <Route path='food/:name' element={<FoodDetail />} />
                  <Route path='calendary' element={<Calendary />} />
                  <Route path='estadisticas' element={<Statistics />} />
                  <Route path='gestion' element={<AdminManagement />} />
                  <Route path='admin-crud' element={<AdminCRUD />} />
                  <Route path='student-list' element={<StudentList />} />
                </Route>
              </Routes>
            </ProtectedRoute>
          } />

        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App