import React, { useState } from 'react'
import '../css/Navbar.css'
import { Link } from "react-router-dom"
import { BsCartCheck, BsFillFileArrowDownFill } from "react-icons/bs";
import { CgProfile } from "react-icons/cg";
import { FaSignOutAlt } from "react-icons/fa";
import { UseAuthContext } from '../hook/UseAuthContext';


function Navbar({ cartItems }) {
  const [openMenu, setOpenMenu] = useState(true)
  const [bColor, setBColor] = useState(false)
  const { user } = UseAuthContext()
  const { dispatch } = UseAuthContext()

  const changeBackgroundColor = () => {
    if (window.scrollY >= 80) {
      setBColor(true)
    } else {
      setBColor(false)
    }
  }
  window.addEventListener('scroll', changeBackgroundColor)

  // ---remove user /signOut----
  const handleClick = () => {
    localStorage.removeItem('user')  // remove use from localStorage  
    dispatch({ type: 'LOGOUT' })    //  dispatch log out action
  }

  //  ----responsive navbar-----
  const openResponsive = () => setOpenMenu(!openMenu)



  return (
    <div className={bColor ? 'navbar active' : 'navbar'}>

      {user && (<div>
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

        {/* ----right menu----- */}
        <div id='nav-form'>
          <Link to="/cart" className='cart'><BsCartCheck size='2em ' color='white' /><div className='counter-div'>{cartItems.length}</div></Link>

          <div className="dropdown">
            <div className="dropbtn">{user.email}</div>

            <div className="dropdown-content">
              <Link to="/Profile" ><div className='profile'><CgProfile size='1.4em ' color='black' /> Profile</div></Link>
              <Link to='' ><button className='signOut' onClick={handleClick}><FaSignOutAlt size='1.5em ' color='black' /> Sing out</button></Link>
            </div>

          </div>
        </div>

      </div>)}


      {!user && (<div>
        <div id='form'>
          <li><Link to="/Login" className='login'>Sign up/Login</Link></li>
        </div>
      </div>)}

    </div>
  )
}

export default Navbar