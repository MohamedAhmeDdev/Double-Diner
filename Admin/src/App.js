import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import AddInventory from './Components/AddInventory';
import AddMenu from './Components/AddMenu';
import AddStaff from './Components/AddStaff';
import CustomersOrders from './Components/CustomersOrders';
import Dashboard from './Components/Dashboard'
import FeedBack from './Components/FeedBack';
import Inventory from './Components/Inventory';
import Menu from './Components/Menu';
import Navbar from './Components/Navbar';
import Reservation from './Components/Reservation';
import Staff from './Components/Staff';
import UpdateInventory from './Components/UpdateInventory';
import UpdateMenu from './Components/UpdateMenu';
import UpdateStaff from './Components/UpdateStaff';
import UpdateStatus from './Components/UpdateStatus';
import Login from './Components/Login';


function App() {
  return (
    <div>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path='/Login' element={<Login/>} />
          <Route path='/' element={<Dashboard />} />
          <Route path='/Inventory' element={<Inventory />} />
          <Route path='/Reservation' element={<Reservation />} />
          <Route path='/AddInventory' element={<AddInventory />} />
          <Route path='/updateInventory/:id' element={<UpdateInventory />} />
          <Route path='/AddStaff' element={<AddStaff />} />
          <Route path='/AddMenu' element={<AddMenu />} />
          <Route path='/Staff' element={<Staff />} />
          <Route path='/UpdateStaff/:id' element={<UpdateStaff />} />
          <Route path='/Menu' element={<Menu />} />
          <Route path='/UpdateMenu/:id' element={<UpdateMenu />} />
          <Route path='/CustomersOrders' element={<CustomersOrders/>} />
          <Route path='/UpdateStatus/:id' element={<UpdateStatus/>} />
          <Route path='/FeedBack' element={<FeedBack/>} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App