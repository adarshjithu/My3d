"use client";
import React, { useEffect, useState } from "react";
import FrameTableHeader from "./FrameTableHeader";
import { useDispatch, useSelector } from "react-redux";
import { IRootState } from "@/Store/store";
import { IFrame } from "@/Interfaces/IFrame";
import { deleteFrame, getAllFrames } from "@/Services/adminService";
import { deleteProductFrame, setProductFrame } from "@/fetures/admin/frameSlice";
import ImageViewModal from "./ImageViewModal";
import { Trash, EditIcon } from "lucide-react";
import CommonDeleteModal from "../Modals/DeleteSizeModal";
import toast from "react-hot-toast";
import EditFrameModal from "./FrameEditModal";
function FrameTable() {
    const frames = useSelector((data: IRootState) => data?.frame?.frames);
    const [page, setPage] = useState(1);
    const [search, setSearch] = useState("");
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);
    const [fetch, setFetch] = useState(false);
    const [imageViewModal, setImageViewModal] = useState(false);
    const [debounceTimeout, setDebounceTimeout] = useState<NodeJS.Timeout | null>(null);
    const [frame, setFrame] = useState<any>();
    const [deleteModal, setDeleteModal] = useState(false);
    const [editModal, setEditModal] = useState(false);

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearch(e.target.value);
        setLoading(true);

        // // Clear the previous debounce timeout
        if (debounceTimeout) {
            clearTimeout(debounceTimeout);
        }

        const newTimeout = setTimeout(() => {
            setFetch(!fetch);
        }, 500); // 500ms delay before making the API call

        setDebounceTimeout(newTimeout);
    };

    const handleDelete = (frameData: IFrame) => {
        setFrame(frameData);
        setDeleteModal(true);
    };
    const handleDeleteSuccess = async (action: boolean) => {
        if (!action) {
            setDeleteModal(false);
        } else {
            try {
                const res = await deleteFrame(frame?._id);

                dispatch(deleteProductFrame(res?.data?.data?._id));
                setDeleteModal(false);
            } catch (error) {
                toast.error(error);
            }
        }
    };

    const handleEdit = (frame: IFrame) => {
        setFrame(frame);
        setEditModal(true);
    };
    useEffect(() => {
        const fetchData = async () => {
            const res = await getAllFrames(page, search);
            console.log(res?.data?.data);
            dispatch(setProductFrame(res?.data?.data[0].frames));
        };
        fetchData();
    }, [fetch]);

    return (
        <div>
            <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    <FrameTableHeader handleSearch={handleSearch} />
                    {editModal && <EditFrameModal setEditModal={setEditModal} frame={frame} />}
                    {deleteModal && <CommonDeleteModal handleDeleteSuccess={handleDeleteSuccess} setDeleteModal={setDeleteModal} />}
                    {imageViewModal && <ImageViewModal setImageViewModal={setImageViewModal} image={frame?.image} />}
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" className="px-6 py-3">
                                No
                            </th>
                            <th scope="col" className="px-6 py-3">
                                FrameName
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Image
                            </th>
                            <th scope="col" className="px-6 py-3">
                                createdAt
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Actions
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {frames?.map((frame: IFrame, id: number) => {
                            return (
                                <tr
                                    key={frame?._id}
                                    className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700 border-gray-200"
                                >
                                    <td className="px-6 py-4">{id}</td>
                                    <td className="px-6 py-4">{frame?.frameName}</td>
                                    <td className="px-6 py-4">
                                        <img
                                            onClick={() => {
                                                setFrame(frame);
                                                setImageViewModal(true);
                                            }}
                                            src={frame?.image}
                                            className="w-[35px] h-[35px] cursor-pointer"
                                            alt=""
                                        />
                                    </td>
                                    <td className="px-6 py-4">{new Date(frame?.createdAt).toDateString()}</td>
                                    <td className="px-6 py-4 flex flex-row">
                                        <a
                                            onClick={() => handleEdit(frame)}
                                            className="font-medium  text-blue-600 dark:text-blue-500 hover:underline"
                                        >
                                            <EditIcon className="w-5 h-5 text-blue-500" />
                                        </a>
                                        <a
                                            onClick={() => handleDelete(frame)}
                                            className="font-medium ml-4 text-blue-600 dark:text-blue-500 hover:underline"
                                        >
                                            <Trash className="w-5 h-5 text-red-500" />
                                        </a>
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

export default FrameTable;
