import { useState } from 'react'
import './App.css'
import NavBar from './components/NavBar.jsx'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home.jsx'
import Contactus from './pages/Contactus.jsx'
import About from './pages/About.jsx'

function App() {

  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/contact-us" element={<Contactus/>} />
        <Route path="/about" element={<About />} />
      </Routes>
    </>
  )
}

export default App
