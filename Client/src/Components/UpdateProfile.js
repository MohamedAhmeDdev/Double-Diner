import React, { useState } from 'react'
import '../css/Profile.css'
import {useNavigate,useParams } from 'react-router-dom';
import axios from "axios"
import { SERVER_URL } from "../constants";
import { apiCall } from "../utils/apiCall";

function UpdateProfile() {
  const [name, setName] = useState(''); 
  const [email, setEmail] = useState(''); 
  const [errors, setErrors] = useState(false)
  let navigate = useNavigate()
  const { id } = useParams();


    const update = async (e) => {
      e.preventDefault();
      try {
        await axios.patch(`http://localhost:5000/auth/${id}`,{
              name: name,
              email: email
          })
          navigate("/profile");

      } catch (error) {
          if (error.response?.status === 400) {
              setErrors("Fields Must Not Be Empty"); //send errors 
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

            <label className='lable-profile'>Name</label>
            <input className='input-profile' type="text"  value={email} onChange={(e) => setEmail(e.target.value)}></input><br/><br/><br/>

            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Update</button>

        </form>
    </div>
   </div>
  </div>
  )
}

export default UpdateProfile