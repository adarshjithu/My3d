import Breadcrumb from '@/Components/Admin/Breadcrumb/Breadcrumb'
import UserFilter from '@/Components/Admin/Filter/UserFilter'
import Pagination from '@/Components/Admin/Pagination/Pagination'
import Table from '@/Components/Admin/Table/Table'

import React from 'react'

function page() {
  return (
    <div>
        <Breadcrumb pageName='Users'/>
        <UserFilter/>
       <Table/>
       <Pagination/>
 

    </div>
  )
}

export default page
