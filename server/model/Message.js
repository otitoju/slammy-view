import mongoose from "mongoose";

const MessageSchema = new mongoose.Schema({
    sender: { type: String },
    email: { type: String },
    phone: { type: String },
    message: { type: String },
}, 
{
    timestamps: {type: Boolean, default: true}
});

export default mongoose.model("messages", MessageSchema);
