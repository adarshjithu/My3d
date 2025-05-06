"use client";
import React, { useState, useEffect } from "react";
import { XIcon } from "lucide-react";
import toast from "react-hot-toast";
import { addBanner } from "@/Services/adminService";
import ButtonLoading from "@/Components/User/Loading/ButtonLoading";
import { useDispatch } from "react-redux";
import { setBannerData } from "@/fetures/admin/bannerSlice";

const AddBannerModal = ({ setShowAddBanner }: { setShowAddBanner: any }) => {
    const [image, setImage] = useState<File | null>(null);
    const [preview, setPreview] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();

    // Handle image change
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setImage(e.target.files[0]);
        }
    };

    const handleSubmit = async () => {
        try {
            const formData = new FormData();
            formData.append("image", image || "");
            setLoading(true);
            const res = await addBanner(formData);

            console.log(res?.data?.data?.banners);
            dispatch(setBannerData(res?.data?.data?.banners));
            setLoading(false);
            setShowAddBanner(false);
        } catch (error) {
            setLoading(false);
            toast.error(error);
        }
    };

    // Create and clean up object URL
    useEffect(() => {
        if (!image) return;

        const objectUrl = URL.createObjectURL(image);
        setPreview(objectUrl);

        return () => URL.revokeObjectURL(objectUrl); // Cleanup URL on unmount
    }, [image]);

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-60 z-50">
            <div className="bg-white w-[500px] p-8 rounded-lg shadow-lg relative z-60">
                {/* Close Button */}
                <button onClick={() => setShowAddBanner(false)} className="absolute top-4 right-4 text-gray-500 hover:text-gray-700">
                    <XIcon className="w-6 h-6" />
                </button>

                {/* Image Upload Section */}
                <div className="flex flex-col items-center space-y-6">
                    {preview ? (
                        <img src={preview} className="w-full h-56 object-cover rounded-md" alt="Banner Preview" />
                    ) : (
                        <label className="w-full h-56 bg-gray-200 rounded-md flex items-center justify-center text-gray-500 cursor-pointer text-lg font-medium">
                            Click to upload banner image
                            <input onChange={handleChange} type="file" className="hidden" />
                        </label>
                    )}

                    <button onClick={handleSubmit} className="px-5 py-3 bg-blue-500 text-white rounded-md hover:bg-blue-600 text-lg font-medium">
                        {loading ? <ButtonLoading /> : "Upload Image"}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AddBannerModal;
