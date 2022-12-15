import React, { useState } from 'react'
import { UseAuthContext } from '../hook/UseAuthContext';
import '../css/Profile.css'
import {useNavigate,useParams } from 'react-router-dom';
import axios from "axios"


function UpdateProfile() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState(false)
  let navigate = useNavigate()
  const { id } = useParams();
    const { user } = UseAuthContext()


    const update = async (e) => {
      e.preventDefault();
      try {
           await axios.patch(`http://localhost:5000/useraccount/${id}`, {
              name: name,
              email: email,
              password: password
          })
          navigate("/Login");

      } catch (error) {
          if (error.response?.status === 401) {
              setErrors("Email already exists"); //send errors if email exist in database
          }
          if (error.response?.status === 400) {
              setErrors("Fields Must Not Be Empty/Invalid Email"); //send errors 
          }
      }
  }

  return (
    <div> <div className="container-profile">
        

    <div className="profile-div">
    {errors && <div className="ProfileError"><p>{errors}</p></div>}
        <form className='profile-form' onSubmit={update}>
            <label className='lable-profile'>Name</label>
            <input className='input-profile' type="text"  value={name} onChange={(e) => setName(e.target.value)}></input><br/><br/><br/>

            <label className='lable-profile'>Email</label>
            <input className='input-profile' type="text"  value={email} onChange={(e) => setEmail(e.target.value)}/><br/><br/><br/>

            <label className="password lable-profile">Password</label>
            <input className='input-profile' type="text"  value={password} onChange={(e) => setPassword(e.target.value)}/><br/><br/>

            <button className='edit-profile'>Update</button>

        </form>
    </div>
   </div>
  </div>
  )
}

export default UpdateProfile