"use client";
import ButtonLoading from "@/Components/User/Loading/ButtonLoading";
import { pushBase } from "@/fetures/admin/baseSlice";
import { addBase } from "@/Services/adminService";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";

interface AddBaseModalProps {
    setAddBaseModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const AddBaseModal: React.FC<AddBaseModalProps> = ({ setAddBaseModal }) => {
    const [data, setData] = useState("");
    const dispath = useDispatch();
    const [loading, setLoading] = useState(false);
    const handleSubmit = async () => {
        try {
            if (data == "") toast.error("Invalid base");
            else {
                setLoading(true);
                const res = await addBase(data);
                setLoading(false);
                dispath(pushBase(res?.data?.data));
            }
        } catch (error) {
            setLoading(false);
            toast.error(error);
        }
    };
    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-96">
                <h2 className="text-xl font-semibold mb-4">Add Size</h2>
                <input
                    type="text"
                    onChange={(e) => setData(e.target.value)}
                    placeholder="Enter size"
                    className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
                <div className="flex justify-end mt-4 space-x-2">
                    <button onClick={() => setAddBaseModal(false)} className="px-4 py-2 bg-gray-300 rounded-md hover:bg-gray-400">
                        Cancel
                    </button>
                    <button onClick={handleSubmit} className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
                        {loading ? <ButtonLoading /> : "Add Base"}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AddBaseModal;
