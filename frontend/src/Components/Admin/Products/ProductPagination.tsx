import { useRouter } from "next/navigation";
import React from "react";

function ProductPagination({page}:{page:string}) {
    const router = useRouter()
    return (
        <div>
            <div className="flex flex-col items-center">
                <span className="text-sm text-gray-700 dark:text-gray-400">
                    Showing <span className="font-semibold text-gray-900 dark:text-white">1</span> to{" "}
                    <span className="font-semibold text-gray-900 dark:text-white">10</span> of{" "}
                    <span className="font-semibold text-gray-900 dark:text-white">100</span> Entries
                </span>

                <div className="inline-flex mt-2 xs:mt-0">
                    <button className="flex items-center justify-center px-3 h-8 text-sm font-medium text-white bg-gray-800 rounded-s hover:bg-gray-900 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                        Prev
                    </button>
                    <button onClick={()=>router.push(`/admin/products/${parseInt(page)+1}`)} className="flex items-center justify-center px-3 h-8 text-sm font-medium text-white bg-gray-800 border-0 border-s border-gray-700 rounded-e hover:bg-gray-900 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                        Next
                    </button>
                </div>
            </div>
           
        </div>
    );
}

export default ProductPagination;
