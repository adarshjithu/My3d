import mongoose from "mongoose";
import { InternalServerError } from "../Constants/errors";

export const connectDatabase = async () => {
    try {
       await  mongoose.connect(`${process.env.MONGODB_CONNECTION_STRING}`);
       console.log("Database connected succesfully")
    } catch (err:any) {
        console.log(err.message);
        
    }
};
