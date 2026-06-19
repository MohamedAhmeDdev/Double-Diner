import React, { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { SERVER_URL } from "../../constants";
import axios from "axios";
import { FiMail, FiArrowRight, FiArrowLeft } from "react-icons/fi";
import { FaKey } from "react-icons/fa";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) {
      return toast.error("Please enter your email address");
    }

    setIsLoading(true);
    try {
      await axios.post(`${SERVER_URL}/auth/forgotPassword`, {
        email: email,
      });
      setEmail('');
      toast.success("Password reset link sent to your email");
    } catch (error) {
      if (error.response?.status === 404) {
        toast.error("Email not found in our system");
      } else {
        toast.error("Failed to send reset email. Please try again.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4 antialiased">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
          {/* Header */}
          <div className="p-8 text-center bg-white border-b border-gray-100">
            <div className="flex justify-center mb-3">
              <div className="p-3 bg-gray-900 rounded-lg text-white">
                <FaKey className="text-xl" />
              </div>
            </div>
            <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Password Recovery</h1>
            <p className="text-sm text-gray-500 mt-1">Enter your email to reset your password</p>
          </div>

          {/* Form */}
          <form className="p-8 space-y-5" onSubmit={handleSubmit}>
            <div className="space-y-1.5">
              <label htmlFor="email" className="block text-xs font-semibold uppercase tracking-wider text-gray-600">
                Email Address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FiMail className="text-gray-400 text-sm" />
                </div>
                <input
                  className="block w-full pl-9 pr-3 py-2.5 border border-gray-300 rounded-lg text-sm text-gray-900 placeholder-gray-400 focus:ring-1 focus:ring-gray-900 focus:border-gray-900 transition outline-none"
                  placeholder="your@email.com"
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className={`w-full flex items-center justify-center py-2.5 px-4 rounded-lg shadow-sm text-sm font-medium text-white bg-gray-900 hover:bg-black focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900 transition-all ${
                isLoading ? 'opacity-75 cursor-not-allowed' : ''
              }`}
            >
              {isLoading ? (
                'Sending...'
              ) : (
                <>
                  Send Reset Link <FiArrowRight className="ml-2 text-sm" />
                </>
              )}
            </button>

            {/* Back to Login Link */}
            <div className="text-center pt-2">
              <Link 
                to="/login" 
                className="inline-flex items-center text-xs font-medium text-gray-500 hover:text-gray-900 transition gap-1"
              >
                <FiArrowLeft /> Back to Login
              </Link>
            </div>
          </form>

          {/* Footer */}
          <div className="bg-gray-50 px-8 py-4 text-center border-t border-gray-100">
            <p className="text-[11px] text-gray-400 tracking-wide uppercase">
              You'll receive an email with instructions to reset your password.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ForgotPassword;