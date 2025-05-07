"use client";
import ButtonLoading from "@/Components/User/Loading/ButtonLoading";
import PageLoading from "@/Components/User/Loading/PageLoading";
import SkeletonLoadingModal from "@/Components/User/Loading/SkeletonLoading";
import SuccessModal from "@/Components/User/Modals/SuccessModal";
import { resetForgetPassword, verifyForgetPasswordLink } from "@/Services/userServices";
import forgetPasswordSchema from "@/Utils/error/forgetPassword";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

function Page({ params }: { params: { id: string } }) {
    const [modal, setModal] = useState(false);
    const [userId, setUserId] = useState<string>("");
    const [loading, setLoading] = useState(false);
    const [load,setLoad] = useState(false)
    const [isOpen,setIsOpen] = useState(false)
    const [formData, setFormData] = useState({ password: "", confirmpassword: "" });
    const [error, setError] = useState({ password: "", confirmpassword: "" });
    const router = useRouter()
    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const res = await verifyForgetPasswordLink(params.id);
                setLoading(false);
                if (res?.data?.success) {
                    setUserId(res?.data?.data?.userId);
                    setModal(true);
                }
            } catch (error) {
                toast.error(error);
                setLoading(false);
                router.push('/')
            }
        };
        fetchData();
    }, []);

    const handleChange = (e: any) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        setError({ ...error, [e.target.name]: '' });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await forgetPasswordSchema.validate(formData, { abortEarly: false });

            reset();
        } catch (err: any) {
            const validationErrors: any = {};
            if (err.inner) {
                err.inner.forEach((error: any) => {
                    validationErrors[error.path] = error.message;
                });
            }
            // User validation failed errors
            setError(validationErrors);
        }
    };

    const reset = async() => {
        try {
            if(!userId){
             router.push('/')
            }else{
                setLoad(true)
                const res = await resetForgetPassword({password:formData?.password,userId:userId});
                if(res?.data.success) setIsOpen(true)
                setLoad(false)
            }
        } catch (error) {
            toast.error(error);
            setLoad(false)
        }
    };
    return (
      
      loading?<SkeletonLoadingModal/>: <>
      { modal&&(

      
     isOpen?<SuccessModal isOpen={isOpen} setIsOpen={setIsOpen} message="" path='/'/>: <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-96">
                <h2 className="text-xl font-bold mb-4 text-center">Reset Password</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block font-medium mb-2" htmlFor="password">
                            New Password
                        </label>
                        {error?.password && <span className="text-[red]">{error?.password}</span>}
                        <input
                            onChange={handleChange}
                            name="password"
                            value={formData?.password}
                            type="password"
                            id="password"
                            className="w-full p-2 border border-gray-300 rounded-lg"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block font-medium mb-2" htmlFor="retypePassword">
                            Retype Password
                        </label>
                        {error?.confirmpassword && <span className="text-[red]">{error?.confirmpassword}</span>}
                        <input
                            value={formData?.confirmpassword}
                            name="confirmpassword"
                            onChange={handleChange}
                            type="password"
                            id="retypePassword"
                            className="w-full p-2 border border-gray-300 rounded-lg"
                        />
                    </div>

                    <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition">
                       { load?<ButtonLoading/>:'Reset Password'}
                    </button>
                    <button onClick={()=>router.push('/')} type="submit" className="mt-4 w-full bg-green-600 text-white py-2 rounded-lg hover:bg-blue-700 transition">
                       Back
                    </button>
                </form>
            </div>
        </div>)}</> 
    );
}

export default Page;
