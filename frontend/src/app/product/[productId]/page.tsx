"use client";
import ProductDetailsSkeleton from "@/Components/User/Loading/ProductDetailPageSkeletonLoading";
import Pagination from "@/Components/User/Pagination/Pagination";
import DetailsViewer from "@/Components/User/ProductDetails/DetailsViewer";
import ProductImages from "@/Components/User/ProductDetails/ImageManager";
import RelatedProducts from "@/Components/User/ProductDetails/RelatedProducts";
import { IProduct } from "@/Interfaces/IProduct";
import { getProductById } from "@/Services/userServices";
import React, { use, useEffect, useState } from "react";
import toast from "react-hot-toast";

function Page({ params }: { params: Promise<{ productId: string }>}) {
    const { productId } = use(params);
    const [images, setImages] = useState<any>([]);
    const [product, setProduct] = useState<any>();
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const res = await getProductById(productId);
                setImages(res?.data?.data?.images);
                console.log(res?.data?.data?.catgory?.name)
                setProduct(res?.data?.data);
                setLoading(false);
            } catch (error) {
                toast.error(error);
                setLoading(false);
            }
        };

        fetchData();
    }, [productId]);

    //    if(loading)  return <ProductDetailsSkeleton/>

    return (
        <div className="w-full ">
            <Pagination pages={['Our Products',product?.category?.name,product?.name]} productId={product?._id}/>
            <div className="flex flex-col lg:flex-row lg:w-full lg:max-w-[80%] mx-auto">
                <div className="lg:w-[50%] w-full mb-4 lg:mb-0 p-5">{images?.length > 0 && <ProductImages loading={loading} images={images} />}</div>
                <div className="lg:w-[50%] w-full p-8">
                    <DetailsViewer loading={loading} product={product} />
                </div>
            </div>
            <div className=" w-full p-8">
                <RelatedProducts productId={productId} />
            </div>
        </div>
    );
}

export default Page;
