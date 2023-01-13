import "../css/Login.css";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { SERVER_URL } from "../constants";
import { UseAuthContext } from "../hook/UseAuthContext";
import Footer from "../Components/Footer";
import axios from "axios";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { dispatch } = UseAuthContext();

  const login = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${SERVER_URL}/auth/login`, {
          email: email,
          password: password,
        })
        .then((response) => {
          const user = response.data.user;

          localStorage.setItem("user", JSON.stringify(user));
          dispatch({ type: "LOGIN", payload: user });
        });
    } catch (error) {
      if (error.response?.status === 400) {
        return toast.error("Username or password is missing"); //send errors if you have not sing in
      } else if (error.response?.status === 401) {
        return toast.error("Invalid login credentials"); // /send errors if password and email does not much
      }
    }
  };

  return (
    <div className="container-login">
          <div className="container-Form">
              <div className="block p-6 rounded-lg shadow-lg bg-white w-96">
                  <form onSubmit={login}>
                    <div className="form-group mb-6">
                        <label htmlFor="exampleInputEmail2" className="form-label inline-block mb-2 text-gray-700">Email address</label>
                        <input type="email" className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                        id="exampleInputEmail2" aria-describedby="emailHelp" value={email} onChange={(e) => setEmail(e.target.value)}  placeholder="Example@gmail.com"/>
                      </div>

                      <div className="form-group mb-6">
                        <label htmlFor="exampleInputPassword2" className="form-label inline-block mb-2 text-gray-700">Password</label>
                        <input type="password" className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                        id="exampleInputPassword2" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password"/>
                      </div>

                      <div className="flex justify-between items-center mb-6">
                        <div className="form-group form-check">
                        </div>
                      </div>
                        
                      <Link class="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800" to="/ForgotPassword">Forgot Password?</Link>
                        <button type="submit" className=" w-full px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out">
                          Login
                        </button>
                        <p className="text-gray-800 mt-6 text-center">Create account if {" "}<Link className="text-sky-600" to="/signup">SignUp?</Link></p>
                </form>
              </div>
          </div>

          <Footer/>
    </div>
  );
};

export default LoginPage;
