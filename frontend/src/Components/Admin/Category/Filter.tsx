import React from "react";

function CategoryManagement() {
    return (
        <div className="flex items-center justify-between flex-col md:flex-row flex-wrap space-y-4 md:space-y-0 py-4 bg-white dark:bg-gray-900">
            {/* Add Category Button */}
            <div>
                <button
                    id="addCategoryButton"
                    className="inline-flex items-center text-white bg-blue-500 border border-blue-500 hover:bg-blue-600 focus:outline-none focus:ring-4 focus:ring-blue-200 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-blue-600 dark:border-blue-500 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    type="button"
                >
                    <span className="sr-only">Add Category</span>
                    Add Category
                </button>
            </div>

            {/* Search Input */}
            <div className="relative">
                <div className="absolute inset-y-0 rtl:inset-r-0 start-0 flex items-center ps-3 pointer-events-none">
                    <svg
                        className="w-4 h-4 text-gray-500 dark:text-gray-400"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 20 20"
                    >
                        <path
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                        />
                    </svg>
                </div>
                <input
                    type="text"
                    id="category-search"
                    className="block pt-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Search for categories"
                />
            </div>

            {/* Date Picker (Optional for filtering by creation date) */}
            <div>
                <label htmlFor="date-picker" className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-400">
                    Select Date
                </label>
                <input
                    type="date"
                    id="date-picker"
                    className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 p-2.5"
                />
            </div>
        </div>
    );
}

export default CategoryManagement;
