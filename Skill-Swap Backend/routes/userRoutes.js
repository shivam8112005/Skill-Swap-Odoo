import express from 'express';
import { registerUser } from '../controllers/userController.js';
import User from '../models/userModel.js';
import verifyToken from '../middlewares/verifyToken.js';
const router = express.Router();
router.post('/register', registerUser);
router.get('/userprofile', verifyToken, async(req, res) => {
    const user = await User.findById( req.user._id);
    
    return res.status(200).json({ user: user })
})
router.put('/profileUpdate', verifyToken, async (req, res) => {
  try {
    const { skills, available, private: isPrivate } = req.body;

    const updatedUser = await User.findByIdAndUpdate(
      req.user._id,
      {
        skills: skills || [],
        available: available || [],
        private: isPrivate || false,
      },
      { new: true, runValidators: true }
    ).lean();

    return res.status(200).json(updatedUser);
  } catch (err) {
    console.error("Profile update error:", err.message);
    return res.status(500).json({ message: "Failed to update profile" });
  }
});
export default router;