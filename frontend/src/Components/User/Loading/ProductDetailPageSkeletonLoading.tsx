"use client";

import React from "react";

const ProductDetailsSkeleton = () => {
    return (
        <div className="w-full p-6 md:p-8 bg-white rounded-lg animate-pulse">
            <div className="flex flex-col lg:flex-row gap-8">
                {/* Product Details Skeleton Section */}
                <div className="w-full">
                    <div className="flex flex-col space-y-5">
                        {/* Product Name Skeleton */}
                        <div className="h-6 bg-gray-300 w-1/2 rounded-md"></div>

                        {/* Product Description Skeleton */}
                        <div className="h-4 bg-gray-200 w-3/4 rounded-md"></div>
                        <div className="h-4 bg-gray-200 w-2/3 rounded-md"></div>

                        {/* Product Price Skeleton */}
                        <div className="h-6 bg-gray-300 w-1/3 rounded-md"></div>

                        {/* Thin Horizontal Line */}
                        <hr className="border-t border-gray-300 my-4" />

                        {/* Product Guide Link Skeleton */}
                        <div className="h-4 bg-gray-200 w-1/4 rounded-md"></div>

                        {/* Product Category Skeleton */}
                        <div className="h-4 bg-gray-200 w-1/2 rounded-md"></div>

                        {/* Personalize Button Skeleton */}
                        <div className="h-12 bg-gray-300 w-1/2 rounded-md mt-4"></div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetailsSkeleton;
