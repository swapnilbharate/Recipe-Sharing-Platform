import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import { Image as ImageIcon, Plus, X, Clock, Users, Utensils, Beaker, FileText, Save, ArrowLeft } from 'lucide-react';

export const EditRecipe = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [cookies] = useCookies(['access_token']);
  const userID = localStorage.getItem('userID');

  const [recipe, setRecipe] = useState({
    name: '',
    ingredients: [''],
    instructions: '',
    imageUrl: '',
    cookingTime: 0,
    prepTime: 0,
    servings: 0,
    userOwner: userID,
  });
  
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const response = await axios.get('http://localhost:3001/recipes');
        const foundRecipe = response.data.find((r: any) => r._id === id);
        if (foundRecipe) {
          setRecipe({
            name: foundRecipe.name,
            ingredients: foundRecipe.ingredients,
            instructions: foundRecipe.instructions,
            imageUrl: foundRecipe.imageUrl,
            cookingTime: foundRecipe.cookingTime,
            prepTime: foundRecipe.prepTime || 0,
            servings: foundRecipe.servings || 0,
            userOwner: foundRecipe.userOwner._id || foundRecipe.userOwner,
          });
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchRecipe();
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setRecipe({ ...recipe, [name]: value });
  };

  const handleIngredientChange = (index: number, value: string) => {
    const ingredients = [...recipe.ingredients];
    ingredients[index] = value;
    setRecipe({ ...recipe, ingredients });
  };

  const addIngredient = () => {
    setRecipe({ ...recipe, ingredients: [...recipe.ingredients, ''] });
  };

  const removeIngredient = (index: number) => {
    const ingredients = recipe.ingredients.filter((_, i) => i !== index);
    setRecipe({ ...recipe, ingredients });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.put(
        `http://localhost:3001/recipes/${id}`,
        recipe,
        {
          headers: { authorization: cookies.access_token },
        }
      );
      navigate(`/recipe/${id}`);
    } catch (error) {
      console.error(error);
      alert('Error updating recipe. Please try again.');
    }
  };

  if (loading) return <div className="min-h-screen bg-[#1A1A1A]"></div>;

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#4A0E1F] to-[#1A1A1A] pt-24 pb-12 font-sans relative overflow-hidden">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="mb-10 animate-fade-in flex items-center justify-between">
          <h1 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight flex items-center">
             Edit Recipe
          </h1>
          <button onClick={() => navigate(-1)} className="text-gray-400 hover:text-white flex items-center">
            <ArrowLeft className="mr-2" size={20} /> Cancel
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8 animate-slide-up">
          
          <div className="glass-card p-8 rounded-3xl">
            <h2 className="text-xl font-bold text-white mb-6 flex items-center">
              <Utensils className="mr-3 text-[#FF6B00]" size={24} /> Recipe Basics
            </h2>
            
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-semibold text-gray-300 mb-2">Recipe Name</label>
                <input
                  type="text"
                  name="name"
                  value={recipe.name}
                  onChange={handleChange}
                  className="block w-full px-4 py-3.5 border border-white/10 rounded-xl bg-white/5 focus:bg-white/10 focus:outline-none focus:ring-2 focus:ring-[#FF6B00] transition-all text-white text-lg font-medium"
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-300 mb-2 flex items-center">
                    <Clock size={16} className="mr-2 text-[#FF6B00]" /> Prep Time (min)
                  </label>
                  <input
                    type="number"
                    name="prepTime"
                    value={recipe.prepTime}
                    onChange={handleChange}
                    min="0"
                    className="block w-full px-4 py-3 border border-white/10 rounded-xl bg-white/5 focus:bg-white/10 focus:outline-none focus:ring-2 focus:ring-[#FF6B00] text-white"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-300 mb-2 flex items-center">
                    <Clock size={16} className="mr-2 text-[#FF6B00]" /> Cook Time (min)
                  </label>
                  <input
                    type="number"
                    name="cookingTime"
                    value={recipe.cookingTime}
                    onChange={handleChange}
                    min="0"
                    className="block w-full px-4 py-3 border border-white/10 rounded-xl bg-white/5 focus:bg-white/10 focus:outline-none focus:ring-2 focus:ring-[#FF6B00] text-white"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-300 mb-2 flex items-center">
                    <Users size={16} className="mr-2 text-[#FF6B00]" /> Servings
                  </label>
                  <input
                    type="number"
                    name="servings"
                    value={recipe.servings}
                    onChange={handleChange}
                    min="1"
                    className="block w-full px-4 py-3 border border-white/10 rounded-xl bg-white/5 focus:bg-white/10 focus:outline-none focus:ring-2 focus:ring-[#FF6B00] text-white"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="glass-card p-8 rounded-3xl">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-white flex items-center">
                <Beaker className="mr-3 text-[#FFD166]" size={24} /> Ingredients
              </h2>
              <button
                type="button"
                onClick={addIngredient}
                className="inline-flex items-center px-4 py-2 text-sm font-bold text-[#FFD166] bg-[#FFD166]/10 hover:bg-[#FFD166]/20 rounded-xl border border-[#FFD166]/20"
              >
                <Plus size={16} className="mr-2" /> Add Item
              </button>
            </div>
            
            <div className="space-y-3">
              {recipe.ingredients.map((ingredient, index) => (
                <div key={index} className="flex items-center gap-3 animate-fade-in bg-white/5 p-2 rounded-2xl border border-white/10">
                  <div className="flex-1">
                    <input
                      type="text"
                      value={ingredient}
                      onChange={(e) => handleIngredientChange(index, e.target.value)}
                      className="block w-full px-4 py-2 bg-transparent focus:outline-none text-white font-medium"
                      required
                    />
                  </div>
                  {recipe.ingredients.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeIngredient(index)}
                      className="p-2 text-gray-400 hover:text-red-400 hover:bg-red-500/10 rounded-xl"
                    >
                      <X size={20} />
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="glass-card p-8 rounded-3xl">
            <h2 className="text-xl font-bold text-white mb-6 flex items-center">
              <ImageIcon className="mr-3 text-[#FF6B00]" size={24} /> Image & Instructions
            </h2>
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-semibold text-gray-300 mb-2">Cover Image URL</label>
                <input
                  type="url"
                  name="imageUrl"
                  value={recipe.imageUrl}
                  onChange={handleChange}
                  className="block w-full px-4 py-3 border border-white/10 rounded-xl bg-white/5 focus:outline-none focus:ring-2 focus:ring-[#FF6B00] text-white"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-300 mb-2 flex items-center">
                  <FileText size={16} className="mr-2 text-[#FF6B00]" /> Instructions
                </label>
                <textarea
                  name="instructions"
                  value={recipe.instructions}
                  onChange={handleChange}
                  rows={6}
                  className="block w-full px-4 py-3 border border-white/10 rounded-xl bg-white/5 focus:outline-none focus:ring-2 focus:ring-[#FF6B00] text-white whitespace-pre-wrap"
                  required
                />
              </div>
            </div>
          </div>

          <div className="flex justify-end pt-6">
            <button
              type="submit"
              className="inline-flex justify-center items-center px-10 py-4 bg-[#FF6B00] hover:bg-[#e65c00] text-white font-bold rounded-2xl shadow-[0_0_20px_rgba(255,107,0,0.4)]"
            >
              <Save size={20} className="mr-2" /> Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
