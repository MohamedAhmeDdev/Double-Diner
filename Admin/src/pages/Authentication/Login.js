import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UseAuthContext } from "../../hook/UseAuthContext";
import axios from "axios";
import { toast } from "react-toastify";
import { SERVER_URL } from "../../constants";
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
      isLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4 antialiased">
      <div className="w-full max-w-md">
        {/* Login Card */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
          {/* Header */}
          <div className="p-8 text-center bg-white border-b border-gray-100">
            <div className="flex justify-center mb-3">
              <div className="p-3 bg-gray-900 rounded-lg text-white">
                <FaShieldAlt className="text-2xl" />
              </div>
            </div>
            <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Admin Portal</h1>
            <p className="text-sm text-gray-500 mt-1">Secure access to dashboard</p>
          </div>

          {/* Form */}
          <form className="p-8 space-y-5" onSubmit={login}>
            {/* Email Field */}
            <div className="space-y-1.5">
              <label className="block text-xs font-semibold uppercase tracking-wider text-gray-600">
                Email Address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FiMail className="text-gray-400 text-sm" />
                </div>
                <input
                  type="email"
                  className="block w-full pl-9 pr-3 py-2.5 border border-gray-300 rounded-lg text-sm text-gray-900 placeholder-gray-400 focus:ring-1 focus:ring-gray-900 focus:border-gray-900 transition outline-none"
                  value={emailAddress}
                  onChange={(e) => setEmailAddress(e.target.value)}
                  placeholder="admin@example.com"
                  required
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="space-y-1.5">
              <div className="flex justify-between items-center">
                <label className="block text-xs font-semibold uppercase tracking-wider text-gray-600">
                  Password
                </label>
                <Link 
                  to="/ForgotPassword" 
                  className="text-xs text-gray-500 hover:text-gray-900 hover:underline transition"
                >
                  Forgot Password?
                </Link>
              </div>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FiLock className="text-gray-400 text-sm" />
                </div>
                <input
                  type="password"
                  className="block w-full pl-9 pr-3 py-2.5 border border-gray-300 rounded-lg text-sm text-gray-900 placeholder-gray-400 focus:ring-1 focus:ring-gray-900 focus:border-gray-900 transition outline-none"
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
              className={`w-full flex items-center justify-center py-2.5 px-4 rounded-lg shadow-sm text-sm font-medium text-white bg-gray-900 hover:bg-black focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900 transition-all ${
                isLoading ? 'opacity-75 cursor-not-allowed' : ''
              }`}
            >
              <FiLogIn className="mr-2 text-sm" />
              {isLoading ? 'Authenticating...' : 'Login'}
            </button>
          </form>

          {/* Footer */}
          <div className="bg-gray-50 px-8 py-4 text-center border-t border-gray-100">
            <p className="text-[11px] text-gray-400 tracking-wide uppercase">
              Restricted access. Unauthorized entry prohibited.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;