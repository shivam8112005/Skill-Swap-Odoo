// import jwt from 'jsonwebtoken';
// import User from '../models/userModel.js';

// const verifyToken = async (req, res, next) => {
//     try{
//         // console.log(req.user);
//         const authHeader = req.headers.authorization;
//         if(!authHeader || !authHeader.startsWith("Bearer ")){
//             return res.status(401).json({message:'Unauthorized'});
//         }
//         const token = authHeader.split(" ")[1];
//         // console.log(token);
//         const decoded = jwt.verify(token, process.env.JWT_SECRET);
//         const user=await User.findById(decoded.id);
//         if(!user){
//             return res.status(404).json({message:'User not found'});
//         }
//         req.user = user;
//         next();
//     }catch(error){
//         console.error(error);
//         // console.log('helooooooooooooooooooooooooooooooooooo');
        
//         return res.status(401).json({message:'Unauthorized'});
//     }
// }
// export default verifyToken;



import jwt from 'jsonwebtoken'
// import { ApiError } from './ApiError.js'

 const verifyToken = (req, res, next) => {
    const token = req.cookies.token
    
    if (!token) {
        throw new Error(401, 'Unautorized')
    }
    
    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) {
            return new Error(401, 'Unauthorized')
        }
        req.user = user
        next()
    })
}
export default verifyToken;