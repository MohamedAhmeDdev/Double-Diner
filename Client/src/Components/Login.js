import React, { useState } from 'react'
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import '../css/Login.css'
import { UseAuthContext } from '../hook/UseAuthContext';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(false);
    let navigate = useNavigate();
    const { dispatch } = UseAuthContext()

    const login = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:5000/useraccount/verifyUser', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password })
            })

            const json = await response.json()
            if (response.ok) {
                localStorage.setItem('user', JSON.stringify(json))
                dispatch({ type: 'LOGIN', payload: json })
            }
        } catch (error) {
            if (error.response?.status === 400) {
                setError("not yet sign in")  //send errors if you have not sing in 
            } else if (error.response?.status === 401) {
                setError("email and password doesn't much") // /send errors if password and email does not much 
            }
        }
    }


    return (
        <div className='container-login'>
            <div className='container-Form'>
                <form className='LoginForm' onSubmit={login}>

                    <label htmlFor="Email" className='LoginLabel'>Email</label><br />
                    <input className='LoginInput' type="text" value={email} onChange={(e) => setEmail(e.target.value)} />
                    <br />

                    <label htmlFor="password" className='LoginLabel'>Password</label> <br />
                    <input className='LoginInput' type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                    {error && <p className='loginError'>{error}</p>}

                    <button className='submitLogin' type="submit">Login</button>
                    <p className='registerationLink'><Link to="/RegistrationForm">Create account if Not SignUp?</Link> </p>
                </form>
            </div>
        </div>
    )
}

export default Login