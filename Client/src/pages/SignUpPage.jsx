import "../css/RigistrationForm.css";

import { Link, useNavigate } from "react-router-dom";
import React, { useState } from "react";

import { SERVER_URL } from "../constants";
import axios from "axios";

const SignUpPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState(false);
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
        setErrors("Email already exists"); //send errors if email exist in database
      }
      if (error.response?.status === 400) {
        setErrors("Invalid Credential"); //send errors
      }
    }
  };

  return (
    <div className="container-signup">
      <div className="container-RegistrationForm">
        <form className="RegistrationForm" onSubmit={createUser}>
          <label htmlFor="name" className="RegistrationLabel">Name</label>
          <input className="RegistrationInput" type="text" value={name} onChange={(e) => setName(e.target.value)}/>

          <label htmlFor="Email" className="RegistrationLabel"> Email</label>
          <input className="RegistrationInput" type="text" value={email} onChange={(e) => setEmail(e.target.value)}/>

          <label htmlFor="password" className="RegistrationLabel">Password</label>
          <input className="RegistrationInput" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />

          {errors && <p className="formError">{errors}</p>}
          <button className={!enabled ? "disable" : "submitRegistration"} disabled={!enabled} type="submit">Signup</button>
        </form>
      </div>
    </div>
  );
};

export default SignUpPage;
