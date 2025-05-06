import { BadRequestError } from "../Constants/errors";
import { IAddress } from "../Interfaces/IAddress";
import { ICategory } from "../Interfaces/ICategory";
import { IProduct } from "../Interfaces/IProductModel";
import { IProfile } from "../Interfaces/IProfile";
import { IUser } from "../Interfaces/IUser";
import { UserRepository } from "../Repositories/userRepository";
import { sendLinkToEmail } from "../Utils/mailer";
import { comparePassword, hashPassword } from "../Utils/password";
import { generateAccessToken, generateRefreshToken, verifyToken } from "../Utils/token";

export class UserService {
    constructor(private userRepository:UserRepository) {

    }

    async getAllProducts() {
        try {
            return await this.userRepository.findAllProducts();
        } catch (err) {
            throw err;
        }
    }

    async registerUser(userData: IUser): Promise<any> {
        try {
           
            // Check email exist
            const user = await this.userRepository.findUserByEmail(userData?.email);
            if (user) throw new BadRequestError("User already exists");
            // Check username exists
            const usernameExists = await this.userRepository.findUserByUsername(userData?.username as string);
            if (usernameExists) throw new BadRequestError("Username already taken try another one");

            // Encrypt password
            const password = await hashPassword(userData?.password);

            const newUser = { ...userData, password };
            const isTempUserExists = await this.userRepository.findTempUser(userData);
            if (isTempUserExists) throw new BadRequestError("Link already send");
            const newUserData = await this.userRepository.createNewTempUser(newUser);
            const accessToken = generateAccessToken(newUserData?._id);
            const link = `${process.env.FRONTEND_URL}/login/${accessToken}`;
            const message = `
            Subject: Complete Your Registration on My 3D Pic ✨
            
            Hi ${userData?.username},
            
            To complete your registration and start creating your unique crystal shapes, click the link below:
            
            ${link}
            
            This link is valid for the next 5 minutes. If you didn’t request this, feel free to ignore this email.
            
            Best regards,  
            The My 3D Pic Team
            `;

            await sendLinkToEmail(newUserData?.email, link, message);
            return { success: true, message: "The user registration link has been send to your email." };
        } catch (err) {
            throw err;
        }
    }

    async verifyRegistrationLink(link: string): Promise<any> {
        try {
            const isLinkValid = verifyToken(link);
            console.log(isLinkValid)
            if (!isLinkValid) throw new BadRequestError("Registration link expired");
            const userId = isLinkValid?.data;

            const tempUser = await this.userRepository.getTempUserById(userId);
            console.log(tempUser)
            if (!tempUser) throw new BadRequestError("Something went wrong");
            const user = {
                username: tempUser?.username,
                email: tempUser?.email,
                password: tempUser?.password,
            };
            const newUser = await this.userRepository.createUser(user);
            const accessToken = generateAccessToken(newUser?._id);
            const refreshToken = generateRefreshToken(newUser?._id);
            const userDataWithouPassword = JSON.parse(JSON.stringify(newUser));
            delete userDataWithouPassword["password"];
            return { tokens: { accessToken, refreshToken }, user: userDataWithouPassword };
        } catch (err) {
            throw err;
        }
    }

    async userLogin(userData: { email: string; password: string }): Promise<any> {
        try {
            const user = await this.userRepository.findUserByEmailOrUsername(userData);
            if (!user) throw new BadRequestError("Invalid Username or Password");
            const isPasswordValid = await comparePassword(userData?.password, user?.password);
            if (!isPasswordValid) throw new BadRequestError("Please Enter a Valid Password");
            const accessToken = generateAccessToken(user?._id);
            const refreshToken = generateRefreshToken(user?._id);
            const userWithoutPassword = JSON.parse(JSON.stringify(user));
            delete userWithoutPassword["password"];

            return { tokens: { accessToken, refreshToken }, user: userWithoutPassword };
        } catch (err) {
            throw err;
        }
    }

