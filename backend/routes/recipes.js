import express from 'express';
import mongoose from 'mongoose';
import { RecipeModel } from '../models/Recipes.js';
import { UserModel } from '../models/Users.js';
import { verifyToken } from './middleware.js';

const router = express.Router();

// Get all recipes
router.get("/", async (req, res) => {
  try {
    const recipes = await RecipeModel.find({}).populate("userOwner", "username");
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

// Toggle like recipe
router.put("/like", verifyToken, async (req, res) => {
  const { userID, recipeID } = req.body;
  
  try {
    const recipe = await RecipeModel.findById(recipeID);
    if (!recipe) return res.status(404).json({ message: "Recipe not found" });

    const hasLiked = recipe.likes.includes(userID);
    if (hasLiked) {
      recipe.likes = recipe.likes.filter((id) => id.toString() !== userID);
    } else {
      recipe.likes.push(userID);
    }
    
    await recipe.save();
    res.json({ likes: recipe.likes });
  } catch (err) {
    res.status(500).json({ message: err.message });
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

// Get saved recipes IDs
router.get("/savedRecipes/ids/:userID", async (req, res) => {
  try {
    const user = await UserModel.findById(req.params.userID);
    res.json({ savedRecipes: user?.savedRecipes || [] });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Delete recipe
router.delete("/:id", verifyToken, async (req, res) => {
  try {
    const recipeID = req.params.id;
    const userIdFromToken = req.user.id;
    const user = await UserModel.findById(userIdFromToken);
    
    if (!user) return res.status(404).json({ message: "User not found" });

    const recipe = await RecipeModel.findById(recipeID);
    if (!recipe) return res.status(404).json({ message: "Recipe not found" });

    if (recipe.userOwner.toString() !== userIdFromToken && user.role !== 'admin') {
      return res.status(403).json({ message: "Not authorized to delete this recipe" });
    }

    await RecipeModel.findByIdAndDelete(recipeID);
    res.json({ message: "Recipe deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Update recipe
router.put("/:id", verifyToken, async (req, res) => {
  try {
    const recipeID = req.params.id;
    const userIdFromToken = req.user.id;
    const user = await UserModel.findById(userIdFromToken);
    
    if (!user) return res.status(404).json({ message: "User not found" });

    const recipe = await RecipeModel.findById(recipeID);
    if (!recipe) return res.status(404).json({ message: "Recipe not found" });

    if (recipe.userOwner.toString() !== userIdFromToken && user.role !== 'admin') {
      return res.status(403).json({ message: "Not authorized to edit this recipe" });
    }

    const updatedRecipe = await RecipeModel.findByIdAndUpdate(recipeID, req.body, { new: true });
    res.json(updatedRecipe);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export { router as recipesRouter };