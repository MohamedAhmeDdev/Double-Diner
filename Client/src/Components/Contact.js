import "../css/Contact.css";
import { MdPhoneAndroid } from "react-icons/md";
import { MdEmail } from "react-icons/md";
import { ImLocation2 } from "react-icons/im";
import emailjs from "emailjs-com"
import React, { useState } from "react";
import { toast } from "react-toastify";

const Contact = () => {
  const regEx = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-z]{2,8}(.[a-z{2,8}])?/g;
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [feedback, setFeedback] = useState('');

  const sendFeedback = async (e) => {
    e.preventDefault();
      if(email.length === 0 || name.length === 0 || feedback.length === 0){
        return toast.error("Field Must Not Be Empty");
      }
    else if(!regEx.test(email)) {
      return toast.error("Email Is Invalid");
    }else if(
      emailjs.sendForm("service_2p8brdn",'template_ngr7r6j', e.target, "NomCdrnrOBHS1HmPG")
      .then((result) => {
          console.log(result.text);
      }, (error) => {
          console.log(error.text);
      })
    ){
      //it remove the data which is in the input
      setEmail("");
      setName("");
      setFeedback("");
    }
    }
    




  return (
    <div className="contact-container">
      <div>
        <div className="small-div">
          <h3>Contact Us</h3>
        </div>
      </div>
      <div className="contacts">
        <div className="contact-info">
          <div className="contact">
            <MdPhoneAndroid size="2em" className="contact-icon" />
            <h4 className="head">Phone Number</h4>
            <p className="head-info">0704170598</p>
            <p className="head-info">our customer care service call is 24HRS</p>
          </div>

          <div className="contact email">
            <MdEmail size="2em" className="contact-icon" />
            <h4 className="head">Email Address</h4>
            <p className="head-info">ma07041705@gmail.com</p>
            <p className="head-info">
              you can send your feedback or contact our customer care
            </p>
          </div>

          <div className="contact">
            <ImLocation2 size="2em" className="contact-icon" />
            <h4 className="head">Location</h4>
            <p className="head-info">our restaurant is located in Nairobi</p>
          </div>
        </div>
      </div>

      <div className="container-feedback" id="feedback">
        <p className="feedback-head">Send Your FeedBacks</p>
        <div className="feedback">

        <div className="block p-6 rounded-lg shadow-lg bg-white 	margin-top: 0.75rem; w-2/5 h-85">
            <form onSubmit={sendFeedback}>
              <div className="form-group mb-6">
                <input type="text" className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                 id="exampleInput7" value={name}  onChange={(e) => setName(e.target.value)} placeholder="Name"/>
              </div>

              <div className="form-group mb-6">
                <input type="email" className="form-control block  w-full  px-3  py-1.5  text-base  font-normal  text-gray-700  bg-white bg-clip-padding  border border-solid border-gray-300  rounded  transition  ease-in-out  m-0  focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                 id="exampleInput8" value={email} onChange={(e) => setEmail(e.target.value)}  placeholder="Email address"/>
              </div>

              <div className="form-group mb-6">
                <textarea
                className=" form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                id="exampleFormControlTextarea13"
                rows="3"
                value={feedback}  onChange={(e) => setFeedback(e.target.value)}
                placeholder="Message">
                </textarea>
              </div>

              <button type="submit" className=" w-full px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out">
                Send
              </button>
          </form>
       </div>
          {/* <form className="feedbackForm" onSubmit={sendFeedback}>
            <input type="text" className="email-input" placeholder="Enter Your Email" name="email" value={email} onChange={(e) => setEmail(e.target.value)}/> <br/><br/>

            <input  type="text" className="text-input" placeholder="Enter Your Name" name="name" value={name}  onChange={(e) => setName(e.target.value)}/> <br/><br/>
            
            <input type="text" className="text-input"placeholder="Enter A Massage"  name="message" value={feedback}  onChange={(e) => setFeedback(e.target.value)}/> <br/> <br/>

            <button className="send">Send</button>
          </form> */}
        </div>
      </div>
    </div>
  );
};

export default Contact;
