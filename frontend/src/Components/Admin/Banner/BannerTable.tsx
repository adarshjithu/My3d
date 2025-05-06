"use client";
import React, { useEffect, useState } from "react";
import { EditIcon, TrashIcon, PlusIcon, PowerIcon, EyeIcon, XIcon } from "lucide-react";
import AddBannerModal from "./AddBannerModal";
import { deleteBanner, getBanner, toggleSlideshow, updateBannertime } from "@/Services/adminService";
import { useDispatch, useSelector } from "react-redux";
import { IRootState } from "@/Store/store";
import { setAllBannerData, setBannerData } from "@/fetures/admin/bannerSlice";
import CommonDeleteModal from "../Modals/CommonDeleteModal";
import toast from "react-hot-toast";

const BannerManagement: React.FC = () => {
    const [showAddBanner, setShowAddBanner] = useState(false);
    const [viewImage, setViewImage] = useState<string | null>(null);
    const [time, setTime] = useState(0); // To handle time range
    const [isActive, setIsActive] = useState(false); // To handle on/off toggle
    const dispatch = useDispatch();
    const banners = useSelector((data: IRootState) => data?.banner?.banner);
    const [deleteModal, setDeleteModal] = useState(false);
    const [banner, setBanner] = useState<any>(""); // Banner to delete
    const [loading, setLoading] = useState(false);

    const handleDelete = (data: any) => {
        setDeleteModal(true);
        setBanner(data);
    };

    const handleSuccess = async (action: boolean) => {
        if (!action) {
            setDeleteModal(false);
        } else {
            try {
                setLoading(true);
                const res = await deleteBanner(banner?.image);
                setLoading(false);
                const newBanners = banners?.filter((obj: any) => obj?.image !== banner?.image);
                dispatch(setBannerData(newBanners));
                setDeleteModal(false);
            } catch (error) {
                setLoading(false);
                toast.error(error);
            }
        }
    };



    const changeSlideshow = async () => {
        try {
            const res = await toggleSlideshow();

            if (res?.data?.data?.modifiedCount == 1) {
                setIsActive(!isActive);
            }
        } catch (error) {
            toast.error(error);
        }
    };

    const applyTime = async () => {
        try {
            const res = await updateBannertime(String(time));
        } catch (error) {
            toast.error(error);
        }
    };
    useEffect(() => {
        const fetchData = async () => {
            const res = await getBanner();
            dispatch(setBannerData(res?.data?.data?.banners));
            setIsActive(res?.data?.data?.isSlide);
            setTime(res?.data?.data?.time);
        };

        fetchData();
    }, []);

    return (
        <div className="p-6 bg-white dark:bg-black">
            {showAddBanner && <AddBannerModal setShowAddBanner={setShowAddBanner} />}
            {deleteModal && <CommonDeleteModal loading={loading} handleSuccess={handleSuccess} item={"Banner"} />}

            <div className="p-6 bg-white dark:bg-black shadow-lg rounded-lg mb-6">
                {/* Header Section */}
                <div className="flex justify-between items-center mb-6">
                    {/* Add New Banner Button */}
                    <button
                        onClick={() => setShowAddBanner(true)}
                        className="flex items-center justify-center w-14 h-14 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-full hover:scale-105 transition-transform duration-300 shadow-lg"
                    >
                        <PlusIcon className="w-7 h-7" />
                    </button>

                    {/* Time Range Slider */}
                    <div className="flex items-center space-x-4 bg-gray-100 dark:bg-gray-800 p-3 rounded-lg shadow-md">
                        <label htmlFor="timeRange" className="text-lg font-semibold text-gray-700 dark:text-white">
                            Time: {time} ms
                        </label>
                        <input
                            type="range"
                            id="timeRange"
                            min="200"
                            max="10000"
                            value={time}
                            onChange={(e) => setTime(Number(e.target.value))}
                            className="w-40 bg-gray-200 dark:bg-gray-600 rounded-full"
                        />
                        <button onClick={applyTime} className="text-blue-500 dark:text-blue-400">
                            Apply
                        </button>
                    </div>

                    {/* On/Off Slider */}
                    <div className="flex items-center space-x-4 bg-gray-100 dark:bg-gray-800 p-3 rounded-lg shadow-md">
                        <h1 className="text-lg font-semibold text-gray-700 dark:text-white">Slide show</h1>
                        <label htmlFor="toggle" className="text-lg text-gray-600 dark:text-gray-300">
                            {isActive ? "On" : "Off"}
                        </label>
                        <input
                            type="checkbox"
                            id="toggle"
                            checked={isActive}
                            onChange={changeSlideshow}
                            className="w-12 h-6 bg-gray-300 dark:bg-gray-600 rounded-full relative cursor-pointer"
                        />
                    </div>
                </div>
            </div>

            {/* Banner List */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 z-0">
                {banners?.map((obj: any, index: number) => (
                    <div key={index} className="relative group rounded-lg overflow-hidden shadow-lg border border-gray-200 dark:border-gray-700">
                        {/* Banner Image */}
                        <img
                            src={obj?.image}
                            alt="Banner"
                            className="w-full h-56 object-cover transition-transform duration-300 group-hover:scale-105 rounded-lg"
                        />

                        {/* Hover Actions (View, Delete & Toggle) */}
                        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 space-x-3">
                            {/* View Button */}
                            <button onClick={() => setViewImage(obj?.image)} className="bg-blue-500 text-white p-2 rounded-full hover:bg-blue-600">
                                <EyeIcon className="w-5 h-5" />
                            </button>

                            {/* Delete Button */}
                            <button onClick={() => handleDelete(obj)} className="bg-red-500 text-white p-2 rounded-full hover:bg-red-600">
                                <TrashIcon className="w-5 h-5" />
                            </button>

                            {/* Toggle Button (On/Off) */}
                          
                        </div>
                    </div>
                ))}
            </div>

            {/* Image View Modal */}
            {viewImage && (
                <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50">
                    <div className="relative p-4 bg-white dark:bg-gray-800 rounded-lg shadow-lg max-w-[90%]">
                        <button
                            onClick={() => setViewImage(null)}
                            className="absolute top-2 right-2 bg-red-500 text-white p-2 rounded-full hover:bg-red-600"
                        >
                            <XIcon className="w-5 h-5" />
                        </button>
                        <img src={viewImage} alt="Banner" className="w-full h-auto rounded-lg" />
                    </div>
                </div>
            )}
        </div>
    );
};

export default BannerManagement;
