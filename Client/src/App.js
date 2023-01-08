import "./App.css";

import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import Cart from "./Components/Cart";
import CheckOutPage from "./pages/CheckOutPage";
import Contact from "./Components/Contact";
import DishView from "./pages/SingleDishView";
// import Footer from "./Components/Footer";
import HomePage from "./pages/Home";
import Login from "./pages/LoginPage";
import Navbar from "./Components/Navbar";
import OrdersListPage from "./pages/OrdersListPage";
import Policy from "./Components/Policy";
import Profile from "./Components/Profile";
import React from "react";
import SignUpPage from "./pages/SignUpPage";
import SingleOrderView from "./pages/SingleOrderView";
import Terms from "./Components/Terms";
import UpdateProfile from "./Components/UpdateProfile";
import { UseAuthContext } from "./hook/UseAuthContext";

function App() {
  const { user } = UseAuthContext();

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
          <Route path="/Terms" element={<Terms />} /><Route path="/checkout"element={user ? <CheckOutPage /> : <Navigate to="/login" />}/>
          <Route path="/orders" element={user ? <OrdersListPage /> : <Navigate to="/login" />} />
          <Route path="/orders/:id" element={user ? <SingleOrderView /> : <Navigate to="/login" />} />
          <Route path="/Profile"element={user ? <Profile /> : <Navigate to="/" />}/>
          <Route path="/UpdateProfile/:id"element={user ? <UpdateProfile /> : <Navigate to="/" />}/>
        </Routes>
        {/* <Footer />/ */}
      </BrowserRouter>
    </div>
  );
}

export default App;
