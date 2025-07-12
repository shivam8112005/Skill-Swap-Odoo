import mongoose, { Schema } from 'mongoose';

const parentSessionSchema = new mongoose.Schema({
    finalCount: {
        type: Number,
        default: 0
    },
    sessionIds: {
        type: Schema.Types.ObjectId,
        ref: 'Session',
        default: []
    },
    senderCount: {
        type: Number,
        default: 0
    },
    recieverCount: {
        type: Number,
        default: 0
    },
    senderSkillPost: {
        type: Schema.Types.ObjectId,
        ref: "SkillPost",
        required: true,

    },
    receiverSkillPost: {
        type: Schema.Types.ObjectId,
        ref: "SkillPost",
        required: true
    },
}, { timestamps: true });

export default mongoose.model('ParentSession', parentSessionSchema);
