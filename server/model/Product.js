import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema({
    productName: { type: String },
    image: { type: String },
    description: { type: String },
    actualPrice: { type: Number, default: 0 },
    discountPrice: { type: Number, default: 0 },
    currency: { type: String, default: "USD"},
    downloadLink: { type: String },
    downloadLink1: { type: String },
    downloadLink2: { type: String },
    downloadLink3: { type: String },
}, 
{
    timestamps: {type: Boolean, default: true}
});

export default mongoose.model("products", ProductSchema);
