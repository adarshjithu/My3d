import Breadcrumb from '@/Components/Admin/Breadcrumb/Breadcrumb'
import ProductsTable from '@/Components/Admin/Products/ProductsTable'
import React from 'react'

function page({params}:any) {
  return (
    <div>
        <Breadcrumb pageName='Products' root='Product Management'/>
         <ProductsTable page={params?.page}/>
    </div>
  )
}

export default page
