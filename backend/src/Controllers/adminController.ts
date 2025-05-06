import { NextFunction, Request, Response } from "express-serve-static-core";
import { AdminService } from "../Services/adminService";
import { STATUS_CODES } from "../Constants/statusCodes";
import { ICategory } from "../Interfaces/ICategory";
const { SUCCESS } = STATUS_CODES;
export class AdminController {
    constructor(private adminService: AdminService) {}

    // @desc   Get all packages
    // @route  POST /packages
    // @access Admin
    async getAllPackages(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const packages = await this.adminService.getAllPackages();

            res.status(200).json({ message: "Success" });
        } catch (err) {
            next(err);
        }
    }

    // @desc   Create new category
    // @route  POST /category
    // @access Admin
    async addCategory(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const response = await this.adminService.addCategory(req.body);

            res.status(SUCCESS).json({ success: true, message: "Category successfully added", data: response });
        } catch (err) {
            next(err);
        }
    }
    // @desc   Get all cateogries
    // @route  GET /category
    // @access Admin
    async getCategories(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const response = await this.adminService.getCategories(req.query.id as string, req.query.page as string);

            res.status(SUCCESS).json({ success: true, message: "", data: response });
        } catch (err) {
            next(err);
        }
    }
    // @desc   Edit cateogries
    // @route  PUT /category
    // @access Admin
    async editCategoryData(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const response = await this.adminService.editCategory(req.body as ICategory);
            res.status(SUCCESS).json({ success: true, message: "Category successfully updated", data: response });
        } catch (err) {
            next(err);
        }
    }
    // @desc   Delete cateogries
    // @route  DELETE /category
    // @access Admin
    async deleteCategory(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const response = await this.adminService.deleteCategory(req.query.id as string);
            res.status(SUCCESS).json({ success: true, message: "Category successfully deleted", data: response });
        } catch (err) {
            next(err);
        }
    }
    // @desc   Add size
    // @route  POST /products/size
    // @access Admin
    async addSize(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const response = await this.adminService.addSize(req.body.size as string);
            res.status(SUCCESS).json({ success: true, message: "New size added successfully", data: response });
        } catch (err) {
            next(err);
        }
    }
    // @desc   get sizes
    // @route  GET /products/size
    // @access Admin
    async getSizes(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const { page, search } = req.query as { page: string; search: string };
            const response = await this.adminService.getSizes(page, search);
            res.status(SUCCESS).json({ success: true, message: "", data: response });
        } catch (err) {
            next(err);
        }
    }
    // @desc   deleteSize
    // @route  DELETE /products/size
    // @access Admin
    async deleteSize(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const response = await this.adminService.deleteSize(req.query.id as string);
            res.status(SUCCESS).json({ success: true, message: "Size deleted successfully", data: response });
        } catch (err) {
            next(err);
        }
    }
    // @desc   Update size
    // @route  PUT /products/size
    // @access Admin
    async updateSize(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const response = await this.adminService.updateSize(req.body.size, req.body.id);
            res.status(SUCCESS).json({ success: true, message: "Size updated successfully", data: response });
        } catch (err) {
            next(err);
        }
    }
    // @desc   Add Base
    // @route  POST /products/base
    // @access Admin
    async addBase(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const response = await this.adminService.createBase(req.body.base as string);
            res.status(SUCCESS).json({ success: true, message: "Base added successfully", data: response });
        } catch (err) {
            next(err);
        }
    }
    // @desc
    // Delete Base
    // @route  DELETE /products/base
    // @access Admin
    async deleteBase(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const response = await this.adminService.deleteBase(req.query.id as string);
            res.status(SUCCESS).json({ success: true, message: "Base deleted successfully", data: response });
        } catch (err) {
            next(err);
        }
    }

    // @desc   Update Base
    // @route  PUT /products/base
    // @access Admin
    async updateBase(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const response = await this.adminService.updateBase(req.body.base as string, req.body.id as string);
            res.status(SUCCESS).json({ success: true, message: "Base updated successfully", data: response });
        } catch (err) {
            next(err);
        }
    }
    // @desc   Get all Base
    // @route  GET /products/base
    // @access Admin
    async getAllBase(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const response = await this.adminService.getBase(req.query.page as string, req.query.search as string);
            res.status(SUCCESS).json({ success: true, message: "", data: response });
        } catch (err) {
            next(err);
        }
    }
    // @desc   Upload frame
    // @route  POST /products/frame
    // @access Admin
    async uploadFrame(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const response = await this.adminService.uploadFrame(req.files, req.body.frameName,req.body.shape);
            res.status(SUCCESS).json({ success: true, message: "Frame added successfully", data: response });
        } catch (err) {
            next(err);
        }
    }
    // @desc   Get all frames data
    // @route  GET /products/frames
    // @access Admin
    async getAllFrames(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const response = await this.adminService.getAllFrames(req?.query?.page as string, req.query.search as string);
            res.status(SUCCESS).json({ success: true, message: "", data: response });
        } catch (err) {
            next(err);
        }
    }
    // @desc   Delete frame data
    // @route  DELETE /products/frames
    // @access Admin
    async deleteFrame(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const response = await this.adminService.deleteFrame(req.params.id as string);
            res.status(SUCCESS).json({ success: true, message: "Frame successfully deleted", data: response });
        } catch (err) {
            next(err);
        }
    }
    // @desc   updateFrame data
    // @route  PUT /products/frames
    // @access Admin
    async updateFrame(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const response = await this.adminService.updateFrame(req.body, req.files);
            res.status(SUCCESS).json({ success: true, message: "Frame updated successfully", data: response });
        } catch (err) {
            next(err);
        }
    }
    // @desc   Get all details for adding cateogory
    // @route  PUT /products/add/option
    // @access Admin
    async addProductGetOptions(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const response = await this.adminService.getAddProductsOptions();
            res.status(SUCCESS).json({ success: true, message: "", data: response });
        } catch (err) {
            next(err);
        }
    }
    // @desc  Add New product
    // @route  POST /product
    // @access Admin
    async addNewProduct(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const response = await this.adminService.addProduct(req.body, req.files);
            res.status(SUCCESS).json({ success: true, message: "Product added successfully", data: response });
        } catch (err) {
            next(err);
        }
    }

    // @desc  Get all products for admin
    // @route  GET /products
    // @access Admin
    async getAllProductsForAdmin(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            
            const response = await this.adminService.getAllProductsForAdmin(req.query as any);
            res.status(SUCCESS).json({ success: true, message: "", data: response });
        } catch (err) {
            next(err);
        }
    }
    // @desc   Change product Status
    // @route  PATCH /products/:id
    // @access Admin
    async changeProductStatus(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const response = await this.adminService.changeProductStatus(req.params.id as string);
            res.status(SUCCESS).json({ success: true, message: "", data: response });
        } catch (err) {
            next(err);
        }
    }
    // @desc  deleteProductImage
    // @route  DELET /products/image
    // @access Admin
    async deleteProductImage(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            console.log(req.query);
            const response = await this.adminService.deleteProductImage(req.query?.proId as string, req.query.image as string);
            res.status(SUCCESS).json({ success: true, message: "Image deleted successfully", data: response });
        } catch (err) {
            next(err);
        }
    }
    // @desc  Update product image
    // @route  POST /products/image
    // @access Admin
    async updateProductImage(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const response = await this.adminService.updateImage(req?.body.proId as string, req.files);
            res.status(SUCCESS).json({ success: true, message: "Image deleted successfully", data: response });
        } catch (err) {
            next(err);
        }
    }
    // @desc   Delete Product 
    // @route  DELTE /product/:id
    // @access Admin
    async deleteProduct(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const response = await this.adminService.deleteProduct(req.params.id as string);
            res.status(SUCCESS).json({ success: true, message: "Product successfully deleted", data: response });
        } catch (err) {
            next(err);
        }
    }
    // @desc   Get All Frames 
    // @route  GET /frames
    // @access Admin
    async getFrames(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const response = await this.adminService.getFrames();
            res.status(SUCCESS).json({ success: true, message: "", data: response });
        } catch (err) {
            next(err);
        }
    }
    // @desc   Update Product Frame
    // @route  PUT product/frame
    // @access Admin
    async updateProductFrame(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            
             const response = await this.adminService.updateProductFrame(req.body.proId as string,req.body.frameId as string);
             res.status(SUCCESS).json({ success: true, message: "Product frame successfully updated", data: response });
        } catch (err) {
            next(err);
        }
    }
    // @desc   Get all categories data
    // @route  GET products/category
    // @access Admin
    async allCategories(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            
             const response = await this.adminService.allCategories();
             res.status(SUCCESS).json({ success: true, message: "", data: response });
        } catch (err) {
            next(err);
        }
    }
    // @desc   Add new banner
    // @route  POST products/banner
    // @access Admin
    async addBanner(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
          
             const response = await this.adminService.addBanner(req.files);
             res.status(SUCCESS).json({ success: true, message: "New banner successfully added", data: response });
        } catch (err) {
            next(err);
        }
    }
    
    // @desc   Get Banners
    // @route  GET products/banner
    // @access Admin
    async getBanner(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
          
             const response = await this.adminService.getBanner();
             res.status(SUCCESS).json({ success: true, message: "", data: response });
        } catch (err) {
            next(err);
        }
    }
    // @desc   Delete Banner
    // @route  DELETE products/banner
    // @access Admin
    async deleteBanner(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
             
             const response = await this.adminService.deleteBanner(req.query.image as string);
             res.status(SUCCESS).json({ success: true, message: "Banner delete successfully", data: response });
        } catch (err) {
            next(err);
        }
    }
    // @desc   Update Banner slideshow
    // @route  PUT products/banner/slideshow
    // @access Admin
    async updateSlideShow(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
             
             const response = await this.adminService.updateSlideShow();
             res.status(SUCCESS).json({ success: true, message: "Slideshow updated successfully", data: response });
        } catch (err) {
            next(err);
        }
    }
    // @desc   Update Banner time
    // @route  PUT products/banner/time
    // @access Admin
    async updateBannerTime(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
             
             const response = await this.adminService.updateBannerTime(req.query.time as string);
             res.status(SUCCESS).json({ success: true, message: "Slideshow updated successfully", data: response });
        } catch (err) {
            next(err);
        }
    }

}
