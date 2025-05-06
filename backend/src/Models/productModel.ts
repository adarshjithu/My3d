import mongoose from "mongoose";
import { IProduct } from "../Interfaces/IProductModel";

const productSchema = new mongoose.Schema<IProduct>(
    {
        name: { type: String, required: true },
        description: { type: String },
        category: { type: mongoose.Types.ObjectId, ref: "Category" },
        baseprice: { type: Number },
        discountprice: { type: Number },
        variants: { type: Array, default: [] },
        images: { type: Array, default: [] },
        stock: { type: Boolean, default: true },
        isHidden: { type: Boolean, default: false },
        sizeguide: { type: String },
        frame: { type: mongoose.Types.ObjectId, ref: "Frame" },
    },
    { timestamps: true }
);

const Product = mongoose.model<IProduct>("Product", productSchema);

export default Product;
