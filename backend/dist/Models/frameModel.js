"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const frameSchema = new mongoose_1.default.Schema({
    frameName: { required: true, type: String },
    shape: { type: String },
    image: { type: String, required: true }
}, { timestamps: true });
const Frame = mongoose_1.default.model('Frame', frameSchema);
exports.default = Frame;
