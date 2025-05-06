import mongoose from "mongoose";
import { IAddress } from "../Interfaces/IAddress";
import { IProduct } from "../Interfaces/IProductModel";
import { IProfile } from "../Interfaces/IProfile";
import { IUser } from "../Interfaces/IUser";
import Banner from "../Models/bannerModal";
import { BillingAddress } from "../Models/BillingAddressModal";
import Category from "../Models/categoryModel";
import Product from "../Models/productModel";
import { Profile } from "../Models/profileModel";
import TempUser from "../Models/tempUserModel";
import User from "../Models/userModel";
import { ICategory } from "../Interfaces/ICategory";
import { BaseRepository } from "./BaseRepository";

export class UserRepository extends BaseRepository {
    constructor() {
        super(User)
    }

    async findAllProducts() {
        try {
            return await Product.aggregate([
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
        } catch (err) {
            throw err;
        }
    }

    async findUserByEmail(email: string): Promise<IUser | null> {
        try {
            return await User.findOne({ email: email });
        } catch (err) {
            throw err;
        }
    }
    async findUserByUsername(username: string): Promise<IUser | null> {
        try {
            return await User.findOne({ username: username });
        } catch (err) {
            throw err;
        }
    }
    async createUser(userData: IUser): Promise<Record<string, any> | null> {
        try {
            const newUser = new User(userData);
            await newUser.save();
            return newUser;
        } catch (err) {
            throw err;
        }
    }
    async createNewTempUser(userData: IUser): Promise<any> {
        try {
            const tempUserExist = await TempUser.findOne(userData);
            if (!tempUserExist) {
                const newUser = new TempUser(userData);
                await newUser.save();
                return newUser;
            } else {
                return tempUserExist;
            }
        } catch (err) {
            throw err;
        }
    }

    async getTempUserById(userId: string): Promise<Record<string, any> | null> {
        try {
            return await TempUser.findOne({ _id: userId });
        } catch (err) {
            throw err;
        }
    }
    async findTempUser(userData: IUser): Promise<Record<string, any> | null> {
        try {
            return await TempUser.findOne({ $or: [{ username: userData?.username, email: userData?.email }] });
        } catch (err) {
            throw err;
        }
    }
    async findUserByEmailOrUsername(userData: IUser): Promise<any> {
        try {
            return await User.findOne({ $or: [{ username: userData?.email }, { email: userData?.email }] });
        } catch (err) {
            throw err;
        }
    }
    async upsertProfile(profileData: IProfile, userId: string): Promise<IProfile | null> {
        try {
            const profile = await Profile.findOne({ userId: userId });
            if (profile) {
                await Profile.updateOne({ userId: userId }, { $set: profileData });
            } else {
                await Profile.insertOne({ ...profileData, userId: userId });
            }
            return profileData;
        } catch (err) {
            throw err;
        }
    }
    async findProfileByUserId(userId: string): Promise<IProfile | null> {
        try {
            return await Profile.findOne({ userId: userId });
        } catch (err) {
            throw err;
        }
    }
    async updateBillingAddressByUserId(addressData: IAddress, userId: string): Promise<IAddress | null> {
        try {
            console.log(addressData);
            addressData.userId = userId;
            const newBillingAddress = new BillingAddress(addressData);
            await newBillingAddress.save();
            return BillingAddress;
        } catch (err) {
            throw err;
        }
    }
    async findUserById(userId: string): Promise<IUser | null> {
        try {
            return await User.findOne({ _id: userId });
        } catch (err) {
            throw err;
        }
    }
    async updateHashedPassword(password: string, userId: string): Promise<Record<string, any> | null> {
        try {
            return await User.updateOne({ _id: userId }, { $set: { password: password } });
        } catch (err) {
            throw err;
        }
    }
    async getBanner(): Promise<Record<string, any> | null> {
        try {
            return await Banner.findOne();
        } catch (err) {
            throw err;
        }
    }
    async findProductByCategory(category: string): Promise<IProduct[] | null> {
        try {
            const categoryData = await Category.findOne({ name: category });

            return await Product.find({ category: new mongoose.Types.ObjectId(categoryData?._id) });
        } catch (err) {
            throw err;
        }
    }
    async getCategories(): Promise<ICategory[] | null> {
        try {
            return await Category.find({});
        } catch (err) {
            throw err;
        }
    }
    async getProductById(productId: string): Promise<IProduct | null> {
        try {
            return await Product.findOne({ _id: productId }).populate("category").populate("frame");
        } catch (err) {
            throw err;
        }
    }
    async findProductsByRelatedProductId(productId: string): Promise<IProduct[] | null> {
        try {
            const product = await Product?.findOne({ _id: productId });
            const category = product?.category;
            const relatedProducts = await Product?.find({
                $and: [{ category: new mongoose.Types.ObjectId(category) }, { _id: { $not: { $eq: new mongoose.Types.ObjectId(productId) } } }],
            });
            return relatedProducts;
        } catch (err) {
            throw err;
        }
    }
    async getShapesByCateogory(category: string): Promise<Record<string, any> | null> {
        try {
            const products = await Product.aggregate([
                { $match: { category: new mongoose.Types.ObjectId(category) } },
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
        } catch (err) {
            throw err;
        }
    }

    async getProductByShape(query: any): Promise<IProduct[] | null> {
        try {
            const res = await Product.aggregate([
                { $match: { category: new mongoose.Types.ObjectId(query?.category) } },
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
        } catch (err) {
            throw err;
        }
    }

    async getBase(size:string): Promise<IProduct[] | null> {
        try {
            console.log(size)
            const category = await Category.findOne({ name: "Base" });
            const res = await Product.aggregate([{$match:{ category: new mongoose.Types.ObjectId(category?._id)}},{$match:{variants:{$elemMatch:{size:size}}}}]);
            // console.log(res)
            //  console.log(res)
            return res;
        } catch (err) {
            throw err;
        }
    }
}
