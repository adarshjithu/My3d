import { IFrame } from "@/Interfaces/IFrame";
import { IProduct } from "@/Interfaces/IProduct";
import { getAllFrames } from "@/Services/adminService";
import { getAllShapes } from "@/Services/userServices";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import Shape from "./ShapeViewer";

function Shapes({product}:{product:any}) {
    const [shapes,setShapes] = useState<string[]>([])
    const [frames, setFrames] = useState<IFrame[]>([]);
    useEffect(() => {
        const fetchData = async () => {
            try {
                 const res = await getAllShapes(product?.category?._id);
               console.log(product?.frame?.frameName)
                const newShapes =  res?.data?.data[0]?.shape?.filter((obj:string)=>obj!==product?.frame?.frameName)||[]

                  setShapes(res?.data?.data[0]?.shape)
               
            } catch (error) {
                toast.error(error);
            }
        };

        fetchData();
    }, []);
    return (
        <div className="flex flex-row overflow-x-scroll">
       
            {shapes?.map((obj: any,id:number) => {
                return (
                    <Shape key={id} shape={obj} category={product?.category?._id}/>
                );
            })}
        </div>
    );
}

export default Shapes;
