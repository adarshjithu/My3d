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
exports.UserRepository = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const bannerModal_1 = __importDefault(require("../Models/bannerModal"));
const BillingAddressModal_1 = require("../Models/BillingAddressModal");
const categoryModel_1 = __importDefault(require("../Models/categoryModel"));
const productModel_1 = __importDefault(require("../Models/productModel"));
const profileModel_1 = require("../Models/profileModel");
const tempUserModel_1 = __importDefault(require("../Models/tempUserModel"));
const userModel_1 = __importDefault(require("../Models/userModel"));
const BaseRepository_1 = require("./BaseRepository");
class UserRepository extends BaseRepository_1.BaseRepository {
    constructor() {
        super(userModel_1.default);
    }
    findAllProducts() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield productModel_1.default.aggregate([
                    {
                        $lookup: {
                            from: "categories",
                            localField: "category",
                            foreignField: "_id",
                            as: "category_info",
                        },
                    },
                    {
                        $unwind: "$category_info",
                    },
                    {
                        $group: {
                            _id: "$category_info.name",
                            products: { $push: "$$ROOT" },
                        },
                    },
                    {
                        $project: {
                            category: "$_id",
                            products: 1, //
                            _id: 0,
                        },
                    },
                ]);
                return [
                    {
                        name: "3d Crystal Diamond",
                        category: "crystal",
                        price: "175 AED",
                        image: "https://crystalcorp.com/my3dpic/wp-content/uploads/2023/09/02-D.jpg",
                    },
                    {
                        name: "3d Crystal Heart",
                        category: "crystal",
                        image: "https://crystalcorp.com/my3dpic/wp-content/uploads/2023/09/02-D.jpg",
                        price: "325 AED",
                    },
                    {
                        name: "3d Crystal Rectangle Lovely",
                        image: "https://crystalcorp.com/my3dpic/wp-content/uploads/2023/09/02-D.jpg",
                        category: "crystal",
                        price: "250 AED",
                    },
                    {
                        name: "3d Crystal  Rectangle  ",
                        category: "crystal",
                        image: "https://crystalcorp.com/my3dpic/wp-content/uploads/2023/09/02-D.jpg",
                        price: "225 AED",
                    },
                    {
                        name: "3d Crystal Square",
                        category: "crystal",
                        image: "https://crystalcorp.com/my3dpic/wp-content/uploads/2023/09/02-D.jpg",
                        price: "175 AED",
                    },
                    {
                        name: "3d Keychain with Light",
                        category: "key chain",
                        price: "75 AED",
                        image: "https://crystalcorp.com/my3dpic/wp-content/uploads/2023/09/02-D.jpg",
                    },
                    {
                        name: "3d Keychain Square with Light",
                        category: "key chain",
                        price: "90 AED",
                        image: "https://crystalcorp.com/my3dpic/wp-content/uploads/2023/09/02-D.jpg",
                    },
                    {
                        name: "3d Keychain Heart with Light",
                        category: "key chain",
                        price: "90 AED",
                        image: "https://crystalcorp.com/my3dpic/wp-content/uploads/2023/09/02-D.jpg",
                    },
                    {
                        name: "3d Keychain Rectangle with Light",
                        category: "key chain",
                        price: "90 AED",
                        image: "https://crystalcorp.com/my3dpic/wp-content/uploads/2023/09/02-D.jpg",
                    },
                    {
                        name: "3d Necklace Heart",
                        category: "necklace",
                        price: "90 AED",
                        image: "https://crystalcorp.com/my3dpic/wp-content/uploads/2023/09/02-D.jpg",
                    },
                    {
                        name: "3d Necklace Rectangle",
                        category: "necklace",
                        image: "https://crystalcorp.com/my3dpic/wp-content/uploads/2023/09/02-D.jpg",
                        price: "90 AED",
                    },
                    {
                        name: "Rectangle Wooden Base Dark Brown",
                        category: "base",
                        image: "https://crystalcorp.com/my3dpic/wp-content/uploads/2023/09/02-D.jpg",
                        price: "75 AED",
                    },
                    {
                        name: "Square Wooden Base Dark Brown",
                        category: "base",
                        image: "https://crystalcorp.com/my3dpic/wp-content/uploads/2023/09/02-D.jpg",
                        price: "50 AED",
                    },
                ];
            }
            catch (err) {
                throw err;
            }
        });
    }
    findUserByEmail(email) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield userModel_1.default.findOne({ email: email });
            }
            catch (err) {
                throw err;
            }
        });
    }
    findUserByUsername(username) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield userModel_1.default.findOne({ username: username });
            }
            catch (err) {
                throw err;
            }
        });
    }
    createUser(userData) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const newUser = new userModel_1.default(userData);
                yield newUser.save();
                return newUser;
            }
            catch (err) {
                throw err;
            }
        });
    }
    createNewTempUser(userData) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const tempUserExist = yield tempUserModel_1.default.findOne(userData);
                if (!tempUserExist) {
                    const newUser = new tempUserModel_1.default(userData);
                    yield newUser.save();
                    return newUser;
                }
                else {
                    return tempUserExist;
                }
            }
            catch (err) {
                throw err;
            }
        });
    }
    getTempUserById(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield tempUserModel_1.default.findOne({ _id: userId });
            }
            catch (err) {
                throw err;
            }
        });
    }
    findTempUser(userData) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield tempUserModel_1.default.findOne({ $or: [{ username: userData === null || userData === void 0 ? void 0 : userData.username, email: userData === null || userData === void 0 ? void 0 : userData.email }] });
            }
            catch (err) {
                throw err;
            }
        });
    }
    findUserByEmailOrUsername(userData) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield userModel_1.default.findOne({ $or: [{ username: userData === null || userData === void 0 ? void 0 : userData.email }, { email: userData === null || userData === void 0 ? void 0 : userData.email }] });
            }
            catch (err) {
                throw err;
            }
        });
    }
    upsertProfile(profileData, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const profile = yield profileModel_1.Profile.findOne({ userId: userId });
                if (profile) {
                    yield profileModel_1.Profile.updateOne({ userId: userId }, { $set: profileData });
                }
                else {
                    yield profileModel_1.Profile.insertOne(Object.assign(Object.assign({}, profileData), { userId: userId }));
                }
                return profileData;
            }
            catch (err) {
                throw err;
            }
        });
    }
    findProfileByUserId(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield profileModel_1.Profile.findOne({ userId: userId });
            }
            catch (err) {
                throw err;
            }
        });
    }
    updateBillingAddressByUserId(addressData, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                console.log(addressData);
                addressData.userId = userId;
                const newBillingAddress = new BillingAddressModal_1.BillingAddress(addressData);
                yield newBillingAddress.save();
                return BillingAddressModal_1.BillingAddress;
            }
            catch (err) {
                throw err;
            }
        });
    }
    findUserById(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield userModel_1.default.findOne({ _id: userId });
            }
            catch (err) {
                throw err;
            }
        });
    }
    updateHashedPassword(password, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield userModel_1.default.updateOne({ _id: userId }, { $set: { password: password } });
            }
            catch (err) {
                throw err;
            }
        });
    }
    getBanner() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield bannerModal_1.default.findOne();
            }
            catch (err) {
                throw err;
            }
        });
    }
    findProductByCategory(category) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const categoryData = yield categoryModel_1.default.findOne({ name: category });
                return yield productModel_1.default.find({ category: new mongoose_1.default.Types.ObjectId(categoryData === null || categoryData === void 0 ? void 0 : categoryData._id) });
            }
            catch (err) {
                throw err;
            }
        });
    }
    getCategories() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield categoryModel_1.default.find({});
            }
            catch (err) {
                throw err;
            }
        });
    }
    getProductById(productId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield productModel_1.default.findOne({ _id: productId }).populate("category").populate("frame");
            }
            catch (err) {
                throw err;
            }
        });
    }
    findProductsByRelatedProductId(productId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const product = yield (productModel_1.default === null || productModel_1.default === void 0 ? void 0 : productModel_1.default.findOne({ _id: productId }));
                const category = product === null || product === void 0 ? void 0 : product.category;
                const relatedProducts = yield (productModel_1.default === null || productModel_1.default === void 0 ? void 0 : productModel_1.default.find({
                    $and: [{ category: new mongoose_1.default.Types.ObjectId(category) }, { _id: { $not: { $eq: new mongoose_1.default.Types.ObjectId(productId) } } }],
                }));
                return relatedProducts;
            }
            catch (err) {
                throw err;
            }
        });
    }
    getShapesByCateogory(category) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const products = yield productModel_1.default.aggregate([
                    { $match: { category: new mongoose_1.default.Types.ObjectId(category) } },
                    {
                        $lookup: {
                            from: "frames",
                            localField: "frame",
                            foreignField: "_id",
                            as: "frameData",
                        },
                    },
                    { $unwind: "$frameData" },
                    {
                        $project: {
                            frameData: 1,
                        },
                    },
                    { $project: { shape: "$frameData.shape" } },
                    { $group: { _id: null, shape: { $addToSet: "$shape" } } },
                ]);
                return products;
            }
            catch (err) {
                throw err;
            }
        });
    }
    getProductByShape(query) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const res = yield productModel_1.default.aggregate([
                    { $match: { category: new mongoose_1.default.Types.ObjectId(query === null || query === void 0 ? void 0 : query.category) } },
                    {
                        $lookup: {
                            from: "frames",
                            localField: "frame",
                            foreignField: "_id",
                            as: "frameData",
                        },
                    },
                    {
                        $unwind: "$frameData",
                    },
                    {
                        $match: {
                            "frameData.frameName": query.shape,
                        },
                    },
                    { $limit: 1 },
                ]);
                return res;
            }
            catch (err) {
                throw err;
            }
        });
    }
    getBase(size) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                console.log(size);
                const category = yield categoryModel_1.default.findOne({ name: "Base" });
                const res = yield productModel_1.default.aggregate([{ $match: { category: new mongoose_1.default.Types.ObjectId(category === null || category === void 0 ? void 0 : category._id) } }, { $match: { variants: { $elemMatch: { size: size } } } }]);
                // console.log(res)
                //  console.log(res)
                return res;
            }
            catch (err) {
                throw err;
            }
        });
    }
}
exports.UserRepository = UserRepository;
