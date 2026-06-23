import { Link, useNavigate } from "react-router-dom";
import React, { useState } from "react";
import { toast } from "react-toastify";
import { SERVER_URL } from "../../constants";
import axios from "axios";
import { FiUser, FiMail, FiPhone, FiHome, FiLock, FiArrowRight, FiMapPin } from "react-icons/fi";

const SignUp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState(""); // Added city state
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-z]{2,}$/;

  const createUser = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      if (password.length < 6) {
        toast.error("Password must be at least 6 characters");
        return;
      } else if (!emailRegex.test(email)) {
        toast.error("Please enter a valid email address");
        return;
      }

      await axios.post(`${SERVER_URL}/auth/signup`, {
        name: name,
        phone: phoneNumber,
        address: address,
        city: city,
        email: email,
        password: password,
      });

      toast.success("Account created successfully!");
      navigate("/Login");
    } catch (error) {
      if (error.response?.status === 401) {
        toast.error("Email already exists");
      } else {
        toast.error("Registration failed. Please try again.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4 antialiased">
      <div className="w-full max-w-md">
        {/* Signup Card */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
          {/* Header */}
          <div className="p-8 text-center bg-white border-b border-gray-100">
            <div className="flex justify-center mb-3">
              <div className="p-3 bg-gray-900 rounded-lg text-white">
                <FiUser className="text-2xl" />
              </div>
            </div>
            <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Create Account</h1>
            <p className="text-sm text-gray-500 mt-1">Join us and start your journey</p>
          </div>

          {/* Form */}
          <form className="p-8 space-y-4" onSubmit={createUser}>
            {/* Name Field */}
            <div className="space-y-1.5">
              <label htmlFor="name" className="block text-xs font-semibold uppercase tracking-wider text-gray-600">
                Full Name
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FiUser className="text-gray-400 text-sm" />
                </div>
                <input
                  type="text"
                  id="name"
                  className="block w-full pl-9 pr-3 py-2.5 border border-gray-300 rounded-lg text-sm text-gray-900 placeholder-gray-400 focus:ring-1 focus:ring-gray-900 focus:border-gray-900 transition outline-none"
                  placeholder="John Doe"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
            </div>

            {/* Email Field */}
            <div className="space-y-1.5">
              <label htmlFor="email" className="block text-xs font-semibold uppercase tracking-wider text-gray-600">
                Email Address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FiMail className="text-gray-400 text-sm" />
                </div>
                <input
                  type="email"
                  id="email"
                  className="block w-full pl-9 pr-3 py-2.5 border border-gray-300 rounded-lg text-sm text-gray-900 placeholder-gray-400 focus:ring-1 focus:ring-gray-900 focus:border-gray-900 transition outline-none"
                  placeholder="your@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>

            {/* Phone Field */}
            <div className="space-y-1.5">
              <label htmlFor="phone" className="block text-xs font-semibold uppercase tracking-wider text-gray-600">
                Phone Number
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FiPhone className="text-gray-400 text-sm" />
                </div>
                <input
                  type="tel"
                  id="phone"
                  className="block w-full pl-9 pr-3 py-2.5 border border-gray-300 rounded-lg text-sm text-gray-900 placeholder-gray-400 focus:ring-1 focus:ring-gray-900 focus:border-gray-900 transition outline-none"
                  placeholder="0712345678"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                />
              </div>
            </div>

            {/* Address Field */}
            <div className="space-y-1.5">
              <label htmlFor="address" className="block text-xs font-semibold uppercase tracking-wider text-gray-600">
                Address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FiHome className="text-gray-400 text-sm" />
                </div>
                <input
                  type="text"
                  id="address"
                  className="block w-full pl-9 pr-3 py-2.5 border border-gray-300 rounded-lg text-sm text-gray-900 placeholder-gray-400 focus:ring-1 focus:ring-gray-900 focus:border-gray-900 transition outline-none"
                  placeholder="Your address"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                />
              </div>
            </div>

            {/* City Field - NEW */}
            <div className="space-y-1.5">
              <label htmlFor="city" className="block text-xs font-semibold uppercase tracking-wider text-gray-600">
                City
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FiMapPin className="text-gray-400 text-sm" />
                </div>
                <input
                  type="text"
                  id="city"
                  className="block w-full pl-9 pr-3 py-2.5 border border-gray-300 rounded-lg text-sm text-gray-900 placeholder-gray-400 focus:ring-1 focus:ring-gray-900 focus:border-gray-900 transition outline-none"
                  placeholder="Your city"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="space-y-1.5">
              <label htmlFor="password" className="block text-xs font-semibold uppercase tracking-wider text-gray-600">
                Password (min 6 characters)
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FiLock className="text-gray-400 text-sm" />
                </div>
                <input
                  type="password"
                  id="password"
                  className="block w-full pl-9 pr-3 py-2.5 border border-gray-300 rounded-lg text-sm text-gray-900 placeholder-gray-400 focus:ring-1 focus:ring-gray-900 focus:border-gray-900 transition outline-none"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  minLength="6"
                  required
                />
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className={`w-full !mt-6 flex justify-center items-center py-2.5 px-4 rounded-lg shadow-sm text-sm font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900 transition-all ${
                isLoading
                  ? 'bg-gray-200 text-gray-400 cursor-not-allowed shadow-none'
                  : 'bg-gray-900 hover:bg-black text-white'
              }`}
            >
              {isLoading ? (
                <>
                  <svg className="animate-spin -ml-1 mr-3 h-4 w-4 text-gray-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Creating account...
                </>
              ) : (
                <>
                  Create Account <FiArrowRight className="ml-2 text-sm" />
                </>
              )}
            </button>

            {/* Login Link */}
            <div className="text-center text-xs text-gray-500 !mt-5">
              Already have an account?{' '}
              <Link
                to="/Login" 
                className="font-semibold text-gray-900 hover:underline transition"
              >
                Sign in
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUp;