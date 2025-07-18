import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UseAuthContext } from "../hook/UseAuthContext";
import axios from "axios";
import { toast } from "react-toastify";
import { SERVER_URL } from "../constants";
import { FiLock, FiMail, FiLogIn } from "react-icons/fi";
import { FaShieldAlt } from "react-icons/fa";

const Login = () => {
  const [emailAddress, setEmailAddress] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { dispatch } = UseAuthContext();

  const login = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      const response = await axios.post(`${SERVER_URL}/auth/login`, {
        email: emailAddress,
        password: password,
      });

      const user = response.data.user;

      if (response?.data?.success) { 
        if (user.role === "admin") {
          localStorage.setItem("user", JSON.stringify(user));
          dispatch({ type: "LOGIN", payload: user });
          toast.success("Welcome back, Admin!");
          navigate("/");
        } else {
          toast.error("Access Denied: Admin privileges required");
        }
      }
    } catch (error) {
      if (error.response?.status === 400) {
        toast.error("Invalid credentials");
      } else if (error.response?.status === 401) {
        toast.error("Unauthorized access");
      } else {
        toast.error("Login failed. Please try again.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Login Card */}
        <div className="bg-white rounded-xl shadow-2xl overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-6 text-center text-white">
            <div className="flex justify-center mb-4">
              <FaShieldAlt className="text-4xl" />
            </div>
            <h1 className="text-2xl font-bold">Admin Portal</h1>
            <p className="text-indigo-100 mt-1">Secure access to dashboard</p>
          </div>

          {/* Form */}
          <form className="p-8 space-y-6" onSubmit={login}>
            {/* Email Field */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Email Address</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FiMail className="text-gray-400" />
                </div>
                <input
                  type="email"
                  className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition outline-none"
                  value={emailAddress}
                  onChange={(e) => setEmailAddress(e.target.value)}
                  placeholder="admin@example.com"
                  required
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <label className="block text-sm font-medium text-gray-700">Password</label>
                <Link 
                  to="/ForgotPassword" 
                  className="text-xs text-indigo-600 hover:text-indigo-800 hover:underline"
                >
                  Forgot Password?
                </Link>
              </div>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FiLock className="text-gray-400" />
                </div>
                <input
                  type="password"
                  className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition outline-none"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                />
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className={`w-full flex items-center justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition ${
                isLoading ? 'opacity-75 cursor-not-allowed' : ''
              }`}
            >
              <FiLogIn className="mr-2" />
              {isLoading ? 'Authenticating...' : 'Login'}
            </button>
          </form>

          {/* Footer */}
          <div className="bg-gray-50 px-8 py-4 text-center border-t border-gray-200">
            <p className="text-xs text-gray-500">
              Restricted access. Unauthorized entry prohibited.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;