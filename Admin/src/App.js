import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import AdminDashboard from "./pages/AdminDashboard";
import CreateNewItemForm from "./Components/inventory/CreateNewItemForm";
import Customers from "./pages/Customers";
import Inventory from "./pages/Inventory";
import Login from "./pages/Login";
import Navbar from "./Components/Navbar";
import Orders from "./pages/Orders";
import React from "react";
import SingleOrderView from "./pages/SingleOrderView";
import UpdateInventory from "./pages/UpdateInventory";
import { UseAuthContext } from "./hook/UseAuthContext";

function App() {
  const { user } = UseAuthContext();

  return (
    <div>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route  path="/Login"  element={!user ? <Login /> : <Navigate to="/" />} />
          
          <Route path="/"  element={user ? <AdminDashboard /> : <Navigate to="/Login" />}  />

          <Route path="/inventory/add"  element={user ? <CreateNewItemForm /> : <Navigate to="/" />} />

          <Route path="/inventory/update/:id" element={user ? <UpdateInventory /> : <Navigate to="/" />}  />

          <Route path="/inventory" element={user ? <Inventory /> : <Navigate to="/" />} />

          <Route path="/orders" element={user ? <Orders /> : <Navigate to="/" />}  />

          <Route path="/orders/:id" element={user ? <SingleOrderView /> : <Navigate to="/" />}/>

          <Route path="/customers" element={user ? <Customers /> : <Navigate to="/" />}  />

          {/**
           * TODO:
           * 1. update reservation page
       
           * 3. customers profile view page
           * 4. admin profile view page
           * 5. reports page
           */}
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
