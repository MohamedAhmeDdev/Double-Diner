import React from 'react'
import { UseAuthContext } from '../hook/UseAuthContext';
import '../css/Profile.css'

function Profile() {
  const { user } = UseAuthContext()


  return (
    <div className="container-profile">
        <div className="profile-div">
            <form className='profile-form'>
                {/* <label className='lable-profile'>Name</label>
                <input className='input-profile' type="text" value={user.name} ></input><br/><br/><br/> */}

                <label className='lable-profile'>Email</label>
                <input className='input-profile' type="text" value={user.email} /><br/><br/><br/>

                <label className="password lable-profile">Password</label>
                <input className='input-profile' type="text" value={user.password} />
            </form>
        </div>
    </div>
  )
}

export default Profile