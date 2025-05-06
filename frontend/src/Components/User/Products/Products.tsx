"use client";
import { getAllProducts } from "@/Services/userServices";
import React, { useEffect, useState } from "react";
import ProductsGrid from "./ProductsGrid";
import { useDispatch, useSelector } from "react-redux";
import { IRootState } from "@/Store/store";
import { setProducts } from "@/fetures/user/productSlice";
import PageLoading from "../Loading/PageLoading"; // Skeleton/Loading component for page
import CardSkeletonLoading from "../Loading/CardSkeletonLoading";

function Products() {
    const [productData, setProductData] = useState<any>([]);
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(true); // Start with loading as true

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true); // Ensure it's loading at the start
            try {
                const res = await getAllProducts();
                const allProducts = res?.data?.data;
                setProductData(allProducts); // Set products when data is available
                dispatch(setProducts(allProducts)); // Update Redux store if necessary
            } catch (error) {
                console.error("Failed to fetch products", error);
            } finally {
                setLoading(false); // End loading once data is fetched
            }
        };

        fetchData();
    }, []);

    if (loading) {
        return <CardSkeletonLoading />; 
    }

    return (
        <div>
            {productData.length === 0 ? (
                <p>No products found</p> // Handle case when no products are available
            ) : (
                productData.map((obj: any) => (
                    <ProductsGrid category={obj?.category} products={obj?.products} key={obj?.category} />
                ))
            )}
        </div>
    );
}

export default Products;
