import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import AdminDashboard from "./pages/AdminDashboard";
import CreateNewItemForm from "./Components/inventory/CreateNewItemForm";
import Customers from "./pages/Customers";
import CustomersOrders from "./Components/CustomersOrders";
import Inventory from "./pages/Inventory";
import Login from "./pages/Login";
import Navbar from "./Components/Navbar";
import React from "react";
import Reservation from "./Components/Reservation";
import UpdateInventory from "./Components/UpdateInventory";
import { UseAuthContext } from "./hook/UseAuthContext";

function App() {
  const { user } = UseAuthContext();

  return (
    <div>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route
            path="/Login"
            element={!user ? <Login /> : <Navigate to="/" />}
          />
          <Route
            path="/"
            element={user ? <AdminDashboard /> : <Navigate to="/Login" />}
          />

          <Route
            path="/inventory/add"
            element={user ? <CreateNewItemForm /> : <Navigate to="/" />}
          />
          <Route
            path="/inventory/update/:id"
            element={user ? <UpdateInventory /> : <Navigate to="/" />}
          />
          <Route
            path="/inventory"
            element={user ? <Inventory /> : <Navigate to="/" />}
          />

          <Route
            path="/orders"
            element={user ? <CustomersOrders /> : <Navigate to="/" />}
          />

          <Route
            path="/reservations"
            element={user ? <Reservation /> : <Navigate to="/" />}
          />

          <Route
            path="/customers"
            element={user ? <Customers /> : <Navigate to="/" />}
          />

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
