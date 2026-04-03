import './App.css'
import platesjs from './assets/js/data'

import PlateCard from './assets/components/PlateCard'
import PlateFilter from './assets/components/PlateFilter'
import Navigation from './assets/components/Navigation'

import Home from './assets/pages/Home'
import Plates from './assets/pages/Plates'
import PlatesCreate from './assets/pages/PlatesCreate'
import PlateDetails from './assets/pages/PlateDetails'
import Login from './assets/pages/Login'
import Register from './assets/pages/Register'

import axios from 'axios'
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { useState } from 'react'


function App() {

  const [plates , setPlates] = useState(platesjs)
  const [id , setId] = useState(platesjs.length)
  

  function addPlate(newPlate) {
    setPlates(prevPlates => [...prevPlates, newPlate])
    console.log(newPlate)
    
  }

  function idCalcul() {
    setId(id + 1)
  }

  return (
    <>
    <BrowserRouter>
      
      <Routes>
        <Route path="/login" element={<Login/>}/>
        <Route path="/register" element={<Register/>}/>

          <Route element={<Navigation/>}>
            <Route path="/" element={<Home />} />
            <Route path="/home" element={<Home/>} />
            <Route path='/plates' element={<Plates plates={plates}/>}/>
            <Route path='/Plates/create' element={<PlatesCreate addPlate={addPlate} idCalcul={idCalcul} tableNextID={id}/>}/>
            <Route path="/plates/:id" element={<PlateDetails plates={plates}/>} />
          </Route>
        
      </Routes>

    </BrowserRouter>
    </>
  )
}

export default App
