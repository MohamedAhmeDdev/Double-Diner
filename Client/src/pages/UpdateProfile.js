import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from "axios";
import { toast } from "react-toastify";
import { UseAuthContext } from "../hook/UseAuthContext";
import { SERVER_URL } from "../constants";
import { FiUser, FiMail, FiPhone, FiHome, FiLogOut, FiCheck, FiLock, FiCheckCircle } from 'react-icons/fi';

function UpdateProfile() {
  // --- Core Profile Info States ---
  const [name, setName] = useState(''); 
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState("");
  const [address, setAddress] = useState("");
  const [isProfileLoading, setIsProfileLoading] = useState(false);
  
  // --- Security / Password Update States ---
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordValid, setPasswordValid] = useState(true);
  const [passwordMatch, setPasswordMatch] = useState(true);
  const [isPasswordLoading, setIsPasswordLoading] = useState(false);

  // --- Auth & Router Hooks ---
  const { dispatch } = UseAuthContext();
  const { id } = useParams(); 

  // --- Initial Data Hydration ---
  const getUserById = async () => {
    try {
      const response = await axios.get(`${SERVER_URL}/auth/${id}`);
      setName(response.data.user.name || '');
      setEmail(response.data.user.email || '');
      setAddress(response.data.user.address || '');
      setPhoneNumber(response.data.user.phoneNumber || '');
    } catch (error) {
      toast.error("Failed to fetch profile info");
    }
  };
  
  useEffect(() => {
    getUserById();
  }, [id]);

  // --- Live Validation Handlers ---
  const validatePassword = (value) => {
    setPasswordValid(value.length === 0 || value.length >= 6);
  };

  const checkPasswordMatch = (value) => {
    setPasswordMatch(value === password);
  };

  // --- Action 1: Update Core Personal Profile Info ---
  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    if (!email || !name) {
      return toast.error("Please fill out both Name and Email fields");
    }

    setIsProfileLoading(true);
    try {
      await axios.patch(`${SERVER_URL}/auth/${id}`, {
        name: name,
        email: email,
        phoneNumber: phoneNumber,
        address: address,
      });
      
      const user = JSON.parse(localStorage.getItem("user"));
      if (user) {
        user.name = name;
        user.email = email;
        localStorage.setItem("user", JSON.stringify(user));
      }
      
      toast.success("Personal data updated successfully");
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to update details.");
    } finally {
      setIsProfileLoading(false);
    }
  };

  // --- Action 2: Update Password Credentials ---
  const handleUpdatePassword = async (e) => {
    e.preventDefault();
    
    if (!password || !confirmPassword) {
      return toast.error("Both password entry fields are required");
    }
    if (password.length < 6) {
      setPasswordValid(false);
      return toast.error("Password must be at least 6 characters");
    }
    if (password !== confirmPassword) {
      setPasswordMatch(false);
      return toast.error("Passwords do not match");
    }

    setIsPasswordLoading(true);
    try {
      await axios.put(`${SERVER_URL}/auth/reset/${id}`, {
        password: password,
        confirm_password: confirmPassword
      });
      
      setPassword('');
      setConfirmPassword('');
      toast.success("Security credentials modified successfully!");
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to alter password key.");
    } finally {
      setIsPasswordLoading(false);
    }
  };

  // --- Action 3: Clear Local Session State ---
  const handleLogout = () => {
    localStorage.removeItem("user");
    dispatch({ type: "LOGOUT" });
    toast.info("Session destroyed. Goodbye!");
  };

  return (
    <div className="min-h-screen bg-white text-gray-900 p-6 md:p-12 lg:p-16 max-w-5xl mx-auto antialiased">
      
      {/* Settings Dashboard Header */}
      <div className="border-b border-gray-200 pb-6 mb-12 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-gray-900">Account Preferences</h1>
          <p className="text-sm text-gray-500 mt-1">Configure your personal profile details and safety parameters.</p>
        </div>
      </div>

      <div className="space-y-12">
        
        {/* Section 1: Personal Details Form */}
        <form onSubmit={handleUpdateProfile} className="grid grid-cols-1 md:grid-cols-3 gap-8 pb-10 border-b border-gray-200">
          <div className="md:col-span-1 space-y-1">
            <h2 className="text-base font-semibold text-gray-900">Personal Details</h2>
            <p className="text-sm text-gray-500 leading-relaxed max-w-xs">
              Change your main identifying markers, locations, and phone strings used for status notifications.
            </p>
          </div>

          <div className="md:col-span-2 space-y-5 max-w-xl">
            {/* Full Name */}
            <div className="space-y-1.5">
              <label htmlFor="name" className="block text-xs font-semibold uppercase tracking-wider text-gray-500">
                Full Name
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FiUser className="text-gray-400 text-sm" />
                </div>
                <input
                  type="text"
                  id="name"
                  className="block w-full pl-9 pr-3 py-2.5 border border-gray-200 rounded-lg text-sm text-gray-900 placeholder-gray-400 focus:bg-white focus:ring-1 focus:ring-gray-900 focus:border-gray-900 transition-all outline-none"
                  placeholder="John Doe"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
            </div>

            {/* Email Address */}
            <div className="space-y-1.5">
              <label htmlFor="email" className="block text-xs font-semibold uppercase tracking-wider text-gray-500">
                Email Address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FiMail className="text-gray-400 text-sm" />
                </div>
                <input
                  type="email"
                  id="email"
                  className="block w-full pl-9 pr-3 py-2.5 border border-gray-200 rounded-lg text-sm text-gray-900 placeholder-gray-400 focus:bg-white focus:ring-1 focus:ring-gray-900 focus:border-gray-900 transition-all outline-none"
                  placeholder="your@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>

            {/* Phone Number */}
            <div className="space-y-1.5">
              <label htmlFor="phoneNumber" className="block text-xs font-semibold uppercase tracking-wider text-gray-500">
                Phone Number
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FiPhone className="text-gray-400 text-sm" />
                </div>
                <input
                  type="tel"
                  id="phoneNumber"
                  className="block w-full pl-9 pr-3 py-2.5 border border-gray-200 rounded-lg text-sm text-gray-900 placeholder-gray-400 focus:bg-white focus:ring-1 focus:ring-gray-900 focus:border-gray-900 transition-all outline-none"
                  placeholder="+1 (555) 000-0000"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                />
              </div>
            </div>

            {/* Address */}
            <div className="space-y-1.5">
              <label htmlFor="address" className="block text-xs font-semibold uppercase tracking-wider text-gray-500">
                Address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FiHome className="text-gray-400 text-sm" />
                </div>
                <input
                  type="text"
                  id="address"
                  className="block w-full pl-9 pr-3 py-2.5 border border-gray-200 rounded-lg text-sm text-gray-900 placeholder-gray-400 focus:bg-white focus:ring-1 focus:ring-gray-900 focus:border-gray-900 transition-all outline-none"
                  placeholder="123 Main St, City, Country"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                />
              </div>
            </div>

            {/* Save Profile Button */}
            <div className="flex justify-end pt-2">
              <button
                type="submit"
                disabled={isProfileLoading || !name || !email}
                className={`inline-flex items-center justify-center py-2 px-4 rounded-lg text-xs font-medium transition-all ${
                  isProfileLoading || !name || !email
                    ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                    : 'bg-gray-900 hover:bg-black text-white shadow-sm'
                }`}
              >
                {isProfileLoading ? 'Saving Info...' : <><FiCheck className="mr-1.5" /> Save Details</>}
              </button>
            </div>
          </div>
        </form>


        {/* Section 2: Security & Password Update Form */}
        <form onSubmit={handleUpdatePassword} className="grid grid-cols-1 md:grid-cols-3 gap-8 pb-10 border-b border-gray-200">
          <div className="md:col-span-1 space-y-1">
            <h2 className="text-base font-semibold text-gray-900">Security Credentials</h2>
            <p className="text-sm text-gray-500 leading-relaxed max-w-xs">
              Change the password configuration keys required to log safely into this control space.
            </p>
          </div>

          <div className="md:col-span-2 space-y-5 max-w-xl">
            {/* New Password */}
            <div className="space-y-1.5">
              <label htmlFor="password" className="block text-xs font-semibold uppercase tracking-wider text-gray-500">
                New Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FiLock className="text-gray-400 text-sm" />
                </div>
                <input
                  type="password"
                  id="password"
                  className={`block w-full pl-9 pr-3 py-2.5 border rounded-lg text-sm text-gray-900 placeholder-gray-400 focus:bg-white transition-all outline-none ${
                    passwordValid 
                      ? 'border-gray-200 focus:ring-1 focus:ring-gray-900 focus:border-gray-900' 
                      : 'border-red-300 focus:ring-1 focus:ring-red-500 focus:border-red-500'
                  }`}
                  placeholder="Minimum 6 characters"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    validatePassword(e.target.value);
                    if (confirmPassword) checkPasswordMatch(confirmPassword);
                  }}
                />
              </div>
              {!passwordValid && (
                <p className="text-[11px] font-medium text-red-500 mt-1">Password must be at least 6 characters</p>
              )}
            </div>

            {/* Confirm Password */}
            <div className="space-y-1.5">
              <label htmlFor="confirmPassword" className="block text-xs font-semibold uppercase tracking-wider text-gray-500">
                Confirm New Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FiCheckCircle className="text-gray-400 text-sm" />
                </div>
                <input
                  type="password"
                  id="confirmPassword"
                  className={`block w-full pl-9 pr-3 py-2.5 border rounded-lg text-sm text-gray-900 placeholder-gray-400 focus:bg-white transition-all outline-none ${
                    passwordMatch 
                      ? 'border-gray-200 focus:ring-1 focus:ring-gray-900 focus:border-gray-900' 
                      : 'border-red-300 focus:ring-1 focus:ring-red-500 focus:border-red-500'
                  }`}
                  placeholder="Re-enter your new credentials"
                  value={confirmPassword}
                  onChange={(e) => {
                    setConfirmPassword(e.target.value);
                    checkPasswordMatch(e.target.value);
                  }}
                />
              </div>
              {!passwordMatch && (
                <p className="text-[11px] font-medium text-red-500 mt-1">Passwords do not match</p>
              )}
            </div>

            {/* Update Password Button */}
            <div className="flex justify-end pt-2">
              <button
                type="submit"
                disabled={isPasswordLoading || !password || !confirmPassword || !passwordValid || !passwordMatch}
                className={`inline-flex items-center justify-center py-2 px-4 rounded-lg text-xs font-medium transition-all ${
                  isPasswordLoading || !password || !confirmPassword || !passwordValid || !passwordMatch
                    ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                    : 'bg-gray-900 hover:bg-black text-white shadow-sm'
                }`}
              >
                {isPasswordLoading ? 'Updating...' : <><FiLock className="mr-1.5" /> Update Password</>}
              </button>
            </div>
          </div>
        </form>


        {/* Section 3: Danger Zone / Sign Out Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pb-6">
          <div className="md:col-span-1 space-y-1">
            <h2 className="text-base font-semibold text-gray-900">Account Session</h2>
            <p className="text-sm text-gray-500 leading-relaxed max-w-xs">
              Disconnect safely from your current dashboard instance context.
            </p>
          </div>

          <div className="md:col-span-2 max-w-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <span className="block text-sm font-medium text-gray-900">Terminate Active Access</span>
              <p className="text-xs text-gray-400 mt-0.5">This clears cookies, authorization headers, and saved objects locally.</p>
            </div>
            
            <button
              type="button"
              onClick={handleLogout}
              className="inline-flex items-center justify-center py-2 px-4 border border-red-200 text-red-600 rounded-lg text-xs font-medium hover:bg-red-50/50 active:bg-red-50 transition-all tracking-wide shadow-sm"
            >
              <FiLogOut className="mr-1.5" /> Sign out
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}

export default UpdateProfile;