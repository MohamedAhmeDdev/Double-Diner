import React, { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { SERVER_URL } from "../../constants";
import { UseAuthContext } from "../../hook/UseAuthContext";
import axios from "axios";
import { FiMail, FiLock, FiLogIn } from "react-icons/fi";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { dispatch } = UseAuthContext();

  const login = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await axios.post(`${SERVER_URL}/auth/login`, {
        email: email,
        password: password,
      });
      
      const user = response.data.user;
      localStorage.setItem("user", JSON.stringify(user));
      dispatch({ type: "LOGIN", payload: user });
      toast.success("Login successful!");
      
    } catch (error) {
      if (error.response?.status === 400) {
        toast.error("Email and password are required");
      } else if (error.response?.status === 401) {
        toast.error("Invalid login credentials");
      } else {
        toast.error("Login failed. Please try again later");
      }
    } finally {
      setIsLoading(false);
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
                          <FiLogIn className="text-2xl" />
                        </div>
                      </div>
                      <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Create Account</h1>
                      <p className="text-sm text-gray-500 mt-1">Sign in to your account</p>
                    </div>
          

          {/* Form */}
          <form className="p-8 space-y-5" onSubmit={login}>
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

            {/* Password Field */}
            <div className="space-y-1.5">
              <div className="flex justify-between items-center">
                <label htmlFor="password" className="block text-xs font-semibold uppercase tracking-wider text-gray-600">
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
                  id="password"
                  className="block w-full pl-9 pr-3 py-2.5 border border-gray-300 rounded-lg text-sm text-gray-900 placeholder-gray-400 focus:ring-1 focus:ring-gray-900 focus:border-gray-900 transition outline-none"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
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
                  Signing in...
                </>
              ) : (
                <>
                  <FiLogIn className="mr-2 text-sm" />
                  Sign In
                </>
              )}
            </button>

            {/* Sign Up Link */}
            <div className="text-center text-xs text-gray-500 !mt-5">
              Don't have an account?{' '}
              <Link 
                to="/signup" 
                className="font-semibold text-gray-900 hover:underline transition"
              >
                Sign up
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;