import mongoose from 'mongoose';
const barterRequestSchema=new mongoose.Schema({
sender:{
    type:mongoose.Schema.Types.ObjectId,
    ref:'User',
    required:true,
},
receiver:{
    type:mongoose.Schema.Types.ObjectId,
    ref:'User',
    required:true,
},
senderSkillPost:{type:mongoose.Schema.Types.ObjectId, ref:'SkillPost', required:true},
receiverSkillPost:{type:mongoose.Schema.Types.ObjectId, ref:'SkillPost', required:true},
status:{
    type: String,
    enum:['pending', 'accepted', 'rejected'],
    default: 'pending'
},
createdAt:{
    type:Date,
    default:Date.now
}
});
export default mongoose.model('BarterRequest',barterRequestSchema);
