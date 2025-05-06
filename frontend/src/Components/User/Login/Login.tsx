import { setUserCredentials } from "@/fetures/user/authSlice";
import { loginUser } from "@/Services/userServices";
import { IRootState } from "@/Store/store";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import ButtonLoading from "../Loading/ButtonLoading";
import { useRouter } from "next/navigation";
const Login = ({ setIsLoginModalVisible, setSignupModal,forgetPasswordModal,setForgetPasswordModal}: any) => {

    const [formData,setFormData] = useState({email:'',password:''})
     const [loading,setLoading] = useState(false)
     const dispatch = useDispatch()
      const router = useRouter()
    

    const handleChange = (e:any)=>{
        setFormData({...formData,[e.target.name]:e.target.value});
    }
    const handleSubmit = async(e:any)=>{
        e.preventDefault();
         try{
            setLoading(true)
            const res = await loginUser(formData);
            toast.success(res?.data?.message)
              dispatch(setUserCredentials(res?.data?.data?.user))
              setIsLoginModalVisible(false)
              setLoading(false)

         }catch(err){
            setLoading(false)
            toast.error(err)
            
         }
       
    }
    useEffect(() => {
        // Disable scrolling on mount
        document.body.style.overflow = "hidden";

        // Enable scrolling on unmount
        return () => {
            document.body.style.overflow = "auto";
        };
    }, []);

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-lg p-6 w-[90%] max-w-md relative">
                {/* Close Button */}
                <button className="absolute top-3 right-3 text-gray-500 hover:text-gray-700" onClick={() => setIsLoginModalVisible(false)}>
                    ✕
                </button>

                {/* Title */}
                <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">Sign In</h2>

                {/* Form */}
                <form className="space-y-4" onSubmit={handleSubmit}>
                    <div>
                        <label className="block text-sm font-medium text-gray-700" htmlFor="email">
                            Email
                        </label>
                        <input
                            id="email"
                            name="email"
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm px-3 py-2"
                            placeholder="Username Or Email"
                            onChange={handleChange}
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700" htmlFor="password">
                            Password
                        </label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm px-3 py-2"
                            placeholder="Password"
                            onChange={handleChange}
                        />
                    </div>

                    <button type="submit" className="bg-blue-500 text-white w-full py-2 rounded-lg hover:bg-blue-600 transition font-medium">
                       {loading?<ButtonLoading/>:" Sign In"}
                    </button>
                </form>

                {/* Divider */}
                <div className="flex items-center my-4">
                    <div className="flex-grow h-px bg-gray-300"></div>
                    <span className="mx-2 text-sm text-gray-500">Sign In or Create an Account with</span>
                    <div className="flex-grow h-px bg-gray-300"></div>
                </div>

                {/* Social Buttons */}
                <div className="flex justify-center space-x-4">
                    <button className="bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium px-4 py-2 rounded-lg transition flex items-center space-x-2">
                        <span>Google</span>
                    </button>
                    <button className="bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium px-4 py-2 rounded-lg transition flex items-center space-x-2">
                        <span>Facebook</span>
                    </button>
                </div>

                {/* Links */}
                <div className="mt-4 text-center">
                    <a onClick={()=>{setForgetPasswordModal(true);setIsLoginModalVisible(false)}} className="text-sm text-blue-500 hover:underline">
                        Forgot password?
                    </a>
                </div>
                <div className="mt-2 text-center text-sm">
                    Don&apos;t have an account?{" "}
                    <a
                        onClick={() => {
                            setSignupModal(true);
                            setIsLoginModalVisible(false);
                        }}
                        className="text-blue-500 hover:underline cursor-pointer"
                    >
                        Sign up
                    </a>
                </div>
            </div>
        </div>
    );
};

export default Login;
