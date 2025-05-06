import { NextFunction, Request, Response } from "express";
import mongoose from "mongoose";

export const errorHandler = (
    err: any,
    req: Request,
    res: Response,
    next: NextFunction
): void => {
    console.error("Error:", err);

    let statusCode = err.status || 500;
    let message = err.message || "Internal Server Error";

   
    if (err instanceof mongoose.Error.ValidationError) {
        statusCode = 400;
        message = Object.values(err.errors)
            .map((error) => `${error.path} is required.`) // ✅ Converts 'Path `name` is required.' → 'name is required.'
            .join(", ");
    }

  
    else if (err instanceof mongoose.Error.CastError) {
        statusCode = 400;
        message = `Invalid ${err.path}: ${err.value}`;
    }


    else if (err.code === 11000) {
        statusCode = 400;
        const field = Object.keys(err.keyValue)[0];
        message = `Duplicate value for '${field}': ${err.keyValue[field]}`;
    }

    res.status(statusCode).json({
        success: false,
        message,
    });
};
