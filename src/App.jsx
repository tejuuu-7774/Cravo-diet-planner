import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
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
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/mealmatch" element={<MealMatch />} />
        <Route path="/favourites" element={<Favourites />} />
        <Route path="/dashboard" element={<UserDashboard />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </Router>
  );
};

export default App;