import express from 'express';
import mongoose from 'mongoose';
import { RecipeModel } from '../models/Recipes.js';
import { UserModel } from '../models/Users.js';
import { verifyToken } from './middleware.js';

const router = express.Router();

// Get all recipes
router.get("/", async (req, res) => {
  try {
    const recipes = await RecipeModel.find({});
    res.json(recipes);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Create recipe
router.post("/", verifyToken, async (req, res) => {
  const recipe = new RecipeModel(req.body);
  try {
    const newRecipe = await recipe.save();
    res.status(201).json(newRecipe);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Save recipe
router.put("/", verifyToken, async (req, res) => {
  const { userID, recipeID } = req.body;
  
  try {
    const user = await UserModel.findById(userID);
    const recipe = await RecipeModel.findById(recipeID);

    user.savedRecipes.push(recipe);
    await user.save();

    res.json({ savedRecipes: user.savedRecipes });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get saved recipes
router.get("/savedRecipes/:userID", async (req, res) => {
  try {
    const user = await UserModel.findById(req.params.userID);
    const savedRecipes = await RecipeModel.find({
      _id: { $in: user.savedRecipes },
    });
    
    res.json({ savedRecipes });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export { router as recipesRouter };