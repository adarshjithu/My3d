import { IProduct } from '@/Interfaces/IProduct'
import React from 'react'

import { useRouter } from 'next/navigation'


function Card({product}:{product:IProduct}) {
    const router = useRouter()
  return (
    <div onClick={()=>router.push(`/product/${product?._id}`)} key={product?._id} className="bg-white shadow-md overflow-hidden cursor-pointer hover:bg-[#e7f5fe] p-2 group">
    <img src={product?.images[0]} alt={product?.name} className="w-full h-50 object-cover rounded-sm" />
    <div className="p-4">
        <h2 className="text-[14px] text-gray-700 sm:text-[22px] font-semibold mb-2 group-hover:text-[#007ab8] transition-colors duration-200">
            {product?.name}
        </h2>
        <p className=" text-[14px] text-[#CC0C38] font-semibold sm:text-[18px]">{product?.baseprice} AED</p>
    </div>
</div>
  )
}

export default Card
