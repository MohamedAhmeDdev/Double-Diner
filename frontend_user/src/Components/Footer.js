import React from 'react'
import { Link } from "react-router-dom"
import '../css/Footer.css'
import { CgCopyright } from "react-icons/cg";

function Footer() {
    return (
        <div className='footer'>
            <div className='footer-nav'>
                <ul className='footer-ul'>
                    <li><Link to="/Policy">Privacy Policy</Link></li>
                    <li><Link to="/Terms">Terms Of Use</Link></li>
                    <li><Link to="/Contact">FeedBack</Link></li>
                </ul>
            </div>

            <div className='footer-info'>
                <p className='moto'>we Don't just serve food to our customer, we make sure you are satisfied</p>
                <p className='copy'><CgCopyright size='1.5em' />2022 Double Diner</p>
            </div>
        </div>
    )
}

export default Footer