"use client";

import React, { useState } from "react";
import ProductDetailsSkeleton from "../Loading/ProductDetailPageSkeletonLoading";
import ShapesList from "./Shapes";
import SizeGuideModal from "./SizeGuide";
import { IProduct } from "@/Interfaces/IProduct";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";


const ProductDetails = ({ product, loading }: any) => {
    if (loading||!product) return <ProductDetailsSkeleton />;
    const [guideModal,setGuideModal] = useState(false);
    const [image,setImage] = useState('');
    const router = useRouter()

    
  const showGuide = (product:any)=>{
    if(product?.sizeguide){

        setImage(product?.sizeguide)
          setGuideModal(true)
    }else{
        toast.error('Size Guide not available')
    }
  }

  const personalize =(product:IProduct)=>{
      router.push(`/personalize/${product?._id}`)
    
  }
    return (
        <div className="w-full p-6 md:p-8 bg-white rounded-2xl">
            {guideModal&&<SizeGuideModal image={image} setGuideModal={setGuideModal}/>}
            <div className="flex flex-col lg:flex-row gap-8">
                {/* Product Details Section */}
                <div className="w-full">
                    <div className="flex flex-col space-y-5">
                        {/* Product Name */}
                        <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
                            {product?.name}
                        </h1>

                        {/* Product Description */}
                        <p className="text-gray-600 text-sm md:text-base leading-relaxed">
                            {product?.description}
                        </p>

                        {/* Product Price */}
                        <p className="text-xl md:text-2xl font-semibold text-[#CC0C38]">
                            {product?.baseprice} AED
                        </p>

                        {/* Thin Horizontal Line */}
                        <hr className="border-t border-gray-300 my-4" />

                        {/* Product Guide Link */}
                        <a onClick={()=>showGuide(product)} className="cursor-pointer text-blue-600 hover:underline">
                            Product Guide
                        </a>

                        {/* Product Category */}
                        <p className="text-sm text-gray-500">
                            <strong>Category:</strong> {product?.category?.name}
                        </p>

                        {/* Personalize Button */}
                        <button onClick={()=>personalize(product)} className="mt-4 px-6 py-3 bg-[#16A300] hover:bg-green-700 text-white rounded-lg transition-all duration-300">
                            Personalize Now
                        </button>
                        <h1 className="p-1 font-bold text-gray-800">Select Shape</h1>
                        <ShapesList product={product}/>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetails;
