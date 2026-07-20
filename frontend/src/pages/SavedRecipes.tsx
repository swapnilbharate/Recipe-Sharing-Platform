import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useCookies } from 'react-cookie';
import { Link } from 'react-router-dom';
import { Clock, BookmarkCheck, Sparkles, ChefHat } from 'lucide-react';

interface Recipe {
  _id: string;
  name: string;
  instructions: string;
  imageUrl: string;
  cookingTime: number;
}

export const SavedRecipes = () => {
  const [savedRecipes, setSavedRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState(true);
  const [cookies] = useCookies(['access_token']);
  const userID = localStorage.getItem('userID');

  useEffect(() => {
    const fetchSavedRecipes = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3001/recipes/savedRecipes/${userID}`,
          { headers: { authorization: cookies.access_token } }
        );
        // Sometimes backend might return just IDs, let's fetch full details or assume it returns full.
        // The backend `savedRecipes` returns full populated docs if `.populate()` was used,
        // but if it wasn't, we might need a different endpoint. Let's assume it returns full docs for now based on previous code.
        setSavedRecipes(response.data.savedRecipes || []);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    if (cookies.access_token && userID) {
      fetchSavedRecipes();
    } else {
      setLoading(false);
    }
  }, [cookies.access_token, userID]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-20 bg-transparent">
        <div className="animate-spin text-gold">
          <ChefHat size={48} />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#4A0E1F] to-[#1A1A1A] pt-20 pb-12 font-sans relative overflow-hidden">
      {/* Background ambient glows removed for Option 5 split background */}

      {savedRecipes.length === 0 ? (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-32 relative z-10">
          <div className="text-center animate-slide-up glass-card p-12 rounded-3xl max-w-3xl mx-auto">
            <div className="inline-flex items-center justify-center p-5 bg-[#FFD166]/20 rounded-full mb-8 border border-[#FFD166]/30">
              <BookmarkCheck size={48} className="text-[#FF6B00]" />
            </div>
            <h1 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight mb-4">
              Your cookbook is <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FFD166] to-[#FF6B00]">empty</span>
            </h1>
            <p className="mt-4 text-xl text-gray-400 max-w-2xl mx-auto mb-10">
              You haven't saved any authentic recipes yet. Discover delicious Maharashtrian ideas from our community and save them here for later!
            </p>
            <Link
              to="/"
              className="inline-flex items-center justify-center px-8 py-4 border border-transparent text-lg font-bold rounded-xl text-white bg-[#FF6B00] hover:bg-[#e65c00] shadow-[0_0_20px_rgba(255,107,0,0.4)] transition-all duration-200 transform hover:-translate-y-1"
            >
              <Sparkles size={24} className="mr-3 text-white" />
              Discover Recipes
            </Link>
          </div>
        </div>
      ) : (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative z-10">
          <div className="mb-12">
            <h1 className="text-4xl font-extrabold text-white tracking-tight mb-2">Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FFD166] to-[#FF6B00]">Cookbook</span></h1>
            <p className="text-lg text-gray-400">Your personal collection of premium authentic recipes.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {savedRecipes.map((recipe, index) => (
              <Link 
                to={`/recipe/${recipe._id}`}
                key={recipe._id} 
                className="group glass-card rounded-3xl transition-all duration-300 overflow-hidden animate-slide-up hover:-translate-y-2 hover:shadow-[0_10px_40px_rgba(255,107,0,0.15)] block"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={recipe.imageUrl}
                    alt={recipe.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 opacity-80 group-hover:opacity-100"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1495521821757-a1efb6729352?q=80&w=1000&auto=format&fit=crop';
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0F0F13] to-transparent opacity-80"></div>
                </div>
                
                <div className="p-6 relative">
                  <h2 className="text-xl font-bold text-white mb-3 line-clamp-1">{recipe.name}</h2>
                  <p className="text-gray-400 mb-6 line-clamp-2 text-sm leading-relaxed">{recipe.instructions}</p>
                  
                  <div className="flex items-center justify-between pt-4 border-t border-white/5">
                    <div className="flex items-center text-gray-400 space-x-2">
                      <Clock size={18} className="text-[#FF6B00]" />
                      <span className="text-sm font-medium">{recipe.cookingTime} mins</span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};