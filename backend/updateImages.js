import mongoose from 'mongoose';
import { RecipeModel } from './models/Recipes.js';
import dotenv from 'dotenv';

dotenv.config();

async function updateImages() {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/recipe_db');
    console.log('Connected to DB');

    // Update Misal Pav
    const misalRes = await RecipeModel.updateOne(
      { name: '1. Misal Pav' },
      { $set: { imageUrl: 'https://myspicetrunk.com/wp-content/uploads/2020/07/WhatsApp-Image-2020-07-19-at-7.28.19-PM-e1607460582997.jpeg?v=1613928650' } }
    );
    console.log(`Misal Pav updated: ${misalRes.modifiedCount} document(s) modified.`);

    // Update Vada Pav
    const vadaRes = await RecipeModel.updateOne(
      { name: '2. Vada Pav' },
      { $set: { imageUrl: 'https://ministryofcurry.com/wp-content/uploads/2024/06/vada-pav-3.jpg' } }
    );
    console.log(`Vada Pav updated: ${vadaRes.modifiedCount} document(s) modified.`);

  } catch (error) {
    console.error('Error updating images:', error);
  } finally {
    mongoose.disconnect();
  }
}

updateImages();
