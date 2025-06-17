import React from 'react';
import { Link } from 'react-router-dom';

export default function Navbar(){
  return (
    <nav className="bg-gradient-to-r from-orange-600 to-red-600 text-white w-full h-11 flex justify-between items-center shadow-md pl-4">
      <div className="flex items-center gap-3">
        <img src="src/Images/logo.png" alt="Logo" className="w-9 h-8 rounded" />
        <span className="text-xl font-bold italic">Cravo</span>
      </div>
      <div className='hidden md:flex'>
        <Link to="/dashboard"><button className="hover:text-gray-300 px-4 py-2 rounded">MyDashboard</button></Link>
        <Link to="/favourites"><button className="hover:text-gray-300 px-4 py-2 rounded">Favourites</button></Link>
        <Link to="/mealmatch"><button className="hover:text-gray-300 px-4 py-2 rounded">MealMatch</button></Link>
        <Link to="/about"><button className="hover:text-gray-300 px-4 py-2 rounded">About</button></Link>
        <Link to="/login"><button className="hover:text-gray-300 px-4 py-2 rounded">Login</button></Link>
      </div>
    </nav>
  );
};


