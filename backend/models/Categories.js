import mongoose from 'mongoose';

const CategorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  image: {
    type: String,
  },
  description: {
    type: String
  }
});

export const CategoryModel = mongoose.model('Category', CategorySchema);
