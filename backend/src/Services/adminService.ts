import { BadRequestError } from "../Constants/errors";
import { IBase } from "../Interfaces/IBase";
import { ICategory } from "../Interfaces/ICategory";
import { IFrame } from "../Interfaces/IFrames";
import { IProduct } from "../Interfaces/IProductModel";
import { ISize } from "../Interfaces/ISize";
import Product from "../Models/productModel";
import { AdminRepository } from "../Repositories/adminRepository";
import { uploadImageToCloudinary } from "../Utils/uploadToCloudinary";

export class AdminService  {
    constructor(private adminRepository: AdminRepository) {}


    async getAllPackages() {
        try {
            return this.adminRepository.findAllPackages();
        } catch (err) {
            throw err;
        }
    }

    async addCategory(category: ICategory): Promise<ICategory | null> {
        try {
            return await this.adminRepository.createCategory(category);
        } catch (err) {
            throw err;
        }
    }
    async getCategories(id: string, page: string): Promise<ICategory[] | null> {
        try {
            return await this.adminRepository.findCategories(id, page);
        } catch (err) {
            throw err;
        }
    }
    async editCategory(category: ICategory): Promise<ICategory | null> {
        try {
            return await this.adminRepository.updateCategory(category as ICategory);
        } catch (err) {
            throw err;
        }
    }
    async deleteCategory(id: string): Promise<ICategory | null> {
        try {
            return await this.adminRepository.deleteCategoryById(id as string);
        } catch (err) {
            throw err;
        }
    }
    async addSize(size: string): Promise<Record<string, any> | null> {
        try {
            return await this.adminRepository.createSize(size as string);
        } catch (err) {
            throw err;
        }
    }
    async getSizes(page: string, search: string): Promise<ISize[] | null> {
        try {
            return await this.adminRepository.findAllSize(page, search);
        } catch (err) {
            throw err;
        }
    }
    async deleteSize(id: string): Promise<Record<string, any> | null> {
        try {
            return await this.adminRepository.deleteSizeById(id);
        } catch (err) {
            throw err;
        }
    }
    async updateSize(size: string, id: string): Promise<Record<string, any> | null> {
        try {
            return await this.adminRepository.updateSizeById(size, id);
        } catch (err) {
            throw err;
        }
    }
    async createBase(base: string): Promise<Record<string, any> | null> {
        try {
            return await this.adminRepository.createBase(base);
        } catch (err) {
            throw err;
        }
    }
    async deleteBase(id: string): Promise<Record<string, any> | null> {
        try {
            return await this.adminRepository.deleteBaseById(id);
        } catch (err) {
            throw err;
        }
    }
    async updateBase(base: string, id: string): Promise<Record<string, any> | null> {
        try {
            console.log(base, id);
            return await this.adminRepository.updateBaseById(base, id);
        } catch (err) {
            throw err;
        }
    }
    async getBase(page: string, search: string): Promise<IBase[] | null> {
        try {
            return await this.adminRepository.getAllBase(page, search);
        } catch (err) {
            throw err;
        }
    }
    async uploadFrame(files: any, frameName: string,shape:string): Promise<IFrame | null> {
        try {
            const res = await uploadImageToCloudinary(files);

            if (!res?.success) throw new BadRequestError("Failed to upload frames");
            const images: any = res?.results;
            if (!images || images.length == 0) throw new BadRequestError("Something went wrong");
            const image = images[0]?.url;

            return await this.adminRepository.createFrame(image, frameName,shape);
        } catch (err) {
            throw err;
        }
    }
    async getAllFrames(page: string, search: string): Promise<Record<string, any> | null> {
        try {
            return await this.adminRepository.findAllFrames(page, search);
        } catch (err) {
            throw err;
        }
    }
    async deleteFrame(id: string): Promise<IFrame | null> {
        try {
            return await this.adminRepository.deleteFrameById(id);
        } catch (err) {
            throw err;
        }
    }
    async updateFrame(data: { id: string; frameName: string,shape:string }, files: any): Promise<IFrame | null> {
        try {
            if (files.length !== 0) {
                const res = await uploadImageToCloudinary(files);

                if (!res?.success) throw new BadRequestError("Failed to upload frames");
                const images: any = res?.results;
                if (!images || images.length == 0) throw new BadRequestError("Something went wrong");
                const image = images[0]?.url;

                return await this.adminRepository.updateFramesById({ frameName: data?.frameName,shape:data.shape, image: image }, data?.id);
            } else {
                return await this.adminRepository.updateFramesById({ frameName: data?.frameName,shape:data?.shape }, data?.id);
            }
        } catch (err) {
            throw err;
        }
    }

