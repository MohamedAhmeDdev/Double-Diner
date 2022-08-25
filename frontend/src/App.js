import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import AddInventory from './Dashboard/AddInventory';
import AddMenu from './Dashboard/AddMenu';
import AddStaff from './Dashboard/AddStaff';
import Dashboard from './Dashboard/Dashboard'
import Inventory from './Dashboard/Inventory';
import Navbar from './Dashboard/Navbar';
import Reservation from './Dashboard/Reservation';
import UpdateInventory from './Dashboard/UpdateInventory';


function App() {
  return (
    <div>
       <BrowserRouter>
       <Navbar/>
      <Routes>
      <Route  path='/' element={<Dashboard/>} />
      <Route  path='/Inventory' element={<Inventory/>} />
      <Route  path='/Reservation' element={<Reservation/>} />
      <Route  path='/AddInventory' element={<AddInventory/>} />
      <Route  path='/edit/:id' element={<UpdateInventory/>} />
      <Route  path='/AddStaff' element={<AddStaff/>} />
      <Route  path='/AddMenu' element={<AddMenu/>} />
      </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App