import { BrowserRouter, Navigate, Route, Routes} from "react-router-dom";
import AdminDashboard from "./pages/AdminDashboard";
import CreateNewItemForm from "./Components/inventory/CreateNewItemForm";
import Users from "./pages/Users";
import Inventory from "./pages/Inventory";
import Login from "./pages/Login";
import Navbar from "./Components/Navbar";
import Orders from "./pages/Orders";
import React from "react";
import SingleOrderView from "./Components/orders/SingleOrderView";
import UpdateInventory from "./pages/UpdateInventory";
import { UseAuthContext } from "./hook/UseAuthContext";
import UpdateProfile from "./Components/UpdateProfile";
import Reservation from "./pages/Reservation";
import SalesDish from "./pages/SalesDish";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import jwt_decode from 'jwt-decode';
import { useEffect } from 'react';

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
        {/* <Navbar /> */}
        <Routes>
          <Route  path="/Login"  element={!user ? <Login /> : <Navigate to="/" />} />
          <Route path="/"  element={user ? <AdminDashboard /> : <Navigate to="/Login" />}  />
          <Route path="/inventory/add"  element={user ? <CreateNewItemForm /> : <Navigate to="/" />} />
          <Route path="/inventory/update/:id" element={user ? <UpdateInventory /> : <Navigate to="/" />}  />
          <Route path="/inventory" element={user ? <Inventory /> : <Navigate to="/" />} />
          <Route path="/orders" element={user ? <Orders /> : <Navigate to="/" />}  />
          <Route path="/Reservation" element={user ? <Reservation/> : <Navigate to="/" />}  />
          <Route path="/orders/:id" element={user ? <SingleOrderView /> : <Navigate to="/" />}/>
          <Route path="/users" element={user ? <Users /> : <Navigate to="/" />}  />
          <Route path="/UpdateProfile/:id" element={user ? <UpdateProfile/> : <Navigate to="/" />}  />
          <Route path="/dishReport" element={user ? <SalesDish/> : <Navigate to="/" />}  />
          <Route path="/ForgotPassword" element={<ForgotPassword />}/>
          <Route path="/resetPassword/:id" element={<ResetPassword/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
