import React, { useState,   useEffect } from 'react'
import '../css/Profile.css'
import { useParams } from 'react-router-dom';
import axios from "axios"
import { toast } from "react-toastify";
import Footer from "../Components/Footer";
import { UseAuthContext } from "../hook/UseAuthContext";
import { SERVER_URL } from "../constants";


function UpdateProfile() {
  const [name, setName] = useState(''); 
  const [email, setEmail] = useState(''); 
  const { id } = useParams();
  const { dispatch } = UseAuthContext();

    // ---remove user /signOut----
    const handleClick = () => {
      localStorage.removeItem("user"); // remove use from localStorage
      dispatch({ type: "LOGOUT" }); //  dispatch log out action
    };

  const getUsById = async () => {
    const response = await axios.get(`${SERVER_URL}/auth/${id}`,)
    console.log(response);
      setName(response.data.user.name);
      setEmail(response.data.user.email);
  }
  
      useEffect(() => {
        getUsById();
      }, []);


      const update = async (e) => {
        try {
          e.preventDefault();
          if (!email || !name) {
            return toast.error("Fields Must Not Be Empty"); //send errors 
          }else{
          await axios.patch(`${SERVER_URL}/auth/${id}`,{
                name: name,
                email: email
            })
            .then((response) => {
            let user = JSON.parse(localStorage.getItem("user"));
            user.name = name;
            user.email = email;
            localStorage.setItem("user", JSON.stringify(user));
            return toast.success("Updated Profile");
          });
        }
        } catch (error) {
        }
    }

  return (
    <div>
        <div className="flex flex-col justify-center items-center my-40">
            <form className="w-full max-w-lg" onSubmit={update}>
                <div className="flex flex-wrap -mx-3 mb-6">
                    <div className="w-full px-3">
                      <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-password">Name</label>
                      <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                      id="grid-first-name" type="text" value={name} onChange={(e) => setName(e.target.value)}/>
                    </div>
                 </div>
                 <div className="flex flex-wrap -mx-3 mb-6">
                    <div className="w-full px-3">
                      <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-password">Email</label>
                      <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                      id="grid-password" type="text" value={email} onChange={(e) => setEmail(e.target.value)}/>
                    </div>
                  </div>

                  <div className="inline-flex items-center text-base font-semibold text-gray-900">
                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded flex flex-col m-auto mr-20">Edit Profile</button>
                    <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded flex flex-col m-auto" onClick={handleClick}>LogOut</button>
                </div>
            </form>
      </div>
      <Footer/>
    </div>
  )
}

export default UpdateProfile