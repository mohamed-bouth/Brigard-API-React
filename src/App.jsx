import './App.css'

import Navigation from './assets/components/Navigation'
import { PlatesProvider } from './assets/context/platesContext'

import Home from './assets/pages/Home'
import Plates from './assets/pages/Plates'
import PlateDetails from './assets/pages/PlateDetails'
import Login from './assets/pages/Login'
import Register from './assets/pages/Register'
import Profile from './assets/pages/Profile'
import ProtectedRoute from './routes/ProtectedRoute'

import { BrowserRouter, Routes, Route } from "react-router-dom";



function App() {
  return (
    <BrowserRouter>
      
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
        <PlatesProvider>
          <ProtectedRoute>
        <Routes>
          <Route element={<Navigation />}>
            <Route path="/" element={<Home />} />
            <Route path="/home" element={<Home />} />
            <Route path="/plates" element={<Plates />} />
            <Route path="/plates/:id" element={<PlateDetails />} />
            <Route path="/profile" element={<Profile />}/>
          </Route>
        </Routes>
        </ProtectedRoute>
      </PlatesProvider>
    </BrowserRouter>
  )
}

export default App