    async updateUserProfile(profileData: IProfile, userId: string): Promise<IProfile | null> {
        try {
            return await this.userRepository.upsertProfile(profileData, userId);
        } catch (err) {
            throw err;
        }
    }
    async getUserProfile(userId: string): Promise<IProfile | null> {
        try {
            return await this.userRepository.findProfileByUserId(userId as string);
        } catch (err) {
            throw err;
        }
    }
    async updateBillingAddress(addressData: IAddress, userId: string): Promise<IAddress | null> {
        try {
            return await this.userRepository.updateBillingAddressByUserId(addressData, userId);
        } catch (err) {
            throw err;
        }
    }
    async resetPassword(userData: { oldpassword: string; newpassword: string; confirmpassword: string }, userId: string): Promise<any> {
        try {
            const user = await this.userRepository.findUserById(userId);
            if (!user) throw new BadRequestError("Invalid User");
            const isValid = await comparePassword(userData?.oldpassword, user?.password);
            if (!isValid) throw new BadRequestError("The current password you enterd in incorrect");
            const isSameAsOld = await comparePassword(userData?.newpassword, user?.password);
            if (isSameAsOld) throw new BadRequestError("New password cannot be the same as old password");

            const newHashedPassword = await hashPassword(userData?.newpassword);
            return this.userRepository.updateHashedPassword(newHashedPassword, userId);
        } catch (err) {
            throw err;
        }
    }
    async forgetPassword(email: string): Promise<Record<string, any> | null> {
        try {
            const user = await this.userRepository.findUserByEmail(email);
            if (!user) throw new BadRequestError("User not found with this email");

            const encryptedLink = generateAccessToken(user?._id);
            const link = `${process.env.FRONTEND_URL}/forget_password/${encryptedLink}`;
            const message = `
    Subject: Reset Your Password on My 3D Pic ✨

    Hi ${user?.username},

    We received a request to reset your password for your My 3D Pic account. If you didn’t request this, feel free to ignore this email.

    To reset your password, click the link below:

    ${link}

    This link is valid for the next 5 minutes. If the link has expired or doesn’t work, you can request a new one.

    Best regards,  
    The My 3D Pic Team
`;

            await sendLinkToEmail(user?.email, link, message);
            return { success: true };
        } catch (err) {
            throw err;
        }
    }

    async verifyForgetPasswordLink(link: string): Promise<any | null> {
        try {
            const isLinkValid = verifyToken(link);
            if (!isLinkValid) throw new BadRequestError("Link Expired");
            const user = await this.userRepository.findUserById(isLinkValid.data);
            if (!user) throw new BadRequestError("Invalid user data");
            return { userId: user?._id };
        } catch (err) {
            throw err;
        }
    }
    async resetForgetPassword(data:{userId:string;password:string}): Promise<any | null> {
        try {
            const user =  await this.userRepository.findUserById(data?.userId)
             if(!user) throw new BadRequestError("Invalid User Data");
             const isSameAsOld =  await comparePassword(data?.password,user?.password);
             if(isSameAsOld) throw new BadRequestError("New password cannot be the same as old password");
             const newHashedPassword = await hashPassword(data?.password);

               return await this.userRepository.updateHashedPassword(newHashedPassword,data?.userId);
        } catch (err) {
            throw err;
        }
    }
    async getBanner(): Promise<any | null> {
        try {
            return   await this?.userRepository?.getBanner()
        
        } catch (err) {
            throw err;
        }
    }
    async getProductByCategory(category:string): Promise<IProduct[]|null> {
        try {
            return   await this.userRepository.findProductByCategory(category)
        
        } catch (err) {
            throw err;
        }
    }
    async getCategory(): Promise<ICategory[]|null> {
        try {
            return   await this.userRepository.getCategories()
        
        } catch (err) {
            throw err;
        }
    }
    async getProduct(productId:string): Promise<IProduct|null> {
        try {
            return   await this.userRepository.getProductById(productId)
        
        } catch (err) {
            throw err;
        }
    }
    async findProductsByRelatedProductId(productId:string): Promise<IProduct[]|null> {
        try {
            return   await this.userRepository.findProductsByRelatedProductId(productId)
        
        } catch (err) {
            throw err;
        }
    }
    async getShapes(category:string): Promise<Record<string,any>|null> {
        try {
            return   await this.userRepository.getShapesByCateogory(category)
        
        } catch (err) {
            throw err;
        }
    }
    async getProductByShape(query:any): Promise<Record<string,any>|null> {
        try {
            return   await this.userRepository.getProductByShape(query)
        
        } catch (err) {
            throw err;
        }
    }
    async getBase(size:string): Promise<IProduct[]|null> {
        try {
            return   await this.userRepository.getBase(size)
        
        } catch (err) {
            throw err;
        }
    }
}
