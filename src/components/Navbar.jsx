import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, User } from 'lucide-react';
import { auth } from '../pages/firebase';
import { signOut } from 'firebase/auth';

function Navbar({ links, isLoggedIn = false }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const currentPage = useLocation();
  const navigate = useNavigate();

  const defaultLinks = [
    { path: '/dashboard', name: 'MyDashboard', show: isLoggedIn },
    { path: '/favourites', name: 'Favourites', show: isLoggedIn },
    { path: '/mealmatch', name: 'MealMatch', show: true },
    { path: '/about', name: 'About Us', show: true },
    { path: '/login', name: 'Login', show: !isLoggedIn },
    { path: '/signup', name: 'Sign Up', show: !isLoggedIn },
  ];

  const navLinks = links || defaultLinks;

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate('/'); 
    } catch (error) {
      console.error('Error logging out:', error);
    }
    setDropdownOpen(false);
    setMenuOpen(false);
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
    setDropdownOpen(false); 
  };

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  return (
    <nav className="bg-gradient-to-r from-orange-600 to-red-600 text-white w-full h-14 flex justify-between items-center px-4 md:px-8 sticky top-0 z-10">
      <div className="flex items-center gap-3">
        <img src="/logo.png" alt="Cravo Logo" className="w-10 h-10 rounded" />
        <span className="text-2xl font-bold">Cravo</span>
      </div>

      <div className="hidden md:flex gap-4 items-center">
        {navLinks.map((link) =>
          link.show && (
            <Link
              key={link.path}
              to={link.path}
              className={
                currentPage.pathname === link.path
                  ? 'px-4 py-2 bg-orange-200 text-orange-700 bg-opacity-20 rounded'
                  : 'px-4 py-2 hover:bg-orange-200 hover:bg-opacity-20 hover:text-orange-700 rounded'
              }
            >
              {link.name}
            </Link>
          )
        )}
        {isLoggedIn && (
          <div className="relative">
            <button
              onClick={toggleDropdown}
              className="px-4 py-2 hover:bg-orange-200 hover:bg-opacity-20 hover:text-black rounded flex items-center gap-2"
            >
              <User size={20} />
              Profile
            </button>
            {dropdownOpen && (
              <div className="absolute top-12 right-0 bg-white rounded-lg shadow-lg border border-orange-200">
                <button
                  onClick={handleLogout}
                  className="w-full px-4 py-2 text-left text-orange-700 hover:bg-orange-50 rounded-lg"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        )}
      </div>

      <button className="md:hidden" onClick={toggleMenu}>
        {menuOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {menuOpen && (
        <div className="md:hidden w-full bg-gradient-to-r from-orange-600 to-red-600 absolute top-14 left-0 flex flex-col items-center gap-2 py-4">
          {navLinks.map((link) =>
            link.show && (
              <Link
                key={link.path}
                to={link.path}
                onClick={toggleMenu}
                className={
                  currentPage.pathname === link.path
                    ? 'w-full text-center py-2 bg-white bg-opacity-20'
                    : 'w-full text-center py-2 hover:bg-orange-200 hover:bg-opacity-20 hover:text-black'
                }
              >
                {link.name}
              </Link>
            )
          )}
          {isLoggedIn && (
            <>
              <button
                onClick={toggleDropdown}
                className="w-full text-center py-2 hover:bg-orange-200 hover:bg-opacity-20 hover:text-black flex items-center justify-center gap-2"
              >
                <User size={20} />
                Profile
              </button>
              {dropdownOpen && (
                <button
                  onClick={handleLogout}
                  className="w-full text-center py-2 bg-white bg-opacity-20 text-orange-700 hover:bg-orange-50"
                >
                  Logout
                </button>
              )}
            </>
          )}
        </div>
      )}
    </nav>
  );
}

export default Navbar;