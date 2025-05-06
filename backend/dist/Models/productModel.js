"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const productSchema = new mongoose_1.default.Schema({
    name: { type: String, required: true },
    description: { type: String },
    category: { type: mongoose_1.default.Types.ObjectId, ref: "Category" },
    baseprice: { type: Number },
    discountprice: { type: Number },
    variants: { type: Array, default: [] },
    images: { type: Array, default: [] },
    stock: { type: Boolean, default: true },
    isHidden: { type: Boolean, default: false },
    sizeguide: { type: String },
    frame: { type: mongoose_1.default.Types.ObjectId, ref: "Frame" },
}, { timestamps: true });
const Product = mongoose_1.default.model("Product", productSchema);
exports.default = Product;
