import ButtonLoading from "@/Components/User/Loading/ButtonLoading";
import { addCategory, updateCategory } from "@/fetures/admin/categorySlice";
import { ICategory } from "@/Interfaces/ICategory";
import { createCategory, editCategoryData } from "@/Services/adminService";
import { categorySchema } from "@/Utils/error/categorySchema";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";

function EditCategoryModal({ setEditFormModal, category }: { setEditFormModal: React.Dispatch<React.SetStateAction<boolean>>; category: any }) {
    const [formData, setFormData] = useState(category || { name: "", description: "" });
    const [error, setError] = useState({ name: "", description: "" });
    const [loading, setLoading] = useState(false);
    const [changed,setChanged] = useState(false)
    const dispatch = useDispatch();
    const handleChange = (e: any) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        setError({ ...error, [e.target.name]: "" });
        setChanged(true)
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await categorySchema.validate(formData, { abortEarly: false });
            editOldCategory();
        } catch (err: any) {
            const validationErrors: any = {};
            if (err.inner) {
                err.inner.forEach((error: any) => {
                    validationErrors[error.path] = error.message;
                });
            }
            // User validation failed errors
            setError(validationErrors);
        }
    };

    const editOldCategory = async () => {
        try {
            if(!changed) {
                toast.error("No changes detected. Please modify the content before saving.")
                return ;
            }
            setChanged(false)
            setLoading(true);
            const res = await editCategoryData(formData);
         
            dispatch(updateCategory(res?.data?.data))

             setEditFormModal(false)
            setLoading(false);
        } catch (error) {
            toast.error(error);
            setLoading(false);
        }
    };
    return (
        <div className="fixed inset-0 z-50 bg-gray-500 bg-opacity-75 flex items-center justify-center">
            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg w-96 relative">
                {/* Close Button */}
                <button
                    onClick={() => setEditFormModal((prev: boolean) => !prev)}
                    className="absolute top-4 right-4 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
                >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>

                <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-200 mb-4">Add New Category</h2>

                <div>
                    <label className="block text-sm text-gray-700 dark:text-gray-400 mb-2">Category Name</label>
                    {error?.name && <span className="text-[red]">{error?.name}</span>}
                    <input
                        type="text"
                        name="name"
                        value={formData?.name}
                        onChange={handleChange}
                        className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 p-2.5 mb-4"
                        placeholder="Enter category name"
                    />
                </div>

                <div>
                    <label className="block text-sm text-gray-700 dark:text-gray-400 mb-2">Description</label>
                    {error?.description && <span className="text-[red]">{error?.description}</span>}
                    <textarea
                        name="description"
                        value={formData?.description}
                        onChange={handleChange}
                        className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 p-2.5 mb-4"
                        placeholder="Enter category description"
                    />
                </div>

                <div className="flex justify-end space-x-2">
                    <button className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300">Cancel</button>
                    <button
                        onClick={handleSubmit}
                        className="text-white bg-blue-500 border border-blue-500 hover:bg-green-600 focus:outline-none focus:ring-4 focus:ring-green-200 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-green-600 dark:border-green-500 dark:hover:bg-green-700 dark:focus:ring-green-800"
                    >
                        {loading ? <ButtonLoading /> : "Edit Category"}
                    </button>
                </div>
            </div>
        </div>
    );
}

export default EditCategoryModal;
