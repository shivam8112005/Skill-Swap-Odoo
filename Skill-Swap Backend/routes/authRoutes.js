import express from 'express';
import bcrypt from 'bcryptjs';
import User from '../models/userModel.js';
import jwt from 'jsonwebtoken';

const router = express.Router();

const generateAccessToken = async function (user) {
    return jwt.sign(
        {
            _id: user._id,
            name: user.name,
            email: user.email,
            //   profilePicture: this.profilePicture,
            createdAt: user.createdAt.toISOString(),
        },
        process.env.JWT_SECRET,
        {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY,
        }
    );
};

router.post('/google',
    async (req, res) => {
        const { name, email } = req.body;
console.log(name, email)
        if (!name || !email) {
            throw new Error(400, "All fields are required");
        }

        try {
            const user = await User.findOne({ email }).select("-password");

            if (user) {
                const token = await generateAccessToken(user);

                if (!user) {
                    throw new Error(401, "Google auth fail");
                }

                const cookieOption = {
                    // httpOnly: true,
                    secure: true,
                    sameSite: "None",
                    maxAge: 7 * 24 * 60 * 60 * 1000,
                    path: "/",
                };

                return res
                    .status(201)
                    .cookie("token", token, cookieOption)
                    .json({status: 201, user: user, message: "Google auth successfull"});
            } else {
                const existingUser = await User.findOne({ email: email });

                if (existingUser) {
                    throw new Error(
                        409,
                        "Username with this email or username already exists"
                    );
                }

                const generatePassword =
                    Math.random().toString(36).slice(-8) +
                    Math.random().toString(36).slice(-8);

                const newUser = new User({
                    name:
                        name.toLowerCase().split(" ").join("") +
                        Math.random().toString(9).slice(-4),
                    email: email,
                    password: generatePassword
                });

                await newUser.save();

                const token = await generateAccessToken(newUser);

                const loggedInUser = await User.findById(newUser._id).select("-password");

                if (!loggedInUser) {
                    throw new Error(500, "Something went wrong while registering user");
                }

                const cookieOption = {
                    httpOnly: true,
                    secure: true,
                    sameSite: "None",
                    maxAge: 7 * 24 * 60 * 60 * 1000,
                    path: "/",
                };

                return res
                    .status(201)
                    .cookie("token", token, cookieOption)
                    .json({status: 201, user:loggedInUser,message: "Google auth successfull"});
            }
        } catch (error) {
            console.log("Error in google auth", error.message);
            return res.status(401).json(new Error(401, error.message));
        }
    });


router.post('/register', async (req, res) => {
    const { name, email, password, skills } = req.body;
    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }
         const cookieOption = {
                    // httpOnly: true,
                    secure: true,
                    sameSite: "None",
                    maxAge: 7 * 24 * 60 * 60 * 1000,
                    path: "/",
                };
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        const newUser = new User({ name, email, password: hashedPassword, skills });
        await newUser.save();
        const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, {
            expiresIn: "2w"
        });
         return res
                    .status(201)
                    .cookie("token", token, cookieOption)
                    .json({status: 201, user:newUser,message: "registered succesfully"});
        // res.status(201).json({token,message: 'User registered successfully'});
    //   return  res.status(201).json({ token, message: 'Register successful', user: { id: newUser._id, name: newUser.name, email: newUser.email } });
    }
    catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});
router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    const userExist = await User.findOne({ email });
    if (!userExist) {
        return res.status(404).json({ message: ' user not found' });
    }
    const isMatch = await bcrypt.compare(password, userExist.password);
    if (!isMatch) {
        return res.status(400).json({ message: 'Invalid credentials' });
    }
    const token = jwt.sign({ id: userExist._id }, process.env.JWT_SECRET, {
        expiresIn: "2w"
    });
     const cookieOption = {
                    // httpOnly: true,
                    secure: true,
                    sameSite: "None",
                    maxAge: 7 * 24 * 60 * 60 * 1000,
                    path: "/",
                };
                return res
                    .status(200)
                    .cookie("token", token, cookieOption)
                    .json({status: 200, user:userExist,message: "login succesfully"});
//    return res.status(200).json({ token, message: 'Login successful', user: { id: userExist._id, name: userExist.name, email: userExist.email } });
});
//sign in with google
export default router;