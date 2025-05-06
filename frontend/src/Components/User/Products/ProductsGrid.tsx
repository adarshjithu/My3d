import React, { useState } from "react";
import SkeletonLoadingModal from "../Loading/SkeletonLoading";
import CardSkeletonLoading from "../Loading/CardSkeletonLoading";
import { useRouter } from "next/navigation";

const ProductsGrid = ({ category, loading, products }: any) => {
    const router =  useRouter()
    return (
        <div className="p-4 mt-5">
            <h1 className="text-3xl font-bold text-center mb-8 text-gray-600">{category.charAt(0).toUpperCase() + category.slice(1)}</h1>
            {/* Adjust grid classes for responsiveness */}
            {loading ? (
                <CardSkeletonLoading />
            ) : (
                <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {products.map((product: any) => (
                        <div onClick={()=>router.push(`/product/${product?._id}`)} key={product?._id} className="bg-white shadow-md overflow-hidden cursor-pointer hover:bg-[#e7f5fe] p-2 group">
                            <img src={product?.images[0]} alt={product?.name} className="w-full h-50 object-cover rounded-sm" />
                            <div className="p-4">
                                <h2 className="text-[14px] text-gray-700 sm:text-[22px] font-semibold mb-2 group-hover:text-[#007ab8] transition-colors duration-200">
                                    {product?.name}
                                </h2>
                                <p className=" text-[14px] text-[#CC0C38] font-semibold sm:text-[18px]">{product?.baseprice} AED</p>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default ProductsGrid;
