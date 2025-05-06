import { Document } from "mongoose";

export interface IProduct extends Document {
    name: string;
    description: string;
    baseprice: any;
    discountprice: any;
    stock:boolean;
    images: any;
    variants: any;
    createdAt: Date;
    updatedAt: Date;
    isHidden: boolean;
    category: any;
    sizeguide?:string;
    frame?:string;
   
}
