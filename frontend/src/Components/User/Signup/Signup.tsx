import { signupUser } from "@/Services/userServices";
import signupSchema from "@/Utils/error/SignupSchema";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import ButtonLoading from "../Loading/ButtonLoading";

const Signup = ({ setSignupModal, setIsLoginModalVisible }: any) => {
    const [formData, setFormData] = useState({ username: "", email: "", password: "" });
    const [error, setError] = useState({ username: "", email: "", password: "" });
    const [loading,setLoading] = useState(false)
    const handleChange = (e: any) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        setError({ ...error, [e.target.name]: "" });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await signupSchema.validate(formData, { abortEarly: false });

            registerUser()
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

    const registerUser = async () => {
        try {
            setLoading(true)
            const res = await signupUser(formData);
            toast.success(res?.data?.message)
            
            setLoading(false)
        } catch (error) {
        toast.error(error)
        setLoading(false)
        }
    };

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
                <button
                    className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
                    onClick={() => {
                        setSignupModal(false);
                    }}
                >
                    ✕
                </button>

                {/* Title */}
                <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">Sign Up</h2>

                {/* Form */}
                <form className="space-y-4" onSubmit={handleSubmit}>
                    <div>
                        <label className="block text-sm font-medium text-gray-700" htmlFor="email">
                            Username
                        </label>
                        {error?.username && <span className="text-[red]">{error.username}</span>}
                        <input
                            type="text"
                            id="email"
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm px-3 py-2"
                            placeholder="Username"
                            name="username"
                            onChange={handleChange}
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700" htmlFor="email">
                            Email
                        </label>
                        {error?.email && <span className="text-[red]">{error.email}</span>}
                        <input
                            type="email"
                            name="email"
                            id="email"
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm px-3 py-2"
                            placeholder="Email"
                            onChange={handleChange}
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700" htmlFor="password">
                            Password
                        </label>
                        {error?.password && <span className="text-[red]">{error.password}</span>}
                        <input
                            type="password"
                            id="password"
                            name="password"
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm px-3 py-2"
                            placeholder="Password"
                            onChange={handleChange}
                        />
                    </div>

                    <button className="bg-blue-500 text-white w-full py-2 rounded-lg hover:bg-blue-600 transition font-medium">{loading?<ButtonLoading/>:'Sign In'}</button>
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
                    <a href="/forgot-password" className="text-sm text-blue-500 hover:underline">
                        Forgot password?
                    </a>
                </div>
                <div className="mt-2 text-center text-sm">
                    Don&apos;t have an account?{" "}
                    <a
                        onClick={() => {
                            setIsLoginModalVisible(true);
                            setSignupModal(false);
                        }}
                        className="text-blue-500 hover:underline cursor-pointer"
                    >
                        Sign In
                    </a>
                </div>
            </div>
        </div>
    );
};

export default Signup;
