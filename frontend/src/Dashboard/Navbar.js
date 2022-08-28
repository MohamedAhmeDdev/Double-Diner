import React, {useState } from 'react'
import { Link } from "react-router-dom";
import '../css/Navbar.css'


function Navbar() {
    const[menu, setMenu] = useState(true);

    const open = () => setMenu(!menu)
         
    return (
            <div className="sidebar">
                 <ul id="nav-list" style={{top: menu ? "-100%" :"0"}}>
                 <li>
                     <Link to="/"  onClick={open}>
                         <span className="links_name">DASHBOARD</span>
                     </Link>
                 </li>
                 <li>
                     <Link to="/Inventory"  onClick={open}>
                         <span className="links_name">Inventory</span>
                     </Link>
                 </li>
                 <li>
                     <Link to=""  onClick={open}>
                         <span className="links_name">Staff Duties</span>
                     </Link>
                 </li>
                 <li>
                     <Link to=""  onClick={open}>
                         <span className="links_name">Menu</span>
                     </Link>
                 </li>
             </ul>

        
               
                <div className='menu' onClick={open}>
                    <div></div>
                    <div></div>
                    <div></div>
                </div>
            </div>
    )
}

export default Navbar