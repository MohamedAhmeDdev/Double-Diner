import React, { useEffect, useState } from 'react'
import './App.css'
import Menu from './Components/Menu'
import {BrowserRouter, Routes, Route, Navigate,} from "react-router-dom";
import Navbar from './Components/Navbar';
import Reservaton from './Components/Reservaton';
import Contact from './Components/Contact';
import Policy from './Components/Policy';
import Terms from './Components/Terms';
import RegistrationForm from './Components/RegistrationForm';
import Login from './Components/Login';
import Footer from './Components/Footer';
import Meal from './Components/Meal';
import Juice from './Components/Juice';
import Shakes from './Components/Shakes';
import Cart from './Components/Cart';
import OrdersInfo from './Components/OrdersInfo';
import ListOfOrders from './Components/ListOfOrders';
import { UseAuthContext } from './hook/UseAuthContext';

// saving the cart item in localStorage 
const storelocalStorage = JSON.parse(localStorage.getItem("cartItems") || "[]")

function App() {
  const [cartItems, setCartItems] = useState(storelocalStorage)
  const [loading, setLoading] = useState(false)
  const {user} = UseAuthContext()

  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems))
  }, [cartItems])
  // useEffect(() =>{
  //   setLoading(true)
  //   setTimeout(() =>{
  //     setLoading(false)
  //   }, 3000)
  // },[])

  return (
    <div>
      {loading ? <div className='loading-img'><img className='dd-logo' src='/Images/dd.jpg' width="100%" height="100%" alt="" /></div> :
        <BrowserRouter>
          <Navbar cartItems={cartItems} />
          <Routes>
            <Route path="/" element={user? <Menu cartItems={cartItems} setCartItems={setCartItems} /> : <Navigate to= '/Login' />}/>
            <Route path="/cart" element={user? <Cart cartItems={cartItems} setCartItems={setCartItems} /> :<Navigate to= '/' />}/>
            <Route path="/Meal" element={user? <Meal /> :<Navigate to= '/' />}/>
            <Route path="/Juice" element={user? <Juice /> :<Navigate to= '/' />}/>
            <Route path="/Shakes" element={user? <Shakes /> :<Navigate to= '/' />}/>
            <Route path="/Reservation" element={user? <Reservaton /> :<Navigate to= '/' />}/>
            <Route path="/Contact" element={user? <Contact /> :<Navigate to= '/' />}/>
            <Route path="/Policy" element={user? <Policy /> :<Navigate to= '/' />}/>
            <Route path="/Terms" element={user? <Terms /> :<Navigate to= '/' />}/>
            <Route path="/OrdersInfo" element={user? <OrdersInfo cartItems={cartItems}/> :<Navigate to= '/' />}/>
            <Route path="/ListOfOrders" element={user? <ListOfOrders/> :<Navigate to= '/' />}/>
            <Route path="/RegistrationForm" element={!user? <RegistrationForm /> :<Navigate to= '/' />}/>
            <Route path="/Login" element={!user? <Login /> :<Navigate to= '/' />}/>
          </Routes>
          <Footer />
        </BrowserRouter>
      }
    </div>
  )
}

export default App