import "../css/Navbar.css";
import React, { useState } from "react";
import { BsCartCheck } from "react-icons/bs";
import { Link } from "react-router-dom";
import { UseAuthContext } from "../hook/UseAuthContext";
import { UseCartContext } from "../hook/UseCartContext";

function Navbar() {
  const [openMenu, setOpenMenu] = useState(true);
  const [bColor, setBColor] = useState(false);
  const { user } = UseAuthContext();

  const { cartItems } = UseCartContext();

  const changeBackgroundColor = () => {
    if (window.scrollY >= 80) {
      setBColor(true);
    } else {
      setBColor(false);
    }
  };
  window.addEventListener("scroll", changeBackgroundColor);


  //  ----responsive navbar-----
  const openResponsive = () => setOpenMenu(!openMenu);

  return (
    <div className={bColor ? "navbar active" : "navbar"}>
      {user && (
        <div>
          <div className="open-menu" onClick={openResponsive}>
            <div></div>
            <div></div>
            <div></div>
          </div>

          <ul  className="navbar-list flex justify-center items-center mx-auto"style={{ left: openMenu ? "-100%" : "0" }} >
            <li><Link onClick={openResponsive} to="/">{" "}Menu</Link></li>
            <li><Link onClick={openResponsive} to="/orders">{" "}Orders{" "}</Link> </li>
            <li><Link onClick={openResponsive} to="/Contact"> Contact{" "} </Link></li>
          </ul>

          {/* ----right menu----- */}
            <div id="nav-form">
              <Link to="/cart" className="cart">
                <BsCartCheck size="2em " color="white" />{" "}
                <div className="counter-div">{cartItems.length}</div>
              </Link>

              <Link to={`/UpdateProfile/${user.id}`}  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded  my-4 mr-4 ">
                  <span>Profile</span>
                </Link>
            </div>
        </div>
      )}

      {!user && (
            <div>
            <div className="open-menu" onClick={openResponsive}>
              <div></div>
              <div></div>
              <div></div>
            </div>
  
            <ul className="navbar-list flex justify-center items-center mx-auto"  style={{ left: openMenu ? "-100%" : "0" }}>
              <li><Link onClick={openResponsive} to="/"> Menu </Link> </li>
  
              <li> <Link onClick={openResponsive} to="/Contact"> Contact</Link> </li>
            </ul>
  
            {/* ----right menu----- */}
            <div id="nav-form-not-user">
              <div>
                <Link to="/cart" className="cart">
                  <BsCartCheck size="2em " color="white" />
                  <div className="counter-div">{cartItems.length}</div>
                </Link>
              </div>
  
              <div id="form">
                <li> <Link to="/login" className="login">Login</Link> </li>
                <li><Link to="/signup" className="login"> Sign up </Link> </li>
              </div>
            </div>
          </div>
        )}
    </div>
  );
}

export default Navbar;
