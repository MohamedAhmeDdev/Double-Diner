import React, { useState } from 'react'
import axios from 'axios';
import '../css/Login.css'

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(false);

    const login = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5000/login', {
                email: email,
                password: password
            })
            console.log(response?.data);

        } catch (error) {
            if (error.response?.status === 400) {
                setError("not yet sign in")

            } else if (error.response?.status === 401) {
                setError("email and password doesn't much")

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
                    <input className='LoginInput' type="text" value={password} onChange={(e) => setPassword(e.target.value)} />
                    {error && <p className='loginError'>{error}</p>}

                    <button className='submitLogin' type="submit">Login</button>
                </form>
            </div>
        </div>
    )
}

export default Login