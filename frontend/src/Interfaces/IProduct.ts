import { IFrame } from "./IFrame";

export interface IProduct {
    name: string;
    description: string;
    baseprice: any;
    discountprice: any;
    images: any;
    variants: any;
    createdAt?: Date;
    updatedAt?: Date;
    stock: boolean;
     sizequide:any
    category: string;
    frame:IFrame
    _id?:any
}
