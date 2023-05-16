import React, { useEffect, useState } from "react";
import { useParams , useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { apiCall } from "../../utils/apiCall";
import axios from "axios";
import { SERVER_URL } from "../constants";


function SingleCustomerId() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [role, setRole] = useState("");
    const { id } = useParams();
  const navigate = useNavigate();

    const getCustomerById = async () => {
      const response = await axios.get(`http://${SERVER_URL}/auth/${id}`,)
        setName(response.data.user.name);
        setEmail(response.data.user.email);
        setRole(response.data.user.role);
    }
    
        useEffect(() => {
            getCustomerById();
        }, []);


    const updateUser = (e) => {
      e.preventDefault();
        try {
         apiCall(`/users/${id}`, "PATCH", { 
         role: role
     })
     

     toast.success("User Updated successfully");
     navigate("/customers");

     } catch (error) {
        if (error.response?.status === 400) {
           return toast.error("Server error");
         }
        }
     }

  return (
   <div className="flex flex-col justify-center items-center my-10">
      <form className="w-full max-w-lg">
        <div className="flex flex-wrap -mx-3 mb-6">
            <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-first-name">Name</label>
            <input className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="grid-first-name" type="text"
             value={name}
             onChange={(e) => setName(e.target.value)}/>
            </div>

            <div className="w-full md:w-1/2 px-3">
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-last-name">Email</label>
            <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-last-name" type="text"
             value={email}
             onChange={(e) => setEmail(e.target.value)}/>
            </div>
        </div>

        <div className="flex flex-wrap -mx-3 mb-6">
            <div className="w-full px-3">
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-password">Role</label>
            <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-password" type="text"
             value={role} 
             onChange={(e) => setRole(e.target.value)}/>
        </div>
        </div>
         <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
         onClick={updateUser} >
            update
        </button>
    </form>
   </div>
  )
}

export default SingleCustomerId