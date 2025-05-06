"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const statusCodes_1 = require("../Constants/statusCodes");
const errors_1 = require("../Constants/errors");
const token_1 = require("../Utils/token");
const userModel_1 = __importDefault(require("../Models/userModel"));
const { SUCCESS } = statusCodes_1.STATUS_CODES;
class UserController {
    constructor(userService) {
        this.userService = userService;
    }
    // @desc   User login
    // @route  POST /login
    // @access Public
    userLogin(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a, _b;
            try {
                if (!req.body)
                    throw new errors_1.BadRequestError("Invalid Data");
                const response = yield this.userService.userLogin(req.body);
                const accessTokenMaxAge = 5 * 60 * 1000;
                const refreshTokenMaxAge = 48 * 60 * 60 * 1000;
                res === null || res === void 0 ? void 0 : res.status(SUCCESS).cookie("my3d-accessToken", (_a = response === null || response === void 0 ? void 0 : response.tokens) === null || _a === void 0 ? void 0 : _a.accessToken, {
                    maxAge: accessTokenMaxAge,
                    secure: true,
                    httpOnly: true,
                    sameSite: "none",
                    // Prevent JavaScript access to the cookie
                });
                res.cookie("my3d-refreshToken", (_b = response === null || response === void 0 ? void 0 : response.tokens) === null || _b === void 0 ? void 0 : _b.refreshToken, {
                    maxAge: refreshTokenMaxAge,
                    secure: true,
                    httpOnly: true,
                    sameSite: "none",
                    // Prevent JavaScript access to the cookie
                }).json({ success: true, message: "Login successfull", data: response });
            }
            catch (err) {
                next(err);
            }
        });
    }
    // @desc   User registation
    // @route  POST /register
    // @access Public
    userRegister(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (!req.body)
                    throw new errors_1.BadRequestError("Invalid Data");
                const response = yield this.userService.registerUser(req.body);
                res.status(SUCCESS).json(response);
            }
            catch (err) {
                next(err);
            }
        });
    }
    // @desc   User verify registration link
    // @route  POST /register/verify-link
    // @access Private
    verifyLink(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a, _b;
            try {
                const response = yield this.userService.verifyRegistrationLink(req.body.link);
                const accessTokenMaxAge = 5 * 60 * 1000;
                const refreshTokenMaxAge = 48 * 60 * 60 * 1000;
                res === null || res === void 0 ? void 0 : res.status(SUCCESS).cookie("my3d-accessToken", (_a = response === null || response === void 0 ? void 0 : response.tokens) === null || _a === void 0 ? void 0 : _a.accessToken, {
                    maxAge: accessTokenMaxAge,
                    secure: true,
                    httpOnly: true,
                    sameSite: "none",
                    // Prevent JavaScript access to the cookie
                });
                res.cookie("my3d-refreshToken", (_b = response === null || response === void 0 ? void 0 : response.tokens) === null || _b === void 0 ? void 0 : _b.refreshToken, {
                    maxAge: refreshTokenMaxAge,
                    secure: true,
                    httpOnly: true,
                    sameSite: "none",
                    // Prevent JavaScript access to the cookie
                }).json({ success: true, message: "Registration successfull", data: response });
            }
            catch (err) {
                next(err);
            }
        });
    }
    // @desc   Get all products
    // @route  POST /products
    // @access Public
    getAllProducts(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield this.userService.getAllProducts();
                res.status(SUCCESS).json({ success: true, data: response });
            }
            catch (err) {
                next(err);
            }
        });
    }
    // @desc   Profile Updation
    // @route  PUT /profile
    // @access Private
    updateProfile(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield this.userService.updateUserProfile(req.body, req.userId);
                res.status(SUCCESS).json({ success: true, message: "Your changes have been successfully saved", data: response });
            }
            catch (err) {
                next(err);
            }
        });
    }
    // @desc   User logout
    // @route  GET / logout
    // @access Private
    userLogout(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                res.cookie("my3d-refreshToken", "", {
                    maxAge: 0, // Expire immediately
                    httpOnly: true, // Same as set
                    secure: true, // Same as set, especially for production (HTTPS)
                    sameSite: "none", // Same as set
                });
                // Clearing the refresh token cookie
                res.cookie("my3d-accessToken", "", {
                    maxAge: 0, // Expire immediately
                    httpOnly: true, // Same as set
                    secure: true, // Same as set
                    sameSite: "none", // Same as set
                });
                // Responding with a success message
                res.status(200).json({ success: true, message: "User logout successful" });
            }
            catch (err) {
                next(err);
            }
        });
    }
    // @desc   Refresh Access token
    // @route  GET /refresh_token
    // @access Private
    refreshToken(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const refreshToken = req.cookies["my3d-refreshToken"];
                const refreshTokenValid = (0, token_1.verifyRefreshToken)(refreshToken);
                if (!refreshToken || !refreshTokenValid)
                    throw new errors_1.UnauthorizedError("Refresh Token Expired");
                const userId = refreshTokenValid.data;
                const user = yield userModel_1.default.findOne({ _id: userId });
                if (!user) {
                    throw new errors_1.UnauthorizedError("Refresh Token Expired");
                }
                const newAccessToken = (0, token_1.generateAccessToken)(user === null || user === void 0 ? void 0 : user._id);
                const accessTokenMaxAge = 1000 * 60 * 5;
                res.cookie("my3d-accessToken", newAccessToken, {
                    maxAge: accessTokenMaxAge,
                    secure: true,
                    httpOnly: true,
                    sameSite: "none",
                })
                    .status(200)
                    .json({ success: true, accessToken: newAccessToken });
            }
            catch (error) {
                next(error);
            }
        });
    }
    // @desc   User Profile
    // @route  GET /profile
    // @access Public
    getUserProfile(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield this.userService.getUserProfile(req.userId);
                res.status(SUCCESS).json({ success: true, data: response });
            }
            catch (err) {
                next(err);
            }
        });
    }
    // @desc   Update Billing Address
    // @route  PUT /address/billing
    // @access Public
    updateBillingAddress(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield this.userService.updateBillingAddress(req.body, req.userId);
            }
            catch (err) {
                next(err);
            }
        });
    }
    // @desc   Reset password
    // @route  POST /reset_password
    // @access Public
    resetPassword(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield this.userService.resetPassword(req.body, req.userId);
                res.status(SUCCESS).json({ success: true, message: 'Password Updated Successfully' });
            }
            catch (err) {
                next(err);
            }
        });
    }
    // @desc   Forget password
    // @route  POST /forget_password
    // @access Public
    forgetPassword(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.userService.forgetPassword(req.body.email);
                res.status(SUCCESS).json({ success: true, message: "Forget password link successfully send to your email" });
            }
            catch (err) {
                next(err);
            }
        });
    }
    // @desc   Verify forget password link
    // @route  POST /forget_password/verify_link
    // @access Public
    verifyForgetPasswordLink(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (!req.body)
                    throw new errors_1.BadRequestError("Link not found");
                const response = yield this.userService.verifyForgetPasswordLink(req.body.link);
                res.status(SUCCESS).json({ success: true, message: "Link verified", data: response });
            }
            catch (err) {
                next(err);
            }
        });
    }
    // @desc   Reset forget password 
    // @route  POST /forget_password/reset
    // @access Public
    resetForgetPassword(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield this.userService.resetForgetPassword(req.body);
                res === null || res === void 0 ? void 0 : res.status(SUCCESS).json({ success: true, message: 'Password reset successfull', data: response });
            }
            catch (err) {
                next(err);
            }
        });
    }
    // @desc   Get banner 
    // @route  GET /banner
    // @access Public
    getBanner(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield this.userService.getBanner();
                res === null || res === void 0 ? void 0 : res.status(SUCCESS).json({ success: true, message: '', data: response });
            }
            catch (err) {
                next(err);
            }
        });
    }
    // @desc   Get banner 
    // @route  GET /product/category
    // @access Public
    getProductByCategory(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield this.userService.getProductByCategory(req.query.category);
                res === null || res === void 0 ? void 0 : res.status(SUCCESS).json({ success: true, message: '', data: response });
            }
            catch (err) {
                next(err);
            }
        });
    }
    // @desc   Get Category 
    // @route  GET /category
    // @access Public
    getCategory(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield this.userService.getCategory();
                res === null || res === void 0 ? void 0 : res.status(SUCCESS).json({ success: true, message: '', data: response });
            }
            catch (err) {
                next(err);
            }
        });
    }
    // @desc   Get Product by id 
    // @route  GET /product
    // @access Public
    getProductById(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield this.userService.getProduct(req.query.productId);
                res === null || res === void 0 ? void 0 : res.status(SUCCESS).json({ success: true, message: '', data: response });
            }
            catch (err) {
                next(err);
            }
        });
    }
    // @desc   Get Product by id 
    // @route  GET /product/suggession
    // @access Public
    findProductsByRelatedProductId(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield this.userService.findProductsByRelatedProductId(req.query.productId);
                res === null || res === void 0 ? void 0 : res.status(SUCCESS).json({ success: true, message: '', data: response });
            }
            catch (err) {
                next(err);
            }
        });
    }
    // @desc   Get shapes of specific category
    // @route  GET /product/shapes
    // @access Public
    getShapes(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield this.userService.getShapes(req.query.category);
                res === null || res === void 0 ? void 0 : res.status(SUCCESS).json({ success: true, message: '', data: response });
            }
            catch (err) {
                next(err);
            }
        });
    }
    // @desc   Get product by shapes
    // @route  GET /product/shapes/suggesion
    // @access Public
    getProductByShape(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield this.userService.getProductByShape(req.query);
                res === null || res === void 0 ? void 0 : res.status(SUCCESS).json({ success: true, message: '', data: response });
            }
            catch (err) {
                next(err);
            }
        });
    }
    // @desc   Get product by shapes
    // @route  GET /product/shapes/suggesion
    // @access Public
    personalize(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield this.userService.getProductByShape(req.query);
                res === null || res === void 0 ? void 0 : res.status(SUCCESS).json({ success: true, message: '', data: response });
            }
            catch (err) {
                next(err);
            }
        });
    }
    // @desc   Get product by base
    // @route  GET /product/base
    // @access Public
    getBase(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield this.userService.getBase(req.query.size);
                res === null || res === void 0 ? void 0 : res.status(SUCCESS).json({ success: true, message: '', data: response });
            }
            catch (err) {
                next(err);
            }
        });
    }
}
exports.UserController = UserController;
