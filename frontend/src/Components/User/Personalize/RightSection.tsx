import React, { useState } from "react";
import { ChevronUp, ChevronDown } from "lucide-react";
import { IProduct } from "@/Interfaces/IProduct";
import Size from "./Size";
import Base from "./Base";
import Hint from "./Hint";
import { useSelector } from "react-redux";
import { IRootState } from "@/Store/store";
function RightSection({ product }: { product: IProduct }) {
    const [toggleSizeModal, setToggleSizeModal] = useState(true);
    const [selectedIndex, setSelectedIndex] = useState<any>(0);
    const [variant, setVariant] = useState<any>();
    const total = useSelector((data:IRootState)=>data?.personalize?.total)


    return (
        <div className="lg:ml-[60%]  w-full md:w-[50%] ">
            <div className="bg-[white] p-4 rounded-xl shadow-xl relative">
                <div className="flex flex-row justify-between">
                    <span className="cursor-pointer">
                        Choose Size{" "}
                        <button onClick={() => setToggleSizeModal(!toggleSizeModal)}>{!toggleSizeModal ? <ChevronUp /> : <ChevronDown />}</button>
                    </span>
                    <span className=" cursor-pointer text-blue-600"> Size Guide</span>
                </div>
                 <div className="w-full mb-4">
                    <h1 className="mb-2 mt-2 text-gray-600 font-medium">IMPORTANT TO READ</h1>
                    <span className="text-[gray]">You'll see your image in more detail inside a larger crystal size. A 3D engraving is made of tiny, laser-etched dots that come together to recreate your photo. We have the space to engrave up to 10 million dots (which lets us create a more detailed image) inside our largest crystals</span>

                 </div>
                <Size
                    toggleSizeModal={toggleSizeModal}
                    setToggleSizeModal={setToggleSizeModal}
                    selectedIndex={selectedIndex}
                    setSelectedIndex={setSelectedIndex}
                    product={product}
                />
               <Hint step={"Step 1"}/>
            </div>

            <Base />

            <div className="w-full h-[150px]"></div>

            <div className="border border-gray w-full lg:w-[37%] h-[100px] lg:fixed shadow-xl right-10 bottom-0 bg-white rounded-xl flex items-center justify-between px-4">
                <h1 className="text-[25px] text-gray-600">Total : {total}</h1>
                <button className="font-semibold text-[22px] bg-[#16A300] w-[50%] h-[56px] border  text-white px-4 py-2 rounded">Add To Cart</button>
            </div>
        </div>
    );
}

export default RightSection;
