"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight,ChevronLeft, ZoomIn } from "lucide-react";
import PageLoading from "../Loading/PageLoading";
import FullscreenBlackModal from "./ZoomImage";

export default function ProductImages({ images, loading }: { images: string[]; loading: boolean }) {
    const [mainImage, setMainImage] = useState(0);
    const [zoomModal, setZoomModal] = useState(false);
    const [direction, setDirection] = useState(1); 

    if (loading || images.length === 0) return <PageLoading />;

    // Function to change image
    const changeImage = (newIndex: number, dir: number) => {
        setDirection(dir);
        setMainImage(newIndex);
    };

    return (
        <div className="flex flex-col items-center space-y-4 max-w-lg mx-auto mt-2 relative">
            {zoomModal && <FullscreenBlackModal setZoomModal={setZoomModal} imageData={images} />}

            {/* Main Image Container */}
            <div className="relative w-full h-[500px] overflow-hidden rounded-2xl border flex justify-center items-center">
                <AnimatePresence custom={direction}>
                    <motion.img
                        key={mainImage}
                        src={images[mainImage]}
                        alt="Product"
                        className="absolute w-full h-full object-cover cursor-pointer rounded-2xl"
                        onClick={() => setZoomModal(true)}
                        initial={{ x: direction * 100, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        exit={{ x: -direction * 100, opacity: 0 }}
                        transition={{ duration: 0.5 }}
                    />
                </AnimatePresence>

                {/* Left Button */}
                <button
                    className="absolute left-2 top-1/2 -translate-y-1/2 p-2 bg-white/20 rounded-full shadow-md transition"
                    onClick={() => changeImage(mainImage === 0 ? images.length - 1 : mainImage - 1, -1)}
                >
             
                <ChevronLeft className="h-8 w-8" />
                </button>

                {/* Right Button */}
                <button
                    className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-white/20 rounded-full shadow-md transition"
                    onClick={() => changeImage(mainImage === images.length - 1 ? 0 : mainImage + 1, 1)}
                >
                    <ChevronRight className="h-8 w-8" />
                </button>

                {/* Zoom Icon */}
                <button className="absolute bottom-2 right-2 p-2 bg-black/50 rounded-full text-white" onClick={() => setZoomModal(true)}>
                    <ZoomIn className="h-5 w-5" />
                </button>
            </div>

            {/* Thumbnails */}
            <div className="w-full flex space-x-2 overflow-x-auto py-2 scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-100">
                {images.map((image, index) => (
                    <img
                        key={index}
                        onMouseEnter={() => changeImage(index, index > mainImage ? 1 : -1)}
                        src={image}
                        alt="Thumbnail"
                        className={`cursor-pointer w-16 h-16 rounded-lg object-cover ${mainImage === index ? "border-2 border-purple-600" : ""}`}
                    />
                ))}
            </div>
        </div>
    );
}
