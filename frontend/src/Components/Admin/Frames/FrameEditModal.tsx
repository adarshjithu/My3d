"use client";

import ButtonLoading from "@/Components/User/Loading/ButtonLoading";
import { updateProductFrame } from "@/fetures/admin/frameSlice";
import { IFrame } from "@/Interfaces/IFrame";
import { updateFrame } from "@/Services/adminService";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { shapes } from "./shapes";

interface IProps {
    setEditModal: React.Dispatch<React.SetStateAction<boolean>>;
    frame: IFrame;
}

const EditFrameModal = ({ setEditModal, frame }: IProps) => {
    const [frameName, setFrameName] = useState(frame?.frameName || "");
    const [image, setImage] = useState<any>(null);
    const [imagePreview, setImagePreview] = useState<string | null>(frame?.image || null);
    const [loading, setLoading] = useState(false);
    const [buttonDisable, setButtonDisable] = useState(true);
    const dispatch = useDispatch();
    const [shape, setShape] = useState(frame?.shape||"");

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setButtonDisable(false);
        const file = e.target.files?.[0];
        setImage(file);
        if (file) {
            setImage(file);
            setImagePreview(URL.createObjectURL(file));
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if ( !frameName) {
            toast.error("Invalid input");
        } else {
            const formData = new FormData();
            formData.append("frameName", frameName);
            formData?.append("id", frame?._id);
            image ? formData.append("image", image) : "";
            formData?.append('shape',shape)

            try {
                setLoading(true);
                const res = await updateFrame(formData);

                dispatch(updateProductFrame(res?.data?.data));
                setEditModal(false)
                setLoading(false);
                toast.success(res?.data?.message);
            } catch (error) {
                toast.error(error);
                setLoading(false);
            }
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow-lg w-full max-w-md">
                <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4 text-center">Edit Frame</h2>

                <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Frame Name Input */}
                    <div>
                        <label className="block text-gray-700 dark:text-gray-300 text-lg mb-2">Frame Name</label>
                        <input
                            type="text"
                            value={frameName}
                            onChange={(e) => {
                                setFrameName(e.target.value);
                                setButtonDisable(false);
                            }}
                            className="w-full p-3 border border-gray-300 rounded-lg dark:bg-gray-800 dark:border-gray-700 dark:text-white focus:ring-2 focus:ring-indigo-500"
                            required
                        />
                    </div>

                    {/* Image Upload */}
                    <div>
                        <label className="block text-gray-700 dark:text-gray-300 text-lg mb-2">Frame Image</label>
                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleImageChange}
                            className="w-full p-3 border border-gray-300 rounded-lg dark:bg-gray-800 dark:border-gray-700 dark:text-white focus:ring-2 focus:ring-indigo-500"
                      
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700 dark:text-gray-300 text-lg mb-2">Shape</label>
                        <select value={shape} id="shapes" onChange={(e)=>{setShape(e.target.value);setButtonDisable(false)}} className="mt-1 block w-full p-2 border rounded-md dark:bg-black">
                            <option value="">Select a shape</option>
                            {shapes?.map((shape, index) => (
                                <option key={index} value={shape}>
                                    {shape}
                                </option>
                            ))}
                        </select>
                    </div>
                    {/* Image Preview */}
                    {imagePreview && (
                        <div className="flex justify-center">
                            <img src={imagePreview} alt="Frame Preview" className="w-32 h-32 object-cover rounded-lg border mt-2" />
                        </div>
                    )}

                    {/* Buttons */}
                    <div className="flex justify-between mt-4">
                        <button
                            onClick={() => setEditModal(false)}
                            type="button"
                            className="px-4 py-2 text-gray-600 bg-gray-200 rounded-lg hover:bg-gray-300"
                        >
                            Cancel
                        </button>
                        <button
                            disabled={buttonDisable}
                            type="submit"
                            className={`px-6 py-2 ${buttonDisable ? "bg-indigo-100" : "bg-indigo-600"} text-white rounded-lg ${
                                !buttonDisable && "hover:bg-indigo-700"
                            }`}
                        >
                            {loading ? <ButtonLoading /> : "Update Frame"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EditFrameModal;
