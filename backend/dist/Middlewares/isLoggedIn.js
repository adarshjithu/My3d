"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticate = void 0;
const errors_1 = require("../Constants/errors");
const token_1 = require("../Utils/token");
const authenticate = (req, res, next) => {
    const refreshToken = req.cookies["my3d-refreshToken"];
    const accessToken = req.cookies["my3d-accessToken"];
    if (!refreshToken)
        throw new errors_1.UnauthorizedError("Refresh Token Expired");
    const isRefreshTokenValid = (0, token_1.verifyRefreshToken)(refreshToken);
    if (!isRefreshTokenValid)
        throw new errors_1.UnauthorizedError("Refresh Token Expired");
    if (!accessToken)
        throw new errors_1.UnauthorizedError("Access Token Expired");
    const accessTokenValid = (0, token_1.verifyToken)(accessToken);
    if (!accessToken)
        throw new errors_1.UnauthorizedError("Access Token Expired");
    req.userId = accessTokenValid === null || accessTokenValid === void 0 ? void 0 : accessTokenValid.data;
    next();
};
exports.authenticate = authenticate;
