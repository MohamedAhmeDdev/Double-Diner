import React, { useState } from 'react'
import '../css/Menu.css'
import '../css/Meal.css'
import Meal from './Meal'
import Juice from './Juice'
import Shakes from './Shakes'

function Home({ cartItems,setCartItems }) {
      
    return (
        <div className='home-container'>
            <div className='logo'>
                <div className='quotes'>
                    <h3 className='logo-name'>Double Diner</h3>
                    <p className='logo-info'>Food Tastes Better When You Eat With Your Family Or Friends</p>
                </div>
            </div>

            <div className="menu">
            <Meal cartItems={cartItems} setCartItems={setCartItems}/>
            <Juice cartItems={cartItems} setCartItems={setCartItems}/>
            <Shakes cartItems={cartItems} setCartItems={setCartItems}/>
            </div>
        </div>
    )
}

export default Home