"use client";

import React, { useEffect, useState } from "react";
import BaseTableHeader from "./BaseTableHeader";
import toast from "react-hot-toast";
import { deleteBase, getBase } from "@/Services/adminService";
import { useDispatch, useSelector } from "react-redux";
import { deleteBaseData, setBases } from "@/fetures/admin/baseSlice";
import { IRootState } from "@/Store/store";
import { IBase } from "@/Interfaces/IBase";
import { Trash } from "lucide-react";
import CommonDeleteModal from "../Modals/DeleteSizeModal";
import EditBaseModal from "./BaseEditModal";

function BaseTable() {
    const [page, setPage] = useState(1);
    const [search, setSearch] = useState("");
    const dispatch = useDispatch();
    const baseData = useSelector((data: IRootState) => data?.base?.bases);
    const [base, setBase] = useState<any>();
    const [deleteModal, setDeleteModal] = useState(false);
    const [editModal,setEditModal] = useState(false)
    const handleDelete = (baseInfo: IBase) => {
        setBase(baseInfo);
        setDeleteModal(true);
    };

    const handleEdit = (baseInfo: IBase) => {
        setBase(baseInfo)
        setEditModal(true)
    };

    const handleDeleteSuccess =async (action: boolean) => {
        if (!action) {
            setDeleteModal(false);
        } else {
            const res = await deleteBase(base?._id);
           dispatch(deleteBaseData(res?.data?.data?._id));
           toast.success(res?.data?.message);
           setDeleteModal(false)
        }
    };
    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await getBase(page, search);
                dispatch(setBases(res?.data?.data[0].bases));
            } catch (error) {
                toast.error(error);
            }
        };

        fetchData();
    }, []);
    return (
        <div>
            <div className="relative overflow-x-auto">
                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    <BaseTableHeader />
                    {editModal&&<EditBaseModal setEditModal={setEditModal} base={base}/>}
                    {deleteModal && <CommonDeleteModal setDeleteModal={setDeleteModal} handleDeleteSuccess={handleDeleteSuccess} />}
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" className="px-6 py-3">
                                No
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Base
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
                        {baseData?.map((base: IBase, id: number) => {
                            return (
                                <tr
                                    key={base?._id}
                                    className="cursor-pointer group bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200"
                                >
                                    <td onClick={() => handleEdit(base)} className="px-6 py-4 group-hover:text-blue-500">
                                        {id + 1}
                                    </td>
                                    <td onClick={() => handleEdit(base)} className="px-6 py-4 group-hover:text-blue-500">
                                        {base?.base}
                                    </td>
                                    <td onClick={() => handleEdit(base)} className="px-6 py-4 group-hover:text-blue-500">
                                        {new Date(base?.createdAt).toDateString()}
                                    </td>
                                    <td className="px-6 py-4 flex justify-center items-center text-right group-hover:text-blue-500">
                                        <button onClick={() => handleDelete(base)}>
                                            <Trash className="w-5 h-5 text-red-500" />
                                        </button>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default BaseTable;
