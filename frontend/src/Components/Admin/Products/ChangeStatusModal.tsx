import { updateProductData } from '@/fetures/admin/productSlice';
import { IProduct } from '@/Interfaces/IProduct'
import { updateProductStatus } from '@/Services/adminService';
import React from 'react'
import { useDispatch } from 'react-redux';

function ChangeStatusModal({ product }: { product: IProduct }) {

   const dispatch =  useDispatch()
  const handleChange = async(e:any)=>{
         try{
         const res = await updateProductStatus(product?._id);
           if(res?.data?.success){
             dispatch(updateProductData({...product,stock:product?.stock?false:true}))
           }
         }catch(error){

         }
  }
  return (
    <div>
      {/* Display selected status with color */}
      {/* <p className={product?.stock ? 'text-green-500 ' : 'text-red-500'}>
        {product?.stock ? 'In Stock' : 'Out of Stock'}
      </p> */}

      <select
         onChange={handleChange}
        className="border p-2 rounded-md cursor-pointer dark:bg-[black]"
        value={product?.stock ? 'in stock' : 'out of stock'}
      >
        <option value="out of stock" className="text-red-500">Out of Stock</option>
        <option value="in stock" className="text-green-500">In Stock</option>
      </select>
    </div>
  );
}

export default ChangeStatusModal;
