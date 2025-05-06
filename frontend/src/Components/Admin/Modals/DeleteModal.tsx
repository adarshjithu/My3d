import { deleteCategory } from "@/fetures/admin/categorySlice";
import { ICategory } from "@/Interfaces/ICategory";
import { deleteCategoryData } from "@/Services/adminService";
import React from "react";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";

function DeleteModal({category,setDeleteModal}:{category:any;setDeleteModal:React.Dispatch<React.SetStateAction<boolean>>}) {
    const dispatch = useDispatch()
    const handleDelete = async()=>{
          try{
            const res = await deleteCategoryData(category?._id);
            if(res?.data?.data){
                   dispatch(deleteCategory(res?.data?.data?._id));
                   setDeleteModal(false)
                   toast.success(res?.data.message)
            }
         
          }catch(error){
            toast.error(error)
          }
    }
    return (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center">
            <div className="bg-white p-6 rounded-lg shadow-lg w-96">
                <h2 className="text-xl font-semibold text-center mb-4">Delete Confirmation</h2>
                <p className="text-center mb-6">Are you sure you want to delete this item? This action cannot be undone.</p>
                <div className="flex justify-between">
                    <button
                        onClick={()=>setDeleteModal(false)}
                        className="bg-gray-300 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-400"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleDelete}
                        className="bg-red-600 text-white py-2 px-4 rounded-md hover:bg-red-700"
                    >
                        Delete
                    </button>
                </div>
            </div>
        </div>
    );
}

export default DeleteModal;
