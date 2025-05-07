import React, { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from './firebase';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate('/dashboard');
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-white">
      <div className="w-full max-w-md p-8 space-y-6 bg-orange-50 rounded-2xl shadow-lg">
        <h2 className="text-3xl font-bold text-orange-400 text-center italic">Login to CRAVO</h2>

        <form className="space-y-4" onSubmit={handleLogin}>
          <div>
            <label className="block mb-1 text-orange-400 font-medium">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="w-full px-4 py-2 border border-orange-200 rounded-xl"
              required />
          </div>

          <div>
            <label className="block mb-1 text-orange-400 font-medium">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              className="w-full px-4 py-2 border border-orange-200 rounded-xl"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-orange-400 text-white font-semibold py-2 rounded-xl hover:bg-orange-500 transition duration-300">
            Login
          </button>
        </form>

        <p className="text-center text-orange-600">
          Don't have an account?{" "}
          <Link to="/signup" className="text-orange-500 font-semibold hover:underline">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
}
