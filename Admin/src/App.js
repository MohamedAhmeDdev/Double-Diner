import React from 'react'
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import AddInventory from './Components/AddInventory';
import AddMenu from './Components/AddMenu';
import AddStaff from './Components/AddStaff';
import CustomersOrders from './Components/CustomersOrders';
import Dashboard from './Components/Dashboard'
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
import { UseAuthContext } from './hook/UseAuthContext';


function App() {
  const {user} = UseAuthContext()


  return (
    <div>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path='/Login' element={!user? <Login/> :<Navigate to= '/' />} />
          <Route path='/' element={user? <Dashboard /> : <Navigate to= '/Login' />} />
          <Route path='/Inventory' element={user? <Inventory /> :<Navigate to= '/' />} />
          <Route path='/Reservation' element={user? <Reservation /> :<Navigate to= '/' />} />
          <Route path='/AddInventory' element={user? <AddInventory /> :<Navigate to= '/' />} />
          <Route path='/updateInventory/:id' element={user? <UpdateInventory /> :<Navigate to= '/' />} />
          <Route path='/AddStaff' element={user? <AddStaff /> :<Navigate to= '/' />} />
          <Route path='/AddMenu' element={user? <AddMenu /> :<Navigate to= '/' />} />
          <Route path='/Staff' element={user? <Staff /> :<Navigate to= '/' />} />
          <Route path='/UpdateStaff/:id' element={user? <UpdateStaff /> :<Navigate to= '/' />} />
          <Route path='/Menu' element={user? <Menu /> :<Navigate to= '/' />} />
          <Route path='/UpdateMenu/:id' element={user? <UpdateMenu /> :<Navigate to= '/' />} />
          <Route path='/CustomersOrders' element={user? <CustomersOrders/> :<Navigate to= '/' />} />
          <Route path='/UpdateStatus/:id' element={ user?<UpdateStatus/> :<Navigate to= '/' />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App