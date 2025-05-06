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
exports.AdminController = void 0;
const statusCodes_1 = require("../Constants/statusCodes");
const { SUCCESS } = statusCodes_1.STATUS_CODES;
class AdminController {
    constructor(adminService) {
        this.adminService = adminService;
    }
    // @desc   Get all packages
    // @route  POST /packages
    // @access Admin
    getAllPackages(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const packages = yield this.adminService.getAllPackages();
                res.status(200).json({ message: "Success" });
            }
            catch (err) {
                next(err);
            }
        });
    }
    // @desc   Create new category
    // @route  POST /category
    // @access Admin
    addCategory(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield this.adminService.addCategory(req.body);
                res.status(SUCCESS).json({ success: true, message: "Category successfully added", data: response });
            }
            catch (err) {
                next(err);
            }
        });
    }
    // @desc   Get all cateogries
    // @route  GET /category
    // @access Admin
    getCategories(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield this.adminService.getCategories(req.query.id, req.query.page);
                res.status(SUCCESS).json({ success: true, message: "", data: response });
            }
            catch (err) {
                next(err);
            }
        });
    }
    // @desc   Edit cateogries
    // @route  PUT /category
    // @access Admin
    editCategoryData(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield this.adminService.editCategory(req.body);
                res.status(SUCCESS).json({ success: true, message: "Category successfully updated", data: response });
            }
            catch (err) {
                next(err);
            }
        });
    }
    // @desc   Delete cateogries
    // @route  DELETE /category
    // @access Admin
    deleteCategory(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield this.adminService.deleteCategory(req.query.id);
                res.status(SUCCESS).json({ success: true, message: "Category successfully deleted", data: response });
            }
            catch (err) {
                next(err);
            }
        });
    }
    // @desc   Add size
    // @route  POST /products/size
    // @access Admin
    addSize(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield this.adminService.addSize(req.body.size);
                res.status(SUCCESS).json({ success: true, message: "New size added successfully", data: response });
            }
            catch (err) {
                next(err);
            }
        });
    }
    // @desc   get sizes
    // @route  GET /products/size
    // @access Admin
    getSizes(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { page, search } = req.query;
                const response = yield this.adminService.getSizes(page, search);
                res.status(SUCCESS).json({ success: true, message: "", data: response });
            }
            catch (err) {
                next(err);
            }
        });
    }
    // @desc   deleteSize
    // @route  DELETE /products/size
    // @access Admin
    deleteSize(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield this.adminService.deleteSize(req.query.id);
                res.status(SUCCESS).json({ success: true, message: "Size deleted successfully", data: response });
            }
            catch (err) {
                next(err);
            }
        });
    }
    // @desc   Update size
    // @route  PUT /products/size
    // @access Admin
    updateSize(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield this.adminService.updateSize(req.body.size, req.body.id);
                res.status(SUCCESS).json({ success: true, message: "Size updated successfully", data: response });
            }
            catch (err) {
                next(err);
            }
        });
    }
    // @desc   Add Base
    // @route  POST /products/base
    // @access Admin
    addBase(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield this.adminService.createBase(req.body.base);
                res.status(SUCCESS).json({ success: true, message: "Base added successfully", data: response });
            }
            catch (err) {
                next(err);
            }
        });
    }
    // @desc
    // Delete Base
    // @route  DELETE /products/base
    // @access Admin
    deleteBase(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield this.adminService.deleteBase(req.query.id);
                res.status(SUCCESS).json({ success: true, message: "Base deleted successfully", data: response });
            }
            catch (err) {
                next(err);
            }
        });
    }
    // @desc   Update Base
    // @route  PUT /products/base
    // @access Admin
    updateBase(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield this.adminService.updateBase(req.body.base, req.body.id);
                res.status(SUCCESS).json({ success: true, message: "Base updated successfully", data: response });
            }
            catch (err) {
                next(err);
            }
        });
    }
    // @desc   Get all Base
    // @route  GET /products/base
    // @access Admin
    getAllBase(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield this.adminService.getBase(req.query.page, req.query.search);
                res.status(SUCCESS).json({ success: true, message: "", data: response });
            }
            catch (err) {
                next(err);
            }
        });
    }
    // @desc   Upload frame
    // @route  POST /products/frame
    // @access Admin
    uploadFrame(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield this.adminService.uploadFrame(req.files, req.body.frameName, req.body.shape);
                res.status(SUCCESS).json({ success: true, message: "Frame added successfully", data: response });
            }
            catch (err) {
                next(err);
            }
        });
    }
    // @desc   Get all frames data
    // @route  GET /products/frames
    // @access Admin
    getAllFrames(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            try {
                const response = yield this.adminService.getAllFrames((_a = req === null || req === void 0 ? void 0 : req.query) === null || _a === void 0 ? void 0 : _a.page, req.query.search);
                res.status(SUCCESS).json({ success: true, message: "", data: response });
            }
            catch (err) {
                next(err);
            }
        });
    }
    // @desc   Delete frame data
    // @route  DELETE /products/frames
    // @access Admin
    deleteFrame(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield this.adminService.deleteFrame(req.params.id);
                res.status(SUCCESS).json({ success: true, message: "Frame successfully deleted", data: response });
            }
            catch (err) {
                next(err);
            }
        });
    }
    // @desc   updateFrame data
    // @route  PUT /products/frames
    // @access Admin
    updateFrame(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield this.adminService.updateFrame(req.body, req.files);
                res.status(SUCCESS).json({ success: true, message: "Frame updated successfully", data: response });
            }
            catch (err) {
                next(err);
            }
        });
    }
    // @desc   Get all details for adding cateogory
    // @route  PUT /products/add/option
    // @access Admin
    addProductGetOptions(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield this.adminService.getAddProductsOptions();
                res.status(SUCCESS).json({ success: true, message: "", data: response });
            }
            catch (err) {
                next(err);
            }
        });
    }
    // @desc  Add New product
    // @route  POST /product
    // @access Admin
    addNewProduct(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield this.adminService.addProduct(req.body, req.files);
                res.status(SUCCESS).json({ success: true, message: "Product added successfully", data: response });
            }
            catch (err) {
                next(err);
            }
        });
    }
    // @desc  Get all products for admin
    // @route  GET /products
    // @access Admin
    getAllProductsForAdmin(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield this.adminService.getAllProductsForAdmin(req.query);
                res.status(SUCCESS).json({ success: true, message: "", data: response });
            }
            catch (err) {
                next(err);
            }
        });
    }
    // @desc   Change product Status
    // @route  PATCH /products/:id
    // @access Admin
    changeProductStatus(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield this.adminService.changeProductStatus(req.params.id);
                res.status(SUCCESS).json({ success: true, message: "", data: response });
            }
            catch (err) {
                next(err);
            }
        });
    }
    // @desc  deleteProductImage
    // @route  DELET /products/image
    // @access Admin
    deleteProductImage(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            try {
                console.log(req.query);
                const response = yield this.adminService.deleteProductImage((_a = req.query) === null || _a === void 0 ? void 0 : _a.proId, req.query.image);
                res.status(SUCCESS).json({ success: true, message: "Image deleted successfully", data: response });
            }
            catch (err) {
                next(err);
            }
        });
    }
    // @desc  Update product image
    // @route  POST /products/image
    // @access Admin
    updateProductImage(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield this.adminService.updateImage(req === null || req === void 0 ? void 0 : req.body.proId, req.files);
                res.status(SUCCESS).json({ success: true, message: "Image deleted successfully", data: response });
            }
            catch (err) {
                next(err);
            }
        });
    }
    // @desc   Delete Product 
    // @route  DELTE /product/:id
    // @access Admin
    deleteProduct(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield this.adminService.deleteProduct(req.params.id);
                res.status(SUCCESS).json({ success: true, message: "Product successfully deleted", data: response });
            }
            catch (err) {
                next(err);
            }
        });
    }
    // @desc   Get All Frames 
    // @route  GET /frames
    // @access Admin
    getFrames(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield this.adminService.getFrames();
                res.status(SUCCESS).json({ success: true, message: "", data: response });
            }
            catch (err) {
                next(err);
            }
        });
    }
    // @desc   Update Product Frame
    // @route  PUT product/frame
    // @access Admin
    updateProductFrame(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield this.adminService.updateProductFrame(req.body.proId, req.body.frameId);
                res.status(SUCCESS).json({ success: true, message: "Product frame successfully updated", data: response });
            }
            catch (err) {
                next(err);
            }
        });
    }
    // @desc   Get all categories data
    // @route  GET products/category
    // @access Admin
    allCategories(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield this.adminService.allCategories();
                res.status(SUCCESS).json({ success: true, message: "", data: response });
            }
            catch (err) {
                next(err);
            }
        });
    }
    // @desc   Add new banner
    // @route  POST products/banner
    // @access Admin
    addBanner(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield this.adminService.addBanner(req.files);
                res.status(SUCCESS).json({ success: true, message: "New banner successfully added", data: response });
            }
            catch (err) {
                next(err);
            }
        });
    }
    // @desc   Get Banners
    // @route  GET products/banner
    // @access Admin
    getBanner(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield this.adminService.getBanner();
                res.status(SUCCESS).json({ success: true, message: "", data: response });
            }
            catch (err) {
                next(err);
            }
        });
    }
    // @desc   Delete Banner
    // @route  DELETE products/banner
    // @access Admin
    deleteBanner(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield this.adminService.deleteBanner(req.query.image);
                res.status(SUCCESS).json({ success: true, message: "Banner delete successfully", data: response });
            }
            catch (err) {
                next(err);
            }
        });
    }
    // @desc   Update Banner slideshow
    // @route  PUT products/banner/slideshow
    // @access Admin
    updateSlideShow(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield this.adminService.updateSlideShow();
                res.status(SUCCESS).json({ success: true, message: "Slideshow updated successfully", data: response });
            }
            catch (err) {
                next(err);
            }
        });
    }
    // @desc   Update Banner time
    // @route  PUT products/banner/time
    // @access Admin
    updateBannerTime(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield this.adminService.updateBannerTime(req.query.time);
                res.status(SUCCESS).json({ success: true, message: "Slideshow updated successfully", data: response });
            }
            catch (err) {
                next(err);
            }
        });
    }
}
exports.AdminController = AdminController;
