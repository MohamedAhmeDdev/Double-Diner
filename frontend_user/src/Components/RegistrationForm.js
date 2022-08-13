import React, { useState } from 'react'
import axios from "axios";
// import { useNavigate } from 'react-router-dom';
import '../css/RigistrationForm.css'



const RegistrationForm = () => {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState(false)

    const regEx = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-z]{2,8}(.[a-z{2,8}])?/g
    // let navigate = useNavigate();

    const createUser = async (e) => {
        e.preventDefault();
        try {
            if (name.length===0 || email.length===0 || password.length===0) {
                setErrors("Fill the field")
            }else if(!regEx.test(email)){
                setErrors("invalid email")
            }
            else if(password.length<=4){
                setErrors("password must be more than 4 digits")
            }else (
                await axios.post('http://localhost:5000/useraccount', {
                    name: name,
                    email: email,
                    password: password
                })
            )
        } catch (error) {
            if (error.response?.status === 401) {
                setErrors("Email already exists");
            } 
        }
        
        // navigate("/");

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

                    {errors &&<p className='formError'>{errors}</p>}

                    <button className='submitRegistration' type="submit">Login</button>
                </form>
            </div>
        </div>
    )
}

export default RegistrationForm;