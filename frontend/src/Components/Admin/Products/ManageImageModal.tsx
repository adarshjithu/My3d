import { IProduct } from "@/Interfaces/IProduct";
import { deleteProductImage, updateProductImage } from "@/Services/adminService";
import React, { useState } from "react";
import toast from "react-hot-toast";
import DeleteImageModal from "./DeleteImageModal";
import { useDispatch } from "react-redux";
import { updateProductData } from "@/fetures/admin/productSlice";
import ButtonLoading from "@/Components/User/Loading/ButtonLoading";

const ImageManagementModal = ({ setProduct, product, setImageModal }: { product: IProduct; setImageModal: any; setProduct: any }) => {
    const [image, setImage] = useState("");
    const [deleteModal, setDeleteModal] = useState(false);
    const [selectedImage, setSelectedImage] = useState<any>(); // State to store selected image
    const dispatch = useDispatch()
    const [loading,setLoading] =useState(false)
    const deleteImage = async (image: string) => {
        setImage(image);
        setDeleteModal(true);
    };

    const handleSuccess = async (action: boolean) => {
        if (action) {
            try {
                if(product?.images?.length<=1){
                    toast.error("You can't delete last image")
                    
                }else{
                   
                    const res = await deleteProductImage(product?._id, image);
                    if (res?.data?.success) {
                        const newImages = product?.images?.filter((obj: string) => obj !== image);
                      const newProduct = { ...product, images: newImages }
                      dispatch(updateProductData(newProduct))
                      setProduct(newProduct)
                        setDeleteModal(false);
                    }
                  
                }
            } catch (error) {
                
                toast.error(error);
            }
        } else {
            setDeleteModal(false);
        }
    };

    // Handle file input change to preview the selected image
    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            const file = e.target.files[0];
            if (file) {
                setSelectedImage(file);
            }
        }
    };


    const handleSubmit =async()=>{
        try{
            const formData = new FormData();
            formData.append('image',selectedImage);
            formData.append("proId",product?._id)
            setLoading(true)
            const res = await updateProductImage(formData);
            
            setProduct({...product,images:res?.data.data?.images})
            dispatch(updateProductData({...product,images:res?.data?.data?.images}))
            setLoading(false)
            setImageModal(false)
        }catch(error){
            setLoading(false)
            toast.error(error)
        }
    } 

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
            {deleteModal && <DeleteImageModal handleSuccess={handleSuccess} />}
            <div className="bg-white w-full max-w-4xl md:max-w-2xl lg:max-w-3xl xl:max-w-4xl rounded-xl shadow-lg p-6 space-y-6 overflow-y-auto max-h-screen">
                <h2 className="text-2xl font-semibold text-gray-800 text-center">Manage Product Images</h2>

                {/* Image display section */}
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mb-6">
                    {product?.images?.map((imageUrl: string, index: number) => (
                        <div key={index} className="relative group">
                            <img
                                src={imageUrl}
                                alt={`Product Image ${index + 1}`}
                                className="w-full h-40 object-cover rounded-lg transition-all duration-300 ease-in-out transform group-hover:scale-105"
                            />
                            <button
                                onClick={() => deleteImage(imageUrl)}
                                className="absolute top-2 right-2 bg-red-600 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                            >
                                ❌
                            </button>
                        </div>
                    ))}
                </div>

                {/* Add New Image Section */}
                <div className="space-y-4">
                    <label htmlFor="image-upload" className="block text-sm font-medium text-gray-700">
                        Add New Image
                    </label>
                    <input
                        type="file"
                        id="image-upload"
                        accept="image/*"
                        className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-200"
                        onChange={handleImageChange} // Handle the image selection
                    />
                

                    {/* Display selected image preview below the input */}
                    {selectedImage && (
                        <div className="mt-4">
                            <h3 className="text-sm font-medium text-gray-700 mb-2">Selected Image Preview:</h3>
                            <img
                                src={URL.createObjectURL(selectedImage)}
                                alt="Selected Preview"
                                className="w-32 h-32 object-cover rounded-lg mx-auto" // Make the image smaller
                            />
                        </div>
                    )}
                </div>

                {/* Modal buttons */}
                <div className="mt-6 flex justify-between space-x-4">
                    <button
                        onClick={() => setImageModal(false)}
                        className="px-6 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition duration-200"
                    >
                        Close
                    </button>
                    <button onClick={handleSubmit} className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition duration-200">
                        {loading?<ButtonLoading/>:"Upload Image"}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ImageManagementModal;
