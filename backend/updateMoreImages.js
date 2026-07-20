import mongoose from 'mongoose';
import { RecipeModel } from './models/Recipes.js';
import dotenv from 'dotenv';

dotenv.config();

async function updateImages() {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/recipe_db');
    console.log('Connected to DB');

    const updates = [
      {
        name: '3. Puran Poli',
        url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR2rJVuy70AyDopTK3LyJcul7SE1Ft3KTrwBAYRG8qolw&s=10'
      },
      {
        name: '4. Thalipeeth',
        url: 'https://neevnutrition.in/wp-content/uploads/2022/03/Studio-Project-2022-03-23T222831.989.png'
      },
      {
        name: '5. Sabudana Khichdi',
        url: 'https://shwetainthekitchen.com/wp-content/uploads/2021/09/Sabudana-Khichdi.jpg'
      },
      {
        name: '6. Kothimbir Vadi',
        url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTX_LV-OYSBeyEhmlddUTypro-OoRsQnV6Yc6XfzBK4zw&s=10'
      },
      {
        name: '7. Bharli Vangi',
        url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQqCm0twegE3VnnJuH1zHWCr4ZNX6cWHWnTMGAa_lNri_IgSkEJh_e_Yn0j&s=10'
      },
      {
        name: '8. Zunka Bhakar',
        url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRmkgTSrWjAm_5TfBTu8sQGTBMJUjZEPJkkk4p339ws6A&s=10'
      },
      {
        name: '9. Modak',
        url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQiV-XQ-ijgFcfNX-qNt3ufX5w-dSg8mZbgKfJq4qd8pE6o5K4A2FTgtMFB&s=10'
      },
      {
        name: '10. Solkadhi',
        url: 'https://assets.cntraveller.in/photos/60ba27e21fa22668f025a7e4/16:9/w_2560%2Cc_limit/KHXC6M-1366x768.jpg'
      },
      {
        name: '11. Batata Bhaji',
        url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR_dAG1xKJ0IMdVbn0cKqNBWtBh5w9ec1rr0ar4avt9uA&s=10'
      },
      {
        name: '12. Shrikhand',
        url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQlzPatSEL8andiyRqzhJmJo5yOLbppaurFaxEaZ9Eqizkh4m9EMeMUA-Xs&s=10'
      }
    ];

    for (let i = 0; i < updates.length; i++) {
      const res = await RecipeModel.updateOne(
        { name: updates[i].name },
        { $set: { imageUrl: updates[i].url } }
      );
      console.log(`${updates[i].name} updated: ${res.modifiedCount} document(s) modified.`);
    }

  } catch (error) {
    console.error('Error updating images:', error);
  } finally {
    mongoose.disconnect();
  }
}

updateImages();
