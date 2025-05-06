import mongoose from "mongoose";
import { IFrame } from "../Interfaces/IFrames";

const frameSchema = new mongoose.Schema<IFrame>({
    frameName:{required:true,type:String},
    shape:{type:String},
    image:{type:String,required:true}
},{timestamps:true})

const Frame = mongoose.model<IFrame>('Frame',frameSchema);

export default Frame