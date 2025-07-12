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
  }
});

const User = mongoose.model('User', userSchema);

export default User;



// userSchema.pre("save", async function (next) {
//   if (!this.isModified("password")) {
//     return next();
//   }
//   const salt = await bcrypt.genSalt(10);
//   this.password = await bcrypt.hash(this.password, salt);
//   next();
// });

// userSchema.methods.matchPassword = async function (enteredPassword) {
//   return await bcrypt.compare(enteredPassword, this.password);
// };

// const User = mongoose.model("User", userSchema);
// export default User;
