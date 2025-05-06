"use client";

import { setUserCredentials } from "@/fetures/user/authSlice";
import { verifyLink } from "@/Services/userServices";
import { useRouter } from "next/navigation";

import React, { useEffect } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";

function LoginPage({ params }: { params: { id: string } }) {
   const dispatch = useDispatch()
   const user = useSelector((data:any)=>data?.auth);

    const router = useRouter()
    useEffect(() => {
        const fetchData = async () => {
            try {
                const res:any =await verifyLink(params.id);
                
                dispatch(setUserCredentials(res?.data?.data?.user))
                toast.success(res?.data?.message)
                router.push('/')
            } catch (error) {
                toast.error(error);
            }
        };
        fetchData();
    }, []);
    return (
        <div>
         
        </div>
    );
}

export default LoginPage;
