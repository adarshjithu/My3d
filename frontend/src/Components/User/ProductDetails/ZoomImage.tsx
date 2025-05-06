"use client";

import React, { useState, useRef } from "react";
import { ArrowLeft, ArrowRight, ZoomIn, ZoomOut } from "lucide-react";


const FullscreenBlackModal = ({ setZoomModal,imageData }: any) => {
   
   const [images,setImages] = useState<any>(imageData||[])

    const [currentIndex, setCurrentIndex] = useState(0);
    const [isZoomed, setIsZoomed] = useState(false);
    const [zoomLevel, setZoomLevel] = useState(1);
    const imageRef = useRef<HTMLImageElement>(null);

    const handlePrev = () => {
        setCurrentIndex((prevIndex) => (prevIndex === 0 ? images.length - 1 : prevIndex - 1));
        setZoomLevel(1); // Reset zoom when changing image
    };

    const handleNext = () => {
        setCurrentIndex((prevIndex) => (prevIndex === images.length - 1 ? 0 : prevIndex + 1));
        setZoomLevel(1); // Reset zoom when changing image
    };

    const handleThumbnailClick = (index: number) => {
        setCurrentIndex(index);
        setZoomLevel(1); // Reset zoom when selecting a thumbnail
    };

    const toggleZoom = () => {
        setIsZoomed((prev) => !prev);
        setZoomLevel(1); // Reset zoom when toggling zoom mode
    };

    const handleWheel = (event: React.WheelEvent) => {
        if (imageRef.current) {
            const zoomSpeed = 0.1;
            const newZoomLevel = event.deltaY < 0 ? zoomLevel + zoomSpeed : zoomLevel - zoomSpeed;
            if (newZoomLevel > 0.2 && newZoomLevel < 3) {
                // Zoom level bounds
                setZoomLevel(newZoomLevel);
            }
        }
    };

    return (
        <div className="fixed inset-0 bg-black flex flex-col items-center justify-center z-50">
            {/* Close Button */}
            <button className="cursor-pointer absolute top-4 right-4 text-white text-4xl z-[9999]" onClick={() => setZoomModal(false)}>
                &times;
            </button>

            {/* Modal Content */}
            <div className="w-full h-full relative flex flex-col">
                {/* Main Image Container */}
                <div className="flex-1 flex justify-center items-center relative" onWheel={handleWheel}>
                    <img
                        ref={imageRef}
                        src={images[currentIndex]}
                        alt={`Fullscreen Product ${currentIndex + 1}`}
                        className={`object-contain w-full max-h-[80vh] transition-transform duration-300 ${isZoomed ? "scale-150" : ""}`}
                        style={{
                            transform: `scale(${zoomLevel})`, // Apply custom zoom level
                        }}
                    />
                    {/* Left Arrow */}
                    <button onClick={handlePrev} className="absolute left-4 top-1/2 transform -translate-y-1/2 p-3 bg-white/30 rounded-full">
                        <ArrowLeft className="h-8 w-8 text-white" />
                    </button>
                    {/* Right Arrow */}
                    <button onClick={handleNext} className="absolute right-4 top-1/2 transform -translate-y-1/2 p-3 bg-white/30 rounded-full">
                        <ArrowRight className="h-8 w-8 text-white" />
                    </button>
                    {/* Zoom Button */}
                    <button onClick={toggleZoom} className="absolute bottom-4 right-4 p-3 bg-white/30 rounded-full">
                        {isZoomed ? <ZoomOut className="h-8 w-8 text-white" /> : <ZoomIn className="h-8 w-8 text-white" />}
                    </button>
                </div>

                {/* Thumbnails */}
                <div className="mt-4 flex justify-center space-x-4">
                    {images.map((img:any, index:any) => (
                        <img
                            key={index}
                            src={img}
                            alt={`Thumbnail ${index + 1}`}
                            onClick={() => handleThumbnailClick(index)}
                            className={`cursor-pointer w-20 h-20 object-cover rounded border ${
                                currentIndex === index ? "border-blue-500" : "border-white/50"
                            }`}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default FullscreenBlackModal;
