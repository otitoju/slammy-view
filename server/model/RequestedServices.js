import mongoose from "mongoose";

const RequestedServiceSchema = new mongoose.Schema({
    fname: { type: String },
    lname: { type: String },
    qty: { type: Number },
    phone: { type: String },
    email: { type: String },
    price: { type: Number },
    service: { type: String },
    url: { type: String },
    instruction: { type: String },
    image: { type: String },
    currency: { type: String, default: "USD"},
    status: { type: String, default: "sent" },
    delivery: { type: String, default: "free"},
    location: { type: String },
    filePath: { type: String },
}, 
{
    timestamps: {type: Boolean, default: true}
});

export default mongoose.model("requestedservices", RequestedServiceSchema);
