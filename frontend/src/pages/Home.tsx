import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useCookies } from 'react-cookie';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { Plus, TrendingUp, Bookmark, Star, Bell, ChefHat, Clock } from 'lucide-react';
import { API_URL } from '../config';

interface Recipe {
  _id: string;
  name: string;
  instructions: string;
  imageUrl: string;
  cookingTime: number;
  userOwner?: {
    _id: string;
    username: string;
  };
}

export const Home = () => {
  const navigate = useNavigate();
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [savedRecipes, setSavedRecipes] = useState<string[]>([]);
  const [cookies] = useCookies(['access_token']);
  const userID = localStorage.getItem('userID');
  const username = localStorage.getItem('username') || 'Chef';
  const [loading, setLoading] = useState(true);
  const [isFirstVisit, setIsFirstVisit] = useState(() => {
    const visitKey = `hasVisited_${username}`;
    return !localStorage.getItem(visitKey);
  });

  useEffect(() => {
    if (isFirstVisit) {
      localStorage.setItem(`hasVisited_${username}`, 'true');
    }
  }, [isFirstVisit, username]);

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const response = await axios.get(`${API_URL}/recipes`);
        setRecipes(response.data);
      } catch (err) {
        console.error(err);
      }
    };

    const fetchSavedRecipes = async () => {
      try {
        const response = await axios.get(
          `${API_URL}/recipes/savedRecipes/ids/${userID}`,
          { headers: { authorization: cookies.access_token } }
        );
        setSavedRecipes(response.data.savedRecipes || []);
      } catch (err) {
        console.error(err);
      }
    };

    fetchRecipes().then(() => {
      if (cookies.access_token && userID) {
        fetchSavedRecipes().finally(() => setLoading(false));
      } else {
        setLoading(false);
      }
    });
  }, [cookies.access_token, userID]);

  const saveRecipe = async (recipeID: string) => {
    try {
      const response = await axios.put(
        `${API_URL}/recipes`,
        { recipeID, userID },
        { headers: { authorization: cookies.access_token } }
      );
      setSavedRecipes(response.data.savedRecipes);
    } catch (err) {
      console.error(err);
    }
  };

  const isRecipeSaved = (id: string) => savedRecipes.includes(id);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-20">
        <div className="animate-spin text-saffron-500">
          <ChefHat size={48} />
        </div>
      </div>
    );
  }

  // If NOT logged in, show the public landing page
  if (!cookies.access_token) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#4A0E1F] to-[#1A1A1A] pt-20 pb-12 font-sans relative overflow-hidden">
        {recipes.length === 0 ? (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-32 relative z-10">
            <div className="text-center animate-slide-up glass-card p-12 rounded-3xl max-w-3xl mx-auto">
              <div className="inline-flex items-center justify-center p-5 bg-[#FF6B00]/20 rounded-full mb-8 border border-[#FF6B00]/30 shadow-[0_0_20px_rgba(255,107,0,0.2)]">
                <ChefHat size={48} className="text-[#FF6B00]" />
              </div>
              <h1 className="text-4xl md:text-6xl font-extrabold text-white tracking-tight mb-4">
                Welcome to <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF6B00] to-[#FFD166]">Aapli Recipe</span>
              </h1>
              <p className="mt-4 text-xl text-gray-400 max-w-2xl mx-auto mb-10">
                Discover authentic Maharashtrian cuisine. Create an account to join our premium community of chefs.
              </p>
              <Link
                to="/auth"
                className="inline-flex items-center justify-center px-8 py-4 border border-transparent text-lg font-bold rounded-xl text-white bg-[#FF6B00] hover:bg-[#e65c00] shadow-[0_0_20px_rgba(255,107,0,0.4)] transition-all duration-200 transform hover:-translate-y-1"
              >
                <Plus size={24} className="mr-2" />
                Start Cooking
              </Link>
            </div>
          </div>
        ) : (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative z-10">
            <div className="text-center mb-16">
              <h1 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight mb-4">Discover Recipes</h1>
              <p className="text-xl text-gray-400">Explore the latest creations from our community.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Render Public Grid */}
              {recipes.map((recipe, index) => (
                <div 
                  key={recipe._id} 
                  onClick={() => {
                    toast.error('Please login first to view this recipe!');
                    navigate('/auth');
                  }} 
                  className="group glass-card rounded-3xl transition-all duration-300 overflow-hidden animate-slide-up hover:-translate-y-2 hover:shadow-[0_10px_40px_rgba(255,107,0,0.15)] block cursor-pointer" 
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="relative h-64 overflow-hidden">
                    <img src={recipe.imageUrl} alt={recipe.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 opacity-80 group-hover:opacity-100" />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0F0F13] to-transparent opacity-80"></div>
                  </div>
                  <div className="p-6 relative">
                    <h2 className="text-xl font-bold text-white mb-3 line-clamp-1">{recipe.name}</h2>
                    <div className="flex items-center text-gray-400 space-x-2">
                      <Clock size={18} className="text-[#FF6B00]" />
                      <span className="text-sm font-medium">{recipe.cookingTime} mins</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  }

  // Logged in Dashboard
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#4A0E1F] to-[#1A1A1A] pt-24 pb-12 font-sans relative overflow-hidden">
      {/* Background ambient glows removed for Option 5 split background */}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Dashboard Header */}
        <div className="mb-10 animate-fade-in flex flex-col md:flex-row md:items-end justify-between">
          <div>
            <h1 className="text-3xl md:text-5xl font-extrabold text-white tracking-tight">
              {isFirstVisit ? 'Welcome,' : 'Welcome back,'} <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF6B00] to-[#FFD166]">{username}</span>!
            </h1>
            <p className="mt-3 text-lg text-gray-400">Your Premium Culinary Workspace</p>
          </div>
          
          <div className="mt-6 md:mt-0">
             <Link
                to="/create-recipe"
                className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-sm font-bold rounded-xl text-white bg-[#FF6B00] hover:bg-[#e65c00] shadow-[0_0_20px_rgba(255,107,0,0.3)] transition-all duration-200 transform hover:-translate-y-1"
              >
                <Plus size={20} className="mr-2" />
                New Recipe
              </Link>
          </div>
        </div>

        {/* Dashboard Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          
          {/* Analytics Overviews */}
          <div className="glass-card rounded-3xl p-6 flex flex-col justify-between h-40 animate-slide-up hover:border-[#FF6B00] transition-colors" style={{animationDelay: '100ms'}}>
            <div className="flex items-center justify-between">
              <div className="w-12 h-12 bg-[#FF6B00]/20 text-[#FF6B00] rounded-2xl flex items-center justify-center border border-[#FF6B00]/30">
                <ChefHat size={24} />
              </div>
              <span className="text-xs font-bold text-green-400 bg-green-400/10 px-2 py-1 rounded-full">Active</span>
            </div>
            <div>
              <p className="text-3xl font-extrabold text-white mb-1">{recipes.filter(r => r.userOwner?._id === userID).length}</p>
              <p className="text-gray-500 font-medium text-sm">My Published Recipes</p>
            </div>
          </div>

          <div className="glass-card rounded-3xl p-6 flex flex-col justify-between h-40 animate-slide-up hover:border-gold/50 transition-colors" style={{animationDelay: '200ms'}}>
            <div className="w-12 h-12 bg-gold/20 text-gold rounded-2xl flex items-center justify-center border border-gold/30">
              <Bookmark size={24} />
            </div>
            <div>
              <p className="text-3xl font-extrabold text-white mb-1">{savedRecipes.length}</p>
              <p className="text-gray-500 font-medium text-sm">Saved Recipes Collection</p>
            </div>
          </div>

          <div className="glass-card rounded-3xl p-6 flex flex-col justify-between h-40 animate-slide-up hover:border-maroon-500/50 transition-colors" style={{animationDelay: '300ms'}}>
            <div className="w-12 h-12 bg-maroon-500/20 text-maroon-400 rounded-2xl flex items-center justify-center border border-maroon-500/30">
              <Star size={24} />
            </div>
            <div>
              <p className="text-3xl font-extrabold text-white mb-1">{recipes.length}</p>
              <p className="text-gray-500 font-medium text-sm">Total Platform Recipes</p>
            </div>
          </div>
        </div>

        {/* Special Recipes Section (Top 3) */}
        <div className="mb-12">
          <h2 className="text-2xl font-extrabold text-white mb-6 flex items-center">
            <Star className="text-[#FFD166] mr-3" size={28} /> Special Recipes
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {recipes.slice(0, 3).map((recipe, index) => (
              <div key={recipe._id} className="group glass-card rounded-3xl transition-all duration-300 overflow-hidden animate-slide-up hover:-translate-y-2 hover:shadow-[0_10px_40px_rgba(255,107,0,0.2)] block relative" style={{ animationDelay: `${index * 100}ms` }}>
                <div className="relative h-56 overflow-hidden">
                  <Link to={`/recipe/${recipe._id}`} className="block w-full h-full relative z-0">
                    <img src={recipe.imageUrl} alt={recipe.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 opacity-80 group-hover:opacity-100" />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0F0F13] to-transparent opacity-80"></div>
                  </Link>
                  <button 
                    onClick={() => saveRecipe(recipe._id)}
                    disabled={isRecipeSaved(recipe._id)}
                    className="absolute top-4 right-4 p-2 bg-black/40 backdrop-blur-md rounded-full text-white hover:bg-white/10 transition-colors z-10 disabled:opacity-100 disabled:bg-[#FF6B00]/20 cursor-pointer"
                  >
                    <Bookmark size={20} className={isRecipeSaved(recipe._id) ? "fill-[#FF6B00] text-[#FF6B00]" : "text-white"} />
                  </button>
                </div>
                <Link to={`/recipe/${recipe._id}`} className="p-6 relative block">
                  <h2 className="text-xl font-bold text-white mb-2 line-clamp-1">{recipe.name}</h2>
                  <p className="text-gray-400 text-sm line-clamp-2 mb-4 leading-relaxed">{recipe.instructions}</p>
                  <div className="flex items-center text-gray-400 space-x-2">
                    <Clock size={16} className="text-[#FF6B00]" />
                    <span className="text-sm font-medium">{recipe.cookingTime} mins cook</span>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>

        {/* More Recipes Section (12 items) */}
        <div className="mb-12">
          <h2 className="text-2xl font-extrabold text-white mb-6">More Recipes</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {recipes.slice(3, 15).map((recipe, index) => (
              <div key={recipe._id} className="group glass-card rounded-3xl transition-all duration-300 overflow-hidden animate-slide-up hover:-translate-y-2 hover:shadow-[0_10px_40px_rgba(255,107,0,0.15)] block relative" style={{ animationDelay: `${index * 50}ms` }}>
                <div className="relative h-48 overflow-hidden">
                  <Link to={`/recipe/${recipe._id}`} className="block w-full h-full relative z-0">
                    <img src={recipe.imageUrl} alt={recipe.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 opacity-80 group-hover:opacity-100" />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0F0F13] to-transparent opacity-80"></div>
                  </Link>
                  <button 
                    onClick={() => saveRecipe(recipe._id)}
                    disabled={isRecipeSaved(recipe._id)}
                    className="absolute top-4 right-4 p-2 bg-black/40 backdrop-blur-md rounded-full text-white hover:bg-white/10 transition-colors z-10 disabled:opacity-100 disabled:bg-[#FF6B00]/20 cursor-pointer"
                  >
                    <Bookmark size={20} className={isRecipeSaved(recipe._id) ? "fill-[#FF6B00] text-[#FF6B00]" : "text-white"} />
                  </button>
                </div>
                <Link to={`/recipe/${recipe._id}`} className="p-5 relative block">
                  <h2 className="text-lg font-bold text-white mb-2 line-clamp-1">{recipe.name}</h2>
                  <p className="text-gray-400 text-sm line-clamp-2 mb-4">{recipe.instructions}</p>
                  <div className="flex items-center text-gray-400 space-x-2">
                    <Clock size={16} className="text-[#FF6B00]" />
                    <span className="text-xs font-medium">{recipe.cookingTime} mins</span>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};