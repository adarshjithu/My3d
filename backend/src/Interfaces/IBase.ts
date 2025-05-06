import {Document} from 'mongoose'

export interface IBase extends Document{
    _id:any;
    base:string;
    createdAt:Date;
    updatedAt:Date
}