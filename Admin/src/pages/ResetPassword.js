import React, { useState } from "react";
import { toast } from "react-toastify";
import { SERVER_URL } from "../constants";
import axios from "axios";
import { useParams } from 'react-router-dom';
import { FiLock, FiCheckCircle, FiArrowRight } from "react-icons/fi";
import { FaKey } from "react-icons/fa";

function ResetPassword() {
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [passwordMatch, setPasswordMatch] = useState(true);
    const [passwordValid, setPasswordValid] = useState(true);
    const { id } = useParams();

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
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-4">
            <div className="w-full max-w-md">
                <div className="bg-white rounded-xl shadow-2xl overflow-hidden">
                    {/* Header */}
                    <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-6 text-center text-white">
                        <div className="flex justify-center mb-3">
                            <FaKey className="text-4xl" />
                        </div>
                        <h1 className="text-2xl font-bold">Reset Your Password</h1>
                        <p className="text-indigo-100 mt-1">Create a new secure password</p>
                    </div>

                    {/* Form */}
                    <form className="p-8 space-y-6" onSubmit={resetPassword}>
                        {/* New Password */}
                        <div className="space-y-2">
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                                New Password
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <FiLock className="text-gray-400" />
                                </div>
                                <input
                                    className={`block w-full pl-10 pr-3 py-3 border ${
                                        passwordValid ? 'border-gray-300' : 'border-red-300'
                                    } rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition`}
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
                                <p className="text-xs text-red-500">Password must be at least 6 characters</p>
                            )}
                        </div>

                        {/* Confirm Password */}
                        <div className="space-y-2">
                            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
                                Confirm Password
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <FiCheckCircle className="text-gray-400" />
                                </div>
                                <input
                                    className={`block w-full pl-10 pr-3 py-3 border ${
                                        passwordMatch ? 'border-gray-300' : 'border-red-300'
                                    } rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition outline-none`}
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
                                <p className="text-xs text-red-500">Passwords do not match</p>
                            )}
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            disabled={isLoading || !passwordValid || !passwordMatch}
                            className={`w-full flex items-center justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition ${
                                isLoading || !passwordValid || !passwordMatch ? 'opacity-75 cursor-not-allowed' : ''
                            }`}
                        >
                            {isLoading ? (
                                'Resetting...'
                            ) : (
                                <>
                                    Reset Password <FiArrowRight className="ml-2" />
                                </>
                            )}
                        </button>
                    </form>

                    {/* Footer */}
                    <div className="bg-gray-50 px-8 py-4 text-center border-t border-gray-200">
                        <p className="text-xs text-gray-500">
                            Make sure your password is strong and unique.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ResetPassword;