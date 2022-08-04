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
import Policy from './Components/Policy';
import Terms from './Components/Terms';
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
      <Route path="/Policy" element={<Policy/>} />
      <Route path="/Terms" element={<Terms/>} />
      </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App