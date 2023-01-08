import React from 'react'
import { Link } from "react-router-dom"
import { UseAuthContext } from '../hook/UseAuthContext';
import Footer from "../Components/Footer";

function Profile() {
  const { user } = UseAuthContext()


  return (
    <div>
        <div className="container-profile">
          <div className="profile-div">
            <div className='profile-form'>
                <label className='lable-profile'>Name</label>
                <input className='input-profile' type="text" value={user.name} ></input><br/><br/><br/>

                <label className='lable-profile'>Email</label>
                <input className='input-profile' type="text" value={user.email} /><br/><br/><br/>

                <Link to={`/UpdateProfile/${user.id}`}>
                  <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Edit</button>
                </Link>
            </div>
          </div>
       </div>

       <Footer/>
  </div>
  )
}

export default Profile