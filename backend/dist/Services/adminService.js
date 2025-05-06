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
exports.AdminService = void 0;
const errors_1 = require("../Constants/errors");
const productModel_1 = __importDefault(require("../Models/productModel"));
const uploadToCloudinary_1 = require("../Utils/uploadToCloudinary");
class AdminService {
    constructor(adminRepository) {
        this.adminRepository = adminRepository;
    }
    getAllPackages() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return this.adminRepository.findAllPackages();
            }
            catch (err) {
                throw err;
            }
        });
    }
    addCategory(category) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield this.adminRepository.createCategory(category);
            }
            catch (err) {
                throw err;
            }
        });
    }
    getCategories(id, page) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield this.adminRepository.findCategories(id, page);
            }
            catch (err) {
                throw err;
            }
        });
    }
    editCategory(category) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield this.adminRepository.updateCategory(category);
            }
            catch (err) {
                throw err;
            }
        });
    }
    deleteCategory(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield this.adminRepository.deleteCategoryById(id);
            }
            catch (err) {
                throw err;
            }
        });
    }
    addSize(size) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield this.adminRepository.createSize(size);
            }
            catch (err) {
                throw err;
            }
        });
    }
    getSizes(page, search) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield this.adminRepository.findAllSize(page, search);
            }
            catch (err) {
                throw err;
            }
        });
    }
    deleteSize(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield this.adminRepository.deleteSizeById(id);
            }
            catch (err) {
                throw err;
            }
        });
    }
    updateSize(size, id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield this.adminRepository.updateSizeById(size, id);
            }
            catch (err) {
                throw err;
            }
        });
    }
    createBase(base) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield this.adminRepository.createBase(base);
            }
            catch (err) {
                throw err;
            }
        });
    }
    deleteBase(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield this.adminRepository.deleteBaseById(id);
            }
            catch (err) {
                throw err;
            }
        });
    }
    updateBase(base, id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                console.log(base, id);
                return yield this.adminRepository.updateBaseById(base, id);
            }
            catch (err) {
                throw err;
            }
        });
    }
    getBase(page, search) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield this.adminRepository.getAllBase(page, search);
            }
            catch (err) {
                throw err;
            }
        });
    }
    uploadFrame(files, frameName, shape) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            try {
                const res = yield (0, uploadToCloudinary_1.uploadImageToCloudinary)(files);
                if (!(res === null || res === void 0 ? void 0 : res.success))
                    throw new errors_1.BadRequestError("Failed to upload frames");
                const images = res === null || res === void 0 ? void 0 : res.results;
                if (!images || images.length == 0)
                    throw new errors_1.BadRequestError("Something went wrong");
                const image = (_a = images[0]) === null || _a === void 0 ? void 0 : _a.url;
                return yield this.adminRepository.createFrame(image, frameName, shape);
            }
            catch (err) {
                throw err;
            }
        });
    }
    getAllFrames(page, search) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield this.adminRepository.findAllFrames(page, search);
            }
            catch (err) {
                throw err;
            }
        });
    }
    deleteFrame(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield this.adminRepository.deleteFrameById(id);
            }
            catch (err) {
                throw err;
            }
        });
    }
    updateFrame(data, files) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            try {
                if (files.length !== 0) {
                    const res = yield (0, uploadToCloudinary_1.uploadImageToCloudinary)(files);
                    if (!(res === null || res === void 0 ? void 0 : res.success))
                        throw new errors_1.BadRequestError("Failed to upload frames");
                    const images = res === null || res === void 0 ? void 0 : res.results;
                    if (!images || images.length == 0)
                        throw new errors_1.BadRequestError("Something went wrong");
                    const image = (_a = images[0]) === null || _a === void 0 ? void 0 : _a.url;
                    return yield this.adminRepository.updateFramesById({ frameName: data === null || data === void 0 ? void 0 : data.frameName, shape: data.shape, image: image }, data === null || data === void 0 ? void 0 : data.id);
                }
                else {
                    return yield this.adminRepository.updateFramesById({ frameName: data === null || data === void 0 ? void 0 : data.frameName, shape: data === null || data === void 0 ? void 0 : data.shape }, data === null || data === void 0 ? void 0 : data.id);
                }
            }
            catch (err) {
                throw err;
            }
        });
    }
    getAddProductsOptions() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield this.adminRepository.getAllSizeBaseCategoriesFrames();
            }
            catch (err) {
                throw err;
            }
        });
    }
    addProduct(formData, files) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a, _b;
            try {
                const productImages = [];
                const sizeGuideImage = [];
                for (let i of files) {
                    if ((i === null || i === void 0 ? void 0 : i.fieldname) == "sizeguide")
                        sizeGuideImage.push(i);
                    else
                        productImages.push(i);
                }
                const sizeQuideImageUrl = yield (0, uploadToCloudinary_1.uploadImageToCloudinary)(sizeGuideImage);
                if (!(sizeQuideImageUrl === null || sizeQuideImageUrl === void 0 ? void 0 : sizeQuideImageUrl.success))
                    throw new errors_1.BadRequestError('Image uploading failed');
                const productUrls = yield (0, uploadToCloudinary_1.uploadImageToCloudinary)(productImages);
                if (!(productUrls === null || productUrls === void 0 ? void 0 : productUrls.success))
                    throw new errors_1.BadRequestError("Image uploading failed");
                const proImages = (_a = productUrls === null || productUrls === void 0 ? void 0 : productUrls.results) === null || _a === void 0 ? void 0 : _a.map((image) => image === null || image === void 0 ? void 0 : image.url);
                const newVariants = JSON.parse(formData === null || formData === void 0 ? void 0 : formData.variants);
                console.log(formData);
                const newProductData = Object.assign(Object.assign({}, formData), { variants: newVariants, images: proImages, sizeguide: ((_b = sizeQuideImageUrl === null || sizeQuideImageUrl === void 0 ? void 0 : sizeQuideImageUrl.results[0]) === null || _b === void 0 ? void 0 : _b.url) || '' });
                return this.adminRepository.saveNewProductData(newProductData);
            }
            catch (err) {
                throw err;
            }
        });
    }
    getAllProductsForAdmin(query) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield this.adminRepository.getAllProductsForAdmin(query);
            }
            catch (err) {
                throw err;
            }
        });
    }
    changeProductStatus(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield this.adminRepository.updateProductStatus(id);
            }
            catch (err) {
                throw err;
            }
        });
    }
    deleteProductImage(proId, image) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield this.adminRepository.deleteProductImageById(proId, image);
            }
            catch (err) {
                throw err;
            }
        });
    }
    updateImage(proId, files) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            try {
                const upload = yield (0, uploadToCloudinary_1.uploadImageToCloudinary)(files);
                if (!(upload === null || upload === void 0 ? void 0 : upload.success))
                    throw new errors_1.BadRequestError("Image uploading failed");
                const image = (_a = upload === null || upload === void 0 ? void 0 : upload.results) === null || _a === void 0 ? void 0 : _a[0].url;
                if (!image)
                    throw new errors_1.BadRequestError("Something went wrong");
                return yield this.adminRepository.updateSingleProductImage(proId, image);
            }
            catch (err) {
                throw err;
            }
        });
    }
    deleteProduct(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield this.adminRepository.deleteProductById(id);
            }
            catch (err) {
                throw err;
            }
        });
    }
    getFrames() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield this.adminRepository.findFrames();
            }
            catch (err) {
                throw err;
            }
        });
    }
    updateProductFrame(proId, frameId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield productModel_1.default.findByIdAndUpdate(proId, { $set: { frame: frameId } }, { new: true });
            }
            catch (err) {
                throw err;
            }
        });
    }
    allCategories() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield this.adminRepository.findAllCategories();
            }
            catch (err) {
                throw err;
            }
        });
    }
    addBanner(files) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const image = yield (0, uploadToCloudinary_1.uploadImageToCloudinary)(files);
                if (!(image === null || image === void 0 ? void 0 : image.success))
                    throw new errors_1.BadRequestError("Failed to upload banner");
                const url = image === null || image === void 0 ? void 0 : image.results[0].url;
                const bannerData = {
                    image: url,
                    isVisible: true,
                };
                return yield this.adminRepository.createBanner(bannerData);
            }
            catch (err) {
                throw err;
            }
        });
    }
    getBanner() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield this.adminRepository.getBanner();
            }
            catch (err) {
                throw err;
            }
        });
    }
    deleteBanner(image) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield this.adminRepository.deleteBanner(image);
            }
            catch (err) {
                throw err;
            }
        });
    }
    updateSlideShow() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield this.adminRepository.updateSlideShow();
            }
            catch (err) {
                throw err;
            }
        });
    }
    updateBannerTime(time) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield this.adminRepository.updateBannerTime(time);
            }
            catch (err) {
                throw err;
            }
        });
    }
}
exports.AdminService = AdminService;
