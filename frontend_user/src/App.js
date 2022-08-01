import React from 'react'
import Home from './Components/Home'
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import Navbar from './Components/Navbar';
import Reservaton from './Components/Reservaton';

function App() {
  return (
    <div>
      <BrowserRouter>
      <Navbar/>
      <Routes>
      <Route path="/" element={<Home/>} />
      <Route path="/Reservation" element={<Reservaton/>} />
      </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App