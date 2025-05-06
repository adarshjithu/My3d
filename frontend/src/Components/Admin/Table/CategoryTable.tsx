"use client";
import { Trash } from "lucide-react";
import React, { useEffect, useState } from "react";
import AddCategoryModal from "../Modals/AddCategoryModal";
import CategoryTableHeader from "../Category/CategoryTableHeader";
import toast from "react-hot-toast";
import { getAllCategories } from "@/Services/adminService";
import { ICategory } from "@/Interfaces/ICategory";
import { useDispatch, useSelector } from "react-redux";
import { IRootState } from "@/Store/store";
import { setCategories } from "@/fetures/admin/categorySlice";
import Pagination from "../Pagination/CategoryPagination";
import EditCategoryModal from "../Modals/EditCategoryModal";
import DeleteModal from "../Modals/DeleteModal";
import TableLoading from "@/Components/User/Loading/TableLoading";

function CategoryManagement() {
    const [formOpen, setFormOpen] = useState(false);
    const [page, setPage] = useState(
        localStorage.getItem("my-3d-admin-category-page") ? Number(localStorage.getItem("my-3d-admin-category-page")) : 1
    );
    const [deleteModal, setDeleteModal] = useState<boolean>(false);
    const [loading, setLoading] = useState(false);
    const [search, setSearch] = useState("");
    const [category, setCategory] = useState<ICategory | {}>({});
    const categories = useSelector((data: IRootState) => data?.category?.categories);
    const dispatch = useDispatch();
    const [editFormModal, setEditFormModal] = useState(false);
    const [totalPageCount, setTotalPageCount] = useState(0);
    const [fetch,setFetch] = useState(false)
    
    const [debounceTimeout, setDebounceTimeout] = useState<NodeJS.Timeout | null>(null);
    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
     
        setSearch(e.target.value)
        setLoading(true);

        // // Clear the previous debounce timeout
        if (debounceTimeout) {
            clearTimeout(debounceTimeout);
        }

        const newTimeout = setTimeout(() => {
            setFetch(!fetch)
        }, 500); // 500ms delay before making the API call

        setDebounceTimeout(newTimeout);
    };

  

    const editCategory = (categoryData: ICategory) => {
        setEditFormModal(true);
        setCategory(categoryData);
    };

    const deleteCategory = (category: ICategory) => {
        try {
            setDeleteModal(true);
            setCategory(category)
        } catch (error) {
            toast.error(error);
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true)
                const res = await getAllCategories(search, page);
               
                dispatch(setCategories(res?.data?.data[0]?.categories));
                 setLoading(false)
          
                 setTotalPageCount(res?.data?.data[0]?.count[0]?.categoryCount);
            } catch (error) {
                toast.error(error);
                setLoading(false)
            }
        };

        fetchData();

        return () => {
            localStorage.removeItem("my-3d-admin-category-page");
        };
    }, [page,fetch]);

    return (
        <>
            <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                {deleteModal && <DeleteModal category={category} setDeleteModal={setDeleteModal}/>}
                {editFormModal && <EditCategoryModal category={category} setEditFormModal={setEditFormModal} />}
                {formOpen && <AddCategoryModal setFormOpen={setFormOpen} setTotalPageCount={setTotalPageCount} />}
                <div className="overflow-x-auto max-w-full">
                


              
                    <table className="min-w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                        <CategoryTableHeader loading={loading} setFormOpen={setFormOpen} handleSearch={handleSearch} search={search} setSearch={setSearch} />
                        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                            <tr>
                                <th scope="col" className="px-6 py-3">
                                    No
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Name
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Description
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Created At
                                </th>
                                <th scope="col" className="px-6 flex justify-center items-center py-3 text-right">
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {categories?.map((category: ICategory, id: number) => {
                                return (
                                    <tr
                                        key={category?._id}
                                        className="cursor-pointer group bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200"
                                    >
                                        <th
                                            onClick={() => editCategory(category)}
                                            scope="row"
                                            className="px-6 py-4 group-hover:text-blue-500 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                                        >
                                            {id + 1}
                                        </th>
                                        <td onClick={() => editCategory(category)} className="px-6 py-4 group-hover:text-blue-500">
                                            {category?.name}
                                        </td>
                                        <td onClick={() => editCategory(category)} className="px-6 py-4 group-hover:text-blue-500">
                                            {category?.description?.length > 20 ? category.description.slice(0, 30) + "..." : category.description}
                                        </td>

                                        <td onClick={() => editCategory(category)} className="px-6 py-4 group-hover:text-blue-500">
                                            {new Date(category?.createdAt).toDateString()}
                                        </td>
                                        <td className="px-6 py-4 flex justify-center items-center text-right group-hover:text-blue-500">
                                            <button onClick={() => deleteCategory(category)}>
                                                <Trash className="w-5 h-5 text-red-500" />
                                            </button>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>


                </div>
            </div>
            <Pagination page={Number(page)} totalPageCount={Number(totalPageCount)} setPage={setPage} />
        </>
    );
}

export default CategoryManagement;
