import React, { useState } from "react";
import { Link } from "react-router-dom";
import { UseAuthContext } from "../hook/UseAuthContext";

function Navbar() {
  const [menu, setMenu] = useState(false); // Changed default to false (closed) for better logic
  const { user } = UseAuthContext();

  const toggleMenu = () => setMenu(!menu);
  const closeMenu = () => setMenu(false);

  return (
    <nav className="w-full bg-white text-black border-b border-gray-200 relative z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Logo Section */}
          <div className="flex-shrink-0">
            <Link to="/" className="text-xl font-black tracking-wider uppercase" onClick={closeMenu}>
              Double Diner
            </Link>
          </div>

          {/* Desktop Navigation */}
          {user && (
            <div className="hidden md:flex items-center space-x-8">
              <ul className="flex space-x-6 text-sm font-medium tracking-wide uppercase">
                <li>
                  <Link to="/" className="hover:text-gray-500 transition-colors">Dashboard</Link>
                </li>
                <li>
                  <Link to="/inventory" className="hover:text-gray-500 transition-colors">Inventory</Link>
                </li>
                <li>
                  <Link to="/users" className="hover:text-gray-500 transition-colors">Customers</Link>
                </li>
                <li>
                  <Link to="/orders" className="hover:text-gray-500 transition-colors">Orders</Link>
                </li>
              </ul>

              {/* Profile Button */}
              <Link 
                to={`/update-profile/${user.id}`} 
                className="bg-black text-white hover:bg-gray-800 text-sm font-semibold py-2 px-4 rounded transition-colors"
              >
                Profile
              </Link>
            </div>
          )}

          {/* Mobile Hamburger Button */}
          {user && (
            <div className="md:hidden flex items-center">
              <button 
                onClick={toggleMenu} 
                className="flex flex-col justify-center items-center w-8 h-8 space-y-1.5 focus:outline-none"
                aria-label="Toggle menu"
              >
                <div className={`w-6 h-0.5 bg-black transition-transform duration-300 ${menu ? 'rotate-45 translate-y-2' : ''}`}></div>
                <div className={`w-6 h-0.5 bg-black transition-opacity duration-300 ${menu ? 'opacity-0' : ''}`}></div>
                <div className={`w-6 h-0.5 bg-black transition-transform duration-300 ${menu ? '-rotate-45 -translate-y-2' : ''}`}></div>
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {user && (
        <div className={`md:hidden absolute top-16 left-0 w-full bg-white border-b border-gray-200 transition-all duration-300 ease-in-out ${menu ? 'opacity-100 visible' : 'opacity-0 invisible pointer-events-none'}`}>
          <ul className="px-4 pt-2 pb-4 space-y-3 text-sm font-medium uppercase tracking-wider">
            <li>
              <Link to="/" onClick={closeMenu} className="block py-2 hover:text-gray-500">Dashboard</Link>
            </li>
            <li>
              <Link to="/inventory" onClick={closeMenu} className="block py-2 hover:text-gray-500">Inventory</Link>
            </li>
            <li>
              <Link to="/users" onClick={closeMenu} className="block py-2 hover:text-gray-500">Customers</Link>
            </li>
            <li>
              <Link to="/orders" onClick={closeMenu} className="block py-2 hover:text-gray-500">Orders</Link>
            </li>
            <li className="pt-2 border-t border-gray-100">
              <Link 
                to={`/update-profile/${user.id}`} 
                onClick={closeMenu}
                className="block w-full text-center bg-black text-white hover:bg-gray-800 py-2.5 px-4 rounded font-semibold transition-colors"
              >
                Profile
              </Link>
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
}

export default Navbar;