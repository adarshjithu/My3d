import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username: { type: String },
    email: { type: String },
    password: { type: String },
    createdAt: { type: Date, default: Date.now }, // Date field for TTL
});

// TTL index to automatically expire documents 1 minute after creation
userSchema.index({ createdAt: 1 }, { expireAfterSeconds: 300 });

const TempUser = mongoose.model("TempUser", userSchema);
export default TempUser;
