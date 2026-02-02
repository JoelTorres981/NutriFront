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

import { useEffect } from 'react'
import storeProfile from './context/storeProfile'
import storeAuth from './context/storeAuth'


function App() {
  const { profile } = storeProfile()
  const { token } = storeAuth()

  useEffect(() => {
    if (token) {
      profile()
    }
  }, [token])



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
            <Route path='*' element={<NotFound />} />
          </Route>

          <Route path='dashboard/*' element={
            <ProtectedRoute>
              <Routes>
                <Route element={<Dashboard />}>
                  <Route index element={<PersonalData />} />
                  <Route path='listar' element={<Listar />} />
                  <Route path='food/:name' element={<FoodDetail />} />
                  <Route path='calendary' element={<Calendary />} />
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