import React, { useState } from "react";
import { toast } from "react-toastify";
import { SERVER_URL } from "../../constants";
import axios from "axios";
import { useParams,useNavigate } from 'react-router-dom';
import { FiLock, FiCheckCircle, FiArrowRight } from "react-icons/fi";
import { FaKey } from "react-icons/fa";

function ResetPassword() {
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [passwordMatch, setPasswordMatch] = useState(true);
    const [passwordValid, setPasswordValid] = useState(true);
    const { id } = useParams();
     const navigate = useNavigate();


    const validatePassword = (value) => {
        setPasswordValid(value.length >= 6);
    };

    const checkPasswordMatch = (value) => {
        setPasswordMatch(value === password);
    };

    const resetPassword = async (e) => {
        e.preventDefault();
        
        if (!passwordValid) {
            return toast.error("Password must be at least 6 characters");
        }
        
        if (!passwordMatch) {
            return toast.error("Passwords do not match");
        }

        setIsLoading(true);
        try {
            await axios.put(`${SERVER_URL}/auth/reset/${id}`, {
                password: password,
                confirm_password: confirmPassword
            });
            
            setPassword('');
            setConfirmPassword('');
            toast.success("Password updated successfully!");
            navigate('/login')
        } catch (error) {
            if (error.response?.status === 400) {
                toast.error("Password reset failed. Please try again.");
            } else {
                toast.error("An error occurred. Please try again later.");
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
                        <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Reset Your Password</h1>
                        <p className="text-sm text-gray-500 mt-1">Create a new secure password</p>
                    </div>

                    {/* Form */}
                    <form className="p-8 space-y-5" onSubmit={resetPassword}>
                        {/* New Password */}
                        <div className="space-y-1.5">
                            <label htmlFor="password" className="block text-xs font-semibold uppercase tracking-wider text-gray-600">
                                New Password
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <FiLock className="text-gray-400 text-sm" />
                                </div>
                                <input
                                    className={`block w-full pl-9 pr-3 py-2.5 border text-sm text-gray-900 placeholder-gray-400 rounded-lg transition outline-none ${
                                        passwordValid 
                                        ? 'border-gray-300 focus:ring-1 focus:ring-gray-900 focus:border-gray-900' 
                                        : 'border-red-300 focus:ring-1 focus:ring-red-500 focus:border-red-500'
                                    }`}
                                    id="password"
                                    type="password"
                                    value={password}
                                    onChange={(e) => {
                                        setPassword(e.target.value);
                                        validatePassword(e.target.value);
                                    }}
                                    placeholder="At least 6 characters"
                                    required
                                />
                            </div>
                            {!passwordValid && (
                                <p className="text-[11px] font-medium text-red-500 mt-1">Password must be at least 6 characters</p>
                            )}
                        </div>

                        {/* Confirm Password */}
                        <div className="space-y-1.5">
                            <label htmlFor="confirmPassword" className="block text-xs font-semibold uppercase tracking-wider text-gray-600">
                                Confirm Password
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <FiCheckCircle className="text-gray-400 text-sm" />
                                </div>
                                <input
                                    className={`block w-full pl-9 pr-3 py-2.5 border text-sm text-gray-900 placeholder-gray-400 rounded-lg transition outline-none ${
                                        passwordMatch 
                                        ? 'border-gray-300 focus:ring-1 focus:ring-gray-900 focus:border-gray-900' 
                                        : 'border-red-300 focus:ring-1 focus:ring-red-500 focus:border-red-500'
                                    }`}
                                    id="confirmPassword"
                                    type="password"
                                    value={confirmPassword}
                                    onChange={(e) => {
                                        setConfirmPassword(e.target.value);
                                        checkPasswordMatch(e.target.value);
                                    }}
                                    placeholder="Re-enter your password"
                                    required
                                />
                            </div>
                            {!passwordMatch && (
                                <p className="text-[11px] font-medium text-red-500 mt-1">Passwords do not match</p>
                            )}
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            disabled={isLoading || !passwordValid || !passwordMatch}
                            className={`w-full flex items-center justify-center py-2.5 px-4 rounded-lg shadow-sm text-sm font-medium text-white bg-gray-900 hover:bg-black focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900 transition-all ${
                                isLoading || !passwordValid || !passwordMatch ? 'opacity-75 cursor-not-allowed' : ''
                            }`}
                        >
                            {isLoading ? (
                                'Resetting...'
                            ) : (
                                <>
                                    Reset Password <FiArrowRight className="ml-2 text-sm" />
                                </>
                            )}
                        </button>
                    </form>

                    {/* Footer */}
                    <div className="bg-gray-50 px-8 py-4 text-center border-t border-gray-100">
                        <p className="text-[11px] text-gray-400 tracking-wide uppercase">
                            Make sure your password is strong and unique.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ResetPassword;