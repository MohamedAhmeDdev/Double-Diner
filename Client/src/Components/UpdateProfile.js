import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from "axios";
import { toast } from "react-toastify";
import { UseAuthContext } from "../hook/UseAuthContext";
import { SERVER_URL } from "../constants";
import { FiUser, FiMail, FiPhone, FiHome, FiLogOut, FiEdit2 } from 'react-icons/fi';

function UpdateProfile() {
  const [name, setName] = useState(''); 
  const [phoneNumber, setPhoneNumber] = useState("");
  const [address, setAddress] = useState("");
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { id } = useParams();
  const { dispatch } = UseAuthContext();

  const handleClick = () => {
    localStorage.removeItem("user");
    dispatch({ type: "LOGOUT" });
    toast.info("You have been logged out");
  };

  const getUsById = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get(`${SERVER_URL}/auth/${id}`);
      setName(response.data.user.name);
      setEmail(response.data.user.email);
      setAddress(response.data.user.address);
      setPhoneNumber(response.data.user.phoneNumber);
    } catch (error) {
      toast.error("Failed to load profile data");
    } finally {
      setIsLoading(false);
    }
  };
  
  useEffect(() => {
    getUsById();
  }, [id]);

  const update = async (e) => {
    try {
      e.preventDefault();
      setIsLoading(true);
      
      if (!email || !name) {
        toast.error("Name and email are required");
        return;
      }

      await axios.patch(`${SERVER_URL}/auth/${id}`, {
        name: name,
        email: email,
        phoneNumber: phoneNumber,
        address: address,
      });

      let user = JSON.parse(localStorage.getItem("user"));
      user.name = name;
      user.email = email;
      localStorage.setItem("user", JSON.stringify(user));
      
      toast.success("Profile updated successfully");
    } catch (error) {
      toast.error("Failed to update profile");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto">
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          {/* Profile Header */}
          <div className="bg-gradient-to-r from-blue-500 to-blue-600 p-6 text-center">
            <div className="w-20 h-20 rounded-full bg-white mx-auto flex items-center justify-center shadow-md mb-4">
              <FiUser className="text-blue-500 text-3xl" />
            </div>
            <h1 className="text-2xl font-bold text-white">Update Profile</h1>
            <p className="text-blue-100 mt-1">Manage your account information</p>
          </div>

          {/* Profile Form */}
          <form className="p-6 space-y-6" onSubmit={update}>
            <div className="space-y-4">
              {/* Name Field */}
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FiUser className="text-gray-400" />
                </div>
                <input
                  className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Full Name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>

              {/* Email Field */}
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FiMail className="text-gray-400" />
                </div>
                <input
                  className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Email Address"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              {/* Phone Field */}
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FiPhone className="text-gray-400" />
                </div>
                <input
                  className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Phone Number"
                  type="tel"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                />
              </div>

              {/* Address Field */}
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FiHome className="text-gray-400" />
                </div>
                <input
                  className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Address"
                  type="text"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                />
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4">
              <button
                type="submit"
                disabled={isLoading}
                className={`flex-1 flex items-center justify-center px-6 py-3 border border-transparent rounded-lg shadow-sm text-white font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition ${isLoading ? 'bg-blue-400' : 'bg-blue-600 hover:bg-blue-700'}`}
              >
                {isLoading ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Updating...
                  </>
                ) : (
                  <>
                    <FiEdit2 className="mr-2" />
                    Update Profile
                  </>
                )}
              </button>

              <button
                type="button"
                onClick={handleClick}
                className="flex-1 flex items-center justify-center px-6 py-3 border border-gray-300 rounded-lg shadow-sm text-gray-700 font-medium hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition"
              >
                <FiLogOut className="mr-2" />
                Log Out
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default UpdateProfile;