import React, { useState } from 'react'
import { Link } from "react-router-dom";
import '../css/Navbar.css'
import { UseAuthContext } from '../hook/UseAuthContext';


function Navbar() {
    const [menu, setMenu] = useState(true);
    const { user } = UseAuthContext()
    const { dispatch } = UseAuthContext()

    const open = () => setMenu(!menu)

    const handleClick = () => {
        localStorage.removeItem('user')  // remove use from localStorage  
        dispatch({ type: 'LOGOUT' })    //  dispatch log out action
    }


    return (
        <div className="sidebar">
            {user && (<div>
                <div className='menu' onClick={open}>
                    <div></div>
                    <div></div>
                    <div></div>
                </div>

                <ul id="nav-list" style={{ top: menu ? "-100%" : "0" }}>
                    <li>
                        <Link to="/" onClick={open}>
                            <span className="links_name">DASHBOARD</span>
                        </Link>
                    </li>
                    <li>
                        <Link to="/Inventory" onClick={open}>
                            <span className="links_name">Inventory</span>
                        </Link>
                    </li>
                    <li>
                        <Link to="/Staff" onClick={open}>
                            <span className="links_name">Staff Duties</span>
                        </Link>
                    </li>
                    <li>
                        <Link to="/Menu" onClick={open}>
                            <span className="links_name">Menu</span>
                        </Link>
                    </li>
                </ul>

                <div className='logOut-div'>
                    <button className='logout' onClick={handleClick}>SignOut</button>
                </div>
            </div>)}


            {!user && (<div className='logo-divs'>
                <h3 className='logos'>Double Diner</h3>
            </div>)}
        </div>
    )
}

export default Navbar