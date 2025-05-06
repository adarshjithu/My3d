"use client";

import PageLoading from "@/Components/User/Loading/PageLoading";
import Pagination from "@/Components/User/Pagination/Pagination";
import LeftSection from "@/Components/User/Personalize/LeftSection";
import RightSection from "@/Components/User/Personalize/RightSection";
import { addPersonalize, addTotal, setOrientation, setVariant } from "@/fetures/user/personalizeSlice";
import { getProductById } from "@/Services/userServices";
import { IRootState } from "@/Store/store";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";

export default function Page({ params }: { params: { productId: string } }) {
    const { productId } = params;
    const dispatch = useDispatch();
    const product = useSelector((data: IRootState) => data?.personalize?.product);
    const [loading, setLoading] = useState<boolean>(true); 
    const [orientationType, setOrientationType] = useState<string>("standing");

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await getProductById(productId);
                dispatch(addPersonalize(res?.data?.data));

                const firstVariant = res?.data?.data?.variants[0] || {};
                dispatch(setOrientation(!firstVariant?.base?.default));
                dispatch(setVariant(firstVariant));
                dispatch(addTotal(Number(firstVariant?.price)))
            } catch (error) {
                toast.error(error);
            } finally {
                setLoading(false); 
            }
        };

        fetchData();
    }, [productId]);

    const handleAddToCart = () => {
        toast.success("Added to cart successfully!");
    };

    if (loading) return <PageLoading />; 

    return (
        <>
            <Pagination pages={["Our Products", product?.category?.name, product?.name, "Personalize"]} productId={product?._id} />
            <div className="flex flex-col md:flex-row justify-between gap-6 max-w-7xl mx-auto p-2">
                <LeftSection />
                <RightSection product={product} />
            </div>
        </>
    );
}
