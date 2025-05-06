import ButtonLoading from "@/Components/User/Loading/ButtonLoading";
import addNewSize, { pushSize } from "@/fetures/admin/sizeSlice";
import { addSize } from "@/Services/adminService";
import { useState } from "react";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";

interface IAddsizeProps {
    setAddSizeModal: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function AddSizeModal({ setAddSizeModal }: IAddsizeProps) {
    const [size, setSize] = useState("");
    const [loading,setLoading] = useState(false)
    const dispatch = useDispatch();
    const handleSubmit = async (e: any) => {
        try {
            e.preventDefault();
            if (size == "") toast.error("Invalid size");
            else {
                setLoading(true)
                const res = await addSize(size);
                toast.success(res?.data?.message)
                setLoading(false)
                 setSize('')
                dispatch(pushSize(res?.data?.data));
            }
        } catch (error) {
            setLoading(false)
            toast.error(error);
        }
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-96">
                <h2 className="text-xl font-bold mb-4">Add Size</h2>
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        placeholder="Enter size"
                        value={size}
                        onChange={(e) => setSize(e.target.value)}
                        className="w-full border p-2 rounded-md mb-4"
                    />
                    <div className="flex justify-end gap-2">
                        <button onClick={() => setAddSizeModal((prev: boolean) => !prev)} type="button" className="px-4 py-2 bg-gray-300 rounded-md">
                            Cancel
                        </button>
                        <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded-md">
                        {loading?<ButtonLoading/>:    "Add"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
