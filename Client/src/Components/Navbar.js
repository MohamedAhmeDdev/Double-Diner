import React, { useState } from 'react'
import '../css/Navbar.css'
import { Link } from "react-router-dom"

import { BsCartCheck } from "react-icons/bs";


function Navbar({ cartItems }) {
  const [openMenu, setOpenMenu] = useState(true)
  const openResponsive = () => setOpenMenu(!openMenu)
  const[bColor, setBColor] = useState(false)

  const changeBackgroundColor =()=>{
    if(window.scrollY >= 80){
      setBColor(true)
    }else{
      setBColor(false)
    }   
  }

  window.addEventListener('scroll', changeBackgroundColor)


  return (
    <div className={bColor? 'navbar active' : 'navbar'}>

      <div className='open-menu' onClick={openResponsive}>
        <div></div>
        <div></div>
        <div></div>
      </div>

      <ul className='navbar-list' style={{ left: openMenu ? "-100%" : "0" }}>

        <li>
          <Link onClick={openResponsive} to="/">Menu</Link>
        </li>

        <li>
          <Link onClick={openResponsive} to="/ListOfOrders">Orders</Link>
        </li>

        <li>
          <Link onClick={openResponsive} to="/Reservation">Reservation</Link>
        </li>

        <li>
          <Link onClick={openResponsive} to="/Contact">Contact</Link>
        </li>
      </ul>

      <div id='form'>
        <Link to="/cart" ><BsCartCheck size='2em ' color='white' /><div className='counter-div'>{cartItems.length}</div></Link>
        <li className='login'>
          <Link to="/Login" >Registration/Login</Link>
        </li>
      </div>

    </div>
  )
}

export default Navbar