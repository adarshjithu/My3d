import BaseTable from "@/Components/Admin/Base/BaseTable";
import Breadcrumb from "@/Components/Admin/Breadcrumb/Breadcrumb";
import React from "react";

function page() {
    return (
        <div>
            <Breadcrumb pageName="Base" root="ProductManagement" />
            <BaseTable />
        </div>
    );
}

export default page;
