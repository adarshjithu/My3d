import Breadcrumb from '@/Components/Admin/Breadcrumb/Breadcrumb'
import FrameTable from '@/Components/Admin/Frames/FrameTable'
import React from 'react'

function Page() {
  return (
    <div>
      <Breadcrumb pageName='Frames' root='ProductManagement'/>
      <FrameTable/>
    </div>
  )
}

export default Page
