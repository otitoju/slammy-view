import mongoose from "mongoose";

const ServiceSchema = new mongoose.Schema({
    title: { type: String },
    price: { type: Number },
    content: { type: String },
    image: { type: String },
    currency: { type: String, default: "USD"}
}, 
{
    timestamps: {type: Boolean, default: true}
});

export default mongoose.model("services", ServiceSchema);
