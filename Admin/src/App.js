import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import AddInventory from "./Components/AddInventory";
import AdminDashboard from "./pages/AdminDashboard";
import CustomersOrders from "./Components/CustomersOrders";
import Inventory from "./Components/Inventory";
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
            path="/inventory"
            element={user ? <Inventory /> : <Navigate to="/" />}
          />

          <Route
            path="/inventory/add"
            element={user ? <AddInventory /> : <Navigate to="/" />}
          />
          <Route
            path="/inventory/update/:id"
            element={user ? <UpdateInventory /> : <Navigate to="/" />}
          />

          <Route
            path="/orders"
            element={user ? <CustomersOrders /> : <Navigate to="/" />}
          />

          <Route
            path="/reservations"
            element={user ? <Reservation /> : <Navigate to="/" />}
          />

          {/**
           * TODO:
           * 1. update reservation page
           * 2. customers page
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
