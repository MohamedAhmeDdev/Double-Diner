import "../css/Login.css";

import React, { useState } from "react";

import { Link } from "react-router-dom";
import { SERVER_URL } from "../constants";
import { UseAuthContext } from "../hook/UseAuthContext";
import axios from "axios";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const { dispatch } = UseAuthContext();

  const login = async (e) => {
    e.preventDefault();
    try {
      await axios
        .post(`${SERVER_URL}/auth/login`, {
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
        setError("not yet sign in"); //send errors if you have not sing in
      } else if (error.response?.status === 401) {
        setError("email and password doesn't much"); // /send errors if password and email does not much
      }
    }
  };

  return (
    <div className="container-login">
      <div className="container-Form">
        <form className="LoginForm" onSubmit={login}>
          <label htmlFor="Email" className="LoginLabel">
            Email
          </label>
          <br />
          <input
            className="LoginInput"
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <br />
          <label htmlFor="password" className="LoginLabel">
            {" "}
            Password
          </label>
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
          <p className="LoginLink">
            {" "}
            Create account if <Link to="/RegistrationForm">SignUp?</Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
