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
exports.comparePassword = exports.hashPassword = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const errors_1 = require("../Constants/errors");
// Function to hash a password
const hashPassword = (password) => __awaiter(void 0, void 0, void 0, function* () {
    const saltRounds = 10; // Number of salt rounds
    try {
        const hashedPassword = yield bcrypt_1.default.hash(password, saltRounds);
        return hashedPassword;
    }
    catch (error) {
        console.log("Error while password encryption", error);
        throw new errors_1.BadRequestError("Something went wrong");
    }
});
exports.hashPassword = hashPassword;
const comparePassword = (normalPassword, encryptedPassword) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return yield bcrypt_1.default.compare(normalPassword, encryptedPassword);
    }
    catch (error) {
        console.log('error while password comparison');
        throw new errors_1.BadRequestError("Something went wrong");
    }
});
exports.comparePassword = comparePassword;
