"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const baseSchema = new mongoose_1.default.Schema({
    base: { type: String },
}, { timestamps: true });
const Base = mongoose_1.default.model("Base", baseSchema);
exports.default = Base;
