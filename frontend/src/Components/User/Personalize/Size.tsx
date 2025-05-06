'use client'
import { setTotal, setVariant } from "@/fetures/user/personalizeSlice";
import React from "react";
import { useDispatch } from "react-redux";

function Size( {toggleSizeModal, setToggleSizeModal, selectedIndex, setSelectedIndex, product }: any) {
     const dispatch =  useDispatch()
    const handleSizeSelect = (obj: any, id: number) => {
        setSelectedIndex(id);
   
         dispatch(setVariant(obj))
         dispatch(setTotal(Number(obj?.price)))
        
    };

    return (
        <>
            {toggleSizeModal
                ? product?.variants?.map((obj: any, id: number) => {
                      return (
                          <div
                              onClick={() => handleSizeSelect(obj, id)}
                              className={`mt-2 cursor-pointer p-2 w-full h-[60px] rounded-lg flex flex-row items-center justify-between gap-2 ${
                                  selectedIndex === id ? "border border-[#1793E5] border-2" : "border border-gray-300"
                              }`}
                              key={id}
                          >
                              <input type="radio" className="w-5 h-5" checked={id === selectedIndex} readOnly />
                              
                              {/* Size with dimensions */}
                              <div className="flex flex-col">
                                  <span className="font-medium">{obj.size}</span>
                                  <span className="text-sm text-gray-500">L × W × T (mm)</span>
                              </div>

                              {/* Price */}
                              <span className="text-[#CC0C38] font-semibold">
                                  {obj.price} AED
                              </span>
                          </div>
                      );
                  })
                : ""}
        </>
    );
}

export default Size;
