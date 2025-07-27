import React from 'react';
import { Link } from 'react-router-dom';
import { LogIn, UserPlus } from 'lucide-react';

const Landing = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50 text-gray-800">

      {/* nav section */}
      <nav className="bg-gradient-to-r from-orange-600 to-red-500 shadow-md py-2 px-6 sm:px-6 lg:px-8 sticky top-0 z-50">
        <div className="max-w-8xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-3">
            <img
              src="/logo.png"
              alt="CRAVO Logo"
              className="w-10 h-10"
            />
            <span className="text-xl font-bold text-orange-100 italic">Cravo</span>
          </div>

          <div className="flex items-center gap-4 sm:gap-10">
            <Link
              to="/login"
              className="flex items-center gap-2 text-white hover:text-orange-900 text-m duration-200"
              aria-label="Log in to CRAVO"
            >
              <LogIn className="w-4 h-4 sm:w-5 sm:h-5" />
              Login
            </Link>
            <Link
              to="/signup"
              className="flex items-center gap-2 px-2 sm:px-4 py-2 bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white font-medium rounded-lg text-sm  shadow-md"
            >
              <UserPlus className="w-4 h-4 sm:w-5 sm:h-5" />
              Sign Up
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero section */}
      <section
        className="flex flex-col items-center justify-center text-center py-10 px-2 bg-gradient-to-b from-orange-100 to-white min-h-[50vh]"
      >
        <img
          src="/logo.png"
          alt="CRAVO Logo"
          className="w-24 h-24 mb-6 rounded-full shadow-md"
        />
        <h1
          id="hero-title"
          className="text-4xl md:text-6xl font-extrabold mb-4 tracking-tight text-gray-900"
        >
          Welcome to CRAVO
        </h1>
        <p className="text-lg md:text-xl max-w-3xl mb-8 text-gray-600">
          Plan your meals, track your calories, and live healthier every day with CRAVO’s intuitive tools and personalized insights.
        </p>
        <div className="flex gap-4">
          <Link
            to="/signup"
            className="px-8 py-3 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-full text-md shadow-lg hover:from-orange-600 hover:to-red-600 transform hover:scale-105"
          >
            Get Started
          </Link>
        </div>
      </section>

      {/* Features */}
      <section className="py-8 px-4 bg-white">
        <h2
          className="text-3xl md:text-4xl font-bold text-center mb-8 text-gray-900"
        >
          Why Choose CRAVO?
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 max-w-6xl mx-auto mb-8">
          <div className="text-center p-6 bg-gray-50 rounded-lg hover:shadow-lg transform hover:-translate-y-1">
            <img
              src="/MealPlanning.webp"
              alt="Meal Planning"
              className="w-25 h-25 mx-auto mb-4"
            />
            <h3 className="text-xl font-semibold mb-2 text-gray-800">
              Meal Planning
            </h3>
            <p className="text-gray-600 leading-relaxed">
              Easily plan your weekly meals with customizable recipes tailored to your dietary needs and preferences.
            </p>
          </div>
          <div className="text-center p-6 bg-gray-50 rounded-lg shadow-md hover:shadow-lg transition-all transform hover:-translate-y-1">
            <img
              src="/Calorietracking.png"
              alt="Calorie Tracking"
              className="w-25 h-25 mx-auto mb-4"
            />
            <h3 className="text-xl font-semibold mb-2 text-gray-800">
              Calorie Tracking
            </h3>
            <p className="text-gray-600 leading-relaxed">
              Monitor your daily calorie intake with intuitive tools to stay aligned with your health goals.
            </p>
          </div>
          <div className="text-center p-6 bg-gray-50 rounded-lg shadow-md hover:shadow-lg transition-all transform hover:-translate-y-1">
            <img
              src="/Healthinsights.webp"
              alt="Health Insights"
              className="w-25 h-25 mx-auto mb-4"
            />
            <h3 className="text-xl font-semibold mb-2 text-gray-800">
              Health Insights
            </h3>
            <p className="text-gray-600 leading-relaxed">
              Receive personalized nutrition tips and insights to optimize your lifestyle and well-being.
            </p>
          </div>
        </div>
      </section>

      {/* calling section */}
      <section
        className="py-16 px-4 bg-gradient-to-r from-orange-500 to-red-500 text-white text-center"
        aria-labelledby="cta-title"
      >
        <h2
          id="cta-title"
          className="text-3xl md:text-4xl font-bold mb-6 animate__animated animate__fadeIn"
        >
          Start Your Health Journey Today
        </h2>
        <p className="text-lg md:text-xl max-w-2xl mx-auto mb-8 leading-relaxed animate__animated animate__fadeIn animate__delay-1s">
          Join thousands of users transforming their lives with CRAVO’s personalized diet planning tools.
        </p>
        <div className="flex gap-4 justify-center">
          <Link
            to="/signup"
            className="px-8 py-3 bg-white text-orange-500 rounded-full font-semibold shadow-lg hover:bg-gray-100 transition-all transform hover:scale-105"
            aria-label="Get started with CRAVO"
          >
            Get Started
          </Link>
          <Link
            to="/login"
            className="px-8 py-3 border-2 border-white text-white rounded-full font-semibold hover:bg-white/10 transition-all transform hover:scale-105"
          >
            Explore MealMatch
          </Link>
        </div>
      </section>

      {/* footer section is customised since this is a langing page*/}
      <footer className="py-8 px-4 bg-gray-800 text-white text-center">
        <div className="max-w-6xl mx-auto">
          <div className="flex justify-center items-center gap-6 mb-6">
            <div className="flex items-center gap-3">
              <img
                src="/logo.png"
                alt="CRAVO Logo"
                className="w-10 h-10 rounded-full"
              />
              <span className="text-xl font-bold italic">Cravo</span>
            </div>
          </div>
          <p className="text-sm">© 2025 CRAVO. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Landing;