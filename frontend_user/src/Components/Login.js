import React from 'react'
import '../css/Login.css'

function Login() {
    return (
        <div className='container-LoginForm'>
            <form className='LoginForm'>

                <label htmlFor="Email" className='LoginLabel'>Email</label><br />
                <input className='LoginInput' type="text" />
                <br />

                <label htmlFor="password" className='LoginLabel'>Password</label> <br />
                <input className='LoginInput' type="text" />

                <button className='submitLogin' type="submit">Login</button>
            </form>
        </div>
    )
}

export default Login