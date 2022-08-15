import React from 'react'
import '../css/Menu.css'
import Juice from './Juice'
import Meal from './Meal'
import Shakes from './Shakes'

function Home() {
    return (
        <div className='home-container'>
            <div className='logo'>
                <div className='quotes'>
                    <h3 className='logo-name'>Double Diner</h3>
                    <p className='logo-info'>Food Tastes Better When You Eat With Your Family Or Friends</p>
                </div>
            </div>

            <div className="menu">
                <Meal />
                <Juice />
                <Shakes/>
            </div>
        </div>
    )
}

export default Home