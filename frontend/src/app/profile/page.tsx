"use client";
import PageLoading from "@/Components/User/Loading/PageLoading";
import BillingAddress from "@/Components/User/Profile/BillingAddress";
import OrderDetails from "@/Components/User/Profile/OrderDetails";
import ProfileDetails from "@/Components/User/Profile/ProfileDetails";
import SelectionBar from "@/Components/User/Profile/SelectionBar";
import ShippingAddress from "@/Components/User/Profile/ShippingAddress";
import ResetPasswordForm from "@/Components/User/ResetPassword/ResetPassword";
import { logoutUser } from "@/fetures/user/authSlice";
import { userLogout } from "@/Services/userServices";
import PageLoader from "next/dist/client/page-loader";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";

function page() {
    const [activeTab, setActiveTab] = useState("profile");
    const dispatch = useDispatch();
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const signout = async () => {
        try {
            const res = await userLogout();
            dispatch(logoutUser());
            router.push("/");
        } catch (err) {
            toast.error(err);
        }
    };

    return (
        <div className="w-full  flex justify-center items-center p-2">
            <div className="  w-full sm:w-[70%] ">
                <SelectionBar activeTab={activeTab} setActiveTab={setActiveTab} />
                <div className="w-full p-4 r bg-white rounded-lg">
                  {activeTab=='profile'&&  <>
                        <ProfileDetails setLoading={setLoading} />
                        <BillingAddress setLoading={setLoading} />
                        <ShippingAddress setLoading={setLoading} />
                    </>}
                    {
                        activeTab=='resetPassword'&&<ResetPasswordForm/>
                    }
                </div>
                <span onClick={signout} className="text-blue-500 mt-4 cursor-pointer">
                    Signout
                </span>
            </div>
        </div>
    );
}

export default page;
