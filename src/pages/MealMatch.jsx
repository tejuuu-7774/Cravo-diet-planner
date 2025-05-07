import React, { useState,useEffect } from 'react';

const MealMatch = () => {
  const [calories, setCalories] = useState('');
  const [meals, setMeals] = useState([]);
  const [nutrients, setNutrients] = useState(null);

  useEffect(() => {
    const storedMeals = JSON.parse(localStorage.getItem('mealMatchMeals')) || [];
    const storedNutrients = JSON.parse(localStorage.getItem('mealMatchNutrients')) || null;
    setMeals(storedMeals);
    setNutrients(storedNutrients);
  }, []);

  
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        `https://api.spoonacular.com/mealplanner/generate?apiKey=21867d7e161f44b98099b87c5935c7ff&timeFrame=day&targetCalories=${calories}`
      );

      const data = await response.json();
      setMeals(data.meals || []);
      setNutrients(data.nutrients || null);

      localStorage.setItem('mealMatchMeals', JSON.stringify(data.meals || []));
      localStorage.setItem('mealMatchNutrients', JSON.stringify(data.nutrients || null));
    } catch (error) {
      console.error('Error fetching personalized meals:', error);
    }
  };

  const handleAddFavorite = (meal) => {
    const storedFavorites = JSON.parse(localStorage.getItem('favorites')) || [];
  
    const isAlreadySaved = storedFavorites.some((fav) => fav.id === meal.id);
    if (isAlreadySaved) return;
  
    const updatedFavorites = [...storedFavorites, meal];
    localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
  };

    const handleClearPlan = () => {
      setMeals([]);
      setNutrients(null);
      setCalories('');
      localStorage.removeItem('mealMatchMeals');
      localStorage.removeItem('mealMatchNutrients');
    };
    

  return (
    <div className="bg-white min-h-screen flex flex-col items-center py-10 px-4 mb-40">
      <h1 className="text-3xl font-bold text-orange-500 italic mb-6">MealMatch: Personalized Plans</h1>

      <form onSubmit={handleSubmit} className="mb-6 flex flex-col items-center gap-4 w-full max-w-md">
        <input
          type="number"
          placeholder="Enter your daily calorie goal"
          value={calories}
          onChange={(e) => setCalories(e.target.value)}
          className="p-3 border border-orange-300 rounded-md w-full"
          required
        />
        <div className="flex gap-4">
          <button
            type="submit"
            className="bg-orange-400 hover:bg-orange-500 text-white font-semibold py-2 px-6 rounded-md"
          >
            Get Your Meal Plan
          </button>
          <button
            type="button"
            onClick={handleClearPlan}
            className="bg-orange-400 hover:bg-orange-500 text-white font-semibold py-2 px-6 rounded-md"
          >
            Clear Plan
          </button>
        </div>
      </form>

      {nutrients && (
        <div className="text-center mb-6">
          <h2 className="text-xl text-orange-500 font-semibold">Nutrition Summary</h2>
          <p className="text-orange-600">Calories: {nutrients.calories}</p>
          <p className="text-orange-600">Protein: {nutrients.protein}</p>
          <p className="text-orange-600">Fat: {nutrients.fat}</p>
          <p className="text-orange-600">Carbs: {nutrients.carbohydrates}</p>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {meals.map((meal) => (
          <div key={meal.id} className="bg-orange-50 p-4 rounded-xl shadow-md text-center w-[300px] h-[380px] overflow-hidden">
            <h3 className="text-lg font-semibold text-orange-600">{meal.title}</h3>
            <img
              src={`https://spoonacular.com/recipeImages/${meal.id}-312x231.jpg`}
              alt={meal.title}
              className="rounded-xl w-full h-50 object-cover mt-2"
            />
            <a
              href={meal.sourceUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="block mt-4 bg-orange-400 text-white py-1 px-3 rounded-md hover:bg-orange-500"
            >
              View Recipe
            </a>
            <button
            onClick={() => handleAddFavorite(meal)}
            className="mt-2 w-full bg-orange-400 text-white text-sm font-semibold px-2 py-2 rounded-md hover:bg-orange-500 transition duration-300"
          >
            Save to Favorites
          </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MealMatch;
