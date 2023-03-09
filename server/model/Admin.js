import mongoose from "mongoose";

const AdminSchema = new mongoose.Schema({
    username: { type: String, lowercase: true },
    image: { type: String },
    password: { type: String },
    email: { type: String, lowercase: true }
});

export default mongoose.model("admins", AdminSchema);
