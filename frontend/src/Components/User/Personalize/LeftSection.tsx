"use client";
import { setOrientationType } from "@/fetures/user/personalizeSlice";
import { IRootState } from "@/Store/store";
import { div } from "framer-motion/client";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

function LeftSection() {
    const dispatch =  useDispatch()
    const product = useSelector((data: IRootState) => data?.personalize?.product);
    const [selectedImage, setSelectedImage] = useState<string | null>(null);
    const orientation = useSelector((data: IRootState) => data?.personalize?.orientation);
    const orientationType = useSelector((data: IRootState) => data?.personalize?.orientationType);
    const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const imageUrl = URL.createObjectURL(file);
            setSelectedImage(imageUrl);
        }
    };
    return (
            
          

             <div className=" bg-[#193951] w-full h-[500px] lg:fixed lg:w-[53%]   md:w-[60%] flex flex-col items-center p-4 border rounded-2xl shadow-md">
                <img src={product?.frame?.image} alt="" />
                {orientation&&
                    <div><h1>Orientation</h1>
                <label htmlFor="">Standing</label>
                <input type="radio" onClick={()=>dispatch(setOrientationType('standing'))} checked={orientationType=='standing'} name="" id="" />
                <label htmlFor="">Sleeping</label>
                <input type="radio" onClick={()=>dispatch(setOrientationType("sleeping"))} checked={orientationType=='sleeping'} />
                </div>}
            </div>
           
                                                                                                                                                                                                                                                                 
      
           
        
    );
}

export default LeftSection;
