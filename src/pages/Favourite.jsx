import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from './firebase';
import Navbar from '../components/Navbar';

const FavoritesPage = () => {
  const navigate = useNavigate();
  const [favorites, setFavorites] = useState([]);
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
    const storedFavorites = JSON.parse(localStorage.getItem('favorites') || '[]');
    setFavorites(storedFavorites);
  }, []);

  useEffect(() => {
    if (notification) {
      const timer = setTimeout(() => setNotification(null), 3000);
      return () => clearTimeout(timer);
    }
  }, [notification]);

  const handleRemoveFavorite = (meal) => {
    console.log(`Removing ${meal.title} from favorites`);
    const updatedFavorites = favorites.filter((fav) => fav.sourceUrl !== meal.sourceUrl);
    setFavorites(updatedFavorites);
    localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
    console.log(`Notification: ${meal.title} removed from favorites!`);
    setNotification(`${meal.title} removed from favorites!`);
    window.dispatchEvent(new Event('storage'));
  };

  const navLinks = [
    { path: '/dashboard', name: 'MyDashboard', show: isLoggedIn },
    { path: '/mealmatch', name: 'MealMatch', show: true },
    { path: '/favourites', name: 'Favourites', show: isLoggedIn },
    { path: '/about', name: 'About Us', show: true },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50">
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
      <div className="flex flex-col items-center justify-center py-10 px-4">
        <h1 className="text-3xl font-bold text-red-500 text-center italic mb-6">Your Favorite Recipes</h1>
        <div className="w-full max-w-5xl bg-red-50 p-8 rounded-xl shadow-lg">
          {favorites.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {favorites.map((meal) => (
                <div key={meal.sourceUrl} className="bg-white p-4 rounded-xl shadow-lg">
                  <h3 className="text-xl font-semibold text-orange-500">{meal.title}</h3>
                  <img
                    src={`https://spoonacular.com/recipeImages/${meal.id}-312x231.jpg`}
                    alt={meal.title}
                    className="w-full h-40 object-cover rounded-xl mt-4"
                    onError={(e) => { e.target.src = '/placeholder.png'; }}
                  />
                  <p className="text-orange-600 mt-2">
                    <a href={meal.sourceUrl} target="_blank" rel="noopener noreferrer">
                      <button
                        type="button"
                        className="w-full bg-gradient-to-r from-orange-500 to-red-400 text-white text-sm font-semibold px-2 py-1 rounded-md hover:bg-orange-500 transition duration-300"
                      >
                        View Recipe
                      </button>
                    </a>
                  </p>
                  <button
                    onClick={() => handleRemoveFavorite(meal)}
                    className="mt-2 w-full bg-gradient-to-r from-red-100 to-orange-100 text-orange-500 text-sm font-semibold px-2 py-1 rounded-md hover:bg-red-600 transition duration-300"
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
    </div>
  );
};

export default FavoritesPage;