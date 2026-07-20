import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  username: { 
    type: String, 
    required: true, 
    unique: true 
  },
  password: { 
    type: String, 
    required: true 
  },
  profilePicture: {
    type: String,
    default: "https://images.unsplash.com/photo-1577219491135-ce391730fb2c?q=80&w=150&auto=format&fit=crop"
  },
  bio: {
    type: String,
    default: ""
  },
  role: {
    type: String,
    enum: ["user", "admin"],
    default: "user"
  },
  followers: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  }],
  following: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  }],
  reputationScore: {
    type: Number,
    default: 0
  },
  savedRecipes: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Recipe"
  }]
}, { timestamps: true });

export const UserModel = mongoose.model("User", UserSchema);