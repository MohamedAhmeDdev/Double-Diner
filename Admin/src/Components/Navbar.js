import "../css/Navbar.css";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { UseAuthContext } from "../hook/UseAuthContext";


function Navbar() {
  const [menu, setMenu] = useState(true);
  const { user } = UseAuthContext();

  const open = () => setMenu(!menu);



  return (
    <div className="sidebar">
      {user && (
        <div>
              <div className="menu" onClick={open}>
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
                  <Link to="/inventory" onClick={open}>
                    <span className="links_name">Inventory</span>
                  </Link>
                </li>
                <li>
                  <Link to="/customers" onClick={open}>
                    <span className="links_name">Customers</span>
                  </Link>
                </li>
                <li>
                  <Link to="/orders" onClick={open}>
                    <span className="links_name">Orders</span>
                  </Link>
                </li>
              </ul>


              <Link to={`/UpdateProfile/${user.id}`}  className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded inline-flex items-center  my-4 mr-4 profile">
                <span>Profile</span>
              </Link>
        </div>
      )}

      {!user && (
        <div className="logo-divs">
          <h3 className="logos">Double Diner</h3>
        </div>
      )}
    </div>
  );
}

export default Navbar;
