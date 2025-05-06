import { resetUserPassword } from "@/Services/userServices";
import resetPasswordValidatonSchema from "@/Utils/error/resetPasswordSchema";
import React, { useState } from "react";
import toast from "react-hot-toast";
import SuccessModal from "../Modals/SuccessModal";

const ResetPasswordForm = () => {
    const [formData, setFormData] = useState({ oldpassword: "", newpassword: "", confirmpassword: "" });
    const [error, setError] = useState({ oldpassword: "", newpassword: "", confirmpassword: "" });
     const [isOpen,setIsOpen] = useState(false)
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await resetPasswordValidatonSchema.validate(formData, { abortEarly: false });
            submitPassword()
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

    const submitPassword = async () => {
        try {
            const res = await resetUserPassword(formData);
           console.log(res?.data)
            if(res?.data?.success){
                setIsOpen(true)
            }
        } catch (error) {
            toast.error(error);
        }
    };

    const handleChange = (e: any) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };
    return (
        <div className="flex items-center justify-center border border-gray ">
            {isOpen&&<SuccessModal isOpen={isOpen} setIsOpen={setIsOpen} path={'/'} message='Password Changed Successfully'/>}
            <div className="w-full max-w-md bg-white rounded-2xl p-6">
                <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">Reset Password</h1>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                            Enter Old Password
                        </label>
                        {error?.oldpassword && <span className="text-[red]">{error?.oldpassword}</span>}
                        <input
                            id="password"
                            type="password"
                            name="oldpassword"
                            placeholder="Enter old password"
                            className="w-full py-2 px-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
                            value={formData?.oldpassword}
                            onChange={handleChange}
                        />
                    </div>
                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                            New Password
                        </label>
                        {error?.newpassword && <span className="text-[red]">{error?.newpassword}</span>}
                        <input
                            id="password"
                            type="password"
                            name="newpassword"
                            placeholder="Enter your new password"
                            className="w-full py-2 px-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
                            value={formData?.newpassword}
                            onChange={handleChange}
                        />
                    </div>

                    <div>
                        <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
                            Confirm Password
                        </label>
                        {error?.confirmpassword && <span className="text-[red]">{error?.confirmpassword}</span>}
                        <input
                            id="confirmPassword"
                            type="password"
                            name="confirmpassword"
                            placeholder="Re-enter your password"
                            className="w-full py-2 px-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
                            value={formData?.confirmpassword}
                            onChange={handleChange}
                        />
                    </div>

                    <button type="submit" className="w-full bg-[#1FA3EF] hover:bg-[#178EC5] text-white py-2 rounded-lg font-semibold">
                        Reset Password
                    </button>
                </form>
            </div>
        </div>
    );
};

export default ResetPasswordForm;
