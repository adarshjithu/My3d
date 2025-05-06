import express from "express";
import { AdminRepository } from "../Repositories/adminRepository";
import { AdminService } from "../Services/adminService";
import { AdminController } from "../Controllers/adminController";
import upload from "../Middlewares/upload";

const adminRouter = express();
const adminRepository = new AdminRepository();
const adminService = new AdminService(adminRepository);
const controller = new AdminController(adminService);
adminRouter.get('/packages',(req,res,next)=>controller.getAllPackages(req,res,next));
adminRouter.post('/category',(req,res,next)=>controller.addCategory(req,res,next));
adminRouter.get('/category',(req,res,next)=>controller.getCategories(req,res,next));
adminRouter.put('/category',(req,res,next)=>controller.editCategoryData(req,res,next));
adminRouter.delete('/category',(req,res,next)=>controller.deleteCategory(req,res,next));
adminRouter.post("/products/size",(req,res,next)=>controller.addSize(req,res,next))
adminRouter.get("/products/size",(req,res,next)=>controller.getSizes(req,res,next))
adminRouter.delete("/products/size",(req,res,next)=>controller.deleteSize(req,res,next))
adminRouter.put("/products/size",(req,res,next)=>controller.updateSize(req,res,next))

// Base
adminRouter.post("/products/base",(req,res,next)=>controller.addBase(req,res,next))
adminRouter.delete("/products/base",(req,res,next)=>controller.deleteBase(req,res,next))
adminRouter.put("/products/base",(req,res,next)=>controller.updateBase(req,res,next))
adminRouter.get("/products/base",(req,res,next)=>controller.getAllBase(req,res,next))

// Frames
adminRouter.post("/products/frame",upload.any(),(req,res,next)=>controller.uploadFrame(req,res,next));
adminRouter.get("/products/frames",(req,res,next)=>controller.getAllFrames(req,res,next))
adminRouter.put("/products/frame",upload.any(),(req,res,next)=>controller.updateFrame(req,res,next))
adminRouter.delete("/products/frame/:id",(req,res,next)=>controller.deleteFrame(req,res,next))
adminRouter.get("/product/frames/all",(req,res,next)=>controller.getFrames(req,res,next))
adminRouter.put('/product/frame',(req,res,next)=>controller.updateProductFrame(req,res,next))

adminRouter.get("/products/add/option",(req,res,next)=>controller.addProductGetOptions(req,res,next))
adminRouter.post("/product",upload.any(),(req,res,next)=>controller.addNewProduct(req,res,next))
adminRouter.get("/products",(req,res,next)=>controller.getAllProductsForAdmin(req,res,next))
adminRouter.patch("/products/status/:id",(req,res,next)=>controller.changeProductStatus(req,res,next))
adminRouter.delete("/products/image",(req,res,next)=>controller.deleteProductImage(req,res,next))
adminRouter.put("/product/image",upload.any(),(req,res,next)=>controller.updateProductImage(req,res,next))
adminRouter.delete("/product/:id",(req,res,next)=>controller.deleteProduct(req,res,next));
adminRouter.get("/products/category",(req,res,next)=>controller.allCategories(req,res,next))

// Banner
adminRouter.post('/banner',upload.any(),(req,res,next)=>controller.addBanner(req,res,next));
adminRouter.get('/banner',(req,res,next)=>controller.getBanner(req,res,next));
adminRouter.delete('/banner',(req,res,next)=>controller.deleteBanner(req,res,next));
adminRouter.patch('/banner/slideshow',(req,res,next)=>controller.updateSlideShow(req,res,next))
adminRouter.patch('/banner/time',(req,res,next)=>controller.updateBannerTime(req,res,next))
export default adminRouter;
