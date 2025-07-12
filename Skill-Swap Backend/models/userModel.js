import mongoose from "mongoose";
import bcrypt from "bcryptjs";

// const userSchema=new mongoose.Schema({
//  username:{
//     type: String,
//     required: [true, "Please enter your username"],
//  },
//  email:{
//     type: String,
//     required: [true, "Please enter your email"],
//     unique: true,
    
//  },
//     password:{
//         type: String,
//         required: [true, "Please enter your password"],
//     },

// }, { timestamps: true });




// import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true
  },
  password: {
    type: String,
    required: true
  },
  skills: {
    type: [String], // E.g., ["Web Dev", "Design"]
    default: []
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  private: {
    type: Boolean,
    default: false
  },
  available: {
    type: [String],
    enum: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
    default: []
  }
});

const User = mongoose.model('User', userSchema);

export default User;


