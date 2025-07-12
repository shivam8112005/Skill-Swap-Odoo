import express from 'express';
import SkillPost from '../models/skillPost.js';
import verifyToken from '../middlewares/verifyToken.js';
const router = express.Router();

router.post('/postskill',verifyToken, async(req, res)=>{
    const {
        skillName,
        type,
        skillDescription,
        requiredSkills,
        providedSkills,
        barterDateTime
      } = req.body;
     console.log(req.body)
      try{
        if( !type){
            return res.status(400).json({message:'Please fill all the fields 1'});
        }
        if(type==='offer' && !requiredSkills){
            return res.status(400).json({message:'Please fill all the fields 2'});

        }
        if(type==='request' && !providedSkills){
            return res.status(400).json({message:'Please fill all the fields 3'});

        }
        const newSkillPost = new SkillPost({
            userId: req.user._id, 
            type,
            skillDescription,
            requiredSkills,
            providedSkills,
            barterDateTime
        });
        await newSkillPost.save();
        return res.status(200).json({message:'skill posted successfully.', skill:{'skillName':skillName, 'type':type, 'skillDescription':skillDescription, 'requiredSkills':requiredSkills, 'providedSkills':providedSkills, 'barterDateTime':barterDateTime}});
      }catch(e){
        console.log(e);
        res.status(500).json({message:'Internal server error'});
      }
});
router.get('/allskillposts', async (req, res) => {

  const posts = await SkillPost.find().populate('userId', 'name email');
  console.log(posts);
  
  res.status(200).json(posts);
});
//protected route
router.get('/my-skillposts', verifyToken, async (req, res) => {
  const posts = await SkillPost.find({ userId: req.user._id });
  res.status(200).json(posts);
});

export default router;