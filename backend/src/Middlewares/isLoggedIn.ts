import { NextFunction, Request, Response } from "express";
import {  UnauthorizedError } from "../Constants/errors";
import { verifyRefreshToken, verifyToken } from "../Utils/token";

export const authenticate = (req: Request, res: Response, next: NextFunction) => {
    const refreshToken = req.cookies["my3d-refreshToken"];
    const accessToken = req.cookies["my3d-accessToken"];
    if (!refreshToken) throw new UnauthorizedError("Refresh Token Expired");
    const isRefreshTokenValid = verifyRefreshToken(refreshToken);
    if (!isRefreshTokenValid) throw new UnauthorizedError("Refresh Token Expired");
    if (!accessToken) throw new UnauthorizedError("Access Token Expired");
    const accessTokenValid = verifyToken(accessToken);
    if (!accessToken) throw new UnauthorizedError("Access Token Expired");
    req.userId = accessTokenValid?.data;

    next();
};
