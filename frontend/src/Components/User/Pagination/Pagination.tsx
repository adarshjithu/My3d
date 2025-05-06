'use client'

import React from "react";
import { ChevronRight } from "lucide-react";
import { useRouter } from "next/navigation";
function Pagination({ pages,productId }: any) {
   const router = useRouter()

    const navigatePage  =(obj:string,id:number)=>{
        
       if(id==0){
       router.push(`/`)  
       }

       if(id==1){
        router.push(`/category/${obj}`)
       }

       if(id==2){
        router.push(`/product/${productId}`)
       }
    }
    return (
        <div className="flex flex-col md:flex-row max-w-6xl mx-auto p-4">
            <nav className="text-gray-500 text-sm   ">
                <ul className="flex items-center space-x-2">
                    {pages?.map((obj: string, id: number) => {
                        return (
                            
                            <div key={id} className="flex flex-row">

                                <li >
                                    <a  onClick={()=>navigatePage(obj,id)}  className={`${pages.length-1!==id&&'cursor-pointer'} hover:text-black ${pages.length-1==id?'text-black':''}`}>
                                        {obj}
                                    </a>
                                </li>
                                {<ChevronRight  className="h-4 w-4 text-gray-400" />}
                            </div>
                            
                        );
                    })}
                </ul>
            </nav>
        </div>
    );
}

export default Pagination;
