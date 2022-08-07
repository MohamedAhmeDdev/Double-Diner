import React from 'react'
import '../css/Login.css'

function Login() {
    return (
        <div className='container-login'>
            <div className='container-Form'>
            <form className='LoginForm'>

                <label htmlFor="Email" className='LoginLabel'>Email</label><br />
                <input className='LoginInput' type="text" />
                <br />

                <label htmlFor="password" className='LoginLabel'>Password</label> <br />
                <input className='LoginInput' type="text" />

                <button className='submitLogin' type="submit">Login</button>
            </form>
        </div>
        </div>
    )
}

export default Login