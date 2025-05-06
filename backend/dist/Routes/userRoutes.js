"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userController_1 = require("../Controllers/userController");
const userRepository_1 = require("../Repositories/userRepository");
const userService_1 = require("../Services/userService");
const isLoggedIn_1 = require("../Middlewares/isLoggedIn");
const userRouter = (0, express_1.default)();
const userRepository = new userRepository_1.UserRepository();
const userService = new userService_1.UserService(userRepository);
const controller = new userController_1.UserController(userService);
// Authentication
userRouter.post('/login', (req, res, next) => controller.userLogin(req, res, next));
userRouter.post('/register', (req, res, next) => controller.userRegister(req, res, next));
userRouter.post('/register/verify-link', (req, res, next) => controller.verifyLink(req, res, next));
userRouter.get("/logout", (req, res, next) => controller.userLogout(req, res, next));
userRouter.post('/refresh_token', (req, res, next) => controller.refreshToken(req, res, next));
userRouter.post('/reset_password', isLoggedIn_1.authenticate, (req, res, next) => controller.resetPassword(req, res, next));
userRouter.post('/forget_password', (req, res, next) => controller.forgetPassword(req, res, next));
userRouter.post('/forget_password/verify_link', (req, res, next) => controller.verifyForgetPasswordLink(req, res, next));
userRouter.post('/forget_password/reset', (req, res, next) => controller.resetForgetPassword(req, res, next));
userRouter.get('/products', (req, res, next) => controller.getAllProducts(req, res, next));
userRouter.get("/product/category", (req, res, next) => controller.getProductByCategory(req, res, next));
userRouter.get("/product", (req, res, next) => controller.getProductById(req, res, next));
userRouter.get("/product/suggession", (req, res, next) => controller.findProductsByRelatedProductId(req, res, next));
userRouter.get("/product/shapes", (req, res, next) => controller.getShapes(req, res, next));
userRouter.get('/product/shape/suggesion', (req, res, next) => controller.getProductByShape(req, res, next));
// Profile
userRouter.put('/profile', isLoggedIn_1.authenticate, (req, res, next) => controller.updateProfile(req, res, next));
userRouter.get('/profile', isLoggedIn_1.authenticate, (req, res, next) => controller.getUserProfile(req, res, next));
//Address
userRouter.put('/address/billing', isLoggedIn_1.authenticate, (req, res, next) => controller.updateBillingAddress(req, res, next));
// Banners
userRouter.get("/banner", (req, res, next) => controller.getBanner(req, res, next));
//Cateogry
userRouter.get("/category", (req, res, next) => controller.getCategory(req, res, next));
// Personalize
userRouter.get('/product/personlize', (req, res, next) => controller.personalize(req, res, next));
userRouter.get('/product/base', (req, res, next) => controller.getBase(req, res, next));
exports.default = userRouter;
