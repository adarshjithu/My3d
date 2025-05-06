import { Document } from "mongoose";

export interface IFrame extends Document{
    _id:any;
    shape:string;
    frameName:string;
    image:string;
    createdAt?:Date;
    updatedAt?:Date;
}