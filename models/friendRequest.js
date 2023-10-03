import mongoose,{Schema} from "mongoose";

const friendRequestSchema = new mongoose.Schema({
    requestTo: { type:Schema.Types.ObjectId,ref:"Users"},
    requestFrom: { type:Schema.Types.ObjectId,ref:"Users"},
    requestStatus: { type:String,default:pending},
    },
 {timestamps:true}
);

const FriendRequest = mongoose.model("FriendRequest",friendRequestSchema);

export default FriendRequest;