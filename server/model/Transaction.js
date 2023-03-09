import mongoose from "mongoose";

const TransactionSchema = new mongoose.Schema({
    product: { type: String, lowercase: true },
    amount: { type: String },
    currency: { type: String },
    email: { type: String, lowercase: true },
    status: { type: String },
    reference: { type: String },
    message: { type: String },
    transactionId: { type: String },
    channel: { type: String },
    gateway: { type: String },
    fullname: {type: String},
    phone: {type: String}
}, 
{
    timestamps: {type: Boolean, default: true}
});

export default mongoose.model("transaction", TransactionSchema);
