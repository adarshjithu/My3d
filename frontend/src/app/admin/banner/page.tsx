import BannerTable from '@/Components/Admin/Banner/BannerTable'
import Breadcrumb from '@/Components/Admin/Breadcrumb/Breadcrumb'
import React from 'react'

function Page() {
  return (
    <div>
      <Breadcrumb pageName='Banner' root='Admin'/>
      <BannerTable/>
    </div>
  )
}

export default Page
