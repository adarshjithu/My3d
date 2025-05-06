"use client";
import ProductDetails from "@/Components/User/Details/Details";
import SkeletonLoadingModal from "@/Components/User/Loading/SkeletonLoading";
import ProductsGrid from "@/Components/User/Products/ProductsGrid";
import { IProduct } from "@/Interfaces/IProduct";
import { getProductByCategory } from "@/Services/userServices";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

function page({ params }: any) {
    const [products, setProducts] = useState<IProduct[]>([]);
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const res = await getProductByCategory(params?.category);

                setProducts(res?.data?.data);
                setLoading(false);
            } catch (error) {
                toast.error(error);
                setLoading(false);
            }
        };
        fetchData();
    }, [params?.category]);
    return (
        <div className="mt-9">
           <ProductsGrid loading={loading} category={params?.category} products={products} />
           <ProductDetails/>
        </div>
    );
}

export default page;
