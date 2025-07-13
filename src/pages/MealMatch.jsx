import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from './firebase';
import Navbar from '../components/Navbar';
import { ExternalLink, Heart, Plus } from 'lucide-react';
import Footer from '../components/Footer';

const MealMatch = () => {
  const navigate = useNavigate();
  const [calories, setCalories] = useState('');
  const [meals, setMeals] = useState([]);
  const [nutrients, setNutrients] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(!!auth.currentUser);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [dietType, setDietType] = useState('all');
  const [notification, setNotification] = useState(null);
  const loadMoreRef = useRef(null);

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
    const storedMeals = JSON.parse(localStorage.getItem('mealMatchMeals') || '[]');
    const storedNutrients = JSON.parse(localStorage.getItem('mealMatchNutrients') || 'null');
    setMeals(storedMeals);
    setNutrients(storedNutrients);
  }, []);

  useEffect(() => {
    if (notification) {
      const timer = setTimeout(() => setNotification(null), 3000);
      return () => clearTimeout(timer);
    }
  }, [notification]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !isLoading) {
          setPage((prev) => prev + 1);
        }
      },
      { threshold: 0.1 }
    );
    if (loadMoreRef.current) observer.observe(loadMoreRef.current);
    return () => observer.disconnect();
  }, [isLoading]);

  useEffect(() => {
    if (page === 1 || !calories) return;
    fetchMeals();
  }, [page, dietType]);

  const fetchMeals = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const apiKey = import.meta.env.VITE_SPOONACULAR_API_KEY;
      if (!apiKey) throw new Error('API key is missing.');
      const targetCalories = parseInt(calories);
      const dietParam = dietType === 'vegetarian' ? '&diet=vegetarian' : dietType === 'non-vegetarian' ? '&excludeIngredients=tofu,beans,lentils' : '';
      const url = `https://api.spoonacular.com/mealplanner/generate?apiKey=${apiKey}&timeFrame=day&targetCalories=${targetCalories}&type=main%20course,dessert,breakfast&diet=balanced${dietParam}&exclude=peanuts,shellfish`;
      const response = await fetch(url);
      if (!response.ok) throw new Error('Failed to fetch meals.');
      const data = await response.json();
      let newMeals = (data.meals || [])
        .filter((meal) => !meals.some((m) => m.id === meal.id))
        .map((meal) => ({
          ...meal,
          isVegetarian: dietType === 'vegetarian' ? true : dietType === 'non-vegetarian' ? false : Math.random() > 0.5,
          calories: data.nutrients?.calories ? Math.round(data.nutrients.calories / (data.meals?.length || 1)) : 0,
        }));
      
      // Filter meals based on dietType
      if (dietType === 'vegetarian') {
        newMeals = newMeals.filter((meal) => meal.isVegetarian);
      } else if (dietType === 'non-vegetarian') {
        newMeals = newMeals.filter((meal) => !meal.isVegetarian);
      }

      if (newMeals.length > 0) {
        setMeals((prev) => [...prev, ...newMeals]);
        setNutrients(page === 1 ? data.nutrients || null : nutrients);
        localStorage.setItem('mealMatchMeals', JSON.stringify([...meals, ...newMeals]));
        localStorage.setItem('mealMatchNutrients', JSON.stringify(page === 1 ? data.nutrients || null : nutrients));
      } else {
        setError('No new meals found. Try a different calorie range.');
      }
    } catch (error) {
      setError('Failed to load meals. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setPage(1);
    setMeals([]);
    await fetchMeals();
  };

  const handleAddFavorite = (meal) => {
    const storedFavorites = JSON.parse(localStorage.getItem('favorites') || '[]');
    if (storedFavorites.some((fav) => fav.id === meal.id)) {
      setNotification(`${meal.title} is already in favorites!`);
      return;
    }
    const updatedFavorites = [...storedFavorites, meal];
    localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
    setNotification(`${meal.title} added to favorites!`);
    window.dispatchEvent(new Event('storage'));
  };

  const handleAddToPlan = (meal) => {
    const storedSelectedMeals = JSON.parse(localStorage.getItem('selectedMeals') || '[]');
    if (storedSelectedMeals.some((m) => m.id === meal.id)) {
      setNotification(`${meal.title} is already in your plan!`);
      return;
    }
    const updatedSelectedMeals = [...storedSelectedMeals, meal];
    localStorage.setItem('selectedMeals', JSON.stringify(updatedSelectedMeals));
    setNotification(`${meal.title} added to plan!`);
    window.dispatchEvent(new Event('storage'));
  };

  const handleClearPlan = () => {
    setMeals([]);
    setNutrients(null);
    setCalories('');
    setError(null);
    setPage(1);
    localStorage.removeItem('mealMatchMeals');
  };

  const navLinks = [
    { path: '/dashboard', name: 'MyDashboard', show: isLoggedIn },
    { path: '/mealmatch', name: 'MealMatch', show: true },
    { path: '/favourites', name: 'Favourites', show: isLoggedIn },
    { path: '/about', name: 'About Us', show: true },
  ];

  const groupedMeals = [];
  for (let i = 0; i < meals.length; i += 3) {
    groupedMeals.push(meals.slice(i, i + 3));
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50 flex flex-col items-center">
      <style>
        {`
          @keyframes slide-in {
            0% { transform: translateX(100%); opacity: 0; }
            100% { transform: translateX(0); opacity: 1; }
          }
          .animate-slide-in {
            animation: slide-in 0.3s ease-out;
          }
        `}
      </style>
      {notification && (
        <div className="fixed top-16 right-4 bg-gradient-to-r from-orange-500 to-red-600 text-white px-4 py-2 rounded-lg shadow-lg animate-slide-in z-50">
          {notification}
        </div>
      )}
      <Navbar links={navLinks} isLoggedIn={isLoggedIn} />
      <div className="max-w-7xl w-full px-4 sm:px-6 lg:px-8 py-10 flex flex-col items-center">
        <h1 className="text-3xl font-bold text-orange-500 italic mb-6 text-center">
          MealMatch: Personalized Plans
        </h1>

        <form
          onSubmit={handleSubmit}
          className="mb-6 flex flex-col items-center gap-4 w-full max-w-md"
        >
          <input
            type="number"
            placeholder="Enter your daily calorie goal"
            value={calories}
            onChange={(e) => setCalories(e.target.value)}
            className="p-3 border border-orange-300 rounded-md w-full bg-white/80 shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
            required
          />
          <div className="flex gap-4 items-center">
            <button
              type="submit"
              className="bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white font-semibold py-2 px-6 rounded-md text-sm transition-all duration-200 cursor-pointer"
            >
              Get Your Meal Plan
            </button>
            <button
              type="button"
              onClick={handleClearPlan}
              className="bg-white hover:bg-orange-50 text-orange-700 font-semibold py-2 px-6 rounded-md border border-orange-200 text-sm transition-all duration-200 cursor-pointer"
            >
              Clear Plan
            </button>
            <select
              value={dietType}
              onChange={(e) => setDietType(e.target.value)}
              className="p-2 border border-orange-300 rounded-md bg-white/80 shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500 text-sm cursor-pointer"
            >
              <option value="all">All</option>
              <option value="vegetarian">Vegetarian</option>
              <option value="non-vegetarian">Non-Vegetarian</option>
            </select>
          </div>
        </form>

        {error && (
          <div className="text-center mb-6 text-red-600">
            <p>{error}</p>
          </div>
        )}

        {nutrients && (
          <div className="text-center mb-6 bg-white rounded-lg shadow-sm p-4 w-full max-w-md">
            <h2 className="text-xl font-semibold text-orange-600">Nutrition Summary (First Set)</h2>
            <p className="text-orange-600">Calories: {nutrients.calories} kcal</p>
            <p className="text-orange-600">Protein: {nutrients.protein} g</p>
            <p className="text-orange-600">Fat: {nutrients.fat} g</p>
            <p className="text-orange-600">Carbs: {nutrients.carbohydrates} g</p>
          </div>
        )}

        {meals.length > 0 && (
          <div className="flex flex-col items-center w-full">
            <div className="mb-4 text-center text-orange-600">
              <p>Total Meals: {meals.length}</p>
            </div>
            {groupedMeals.map((group, index) => (
              <div
                key={index}
                className="flex flex-nowrap justify-center gap-6 mb-6 mx-auto"
                style={{
                  width: `${group.length * (window.innerWidth < 640 ? 180 : 320) + (group.length - 1) * 24}px`,
                }}
              >
                {group.map((meal) => (
                  <div
                    key={meal.id}
                    className="bg-white rounded-xl shadow-sm border border-orange-100 overflow-hidden hover:shadow-lg transition-all duration-200 flex-shrink-0 w-[180px] sm:w-[320px]"
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
                          onClick={() => handleAddFavorite(meal)}
                          className="flex items-center justify-center gap-2 w-full bg-gradient-to-r from-orange-50 to-red-50 hover:from-orange-100 hover:to-red-100 text-orange-700 hover:text-red-700 font-medium py-2 px-3 rounded-lg border border-orange-200 hover:border-red-200 transition-all duration-200 text-xs cursor-pointer"
                        >
                          <Heart className="w-4 h-4" />
                          Save to Favorites
                        </button>
                        <button
                          onClick={() => handleAddToPlan(meal)}
                          className="flex items-center justify-center gap-2 w-full bg-gradient-to-r from-green-50 to-green-100 hover:from-green-100 hover:to-green-200 text-green-700 font-medium py-2 px-3 rounded-lg border border-green-200 transition-all duration-200 text-xs cursor-pointer"
                        >
                          <Plus className="w-4 h-4" />
                          Add to Plan
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ))}
            <div ref={loadMoreRef} className="h-10"></div>
            {isLoading && (
              <div className="text-center text-orange-600">Loading more meals...</div>
            )}
          </div>
        )}
      </div>
      <Footer/>
    </div>
  );
};

export default MealMatch;