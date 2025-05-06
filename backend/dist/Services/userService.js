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
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const errors_1 = require("../Constants/errors");
const mailer_1 = require("../Utils/mailer");
const password_1 = require("../Utils/password");
const token_1 = require("../Utils/token");
class UserService {
    constructor(userRepository) {
        this.userRepository = userRepository;
    }
    getAllProducts() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield this.userRepository.findAllProducts();
            }
            catch (err) {
                throw err;
            }
        });
    }
    registerUser(userData) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // Check email exist
                const user = yield this.userRepository.findUserByEmail(userData === null || userData === void 0 ? void 0 : userData.email);
                if (user)
                    throw new errors_1.BadRequestError("User already exists");
                // Check username exists
                const usernameExists = yield this.userRepository.findUserByUsername(userData === null || userData === void 0 ? void 0 : userData.username);
                if (usernameExists)
                    throw new errors_1.BadRequestError("Username already taken try another one");
                // Encrypt password
                const password = yield (0, password_1.hashPassword)(userData === null || userData === void 0 ? void 0 : userData.password);
                const newUser = Object.assign(Object.assign({}, userData), { password });
                const isTempUserExists = yield this.userRepository.findTempUser(userData);
                if (isTempUserExists)
                    throw new errors_1.BadRequestError("Link already send");
                const newUserData = yield this.userRepository.createNewTempUser(newUser);
                const accessToken = (0, token_1.generateAccessToken)(newUserData === null || newUserData === void 0 ? void 0 : newUserData._id);
                const link = `${process.env.FRONTEND_URL}/login/${accessToken}`;
                const message = `
            Subject: Complete Your Registration on My 3D Pic ✨
            
            Hi ${userData === null || userData === void 0 ? void 0 : userData.username},
            
            To complete your registration and start creating your unique crystal shapes, click the link below:
            
            ${link}
            
            This link is valid for the next 5 minutes. If you didn’t request this, feel free to ignore this email.
            
            Best regards,  
            The My 3D Pic Team
            `;
                yield (0, mailer_1.sendLinkToEmail)(newUserData === null || newUserData === void 0 ? void 0 : newUserData.email, link, message);
                return { success: true, message: "The user registration link has been send to your email." };
            }
            catch (err) {
                throw err;
            }
        });
    }
    verifyRegistrationLink(link) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const isLinkValid = (0, token_1.verifyToken)(link);
                console.log(isLinkValid);
                if (!isLinkValid)
                    throw new errors_1.BadRequestError("Registration link expired");
                const userId = isLinkValid === null || isLinkValid === void 0 ? void 0 : isLinkValid.data;
                const tempUser = yield this.userRepository.getTempUserById(userId);
                console.log(tempUser);
                if (!tempUser)
                    throw new errors_1.BadRequestError("Something went wrong");
                const user = {
                    username: tempUser === null || tempUser === void 0 ? void 0 : tempUser.username,
                    email: tempUser === null || tempUser === void 0 ? void 0 : tempUser.email,
                    password: tempUser === null || tempUser === void 0 ? void 0 : tempUser.password,
                };
                const newUser = yield this.userRepository.createUser(user);
                const accessToken = (0, token_1.generateAccessToken)(newUser === null || newUser === void 0 ? void 0 : newUser._id);
                const refreshToken = (0, token_1.generateRefreshToken)(newUser === null || newUser === void 0 ? void 0 : newUser._id);
                const userDataWithouPassword = JSON.parse(JSON.stringify(newUser));
                delete userDataWithouPassword["password"];
                return { tokens: { accessToken, refreshToken }, user: userDataWithouPassword };
            }
            catch (err) {
                throw err;
            }
        });
    }
    userLogin(userData) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield this.userRepository.findUserByEmailOrUsername(userData);
                if (!user)
                    throw new errors_1.BadRequestError("Invalid Username or Password");
                const isPasswordValid = yield (0, password_1.comparePassword)(userData === null || userData === void 0 ? void 0 : userData.password, user === null || user === void 0 ? void 0 : user.password);
                if (!isPasswordValid)
                    throw new errors_1.BadRequestError("Please Enter a Valid Password");
                const accessToken = (0, token_1.generateAccessToken)(user === null || user === void 0 ? void 0 : user._id);
                const refreshToken = (0, token_1.generateRefreshToken)(user === null || user === void 0 ? void 0 : user._id);
                const userWithoutPassword = JSON.parse(JSON.stringify(user));
                delete userWithoutPassword["password"];
                return { tokens: { accessToken, refreshToken }, user: userWithoutPassword };
            }
            catch (err) {
                throw err;
            }
        });
    }
    updateUserProfile(profileData, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield this.userRepository.upsertProfile(profileData, userId);
            }
            catch (err) {
                throw err;
            }
        });
    }
    getUserProfile(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield this.userRepository.findProfileByUserId(userId);
            }
            catch (err) {
                throw err;
            }
        });
    }
    updateBillingAddress(addressData, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield this.userRepository.updateBillingAddressByUserId(addressData, userId);
            }
            catch (err) {
                throw err;
            }
        });
    }
    resetPassword(userData, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield this.userRepository.findUserById(userId);
                if (!user)
                    throw new errors_1.BadRequestError("Invalid User");
                const isValid = yield (0, password_1.comparePassword)(userData === null || userData === void 0 ? void 0 : userData.oldpassword, user === null || user === void 0 ? void 0 : user.password);
                if (!isValid)
                    throw new errors_1.BadRequestError("The current password you enterd in incorrect");
                const isSameAsOld = yield (0, password_1.comparePassword)(userData === null || userData === void 0 ? void 0 : userData.newpassword, user === null || user === void 0 ? void 0 : user.password);
                if (isSameAsOld)
                    throw new errors_1.BadRequestError("New password cannot be the same as old password");
                const newHashedPassword = yield (0, password_1.hashPassword)(userData === null || userData === void 0 ? void 0 : userData.newpassword);
                return this.userRepository.updateHashedPassword(newHashedPassword, userId);
            }
            catch (err) {
                throw err;
            }
        });
    }
    forgetPassword(email) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield this.userRepository.findUserByEmail(email);
                if (!user)
                    throw new errors_1.BadRequestError("User not found with this email");
                const encryptedLink = (0, token_1.generateAccessToken)(user === null || user === void 0 ? void 0 : user._id);
                const link = `${process.env.FRONTEND_URL}/forget_password/${encryptedLink}`;
                const message = `
    Subject: Reset Your Password on My 3D Pic ✨

    Hi ${user === null || user === void 0 ? void 0 : user.username},

    We received a request to reset your password for your My 3D Pic account. If you didn’t request this, feel free to ignore this email.

    To reset your password, click the link below:

    ${link}

    This link is valid for the next 5 minutes. If the link has expired or doesn’t work, you can request a new one.

    Best regards,  
    The My 3D Pic Team
`;
                yield (0, mailer_1.sendLinkToEmail)(user === null || user === void 0 ? void 0 : user.email, link, message);
                return { success: true };
            }
            catch (err) {
                throw err;
            }
        });
    }
    verifyForgetPasswordLink(link) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const isLinkValid = (0, token_1.verifyToken)(link);
                if (!isLinkValid)
                    throw new errors_1.BadRequestError("Link Expired");
                const user = yield this.userRepository.findUserById(isLinkValid.data);
                if (!user)
                    throw new errors_1.BadRequestError("Invalid user data");
                return { userId: user === null || user === void 0 ? void 0 : user._id };
            }
            catch (err) {
                throw err;
            }
        });
    }
    resetForgetPassword(data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield this.userRepository.findUserById(data === null || data === void 0 ? void 0 : data.userId);
                if (!user)
                    throw new errors_1.BadRequestError("Invalid User Data");
                const isSameAsOld = yield (0, password_1.comparePassword)(data === null || data === void 0 ? void 0 : data.password, user === null || user === void 0 ? void 0 : user.password);
                if (isSameAsOld)
                    throw new errors_1.BadRequestError("New password cannot be the same as old password");
                const newHashedPassword = yield (0, password_1.hashPassword)(data === null || data === void 0 ? void 0 : data.password);
                return yield this.userRepository.updateHashedPassword(newHashedPassword, data === null || data === void 0 ? void 0 : data.userId);
            }
            catch (err) {
                throw err;
            }
        });
    }
    getBanner() {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            try {
                return yield ((_a = this === null || this === void 0 ? void 0 : this.userRepository) === null || _a === void 0 ? void 0 : _a.getBanner());
            }
            catch (err) {
                throw err;
            }
        });
    }
    getProductByCategory(category) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield this.userRepository.findProductByCategory(category);
            }
            catch (err) {
                throw err;
            }
        });
    }
    getCategory() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield this.userRepository.getCategories();
            }
            catch (err) {
                throw err;
            }
        });
    }
    getProduct(productId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield this.userRepository.getProductById(productId);
            }
            catch (err) {
                throw err;
            }
        });
    }
    findProductsByRelatedProductId(productId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield this.userRepository.findProductsByRelatedProductId(productId);
            }
            catch (err) {
                throw err;
            }
        });
    }
    getShapes(category) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield this.userRepository.getShapesByCateogory(category);
            }
            catch (err) {
                throw err;
            }
        });
    }
    getProductByShape(query) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield this.userRepository.getProductByShape(query);
            }
            catch (err) {
                throw err;
            }
        });
    }
    getBase(size) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield this.userRepository.getBase(size);
            }
            catch (err) {
                throw err;
            }
        });
    }
}
exports.UserService = UserService;
