import React, { useState } from 'react'
import axios from "axios";
import '../css/Contact.css'
import { MdPhoneAndroid } from "react-icons/md";
import { MdEmail } from "react-icons/md";
import { ImLocation2 } from "react-icons/im";

const Contact = () => {
    const [feedback, setFeedback] = useState('');
    const [email, setEmail] = useState('');

    const sendFeedback = async (e) =>{
        e.preventDefault()
       if( await axios.post('http://localhost:5000/feedback', {
            feedback: feedback,
            email: email,
        })
       ){
        //it remove the data which is in the input
        setEmail('');
        setFeedback('');
       }
    }



    return (
        <div className='contact-container'>
            <div>
                <div className="small-div">
                    <h3>Contact Us</h3>
                    <p></p>
                </div>
            </div>
            <div className='contacts'>
                <div className='contact-info'>
                    <div className='contact'>
                        <MdPhoneAndroid size='2em' className='contact-icon' />
                        <h4 className='head'>Phone Number</h4>
                        <p className='head-info'>0704170598</p>
                        <p className='head-info'>our customer care service call is 24HRS</p>
                    </div>

                    <div className='contact email'>
                        <MdEmail size='2em' className='contact-icon' />
                        <h4 className='head'>Email Address</h4>
                        <p className='head-info'>ma07041705@gmail.com</p>
                        <p className='head-info'>you can send your feedback or contact our customer care</p>
                    </div>

                    <div className='contact'>
                        <ImLocation2 size='2em' className='contact-icon' />
                        <h4 className='head'>Location</h4>
                        <p className='head-info'>our restaurant is located in Nairobi</p>
                    </div>

                </div>
            </div>

            <div className='container-feedback' id='feedback'>
                <p className='feedback-head'>Send Your FeedBacks</p>
                <div className='feedback'>
                    <form className='feedbackForm' onSubmit={sendFeedback}>
                        <input type="text" className='text-input' placeholder='Feedback' value={feedback} onChange={(e) => setFeedback(e.target.value)}/><br/><br/>
                        <input type="text" className='email-input' placeholder='email' value={email} onChange={(e) => setEmail(e.target.value)} /><br/><br/>
                        <button className='send'>Send</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Contact