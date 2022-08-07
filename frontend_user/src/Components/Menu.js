import React, { useState } from 'react'
import '../css/Menu.css'

function Home() {
    const [data, setData] = useState([
        {
            name: " Baraka Mulumia",
            role: "Front End Lead",
            img: "https://avatars.githubusercontent.com/u/65751779?v=4",
            dept: "front_end",
        },
        {
            name: "Mohammed Ahmedah",
            role: "Front End Intern",
            img: "https://avatars.githubusercontent.com/u/92859355?v=4",
            dept: "front_end",
        },
        {
            name: "Jack Payne",
            role: "Api Designer",
            img: "https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8cHJvZmlsZXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60",
            dept: "backend",
        },
        {
            name: "Alicia Keys",
            role: "UI/UX Lead",
            img: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8cHJvZmlsZXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60",
            dept: "design",
        },
        {
            name: "Priyanka chopra",
            role: "UI/UX intern",
            img: "https://images.unsplash.com/photo-1614283233556-f35b0c801ef1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mjh8fHByb2ZpbGV8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60",
            dept: "design",
        },
        {
            name: "Jason stantham",
            role: "Testing Lead",
            img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mjd8fHByb2ZpbGV8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60",
            dept: "testing",
        },
        {
            name: "Raymond Reddington",
            role: "Testing Intern",
            img: "https://images.unsplash.com/photo-1609010697446-11f2155278f0?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Njh8fHByb2ZpbGV8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60",
            dept: "testing",
        },
    ])
    const food = data.map((item) => {
        return (
            <div className='container-div'>
                <div className="div" >
                    <div className="image"><img src="" width="100%" height="100%" alt="" /></div>
                    <div className="info">
                        <p className="food">food name</p>
                        <p className="food">200</p>
                        <p className="food">rice with chicken and soda</p>
                        <button className='add'>Add</button>
                    </div>
                    
                </div>
            </div>
        )
    })
    return (
        <div className='home-container'>
            <div className='logo'> 
            <div className='quotes'>
            <h3 className='logo-name'>Double Diner</h3>
            <p className='logo-info'>Food Tastes Better When You Eat With Your Family Or Friends</p>
            </div>
            </div>

            <div className="container-grid">
                {food}
            </div>
        </div>
    )
}

export default Home