import React, { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword, sendPasswordResetEmail } from "firebase/auth";
import { auth } from './firebase';
import { Mail, Lock, ArrowRight } from "lucide-react";
import { ErrorMessages } from '../components/ErrorMessages'; 

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [showResetForm, setShowResetForm] = useState(false); 
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setMessage('');
    try {
      await signInWithEmailAndPassword(auth, email, password);
      setMessage('Welcome back!');
      setTimeout(() => navigate('/dashboard'), 1200);
      setEmail('');
      setPassword('');
    } catch (error) {
      setError(ErrorMessages(error.code));
    } finally {
      setLoading(false);
    }
  };

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    if (!email) {
      setError('Please enter your email address to reset your password.');
      return;
    }
    setLoading(true);
    setError('');
    setMessage('');
    try {
      await sendPasswordResetEmail(auth, email);
      setMessage('✅ Password reset email sent! Check your inbox or spam/junk folder.');
      setEmail('');
      setTimeout(() => setShowResetForm(false), 2000); 
    } catch (error) {
      setError(ErrorMessages(error.code));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-white">
      <div className="w-full max-w-md p-8 space-y-6 bg-orange-50 rounded-2xl shadow-lg">
        <div className="flex justify-center">
          <img src="/logo.png" alt="Cravo Logo" className="h-20 w-20" />
        </div>
        <h2 className="text-3xl font-bold text-orange-600 text-center italic">
          {showResetForm ? 'Reset Password' : 'Login to CRAVO'}
        </h2>
        <form className="space-y-4" onSubmit={showResetForm ? handleForgotPassword : handleLogin} autoComplete="off">
          {message && (
            <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg text-sm">
              {message}
            </div>
          )}
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
              {error}
            </div>
          )}
          <div>
            <label className="block mb-1 text-red-400 font-medium">Email</label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="w-full pl-10 pr-4 py-2 border border-orange-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent bg-orange-50/50 focus:bg-orange-50"
                required
              />
            </div>
          </div>
          {!showResetForm && (
            <>
              <div>
                <div className="flex items-center justify-between">
                  <label className="block mb-1 text-red-400 font-medium">Password</label>
                  <button
                    type="button"
                    onClick={() => {
                      setShowResetForm(true);
                      setError('');
                      setMessage('');
                    }}
                    className="text-red-600 font-semibold hover:underline text-sm cursor-pointer"
                    disabled={loading}
                  >
                    Forgot Password?
                  </button>
                </div>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                    className="w-full pl-10 pr-4 py-2 border border-orange-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent bg-orange-50/50 focus:bg-orange-50"
                    required
                  />
                </div>
              </div>
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-orange-500 to-red-400 text-white font-semibold py-2 rounded-xl hover:bg-orange-500 transition duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2 cursor-pointer"
              >
                {loading ? (
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                ) : (
                  <>
                    <span>Login</span>
                    <ArrowRight className="w-5 h-5" />
                  </>
                )}
              </button>
            </>
          )}
          {showResetForm && (
            <>
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-orange-500 to-red-400 text-white font-semibold py-2 rounded-xl hover:bg-orange-500 transition duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2 cursor-pointer"
              >
                {loading ? (
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                ) : (
                  <>
                    <span>Send Reset Email</span>
                    <ArrowRight className="w-5 h-5" />
                  </>
                )}
              </button>
              <div className="text-center">
                <button
                  type="button"
                  onClick={() => {
                    setShowResetForm(false);
                    setError('');
                    setMessage('');
                  }}
                  className="text-red-600 font-semibold hover:underline text-sm cursor-pointer"
                >
                  Back to Login
                </button>
              </div>
            </>
          )}
        </form>
        {!showResetForm && (
          <p className="text-center text-orange-600 italic">
            Don't have an account?{" "}
            <Link to="/signup" className="text-red-600 font-semibold hover:underline">
              Sign Up
            </Link>
          </p>
        )}
      </div>
    </div>
  );
}