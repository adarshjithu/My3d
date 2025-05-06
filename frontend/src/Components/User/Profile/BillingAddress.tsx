import { setUserProfile } from "@/fetures/user/profileSlice";
import { getUserProfile, updateBillingAddress, updateProfile } from "@/Services/userServices";
import { IRootState } from "@/Store/store";
import profileSchema from "@/Utils/error/profileSchema";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import SuccessModal from "../Modals/SuccessModal";
import addressSchema from "@/Utils/error/addressSchema";

function BillingAddress({ setLoading }: { setLoading: any }) {
    const dispatch = useDispatch();

    const [profileExists, setProfileExists] = useState(false);
    const [edit, setEdit] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const [formData, setFormData] = useState({
        firstname: "",
        lastname: "",
        companyname: "",
        streetaddress: "",
        apartment: "",
        city: "",
        zip: "",
        state: "",
        country: "",
        email: "",
        phonenumber: "",
    });
    const [error, setError] = useState({
        firstname: "",
        lastname: "",
        companyname: "",
        streetaddress: "",
        apartment: "",
        city: "",
        zip: "",
        state: "",
        country: "",
        email: "",
        phonenumber: "",
    });

    const handleChange = (e: any) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        setError({ ...error, [e.target.name]: "" });
    };

    // Submit form and validate
    const handleSubmit = async (e: any) => {
        e.preventDefault();
   
        try {
            await addressSchema.validate(formData, { abortEarly: false });
            submitProfile();
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

    // Update Profile
    const submitProfile = async () => {
        try {
         const res = await updateBillingAddress(formData)
        } catch (error) {
            toast.error(error);
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
            } catch (err) {
                toast.error(err);
            }
        };
        fetchData();
    }, []);

    return (
        <div className="w-[100%] mt-4  border border-gray flex flex-row items-start p-4  rounded-lg  border  relative">
            <div className="image w-[20%] flex justify-center items-center">
                <h1>Billing Address</h1>
            </div>

            {/* Details Section */}
            {!edit ? (
                ""
            ) : (
                <div className="w-[70%] ml-6">
                    <form className="space-y-6 max-w-xl mx-auto" onSubmit={handleSubmit}>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {/* First Name */}
                            <div>
                                <label className={`block text-md font-medium ${error?.firstname?"text-[red]":'text-gray-700'}`} htmlFor="firstname">
                                    First Name
                                </label>
                                
                                <input
                                    onChange={handleChange}
                                    type="text"
                                    id="firstname"
                                    name="firstname"
                                    value={formData?.firstname}
                                    className={`mt-1 block w-full border ${error?.firstname ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm px-3 py-2`}

                                    placeholder="First Name"
                                />
                            </div>
                            {/* Last Name */}
                            <div>
                                <label className={`block text-md font-medium ${error?.lastname?"text-[red]":'text-gray-700'}`} htmlFor="firstname">
                                    Last Name
                                </label>
                                <input
                                    type="text"
                                    value={formData?.lastname}
                                    id="lastname"
                                    name="lastname"
                                    onChange={handleChange}
                                    className={`mt-1 block w-full border ${error?.lastname?"border-red-500":'border-gray-300'} rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm px-3 py-2`}
                                    placeholder="Last Name"
                                />
                            </div>
                        </div>

                        {/* Company Name */}
                        <div>
                        <label className={`block text-md font-medium ${error?.companyname?"text-[red]":'text-gray-700'}`} htmlFor="firstname">
                       
                                Company Name (Optional)
                            </label>
                            <input
                                type="text"
                                id="companyname"
                                onChange={handleChange}
                                name="companyname"
                                className={`mt-1 block w-full border ${error?.companyname?"border-red-500":'border-gray-300'} rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm px-3 py-2`}
                                placeholder="Company Name"
                                value={formData?.companyname}
                            />
                        </div>

                        {/* Street Address */}
                        <div>
                        <label className={`block text-md font-medium ${error?.streetaddress?"text-[red]":'text-gray-700'}`} htmlFor="firstname">
                                Street Address
                            </label>
                            <input
                                type="text"
                                id="streetaddress"
                                name="streetaddress"
                                className={`mt-1 block w-full border ${error?.streetaddress?"border-red-500":'border-gray-300'} rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm px-3 py-2`}
                                placeholder="Street Address"
                                value={formData?.streetaddress}
                                onChange={handleChange}
                            />
                        </div>

                        {/* Apartment */}
                        <div>
                        <label className={`block text-md font-medium ${error?.apartment?"text-[red]":'text-gray-700'}`} htmlFor="firstname">
                                Apartment, Suite, etc. (Optional)
                            </label>
                            <input
                                type="text"
                                id="apartment"
                                name="apartment"
                                value={formData?.apartment}
                                onChange={handleChange}
                                className={`mt-1 block w-full border ${error?.apartment?"border-red-500":'border-gray-300'} rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm px-3 py-2`}
                                placeholder="Apartment, Suite, etc."
                            />
                        </div>

                        {/* City */}
                        <div>
                        <label className={`block text-md font-medium ${error?.city?"text-[red]":'text-gray-700'}`} htmlFor="firstname">
                                City
                            </label>
                            <input
                                type="text"
                                id="city"
                                name="city"
                                value={formData?.city}
                                onChange={handleChange}
                                className={`mt-1 block w-full border ${error?.city?"border-red-500":'border-gray-300'} rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm px-3 py-2`}
                                placeholder="City"
                            />
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                            {/* State */}
                            <div>
                            <label className={`block text-md font-medium ${error?.state?"text-[red]":'text-gray-700'}`} htmlFor="firstname">
                                    State
                                </label>
                                <input
                                    type="text"
                                    id="state"
                                    name="state"
                                    value={formData?.state}
                                    onChange={handleChange}
                                    className={`mt-1 block w-full border ${error?.state ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm px-3 py-2`}
                                    placeholder="State"
                                />
                            </div>
                            {/* ZIP Code */}
                            <div>
                            <label className={`block text-md font-medium ${error?.zip?"text-[red]":'text-gray-700'}`} htmlFor="firstname">
                                    ZIP Code
                                </label>
                                <input
                                    type="text"
                                    id="zip"
                                    value={formData?.zip}
                                    name="zip"
                                    onChange={handleChange}
                                    className={`mt-1 block w-full border ${error?.zip ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm px-3 py-2`}
                                    placeholder="ZIP Code"
                                />
                            </div>
                            {/* Country */}
                            <div>
                            <label className={`block text-md font-medium ${error?.country?"text-[red]":'text-gray-700'}`} htmlFor="firstname">
                                    Country
                                </label>
                                <select
                                    id="country"
                                    name="country"
                                     onChange={handleChange}
                                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm px-3 py-2"
                                >
                                    <option value="">Select Country</option>
                                    <option value="USA">USA</option>
                                    <option value="Canada">Canada</option>
                                    <option value="UK">UK</option>
                                    {/* Add more countries as needed */}
                                </select>
                            </div>
                        </div>

                        {/* Phone Number */}
                        <div>
                        <label className={`block text-md font-medium ${error?.phonenumber?"text-[red]":'text-gray-700'}`} htmlFor="firstname">
                                Phone Number
                            </label>
                            <input
                                type="tel"
                                value={formData?.phonenumber}
                                onChange={handleChange}
                                name="phonenumber"
                                id="phonenumber"
                                className={`mt-1 block w-full border ${error?.phonenumber ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm px-3 py-2`}
                                placeholder="Phone Number"
                            />
                        </div>

                        {/* Email */}
                        <div>
                        <label className={`block text-md font-medium ${error?.email?"text-[red]":'text-gray-700'}`} htmlFor="firstname">
                                Email
                            </label>
                            <input
                                type="email"
                                value={formData?.email}
                                onChange={handleChange}
                                name="email"
                                id="email"
                                className={`mt-1 block w-full border ${error?.email ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm px-3 py-2`}
                                placeholder="Email"
                            />
                        </div>

                        {/* Buttons */}
                        <div className="flex flex-row gap-4">
                            <button type="button" className="bg-red-500 text-white w-full py-2 rounded-lg hover:bg-red-600 transition font-medium">
                                Cancel
                            </button>
                            <button type="submit" className="bg-blue-500 text-white w-full py-2 rounded-lg hover:bg-blue-600 transition font-medium">
                                Submit
                            </button>
                        </div>
                    </form>
                </div>
            )}

            {/* Edit Button */}
            <div className="absolute top-4 right-4">
                {edit ? (
                    <span onClick={() => setEdit(false)} className="cursor-pointer text-blue-500 hover:text-blue-700 font-medium">
                        X
                    </span>
                ) : (
                    <span onClick={() => setEdit(true)} className="cursor-pointer text-blue-500 hover:text-blue-700 font-medium">
                        {profileExists ? "Edit" : "+Add"}
                    </span>
                )}
            </div>
        </div>
    );
}

export default BillingAddress;
