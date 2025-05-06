"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const sizeSchema = new mongoose_1.default.Schema({
    size: { type: String },
}, { timestamps: true });
const Size = mongoose_1.default.model("Size", sizeSchema);
exports.default = Size;
