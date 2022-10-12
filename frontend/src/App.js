import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import AddInventory from './Dashboard/AddInventory';
import AddMenu from './Dashboard/AddMenu';
import AddStaff from './Dashboard/AddStaff';
import CustomersOrders from './Dashboard/CustomersOrders';
import Dashboard from './Dashboard/Dashboard'
import FeedBack from './Dashboard/FeedBack';
import Inventory from './Dashboard/Inventory';
import Menu from './Dashboard/Menu';
import Navbar from './Dashboard/Navbar';
import Register from './Dashboard/Register';
import Reservation from './Dashboard/Reservation';
import Staff from './Dashboard/Staff';
import UpdateInventory from './Dashboard/UpdateInventory';
import UpdateMenu from './Dashboard/UpdateMenu';
import UpdateStaff from './Dashboard/UpdateStaff';
import UpdateStatus from './Dashboard/UpdateStatus';
import Login from './Dashboard/Login';


function App() {
  return (
    <div>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path='/Login' element={<Login/>} />
          <Route path='/Register' element={<Register/>} />
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