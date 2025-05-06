import mongoose from "mongoose";
import { IBase } from "../Interfaces/IBase";

const baseSchema = new mongoose.Schema <IBase>({
    base:{type:String},

},{timestamps:true})

const Base =  mongoose.model<IBase>("Base",baseSchema);
export default Base;