import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import React, { useEffect } from "react";
import jwt_decode from 'jwt-decode';
import Navbar from "./Components/Navbar";
import AdminDashboard from "./pages/AdminDashboard";
import CreateNewItemForm from "./pages/inventory/CreateNewItemForm";
import Users from "./pages/Users";
import Inventory from "./pages/inventory/Inventory";
import Login from "./pages/Authentication/Login";
import Orders from "./pages/orders/Orders";
import SingleOrder from "./pages/orders/SingleOrder";
import UpdateInventory from "./pages/inventory/UpdateInventory";
import UpdateProfile from "./pages/UpdateProfile";
import SalesDish from "./pages/SalesDish";
import ForgotPassword from "./pages/Authentication/ForgotPassword";
import ResetPassword from "./pages/Authentication/ResetPassword";

import { UseAuthContext } from "./hook/UseAuthContext";
import { ProtectedRoute, PublicRoute } from "./utils/ProtectedRoute.jsx"; 

function App() {
  const { user, dispatch } = UseAuthContext();

  useEffect(() => {
    const checkTokenExpiration = () => {
      const storedUser = JSON.parse(localStorage.getItem('user'));
      if (!storedUser || !storedUser.token) return;

      const decodedToken = jwt_decode(storedUser.token);
      if (!decodedToken.exp) return;

      const expirationDate = new Date(decodedToken.exp * 1000);
      const currentTime = new Date();
      const timeDifference = expirationDate.getTime() - currentTime.getTime();

      if (timeDifference <= 0) {
        localStorage.removeItem("user");
        dispatch({ type: "LOGOUT" });
      } else {
        setTimeout(() => {
          localStorage.removeItem("user");
          dispatch({ type: "LOGOUT" });
        }, timeDifference);
      }
    };

    checkTokenExpiration();
    const intervalId = setInterval(checkTokenExpiration, 60000);
    return () => clearInterval(intervalId);
  }, [dispatch]);

  return (
    <div>
      <BrowserRouter>
        <Navbar />
        <Routes>
          {/* PUBLIC ROUTES (Accessible only when LOGGED OUT) */}
          <Route element={<PublicRoute />}>
            <Route path="/Login" element={<Login />} />
            <Route path="/ForgotPassword" element={<ForgotPassword />} />
            <Route path="/resetPassword/:id" element={<ResetPassword />} />
          </Route>

          {/* PROTECTED ROUTES (Accessible only when LOGGED IN) */}
          <Route element={<ProtectedRoute />}>
            <Route path="/" element={<AdminDashboard />} />
            <Route path="/inventory" element={<Inventory />} />
            <Route path="/inventory/add" element={<CreateNewItemForm />} />
            <Route path="/inventory/update/:id" element={<UpdateInventory />} />
            <Route path="/orders" element={<Orders />} />
            <Route path="/orders/:id" element={<SingleOrder />} />
            <Route path="/users" element={<Users />} />
            <Route path="/update-profile/:id" element={<UpdateProfile />} />
            <Route path="/dishReport" element={<SalesDish />} />
          </Route>

          {/* Catch-all route to prevent blank screens */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;