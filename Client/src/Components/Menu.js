import "../css/Menu.css";
import "../css/Meal.css";

import React, { useState } from "react";

import Juice from "./Juice";
import Meal from "./Meal";
import Shakes from "./Shakes";

const HomePage = ({ cartItems, setCartItems }) => {
  return (
    <div className="home-container">
      <div className="logo">
        <div className="quotes">
          <h3 className="logo-name">Double Diner</h3>
          <p className="logo-info">
            Food Tastes Better When You Eat With Your Family Or Friends
          </p>
        </div>
      </div>

      {cartItems.length > 0 && (
        <div className="menu">
          <Meal cartItems={cartItems} setCartItems={setCartItems} />
          <Juice cartItems={cartItems} setCartItems={setCartItems} />
          <Shakes cartItems={cartItems} setCartItems={setCartItems} />
        </div>
      )}
    </div>
  );
};

export default HomePage;
