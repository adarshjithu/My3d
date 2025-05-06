"use client";
import { getBanners } from "@/Services/userServices";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { ChevronLeft, ChevronRight } from "lucide-react";
import BannerSkeleton from "../Loading/BannerSkeleton";

const Banner = () => {
    const [banners, setBanners] = useState<string[]>([]);
    const [time, setTime] = useState(500);
    const [isSlide, setIsSlide] = useState(true);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const res = await getBanners();
                setBanners(res?.data?.data?.banners?.map((obj: any) => obj?.image) || []);
                setTime(res?.data?.data?.time || 500);
                setIsSlide(res?.data?.data?.isSlide ?? true);
                setLoading(false);
            } catch (error) {
                setLoading(false);
                toast.error("Failed to load banners");
            }
        };
        fetchData();
    }, []);

    useEffect(() => {
        if (isSlide && banners.length > 1) {
            const interval = setInterval(() => {
                setCurrentIndex((prevIndex) => (prevIndex + 1) % banners.length);
            }, time);
            return () => clearInterval(interval);
        }
    }, [banners, time, isSlide]);

    const prevSlide = () => {
        setCurrentIndex((prevIndex) => (prevIndex === 0 ? banners.length - 1 : prevIndex - 1));
    };

    const nextSlide = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % banners.length);
    };

    return (
      <div className="w-full h-[300px] lg:h-[500px] relative z-10">
   {loading ? (
       <BannerSkeleton />
   ) : (
       <div className="relative">
           <img
               src={banners[currentIndex]}
               alt={`Slide ${currentIndex + 1}`}
               className="w-full h-full object-cover"
           />
           {/* Left Arrow */}
           <button
               onClick={prevSlide}
               className="absolute top-1/2 left-2 transform -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/70"
           >
               <ChevronLeft size={24} />
           </button>
           {/* Right Arrow */}
           <button
               onClick={nextSlide}
               className="absolute top-1/2 right-2 transform -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/70"
           >
               <ChevronRight size={24} />
           </button>
       </div>
   )}
</div>

    );
};

export default Banner;
