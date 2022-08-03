import React from 'react'
import Home from './Components/Menu'
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import Navbar from './Components/Navbar';
import Reservaton from './Components/Reservaton';
import Contact from './Components/Contact';
// import Footer from './Components/Footer';

function App() {
  return (
    <div>
      <BrowserRouter>
      <Navbar/>
      <Routes>
      <Route path="/" element={<Home/>} />
      <Route path="/Reservation" element={<Reservaton/>} />
      <Route path="/Contact" element={<Contact/>} />
      {/* <Route path="/footer" element={<Footer/>} /> */}
      </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App