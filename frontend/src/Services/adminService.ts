import { ICategory } from "@/Interfaces/ICategory";
import API, { errorHandler } from "./api";

export const createCategory = async (data: { name: string; description: string }) => {
    try {
        const response = await API.post("/admin/category", data);
        return response;
    } catch (error) {
        return errorHandler(error);
    }
};
export const getAllCategories = async (id: string, page: any) => {
    try {
        const response = await API.get(`/admin/category?id=${id}&page=${page}`);
        return response;
    } catch (error) {
        return errorHandler(error);
    }
};
export const editCategoryData = async (data: ICategory) => {
    try {
        const response = await API.put(`/admin/category`, data);
        return response;
    } catch (error) {
        return errorHandler(error);
    }
};
export const deleteCategoryData = async (id: string) => {
    try {
        const response = await API.delete(`/admin/category?id=${id}`);
        return response;
    } catch (error) {
        return errorHandler(error);
    }
};
export const addSize = async (size: string) => {
    try {
        const response = await API.post(`/admin/products/size`, { size: size });
        return response;
    } catch (error) {
        return errorHandler(error);
    }
};
export const getSize = async (page: number, search: string) => {
    try {
        const response = await API.get(`/admin/products/size?page=${page}&search=${search}`);
        return response;
    } catch (error) {
        return errorHandler(error);
    }
};
export const deleteProductSize = async (id: string) => {
    try {
        const response = await API.delete(`/admin/products/size?id=${id}`);
        return response;
    } catch (error) {
        return errorHandler(error);
    }
};
export const updateProductSize = async (size: string, id: string) => {
    try {
        const response = await API.put(`/admin/products/size`, { size: size, id: id });
        return response;
    } catch (error) {
        return errorHandler(error);
    }
};
export const addBase = async (base: string) => {
    try {
        const response = await API.post(`/admin/products/base`, { base: base });
        return response;
    } catch (error) {
        return errorHandler(error);
    }
};
export const deleteBase = async (id: string) => {
    try {
        const response = await API.delete(`/admin/products/base?id=${id}`);
        return response;
    } catch (error) {
        return errorHandler(error);
    }
};
export const updateBase = async (id: string, base: string) => {
    try {
        const response = await API.put(`/admin/products/base`, { base: base, id: id });
        return response;
    } catch (error) {
        return errorHandler(error);
    }
};
export const getBase = async (page: number, search: string) => {
    try {
        const response = await API.get(`/admin/products/base?page=${page}&search=${search}`);
        return response;
    } catch (error) {
        return errorHandler(error);
    }
};
export const uploadFrame = async (formData: any) => {
    try {
        const response = await API.post(`/admin/products/frame`, formData);
        return response;
    } catch (error) {
        return errorHandler(error);
    }
};
export const getAllFrames = async (page: number, search: string) => {
    try {
        const response = await API.get(`/admin/products/frames?page=${page}&search=${search}`);
        return response;
    } catch (error) {
        return errorHandler(error);
    }
};
export const updateFrame = async (formData: any) => {
    try {
        const response = await API.put(`/admin/products/frame`, formData);
        return response;
    } catch (error) {
        return errorHandler(error);
    }
};

export const deleteFrame = async (id: string) => {
    try {
        const response = await API.delete(`/admin/products/frame/${id}`);
        return response;
    } catch (error) {
        return errorHandler(error);
    }
};
export const getDataForAddProduct = async () => {
    try {
        const response = await API.get(`/admin/products/add/option`);
        return response;
    } catch (error) {
        return errorHandler(error);
    }
};
export const addNewProduct = async (formData: any) => {
    try {
        const response = await API.post(`/admin/product`, formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });
        return response;
    } catch (error) {
        return errorHandler(error);
    }
};
export const getAllProducts = async (category:string,page:string,search:string,status:string) => {
    try {
        const response = await API.get(`/admin/products`,{params:{category,page,search,status
    
        }});
        return response;
    } catch (error) {
        return errorHandler(error);
    }
};
export const updateProductStatus = async (id:string) => {
    try {
        const response = await API.patch(`/admin/products/status/${id}`);
        return response;
    } catch (error) {
        return errorHandler(error);
    }
};
export const deleteProductImage = async (proId:string,image:string) => {
    try {
        const response = await API.delete(`/admin/products/image?proId=${proId}&image=${image}`);
        return response;
    } catch (error) {
        return errorHandler(error);
    }
};
export const updateProductImage = async (formData:any) => {
    try {
        const response = await API.put(`/admin/product/image`,formData);
        return response;
    } catch (error) {
        return errorHandler(error);
    }
};
export const deleteProductById = async (id:string) => {
    try {
        const response = await API.delete(`/admin/product/${id}`);
        return response;
    } catch (error) {
        return errorHandler(error);
    }
};
export const findAllFrames = async () => {
    try {
        const response = await API.get(`/admin/product/frames/all`);
        return response;
    } catch (error) {
        return errorHandler(error);
    }
};
export const updateProductFrame= async (proId:string,frameId:string) => {
    try {
        
        const response = await API.put(`/admin/product/frame`,{proId:proId,frameId:frameId});
        return response;
    } catch (error) {
        return errorHandler(error);
    }
};
export const findAllCategories= async () => {
    try {
        
        const response = await API.get(`/admin/products/category`);
        return response;
    } catch (error) {
        return errorHandler(error);
    }
};
export const addBanner= async (formData:any) => {
    try {
        
        const response = await API.post(`/admin/banner`,formData,{
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });
        return response;
    } catch (error) {
        return errorHandler(error);
    }
};
export const getBanner= async () => {
    try {
        
        const response = await API.get(`/admin/banner`);
        return response;
    } catch (error) {
        return errorHandler(error);
    }
};
export const deleteBanner= async (image:string) => {
    try {
        
        const response = await API.delete(`/admin/banner?image=${image}`);
        return response;
    } catch (error) {
        return errorHandler(error);
    }
};
export const toggleSlideshow= async () => {
    try {
        
        const response = await API.patch(`/admin/banner/slideshow`);
        return response;
    } catch (error) {
        return errorHandler(error);
    }
};
export const updateBannertime= async (time:string) => {
    try {
        
        const response = await API.patch(`/admin/banner/time?time=${time}`);
        return response;
    } catch (error) {
        return errorHandler(error);
    }
};
