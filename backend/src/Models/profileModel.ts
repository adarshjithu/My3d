import mongoose, { mongo } from "mongoose";

const profileSchema = new mongoose.Schema({
    firstname:{type:String},
    lastname:{type:String},
    userId:{type:mongoose.Types.ObjectId,ref:"User"},
    phonenumber:{type:Number},
    image:{type:String,default:""},

},{timestamps:true})

export const Profile = mongoose.model("Profile",profileSchema);