    async getAddProductsOptions(): Promise<Record<string, any> | null> {
        try {
            return await this.adminRepository.getAllSizeBaseCategoriesFrames();
        } catch (err) {
            throw err;
        }
    }
    async addProduct(formData: any, files: any): Promise<any> {
        try {
            const productImages = [];
            const sizeGuideImage = [];
            for (let i of files) {
                if (i?.fieldname == "sizeguide") sizeGuideImage.push(i);
                else productImages.push(i);
            }

            

            const sizeQuideImageUrl:any = await uploadImageToCloudinary(sizeGuideImage);
            if(!sizeQuideImageUrl?.success) throw new BadRequestError('Image uploading failed');

            const productUrls = await uploadImageToCloudinary(productImages);

            if(!productUrls?.success) throw new BadRequestError("Image uploading failed");


             const proImages = productUrls?.results?.map((image:any)=>image?.url)
            
           

             const newVariants = JSON.parse(formData?.variants);
            console.log(formData)
            const newProductData = {
                ...formData,
                variants: newVariants,
                images: proImages,
                sizeguide:sizeQuideImageUrl?.results[0]?.url||''
            };

             return this.adminRepository.saveNewProductData(newProductData);
        } catch (err) {
            throw err;
        }
    }

    async getAllProductsForAdmin(query:any): Promise<IProduct[] | null> {
        try {
            return await this.adminRepository.getAllProductsForAdmin(query);
        } catch (err) {
            throw err;
        }
    }
    async changeProductStatus(id:string): Promise<any> {
        try {
            return await this.adminRepository.updateProductStatus(id)
        } catch (err) {
            throw err;
        }
    }
    async deleteProductImage(proId:string,image:string): Promise<Record<string,any>|null> {
        try {
            return await this.adminRepository.deleteProductImageById(proId,image)
        } catch (err) {
            throw err;
        }
    }
    async updateImage(proId:string,files:any): Promise<Record<string,any>|null> {
        try {
            const upload:any =  await uploadImageToCloudinary(files);
            if(!upload?.success) throw new BadRequestError("Image uploading failed")
             const image =  upload?.results?.[0].url;
             if(!image) throw new BadRequestError("Something went wrong");
             return await this.adminRepository.updateSingleProductImage(proId,image)

        } catch (err) {
            throw err;
        }
    }
    async deleteProduct(id:string): Promise<IProduct|null> {
        try {
             return await this.adminRepository.deleteProductById(id)

        } catch (err) {
            throw err;
        }
    }
    async getFrames(): Promise<IFrame[]|null> {
        try {
             return await this.adminRepository.findFrames()

        } catch (err) {
            throw err;
        }
    }
    async updateProductFrame(proId: string, frameId: string): Promise<Record<string, any> | null> {
        try {
            return await Product.findByIdAndUpdate(
                proId, 
                { $set: { frame: frameId } }, 
                { new: true }
            );
        } catch (err) {
            throw err;
        }
    }
    async allCategories(): Promise<ICategory[] | null> {
        try {
            return await this.adminRepository.findAllCategories()
        } catch (err) {
            throw err;
        }
    }
    async addBanner(files:any): Promise<Record<string,any>|null> {
        try {
           const image:any =  await uploadImageToCloudinary(files);
           if(!image?.success) throw new BadRequestError("Failed to upload banner");
           const url = image?.results[0].url
           const bannerData ={
            image:url,
            isVisible:true,
           }

           return await this.adminRepository.createBanner(bannerData)

        } catch (err) {
            throw err;
        }
    }

    async getBanner(): Promise<Record<string,any>| null> {
        try {
            return await this.adminRepository.getBanner()
        } catch (err) {
            throw err;
        }
    }
    async deleteBanner(image:string): Promise<Record<string,any>| null> {
        try {
            return await this.adminRepository.deleteBanner(image)
        } catch (err) {
            throw err;
        }
    }
    async updateSlideShow(): Promise<Record<string,any>| null> {
        try {
            return await this.adminRepository.updateSlideShow()
        } catch (err) {
            throw err;
        }
    }
    async updateBannerTime(time:string): Promise<Record<string,any>| null> {
        try {
            return await this.adminRepository.updateBannerTime(time)
        } catch (err) {
            throw err;
        }
    }
    
}
