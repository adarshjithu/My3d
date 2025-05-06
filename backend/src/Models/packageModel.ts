import mongoose, { mongo } from "mongoose";

const packageSchema = new mongoose.Schema({
    name: { type: String },
    description: { type: String },
    price: { type: Number },
    categories: [{ type: mongoose.Types.ObjectId, ref: "Category" }],
    image: { type: String },
},{timestamps:true});

const Package = mongoose.model("Package", packageSchema);

export default Package;
