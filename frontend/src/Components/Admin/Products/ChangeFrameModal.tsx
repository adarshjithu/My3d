'use client'
import { updateProductData } from "@/fetures/admin/productSlice";
import { IFrame } from "@/Interfaces/IFrame";
import { IProduct } from "@/Interfaces/IProduct";
import { findAllFrames, updateProductFrame } from "@/Services/adminService";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";


const ChangeFrameDropdown = ({ product, setFrameModal }: { product: any; setFrameModal: React.Dispatch<React.SetStateAction<boolean>> }) => {
  const [selectedFrame, setSelectedFrame] = useState<IFrame>(product?.frameDetails); // Default frame
  const [frames,setFrames] = useState<IFrame[]>([])
   const dispatch = useDispatch()

  const handleSubmit = async()=>{
    if(selectedFrame?.frameName==product?.frame?.frameName){
        toast.error("Already in use")
    }else{
        try{
           const res = await updateProductFrame(product?._id,selectedFrame?._id);
           if(res?.data?.success){
             dispatch(updateProductData({...product,frameDetails:selectedFrame}))
             setFrameModal(false)
           }
        }catch(error){
            toast.error(error)
        }
    }

  }
  useEffect(()=>{
    const fetchData = async()=>{
        const res =  await findAllFrames();
        setFrames(res?.data?.data)
    }
    fetchData();

  },[])



  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-4 rounded-lg shadow-lg w-80">
        <h2 className="text-lg font-semibold mb-3 text-center">Select Frame</h2>

        {/* Frame Preview */}
        <div className="">
          <img src={selectedFrame?.image} alt="Frame Preview" className="w-full h-full object-cover rounded-md" />
        </div>

        {/* Frame Selection Dropdown */}
        <select 
          className="w-full p-2 border rounded-md mb-3" 
          value={selectedFrame?.frameName}
          onChange={(e) => {
            const frame = frames.find(f => f?.frameName === e.target.value);
            if (frame) setSelectedFrame(frame);
          }}
        >
          {frames.map((frame) => (
            <option key={frame?.frameName} value={frame?.frameName}>
              {frame?.frameName}
            </option>
          ))}
        </select>

        {/* Buttons */}
        <div className="flex justify-between">
          <button onClick={() => setFrameModal(false)} className="px-4 py-2 bg-gray-400 text-white rounded-md w-1/2 mr-2">Cancel</button>
          <button onClick={handleSubmit} className="px-4 py-2 bg-blue-500 text-white rounded-md w-1/2">Apply</button>
        </div>
      </div>
    </div>
  );
};

export default ChangeFrameDropdown;
