import React, { useState } from 'react'
import '../css/Navbar.css'
import { Link } from "react-router-dom"
import { FaUserCircle } from "react-icons/fa";
import { BsCartCheck } from "react-icons/bs";


function Navbar() {

  const[openMenu, setMenu] = useState(true)
  const openResponsive = () => setMenu(!openMenu)

  return (
    <div className='navbar'>
    
      <ul className='navbar-list' style={{left: openMenu ? "-100%" :"0"}}>

        <li>
          <Link onClick={openResponsive} to="/">Menu</Link>
        </li>

        <li>
          <Link onClick={openResponsive} to="/Reservation">Reservation</Link>
        </li>

        <li>
          <Link onClick={openResponsive} to="/Contact">Contact</Link>
        </li>
      </ul>

  <div className='open-menu' onClick={openResponsive}>
        <div></div>
        <div></div>
        <div></div>
      </div>
      
      <div id='form'>
      <Link to="/RegistrationForm" ><BsCartCheck size='2em ' color='white' /></Link>
        <li className='login'>
          <Link to="/Login" >Login</Link>
        </li>
          <Link to="/RegistrationForm" ><FaUserCircle size='2em ' color='white' /></Link>
      </div>

    </div>
  )
}

export default Navbar