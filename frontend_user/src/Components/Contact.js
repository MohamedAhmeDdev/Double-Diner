import React from 'react'
import '../css/Contact.css'
import {MdPhoneAndroid } from "react-icons/md";
import {MdEmail } from "react-icons/md";
import {ImLocation2 } from "react-icons/im";
import Footer from './Footer';

function Contact() {
    return (
        <div class='contact-container'>
            <div>
                <div class="small-div">
                    <h3>Contact Us</h3>
                    <p></p>
                </div>
            </div>
            <div class='contacts'>
                <div class='contact-info'>
                    <div class='contact'>
                      <MdPhoneAndroid size='2em' className='contact-icon'/>
                        <h4 class='head'>Phone Number</h4>
                        <p className='head-info'>0704170598</p>
                        <p className='head-info'>our customer care service call is 24HRS</p>
                    </div>

                    <div class='contact email'>
                    <MdEmail size='2em' className='contact-icon'/>
                        <h4 class='head'>Email Address</h4>
                        <p  className='head-info'>ma07041705@gmail.com</p>
                        <p  className='head-info'>you can send your feedback or contact our customer care</p>
                    </div>

                    <div class='contact'>
                    <ImLocation2 size='2em' className='contact-icon' />
                        <h4 class='head'>Location</h4>
                        <p  className='head-info'>our restaurant is located in Nairobi</p>
                    </div>

                </div>
            </div>
            <Footer/>
        </div>
    )
}

export default Contact