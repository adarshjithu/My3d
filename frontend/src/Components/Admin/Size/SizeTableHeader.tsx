"use client";

import TableLoading from "@/Components/User/Loading/TableLoading";
import React, { useState } from "react";
import AddSizeModal from "./AddSizeModal";

function SizeTableHeader() {

    const [addSizeModal,setAddSizeModal] = useState(false)
    return (
        <caption className="p-5 text-lg font-semibold text-right rtl:text-right text-gray-900 bg-white dark:text-white dark:bg-gray-800">
           {addSizeModal&&<AddSizeModal setAddSizeModal={setAddSizeModal}/>}
            <div className="flex flex-col sm:flex-row justify-between items-center">
                {/* Filter Dropdown
                <div className="mb-3 sm:mb-0 flex items-center space-x-3">
                    <select className="px-4 py-2 border rounded-lg bg-white dark:bg-gray-700 dark:border-gray-600 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500">
                        <option value="All">All Categories</option>
                        <option value="Active">Active</option>
                        <option value="Inactive">Inactive</option>
                    </select>
                </div> */}

                {/* Search Input */}
                <div className="mb-3 sm:mb-0 flex items-center space-x-3">
                    <input
                        type="text"
                        placeholder="Search..."
                        className="px-4 py-2 border rounded-lg bg-white dark:bg-gray-700 dark:border-gray-600 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                </div>

                {/* New Category Button */}
                <button onClick={()=>setAddSizeModal(true)} className="mt-3 sm:mt-0 text-white bg-blue-500 border hover:bg-blue-600 focus:outline-none font-medium rounded-lg text-sm px-4 py-1 dark:bg-green-600 dark:border-green-500 dark:hover:bg-green-700 dark:focus:ring-green-800">
                    Add New +
                </button>
            </div>
        </caption>
    );
}

export default SizeTableHeader;
