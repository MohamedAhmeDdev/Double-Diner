import React from 'react'
import '../css/RigistrationForm.css'

function RegistrationForm() {
    return (
        <div className='container-RegistrationForm'>
            <form className='RegistrationForm'>
                <label htmlFor="name" className='RegistrationLabel'>Name</label> <br />
                <input className="RegistrationInput" type="text" />
                <br />

                <label htmlFor="Email" className='RegistrationLabel'>Email</label><br />
                <input className='RegistrationInput' type="text" />
                <br />

                <label htmlFor="password" className='RegistrationLabel'>Password</label> <br />
                <input className='RegistrationInput' type="text" />

                <button className='submitRegistration' type="submit">Login</button>
            </form>
        </div>
    )
}

export default RegistrationForm