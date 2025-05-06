"use client";
import React, { useEffect, useState } from "react";
import ProductsTableHeader from "./ProductsTableHeader";
import toast from "react-hot-toast";
import { deleteProductById, findAllCategories, getAllCategories, getAllProducts } from "@/Services/adminService";
import { useDispatch, useSelector } from "react-redux";
import { IRootState } from "@/Store/store";
import { IProduct } from "@/Interfaces/IProduct";
import { deleteProductData, setAllProducts } from "@/fetures/admin/productSlice";
import { Trash, EditIcon } from "lucide-react";
import ChangeStatusModal from "./ChangeStatusModal";
import ImageManagementModal from "./ManageImageModal";
import CommonDeleteModal from "../Modals/CommonDeleteModal";
import ChangeFrameModal from "./ChangeFrameModal";
import ProductPagination from "./ProductPagination";
import { ICategory } from "@/Interfaces/ICategory";
function ProductsTable({ page }: { page: string }) {
    const dispatch = useDispatch();
    const products = useSelector((data: IRootState) => data?.adminProducts?.products);
    const [product, setProduct] = useState<any>({});
    const [imageModal, setImageModal] = useState(false);
    const [deleteModal, setDelteModal] = useState<boolean>(false);
    const [frameModal, setFrameModal] = useState(false);
    const [loading, setLoading] = useState(false);
    const [search, setSearch] = useState("");
    const [categories, setCategories] = useState<ICategory[]>([]);
    const [seletedCategory, setSelectedCategory] = useState<ICategory>();
    const [status,setStatus] = useState('in stock');
    const [reFetch,setRefetch] = useState(false);

    const handleSuccess = async (action: boolean) => {
        if (action) {
            try {
                setLoading(true);
                const res = await deleteProductById(product?._id);
                if (res?.data?.success) {
                    dispatch(deleteProductData(product?._id));
                    setDelteModal(false);
                }
                setLoading(false);
            } catch (error) {
                toast.error(error);
                setLoading(false);
            }
        } else {
            setDelteModal(false);
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await getAllProducts(seletedCategory?.name||'',page,search,status);
                console.log(res?.data?.data)
                dispatch(setAllProducts(res?.data?.data));
            } catch (error) {
                toast.error(error);
            }
        };

        fetchData();
    
    }, [seletedCategory, page, reFetch,status]);

    useEffect(() => {
        const fetchData = async () => {
            const res = await findAllCategories();
            setCategories(res?.data?.data);
        };
        fetchData();
    }, []);

    return (
        <div>
            <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    <ProductsTableHeader setRefetch={setRefetch} status={status} setStatus={setStatus} search={search} setSearch={setSearch} categories={categories} setSelectedCategory={setSelectedCategory} />
                    {deleteModal && <CommonDeleteModal loading={loading} handleSuccess={handleSuccess} item={"Product"} />}
                    {imageModal && <ImageManagementModal setProduct={setProduct} product={product} setImageModal={setImageModal} />}
                    {frameModal && <ChangeFrameModal product={product} setFrameModal={setFrameModal} />}
                    <thead className="mt-5 text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" className="px-6 py-3">
                                Product name
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Description
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Category
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Price
                            </th>

                            <th scope="col" className="px-6 py-3">
                                Frame
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Status
                            </th>
                            <th scope="col" className="px-6 py-3">
                                CreatedAt
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Image
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Actions
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {products?.map((obj: any, index: number) => {
                            return (
                                <tr className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700 border-gray-200">
                                    <td scope="row" className="px-6 py-4">
                                        {obj?.name}
                                    </td>
                                    <td className="px-6 py-4">{obj?.description.slice(0,10)}</td>
                                    <td className="px-6 py-4">{obj?.categoryDetails?.name}</td>
                                    <td className="px-6 py-4">{obj?.baseprice}</td>

                                    <td
                                        onClick={() => {
                                            setProduct(obj);
                                            setFrameModal(true);
                                        }}
                                        className=" cursor-pointer px-6 py-4"
                                    >
                                        <img className=" w-[35px] h-[35px]" src={obj?.frameDetails?.image} alt="" />
                                    </td>

                                    <td className=" cursor-pointer">
                                        <ChangeStatusModal product={obj} />
                                    </td>
                                    <td className="px-6 py-4">{new Date(obj?.createdAt).toDateString()}</td>
                                    <td className="px-6 py-4 cursor-pointer">
                                        <img
                                            onClick={() => {
                                                setImageModal(true);
                                                setProduct(obj);
                                            }}
                                            src={obj?.images[0]}
                                            alt=""
                                            className="w-[35px] h-[35px]"
                                        />
                                    </td>
                                    <td className="px-6 py-4 flex ">
                                        <a className="font-medium  cursor-pointer  text-blue-600 dark:text-blue-500 hover:underline">
                                            <EditIcon className="w-5 h-5 text-blue-500" />
                                        </a>
                                        <a
                                            onClick={() => {
                                                setProduct(obj);
                                                setDelteModal(true);
                                            }}
                                            className="font-medium ml-4 text-blue-600 cursor-pointer dark:text-blue-500 hover:underline"
                                        >
                                            <Trash className="w-5 h-5 text-red-500" />
                                        </a>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
                <ProductPagination page={page} />
            </div>
        </div>
    );
}

export default ProductsTable;
