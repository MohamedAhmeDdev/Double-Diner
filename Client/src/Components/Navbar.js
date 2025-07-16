import React, { useState } from "react";
import { BsCartCheck } from "react-icons/bs";
import { Link } from "react-router-dom";
import { UseAuthContext } from "../hook/UseAuthContext";
import { UseCartContext } from "../hook/UseCartContext";
import { IoMdMenu } from "react-icons/io";

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
    <>
        <header class="flex items-center justify-between whitespace-nowrap border-b border-solid border-b-[#f4f0f0] px-10 py-3 ">
        {user && (
          <>
            <span class="cursor-pointer text-[#181111] md:hidden" onClick={openResponsive}>
                <IoMdMenu size={30} />
            </span>
            <div class="flex items-center gap-8">
              <div class="flex items-center gap-4 text-[#181111]">
                <div class="size-4">
                  <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M6 6H42L36 24L42 42H6L12 24L6 6Z" fill="currentColor"></path></svg>
                </div>
                <h2 class="text-[#181111] text-lg font-bold leading-tight tracking-[-0.015em]">Double Diner</h2>
              </div>
           <div class="flex px-11 gap-9 md:static md:flex-row md:w-auto md:h-auto md:bg-transparent md:opacity-100 md:transition-none absolute  flex-col justify-center top-[70px] right-0 h-[200px] w-full bg-white opacity-90 p-[6px_14px] transition-[1s]" style={{ left: openMenu ? "-100%" : "0" }}>
                <Link class="text-[#181111] text-sm font-medium leading-normal" to="/">Home</Link>
                <Link class="text-[#181111] text-sm font-medium leading-normal" to="/orders">orders</Link>
                <Link class="text-[#181111] text-sm font-medium leading-normal" to="/Contact">Contact</Link>
              </div>
            </div>
            <div class="flex flex-1 justify-end gap-5">
               <Link to='/cart'>
              <button class="flex max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 bg-[#f4f0f0] text-[#181111] gap-2 text-sm font-bold leading-normal tracking-[0.015em] min-w-0 px-2.5">
                  <div class="text-[#181111]" data-icon="ShoppingCart" data-size="20px" data-weight="regular">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20px" height="20px" fill="currentColor" viewBox="0 0 256 256">
                      <path
                        d="M222.14,58.87A8,8,0,0,0,216,56H54.68L49.79,29.14A16,16,0,0,0,34.05,16H16a8,8,0,0,0,0,16h18L59.56,172.29a24,24,0,0,0,5.33,11.27,28,28,0,1,0,44.4,8.44h45.42A27.75,27.75,0,0,0,152,204a28,28,0,1,0,28-28H83.17a8,8,0,0,1-7.87-6.57L72.13,152h116a24,24,0,0,0,23.61-19.71l12.16-66.86A8,8,0,0,0,222.14,58.87ZM96,204a12,12,0,1,1-12-12A12,12,0,0,1,96,204Zm96,0a12,12,0,1,1-12-12A12,12,0,0,1,192,204Zm4-74.57A8,8,0,0,1,188.1,136H69.22L57.59,72H206.41Z"
                      ></path>
                    </svg>
                  </div>
                  <div className="">{cartItems.length}</div>
                </button>
                </Link>
              <Link to={`/UpdateProfile/${user.id}`}>
                <button class="flex max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 bg-[#f4f0f0] text-[#181111] gap-2 text-sm font-bold leading-normal tracking-[0.015em] min-w-0 px-2.5">
                  <div class="text-[#181111]" data-icon="User" data-size="20px" data-weight="regular">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20px" height="20px" fill="currentColor" viewBox="0 0 256 256">
                      <path
                        d="M230.92,212c-15.23-26.33-38.7-45.21-66.09-54.16a72,72,0,1,0-73.66,0C63.78,166.78,40.31,185.66,25.08,212a8,8,0,1,0,13.85,8c18.84-32.56,52.14-52,89.07-52s70.23,19.44,89.07,52a8,8,0,1,0,13.85-8ZM72,96a56,56,0,1,1,56,56A56.06,56.06,0,0,1,72,96Z"
                      ></path>
                    </svg>
                  </div>
                </button>
              </Link>
            </div>
          </>
        )}


        {!user && (
          <>
            <span class="cursor-pointer text-[#181111] md:hidden" onClick={openResponsive}>
                <IoMdMenu size={30} />
            </span>

            <div class="flex items-center gap-8">
              <div class="flex items-center gap-4 text-[#181111]">
                <div class="size-4">
                  <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M6 6H42L36 24L42 42H6L12 24L6 6Z" fill="currentColor"></path></svg>
                </div>
                <h2 class="text-[#181111] text-lg font-bold leading-tight tracking-[-0.015em]">Double Diner</h2>
              </div>
              <div class="flex px-11 gap-9 md:static md:flex-row md:w-auto md:h-auto md:bg-transparent md:opacity-100 md:transition-none absolute  flex-col justify-center top-[70px] right-0 h-[200px] w-full bg-white opacity-90 p-[6px_14px] transition-[1s]" style={{ left: openMenu ? "-100%" : "0" }}>
                <Link class="text-[#181111] text-sm font-medium leading-normal" to="/">Home</Link>
                <Link class="text-[#181111] text-sm font-medium leading-normal" to="/Contact">Contact</Link>
              </div>
            </div>
            <div class="flex flex-1 justify-end gap-5">
            <Link to='/cart'>
              <button class="flex max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 bg-[#f4f0f0] text-[#181111] gap-2 text-sm font-bold leading-normal tracking-[0.015em] min-w-0 px-2.5">
                  <div class="text-[#181111]" data-icon="ShoppingCart" data-size="20px" data-weight="regular">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20px" height="20px" fill="currentColor" viewBox="0 0 256 256">
                      <path
                        d="M222.14,58.87A8,8,0,0,0,216,56H54.68L49.79,29.14A16,16,0,0,0,34.05,16H16a8,8,0,0,0,0,16h18L59.56,172.29a24,24,0,0,0,5.33,11.27,28,28,0,1,0,44.4,8.44h45.42A27.75,27.75,0,0,0,152,204a28,28,0,1,0,28-28H83.17a8,8,0,0,1-7.87-6.57L72.13,152h116a24,24,0,0,0,23.61-19.71l12.16-66.86A8,8,0,0,0,222.14,58.87ZM96,204a12,12,0,1,1-12-12A12,12,0,0,1,96,204Zm96,0a12,12,0,1,1-12-12A12,12,0,0,1,192,204Zm4-74.57A8,8,0,0,1,188.1,136H69.22L57.59,72H206.41Z"
                      ></path>
                    </svg>
                  </div>
                  <div className="">{cartItems.length}</div>
                </button>
              </Link>
               <div class="flex items-center gap-9" >
                <Link class="text-[#181111] text-sm font-medium leading-normal bg-[#f4f0f0] px-3 py-2 rounded-md " to="/login">Signin</Link>
              </div>
            </div>
          </>
        )}
        </header>
  </>
  );
}

export default Navbar;
