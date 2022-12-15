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
import Profile from './Components/Profile';
import UpdateProfile from './Components/UpdateProfile';

// saving the cart item in localStorage 
// const storelocalStorage = JSON.parse(localStorage.getItem("cartItems") || "[]")

function App() {
  const [cartItems, setCartItems] = useState('')
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
            <Route path="/" element={<Menu cartItems={cartItems} setCartItems={setCartItems} />}/>
            <Route path="/RegistrationForm" element={<RegistrationForm />}/>
            <Route path="/Login" element={!user? <Login /> :<Navigate to= '/' />}/>
            <Route path="/cart" element={<Cart cartItems={cartItems} setCartItems={setCartItems} />}/>
            <Route path="/Meal" element={<Meal />}/>
            <Route path="/Juice" element={<Juice />}/>
            <Route path="/Shakes" element={<Shakes />}/>
            <Route path="/Reservation" element={<Reservaton />}/>
            <Route path="/Contact" element={ <Contact />}/>
            <Route path="/Policy" element={ <Policy />}/>
            <Route path="/Terms" element={ <Terms />}/>
            <Route path="/OrdersInfo" element={user? <OrdersInfo cartItems={cartItems}/> :<Navigate to= '/' />}/>
            <Route path="/ListOfOrders" element={<ListOfOrders/> }/>
            <Route path="/Profile" element={user? <Profile/> :<Navigate to= '/' />}/>
            <Route path="/UpdateProfile/:id" element={user? <UpdateProfile/> :<Navigate to= '/' />}/>
          </Routes>
          <Footer />
        </BrowserRouter>
      }
    </div>
  )
}

export default App