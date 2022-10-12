import React, { useState } from 'react'
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import '../css/Registration.css'

function Register() {
    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState(false)
    let navigate = useNavigate()


    const createUser = async (e) => {
        e.preventDefault();
        try {
            if (userName.length === 0 || password.length === 0) {
                setErrors("Fill the field")
            } 
            else if (password.length <= 4) {
                setErrors("password must be more than 4 digits")
            } else if (
                await axios.post('http://localhost:5000/admin', {
                    userName: userName,
                    password: password
                })
            ) {
                // navigate("/login");
            }
        } catch (error) {
            if (error.response?.status === 401) {
                setErrors("Email already exists"); //send errors if email exist in database
            }
        }

    }

  return (
    <div>
        <div className='container-signup'>
            <div className='container-RegistrationForm'>
                <form className='RegistrationForm' onSubmit={createUser}>
                    <label htmlFor="name" className='RegistrationLabel'>UserName</label>
                    <input className="RegistrationInput" type="text" value={userName} onChange={(e) => setUserName(e.target.value)} />

                    <label htmlFor="password" className='RegistrationLabel'>Password</label>
                    <input className='RegistrationInput' type="password" value={password} onChange={(e) => setPassword(e.target.value)} />

                    {errors && <p className='formError'>{errors}</p>}

                    <button className='submitRegistration' type="submit">Signup</button>
                </form>
            </div>
        </div>
    </div>
  )
}

export default Register