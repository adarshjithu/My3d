import Breadcrumb from '@/Components/Admin/Breadcrumb/Breadcrumb'
import CategoryFilter from '@/Components/Admin/Category/Filter'
import CategoryManagement from '@/Components/Admin/Table/CategoryTable'
import React from 'react'

function page() {
  return (
    <div>
      <Breadcrumb pageName='Category' root='ProductManagement'/>
      <CategoryManagement/>
      
    </div>
  )
}

export default page
