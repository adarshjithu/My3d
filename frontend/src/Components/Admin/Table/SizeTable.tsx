"use client";
import React, { useEffect, useState } from "react";
import SizeTableHeader from "../Size/SizeTableHeader";
import toast from "react-hot-toast";
import { deleteProductSize, getSize } from "@/Services/adminService";
import { useDispatch, useSelector } from "react-redux";
import { IRootState } from "@/Store/store";
import { ISize } from "@/Interfaces/ISize";
import { deleteSize, setSizes } from "@/fetures/admin/sizeSlice";
import { Trash } from "lucide-react";
import CommonDeleteModal from "../Modals/DeleteSizeModal";
import EditSizeModal from "../Size/EditSizeModal";

function SizeTable() {
    const [page, setPage] = useState(1);
    const [search, setSearch] = useState("");
    const sizes = useSelector((data: IRootState) => data?.size?.sizes);
    const dispatch = useDispatch();
    const [deleteModal, setDeleteModa] = useState(false);
    const [size, setSize] = useState<any>({});
    const [editModal,setEditModal] = useState(false)
    const handleDelete = (sizeData: ISize) => {
        setSize(sizeData);
        setDeleteModa(true)
    };

    const handleEdit =(sizeData:ISize)=>{
         setSize(sizeData);
         setEditModal(true)
    }

    const handleDeleteSuccess =async (action:boolean)=>{
        if(action){
        try{
           const res = await deleteProductSize(size._id);
           if(res?.data?.success){
            toast.success(res?.data?.message);
            setDeleteModa(false)
            dispatch(deleteSize(size?._id))
           }
        }catch(error){
             toast.error(error)
        }
    
        }else{
            setDeleteModa(false)
        }
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await getSize(page, search);

                dispatch(setSizes(res?.data?.data[0]?.sizes));
            } catch (error) {
                toast.error(error);
            }
        };
        fetchData();
    }, []);
    return (
        <div className="relative overflow-x-auto">
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <SizeTableHeader />
                {deleteModal&&<CommonDeleteModal setDeleteModal={setDeleteModa} handleDeleteSuccess={handleDeleteSuccess}/>}
                {editModal&&<EditSizeModal setEditModal={setEditModal} size={size}/>}
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        <th scope="col" className="px-6 py-3">
                            No
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Size
                        </th>
                        <th scope="col" className="px-6 py-3">
                            CreatedAt
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Actions
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {sizes?.map((size: ISize, id: number) => {
                        return (
                            <tr key={size?._id} className="cursor-pointer group bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200">
                                <td onClick={()=>handleEdit(size)} className="px-6 py-4 group-hover:text-blue-500">{id + 1}</td>
                                <td onClick={()=>handleEdit(size)} className="px-6 py-4 group-hover:text-blue-500">{size?.size}</td>
                                <td  onClick={()=>handleEdit(size)} className="px-6 py-4 group-hover:text-blue-500">{new Date(size?.createdAt).toDateString()}</td>
                                <td   className="px-6 py-4 flex justify-center items-center text-right group-hover:text-blue-500">
                                    <button onClick={() => handleDelete(size)}>
                                        <Trash className="w-5 h-5 text-red-500" />
                                    </button>
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
}

export default SizeTable;
