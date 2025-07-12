import express from 'express';
import verifyToken from '../middlewares/verifyToken.js';
import BarterRequest from '../models/BarterRequest.js';
import SkillPost from '../models/skillPost.js';


const router = express.Router();

router.post('/request', verifyToken, async (req, res) => {
    const { receiverId, senderSkillPostId, receiverSkillPostId, newSkillPost } = req.body;
    try {
        let finalSenderSkillPostId = senderSkillPostId;
        if (!senderSkillPostId && newSkillPost) {
            const {    
            type,
            skillDescription,
            requiredSkills,
            providedSkills,
            barterDateTime } = newSkillPost;

            if (!title || !description || !category) {
                return res.status(400).json({
                    message: 'Title, description, and category are required for creating a skill post.'
                });
            }
            const newSkillPost = new SkillPost({
                userId: req.user._id,
                type,
                skillDescription,
                requiredSkills,
                providedSkills,
                barterDateTime
            });
            const savedSkillPost = await newSkillPost.save();
            finalSenderSkillPostId = savedSkillPost._id;
        }
        if (!finalSenderSkillPostId) {
            return res.status(400).json({
                message: 'Either provide an existing skill post ID or skill post details to create a new one.'
            });
        }
        const existing = await BarterRequest.findOne({
            sender: req.user._id,
            receiver: receiverId,
            senderSkillPost: finalSenderSkillPostId,
            receiverSkillPost: receiverSkillPostId,
            status: 'pending'
        });

        if (existing) {
            return res.status(409).json({
                message: 'You have already sent a request to this user for this barter.'
            });
        }
        const newReq = new BarterRequest({
            sender: req.user._id,
            receiver: receiverId,
            senderSkillPost: finalSenderSkillPostId,
            receiverSkillPost: receiverSkillPostId,
        });

        await newReq.save();
        return res.status(200).json({
            message: 'Barter request sent successfully.',
            senderSkillPostId: finalSenderSkillPostId,
            wasSkillPostCreated: !senderSkillPostId
        });

    } catch (e) {
        console.log(e);
        return res.status(500).json({ message: 'Internal server error' });
    }
});


router.post('/respond-barter', verifyToken, async (req, res) => {
    const { barterRequestId, response } = req.body;
    if (!['accepted', 'rejected'].includes(response)) {
        return res.status(400).json({ message: 'Invalid response' });
    }
    try {
        const request = await BarterRequest.findById(barterRequestId);
        if (!request) {
            return res.status(404).json({ message: 'Barter request not found' });
        }
        if (request.receiver.toString() !== req.user._id.toString())
            return res.status(403).json({ message: 'You are not authorized to respond to this request.' });
        request.status = response;
        await request.save();
        return res.status(200).json({ message: `Barter request ${response} successfully.` });

    } catch (e) {
        console.log(e);
        return res.status(500).json({ message: 'Internal server error' });
    }
});

router.get('/my-requests', verifyToken, async (req, res) => {
    try {
        const sent = await BarterRequest.find({ sender: req.user._id })
            .populate('receiver', 'name email')
            .populate('senderSkillPost')
            .populate('receiverSkillPost');
        const requests = await BarterRequest.find({ receiver: req.user._id, status: 'pending' }).populate('receiver', 'name email').populate('senderSkillPost').populate('receiverSkillPost');
        return res.status(200).json({ requests, sent });
    } catch (e) {
        console.log(e);
        return res.status(500).json({ message: 'Internal server error' });
    }
});
router.get('/active-barter', verifyToken, async (req, res) => {
    try {
        const requests = await BarterRequest.find({
            $or: [
                { sender: req.user._id, status: 'accepted' },
                { receiver: req.user._id, status: 'accepted' }
            ]
        })
            .populate('sender', 'name email')
            .populate('receiver', 'name email')
            .populate('senderSkillPost')
            .populate('receiverSkillPost');

        return res.status(200).json({ requests });
    } catch (e) {
        console.log(e);
        return res.status(500).json({ message: 'Internal server error' });
    }
});
//quick match, negotiate, and cancel barter request

export default router;