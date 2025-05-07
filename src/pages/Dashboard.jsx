import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from './firebase';

export default function UserDashboard() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [meals, setMeals] = useState([]);
  const [totalCalories, setTotalCalories] = useState(0);

  useEffect(() => {
    const currentUser = auth.currentUser;
    if (!currentUser) {
      navigate('/login');
    } else {
      setUser(currentUser);
    }
  }, [navigate]);

  useEffect(() => {
    if (user) {
      fetch('https://api.spoonacular.com/mealplanner/generate?apiKey=21867d7e161f44b98099b87c5935c7ff&timeFrame=day')
        .then((response) => response.json())
        .then((data) => {
          const mealList = data.meals || [];
          const calories = data.nutrients?.calories || 0;  
  
          setMeals(mealList);
          setTotalCalories(calories);
        })
        .catch((error) => console.error('Error fetching meal data:', error));
    }
  }, [user]);

  const handleAddFavorite = (meal) => {
    const storedFavorites = JSON.parse(localStorage.getItem('favorites')) || [];
    
    if (storedFavorites.find(fav => fav.sourceUrl === meal.sourceUrl)) {
      alert('This meal is already in your favorites!');
      return;
    }
  
    const updatedFavorites = [...storedFavorites, meal];
    localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
    alert(`${meal.title} added to your favorites!`);
  };
  

  return (
    <div className="bg-white flex flex-col items-center justify-center mt-10 mb-40">
      <h1 className="text-3xl font-bold text-orange-400 text-center italic mb-6">
        Welcome, {user?.displayName || 'User'}!
      </h1>
      
      <div className="w-full max-w-4xl bg-orange-50 p-8 rounded-xl shadow-lg mb-6">
        <h2 className="text-2xl font-bold text-orange-400 mb-4 italic">Daily Calorie Tracker</h2>
        <p className="text-l text-orange-500">Total Calories Today: <span className='font-bold italic'>{totalCalories > 0 ? totalCalories : 'Loading...'}</span></p>
      </div>

      <div className="w-full max-w-5xl bg-orange-50 p-8 rounded-xl shadow-lg">
        <h2 className="text-2xl font-bold text-orange-400 mb-4 italic">Your Meal Plan</h2>
        {meals.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {meals.map((meal, index) => (
              <div key={index} className="bg-white p-4 rounded-xl shadow-lg">
                <div className='bg-orange-400 w-full h-15 rounded-md text-center flex items-center justify-center'><h3 className="text-sm font-semibold  italic text-white">{meal.title}</h3></div>
                <img src={`https://spoonacular.com/recipeImages/${meal.image}`} alt={meal.title} className="w-full h-60 object-cover rounded-xl mt-4" />
                <p className="text-orange-600 mt-2">
                  <a href={meal.sourceUrl} target="_blank" rel="noopener noreferrer">
                    <button 
                      type='submit' 
                      className='w-full bg-orange-400 text-white text-sm font-semibold px-2 py-1 rounded-md hover:bg-orange-500 transition duration-300'
                    >View Recipe</button>
                  </a>
                </p>
                <button 
                  onClick={() => handleAddFavorite(meal)} 
                  className='mt-2 w-full bg-orange-400 text-white text-sm font-semibold px-2 py-1 rounded-md hover:bg-orange-500 transition duration-300'
                >
                  Add to Favorites
                </button>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-orange-600">No meals found for today.</p>
        )}
      </div>
    </div>
  );
}
