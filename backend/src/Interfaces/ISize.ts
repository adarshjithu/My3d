import {Document} from 'mongoose'

export interface ISize extends Document{
    _id:any;
    size:string;
    createdAt:Date;
    updatedAt:Date
}