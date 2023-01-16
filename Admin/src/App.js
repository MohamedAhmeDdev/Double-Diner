import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import AdminDashboard from "./pages/AdminDashboard";
import CreateNewItemForm from "./Components/inventory/CreateNewItemForm";
import Customers from "./pages/Customers";
import Inventory from "./pages/Inventory";
import Login from "./pages/Login";
import Navbar from "./Components/Navbar";
import Orders from "./pages/Orders";
import React from "react";
import SingleOrderView from "./Components/orders/SingleOrderView";
import UpdateInventory from "./pages/UpdateInventory";
import { UseAuthContext } from "./hook/UseAuthContext";
import SingleCustomerId from "./Components/Customers/SingleCustomerId";
import UpdateProfile from "./Components/UpdateProfile";
import Reservation from "./pages/Reservation";

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
          <Route path="/Reservation" element={user ? <Reservation/> : <Navigate to="/" />}  />
          <Route path="/orders/:id" element={user ? <SingleOrderView /> : <Navigate to="/" />}/>
          <Route path="/customers" element={user ? <Customers /> : <Navigate to="/" />}  />
          <Route path="/customer/:id" element={user ? <SingleCustomerId/> : <Navigate to="/" />}  />
          <Route path="/UpdateProfile/:id" element={user ? <UpdateProfile/> : <Navigate to="/" />}  />

          {/**
           * TODO:
           * 5. reports page
           */}
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
