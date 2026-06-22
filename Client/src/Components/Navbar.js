import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { UseAuthContext } from "../hook/UseAuthContext";
import { UseCartContext } from "../hook/UseCartContext";
import { IoMdMenu, IoMdClose } from "react-icons/io";
import { FiShoppingBag, FiUser, FiLogIn, FiHome, FiClipboard, FiMail } from "react-icons/fi";

function Navbar() {
  const [openMenu, setOpenMenu] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  
  const { user } = UseAuthContext();
  const { cartItems } = UseCartContext();
  const location = useLocation();

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY >= 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setOpenMenu(false);
  }, [location]);

  const toggleMenu = () => setOpenMenu(!openMenu);

  // Check if link is active
  const isActive = (path) => location.pathname === path;

  return (
    <header 
      className={`sticky top-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? "bg-white/95 backdrop-blur-md shadow-sm border-b border-gray-100/50" 
          : "bg-white border-b border-gray-100"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          
          {/* Left: Mobile Toggle & Brand */}
          <div className="flex items-center gap-3">
            <button 
              onClick={toggleMenu} 
              className="md:hidden p-2 rounded-xl hover:bg-gray-100 transition-colors focus:outline-none"
              aria-label="Toggle Menu"
            >
              {openMenu ? (
                <IoMdClose size={24} className="text-gray-700" />
              ) : (
                <IoMdMenu size={24} className="text-gray-700" />
              )}
            </button>

            <Link to="/" className="flex items-center gap-2.5 group">
              <span className="text-xl font-extrabold tracking-tight text-gray-900">
                Double Diner
              </span>
            </Link>
          </div>

          {/* Navigation Links (Desktop) */}
          <nav className="hidden md:flex items-center gap-1">
            <Link 
              to="/" 
              className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-200 flex items-center gap-2 ${
                isActive("/") 
                  ? "bg-gray-900 text-white" 
                  : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
              }`}
            >
              <FiHome size={18} />
              Home
            </Link>
            
            {user ? (
              <Link 
                to="/orders" 
                className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-200 flex items-center gap-2 ${
                  isActive("/orders") || location.pathname.startsWith("/orders/")
                    ? "bg-gray-900 text-white" 
                    : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                }`}
              >
                <FiClipboard size={18} />
                Orders
              </Link>
            ) : (
              <Link 
                to="/contact" 
                className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-200 flex items-center gap-2 ${
                  isActive("/contact") 
                    ? "bg-gray-900 text-white" 
                    : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                }`}
              >
                <FiMail size={18} />
                Contact
              </Link>
            )}
          </nav>

          {/* Right: Actions */}
          <div className="flex items-center gap-2">
            {/* Cart Button */}
            <Link 
              to="/cart" 
              className="relative p-2.5 rounded-xl bg-gray-50 hover:bg-gray-100 text-gray-700 transition-all duration-200 hover:scale-105 active:scale-95 border border-gray-200"
            >
              <FiShoppingBag size={20} />
              {cartItems?.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-gray-900 text-white font-bold text-[10px] w-5 h-5 flex items-center justify-center rounded-full shadow-sm">
                  {cartItems.length}
                </span>
              )}
            </Link>

            {/* User Profile or Sign In */}
            {user ? (
              <Link 
                to={`/UpdateProfile/${user.id}`} 
                className="p-2.5 rounded-xl bg-gray-50 hover:bg-gray-100 text-gray-700 transition-all duration-200 border border-gray-200 hover:scale-105 active:scale-95"
                aria-label="Profile"
              >
                <FiUser size={20} className="text-gray-700" />
              </Link>
            ) : (
              <Link 
                to="/login" 
                className="flex items-center gap-2 bg-gray-900 hover:bg-gray-800 text-white font-semibold text-sm px-5 py-2.5 rounded-xl transition-all duration-200 hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0"
              >
                <FiLogIn size={16} />
                Sign In
              </Link>
            )}
          </div>
        </div>

        {/* Mobile Menu Dropdown */}
        <div 
          className={`
            md:hidden overflow-hidden transition-all duration-300 ease-in-out
            ${openMenu ? "max-h-96 opacity-100 py-4" : "max-h-0 opacity-0"}
          `}
        >
          <div className="flex flex-col gap-1 border-t border-gray-100 pt-4">
            <Link 
              to="/" 
              className={`px-4 py-3 rounded-xl text-sm font-semibold transition-all duration-200 flex items-center gap-3 ${
                isActive("/") 
                  ? "bg-gray-900 text-white" 
                  : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
              }`}
              onClick={() => setOpenMenu(false)}
            >
              <FiHome size={18} />
              Home
            </Link>
            
            {user ? (
              <Link 
                to="/orders" 
                className={`px-4 py-3 rounded-xl text-sm font-semibold transition-all duration-200 flex items-center gap-3 ${
                  isActive("/orders") || location.pathname.startsWith("/orders/")
                    ? "bg-gray-900 text-white" 
                    : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                }`}
                onClick={() => setOpenMenu(false)}
              >
                <FiClipboard size={18} />
                Orders
              </Link>
            ) : (
              <Link 
                to="/contact" 
                className={`px-4 py-3 rounded-xl text-sm font-semibold transition-all duration-200 flex items-center gap-3 ${
                  isActive("/contact") 
                    ? "bg-gray-900 text-white" 
                    : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                }`}
                onClick={() => setOpenMenu(false)}
              >
                <FiMail size={18} />
                Contact
              </Link>
            )}

            {!user && (
              <Link 
                to="/login" 
                className="mt-2 px-4 py-3 bg-gray-900 hover:bg-gray-800 text-white rounded-xl text-sm font-semibold flex items-center justify-center gap-2 hover:shadow-lg transition-all"
                onClick={() => setOpenMenu(false)}
              >
                <FiLogIn size={18} />
                Sign In
              </Link>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}

export default Navbar;