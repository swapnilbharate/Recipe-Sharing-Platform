import mongoose from 'mongoose';
import { CategoryModel } from './models/Categories.js';
import { CommentModel } from './models/Comments.js';
import { RecipeModel } from './models/Recipes.js';
import { UserModel } from './models/Users.js';

const LOCAL_URI = 'mongodb://127.0.0.1:27017/recipe_db';
// Your exact Atlas Connection String with password
const CLOUD_URI = 'mongodb+srv://bharateswapnil969696_db_user:KMGMXVfIrp3jwKq4@cluster0.gp60b3q.mongodb.net/recipe_db?retryWrites=true&w=majority&appName=Cluster0';

async function migrateData() {
    try {
        console.log("-----------------------------------------");
        console.log("🔌 Connecting to LOCAL database...");
        await mongoose.connect(LOCAL_URI);
        
        console.log("📦 Fetching all local data...");
        const users = await UserModel.find({}).lean();
        const recipes = await RecipeModel.find({}).lean();
        const comments = await CommentModel.find({}).lean();
        const categories = await CategoryModel.find({}).lean();
        
        console.log(`✅ Found: ${users.length} users, ${recipes.length} recipes, ${comments.length} comments, ${categories.length} categories.`);
        
        await mongoose.disconnect();
        console.log("🔌 Disconnected from local database.");

        console.log("\n-----------------------------------------");
        console.log("☁️  Connecting to CLOUD (Atlas) database...");
        await mongoose.connect(CLOUD_URI);
        
        console.log("🧹 Clearing any existing cloud data to prevent duplicates...");
        await UserModel.deleteMany({});
        await RecipeModel.deleteMany({});
        await CommentModel.deleteMany({});
        await CategoryModel.deleteMany({});

        console.log("🚀 Uploading data to cloud database...");
        if (users.length > 0) await UserModel.insertMany(users);
        if (recipes.length > 0) await RecipeModel.insertMany(recipes);
        if (comments.length > 0) await CommentModel.insertMany(comments);
        if (categories.length > 0) await CategoryModel.insertMany(categories);
        
        console.log("🎉 Migration 100% complete! All your Maharashtrian recipes and accounts are safe in the cloud!");
        await mongoose.disconnect();
    } catch (err) {
        console.error("❌ Migration failed:", err);
    }
}

migrateData();
