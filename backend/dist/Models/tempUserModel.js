"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const userSchema = new mongoose_1.default.Schema({
    username: { type: String },
    email: { type: String },
    password: { type: String },
    createdAt: { type: Date, default: Date.now }, // Date field for TTL
});
// TTL index to automatically expire documents 1 minute after creation
userSchema.index({ createdAt: 1 }, { expireAfterSeconds: 300 });
const TempUser = mongoose_1.default.model("TempUser", userSchema);
exports.default = TempUser;
