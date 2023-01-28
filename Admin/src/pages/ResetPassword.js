import React, { useState } from "react";
import { toast } from "react-toastify";
import { SERVER_URL } from "../constants";
import axios from "axios";
import { useParams } from 'react-router-dom';


function ResetPassword() {
    const [password, setPassword] =useState("")
    const [confirm_password, setConfirm_password] =useState("")
    const { id } = useParams();

    const resetPassword = async (e) => {
      e.preventDefault();
      try {
        if (password.length < 4 || confirm_password < 4){
          return toast.error("Password Must Be More Than 4")
        }
        else{
          await axios.put(`${SERVER_URL}/auth/reset/${id}`, {
         password: password,
         confirm_password: confirm_password
        })
        {
          setPassword('');
         setConfirm_password('');
          toast.success("Password updated")
        }
       }
       } catch (error) {
        if (error.response?.status === 400) {
          return toast.error("Password Does Not Much"); //send errors 
        }
      }
    };

  return (
    <div className="flex flex-col justify-center items-center m-auto my-40 w-3/5 shadow-xl">
        <p className='font-black text-2xl'>Reset Password</p>
        <form className="w-full max-w-lg py-5" onSubmit={resetPassword}>
            <div className="flex flex-wrap -mx-3 mb-6">
                <div className="w-full px-3">
                  <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-password">password</label>
                  <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                   id="grid-first-name" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                </div>
            </div>

            <div className="flex flex-wrap -mx-3 mb-6">
                <div className="w-full px-3">
                  <label  className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-password">Confirm Password</label>
                  <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                    id="grid-first-name" type="password" value={confirm_password} onChange={(e) => setConfirm_password(e.target.value)} />
                </div>
            </div>

            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded flex flex-col m-auto">Reset</button>
        </form>
    </div>
  )
}

export default ResetPassword