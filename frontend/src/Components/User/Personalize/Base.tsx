"use client";
import { getBase } from "@/Services/userServices";
import { IRootState } from "@/Store/store";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import Hint from "./Hint";
import BaseSkeleton from "./BaseSkeleton";
import { addTotal, deductTotal } from "@/fetures/user/personalizeSlice";

function Base() {
    const [items, setItems] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);
    const { variant, orientation, orientationType } = useSelector((data: IRootState) => data?.personalize);
    const [selectedIndex, setSeletedIndex] = useState<null | number>(null);
    const dispatch = useDispatch();

    const handleBaseClick = (index: number, baseData: any) => {
      if(selectedIndex==index){
        setSeletedIndex(null)
        dispatch(deductTotal(Number(baseData?.baseprice)))
      }else{
        if(selectedIndex!==null){

          dispatch(deductTotal(Number(items[index]?.baseprice)))
        }
        setSeletedIndex(index)
        dispatch(addTotal(Number(baseData?.baseprice)))
      }
     
    }; 

    useEffect(() => {
        const fetchData = async () => {
            try {
                if (variant?.base) {
                    setLoading(true);
                    const baseType = variant?.base?.default || variant?.base[orientationType];
                    const res = await getBase(baseType);
                    const newBases = res?.data?.data?.map((obj: any) => {
                        const variant = obj?.variants.find((variant: any) => variant?.size == baseType);

                        return { ...obj, baseprice: variant?.price, size: baseType };
                    });
                    setLoading(false);
                    setItems(newBases || []);
                    setSeletedIndex(null);
                }
            } catch (error) {
                setLoading(false);
                toast.error(error);
            }
        };
        fetchData();
    }, [variant, orientation, orientationType]);

    return (
        <div className="container mx-auto p-4 bg-white mt-8 rounded-xl shadow-lg relative">
            <div className="mb-2">
                <h1 className="mt-5 mb-2 text-[gray]">CHOOSE BASE </h1>
                <span className="text-[gray] mt-2">
                    Options shown here depend on the selected crystal size and orientation. Comes with Type A/B AC Adapter.
                </span>
            </div>
            {loading ? (
                <BaseSkeleton />
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {items.map((item, index) => (
                        <div
                            onClick={() => handleBaseClick(index, item)}
                            key={index}
                            className={`cursor-pointer bg-white rounded-lg overflow-hidden  border ${
                                selectedIndex == index ? "border-[#16A300] border-[4px]" : "border-gray-400"
                            } flex flex-col`}
                        >
                            {/* Image Section */}
                            <div className="w-full ">
                                <img src={item.images[0]} alt={item.images[0]} className="w-full h-full object-cover" />
                            </div>
                            {/* Details Section */}
                            <div className="w-full flex flex-col justify-center p-2">
                                <h2 className="text-sm font-bold text-gray-700 ">{item?.name}</h2>
                                <p className="text-sm text-gray-600">Size: {item?.size}</p>
                                <p className="text-lg font-semibold text-blue-500">
                                    {item.baseprice} <span className="text-[#CC0C38]">AED</span>
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            )}
            <Hint step={"Step 2"} />
        </div>
    );
}

export default Base;
