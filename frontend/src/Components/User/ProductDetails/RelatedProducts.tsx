"use client";
import { getRelatedProduct } from "@/Services/userServices";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import ProductsGrid from "../Products/ProductsGrid";
import { IProduct } from "@/Interfaces/IProduct";
import CardSkeletonLoading from "../Loading/CardSkeletonLoading";

function RelatedProducts({ productId }: { productId: string }) {
    const [product, setProduct] = useState<IProduct[]>([]);
    const [loading,setLoading] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
              setLoading(true)
                const res = await getRelatedProduct(productId);
                setProduct(res?.data?.data);
                setLoading(false)
            } catch (error) {
                toast.error(error);
                setLoading(false)
            }
        };
        fetchData();
    }, [productId]);

    if(loading) return <CardSkeletonLoading/>;
    return <div>{product?.length > 0 && <ProductsGrid products={product} category="Related Products" />}</div>;
}

export default RelatedProducts;
