import mongoose from "mongoose";

const posterSchema = new mongoose.Schema({
    image: { type: String, required: true },
    title: { type: String },
    subtitle: { type: String },
    description: { type: String },
    isActive: { type: Boolean, default: true },
    date: { type: Number, required: true }
})

const posterModel = mongoose.models.poster || mongoose.model("poster", posterSchema);

export default posterModel;
