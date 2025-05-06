import Breadcrumb from '@/Components/Admin/Breadcrumb/Breadcrumb'
import SizeTable from '@/Components/Admin/Table/SizeTable'
import React from 'react'

function page() {
  return (
    <div>
      <Breadcrumb pageName='Size' root='ProductManagement'/>
      <SizeTable/>
    </div>
  )
}

export default page
