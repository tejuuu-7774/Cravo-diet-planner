import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from './firebase';

export default function Signup() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      navigate('/dashboard');
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-white">
      <div className="w-full max-w-md p-8 space-y-6 bg-orange-50 rounded-2xl shadow-lg">
        <div className="flex justify-center">
          <img src="src/Images/Cravologo.png" alt="Cravo Logo" className="h-20 w-20" />
        </div>
        <h2 className="text-3xl font-bold text-red-500 text-center italic">Create an Account</h2>
        <form className="space-y-4" onSubmit={handleSignup}>
          <div>
            <label className="block mb-1 text-red-400 font-medium">Full Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your name"
              className="w-full px-4 py-2 border border-orange-300 rounded-xl"
              required
            />
          </div>
          <div>
            <label className="block mb-1 text-red-400 font-medium">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="w-full px-4 py-2 border border-orange-300 rounded-xl"
              required
            />
          </div>
          <div>
            <label className="block mb-1 text-red-400 font-medium">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Create a password"
              className="w-full px-4 py-2 border border-orange-300 rounded-xl"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-orange-500 to-red-400 text-white font-semibold py-2 rounded-xl hover:bg-orange-500 transition"
          >
            Sign Up
          </button>
        </form>
        <p className="text-center text-orange-600 italic">
          Already have an account?{" "}
          <Link to="/login" className="text-red-600 font-semibold hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}

