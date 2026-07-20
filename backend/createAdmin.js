import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import { UserModel } from './models/Users.js';
import dotenv from 'dotenv';

dotenv.config();

async function createAdmin() {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/recipe_db');
    console.log('Connected to DB');

    const adminExists = await UserModel.findOne({ username: 'Admin' });
    if (adminExists) {
      console.log('Admin user already exists.');
    } else {
      const hashedPassword = await bcrypt.hash('123456789', 10);
      const admin = new UserModel({
        username: 'Admin',
        password: hashedPassword,
        role: 'admin'
      });
      await admin.save();
      console.log('Admin user created successfully!');
    }

  } catch (error) {
    console.error('Error creating admin:', error);
  } finally {
    mongoose.disconnect();
  }
}

createAdmin();
