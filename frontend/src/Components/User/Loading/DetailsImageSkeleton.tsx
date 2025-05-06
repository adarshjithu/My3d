"use client";

import { ArrowLeft, ArrowRight, ZoomIn } from "lucide-react";

const ProductImagesSkeleton = () => (
    <div className="flex flex-col items-center space-y-4 max-w-lg mx-auto mt-2">
        {/* Main Image Skeleton */}
        <div className="relative w-full h-[400px] bg-gray-200 animate-pulse rounded-xl flex justify-center items-center">
            <div className="w-full h-full bg-gray-300 animate-pulse rounded-xl" />
        </div>

        {/* Thumbnails Skeleton */}
        <div className="w-[100%] flex space-x-2 overflow-x-auto py-2 scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-100">
            {[...Array(5)].map((_, index) => (
                <div
                    key={index}
                    className="w-16 h-16 bg-gray-300 animate-pulse rounded-lg"
                />
            ))}
        </div>
    </div>
);

export default ProductImagesSkeleton;
