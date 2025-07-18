import React, { useState } from "react";
import { toast } from "react-toastify";
import { SERVER_URL } from "../constants";
import axios from "axios";
import { useParams } from 'react-router-dom';
import { FiLock, FiCheck, FiArrowRight } from "react-icons/fi";
import { Link } from "react-router-dom";

function ResetPassword() {
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [passwordMatch, setPasswordMatch] = useState(true);
    const { id } = useParams();

    const resetPassword = async (e) => {
      e.preventDefault();
      setIsLoading(true);
      
      try {
        // Validate passwords
        if (password.length < 6) {
          toast.error("Password must be at least 6 characters");
          return;
        }
        
        if (password !== confirmPassword) {
          setPasswordMatch(false);
          toast.error("Passwords do not match");
          return;
        }

        await axios.put(`${SERVER_URL}/auth/reset/${id}`, {
          password: password,
          confirm_password: confirmPassword
        });

        setPassword('');
        setConfirmPassword('');
        toast.success("Password updated successfully!");
        
      } catch (error) {
        if (error.response?.status === 400) {
          toast.error("Password reset failed");
        } else {
          toast.error("An error occurred. Please try again.");
        }
      } finally {
        setIsLoading(false);
      }
    };

    const handlePasswordChange = (e) => {
      setPassword(e.target.value);
      setPasswordMatch(true);
    };

    const handleConfirmPasswordChange = (e) => {
      setConfirmPassword(e.target.value);
      setPasswordMatch(true);
    };

    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          {/* Reset Password Card */}
          <div className="bg-white rounded-xl shadow-xl overflow-hidden">
            {/* Header */}
            <div className="bg-gradient-to-r from-blue-600 to-indigo-700 p-6 text-center">
              <h1 className="text-2xl font-bold text-white">Reset Password</h1>
              <p className="text-blue-100 mt-1">Create a new secure password</p>
            </div>

            {/* Form */}
            <form className="p-8 space-y-6" onSubmit={resetPassword}>
              {/* Password Field */}
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                  New Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FiLock className="text-gray-400" />
                  </div>
                  <input
                    type="password"
                    id="password"
                    className={`block w-full pl-10 pr-3 py-3 border ${passwordMatch ? 'border-gray-300' : 'border-red-500'} rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none`}
                    placeholder="At least 6 characters"
                    value={password}
                    onChange={handlePasswordChange}
                    minLength="6"
                    required
                  />
                </div>
                <p className="mt-1 text-xs text-gray-500">
                  Password must be at least 6 characters long
                </p>
              </div>

              {/* Confirm Password Field */}
              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
                  Confirm Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FiCheck className={`${passwordMatch && password === confirmPassword && password ? 'text-green-500' : 'text-gray-400'}`} />
                  </div>
                  <input
                    type="password"
                    id="confirmPassword"
                    className={`block w-full pl-10 pr-3 py-3 border ${passwordMatch ? 'border-gray-300' : 'border-red-500'} rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none`}
                    placeholder="Re-enter your password"
                    value={confirmPassword}
                    onChange={handleConfirmPasswordChange}
                    minLength="6"
                    required
                  />
                </div>
                {!passwordMatch && (
                  <p className="mt-1 text-xs text-red-500">
                    Passwords do not match
                  </p>
                )}
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isLoading || !password || !confirmPassword}
                className={`w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-white font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition ${
                  isLoading || !password || !confirmPassword ? 'bg-blue-400' : 'bg-blue-600 hover:bg-blue-700'
                }`}
              >
                {isLoading ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Resetting...
                  </>
                ) : (
                  <>
                    Reset Password <FiArrowRight className="ml-2" />
                  </>
                )}
              </button>

              {/* Back to Login Link */}
              <div className="text-center text-sm text-gray-600">
                Remember your password?{' '}
                <Link 
                  to="/Login" 
                  className="font-medium text-blue-600 hover:text-blue-800 transition-colors"
                >
                  Sign in
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
}

export default ResetPassword;