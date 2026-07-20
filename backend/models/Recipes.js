import mongoose from 'mongoose';

const RecipeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  ingredients: [{
    type: String,
    required: true,
  }],
  instructions: {
    type: String,
    required: true,
  },
  imageUrl: {
    type: String,
    required: true,
  },
  cookingTime: {
    type: Number,
    required: true,
  },
  prepTime: {
    type: Number,
    default: 0,
  },
  servings: {
    type: Number,
    default: 2,
  },
  difficulty: {
    type: String,
    enum: ["Easy", "Medium", "Hard"],
    default: "Medium"
  },
  categories: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category"
  }],
  tags: [{
    type: String
  }],
  likes: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  }],
  averageRating: {
    type: Number,
    default: 0
  },
  views: {
    type: Number,
    default: 0
  },
  videoLink: {
    type: String,
  },
  status: {
    type: String,
    enum: ["draft", "published"],
    default: "published"
  },
  userOwner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
}, { timestamps: true });

export const RecipeModel = mongoose.model("Recipe", RecipeSchema);