import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from '../pages/firebase';
import { ChefHat, Sparkles, RefreshCw, ExternalLink, Flame, Target, TrendingUp, X } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function UserDashboard() {
  const navigate = useNavigate();
  const [selectedMeals, setSelectedMeals] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(!!auth.currentUser);
  const [notification, setNotification] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (!user) {
        setIsLoggedIn(false);
        navigate('/login');
      } else {
        setIsLoggedIn(true);
      }
    });
    return () => unsubscribe();
  }, [navigate]);

  useEffect(() => {
    const loadData = () => {
      const storedMeals = JSON.parse(localStorage.getItem('selectedMeals') || '[]');
      setSelectedMeals(Array.isArray(storedMeals) ? storedMeals : []);
    };

    loadData();
    window.addEventListener('storage', loadData);
    return () => window.removeEventListener('storage', loadData);
  }, []);

  useEffect(() => {
    if (notification) {
      const timer = setTimeout(() => setNotification(null), 3000);
      return () => clearTimeout(timer);
    }
  }, [notification]);

  const handleRemoveFromPlan = (mealId) => {
    setSelectedMeals((prev) => prev.filter((m) => m.id !== mealId));
    setNotification('Meal removed from plan!');
  };

  const handleClearPlan = () => {
    setSelectedMeals([]);
    localStorage.removeItem('selectedMeals');
    setNotification('Meal plan cleared!');
  };

  const handleGoToMealMatch = () => {
    navigate('/mealmatch');
  };

  const navLinks = [
    { path: '/dashboard', name: 'MyDashboard', show: isLoggedIn },
    { path: '/mealmatch', name: 'MealMatch', show: true },
    { path: '/favourites', name: 'Favourites', show: isLoggedIn },
    { path: '/about', name: 'About Us', show: true },
  ];

  const targetCalories = 2000;
  const totalCalories = selectedMeals.reduce((sum, meal) => sum + (meal.calories || 0), 0);
  const percentage = Math.min((totalCalories / targetCalories) * 100, 100);

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50">
      {notification && (
        <div className="fixed top-4 right-4 bg-green-500 text-white px-4 py-2 rounded-lg shadow-lg animate-slide-in">
          {notification}
        </div>
      )}
      <Navbar links={navLinks} isLoggedIn={isLoggedIn} />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 mt-10">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 mb-3">
            <Sparkles className="w-6 h-6 text-orange-500" />
            <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-orange-600 via-red-500 to-orange-700 bg-clip-text text-transparent">
              Welcome back!
            </h1>
          </div>
          <p className="text-lg text-orange-600 max-w-2xl mx-auto">
            Discover delicious meals tailored just for you. Track your calories and build healthy eating habits.
          </p>
        </div>

        <div className="mb-8">
          <div className="flex justify-end mb-4">
            <button
              onClick={handleClearPlan}
              className="flex items-center gap-2 px-3 py-2 bg-white hover:bg-orange-50 text-orange-700 font-medium rounded-lg border border-orange-200 transition-all duration-200 text-sm cursor-pointer"
            >
              <RefreshCw className="w-4 h-4" />
              Reset the Plan
            </button>
          </div>

          <div className="bg-gradient-to-br from-orange-100 to-red-100 rounded-xl p-6 shadow-sm border border-orange-200">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-orange-500 rounded-full">
                <Flame className="w-5 h-5 text-white" />
              </div>
              <h2 className="text-xl font-bold text-orange-900">Daily Calorie Tracker</h2>
            </div>
            <div className="space-y-4">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-orange-700 font-medium text-sm">Calories Consumed</span>
                  <span className="text-xl font-bold text-orange-600">
                    {totalCalories > 0 ? totalCalories.toLocaleString() : '0'}
                  </span>
                </div>
                <div className="relative">
                  <div className="w-full bg-orange-200 rounded-full h-2">
                    <div
                      className="bg-gradient-to-r from-orange-500 to-red-500 h-2 rounded-full transition-all duration-1000 ease-out"
                      style={{ width: `${percentage}%` }}
                    ></div>
                  </div>
                  <div className="flex justify-between mt-1 text-xs text-orange-600">
                    <span>0</span>
                    <span>{targetCalories.toLocaleString()} target</span>
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-white/60 rounded-lg p-3">
                  <div className="flex items-center gap-2 mb-1">
                    <Target className="w-3 h-3 text-orange-600" />
                    <span className="text-xs font-medium text-orange-700">Target</span>
                  </div>
                  <span className="text-sm font-bold text-orange-900">{targetCalories.toLocaleString()}</span>
                </div>
                <div className="bg-white/60 rounded-lg p-3">
                  <div className="flex items-center gap-2 mb-1">
                    <TrendingUp className="w-3 h-3 text-orange-600" />
                    <span className="text-xs font-medium text-orange-700">Remaining</span>
                  </div>
                  <span className="text-sm font-bold text-orange-900">
                    {Math.max(targetCalories - totalCalories, 0).toLocaleString()}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white/70 backdrop-blur-sm rounded-xl p-6 shadow-sm border border-orange-100 mt-8">
            <div className="flex justify-between items-center mb-6">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-gradient-to-r from-orange-500 to-red-500 rounded-full">
                  <ChefHat className="w-5 h-5 text-white" />
                </div>
                <h2 className="text-xl font-bold text-orange-900">Your Selected Meal Plan</h2>
              </div>
              <div className="flex gap-2">
                {selectedMeals.length > 0 && (
                  <button
                    onClick={handleClearPlan}
                    className="flex items-center gap-2 px-3 py-2 bg-white hover:bg-orange-50 text-orange-700 font-medium rounded-lg border border-orange-200 transition-all duration-200 text-sm cursor-pointer"
                  >
                    <X className="w-4 h-4" />
                    Clear Plan
                  </button>
                )}
                <button
                  onClick={handleGoToMealMatch}
                  className="flex items-center gap-2 px-3 py-2 bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white font-medium rounded-lg transition-all duration-200 text-sm cursor-pointer"
                >
                  <ChefHat className="w-4 h-4" />
                  Go to MealMatch
                </button>
              </div>
            </div>
            {selectedMeals.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {selectedMeals.map((meal, index) => (
                  <div
                    key={`${meal.id}-${index}`}
                    className="bg-white rounded-xl shadow-sm border border-orange-100 overflow-hidden hover:shadow-lg transition-all duration-200"
                  >
                    <div className="relative group">
                      <img
                        src={`https://spoonacular.com/recipeImages/${meal.id}-312x231.jpg`}
                        alt={meal.title}
                        className="w-full h-40 object-cover transition-transform duration-300 group-hover:scale-105"
                        onError={(e) => {
                          e.target.src = '/placeholder.png';
                        }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    </div>
                    <div className="p-4">
                      <h3 className="font-semibold text-orange-900 text-sm mb-3 line-clamp-2 leading-tight">
                        {meal.title}
                      </h3>
                      <div className="flex items-center gap-3 text-xs text-orange-600 mb-3">
                        <span>{meal.isVegetarian ? 'Vegetarian' : 'Non-Vegetarian'}</span>
                        <span>{meal.calories ? `${Math.round(meal.calories)} cal` : 'Calories unavailable'}</span>
                      </div>
                      <div className="space-y-2">
                        <a
                          href={meal.sourceUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center justify-center gap-2 w-full bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white font-medium py-2 px-3 rounded-lg text-xs transition-all duration-200 cursor-pointer"
                        >
                          <ExternalLink className="w-4 h-4" />
                          View Recipe
                        </a>
                        <button
                          onClick={() => handleRemoveFromPlan(meal.id)}
                          className="flex items-center justify-center gap-2 w-full bg-gradient-to-r from-orange-50 to-red-50 hover:from-orange-100 hover:to-red-100 text-orange-700 hover:text-red-700 font-medium py-2 px-3 rounded-lg border border-orange-200 hover:border-red-200 transition-all duration-200 text-xs cursor-pointer"
                        >
                          <X className="w-4 h-4" />
                          Remove from Plan
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <ChefHat className="w-12 h-12 text-orange-400 mx-auto mb-3" />
                <h3 className="text-lg font-semibold text-orange-600 mb-2">No meals in your plan</h3>
                <p className="text-orange-500 text-sm mb-4">
                  Visit MealMatch to add meals tailored to your calorie goals.
                </p>
              </div>
            )}
          </div>
        </div>

      </div>

      <Footer/>
    </div>
  );
}