import ButtonLoading from "@/Components/User/Loading/ButtonLoading";
import addNewSize, { pushSize, updateSize } from "@/fetures/admin/sizeSlice";
import { ISize } from "@/Interfaces/ISize";
import { addSize, updateProductSize } from "@/Services/adminService";
import { useState } from "react";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";

interface IProps {
    setEditModal: React.Dispatch<React.SetStateAction<boolean>>;
    size: ISize;
}

export default function EditSizeModal({ setEditModal, size }: IProps) {
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState(size?.size || "");
    const dispatch = useDispatch();

    const handleSubmit = async (e: any) => {
        try {
            e.preventDefault();
            if (data == "") {
                toast.error("Invalid size");
            } else if (data == size?.size) {
                toast.error("No changes made");
            } else {
                const res = await updateProductSize(data, size._id);

                dispatch(updateSize(res?.data?.data));
                setEditModal(false)
            }
        } catch (error) {
            toast.error(error);
        }
    };

    const handleChange = (e: any) => {
        setData(e.target.value);
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-96">
                <h2 className="text-xl font-bold mb-4">Edit Size</h2>
                <form onSubmit={handleSubmit}>
                    <input type="text" placeholder="Enter size" onChange={handleChange} value={data} className="w-full border p-2 rounded-md mb-4" />
                    <div className="flex justify-end gap-2">
                        <button onClick={() => setEditModal((prev: boolean) => !prev)} type="button" className="px-4 py-2 bg-gray-300 rounded-md">
                            Cancel
                        </button>
                        <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded-md">
                            {loading ? <ButtonLoading /> : "Update"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
