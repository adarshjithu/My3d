import TableLoading from '@/Components/User/Loading/TableLoading';
import React, { useState } from 'react'

function CategoryTableHeader({handleSearch, setFormOpen ,search,setSearch,loading}: { setFormOpen: React.Dispatch<React.SetStateAction<boolean>> ;search:string,setSearch:React.Dispatch<React.SetStateAction<string>>,handleSearch:(e:React.ChangeEvent<HTMLInputElement>)=>void;loading:boolean}) {

  const [filter, setFilter] = useState('All');

  return (
    <caption className="p-5 text-lg font-semibold text-right rtl:text-right text-gray-900 bg-white dark:text-white dark:bg-gray-800">
      <div className="flex flex-col sm:flex-row justify-between items-center">
        {/* Filter Dropdown */}
        <div className="mb-3 sm:mb-0 flex items-center space-x-3">
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="px-4 py-2 border rounded-lg bg-white dark:bg-gray-700 dark:border-gray-600 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <option value="All">All Categories</option>
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </select>
        </div>

        {/* Search Input */}
        <div className="mb-3 sm:mb-0 flex items-center space-x-3">
          <input
            type="text"
            placeholder="Search..."
            value={search}
            
            onChange={(e) => handleSearch(e)}
            className="px-4 py-2 border rounded-lg bg-white dark:bg-gray-700 dark:border-gray-600 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          {loading&&<TableLoading/>}
        </div>

        {/* New Category Button */}
        <button
          onClick={() => setFormOpen(true)}
          className="mt-3 sm:mt-0 text-white bg-blue-500 border hover:bg-blue-600 focus:outline-none font-medium rounded-lg text-sm px-4 py-1 dark:bg-green-600 dark:border-green-500 dark:hover:bg-green-700 dark:focus:ring-green-800"
        >
          New Category
        </button>
      </div>
    </caption>
  );
}

export default CategoryTableHeader;
