import React, { useState,   useEffect } from 'react'
import { useParams } from 'react-router-dom';
import axios from "axios"
import { toast } from "react-toastify";
import { UseAuthContext } from "../hook/UseAuthContext";

function UpdateProfile() {
  const [name, setName] = useState(''); 
  const [email, setEmail] = useState('');
  const { dispatch } = UseAuthContext();
  const { id } = useParams(); 

  const getUsById = async () => {
    const response = await axios.get(`http://localhost:5000/auth/${id}`,)
    console.log(response);
      setName(response.data.user.name);
      setEmail(response.data.user.email);
  }
  
      useEffect(() => {
        getUsById();
      }, []);


  const update = async (e) => {
    e.preventDefault();
    try {
      await axios.patch(`http://localhost:5000/auth/${id}`,{
            name: name,
            email: email
        })
        return toast.success("Updated Profile");
        

    } catch (error) {
        if (error.response?.status === 400) {
          return toast.error("Fields Must Not Be Empty"); //send errors 
        }
    }
}

const handleClick = () => {
  localStorage.removeItem("user"); // remove use from localStorage
  dispatch({ type: "LOGOUT" }); //  dispatch log out action
};


  return (
    <div class="flex flex-col justify-center items-center my-20">
        <form class="w-full max-w-lg">
            <div class="flex flex-wrap -mx-3 mb-6">
                <div class="w-full px-3">
                  <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-password">Name</label>
                  <input class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                   id="grid-first-name" type="text" value={name} onChange={(e) => setName(e.target.value)}/>
                </div>
          </div>
          <div class="flex flex-wrap -mx-3 mb-6">
                <div class="w-full px-3">
                  <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-password">Email</label>
                  <input class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                   id="grid-password" type="text" value={email} onChange={(e) => setEmail(e.target.value)}/>
                </div>
          </div>
        </form>

        <button class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded flex flex-col m-auto" onClick={handleClick}>LogOut</button>
   </div>
  )
}

export default UpdateProfile