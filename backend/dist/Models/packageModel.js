"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const packageSchema = new mongoose_1.default.Schema({
    name: { type: String },
    description: { type: String },
    price: { type: Number },
    categories: [{ type: mongoose_1.default.Types.ObjectId, ref: "Category" }],
    image: { type: String },
}, { timestamps: true });
const Package = mongoose_1.default.model("Package", packageSchema);
exports.default = Package;
