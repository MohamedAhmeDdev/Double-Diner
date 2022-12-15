import React from 'react'
import { Link } from "react-router-dom"
import { UseAuthContext } from '../hook/UseAuthContext';

function Profile() {
  const { user } = UseAuthContext()


  return (
    <div> <div className="container-profile">
    <div className="profile-div">
        <div className='profile-form'>
            <label className='lable-profile'>Name</label>
            <input className='input-profile' type="text" value={user.foundUser.name} ></input><br/><br/><br/>

            <label className='lable-profile'>Email</label>
            <input className='input-profile' type="text" value={user.foundUser.email} /><br/><br/><br/>

            <label className="password lable-profile">Password</label>
            <input className='input-profile' type="text" value={user.password} /><br/><br/>

            <Link to={`/UpdateProfile/${user.foundUser.id}`}><button className='edit-profile'>Edit</button></Link>
        </div>
    </div>
   </div>
  </div>
  )
}

export default Profile