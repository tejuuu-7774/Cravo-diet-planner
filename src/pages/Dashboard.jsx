import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from './firebase';
import { ChefHat, Sparkles, RefreshCw, Heart, ExternalLink, Clock, Flame, TrendingUp, Target } from 'lucide-react';

export default function UserDashboard() {
  const navigate = useNavigate();
  const [meals, setMeals] = useState([]);
  const [totalCalories, setTotalCalories] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);

  useEffect(() => {
    const currentUser = auth.currentUser;
    if (!currentUser) {
      navigate('/login');
    }
  }, [navigate]);

  const fetchMealData = useCallback(async () => {
    setIsRefreshing(true);
    try {
      const response = await fetch('https://api.spoonacular.com/mealplanner/generate?apiKey=21867d7e161f44b98099b87c5935c7ff&timeFrame=day');
      const data = await response.json();
      
      const mealList = data.meals || [];
      const calories = data.nutrients?.calories || 0;
      
      setMeals(mealList);
      setTotalCalories(calories);
    } catch (error) {
      console.error('Error fetching meal data:', error);
    } finally {
      setIsLoading(false);
      setIsRefreshing(false);
    }
  }, []);

  useEffect(() => {
    fetchMealData();
  }, [fetchMealData]);

  const handleAddFavorite = (meal) => {
    const storedFavorites = JSON.parse(localStorage.getItem('favorites') || '[]');
    
    if (storedFavorites.find((fav) => fav.sourceUrl === meal.sourceUrl)) {
      alert('This meal is already in your favorites!');
      return;
    }
  
    const updatedFavorites = [...storedFavorites, meal];
    localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
    alert(`${meal.title} added to your favorites!`);
  };

  const handleRefresh = () => {
    fetchMealData();
  };

  const targetCalories = 2000;
  const percentage = Math.min((totalCalories / targetCalories) * 100, 100);

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50">
      <div className="bg-white/90 backdrop-blur-sm border-b border-orange-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-gradient-to-r from-orange-500 to-red-500 rounded-full">
                <ChefHat className="w-5 h-5 text-white" />
              </div>
              <h1 className="text-xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
                My Dashboard
              </h1>
            </div>
            
            <div className="flex items-center gap-4">
              <button
                onClick={handleRefresh}
                disabled={isRefreshing}
                className="flex items-center gap-2 px-3 py-2 bg-white hover:bg-orange-50 text-orange-700 font-medium rounded-lg border border-orange-200 transition-all duration-200 disabled:opacity-50 text-sm"
              >
                <RefreshCw className={`w-4 h-4 ${isRefreshing ? 'animate-spin' : ''}`} />
                Refresh
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
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
          {isLoading ? (
            <div className="bg-gradient-to-br from-orange-100 to-red-100 rounded-xl p-6 shadow-sm border border-orange-200 animate-pulse">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 bg-orange-300 rounded-full"></div>
                <div className="h-5 bg-orange-300 rounded w-40"></div>
              </div>
              <div className="space-y-3">
                <div className="h-3 bg-orange-300 rounded w-28"></div>
                <div className="h-4 bg-orange-300 rounded"></div>
                <div className="h-3 bg-orange-300 rounded w-20"></div>
              </div>
            </div>
          ) : (
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
          )}
        </div>

        <div className="bg-white/70 backdrop-blur-sm rounded-xl p-6 shadow-sm border border-orange-100">
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="p-2 bg-gradient-to-r from-orange-500 to-red-500 rounded-full">
              <ChefHat className="w-5 h-5 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-orange-900">Your Meal Plan</h2>
          </div>

          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4  place-content-center">
              {[...Array(8)].map((_, index) => (
                <div key={index} className="bg-white rounded-xl shadow-sm border border-orange-100 overflow-hidden animate-pulse w-full max-w-md ">
                  <div className="h-32 bg-orange-200"></div>
                  <div className="p-4">
                    <div className="h-3 bg-orange-200 rounded mb-2"></div>
                    <div className="h-2 bg-orange-200 rounded mb-1"></div>
                    <div className="h-2 bg-orange-200 rounded w-3/4 mb-3"></div>
                    <div className="space-y-2">
                      <div className="h-8 bg-orange-200 rounded"></div>
                      <div className="h-8 bg-orange-200 rounded"></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : meals.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 justify-items-center mx-auto w-full place-content-center">
              {meals.map((meal, index) => (
                <div key={meal.id || index} className="bg-white rounded-xl shadow-sm border border-orange-100 overflow-hidden hover:shadow-lg hover:shadow-orange-500/20 transition-all duration-300 transform hover:-translate-y-1 group w-full max-w-md mx-auto">
                  <div className="relative overflow-hidden">
                    <img 
                      src={`https://spoonacular.com/recipeImages/${meal.image}`} 
                      alt={meal.title}
                      className="w-full h-32 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </div>
                  
                  <div className="p-4">
                    <h3 className="font-semibold text-orange-900 text-sm mb-2 line-clamp-2 leading-tight">
                      {meal.title}
                    </h3>
                    
                    <div className="flex items-center gap-3 text-xs text-orange-600 mb-3">
                      {meal.readyInMinutes && (
                        <div className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          <span>{meal.readyInMinutes}m</span>
                        </div>
                      )}
                      {meal.servings && (
                        <div className="flex items-center gap-1">
                          <Flame className="w-3 h-3" />
                          <span>{meal.servings} servings</span>
                        </div>
                      )}
                    </div>
                    
                    <div className="space-y-2">
                      <a 
                        href={meal.sourceUrl} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="flex items-center justify-center gap-2 w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-medium py-2 px-3 rounded-lg transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98] text-xs"
                      >
                        <ExternalLink className="w-3 h-3" />
                        View Recipe
                      </a>
                      
                      <button 
                        onClick={() => handleAddFavorite(meal)}
                        className="flex items-center justify-center gap-2 w-full bg-gradient-to-r from-orange-50 to-red-50 hover:from-orange-100 hover:to-red-100 text-orange-700 hover:text-red-700 font-medium py-2 px-3 rounded-lg border border-orange-200 hover:border-red-200 transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98] text-xs"
                      >
                        <Heart className="w-3 h-3" />
                        Add to Favorites
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <ChefHat className="w-12 h-12 text-orange-400 mx-auto mb-3" />
              <h3 className="text-lg font-semibold text-orange-600 mb-2">No meals found</h3>
              <p className="text-orange-500 mb-4 text-sm">We couldn't load your meal plan. Please try refreshing.</p>
              <button
                onClick={handleRefresh}
                className="px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white font-medium rounded-lg transition-colors duration-200 text-sm"
              >
                Try Again
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}