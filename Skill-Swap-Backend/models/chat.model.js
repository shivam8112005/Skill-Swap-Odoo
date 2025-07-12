import mongoose, { Schema } from 'mongoose';

const chatSchema= new mongoose.Schema({
    message:{
        type:String
    },
    senderId:{
        type:Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    receiverId:{
        type:Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    sessionCreated: {
        type: Boolean,
        default: false
    },
    sessionId: {
        type: Schema.Types.ObjectId,

    },
    image:{
        type:String,
    }
}, { timestamps: true });

export default mongoose.model('Chat', chatSchema);
