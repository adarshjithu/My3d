"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Profile = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const profileSchema = new mongoose_1.default.Schema({
    firstname: { type: String },
    lastname: { type: String },
    userId: { type: mongoose_1.default.Types.ObjectId, ref: "User" },
    phonenumber: { type: Number },
    image: { type: String, default: "" },
}, { timestamps: true });
exports.Profile = mongoose_1.default.model("Profile", profileSchema);
