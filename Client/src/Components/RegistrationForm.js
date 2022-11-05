import React, { useState } from 'react'
import axios from "axios";
import {  Link, useNavigate } from 'react-router-dom';
import '../css/RigistrationForm.css'
import { UseAuthContext } from '../hook/UseAuthContext';



const RegistrationForm = () => {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState(false)
    let navigate = useNavigate()
    const{dispatch} = UseAuthContext()



    const createUser = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:5000/useraccount', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name, email, password })
            })

            const json = await response.json()
            if (!response.ok) {
                console.log(json.error);
            }

            if (response.ok) {
                // save the user to local storage 
                localStorage.setItem('user', JSON.stringify(json))

                // update the auth context 
                dispatch({ type: 'LOGIN', payload: json })
            }

        } catch (error) {
            if (error.response?.status === 401) {
                setErrors("Email already exists"); //send errors if email exist in database
            }
            if (error.response?.status === 400) {
                setErrors("Invalid Credential"); //send errors 
            }
        }
    }

    return (
        <div className='container-signup'>
            <div className='container-RegistrationForm'>
                <form className='RegistrationForm' onSubmit={createUser}>
                    <label htmlFor="name" className='RegistrationLabel'>Name</label>
                    <input className="RegistrationInput" type="text" value={name} onChange={(e) => setName(e.target.value)} />

                    <label htmlFor="Email" className='RegistrationLabel'>Email</label>
                    <input className='RegistrationInput' type="text" value={email} onChange={(e) => setEmail(e.target.value)} />

                    <label htmlFor="password" className='RegistrationLabel'>Password</label>
                    <input className='RegistrationInput' type="password" value={password} onChange={(e) => setPassword(e.target.value)} />

                    {errors && <p className='formError'>{errors}</p>}

                    <button className='submitRegistration' type="submit">Signup</button>

                    <p className='registerationLink'><Link to="/Login">Login</Link> </p>
                </form>

            </div>
        </div>
    )
}

export default RegistrationForm;