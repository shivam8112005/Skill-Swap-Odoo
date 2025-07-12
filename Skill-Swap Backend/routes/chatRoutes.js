import express from 'express';
// import ChatSession from '../models/chat.model.js';
import BarterRequest from '../models/BarterRequest.js';
import verifyToken from '../middlewares/verifyToken.js';

const router = express.Router();

router.post('/start', verifyToken, async (req, res) => {
    const { barterId } = req.body;

    try {
        const barter = await BarterRequest.findById(barterId);
        if (!barter || barter.status !== 'accepted') {
            return res.status(400).json({ error: 'Barter not accepted yet' });
        }

        let chat = await ChatSession.findOne({ barterId });
        if (!chat) {
            chat = new ChatSession({
                barterId,
                users: [barter.sender, barter.receiver],
                roomId: barterId  // simple: reuse barterId
            });
            await chat.save();
        }

        res.json({ roomId: chat.roomId });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

export default router;
