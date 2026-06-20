import "./App.css";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import React, { useEffect } from "react";
import jwt_decode from 'jwt-decode';

import Cart from "./Components/Cart";
import CheckOutPage from "./pages/CheckOutPage";
import Contact from "./Components/Contact";
import DishView from "./pages/SingleDishView";
import HomePage from "./pages/Home";
import Login from "./pages/Authentication/Login";
import Navbar from "./Components/Navbar";
import OrdersListPage from "./pages/OrdersListPage";
import Policy from "./Components/Policy";
import SignUpPage from "./pages/Authentication/SignUp";
import SingleOrderView from "./pages/SingleOrderView";
import Terms from "./Components/Terms";
import UpdateProfile from "./pages/UpdateProfile";
import ForgotPassword from "./pages/Authentication/ForgotPassword";
import ResetPassword from "./pages/Authentication/ResetPassword";
import Reservation from "./pages/Reservation";
import ConfirmPayment from "./pages/ConfirmPayment";

import { UseAuthContext } from "./hook/UseAuthContext";
import { ProtectedRoute, PublicRoute } from "./utils/ProtectedRoute.jsx"; // Reusing your wrappers

function App() {
  const { dispatch } = UseAuthContext();

  useEffect(() => {
    const checkTokenExpiration = () => {
      const user = JSON.parse(localStorage.getItem('user'));
      if (!user || !user.token) return;

      const decodedToken = jwt_decode(user.token);
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
          {/* ========================================================= */}
          {/* 1. COMPLETELY OPEN ROUTES (Accessible by Anyone)           */}
          {/* ========================================================= */}
          <Route path="/" element={<HomePage />} />
          <Route path="/dishes/:id" element={<DishView />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/Contact" element={<Contact />} />
          <Route path="/Policy" element={<Policy />} />
          <Route path="/Terms" element={<Terms />} />

          {/* ========================================================= */}
          {/* 2. GUEST-ONLY ROUTES (Redirects to "/" if logged in)      */}
          {/* ========================================================= */}
          <Route element={<PublicRoute />}>
            <Route path="/Login" element={<Login />} />
            <Route path="/signup" element={<SignUpPage />} />
            <Route path="/ForgotPassword" element={<ForgotPassword />} />
            <Route path="/resetPassword/:id" element={<ResetPassword />} />
          </Route>

          {/* ========================================================= */}
          {/* 3. PROTECTED ROUTES (Redirects to "/Login" if logged out) */}
          {/* ========================================================= */}
          <Route element={<ProtectedRoute />}>
            <Route path="/checkout" element={<CheckOutPage />} />
            <Route path="/confirmPayment" element={<ConfirmPayment />} />
            <Route path="/orders" element={<OrdersListPage />} />
            <Route path="/orders/:id" element={<SingleOrderView />} />
            <Route path="/Reservation" element={<Reservation />} />
            <Route path="/UpdateProfile/:id" element={<UpdateProfile />} />
          </Route>

          {/* Fallback Catch-all */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;