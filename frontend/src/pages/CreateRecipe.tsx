import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import { Image as ImageIcon, Plus, X, Clock, Users, Utensils, Beaker, FileText, ChevronRight, Save } from 'lucide-react';

export const CreateRecipe = () => {
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
      await axios.post(
        'http://localhost:3001/recipes',
        recipe,
        {
          headers: { authorization: cookies.access_token },
        }
      );
      navigate('/');
    } catch (error) {
      console.error(error);
      alert('Error creating recipe. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#4A0E1F] to-[#1A1A1A] pt-24 pb-12 font-sans relative overflow-hidden">
      {/* Background ambient glows removed for Option 5 split background */}

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header & Progress */}
        <div className="mb-10 animate-fade-in">
          <h1 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight mb-6">
            New Recipe: <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF6B00] to-[#FFD166]">Step 1 - Basics</span>
          </h1>
          
          <div className="relative">
            <div className="overflow-hidden h-2.5 mb-4 text-xs flex rounded-full bg-white/10">
              <div style={{ width: "33%" }} className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-gradient-to-r from-[#FF6B00] to-[#FFD166] shadow-[0_0_15px_rgba(255,107,0,0.5)]"></div>
            </div>
            <div className="flex justify-between text-sm font-medium text-gray-500">
              <span className="text-[#FF6B00] font-bold">1. Basics & Ingredients</span>
              <span>2. Instructions</span>
              <span>3. Review & Publish</span>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8 animate-slide-up">
          
          {/* Card 1: Recipe Basics */}
          <div className="glass-card p-8 rounded-3xl">
            <h2 className="text-xl font-bold text-white mb-6 flex items-center">
              <Utensils className="mr-3 text-[#FF6B00]" size={24} /> Recipe Basics
            </h2>
            
            <div className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-semibold text-gray-300 mb-2">Recipe Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={recipe.name}
                  onChange={handleChange}
                  className="block w-full px-4 py-3.5 border border-white/10 rounded-xl bg-white/5 focus:bg-white/10 focus:outline-none focus:ring-2 focus:ring-saffron-500 transition-all text-white text-lg font-medium placeholder-gray-600"
                  placeholder="e.g. Authentic Puran Poli"
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label htmlFor="prepTime" className="block text-sm font-semibold text-gray-300 mb-2 flex items-center">
                    <Clock size={16} className="mr-2 text-[#FF6B00]" /> Prep Time (min)
                  </label>
                  <input
                    type="number"
                    id="prepTime"
                    name="prepTime"
                    value={recipe.prepTime || ''}
                    onChange={handleChange}
                    min="0"
                    className="block w-full px-4 py-3 border border-white/10 rounded-xl bg-white/5 focus:bg-white/10 focus:outline-none focus:ring-2 focus:ring-saffron-500 transition-all text-white placeholder-gray-600"
                    placeholder="15"
                  />
                </div>
                <div>
                  <label htmlFor="cookingTime" className="block text-sm font-semibold text-gray-300 mb-2 flex items-center">
                    <Clock size={16} className="mr-2 text-[#FF6B00]" /> Cook Time (min)
                  </label>
                  <input
                    type="number"
                    id="cookingTime"
                    name="cookingTime"
                    value={recipe.cookingTime || ''}
                    onChange={handleChange}
                    min="0"
                    className="block w-full px-4 py-3 border border-white/10 rounded-xl bg-white/5 focus:bg-white/10 focus:outline-none focus:ring-2 focus:ring-saffron-500 transition-all text-white placeholder-gray-600"
                    placeholder="45"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="servings" className="block text-sm font-semibold text-gray-300 mb-2 flex items-center">
                    <Users size={16} className="mr-2 text-[#FF6B00]" /> Servings
                  </label>
                  <input
                    type="number"
                    id="servings"
                    name="servings"
                    value={recipe.servings || ''}
                    onChange={handleChange}
                    min="1"
                    className="block w-full px-4 py-3 border border-white/10 rounded-xl bg-white/5 focus:bg-white/10 focus:outline-none focus:ring-2 focus:ring-saffron-500 transition-all text-white placeholder-gray-600"
                    placeholder="4"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Card 2: Ingredients */}
          <div className="glass-card p-8 rounded-3xl">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-white flex items-center">
                <Beaker className="mr-3 text-gold" size={24} /> Ingredients
              </h2>
              <button
                type="button"
                onClick={addIngredient}
                className="inline-flex items-center px-4 py-2 text-sm font-bold text-gold bg-gold/10 hover:bg-gold/20 rounded-xl transition-colors border border-gold/20"
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
                      className="block w-full px-4 py-2 bg-transparent focus:outline-none text-white font-medium placeholder-gray-600"
                      placeholder={`e.g. 2 cups of Chana Dal`}
                      required
                    />
                  </div>
                  {recipe.ingredients.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeIngredient(index)}
                      className="p-2 text-gray-400 hover:text-red-400 hover:bg-red-500/10 rounded-xl transition-colors shrink-0"
                      title="Remove Ingredient"
                    >
                      <X size={20} />
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Card 3: Media & Draft Instructions (Since it's step 1, we still need them to submit for now) */}
          <div className="glass-card p-8 rounded-3xl">
            <h2 className="text-xl font-bold text-white mb-6 flex items-center">
              <ImageIcon className="mr-3 text-maroon-400" size={24} /> Upload Images & Videos
            </h2>
            <div className="space-y-6">
              <div>
                <label htmlFor="imageUrl" className="block text-sm font-semibold text-gray-300 mb-2">Cover Image URL</label>
                <input
                  type="url"
                  id="imageUrl"
                  name="imageUrl"
                  value={recipe.imageUrl}
                  onChange={handleChange}
                  className="block w-full px-4 py-3 border border-white/10 rounded-xl bg-white/5 focus:bg-white/10 focus:outline-none focus:ring-2 focus:ring-maroon-500 transition-all text-white placeholder-gray-600"
                  placeholder="https://example.com/image.jpg"
                  required
                />
              </div>

              {/* Temporarily putting instructions here so the form is submittable */}
              <div>
                <label htmlFor="instructions" className="block text-sm font-semibold text-gray-300 mb-2 flex items-center">
                  <FileText size={16} className="mr-2 text-maroon-400" /> Instructions (Temporary for Step 1)
                </label>
                <textarea
                  id="instructions"
                  name="instructions"
                  value={recipe.instructions}
                  onChange={handleChange}
                  rows={4}
                  className="block w-full px-4 py-3 border border-white/10 rounded-xl bg-white/5 focus:bg-white/10 focus:outline-none focus:ring-2 focus:ring-maroon-500 transition-all text-white placeholder-gray-600"
                  placeholder="Step 1: Boil the chana dal..."
                  required
                />
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col-reverse sm:flex-row items-center justify-between gap-4 pt-6">
            <button
              type="button"
              className="w-full sm:w-auto inline-flex justify-center items-center px-8 py-4 border-2 border-white/10 text-gray-300 hover:border-white/20 hover:bg-white/5 font-bold rounded-2xl transition-all"
            >
              <Save size={20} className="mr-2" /> Save Draft
            </button>
            <button
              type="submit"
              className="w-full sm:w-auto inline-flex justify-center items-center px-10 py-4 bg-[#FF6B00] hover:bg-[#e65c00] text-white font-bold rounded-2xl shadow-[0_0_20px_rgba(255,107,0,0.4)] transition-all transform hover:-translate-y-1"
            >
              Next Step <ChevronRight size={20} className="ml-2" />
            </button>
          </div>

        </form>
      </div>
    </div>
  );
};