import "./App.css";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Cart from "./Components/Cart";
import CheckOutPage from "./pages/CheckOutPage";
import Contact from "./Components/Contact";
import DishView from "./pages/SingleDishView";
import HomePage from "./pages/Home";
import Login from "./pages/LoginPage";
import Navbar from "./Components/Navbar";
import OrdersListPage from "./pages/OrdersListPage";
import Policy from "./Components/Policy";
import React from "react";
import SignUpPage from "./pages/SignUpPage";
import SingleOrderView from "./pages/SingleOrderView";
import Terms from "./Components/Terms";
import UpdateProfile from "./Components/UpdateProfile";
import { UseAuthContext } from "./hook/UseAuthContext";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import Reservation from "./pages/Reservation";
import jwt_decode from 'jwt-decode';
import { useEffect } from 'react';
import ConfirmPayment from "./pages/ConfirmPayment";


function App() {
  const { user } = UseAuthContext();
  const { dispatch } = UseAuthContext();

  useEffect(() => {
    const checkTokenExpiration = () => {
      const user = JSON.parse(localStorage.getItem('user'));
      if (!user || !user.token) {
        console.log('Token not found');
        return;
      }
      const decodedToken = jwt_decode(user.token);
      if (!decodedToken.exp) {
        console.error('Token does not have an expiration time:', user.token);
        return;
      }
      const expirationDate = new Date(decodedToken.exp * 1000);
      const currentTime = new Date();
      const timeDifference = expirationDate.getTime() - currentTime.getTime();
      if (timeDifference <= 0) {
        localStorage.removeItem("user");
        dispatch({ type: "LOGOUT" });
      } else {
        setTimeout(() => {
          dispatch({ type: "LOGOUT" });
        }, timeDifference);
      }
    };

    checkTokenExpiration();
    const intervalId = setInterval(checkTokenExpiration, 60000);
    return () => {
      clearInterval(intervalId);
    };
  }, [dispatch]);

  
  return (
    <div>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/dishes/:id" element={<DishView />} />
          <Route path="/Login" element={!user ? <Login /> : <Navigate to="/" />}/>
          <Route path="/cart" element={<Cart />} />
          <Route path="/Contact" element={<Contact />} />
          <Route path="/Policy" element={<Policy />} />
          <Route path="/Terms" element={<Terms />} />
          <Route path="/checkout"element={user ? <CheckOutPage /> : <Navigate to="/login" />}/>
          <Route path="/confirmPayment"element={user ? <ConfirmPayment /> : <Navigate to="/login" />}/>
          <Route path="/orders" element={user ? <OrdersListPage /> : <Navigate to="/login" />} />
          <Route path="/orders/:id" element={user ? <SingleOrderView /> : <Navigate to="/login" />} />
          <Route path="/Reservation" element={user ? <Reservation/> : <Navigate to="/login" />} />
          <Route path="/UpdateProfile/:id"element={user ? <UpdateProfile /> : <Navigate to="/" />}/>
          <Route path="/ForgotPassword" element={<ForgotPassword />}/>
          <Route path="/resetPassword/:id" element={<ResetPassword/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
