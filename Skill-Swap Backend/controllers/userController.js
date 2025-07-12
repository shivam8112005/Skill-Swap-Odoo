import User from "../models/userModel.js";
import jwt from "jsonwebtoken";

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
};
export const registerUser = async (req, res) => {
  const { username, email, password } = req.body;
  try {
    const userExists = await User.findOne({ email });

    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }

    const user = await User.create({
      username,
      email,
      password,
    });

    if (user) {
      res.status(201).json({
        _id: user._id,
        username: user.username,
        email: user.email,
        token: generateToken(user._id),
      });
    } else {
      res.status(400).json({ message: "Invalid user data" });
    }
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};


// import jwt from "jsonwebtoken";
// import User from "../models/userModel.js";

// const generateToken=(id)=> jwt.sign({id}, process.env.JWT_SECRET);

// const registerUser=async(req, res)=>{
//   const {username, email,password}=req.body;
//   const user=await User.findOne({email});
//   if(user)
//     return res.status(400).json({message:'User already exists'});
//   const newUser=await User.create({username, email, password});
//   if(newUser){
//     res.status(201).json({
//       _id:newUser._id,
//       username:newUser.username,
//       email:newUser.email,
//       token:generateToken(newUser._id),
//     })
//   }else{
//     res.status(400).json({message:'Invalid user data'});
//   }

// }
