'use client'
import { findProductByShape } from "@/Services/userServices";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

const Shape = ({ shape, category }: { shape: string; category: string }) => {
    const router = useRouter();

    const handleShapeClick = async () => {
        try {
            const res = await findProductByShape(category, shape);
            router.push(`/product/${res?.data?.data[0]?._id}`);
        } catch (error) {
            toast.error(error);
        }
    };

    const renderShape = (shape: string) => {
        switch (shape.toLowerCase()) {
            case "square":
                return (
                    <svg width="40" height="40" xmlns="http://www.w3.org/2000/svg">
                        <rect width="40" height="40" stroke="#888" fill="#DFE1E2" />
                    </svg>
                );
            case "rectangle":
                return (
                    <svg  style={{borderRadius:'3px'}} width="60" height="30" xmlns="http://www.w3.org/2000/svg">
                        <rect style={{border:'10px solid gray'}} width="60" height="30" stroke="#888" fill="#DFE1E2" />
                    </svg>
                );
            case "circle":
                return (
                    <svg width="40" height="40" xmlns="http://www.w3.org/2000/svg">
                        <circle cx="20" cy="20" r="20" stroke="#888" fill="#DFE1E2" />
                    </svg>
                );
            case "heart":
                return (
                    <svg
                        style={{borderRadius:'10px'}}
                        xmlns="http://www.w3.org/2000/svg"
                        width="40"
                        height="40"
                        viewBox="0 0 24 24"
                    >
                        <path
                            d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
                            stroke="#888"
                            fill="#DFE1E2"
                        />
                    </svg>
                );
            case "diamond":
                return (
                    <svg width="40" height="40" xmlns="http://www.w3.org/2000/svg">
                        <polygon points="20,5 35,20 20,35 5,20" stroke="#888" fill="#DFE1E2" />
                    </svg>
                );
            default:
                return null;
        }
    };

    return (
        <div onClick={handleShapeClick} className="cursor-pointer w-[80px] h-[80px]  flex flex-col justify-center items-center border border-gray-400 rounded-lg ml-3">
             <div className="flex flex-col items-center  justify-center ">

            {renderShape(shape)}
            <span className=" text-sm text-[#454B4F] capitalize" style={{fontWeight:700}}>{shape}</span>
             </div>
        </div>
    );
};

export default Shape;
