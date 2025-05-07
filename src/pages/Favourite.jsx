import React, { useState, useEffect } from 'react';

const FavoritesPage = () => {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const storedFavorites = JSON.parse(localStorage.getItem('favorites')) || [];
    setFavorites(storedFavorites);
  }, []);

  const handleRemoveFavorite = (mealSourceUrl) => {
    const updatedFavorites = favorites.filter((meal) => meal.sourceUrl !== mealSourceUrl);
    setFavorites(updatedFavorites);
    localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
  };

  return (
    <div className="bg-white flex flex-col items-center justify-center mt-15 mb-40">
      <h1 className="text-3xl font-bold text-orange-400 text-center italic mb-6">Your Favorite Recipes</h1>

      <div className="w-full max-w-5xl bg-orange-50 p-8 rounded-xl shadow-lg">
      {favorites.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {favorites.map((meal) => (
            <div key={meal.sourceUrl} className="bg-white p-4 rounded-xl shadow-lg">
              <h3 className="text-xl font-semibold text-orange-500">{meal.title}</h3>
              <img 
                src={`https://spoonacular.com/recipeImages/${meal.image}`} 
                alt={meal.title} 
                className="w-full h-40 object-cover rounded-xl mt-4" 
              />
              <p className="text-orange-600 mt-2">
                <a href={meal.sourceUrl} target="_blank" rel="noopener noreferrer">
                  <button 
                    type='submit' 
                    className='w-full bg-orange-400 text-white text-sm font-semibold px-2 py-1 rounded-md hover:bg-orange-500 transition duration-300'
                  >View Recipe</button>
                </a>
              </p>
              <button 
                onClick={() => handleRemoveFavorite(meal.sourceUrl)} 
                className="mt-2 w-full bg-red-400 text-white text-sm font-semibold px-2 py-1 rounded-md hover:bg-red-600 transition duration-300"
              >
                Remove from Favorites
              </button>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-orange-600">No favorites yet. Start adding some!</p>
      )}
    </div>
    </div>
  );
};

export default FavoritesPage;
