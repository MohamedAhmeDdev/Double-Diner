import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom';
import axios from "axios"
import { toast } from "react-toastify";
import { UseAuthContext } from "../hook/UseAuthContext";
import { SERVER_URL } from "../constants";
import { FiUser, FiMail, FiEdit2, FiLogOut } from "react-icons/fi";

function UpdateProfile() {
  const [name, setName] = useState(''); 
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { dispatch } = UseAuthContext();
  const { id } = useParams(); 

  const getUserById = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get(`${SERVER_URL}/auth/${id}`);
      setName(response.data.user.name);
      setEmail(response.data.user.email);
    } catch (error) {
      toast.error("Failed to fetch user data");
    } finally {
      setIsLoading(false);
    }
  };
  
  useEffect(() => {
    getUserById();
  }, []);

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      if (!email || !name) {
        return toast.error("Please fill in all fields");
      }
      
      setIsLoading(true);
      await axios.patch(`${SERVER_URL}/auth/${id}`, {
        name: name,
        email: email
      });
      
      // Update local storage
      const user = JSON.parse(localStorage.getItem("user"));
      user.name = name;
      user.email = email;
      localStorage.setItem("user", JSON.stringify(user));
      
      toast.success("Profile updated successfully");
    } catch (error) {
      toast.error("Failed to update profile");
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    dispatch({ type: "LOGOUT" });
    toast.info("You have been logged out");
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-indigo-500 to-purple-600 p-6 text-white">
          <h1 className="text-2xl font-bold">Admin Profile</h1>
          <p className="text-indigo-100">Update your account information</p>
        </div>
        
        {/* Form */}
        <form className="p-6 space-y-6" onSubmit={handleUpdate}>
          {/* Name Field */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700 items-center">
              <FiUser className="mr-2" /> Name
            </label>
            <div className="relative">
              <input
                className="w-full px-4 py-3 pl-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Your name"
              />
              <FiUser className="absolute left-3 top-3.5 text-gray-400" />
            </div>
          </div>
          
          {/* Email Field */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700  items-center">
              <FiMail className="mr-2" /> Email
            </label>
            <div className="relative">
              <input
                className="w-full px-4 py-3 pl-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your email"
              />
              <FiMail className="absolute left-3 top-3.5 text-gray-400" />
            </div>
          </div>
          
          {/* Buttons */}
          <div className="flex space-x-4 pt-4">
            <button
              type="submit"
              disabled={isLoading}
              className={`flex-1 flex items-center justify-center px-4 py-3 rounded-lg font-medium text-white bg-indigo-600 hover:bg-indigo-700 transition ${
                isLoading ? 'opacity-70 cursor-not-allowed' : ''
              }`}
            >
              <FiEdit2 className="mr-2" />
              {isLoading ? 'Updating...' : 'Update Profile'}
            </button>
            
            <button
              type="button"
              onClick={handleLogout}
              className="flex-1 flex items-center justify-center px-4 py-3 rounded-lg font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 transition"
            >
              <FiLogOut className="mr-2" />
              Logout
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default UpdateProfile;