import "../css/Login.css";

import React, { useState } from "react";

import { UseAuthContext } from "../hook/UseAuthContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [emailAddress, setEmailAddress] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
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
        if (user.role === "admin") {
          localStorage.setItem("user", JSON.stringify(user));
          dispatch({ type: "LOGIN", payload: user });
          navigate("/");
        } else {
          setError("Access Denied");
        }
      }
    } catch (error) {
      if (error.response?.status === 400) {
        setError("Incorrect UserName Or Password");
      } else if (error.response?.status === 401) {
        setError("Access Denied");
      }
    }
  };

  return (
    <div>
      <div className="container-login">
        <div className="container-Form">
          <form className="LoginForm" onSubmit={login}>
            <label htmlFor="name" className="LoginLabel">
              Email Address
            </label>
            <br />
            <input
              className="LoginInput"
              type="text"
              value={emailAddress}
              onChange={(e) => setEmailAddress(e.target.value)}
            />
            <br />
            <label htmlFor="password" className="LoginLabel">
              Password
            </label>{" "}
            <br />
            <input
              className="LoginInput"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {error && <p className="loginError">{error}</p>}
            <button className="submitLogin" type="submit">
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
