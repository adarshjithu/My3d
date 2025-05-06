'use client'

import React, { useState } from 'react';
import AddFrameModal from './AddFrameModal';


interface IProps{
  handleSearch: (e: React.ChangeEvent<HTMLInputElement>)=>void
}

function FrameTableHeader({handleSearch}:IProps) {
const [addFrameModal,setAddFrameModal] = useState(false)

  return (
    <caption className="p-4 text-base font-semibold text-gray-900 bg-white dark:text-white dark:bg-gray-800">
        {addFrameModal&&<AddFrameModal setAddFrameModal={setAddFrameModal}/>}
      <div className="flex flex-col sm:flex-row justify-between items-center gap-3">
        
        {/* Filters Section */}
        <div className="flex flex-wrap items-center gap-3">
          {/* Category Filter */}
          {/* <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="px-3 py-2 border rounded-md text-sm bg-white dark:bg-gray-700 dark:border-gray-600 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <option value="All">All Categories</option>
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </select> */}

          {/* Status Filter */}
          {/* <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="px-3 py-2 border rounded-md text-sm bg-white dark:bg-gray-700 dark:border-gray-600 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <option value="All">Active</option>
            <option value="Inactive">Inactive</option>
            <option value="OutOfStock">Out of Stock</option>
          </select> */}
        </div>

        {/* Search & Date Input */}
        {/* <div className="flex items-center gap-3"> */}
          {/* Search Input */}
          <input
            type="text"
            onChange={handleSearch}
            placeholder="Search..."
            className="px-3 py-2 border rounded-md text-sm bg-white dark:bg-gray-700 dark:border-gray-600 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />

          {/* Date Filter */}
          {/* <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="px-3 py-2 border rounded-md text-sm bg-white dark:bg-gray-700 dark:border-gray-600 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div> */}

        {/* Add New Product Button */}
        <button
          onClick={()=>setAddFrameModal(true)}
          className="px-4 py-2 text-sm text-white bg-blue-500 hover:bg-blue-600 focus:outline-none font-medium rounded-md dark:bg-green-600 dark:hover:bg-green-700"
        >
          Add New +
        </button>
      </div>
    </caption>
  );
}

export default FrameTableHeader;
