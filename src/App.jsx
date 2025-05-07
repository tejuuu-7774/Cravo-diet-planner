import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';

import Navbar from './components/Navbar';

import Landing from './pages/LandingPage';
import Home from './pages/Home';
import MealPlan from './pages/MealPlan';
import Recipe from './pages/Recipe';
import Favourites from './pages/Favourite';
import Login from './pages/Login';
import Signup from './pages/Signup';
import About from './pages/About';
import UserDashboard from './pages/Dashboard';

const AppLayout = () => {
  const location = useLocation();
  const hideNavbarRoutes = ['/', '/login', '/signup'];
  const shouldHideNavbar = hideNavbarRoutes.includes(location.pathname);

  return (
    <>
      {!shouldHideNavbar && <Navbar />}
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/home" element={<Home />} />
        <Route path="/meal-plan" element={<MealPlan />} />
        <Route path="/recipe/:id" element={<Recipe />} />
        <Route path="/favourites" element={<Favourites />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/dashboard" element={<UserDashboard/>}/>
        <Route path="/about" element={<About />} />
      </Routes>
    </>
  );
};

function App() {
  return (
    <Router>
      <AppLayout />
    </Router>
  );
}

export default App;
