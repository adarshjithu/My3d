import axios from "axios";
import API, { errorHandler } from "./api";
import { IUser } from "@/Interfaces/IUser";
import { IProfile } from "@/Interfaces/IProfile";
import { IAddress } from "@/Interfaces/IAddress";

export const getAllProducts = async () => {
    try {
        const response = await API.get("/api/products");
        return response;
    } catch (err) {}
};

export const signupUser = async (userData:IUser)=>{
    try{
       
        const response = await API.post("/api/register",userData);
        return response;
    }catch(error){
        return errorHandler(error)
    }
}
export const verifyLink = async (link:string)=>{
    try{
        
        const response = await API.post("/api/register/verify-link",{link:link});
        return response;
    }catch(error){
        return errorHandler(error)
    }
}
export const loginUser = async (formData:{email:string,password:string})=>{
    try{
        
        const response = await API.post("/api/login/",formData)
        return response;
    }catch(error){
        return errorHandler(error)
    }
}
export const updateProfile = async (profileData:IProfile)=>{
    try{
        
        const response = await API.put("/api/profile/",profileData)
        return response;
    }catch(error){
        return errorHandler(error)
    }
}
export const userLogout = async ()=>{
    try{
        
        const response = await API.get("/api/logout")
        return response;
    }catch(error){
        return errorHandler(error)
    }
}
export const getUserProfile = async ()=>{
    try{
        
        const response = await API.get("/api/profile")
        return response;
    }catch(error){
        return errorHandler(error)
    }
}
export const updateBillingAddress = async (addressData:IAddress)=>{
    try{
        
        const response = await API.put("/api/address/billing",addressData)
        return response;
    }catch(error){
        return errorHandler(error)
    }
}
export const updateShippingAddress = async ()=>{
    try{
        
        const response = await API.put("/api/address/shipping")
        return response;
    }catch(error){
        return errorHandler(error)
    }
}
export const resetUserPassword = async (passwordData:any)=>{
    try{
        
        const response = await API.post("/api/reset_password",passwordData)
        return response;
    }catch(error){
        return errorHandler(error)
    }
}
export const forgetUserPassword = async (email:string)=>{
    try{
        
        const response = await API.post("/api/forget_password",{email:email})
        return response;
    }catch(error){
        return errorHandler(error)
    }
}
export const verifyForgetPasswordLink = async (link:string)=>{
    try{
        
        const response = await API.post("/api/forget_password/verify_link",{link:link})
        return response;
    }catch(error){
        return errorHandler(error)
    }
}
export const resetForgetPassword = async (data:{password:string;userId:string})=>{
    try{
        
        const response = await API.post("/api/forget_password/reset",data)
        return response;
    }catch(error){
        return errorHandler(error)
    }
}
export const getBanners = async ()=>{
    try{
        
        const response = await API.get("/api/banner")
        return response;
    }catch(error){
        return errorHandler(error)
    }
}
export const getProductByCategory = async (category:string)=>{
    try{
      
        const response = await API.get(`/api/product/category?category=${category}`)
        return response;
    }catch(error){
        return errorHandler(error)
    }
}
export const getCategories = async ()=>{
    try{
      
        const response = await API.get(`api/category`)
        return response;
    }catch(error){
        return errorHandler(error)
    }
}
export const getProductById = async (productId:string)=>{
    try{
      
        const response = await API.get(`api/product?productId=${productId}`)
        return response;
    }catch(error){
        return errorHandler(error)
    }
}
export const getRelatedProduct = async (productId:string)=>{
    try{
      
        const response = await API.get(`api/product/suggession?productId=${productId}`)
        return response;
    }catch(error){
        return errorHandler(error)
    }
}
export const getAllShapes = async (category:string)=>{
    try{
      
        const response = await API.get(`api/product/shapes?category=${category}`)
        return response;
    }catch(error){
        return errorHandler(error)
    }
}
export const findProductByShape = async (category:string,shape:string)=>{
    try{
      
        const response = await API.get(`api/product/shape/suggesion?category=${category}&shape=${shape}`)
        return response;
    }catch(error){
        return errorHandler(error)
    }
}
export const getProductForPersonalize = async (productId:string)=>{
    try{
      
        const response = await API.get(`api/product/personlize?productId=${productId}`)
        return response;
    }catch(error){
        return errorHandler(error)
    }
}
export const getBase = async (baseType:string)=>{
    try{
       
        const response = await API.get(`api/product/base?size=${baseType}`);
        return response;
    }catch(error){
        return errorHandler(error)
    }
}
