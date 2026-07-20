import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import axios from 'axios';
import { Clock, Users, ChefHat, ArrowLeft, Heart, Calendar, User, Trash2, Edit3 } from 'lucide-react';
import { useCookies } from 'react-cookie';
import { API_URL } from '../config';

interface Recipe {
  _id: string;
  name: string;
  ingredients: string[];
  instructions: string;
  imageUrl: string;
  cookingTime: number;
  prepTime?: number;
  servings?: number;
  likes?: string[];
  createdAt?: string;
  userOwner?: { _id: string; username: string };
}

export const RecipeDetails = () => {
  const { id } = useParams<{ id: string }>();
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [loading, setLoading] = useState(true);
  const [cookies] = useCookies(['access_token']);
  const userID = window.localStorage.getItem('userID');
  const userRole = window.localStorage.getItem('userRole');
  const navigate = useNavigate();

  useEffect(() => {
    if (!cookies.access_token) {
      toast.error('Please login first to view this recipe!');
      navigate('/auth', { replace: true });
    }
  }, [cookies.access_token, navigate]);



  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const response = await axios.get(`${API_URL}/recipes`);
        const foundRecipe = response.data.find((r: Recipe) => r._id === id);
        setRecipe(foundRecipe);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchRecipe();
  }, [id]);

  const handleLike = async () => {
    if (!cookies.access_token || !userID || !recipe) return alert("Please sign in to like recipes!");
    try {
      const response = await axios.put(
        `${API_URL}/recipes/like`,
        { recipeID: recipe._id, userID },
        { headers: { authorization: cookies.access_token } }
      );
      setRecipe({ ...recipe, likes: response.data.likes });
    } catch (err) {
      console.error(err);
    }
  };

  const hasLiked = recipe?.likes?.includes(userID || '');
  const formattedDate = recipe?.createdAt ? new Date(recipe.createdAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }) : 'Recently';
  const canEditOrDelete = (userID && recipe?.userOwner?._id === userID) || userRole === 'admin';

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this recipe?")) return;
    try {
      await axios.delete(`${API_URL}/recipes/${recipe?._id}`, {
        headers: { authorization: cookies.access_token }
      });
      navigate('/');
    } catch (err) {
      console.error(err);
      alert("Failed to delete recipe.");
    }
  };

  if (!cookies.access_token) {
    return null;
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#4A0E1F] to-[#1A1A1A]">
        <div className="animate-spin text-[#FF6B00]">
          <ChefHat size={48} />
        </div>
      </div>
    );
  }

  if (!recipe) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-[#4A0E1F] to-[#1A1A1A] text-white">
        <h1 className="text-3xl font-bold mb-4">Recipe not found</h1>
        <Link to="/" className="text-[#FF6B00] hover:underline flex items-center">
          <ArrowLeft className="mr-2" /> Back to Home
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#4A0E1F] to-[#1A1A1A] pt-24 pb-12 font-sans text-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="flex justify-between items-center mb-6">
          <Link to="/" className="inline-flex items-center text-gray-400 hover:text-[#FF6B00] transition-colors font-medium">
            <ArrowLeft size={20} className="mr-2" /> Back to Discover
          </Link>
          
          {canEditOrDelete && (
            <div className="flex space-x-3">
              <Link 
                to={`/edit-recipe/${recipe._id}`}
                className="flex items-center px-4 py-2 bg-white/5 hover:bg-white/10 text-white rounded-lg border border-white/10 transition-colors"
              >
                <Edit3 size={16} className="mr-2" /> Edit
              </Link>
              <button 
                onClick={handleDelete}
                className="flex items-center px-4 py-2 bg-red-500/10 hover:bg-red-500/20 text-red-400 rounded-lg border border-red-500/20 transition-colors"
              >
                <Trash2 size={16} className="mr-2" /> Delete
              </button>
            </div>
          )}
        </div>

        <div className="glass-card rounded-3xl overflow-hidden animate-slide-up shadow-2xl border border-white/10">
          {/* Header Image */}
          <div className="relative h-80 md:h-[400px] w-full">
            <img 
              src={recipe.imageUrl} 
              alt={recipe.name} 
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0F0F13] to-transparent opacity-90"></div>
            
            <div className="absolute bottom-0 left-0 p-8 w-full">
              <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-3 drop-shadow-lg">{recipe.name}</h1>
              
              <div className="flex items-center space-x-4 mb-6 text-gray-300">
                <div className="flex items-center">
                  <User size={16} className="text-[#FF6B00] mr-2" />
                  <span className="font-medium">Created by {recipe.userOwner?.username || 'Chef'}</span>
                </div>
                <span>•</span>
                <div className="flex items-center">
                  <Calendar size={16} className="text-[#FF6B00] mr-2" />
                  <span>{formattedDate}</span>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-4 text-gray-200">
                <button 
                  onClick={handleLike}
                  className={`flex items-center px-5 py-2.5 rounded-full border transition-all ${
                    hasLiked 
                      ? 'bg-[#FF6B00]/20 border-[#FF6B00]/50 text-[#FF6B00]' 
                      : 'bg-black/40 backdrop-blur-md border-white/10 hover:bg-white/10 text-white'
                  }`}
                >
                  <Heart size={18} className={`mr-2 ${hasLiked ? 'fill-[#FF6B00]' : ''}`} />
                  <span className="font-semibold">{recipe.likes?.length || 0} Likes</span>
                </button>
                
                <div className="flex items-center bg-black/40 backdrop-blur-md px-4 py-2.5 rounded-full border border-white/10">
                  <Clock size={18} className="text-[#FF6B00] mr-2" />
                  <span className="font-semibold">{recipe.cookingTime} mins cook</span>
                </div>
                {recipe.prepTime && (
                  <div className="flex items-center bg-black/40 backdrop-blur-md px-4 py-2 rounded-full border border-white/10">
                    <Clock size={18} className="text-[#FFD166] mr-2" />
                    <span className="font-semibold">{recipe.prepTime} mins prep</span>
                  </div>
                )}
                {recipe.servings && (
                  <div className="flex items-center bg-black/40 backdrop-blur-md px-4 py-2 rounded-full border border-white/10">
                    <Users size={18} className="text-[#FF6B00] mr-2" />
                    <span className="font-semibold">{recipe.servings} servings</span>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="p-8 md:p-10 grid grid-cols-1 md:grid-cols-3 gap-10">
            {/* Ingredients Sidebar */}
            <div className="md:col-span-1">
              <h2 className="text-2xl font-bold text-white mb-6 flex items-center border-b border-white/10 pb-4">
                Ingredients
              </h2>
              <ul className="space-y-4">
                {recipe.ingredients && recipe.ingredients.map((item, idx) => (
                  <li key={idx} className="flex items-start">
                    <span className="w-2 h-2 mt-2 mr-3 bg-[#FF6B00] rounded-full shrink-0 shadow-[0_0_8px_rgba(255,107,0,0.8)]"></span>
                    <span className="text-gray-300 leading-relaxed font-medium">{item}</span>
                  </li>
                ))}
                {(!recipe.ingredients || recipe.ingredients.length === 0) && (
                  <p className="text-gray-400 italic">Ingredients list not available.</p>
                )}
              </ul>
            </div>

            {/* Instructions Main */}
            <div className="md:col-span-2">
              <h2 className="text-2xl font-bold text-white mb-6 flex items-center border-b border-white/10 pb-4">
                Instructions
              </h2>
              <div className="text-gray-300 space-y-4 text-lg leading-relaxed whitespace-pre-line">
                {recipe.instructions}
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
