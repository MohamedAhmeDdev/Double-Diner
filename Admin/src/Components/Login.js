import React, { useState } from 'react'
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import '../css/Login.css'
import { UseAuthContext } from '../hook/UseAuthContext';

function Login() {
    const [fullName, setFullName] = useState('');
    const [department, setDepartment] = useState('');
    const [error, setError] = useState(false);
    let navigate = useNavigate();
    const { dispatch } = UseAuthContext()

    const login = async (e) => {
        e.preventDefault();
        try {

            const response = await fetch('http://localhost:5000/useraccount/verifyAdmin', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ fullName, department })
            })

            const json = await response.json()
            if (response.ok) {
                localStorage.setItem('user', JSON.stringify(json))
                dispatch({ type: 'LOGIN', payload: json })
            }
        } catch (error) {
            if (error.response?.status === 400) {
                setError("Incorrect UserName Or Password")

            } else if (error.response?.status === 401) {
                setError("Access Denied")
            }
        }
    }


    return (
        <div>
            <div className='container-login'>
                <div className='container-Form'>
                    <form className='LoginForm' onSubmit={login}>

                        <label htmlFor="name" className='LoginLabel'>UserName</label><br />
                        <input className='LoginInput' type="text" value={fullName} onChange={(e) => setFullName(e.target.value)} />
                        <br />

                        <label htmlFor="password" className='LoginLabel'>Password</label> <br />
                        <input className='LoginInput' type="password" value={department} onChange={(e) => setDepartment(e.target.value)} />
                        {error && <p className='loginError'>{error}</p>}

                        <button className='submitLogin' type="submit">Login</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Login