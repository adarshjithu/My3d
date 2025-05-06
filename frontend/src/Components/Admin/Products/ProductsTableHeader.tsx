'use client'

import React, { useState } from 'react';
import AddProductForm from '../AddProduct/AddProductForm';
import { ICategory } from '@/Interfaces/ICategory';

interface IProps{
  categories:ICategory[];
  setSelectedCategory:any;
  setSearch:any;
  search:string;
  status:string;
  setStatus:any;
  setRefetch:any
}

function ProductsTableHeader({setRefetch,setStatus,status,search,setSearch,categories,setSelectedCategory}:IProps) {
 
  const [filter, setFilter] = useState('');
 
  const [date, setDate] = useState('');
  const [addProductModal,setAddProductModal] = useState(false)
  const [time,setTime] = useState<any>(null);

  const handleChange = (e:any)=>{
    
    const value =  e.target.value;
    if(value=='all'){
      setSelectedCategory(null)
      setFilter('All Categories')
    }else{

      const cat = categories?.find((obj)=>obj?.name==value);
      setSelectedCategory(cat);
      setFilter(value)
    }

  }

  const handleSearchChange = (e:any)=>{
    const value = e.target.value;
    setSearch(value)
    if(time)clearTimeout(time)
   const timeout =  setTimeout(() => {
      setRefetch((prev:boolean)=>!prev)
    }, 500);

    setTime(timeout)
  }
  return (
    <caption className="p-4 mb-5 text-base font-semibold text-gray-900 bg-white dark:text-white dark:bg-gray-800">
      <div className="flex flex-col sm:flex-row justify-between items-center gap-3">
        {addProductModal&&<AddProductForm/>}
        {/* Filters Section */}
        <div className="flex flex-wrap items-center gap-3">
          {/* Category Filter */}
          <select
            value={filter}
            onChange={handleChange}
            className="px-3 py-2 border rounded-md text-sm bg-white dark:bg-gray-700 dark:border-gray-600 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <option value="all">All Categories</option>
           
            {categories?.map((obj:ICategory)=>{
              return (
                <option value={obj?.name}>{obj?.name}</option>
              )
            })}
          
          </select>

          {/* Status Filter */}
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="px-3 py-2 border rounded-md text-sm bg-white dark:bg-gray-700 dark:border-gray-600 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
        
            <option value="in stock">Active</option>
            <option value="out of stock">Out of Stock</option>
          </select>
        </div>

        {/* Search & Date Input */}
        <div className="flex items-center gap-3">
          {/* Search Input */}
          <input
            type="text"
            value={search}
            onChange={(e)=>handleSearchChange(e)}
            placeholder="Search..."
            className="px-3 py-2 border rounded-md text-sm bg-white dark:bg-gray-700 dark:border-gray-600 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />

          {/* Date Filter */}
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="px-3 py-2 border rounded-md text-sm bg-white dark:bg-gray-700 dark:border-gray-600 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        {/* Add New Product Button */}
        <button
          onClick={()=>setAddProductModal(true)}
          className="px-4 py-2 text-sm text-white bg-blue-500 hover:bg-blue-600 focus:outline-none font-medium rounded-md dark:bg-green-600 dark:hover:bg-green-700"
        >
          Add New Product+
        </button>
      </div>
    </caption>
  );
}

export default ProductsTableHeader;
