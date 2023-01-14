import React, { useState } from "react";
import { toast } from "react-toastify";
import { SERVER_URL } from "../constants";
import axios from "axios";

function ForgotPassword() {
  const [email, setEmail] = useState("");

  const forgotPassword = async (e) => {
    e.preventDefault();
    try {
        await axios.post(`${SERVER_URL}/auth/forgotPassword`, {
        email: email,
      })
     return toast.success("Reset Email Recovery Sent To Your Email"); 
     } catch (error) {
      if (error.response?.status === 404) {
        return toast.error("Email Does Not Exist"); //send errors if email exist in database
      }
    }
  };


  return (
    <div>
        <div className="flex flex-col justify-center items-center m-auto my-40 w-3/5 shadow-xl">
             <p className='font-black text-2xl'>Account Recovery</p>
            <form className="w-full max-w-lg py-5"  onSubmit={forgotPassword}>
                <div className="flex flex-wrap -mx-3 mb-6">
                    <div className="w-full px-3">
                    <label htmlFor="email" className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-password">Email</label>
                    <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                    placeholder="example@gmail.com" id="grid-first-name" type="text" value={email} onChange={(e) => setEmail(e.target.value)} />
                    </div>
                </div>

                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded flex flex-col m-auto">Send Email</button>
            </form>
    </div>
</div>
  )
}

export default ForgotPassword