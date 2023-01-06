import "../css/RigistrationForm.css";

import { Link, useNavigate } from "react-router-dom";
import React, { useState } from "react";
import { toast } from "react-toastify";

import { SERVER_URL } from "../constants";
import axios from "axios";

const SignUpPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  let navigate = useNavigate();
  let enabled = name.length > 0 && email.length > 0 && password.length > 0;

  const createUser = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${SERVER_URL}/auth/signup`, {
        name: name,
        email: email,
        password: password,
      });
      navigate("/Login");
    } catch (error) {
      if (error.response?.status === 401) {
        return toast.error("Email already exists"); //send errors if email exist in database
      }
      if (error.response?.status === 400) {
        return toast.error("Password Must Be More Than 4"); //send errors
      }
    }
  };

  return (
    <div className="container-signup">
      <div className="container-RegistrationForm">
      <div className="block p-6 rounded-lg shadow-lg bg-white w-96">
          <form onSubmit={createUser}>
            <div className="form-group mb-6">
                <label htmlFor="exampleInputEmail2" className="form-label inline-block mb-2 text-gray-700">Enter Name</label>
                <input type="text" className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" id="exampleInputEmail2" aria-describedby="emailHelp"
                value={name} onChange={(e) => setName(e.target.value)} placeholder="John Doe"/>
              </div>

              <div className="form-group mb-6">
                <label htmlFor="exampleInputEmail2" className="form-label inline-block mb-2 text-gray-700">Email address</label>
                <input type="email" className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" id="exampleInputEmail2" aria-describedby="emailHelp"
                value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Example@gfmail.com"/>
              </div>

              <div className="form-group mb-6">
                <label htmlFor="exampleInputPassword2" className="form-label inline-block mb-2 text-gray-700">Password</label>
                <input type="password" className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" id="exampleInputPassword2"
                value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password"/>
              </div>

              <button type="submit"  disabled={!enabled} className= {!enabled ? 
              "cursor-not-allowed w-full px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded   focus:bg-blue-700 focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out" :
              "w-full px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"}>
                Sign in
              </button>
          </form>
      </div>
      </div>
    </div>
  );
};

export default SignUpPage;
