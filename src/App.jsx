import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';

import Navbar from './components/Navbar';
import Landing from './pages/LandingPage';
import Favourites from './pages/Favourite';
import Login from './pages/Login';
import Signup from './pages/Signup';
import About from './pages/About';
import UserDashboard from './pages/Dashboard';
import MealMatch from './pages/MealMatch';

const App = () => {
  return (
    <Router>
      <AppContent />
    </Router>
  );
};

const AppContent = () => {
  const location = useLocation();
  const hideNavbarRoutes = ['/', '/login', '/signup'];

  const showNavbar = !hideNavbarRoutes.includes(location.pathname);

  return (
    <>
      {showNavbar && <Navbar />}
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/mealmatch" element={<MealMatch />} />
        <Route path="/favourites" element={<Favourites />} />
        <Route path="/dashboard" element={<UserDashboard />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </>
  );
};

export default App;
