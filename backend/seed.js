import mongoose from 'mongoose';
import { RecipeModel } from './models/Recipes.js';
import { UserModel } from './models/Users.js';
import dotenv from 'dotenv';

dotenv.config();

const recipes = [
  {
    name: 'Authentic Misal Pav',
    ingredients: ['Sprouted Moth Beans (Matki)', 'Onions', 'Tomatoes', 'Godha Masala', 'Farsan', 'Pav (Bread)'],
    instructions: '1. Boil sprouted matki. 2. Prepare the fiery tarri (gravy) using onions, tomatoes, and godha masala. 3. Serve in a bowl topped with farsan, chopped onions, and lemon. 4. Enjoy hot with soft pav.',
    imageUrl: 'https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?q=80&w=1000&auto=format&fit=crop',
    cookingTime: 45,
    prepTime: 20,
    servings: 4
  },
  {
    name: 'Classic Puran Poli',
    ingredients: ['Chana Dal', 'Jaggery (Gud)', 'Whole Wheat Flour', 'Nutmeg Powder', 'Cardamom', 'Ghee'],
    instructions: '1. Boil chana dal until soft. 2. Mash and cook with jaggery to make the sweet filling (Puran). 3. Make dough from wheat flour. 4. Stuff the puran into the dough, roll it flat, and cook on a tawa with plenty of ghee.',
    imageUrl: 'https://images.unsplash.com/photo-1627918846387-9b222955f118?q=80&w=1000&auto=format&fit=crop',
    cookingTime: 60,
    prepTime: 30,
    servings: 6
  },
  {
    name: 'Spicy Vada Pav',
    ingredients: ['Potatoes', 'Besan (Gram Flour)', 'Green Chillies', 'Garlic', 'Mustard Seeds', 'Pav'],
    instructions: '1. Boil and mash potatoes, mix with tempered mustard seeds, garlic, and green chillies. 2. Make small balls and dip in besan batter. 3. Deep fry until golden. 4. Serve hot in a sliced pav with dry garlic chutney.',
    imageUrl: 'https://images.unsplash.com/photo-1606491956689-2ea866880c84?q=80&w=1000&auto=format&fit=crop',
    cookingTime: 30,
    prepTime: 15,
    servings: 4
  },
  {
    name: 'Kanda Poha',
    ingredients: ['Flattened Rice (Poha)', 'Onions', 'Peanuts', 'Mustard Seeds', 'Curry Leaves', 'Turmeric', 'Coriander'],
    instructions: '1. Wash and drain the poha. 2. Sauté peanuts, mustard seeds, curry leaves, and chopped onions. 3. Add turmeric and the soaked poha. 4. Mix well, garnish with fresh coriander and a squeeze of lemon.',
    imageUrl: 'https://images.unsplash.com/photo-1605338302194-e866e4a29a00?q=80&w=1000&auto=format&fit=crop',
    cookingTime: 15,
    prepTime: 10,
    servings: 2
  },
  {
    name: 'Bharli Vangi (Stuffed Eggplant)',
    ingredients: ['Small Baby Eggplants', 'Roasted Peanut Powder', 'Grated Coconut', 'Godha Masala', 'Tamarind Paste', 'Jaggery'],
    instructions: '1. Slit the eggplants into four sections without breaking the stem. 2. Mix peanut powder, coconut, godha masala, tamarind, and jaggery. 3. Stuff the mixture into the eggplants. 4. Cook in a pan until soft and coated in thick gravy.',
    imageUrl: 'https://images.unsplash.com/photo-1631515243349-e0cb75fb8d3a?q=80&w=1000&auto=format&fit=crop',
    cookingTime: 40,
    prepTime: 15,
    servings: 4
  },
  {
    name: 'Sabudana Khichdi',
    ingredients: ['Sago (Sabudana)', 'Roasted Peanuts (crushed)', 'Potatoes', 'Green Chillies', 'Cumin Seeds', 'Ghee'],
    instructions: '1. Soak sabudana overnight. 2. Sauté cumin seeds, green chillies, and diced potatoes in ghee. 3. Add soaked sabudana and crushed peanuts. 4. Cook until pearls become translucent.',
    imageUrl: 'https://images.unsplash.com/photo-1626545758063-cd6f332215c2?q=80&w=1000&auto=format&fit=crop',
    cookingTime: 20,
    prepTime: 10,
    servings: 3
  },
  {
    name: 'Pav Bhaji',
    ingredients: ['Potatoes', 'Cauliflower', 'Green Peas', 'Capsicum', 'Onions', 'Tomatoes', 'Pav Bhaji Masala', 'Butter'],
    instructions: '1. Boil and mash vegetables. 2. Sauté onions, tomatoes, and capsicum in butter. 3. Add pav bhaji masala and the mashed veggies. 4. Cook until rich and thick. Serve with butter-toasted pav.',
    imageUrl: 'https://images.unsplash.com/photo-1606491956391-70868b5d0f47?q=80&w=1000&auto=format&fit=crop',
    cookingTime: 45,
    prepTime: 20,
    servings: 5
  },
  {
    name: 'Thalipeeth',
    ingredients: ['Bhajani Flour (Multi-grain)', 'Onions', 'Coriander', 'Green Chillies', 'Sesame Seeds', 'Oil'],
    instructions: '1. Mix bhajani flour with chopped onions, coriander, chillies, and water to make a soft dough. 2. Flatten a portion onto a hot, oiled tawa, making small holes in the center. 3. Drizzle oil and cook until crisp on both sides.',
    imageUrl: 'https://images.unsplash.com/photo-1631515242808-491c6e4dd323?q=80&w=1000&auto=format&fit=crop',
    cookingTime: 25,
    prepTime: 15,
    servings: 4
  }
];

async function seed() {
  try {
    const mongoUri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/recipe_app'; // common default
    // Note: If they use a different DB name in their .env, it should get picked up if dotenv loads correctly.
    // Let's connect to the database.
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/recipe_db');
    
    console.log('Connected to DB');

    // Check if models are defined, if not, import them
    // (They are imported above)

    // Find user swapnil
    let user = await UserModel.findOne({ username: 'swapnil' });
    if (!user) {
      console.log('User "swapnil" not found, creating one...');
      user = new UserModel({ username: 'swapnil', password: 'password123' });
      await user.save();
    }
    
    // Assign recipes to user
    const recipesWithUser = recipes.map(r => ({ ...r, userOwner: user._id }));

    // Insert recipes
    const inserted = await RecipeModel.insertMany(recipesWithUser);
    console.log(`Successfully inserted ${inserted.length} recipes for user ${user.username}.`);
    
    // Optionally add a few to savedRecipes just to test
    if (user.savedRecipes.length === 0) {
      user.savedRecipes.push(inserted[0]._id);
      user.savedRecipes.push(inserted[1]._id);
      await user.save();
      console.log('Added 2 saved recipes to user.');
    }

  } catch (error) {
    console.error('Error seeding DB:', error);
  } finally {
    mongoose.disconnect();
  }
}

seed();
