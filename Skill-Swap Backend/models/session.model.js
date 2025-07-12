import mongoose, { Schema } from 'mongoose';

const sessionSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    status:{
        type:Boolean,
        default:false
    },
    senderId: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    receiverId: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    timeStart: {
        type: Date,
        required: true
    }
}, { timestamps: true });

export default mongoose.model('Session', sessionSchema);
