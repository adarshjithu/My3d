import { NextFunction, Request, Response } from "express-serve-static-core";
import { UserService } from "../Services/userService";
import { STATUS_CODES } from "../Constants/statusCodes";
import { BadRequestError, UnauthorizedError } from "../Constants/errors";
import { generateAccessToken, verifyRefreshToken } from "../Utils/token";
import User from "../Models/userModel";
import { IProfile } from "../Interfaces/IProfile";
const { SUCCESS } = STATUS_CODES;

export class UserController {
    constructor(private userService: UserService) {}

    // @desc   User login
    // @route  POST /login
    // @access Public
    async userLogin(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            if (!req.body) throw new BadRequestError("Invalid Data");
            const response = await this.userService.userLogin(req.body);
            const accessTokenMaxAge = 5 * 60 * 1000;
            const refreshTokenMaxAge = 48 * 60 * 60 * 1000;
            res?.status(SUCCESS).cookie("my3d-accessToken", response?.tokens?.accessToken, {
                maxAge: accessTokenMaxAge,
                secure: true,
                httpOnly: true,
                sameSite: "none",
                // Prevent JavaScript access to the cookie
            });
            res.cookie("my3d-refreshToken", response?.tokens?.refreshToken, {
                maxAge: refreshTokenMaxAge,
                secure: true,
                httpOnly: true,
                sameSite: "none",
                // Prevent JavaScript access to the cookie
            }).json({ success: true, message: "Login successfull", data: response });
        } catch (err) {
            next(err);
        }
    }

    // @desc   User registation
    // @route  POST /register
    // @access Public
    async userRegister(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            if (!req.body) throw new BadRequestError("Invalid Data");
            const response = await this.userService.registerUser(req.body);
            res.status(SUCCESS).json(response);
        } catch (err) {
            next(err);
        }
    }

    // @desc   User verify registration link
    // @route  POST /register/verify-link
    // @access Private
    async verifyLink(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const response = await this.userService.verifyRegistrationLink(req.body.link);
            const accessTokenMaxAge = 5 * 60 * 1000;
            const refreshTokenMaxAge = 48 * 60 * 60 * 1000;

            res?.status(SUCCESS).cookie("my3d-accessToken", response?.tokens?.accessToken, {
                maxAge: accessTokenMaxAge,
                secure: true,
                httpOnly: true,
                sameSite: "none",
                // Prevent JavaScript access to the cookie
            });
            res.cookie("my3d-refreshToken", response?.tokens?.refreshToken, {
                maxAge: refreshTokenMaxAge,
                secure: true,
                httpOnly: true,
                sameSite: "none",
                // Prevent JavaScript access to the cookie
            }).json({ success: true, message: "Registration successfull", data: response });
        } catch (err) {
            next(err);
        }
    }
    // @desc   Get all products
    // @route  POST /products
    // @access Public
    async getAllProducts(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const response = await this.userService.getAllProducts();
            res.status(SUCCESS).json({ success: true, data: response });
        } catch (err) {
            next(err);
        }
    }
    // @desc   Profile Updation
    // @route  PUT /profile
    // @access Private
    async updateProfile(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const response = await this.userService.updateUserProfile(req.body as IProfile, req.userId as string);
            res.status(SUCCESS).json({ success: true, message: "Your changes have been successfully saved", data: response });
        } catch (err) {
            next(err);
        }
    }
    // @desc   User logout
    // @route  GET / logout
    // @access Private
    async userLogout(req: Request, res: Response, next: NextFunction): Promise<void> {
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
        } catch (err) {
            next(err);
        }
    }

    // @desc   Refresh Access token
    // @route  GET /refresh_token
    // @access Private
    async refreshToken(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const refreshToken = req.cookies["my3d-refreshToken"];

            const refreshTokenValid = verifyRefreshToken(refreshToken);
            if (!refreshToken || !refreshTokenValid) throw new UnauthorizedError("Refresh Token Expired");

            const userId = refreshTokenValid.data;
            const user = await User.findOne({ _id: userId });
            if (!user) {
                throw new UnauthorizedError("Refresh Token Expired");
            }

            const newAccessToken = generateAccessToken(user?._id as any);
            const accessTokenMaxAge = 1000 * 60 * 5;
            res.cookie("my3d-accessToken", newAccessToken, {
                maxAge: accessTokenMaxAge,
                secure: true,
                httpOnly: true,
                sameSite: "none",
            })
                .status(200)
                .json({ success: true, accessToken: newAccessToken });
        } catch (error) {
            next(error);
        }
    }

    // @desc   User Profile
    // @route  GET /profile
    // @access Public
    async getUserProfile(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const response = await this.userService.getUserProfile(req.userId as string);
            res.status(SUCCESS).json({ success: true, data: response });
        } catch (err) {
            next(err);
        }
    }
    // @desc   Update Billing Address
    // @route  PUT /address/billing
    // @access Public
    async updateBillingAddress(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const response = await this.userService.updateBillingAddress(req.body, req.userId);
        } catch (err) {
            next(err);
        }
    }

    // @desc   Reset password
    // @route  POST /reset_password
    // @access Public
    async resetPassword(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const response = await this.userService.resetPassword(req.body,req.userId)
            res.status(SUCCESS).json({success:true,message:'Password Updated Successfully'})
        } catch (err) {
            next(err);
        }
    }
    // @desc   Forget password
    // @route  POST /forget_password
    // @access Public
    async forgetPassword(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
             await this.userService.forgetPassword(req.body.email as string)
             res.status(SUCCESS).json({success:true,message:"Forget password link successfully send to your email"})
        } catch (err) {
            next(err);
        }
    }
    // @desc   Verify forget password link
    // @route  POST /forget_password/verify_link
    // @access Public
    async verifyForgetPasswordLink(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            if(!req.body) throw new BadRequestError("Link not found")
            const response =  await this.userService.verifyForgetPasswordLink(req.body.link);
            res.status(SUCCESS).json({success:true,message:"Link verified",data:response})
        } catch (err) {
            next(err);
        }
    }
    // @desc   Reset forget password 
    // @route  POST /forget_password/reset
    // @access Public
    async resetForgetPassword(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
           const response = await this.userService.resetForgetPassword(req.body);
           res?.status(SUCCESS).json({success:true,message:'Password reset successfull',data:response});

        } catch (err) {
            next(err);
        }
    }
    // @desc   Get banner 
    // @route  GET /banner
    // @access Public
    async getBanner(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
           const response = await this.userService.getBanner();
           res?.status(SUCCESS).json({success:true,message:'',data:response});

        } catch (err) {
            next(err);
        }
    }
    // @desc   Get banner 
    // @route  GET /product/category
    // @access Public
    async getProductByCategory(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
           const response = await this.userService.getProductByCategory(req.query.category as string);
           res?.status(SUCCESS).json({success:true,message:'',data:response});

        } catch (err) {
            next(err);
        }
    }
    // @desc   Get Category 
    // @route  GET /category
    // @access Public
    async getCategory(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
           const response = await this.userService.getCategory();
           res?.status(SUCCESS).json({success:true,message:'',data:response});

        } catch (err) {
            next(err);
        }
    }
    // @desc   Get Product by id 
    // @route  GET /product
    // @access Public
    async getProductById(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
           const response = await this.userService.getProduct(req.query.productId as string);
           res?.status(SUCCESS).json({success:true,message:'',data:response});

        } catch (err) {
            next(err);
        }
    }
    // @desc   Get Product by id 
    // @route  GET /product/suggession
    // @access Public
    async findProductsByRelatedProductId(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
           const response = await this.userService.findProductsByRelatedProductId(req.query.productId as string);
           res?.status(SUCCESS).json({success:true,message:'',data:response});

        } catch (err) {
            next(err);
        }
    }
    // @desc   Get shapes of specific category
    // @route  GET /product/shapes
    // @access Public
    async getShapes(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
           const response = await this.userService.getShapes(req.query.category as string);
           res?.status(SUCCESS).json({success:true,message:'',data:response});

        } catch (err) {
            next(err);
        }
    }
    // @desc   Get product by shapes
    // @route  GET /product/shapes/suggesion
    // @access Public
    async getProductByShape(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
        
    const response = await this.userService.getProductByShape(req.query as any);
    res?.status(SUCCESS).json({success:true,message:'',data:response});

        } catch (err) {
            next(err);
        }
    }
    // @desc   Get product by shapes
    // @route  GET /product/shapes/suggesion
    // @access Public
    async personalize(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
        
    const response = await this.userService.getProductByShape(req.query as any);
    res?.status(SUCCESS).json({success:true,message:'',data:response});

        } catch (err) {
            next(err);
        }
    }
    // @desc   Get product by base
    // @route  GET /product/base
    // @access Public
    async getBase(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
       
    const response = await this.userService.getBase(req.query.size as string);
    res?.status(SUCCESS).json({success:true,message:'',data:response});

        } catch (err) {
            next(err);
        }
    }
}
