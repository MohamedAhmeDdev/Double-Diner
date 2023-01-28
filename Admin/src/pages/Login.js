import "../css/Login.css";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { UseAuthContext } from "../hook/UseAuthContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";


const Login = () => {
  const [emailAddress, setEmailAddress] = useState("");
  const [password, setPassword] = useState("");
  let navigate = useNavigate();

  const { dispatch } = UseAuthContext();

  const login = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/auth/login", {
        email: emailAddress,
        password: password,
      });

      const json = await response.data;

      const user = json.user;

      if (response?.data?.success) { 
        if (user.role === "admin") { //if user Role equals to admin
          localStorage.setItem("user", JSON.stringify(user)); //store the info in local storage
          dispatch({ type: "LOGIN", payload: user });
          navigate("/");
        } else {
          return toast.error("Access Denied");
        }
      }
    } catch (error) {
      if (error.response?.status === 400) {
        return toast.error("Incorrect UserName Or Password");
      } else if (error.response?.status === 401) {
        return toast.error("Access Denied");
      }
    }
  };

  return (
    <div>
      <div className="container-login">
        <div className="container-Form">
          
            <div className="block p-6 rounded-lg shadow-lg bg-white w-96">
              <form onSubmit={login}>
                <div className="form-group mb-6">
                  <label htmlFor="exampleInputEmail2" className="form-label inline-block mb-2 text-gray-700">Email address</label>
                  <input type="email" className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                   id="exampleInputEmail2" aria-describedby="emailHelp" value={emailAddress} onChange={(e) => setEmailAddress(e.target.value)} placeholder="Example@gmail.com"/>
                </div>

                <div className="form-group mb-6">
                  <label htmlFor="exampleInputPassword2" className="form-label inline-block mb-2 text-gray-700">Password</label>
                  <input type="password" className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                   id="exampleInputPassword2" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password"/>
                </div>

                <Link className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800" to="/ForgotPassword">Forgot Password?</Link>
                
                <button type="submit" className=" w-full px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out">
                  Login
                </button>
              </form>
            </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
