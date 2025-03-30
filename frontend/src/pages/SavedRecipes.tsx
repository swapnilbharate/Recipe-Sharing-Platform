import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useCookies } from 'react-cookie';

interface Recipe {
  _id: string;
  name: string;
  instructions: string;
  imageUrl: string;
  cookingTime: number;
}

export const SavedRecipes = () => {
  const [savedRecipes, setSavedRecipes] = useState<Recipe[]>([]);
  const [cookies] = useCookies(['access_token']);
  const userID = localStorage.getItem('userID');

  useEffect(() => {
    const fetchSavedRecipes = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3001/recipes/savedRecipes/${userID}`,
          { headers: { authorization: cookies.access_token } }
        );
        setSavedRecipes(response.data.savedRecipes);
      } catch (err) {
        console.error(err);
      }
    };

    if (cookies.access_token) fetchSavedRecipes();
  }, [cookies.access_token, userID]);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Your Saved Recipes</h1>
      {savedRecipes.length === 0 ? (
        <p className="text-gray-600 text-center">No saved recipes yet.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {savedRecipes.map((recipe) => (
            <div key={recipe._id} className="bg-white rounded-lg shadow-md overflow-hidden">
              <img
                src={recipe.imageUrl}
                alt={recipe.name}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h2 className="text-xl font-semibold text-gray-900 mb-2">{recipe.name}</h2>
                <p className="text-gray-600 mb-4">{recipe.instructions}</p>
                <div className="flex items-center text-gray-500">
                  <span className="text-sm">Cooking Time: {recipe.cookingTime} minutes</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};