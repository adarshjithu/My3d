import { setUserProfile } from "@/fetures/user/profileSlice";
import { getUserProfile, updateProfile } from "@/Services/userServices";
import { IRootState } from "@/Store/store";
import profileSchema from "@/Utils/error/profileSchema";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import SuccessModal from "../Modals/SuccessModal";

function ProfileDetails({ setLoading }: { setLoading: any }) {
    const dispatch = useDispatch();
    const profile = useSelector((data: IRootState) => data?.profile?.profileData);
    const [profileExists, setProfileExists] = useState(false);
    const [edit, setEdit] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const [formData, setFormData] = useState({ firstname: "", lastname: "", phonenumber: "" });
    const [error, setError] = useState({ firstname: "", lastname: "", phonenumber: "" });
    const image =
        "data:image/jpeg;base64,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"; // Example image link

    const handleChange = (e: any) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        setError({ ...error, [e.target.name]: "" });
    };

    // Submit form and validate
    const handleSubmit = async (e: any) => {
        e.preventDefault();
        try {
            await profileSchema.validate(formData, { abortEarly: false });
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
            const res = await updateProfile(formData);
            setFormData(res?.data?.data);
            dispatch(setUserProfile(res?.data?.data));
            setEdit(false);
            setProfileExists(true);
            setIsOpen(true)
        } catch (error) {
            toast.error(error);
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const res = await getUserProfile();
                const proInfo = res?.data?.data;
                if (proInfo) {
                    setFormData({ firstname: proInfo?.firstname, lastname: proInfo?.lastname, phonenumber: proInfo?.phonenumber });
                    dispatch(setUserProfile(proInfo));
                    setProfileExists(true);
                }
                setLoading(false);
            } catch (err) {
                toast.error(err);
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    return (
        <div className="w-[100%]  border border-gray flex flex-row items-start p-4  rounded-lg  border  relative">
            <SuccessModal isOpen={isOpen} setIsOpen={setIsOpen}/>
            {/* Profile Image */}

            <div className="image w-[20%] flex justify-center items-center">
                <img className="rounded-full w-24 h-24 object-cover" src={image} alt="Profile" />
            </div>

            {/* Details Section */}
            {!edit ? (
                <div className="details w-[70%] ml-6">
                    <h1 className="text-lg font-semibold mb-4">Personal Data</h1>
                    <div className="flex items-center mb-2">
                        <h1 className="text-gray-500 font-medium w-32">Firstname:</h1>
                        <h2 className="text-gray-800">{profile?.firstname}</h2>
                    </div>
                    <div className="flex items-center mb-2">
                        <h1 className="text-gray-500 font-medium w-32">Lastname:</h1>
                        <h2 className="text-gray-800">{profile?.lastname}</h2>
                    </div>
                    <div className="flex items-center">
                        <h1 className="text-gray-500 font-medium w-32">Phonenumber:</h1>
                        <h2 className="text-gray-800">{profile?.phonenumber}</h2>
                    </div>
                </div>
            ) : (
                <div className="w-[70%] ml-6">
                    <form className="space-y-4" onSubmit={handleSubmit}>
                        <div>
                            <label className="block text-lg font-medium text-black-700" htmlFor="email">
                                First name
                            </label>
                            {error.firstname && <span className="text-[red]">{error.firstname}</span>}
                            <input
                                type="text"
                                onChange={handleChange}
                                value={formData?.firstname}
                                id="email"
                                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm px-3 py-2"
                                placeholder="Firstname"
                                name="firstname"
                            />
                        </div>
                        <div>
                            <label className="block text-lg font-medium text-black-700" htmlFor="email">
                                Last name
                            </label>
                            {error.lastname && <span className="text-[red]">{error.lastname}</span>}
                            <input
                                onChange={handleChange}
                                type="text"
                                value={formData?.lastname}
                                name="lastname"
                                id="email"
                                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm px-3 py-2"
                                placeholder="Lastname"
                            />
                        </div>

                        <div>
                            <label className="block text-lg font-medium text-black-700" htmlFor="password">
                                Your Phone Number
                            </label>
                            {error.phonenumber && <span className="text-[red]">{error.phonenumber}</span>}
                            <input
                                type="number"
                                onChange={handleChange}
                                id=""
                                value={formData?.phonenumber}
                                name="phonenumber"
                                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm px-3 py-2"
                                placeholder="Phonenumber"
                            />
                        </div>
                        <div className="flex flex-row">
                            <button className="bg-red-500 mr-4 text-white w-full py-2 rounded-lg hover:bg-red-600 transition font-medium">
                                Cancel
                            </button>
                            <button className="bg-blue-500 text-white  w-full py-2 rounded-lg hover:bg-blue-600 transition font-medium">
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

export default ProfileDetails;
